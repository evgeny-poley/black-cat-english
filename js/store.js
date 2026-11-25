// Хранилище: профили учеников, прогресс каждого профиля + интервальное повторение слов.
// Прогресс профиля лежит в localStorage и (если настроено) синхронизируется с GitHub через Sync.
// Настройки устройства (голос, скорость, токен GitHub) хранятся отдельно и в облако не уходят.
(function () {
  const LEGACY_KEY = 'bce_progress_v1';     // старый формат: один прогресс на браузер
  const PROFILES_KEY = 'bce_profiles_v1';   // { current, list: [{ id, name }] }
  const DEVICE_KEY = 'bce_device_v1';       // настройки этого компьютера
  const pKey = id => 'bce_p_' + id;
  // через сколько дней снова показать слово на уровне box
  const INTERVALS = [0, 1, 2, 4, 7, 14, 30];
  const LEARNED_BOX = 3; // слово «выучено», когда угадано правильно в 3 разных дня

  function dayNum(d = new Date()) {
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 864e5);
  }
  const read = k => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  function deviceDefaults() {
    return { rate: 0.85, voiceName: '', ruVoice: true, recog: false, unlockAll: false, sync: { owner: '', repo: '', token: '' } };
  }
  function progressDefaults(id, name) {
    return { v: 2, id, name, words: {}, lessons: {}, rev: 0, updatedAt: 0 };
  }

  // --- загрузка ---
  const device = Object.assign(deviceDefaults(), read(DEVICE_KEY) || {});
  device.sync = Object.assign(deviceDefaults().sync, device.sync || {});
  let profiles = read(PROFILES_KEY) || { current: '', list: [] };
  const legacy = read(LEGACY_KEY);
  if (legacy && legacy.settings && !read(DEVICE_KEY)) {
    // настройки старого формата переносим на устройство
    ['rate', 'voiceName', 'ruVoice', 'recog', 'unlockAll'].forEach(k => { if (k in legacy.settings) device[k] = legacy.settings[k]; });
    write(DEVICE_KEY, device);
  }

  let s = null; // прогресс текущего профиля; s.settings — ссылка на настройки устройства
  function attach(p) { s = p; Object.defineProperty(s, 'settings', { value: device, enumerable: false, configurable: true }); }
  function loadProfile(id) {
    const meta = profiles.list.find(p => p.id === id);
    if (!meta) return false;
    const p = Object.assign(progressDefaults(id, meta.name), read(pKey(id)) || {});
    attach(p);
    return true;
  }
  if (!profiles.current || !loadProfile(profiles.current)) attach(progressDefaults('', ''));

  const listeners = [];
  // touch=false — сохранить без отметки «изменено» (например, после загрузки из облака)
  function save(touch = true) {
    if (s.id) {
      if (touch) { s.rev = (s.rev || 0) + 1; s.updatedAt = Date.now(); }
      write(pKey(s.id), s);
    }
    write(DEVICE_KEY, device);
    if (touch && s.id) listeners.forEach(f => f(s));
  }

  // id профиля: имя латиницей + 4 случайных символа (так проще найти файл в GitHub)
  const TR = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' };
  function makeId(name) {
    const slug = name.toLowerCase().split('').map(c => TR[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 20) || 'kid';
    return slug + '-' + Math.random().toString(36).slice(2, 6);
  }

  // Слияние двух версий прогресса (с разных компьютеров): ничего не теряем.
  function merge(a, b) {
    // сброс или восстановление из файла на одной стороне — эта сторона главнее всего, что было раньше
    const whole = (x, y) => Object.assign(JSON.parse(JSON.stringify(x)), { rev: Math.max(x.rev || 0, y.rev || 0) + 1 });
    if ((a.resetAt || 0) > (b.updatedAt || 0)) return whole(a, b);
    if ((b.resetAt || 0) > (a.updatedAt || 0)) return whole(b, a);
    const out = Object.assign({}, a, { words: {}, lessons: {} });
    const ids = new Set([...Object.keys(a.words || {}), ...Object.keys(b.words || {})]);
    ids.forEach(id => {
      const x = a.words?.[id], y = b.words?.[id];
      if (!x || !y) { out.words[id] = Object.assign({}, x || y); return; }
      // больше попыток = более свежая история слова; при равенстве — тот, у кого последний ответ позже
      const nx = x.ok + x.bad, ny = y.ok + y.bad;
      out.words[id] = Object.assign({}, nx > ny || (nx === ny && x.last >= y.last) ? x : y);
      out.words[id].intro = !!(x.intro || y.intro);
    });
    const ls = new Set([...Object.keys(a.lessons || {}), ...Object.keys(b.lessons || {})]);
    ls.forEach(n => {
      const x = a.lessons?.[n] || {}, y = b.lessons?.[n] || {}, L = {};
      ['class', 'home'].forEach(m => {
        const px = x[m], py = y[m];
        if (!px && !py) return;
        if (!px || !py) { L[m] = JSON.parse(JSON.stringify(px || py)); return; }
        const skills = Object.assign({}, px.skills);
        Object.entries(py.skills || {}).forEach(([k, v]) => { skills[k] = Math.max(skills[k] || 0, v); });
        L[m] = { score: Math.max(px.score, py.score), skills, times: Math.max(px.times, py.times), last: Math.max(px.last || 0, py.last || 0) };
      });
      if (x.classDone || y.classDone) L.classDone = true;
      if (x.homeDone || y.homeDone) L.homeDone = true;
      out.lessons[n] = L;
    });
    out.rev = Math.max(a.rev || 0, b.rev || 0) + 1;
    out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
    out.name = b.name || a.name;
    return out;
  }

  const Store = {
    get s() { return s; },
    save, dayNum, LEARNED_BOX, merge,
    onSave(f) { listeners.push(f); },

    // --- профили ---
    get profile() { return s.id ? { id: s.id, name: s.name } : null; },
    profiles() { return profiles.list.slice(); },
    hasLegacy() { return !!(legacy && legacy.words && Object.keys(legacy.words).length); },
    // takeLegacy — забрать в новый профиль прогресс, накопленный до появления профилей
    createProfile(name, takeLegacy, id) {
      id = id || makeId(name);
      profiles.list.push({ id, name });
      profiles.current = id;
      write(PROFILES_KEY, profiles);
      const p = progressDefaults(id, name);
      if (takeLegacy && legacy) {
        Object.assign(p, { words: legacy.words || {}, lessons: legacy.lessons || {} });
        try { localStorage.setItem(LEGACY_KEY + '_backup', JSON.stringify(legacy)); localStorage.removeItem(LEGACY_KEY); } catch (e) {}
      }
      attach(p);
      save();
      return id;
    },
    switchProfile(id) {
      if (!loadProfile(id)) return false;
      profiles.current = id;
      write(PROFILES_KEY, profiles);
      return true;
    },
    // профиль, который пришёл из облака, но на этом компьютере его ещё нет
    addRemoteProfile(remote) {
      if (!profiles.list.find(p => p.id === remote.id)) profiles.list.push({ id: remote.id, name: remote.name });
      write(pKey(remote.id), remote);
      return Store.switchProfile(remote.id);
    },
    logout() { profiles.current = ''; write(PROFILES_KEY, profiles); attach(progressDefaults('', '')); },
    // заменить прогресс текущего профиля версией из облака (уже слитой)
    replaceCurrent(p) {
      const id = s.id;
      attach(Object.assign(progressDefaults(id, p.name || s.name), p, { id }));
      const meta = profiles.list.find(x => x.id === id);
      if (meta && s.name && meta.name !== s.name) { meta.name = s.name; write(PROFILES_KEY, profiles); }
      save(false);
    },

    // --- слова ---
    word(id) {
      return s.words[id] || (s.words[id] = { box: 0, last: -1, due: 0, ok: 0, bad: 0, intro: false });
    },
    peekWord(id) { return s.words[id] || null; },
    introduce(ids) {
      ids.forEach(id => { const w = Store.word(id); if (!w.intro) { w.intro = true; w.due = dayNum(); } });
      save();
    },
    // Учитываем только первую попытку. Повышаем уровень не чаще раза в день.
    recordWord(id, correct) {
      const w = Store.word(id), d = dayNum();
      w.intro = true;
      if (correct) {
        w.ok++;
        if (w.last !== d) {
          w.box = Math.min(INTERVALS.length - 1, w.box + 1);
          w.last = d;
          w.due = d + INTERVALS[w.box];
        }
      } else {
        w.bad++;
        w.box = Math.max(0, w.box - 1);
        w.last = d;
        w.due = d + 1;
      }
      save();
    },
    isLearned(id) { return (s.words[id]?.box || 0) >= LEARNED_BOX; },
    introducedWords() { return Object.keys(s.words).filter(id => s.words[id].intro && COURSE.words[id]); },
    dueWords() {
      const d = dayNum();
      return Store.introducedWords().filter(id => s.words[id].due <= d);
    },

    // --- уроки ---
    lesson(n) { return s.lessons[n] || (s.lessons[n] = {}); },
    peek(n) { return s.lessons[n] || {}; },
    // mode: 'class' | 'home'. Храним лучший результат по каждому навыку.
    saveResult(n, mode, res) {
      const L = Store.lesson(n), prev = L[mode] || { score: 0, skills: {}, times: 0 };
      const skills = Object.assign({}, prev.skills);
      Object.entries(res.skills).forEach(([k, v]) => { skills[k] = Math.max(skills[k] || 0, v); });
      L[mode] = { score: Math.max(prev.score, res.score), skills, times: prev.times + 1, last: dayNum() };
      L[mode + 'Done'] = true;
      save();
    },

    // --- файл ---
    exportJSON() { return JSON.stringify(s, null, 2); },
    importJSON(text) {
      const obj = JSON.parse(text);
      if (!obj || typeof obj !== 'object' || !obj.words || !obj.lessons) throw new Error('bad file');
      s.words = obj.words; s.lessons = obj.lessons;
      save(); s.resetAt = s.updatedAt; save(false);
    },
    reset() { s.words = {}; s.lessons = {}; save(); s.resetAt = s.updatedAt; save(false); },
  };
  window.Store = Store;
})();
