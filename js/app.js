// Экраны: карта, урок, повторение, книга заклинаний, настройки, сценарий.
(function () {
  const { h, md, pic, resolve, enText, shuffle, sample, sleep, Sound } = UI;
  const app = document.getElementById('app');
  const SKILLS = {
    words:     { label: 'Слова',      color: '#F6B92B' },
    listening: { label: 'Слух',       color: '#3FA3F2' },
    grammar:   { label: 'Грамматика', color: '#8B63F0' },
    reading:   { label: 'Чтение',     color: '#2EC4A0' },
  };

  // ---------- прогресс ----------
  const available = n => Store.s.settings.unlockAll || n === 1 || !!Store.peek(n - 1).classDone;
  function stars(n) {
    const P = Store.peek(n);
    return (P.classDone ? 1 : 0) + (P.homeDone ? 1 : 0) + (P.home && P.home.score >= 0.9 ? 1 : 0);
  }
  function skillValue(skill) {
    if (skill === 'words') {
      // частичный зачёт: каждый «день узнавания» слова добавляет треть
      const pts = Object.keys(COURSE.words).reduce((a, id) => a + Math.min(3, (Store.peekWord(id) || {}).box || 0) / 3, 0);
      return pts / COURSE.totalWords;
    }
    let sum = 0;
    COURSE.plan.forEach(p => {
      const L = COURSE.lessons[p.n]; if (!L) return;
      const modes = ['class', 'home'].filter(m => L[m].some(s => (s.skill || []).includes(skill)));
      if (!modes.length) return;
      const P = Store.peek(p.n);
      sum += modes.reduce((a, m) => a + ((P[m] && P[m].skills[skill]) || 0), 0) / modes.length;
    });
    return sum / COURSE.plan.length;
  }
  function currentLesson() {
    for (const p of COURSE.plan) {
      const P = Store.peek(p.n);
      if (!(P.classDone && P.homeDone)) return available(p.n) ? p.n : p.n - 1;
    }
    return COURSE.plan.length;
  }

  // ---------- общие элементы ----------
  function potion(key, value, sub) {
    const S = SKILLS[key], v = Math.max(0, Math.min(1, value));
    const id = 'clip-' + key;
    const top = 30, bottom = 132, y = bottom - (bottom - top) * v;
    const bottle = 'M38 14 h24 v22 C80 44 92 62 92 86 C92 114 72 134 50 134 C28 134 8 114 8 86 C8 62 20 44 38 36 Z';
    const svg = `<svg viewBox="0 0 100 140" aria-hidden="true">
      <defs><clipPath id="${id}"><path d="${bottle}"/></clipPath></defs>
      <path d="${bottle}" fill="#fff" stroke="#2A2550" stroke-width="4"/>
      <g clip-path="url(#${id})">
        <rect x="0" y="${y}" width="100" height="140" fill="${S.color}"/>
        <path d="M0 ${y} q12 -6 25 0 t25 0 t25 0 t25 0 v6 h-100z" fill="#fff" opacity=".35"/>
        <circle cx="34" cy="${Math.min(120, y + 18)}" r="4" fill="#fff" opacity=".5"/>
        <circle cx="62" cy="${Math.min(124, y + 30)}" r="3" fill="#fff" opacity=".5"/>
      </g>
      <path d="${bottle}" fill="none" stroke="#2A2550" stroke-width="4"/>
      <rect x="34" y="4" width="32" height="14" rx="5" fill="#C98B4B" stroke="#2A2550" stroke-width="4"/>
      <path d="M24 70 C22 82 24 96 30 106" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>
    </svg>`;
    return h('div', { class: 'potion' }, h('div', { class: 'bottle', html: svg }),
      h('div', { class: 'plabel' }, S.label), h('div', { class: 'pval' }, sub || Math.round(v * 100) + '%'));
  }
  function starsRow(n, big) {
    const s = stars(n);
    return h('div', { class: 'stars' + (big ? ' big' : '') }, [0, 1, 2].map(i => h('span', { class: i < s ? 'on' : '' }, '★')));
  }
  function topbar(title, extra) {
    return h('header', { class: 'topbar' },
      h('a', { class: 'ghost', href: '#/' }, '← Карта'),
      h('h1', {}, title), extra || h('span'));
  }

  // ---------- главная: карта ----------
  function viewHome() {
    const learned = Object.keys(COURSE.words).filter(id => Store.isLearned(id)).length;
    const due = Store.dueWords().length;
    const head = h('header', { class: 'home-head' },
      h('div', { class: 'logo' }, pic('blackcat', 'logo-pic'),
        h('div', {}, h('div', { class: 'logo-t' }, 'Black Cat English'), h('div', { class: 'logo-s' }, 'Волшебный английский'))),
      h('nav', {},
        h('div', { class: 'who' }, h('span', { class: 'who-hi' }, `Привет, ${Store.profile.name}!`),
          h('button', { class: 'who-sw', title: 'Сменить ученика', onclick: () => { Sync.flush(); Store.logout(); route(); } }, 'это не я'),
          syncChip()),
        h('a', { class: 'btn', href: '#/book' }, '📖 Книга заклинаний'),
        h('a', { class: 'btn icon', href: '#/settings', title: 'Для родителей' }, '⚙️')));

    const potions = h('section', { class: 'potions' },
      potion('words', skillValue('words'), `выучено ${learned} из ${COURSE.totalWords}`),
      potion('listening', skillValue('listening')),
      potion('grammar', skillValue('grammar')),
      potion('reading', skillValue('reading')));

    const review = due
      ? h('a', { class: 'review-banner', href: '#/review' }, h('span', { class: 'rb-e' }, '🔁'),
          h('div', {}, h('b', {}, `Повторение: ${due} ${plural(due, 'слово', 'слова', 'слов')} ждут тебя`),
            h('div', { class: 'small' }, '3 минуты, чтобы слова не убежали из памяти')), h('span', { class: 'rb-go' }, '→'))
      : null;

    app.append(h('div', { class: 'wrap' }, head, potions, review, viewMap(),
      h('p', { class: 'muted small center' }, 'Слово считается выученным, когда ты узнала его в три разных дня.')));
  }
  const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? b : c; };

  function viewMap() {
    const xs = [12, 37, 63, 88], ys = [17, 49, 81];
    const pts = COURSE.plan.map((p, i) => {
      const row = Math.floor(i / 4), col = i % 4;
      return { x: row % 2 ? xs[3 - col] : xs[col], y: ys[row] };
    });
    let d = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      if (a.y !== b.y) { const dx = a.x > 50 ? 11 : -11; d += ` C${a.x + dx} ${a.y} ${b.x + dx} ${b.y} ${b.x} ${b.y}`; }
      else d += ` L${b.x} ${b.y}`;
    }
    const cur = currentLesson();
    const map = h('section', { class: 'map' },
      h('div', { class: 'map-road', html: `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${d}" class="road"/><path d="${d}" class="road-dash"/></svg>` }));
    COURSE.plan.forEach((p, i) => {
      const L = COURSE.lessons[p.n], P = Store.peek(p.n), open = available(p.n) && !!L;
      const state = !L ? 'soon' : !open ? 'locked' : P.classDone && P.homeDone ? 'done' : 'open';
      const stop = h('button', { class: `stop ${state}${p.n === cur ? ' current' : ''}`, style: { left: pts[i].x + '%', top: pts[i].y + '%' } },
        h('div', { class: 'stop-dot' }, state === 'locked' || state === 'soon' ? '🔒' : p.icon),
        h('div', { class: 'stop-n' }, p.n),
        starsRow(p.n),
        h('div', { class: 'stop-t' }, p.place));
      stop.onclick = () => openSheet(p.n);
      map.append(stop);
    });
    const ci = Math.max(0, Math.min(COURSE.plan.length - 1, cur - 1));
    map.append(h('div', { class: 'taxi', style: { left: pts[ci].x + '%', top: pts[ci].y + '%' } }, pic('susan', 'taxi-pic')));
    return map;
  }

  function openSheet(n) {
    const p = COURSE.plan[n - 1], L = COURSE.lessons[n], P = Store.peek(n);
    const close = () => ov.remove();
    const body = h('div', { class: 'sheet', onclick: e => e.stopPropagation() },
      h('button', { class: 'close', onclick: close, 'aria-label': 'Закрыть' }, '✕'),
      h('div', { class: 'sheet-icon' }, p.icon),
      h('div', { class: 'muted small' }, `Остановка ${n} · ${p.place}`),
      h('h2', {}, p.title), h('p', {}, p.ru), starsRow(n, true));
    if (!L) body.append(h('p', { class: 'note' }, '🚧 Этот урок скоро появится.'));
    else if (!available(n)) body.append(h('p', { class: 'note' }, '🔒 Сначала пройди предыдущий урок с папой.'));
    else {
      const homeOpen = P.classDone || Store.s.settings.unlockAll;
      body.append(h('div', { class: 'sheet-actions' },
        h('a', { class: 'btn primary big', href: `#/lesson/${n}/class` }, '👨‍👧 Урок с папой', h('small', {}, '30 минут')),
        homeOpen
          ? h('a', { class: 'btn gold big', href: `#/lesson/${n}/home` }, '🏠 Домашка', h('small', {}, P.homeDone ? 'можно пройти ещё раз' : '10–15 минут'))
          : h('div', { class: 'btn big disabled' }, '🏠 Домашка', h('small', {}, 'откроется после урока'))),
        h('a', { class: 'ghost', href: `#/script/${n}` }, '📜 Сценарий урока для папы'));
    }
    const ov = h('div', { class: 'overlay', onclick: close }, body);
    document.body.append(ov);
  }

  // ---------- проигрыватель шагов ----------
  function runSteps(cfg) {
    const stats = {};
    let i = 0, token = 0, finished = false;
    const n = cfg.steps.length;
    const dots = h('div', { class: 'dots' }, cfg.steps.map(() => h('i')));
    const stage = h('div', { class: 'stage' });
    const next = h('button', { class: 'btn primary next' }, 'Дальше →');
    const teacher = cfg.mode === 'class' ? h('aside', { class: 'teacher' }) : null;
    const back = h('button', { class: 'ghost' }, '← Карта');
    back.onclick = () => { if (i === 0 || i >= n || confirm('Выйти? Результат этого занятия не сохранится.')) location.hash = '#/'; };
    app.append(h('div', { class: 'lesson mode-' + cfg.mode },
      h('header', { class: 'ltop' }, back, h('div', { class: 'ltitle' }, cfg.title), dots),
      h('div', { class: 'lmain' }, h('div', { class: 'stagewrap' }, stage, h('div', { class: 'lfoot' }, next)), teacher)));

    next.onclick = () => { if (next.disabled) return; i++; i >= n ? end() : show(); };

    function show() {
      const my = ++token; finished = false;
      Speech.stop();
      window.scrollTo(0, 0);
      const step = cfg.steps[i];
      [...dots.children].forEach((d, k) => d.className = k < i ? 'done' : k === i ? 'cur' : '');
      const text = step.instr || INSTR[step.type] || '';
      const intro = cfg.mode !== 'class' && Store.s.settings.ruVoice && text ? Speech.say(text, { lang: 'ru' }) : Promise.resolve();
      const body = h('div', { class: 'exbody ex-' + step.type });
      stage.replaceChildren(
        h('div', { class: 'instr' }, h('button', { class: 'ru-say', onclick: () => Speech.say(text, { lang: 'ru' }), 'aria-label': 'Озвучить задание' }, '🔈'), h('span', {}, text)),
        step.title && !['rule', 'story', 'offline'].includes(step.type) ? h('h2', { class: 'stitle' }, step.title) : '', body);
      if (cfg.mode === 'class') { next.disabled = false; next.classList.remove('ready'); next.textContent = 'Пропустить →'; }
      else { next.disabled = true; next.classList.remove('ready'); next.textContent = 'Дальше →'; }
      if (teacher) teacher.replaceChildren(
        h('div', { class: 'tlabel' }, `👨 Подсказка для папы · шаг ${i + 1} из ${n}`),
        ...[step.time ? h('div', { class: 'ttime' }, '⏱ ' + step.time) : ''],
        ...(step.teacher || ['Этот шаг она делает сама.']).map(t => h('p', { html: md(t) })));
      const api = {
        mode: cfg.mode, intro,
        result(ok, words) {
          if (my !== token) return;
          (step.skill || []).forEach(sk => { const s = stats[sk] || (stats[sk] = { r: 0, t: 0 }); s.t++; if (ok) s.r++; });
          (words || []).forEach(w => { if (COURSE.words[w]) Store.recordWord(w, ok); });
        },
        finish() {
          if (my !== token || finished) return;
          finished = true;
          next.disabled = false; next.classList.add('ready');
          next.textContent = i === n - 1 ? 'Завершить ✓' : 'Дальше →';
        },
      };
      EX[step.type](body, step, api);
    }

    function end() {
      token++; Speech.stop();
      [...dots.children].forEach(d => d.className = 'done');
      const skills = {}; let r = 0, t = 0;
      Object.entries(stats).forEach(([k, s]) => { skills[k] = s.t ? s.r / s.t : 1; r += s.r; t += s.t; });
      const res = { skills, score: t ? r / t : 1 };
      next.remove();
      if (teacher) teacher.replaceChildren(h('div', { class: 'tlabel' }, '👨 Подсказка для папы'),
        h('p', { html: md('Похвалите за **конкретное**: «Ты сама поняла загадку!», «Ты сказала I’m tired без подсказки!». Это работает лучше, чем «молодец».') }),
        h('p', {}, 'Домашку лучше сделать сегодня вечером или завтра. Повторение слов на карте появится через день.'));
      stage.replaceChildren(cfg.onEnd(res));
      Sound.win();
      confetti();
    }
    show();
  }

  function confetti() {
    const box = h('div', { class: 'confetti' });
    const items = ['⭐', '✨', '🌟', '💫', '🎉'];
    for (let k = 0; k < 28; k++) box.append(h('span', { style: { left: Math.random() * 100 + '%', animationDelay: Math.random() * 0.8 + 's', fontSize: 18 + Math.random() * 22 + 'px' } }, items[k % items.length]));
    document.body.append(box);
    setTimeout(() => box.remove(), 3500);
  }
  function skillBars(skills) {
    return h('div', { class: 'sbars' }, Object.entries(skills).filter(([k]) => SKILLS[k]).map(([k, v]) =>
      h('div', { class: 'sbar' }, h('span', {}, SKILLS[k].label),
        h('div', { class: 'track' }, h('i', { style: { width: Math.round(v * 100) + '%', background: SKILLS[k].color } })),
        h('b', {}, Math.round(v * 100) + '%'))));
  }

  // ---------- урок ----------
  function viewLesson(n, mode) {
    const L = COURSE.lessons[n];
    if (!L || !['class', 'home'].includes(mode) || !available(n)) { location.hash = '#/'; return; }
    runSteps({
      title: `Урок ${n} · ${mode === 'class' ? 'с папой' : 'домашка'}`,
      mode, steps: L[mode],
      onEnd(res) {
        Store.saveResult(n, mode, res);
        const words = Object.keys(L.words);
        return h('div', { class: 'summary' },
          h('div', { class: 'big-emoji' }, mode === 'class' ? '🏆' : '🏅'),
          h('h2', {}, mode === 'class' ? 'Урок пройден!' : 'Домашка сделана!'),
          starsRow(n, true),
          h('p', {}, mode === 'class' ? 'Новые слова попали в Книгу заклинаний. Домашка открыта!' : `Правильно с первого раза: ${Math.round(res.score * 100)}%`),
          skillBars(res.skills),
          h('div', { class: 'chips' }, words.map(id => h('button', { class: 'chip', onclick: () => Speech.say(resolve(id).en) }, pic(id, 'tiny'), resolve(id).en))),
          h('a', { class: 'btn primary big', href: '#/' }, '🗺 На карту'));
      },
    });
  }

  // ---------- повторение ----------
  function viewReview() {
    let words = Store.dueWords();
    const all = Store.introducedWords();
    if (!all.length) {
      app.append(h('div', { class: 'wrap' }, topbar('Повторение'), h('div', { class: 'empty' }, h('div', { class: 'big-emoji' }, '🕵️‍♂️'), h('p', {}, 'Пока нечего повторять: сначала пройди первый урок.'))));
      return;
    }
    if (!words.length) words = sample(all, Math.min(8, all.length));
    words = sample(words, Math.min(10, words.length));
    const pool = all.length >= 4 ? all : Object.keys(COURSE.words);
    const half = Math.ceil(words.length / 2);
    const steps = [
      { type: 'listen_pick', words: words.slice(0, half), pool, opts: 4, skill: [] },
      { type: 'read_pick', words: words.slice(half).length ? words.slice(half) : words, pool, opts: 3, skill: [] },
    ];
    runSteps({
      title: 'Повторение', mode: 'review', steps,
      onEnd(res) {
        return h('div', { class: 'summary' }, h('div', { class: 'big-emoji' }, '🧠'),
          h('h2', {}, 'Повторение готово!'),
          h('p', {}, `Ты повторила ${words.length} ${plural(words.length, 'слово', 'слова', 'слов')}. Слова, которые ты узнала, вернутся позже, а трудные — завтра.`),
          h('a', { class: 'btn primary big', href: '#/' }, '🗺 На карту'));
      },
    });
  }

  // ---------- книга заклинаний ----------
  function viewBook() {
    const wrap = h('div', { class: 'wrap' }, topbar('📖 Книга заклинаний'));
    const opened = Store.introducedWords().length;
    wrap.append(h('p', { class: 'muted center' }, `Открыто слов: ${opened}. Нажми на слово, чтобы услышать его. Звёзды показывают, насколько крепко слово выучено.`));
    COURSE.plan.forEach(p => {
      const L = COURSE.lessons[p.n]; if (!L) return;
      const sec = h('section', { class: 'book-sec' }, h('h2', {}, `${p.icon} Урок ${p.n}: ${p.title}`));
      const g = h('div', { class: 'cards book' });
      Object.keys(L.words).forEach(id => {
        const w = resolve(id), W = Store.peekWord(id);
        if (!W || !W.intro) { g.append(h('div', { class: 'card locked' }, h('div', { class: 'pic' }, h('span', { class: 'emoji' }, '❔')), h('div', { class: 'cen' }, '???'))); return; }
        const lvl = Math.min(3, W.box);
        g.append(h('button', { class: 'card' + (lvl >= 3 ? ' learned' : ''), onclick: () => Speech.say(w.en) },
          pic(id), h('div', { class: 'cen' }, w.en), h('div', { class: 'cru vis' }, w.ru),
          h('div', { class: 'lvl' }, [0, 1, 2].map(k => h('span', { class: k < lvl ? 'on' : '' }, '★')))));
      });
      sec.append(g);
      const rules = L.class.filter(s => s.type === 'rule');
      if (rules.length && Store.peek(p.n).classDone) sec.append(h('h3', {}, 'Заклинания'), rules.map(r => renderRule(r)));
      wrap.append(sec);
    });
    app.append(wrap);
  }

  // ---------- значок облачного сохранения ----------
  const SYNC_TXT = { off: '', ok: '☁️ сохранено', saving: '☁️ сохраняю…', pending: '☁️ сохраню чуть позже', offline: '📴 нет интернета, сохраню позже', error: '⚠️ не сохранилось в облако' };
  function syncChip() {
    if (!Sync.enabled()) return null;
    const el = h('span', { class: 'sync-chip' });
    const upd = () => { el.textContent = SYNC_TXT[Sync.state] || ''; el.className = 'sync-chip ' + Sync.state; el.title = Sync.error || ''; };
    upd(); Sync.onState(() => { if (el.isConnected) upd(); });
    return el;
  }

  // ---------- кто учится: выбор или создание профиля ----------
  function viewWho() {
    const enter = id => { Store.switchProfile(id); Sync.start().then(() => route()); };
    const input = h('input', { class: 'who-input', type: 'text', maxlength: '24', placeholder: 'Твоё имя', autocomplete: 'off' });
    const legacy = Store.hasLegacy() ? h('input', { type: 'checkbox' }) : null;
    const go = h('button', { class: 'btn primary big' }, 'Начать ✨');
    const create = () => {
      const name = input.value.trim().replace(/\s+/g, ' ');
      if (!name) { input.focus(); input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 500); return; }
      const same = Store.profiles().find(p => p.name.toLowerCase() === name.toLowerCase());
      if (same && !confirm(`Ученик «${same.name}» уже есть. Создать ещё одного с таким же именем?`)) return;
      Store.createProfile(name, legacy && legacy.checked);
      Sync.start().then(() => route());
    };
    go.onclick = create;
    input.onkeydown = e => { if (e.key === 'Enter') create(); };

    const mine = Store.profiles();
    const list = h('div', { class: 'who-list' }, mine.map(p => h('button', { class: 'btn who-btn', onclick: () => enter(p.id) }, '🧒 ' + p.name)));
    const cloud = h('div', { class: 'who-list' });
    const cloudNote = h('p', { class: 'muted small center' });
    if (Sync.enabled()) {
      cloudNote.textContent = '☁️ Ищу учеников в облаке…';
      Sync.listRemote().then(rs => {
        const extra = rs.filter(r => !mine.find(m => m.id === r.id));
        cloudNote.textContent = extra.length ? '☁️ Есть в облаке (с другого компьютера):' : '';
        cloud.replaceChildren(...extra.map(r => h('button', { class: 'btn who-btn', onclick: () => { Store.addRemoteProfile(r); Sync.start().then(() => route()); } }, '☁️ ' + r.name)));
      }).catch(e => { cloudNote.textContent = '⚠️ Облако недоступно: ' + e.message; });
    }

    app.append(h('div', { class: 'wrap narrow who-wrap' },
      h('div', { class: 'who-card panel' },
        pic('blackcat', 'who-pic'),
        h('h1', {}, 'Привет! Как тебя зовут?'),
        h('p', { class: 'muted' }, 'Напиши своё имя, и Чёрная кошка запомнит твой прогресс.'),
        input,
        legacy ? h('label', { class: 'check' }, legacy, h('div', {}, h('b', {}, 'Перенести уже пройденное'),
          h('div', { class: 'muted small' }, 'На этом компьютере уже проходили уроки без имени. Отметьте, если это были вы.'))) : null,
        go,
        mine.length ? h('p', { class: 'muted small center' }, 'Или выбери себя:') : null, list,
        cloudNote, cloud),
      h('p', { class: 'center' }, h('a', { class: 'ghost', href: '#/settings' }, '⚙️ Для родителей'))));
    setTimeout(() => input.focus(), 50);
  }

  // ---------- настройки для родителей ----------
  function viewSettings() {
    const S = Store.s.settings;
    const set = (k, v) => { S[k] = v; Store.save(); };
    const voiceSel = h('select', {});
    const fillVoices = () => {
      const vs = Speech.enVoices(), cur = Speech.enVoice();
      voiceSel.replaceChildren(h('option', { value: '' }, 'Автоматически'), ...vs.map(v => h('option', { value: v.name, selected: S.voiceName === v.name }, `${v.name} (${v.lang})`)));
      voiceNote.textContent = cur ? 'Сейчас звучит: ' + cur.name : 'Английский голос не найден. Проверьте браузер (лучше Chrome).';
    };
    const voiceNote = h('div', { class: 'muted small' });
    voiceSel.onchange = () => { set('voiceName', voiceSel.value); fillVoices(); Speech.say("Hello! I'm Black Cat."); };
    Speech.onVoices(() => { if (voiceSel.isConnected) fillVoices(); });
    const rate = h('input', { type: 'range', min: '0.5', max: '1.1', step: '0.05', value: S.rate });
    const rateV = h('b', {}, S.rate);
    rate.oninput = () => { rateV.textContent = rate.value; };
    rate.onchange = () => { set('rate', +rate.value); Speech.say("I'm happy. You're tired."); };
    const check = (key, label, note, disabled) => h('label', { class: 'check' + (disabled ? ' dis' : '') },
      h('input', { type: 'checkbox', checked: !!S[key], disabled, onchange: e => set(key, e.target.checked) }),
      h('div', {}, h('b', {}, label), note ? h('div', { class: 'muted small' }, note) : null));
    const file = h('input', { type: 'file', accept: '.json,application/json', style: { display: 'none' } });
    file.onchange = async () => {
      const f = file.files[0]; if (!f) return;
      try { Store.importJSON(await f.text()); alert('Прогресс восстановлен.'); location.hash = '#/'; }
      catch (e) { alert('Не получилось прочитать файл. Это точно файл прогресса из этого курса?'); }
    };
    const exportBtn = h('button', { class: 'btn' }, '💾 Сохранить прогресс в файл');
    exportBtn.onclick = () => {
      const a = h('a', { href: URL.createObjectURL(new Blob([Store.exportJSON()], { type: 'application/json' })), download: `black-cat-english-${new Date().toISOString().slice(0, 10)}.json` });
      document.body.append(a); a.click(); a.remove();
    };
    const resetBtn = h('button', { class: 'btn danger' }, '🗑 Сбросить весь прогресс');
    resetBtn.onclick = () => { if (confirm(`Стереть весь прогресс ученика «${Store.profile.name}»${Sync.enabled() ? ' (и в облаке тоже)' : ''}? Это нельзя отменить. Сначала можно сохранить его в файл.`)) { Store.reset(); Sync.flush(); location.hash = '#/'; } };

    app.append(h('div', { class: 'wrap narrow' }, topbar('⚙️ Для родителей'),
      h('section', { class: 'panel' }, h('h2', {}, 'Голос'),
        h('label', { class: 'field' }, h('span', {}, 'Английский голос'), voiceSel), voiceNote,
        h('label', { class: 'field' }, h('span', {}, 'Скорость речи: '), rateV, rate),
        h('div', { class: 'muted small' }, 'Для ребёнка 9 лет хорошо 0.8–0.9. У героев свой тембр, он зависит от голоса.'),
        h('button', { class: 'btn', onclick: () => Speech.say("Hello! I'm Reka. I'm a capybara.", { who: 'reka' }) }, '🔊 Проверить голос')),
      h('section', { class: 'panel' }, h('h2', {}, 'Занятия'),
        check('ruVoice', 'Озвучивать задания по-русски', 'В домашке и повторении инструкция читается вслух, чтобы не застревать на чтении.'),
        check('recog', 'Проверка произношения через микрофон',
          Speech.canListen ? 'Работает в Chrome и Edge. Звук отправляется на серверы Google (Microsoft в Edge) для распознавания. Без этой галочки произношение проверяете вы кнопкой «✓ Получилось».' : 'Этот браузер не умеет распознавать речь. Нужен Chrome или Edge.', !Speech.canListen),
        check('unlockAll', 'Открыть все уроки', 'Можно проходить уроки и домашки в любом порядке.')),
      cloudPanel(),
      Store.profile ? h('section', { class: 'panel' }, h('h2', {}, `Прогресс: ${Store.profile.name}`),
        h('p', { class: 'muted small' }, Sync.enabled()
          ? 'Прогресс хранится в этом браузере и копируется в GitHub. Файл — ещё одна запасная копия.'
          : 'Сейчас прогресс хранится только в этом браузере. Включите облачное сохранение выше или иногда сохраняйте его в файл.'),
        h('div', { class: 'row' }, exportBtn, h('button', { class: 'btn', onclick: () => file.click() }, '📂 Восстановить из файла'), file),
        resetBtn) : null));
    fillVoices();
  }

  function cloudPanel() {
    const C = Store.s.settings.sync;
    const field = (key, label, ph, type) => {
      const i = h('input', { type: type || 'text', value: C[key], placeholder: ph, autocomplete: 'off', spellcheck: 'false' });
      i.onchange = () => { C[key] = i.value.trim(); Store.save(false); };
      return h('label', { class: 'field col' }, h('span', {}, label), i);
    };
    const note = h('div', { class: 'muted small' });
    const testBtn = h('button', { class: 'btn' }, '🔌 Проверить');
    testBtn.onclick = async () => {
      document.activeElement && document.activeElement.blur();
      note.textContent = 'Проверяю…';
      try { note.textContent = '✅ ' + await Sync.test(); if (Store.profile) { await Sync.start(); } }
      catch (e) { note.textContent = '⚠️ ' + e.message; }
    };
    const nowBtn = h('button', { class: 'btn' }, '☁️ Сохранить сейчас');
    nowBtn.onclick = async () => { Store.save(); await Sync.flush(); note.textContent = Sync.state === 'ok' ? '✅ Сохранено в GitHub.' : '⚠️ ' + (Sync.error || 'Не получилось.'); };
    return h('section', { class: 'panel' }, h('h2', {}, '☁️ Облачное сохранение (GitHub)'),
      h('p', { class: 'muted small', html: md('Прогресс каждого ученика сохраняется файлом в ваш **приватный** репозиторий GitHub. Так он не потеряется и будет одинаковым на всех компьютерах. Токен хранится только в этом браузере и никуда, кроме GitHub, не отправляется. Как всё настроить, написано в README курса.') }),
      field('owner', 'Владелец репозитория (логин GitHub)', 'ваш-логин'),
      field('repo', 'Название репозитория', 'english-progress'),
      field('token', 'Токен (fine-grained, доступ только к этому репозиторию)', 'github_pat_…', 'password'),
      h('div', { class: 'row' }, testBtn, Store.profile ? nowBtn : null), note);
  }

  // ---------- сценарий урока для печати ----------
  function viewScript(n) {
    const L = COURSE.lessons[n], p = COURSE.plan[n - 1];
    if (!L) { location.hash = '#/'; return; }
    const describe = s => {
      if (s.words) return s.words.map(id => { const w = resolve(id); return `${w.en} — ${w.ru}`; }).join(', ');
      if (s.lines) return s.lines.map(l => `${COURSE.characters[l.who].name}: ${l.text}`).join(' / ');
      if (s.items) return s.items.map(it => it.en || it.text || it.s).join(' / ');
      if (s.rows) return s.rows.map(r => r.full + (r.short ? ' → ' + r.short : '')).join('; ');
      if (s.phrases) return s.phrases.map(x => x.en).join(' / ');
      return '';
    };
    const wrap = h('div', { class: 'wrap narrow script' }, topbar(`📜 Сценарий урока ${n}`, h('button', { class: 'btn', onclick: () => print() }, '🖨 Печать')),
      h('h2', {}, `${p.title}: ${p.ru}`),
      L.goal ? h('p', {}, h('b', {}, 'Цель урока: '), L.goal) : null,
      L.prep ? h('div', { class: 'panel' }, h('h3', {}, 'Перед уроком'), h('ul', {}, L.prep.map(t => h('li', { html: md(t) })))) : null,
      h('h3', {}, 'Урок с папой (~30 минут)'),
      h('ol', { class: 'steps' }, L.class.map(s => h('li', {},
        h('div', { class: 'st-h' }, h('b', {}, s.title || INSTR[s.type]), s.time ? h('span', { class: 'muted' }, ' · ' + s.time) : null),
        describe(s) ? h('div', { class: 'st-c' }, describe(s)) : null,
        (s.teacher || []).map(t => h('p', { html: md(t) }))))),
      h('h3', {}, 'Домашка (10–15 минут, она делает сама)'),
      h('ol', { class: 'steps' }, L.home.map(s => h('li', {}, h('b', {}, s.title || INSTR[s.type]), describe(s) ? h('div', { class: 'st-c' }, describe(s)) : null))));
    app.append(wrap);
  }

  // ---------- роутер ----------
  function route() {
    Speech.stop();
    document.querySelectorAll('.overlay').forEach(o => o.remove());
    app.replaceChildren();
    window.scrollTo(0, 0);
    const parts = (location.hash || '#/').slice(2).split('/');
    if (!Store.profile && parts[0] !== 'settings') { viewWho(); return; }
    switch (parts[0]) {
      case 'lesson': viewLesson(+parts[1], parts[2]); break;
      case 'review': viewReview(); break;
      case 'book': viewBook(); break;
      case 'settings': viewSettings(); break;
      case 'script': viewScript(+parts[1]); break;
      default: viewHome();
    }
  }
  window.addEventListener('hashchange', route);
  route();
  // при запуске подтянуть прогресс из облака; если он изменился и ребёнок на карте — перерисовать
  Sync.start().then(r => { if (r === 'changed' && (location.hash || '#/') === '#/') route(); });
})();
