// Облачное сохранение прогресса в приватный репозиторий GitHub.
// Каждый профиль — файл progress/<id>.json. Токен хранится только в этом браузере (настройки устройства).
// Пишем через GitHub Contents API: после изменений с задержкой, и сразу — когда вкладку скрывают/закрывают.
(function () {
  const API = 'https://api.github.com';
  const DELAY = 8000;          // подождать после последнего изменения, чтобы не делать коммит на каждый клик
  const shas = {};             // id → sha файла в репозитории
  let timer = null, busy = null, state = 'off', lastError = '';
  const listeners = [];

  const cfg = () => Store.s.settings.sync;
  const enabled = () => { const c = cfg(); return !!(c.owner && c.repo && c.token); };
  const path = id => `progress/${encodeURIComponent(id)}.json`;
  function setState(st, err) { state = st; lastError = err || ''; listeners.forEach(f => f(state, lastError)); }

  // base64 <-> UTF-8 (в JSON есть русские имена)
  const enc = str => btoa(unescape(encodeURIComponent(str)));
  const dec = b64 => decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));

  async function gh(method, url, body, keepalive) {
    const c = cfg();
    const r = await fetch(`${API}/repos/${c.owner}/${c.repo}/contents/${url}`, {
      method, keepalive: !!keepalive, cache: 'no-store',
      headers: { Authorization: `Bearer ${c.token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (r.status === 404 && method === 'GET') return null;
    if (!r.ok) {
      const e = new Error(r.status === 401 ? 'Токен не подходит или истёк.' : r.status === 403 ? 'У токена нет прав на этот репозиторий (нужно Contents: Read and write).' : r.status === 404 ? 'Репозиторий не найден. Проверьте владельца и название.' : `GitHub ответил ${r.status}.`);
      e.status = r.status; throw e;
    }
    return r.status === 204 ? null : r.json();
  }

  async function fetchRemote(id) {
    const f = await gh('GET', path(id));
    if (!f) { delete shas[id]; return null; }
    shas[id] = f.sha;
    return JSON.parse(dec(f.content));
  }

  async function putRemote(p, keepalive) {
    const body = { message: `progress: ${p.name} (rev ${p.rev})`, content: enc(JSON.stringify(p, null, 1)) };
    if (shas[p.id]) body.sha = shas[p.id];
    const res = await gh('PUT', path(p.id), body, keepalive);
    if (res && res.content) shas[p.id] = res.content.sha;
  }

  // Подтянуть облачную версию текущего профиля и слить с локальной.
  // replace: true в файле — значит, его поправили вручную, и облачная версия главнее.
  async function pull() {
    const local = Store.s;
    if (!enabled() || !local.id) return;
    const remote = await fetchRemote(local.id);
    if (!remote) return 'missing';
    if (remote.replace) {
      delete remote.replace;
      remote.rev = Math.max(remote.rev || 0, local.rev || 0) + 1;
      remote.resetAt = remote.updatedAt = Date.now();
      Store.replaceCurrent(remote);
      return 'changed';
    }
    if ((remote.rev || 0) === (local.rev || 0) && (remote.updatedAt || 0) === (local.updatedAt || 0)) return 'same';
    Store.replaceCurrent(Store.merge(local, remote));
    return 'changed';
  }

  async function push(keepalive) {
    if (!enabled() || !Store.s.id) return;
    try {
      await putRemote(Store.s, keepalive);
    } catch (e) {
      if (e.status !== 409 && e.status !== 422) throw e;
      // файл изменился на другом компьютере: сливаем и пробуем ещё раз
      await pull();
      await putRemote(Store.s, keepalive);
    }
  }

  // Общая очередь: одна операция с GitHub за раз
  function run(fn) {
    const job = (busy || Promise.resolve()).catch(() => {}).then(async () => {
      setState('saving');
      try { const r = await fn(); setState('ok'); return r; }
      catch (e) { setState(navigator.onLine === false ? 'offline' : 'error', e.message || String(e)); throw e; }
    });
    busy = job;
    return job;
  }

  let dirty = false;
  function schedule() {
    if (!enabled()) return;
    dirty = true; setState('pending');
    clearTimeout(timer);
    timer = setTimeout(flush, DELAY);
  }
  function flush(keepalive) {
    clearTimeout(timer);
    if (!dirty || !enabled()) return Promise.resolve();
    dirty = false;
    return run(() => push(keepalive)).catch(() => { dirty = true; });
  }

  Store.onSave(schedule);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(true); });
  window.addEventListener('pagehide', () => flush(true));
  window.addEventListener('online', () => { if (dirty) flush(); });

  const Sync = {
    enabled,
    get state() { return enabled() ? state : 'off'; },
    get error() { return lastError; },
    onState(f) { listeners.push(f); },
    flush: () => flush(false),
    // при запуске: подтянуть свежую версию, затем отправить локальные изменения
    async start() {
      if (!enabled() || !Store.s.id) return;
      try {
        const r = await run(pull);
        if (r === 'missing' || (Store.s.rev && !shas[Store.s.id])) { dirty = true; await flush(); }
        return r;
      } catch (e) { return 'error'; }
    },
    // список профилей в облаке: [{ id, name, updatedAt }]
    async listRemote() {
      if (!enabled()) return [];
      const files = await gh('GET', 'progress');
      if (!Array.isArray(files)) return [];
      const out = [];
      for (const f of files.filter(f => f.name.endsWith('.json'))) {
        const id = decodeURIComponent(f.name.slice(0, -5));
        try { const p = await fetchRemote(id); if (p) out.push(p); } catch (e) {}
      }
      return out;
    },
    // проверка настроек: есть ли доступ на чтение и запись
    async test() {
      const c = cfg();
      const r = await fetch(`${API}/repos/${c.owner}/${c.repo}`, { headers: { Authorization: `Bearer ${c.token}`, Accept: 'application/vnd.github+json' }, cache: 'no-store' });
      if (r.status === 401) throw new Error('Токен не подходит или истёк.');
      if (r.status === 404) throw new Error('Репозиторий не найден (или у токена нет к нему доступа).');
      if (!r.ok) throw new Error(`GitHub ответил ${r.status}.`);
      const info = await r.json();
      if (info.permissions && !info.permissions.push) throw new Error('Токен может только читать. Нужно право Contents: Read and write.');
      if (!info.private) return 'Работает. Внимание: репозиторий публичный, прогресс увидят все. Лучше сделать его приватным.';
      return 'Работает! Прогресс будет сохраняться в GitHub.';
    },
  };
  window.Sync = Sync;
})();
