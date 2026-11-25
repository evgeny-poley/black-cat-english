// Типы упражнений. Каждое: EX[type](box, step, api)
//   api.intro   — промис: закончилась ли озвучка инструкции
//   api.result(correct, wordIds) — первая попытка по заданию (идёт в прогресс)
//   api.finish() — упражнение пройдено, можно жать «Дальше»
(function () {
  const { h, md, pic, resolve, enText, shuffle, sample, sleep, Sound } = UI;

  const INSTR = {
    cards: 'Нажми на каждую карточку и повтори слово вслух',
    scene: 'Нажми на каждого героя и послушай',
    listen_pick: 'Послушай и нажми на нужную картинку',
    read_pick: 'Прочитай слово и нажми на картинку',
    pick_word: 'Что на картинке? Выбери слово',
    match: 'Нажми на картинку, а потом на её слово',
    fill: 'Вставь пропущенное слово',
    build: 'Собери предложение из слов',
    spell: 'Послушай и собери слово из букв',
    listen_who: 'Послушай загадку. Кто это говорит?',
    story: 'Послушай разговор, а потом ответь на вопросы',
    rule: 'Новое заклинание!',
    offline: 'Играем вместе с папой',
    speak: 'Послушай и скажи вслух',
  };

  // Общая логика заданий-вопросов: ошибка → можно исправить сразу,
  // а задание ещё раз появится в конце (только для тренировки, в счёт не идёт).
  function quiz(box, items, api, render) {
    const fill = h('i');
    const bar = h('div', { class: 'qbar' }, fill);
    const area = h('div', { class: 'qarea' });
    box.append(bar, area);
    const queue = items.map(it => ({ it, retry: false }));
    let done = 0;
    function next() {
      if (!box.isConnected && done > 0) return;
      if (!queue.length) { fill.style.width = '100%'; api.finish(); return; }
      const q = queue.shift();
      fill.style.width = (100 * done / (done + queue.length + 1)) + '%';
      area.replaceChildren();
      area.classList.remove('pop'); void area.offsetWidth; area.classList.add('pop');
      let first = true, locked = false;
      const attempt = (correct, after) => {
        if (locked) return false;
        if (first) {
          first = false;
          if (!q.retry) {
            api.result(correct, q.it.words || []);
            if (!correct) queue.push({ it: q.it, retry: true });
          }
        }
        if (correct) {
          locked = true; done++;
          Sound.ok();
          const p = after ? after() : Promise.resolve();
          Promise.all([p, sleep(700)]).then(() => sleep(400)).then(next);
        } else Sound.no();
        return true;
      };
      render(area, q.it, attempt);
    }
    next();
  }

  // Генерация заданий «выбери картинку» из списка слов
  function genPick(step) {
    if (step.items) return step.items;
    const pool = step.pool || step.words;
    const n = step.n || step.words.length, k = step.opts || 3;
    let order = [];
    while (order.length < n) order = order.concat(shuffle(step.words));
    return order.slice(0, n).map(ans => ({
      answer: ans,
      options: shuffle([ans].concat(sample(pool.filter(x => x !== ans), k - 1))),
      words: [ans],
    }));
  }
  const grid = n => h('div', { class: 'options cols' + Math.min(n, 4) });
  const bigPlay = (fn, small) => h('button', { class: 'bigplay' + (small ? ' small' : ''), onclick: fn, 'aria-label': 'Послушать' }, '🔊');

  const EX = {};

  // --- Слушаем и выбираем картинку ---
  EX.listen_pick = (box, step, api) => quiz(box, genPick(step), api, (area, it, attempt) => {
    const say = () => Speech.say(it.say || resolve(it.answer).en);
    const g = grid(it.options.length);
    it.options.forEach(o => {
      const b = h('button', { class: 'opt' }, pic(o), h('span', { class: 'lbl' }, resolve(o).en));
      b.onclick = () => {
        const ok = o === it.answer;
        if (!attempt(ok, () => sleep(150).then(say))) return;
        if (ok) { b.classList.add('right'); g.classList.add('solved'); }
        else { b.classList.add('wrong'); b.disabled = true; }
      };
      g.append(b);
    });
    g.classList.add('hide-lbl');
    area.append(bigPlay(say), g);
    api.intro.then(() => sleep(250)).then(() => { if (area.isConnected) say(); });
  });

  // --- Читаем слово и выбираем картинку ---
  EX.read_pick = (box, step, api) => quiz(box, genPick(step), api, (area, it, attempt) => {
    const w = resolve(it.answer);
    const g = grid(it.options.length);
    it.options.forEach(o => {
      const b = h('button', { class: 'opt' }, pic(o));
      b.onclick = () => {
        const ok = o === it.answer;
        if (!attempt(ok, () => sleep(150).then(() => Speech.say(w.en)))) return;
        if (ok) b.classList.add('right'); else { b.classList.add('wrong'); b.disabled = true; }
      };
      g.append(b);
    });
    area.append(h('div', { class: 'readword' }, w.en), g);
  });

  // --- Смотрим на картинку и выбираем слово ---
  EX.pick_word = (box, step, api) => quiz(box, genPick(step), api, (area, it, attempt) => {
    const w = resolve(it.answer);
    const opts = h('div', { class: 'wordopts' });
    it.options.forEach(o => {
      const b = h('button', { class: 'wbtn' }, resolve(o).en);
      b.onclick = () => {
        const ok = o === it.answer;
        if (!attempt(ok, () => sleep(150).then(() => Speech.say(w.en)))) return;
        if (ok) b.classList.add('right'); else { b.classList.add('wrong'); b.disabled = true; }
      };
      opts.append(b);
    });
    area.append(pic(it.answer, 'big'), opts);
  });

  // --- Детективная загадка: кто говорит? ---
  EX.listen_who = (box, step, api) => {
    const chars = step.options || Object.keys(COURSE.characters);
    quiz(box, step.items, api, (area, it, attempt) => {
      const say = () => Speech.say(it.text, { who: it.who });
      const bubble = h('div', { class: 'bubble big masked' }, enText(it.text, it.who));
      const g = grid(chars.length);
      shuffle(chars).forEach(c => {
        const b = h('button', { class: 'opt' }, pic(c), h('span', { class: 'lbl' }, COURSE.characters[c].name));
        b.onclick = () => {
          const ok = c === it.who;
          if (!attempt(ok, () => sleep(1600))) return;
          if (ok) { b.classList.add('right'); bubble.classList.remove('masked'); }
          else { b.classList.add('wrong'); b.disabled = true; }
        };
        g.append(b);
      });
      area.append(bigPlay(say), bubble, g);
      api.intro.then(() => sleep(250)).then(() => { if (area.isConnected) say(); });
    });
  };

  // --- Вставь пропущенное слово ---
  EX.fill = (box, step, api) => quiz(box, step.items, api, (area, it, attempt) => {
    const [a, b] = it.s.split('___');
    const full = it.s.replace('___', it.answer);
    const gap = h('span', { class: 'gap' }, '?');
    const opts = h('div', { class: 'wordopts' });
    shuffle(it.options).forEach(o => {
      const btn = h('button', { class: 'wbtn' }, o);
      btn.onclick = () => {
        const ok = o === it.answer;
        if (!attempt(ok, () => sleep(150).then(() => Speech.say(full)))) return;
        if (ok) { gap.textContent = o; gap.classList.add('filled'); btn.classList.add('right'); }
        else { btn.classList.add('wrong'); btn.disabled = true; }
      };
      opts.append(btn);
    });
    area.append(it.pic ? pic(it.pic, 'mid') : '', h('div', { class: 'sentence' }, a, gap, b), opts);
  });

  // --- Собери предложение из плиток ---
  EX.build = (box, step, api) => quiz(box, step.items, api, (area, it, attempt) => {
    const m = it.en.match(/^(.*?)([.!?])?$/);
    const body = m[1], punct = m[2] || '';
    const tiles = body.split(' ');
    const line = h('div', { class: 'buildline' });
    const punctEl = h('span', { class: 'punct' }, punct);
    line.append(punctEl);
    const bank = h('div', { class: 'bank' });
    const placed = [];
    const check = () => {
      if (placed.length !== tiles.length) return;
      const ok = placed.map(p => p.w).join(' ') === body;
      if (!attempt(ok, () => sleep(150).then(() => Speech.say(it.en)))) return;
      if (ok) { line.classList.add('right'); bank.classList.add('solved'); }
      else { line.classList.add('wrong'); setTimeout(() => line.classList.remove('wrong'), 600); }
    };
    shuffle(tiles.concat(it.extra || [])).forEach(w => {
      const t = h('button', { class: 'tile' }, w);
      t.onclick = () => {
        if (t.classList.contains('used') || line.classList.contains('right')) return;
        t.classList.add('used');
        const p = h('button', { class: 'tile placed' }, w);
        const entry = { w, p, t };
        placed.push(entry);
        p.onclick = () => {
          if (line.classList.contains('right')) return;
          placed.splice(placed.indexOf(entry), 1); p.remove(); t.classList.remove('used');
        };
        line.insertBefore(p, punctEl);
        check();
      };
      bank.append(t);
    });
    area.append(
      h('div', { class: 'prompt-ru' }, it.pic ? pic(it.pic, 'small') : null, h('span', {}, it.ru || '')),
      line, bank,
      h('button', { class: 'ghost hint', onclick: () => Speech.say(it.en) }, '🔊 Подсказка'),
    );
  });

  // --- Собери слово из букв ---
  EX.spell = (box, step, api) => quiz(box, step.words.map(id => ({ id, words: [id] })), api, (area, it, attempt) => {
    const w = resolve(it.id);
    const word = w.en.toLowerCase();
    const letters = word.split('');
    const extras = sample('abdeghiklmnoprstu'.split('').filter(c => !letters.includes(c)), 2);
    const slots = letters.map(() => ({ el: h('div', { class: 'slot' }), t: null }));
    const say = () => Speech.say(w.en);
    const bank = h('div', { class: 'bank letters' });
    const check = () => {
      if (slots.some(s => !s.t)) return;
      const ok = slots.map(s => s.t.textContent).join('') === word;
      if (!attempt(ok, () => sleep(150).then(say))) return;
      if (ok) { slots.forEach(s => s.el.classList.add('right')); bank.classList.add('solved'); return; }
      // неверные буквы подсвечиваем и возвращаем в «банк», верные остаются
      slots.forEach((s, i) => {
        if (s.t.textContent === letters[i]) return;
        s.el.classList.add('wrong');
        const t = s.t;
        setTimeout(() => { s.el.classList.remove('wrong'); s.el.textContent = ''; t.classList.remove('used'); s.t = null; }, 550);
      });
    };
    shuffle(letters.concat(extras)).forEach(c => {
      const t = h('button', { class: 'tile letter' }, c);
      t.onclick = () => {
        if (t.classList.contains('used')) return;
        const s = slots.find(s => !s.t); if (!s) return;
        s.t = t; s.el.textContent = c; t.classList.add('used');
        check();
      };
      bank.append(t);
    });
    slots.forEach(s => {
      s.el.onclick = () => {
        if (!s.t || s.el.classList.contains('right')) return;
        s.t.classList.remove('used'); s.t = null; s.el.textContent = '';
      };
    });
    area.append(h('div', { class: 'spellhead' }, pic(it.id, 'mid'), bigPlay(say, true)),
      h('div', { class: 'slots' }, slots.map(s => s.el)), bank);
    api.intro.then(() => sleep(250)).then(() => { if (area.isConnected) say(); });
  });

  // --- Соедини картинку и слово ---
  EX.match = (box, step, api) => {
    const ids = step.words;
    const left = h('div', { class: 'mcol' }), right = h('div', { class: 'mcol' });
    let sel = null, matched = 0;
    const tried = {};
    shuffle(ids).forEach(id => {
      const b = h('button', { class: 'mitem mpic', 'data-id': id }, pic(id, 'small'));
      b.onclick = () => {
        if (b.classList.contains('right')) return;
        left.querySelectorAll('.sel').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); sel = b;
      };
      left.append(b);
    });
    shuffle(ids).forEach(id => {
      const b = h('button', { class: 'mitem mword' }, resolve(id).en);
      b.onclick = () => {
        if (b.classList.contains('right')) return;
        if (!sel) { left.classList.add('nudge'); setTimeout(() => left.classList.remove('nudge'), 500); return; }
        const sid = sel.dataset.id, ok = sid === id;
        if (!(sid in tried)) { tried[sid] = ok; api.result(ok, [sid]); }
        if (ok) {
          Sound.ok(); Speech.say(resolve(id).en);
          sel.classList.remove('sel'); sel.classList.add('right'); b.classList.add('right'); sel = null;
          if (++matched === ids.length) setTimeout(api.finish, 500);
        } else {
          Sound.no(); b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 500);
        }
      };
      right.append(b);
    });
    box.append(h('div', { class: 'match' }, left, right));
  };

  // --- Карточки новых слов ---
  EX.cards = (box, step, api) => {
    Store.introduce(step.words);
    const heard = new Set();
    const g = h('div', { class: 'cards' });
    step.words.forEach(id => {
      const w = resolve(id);
      const c = h('button', { class: 'card' }, pic(id), h('div', { class: 'cen' }, w.en), h('div', { class: 'cru' }, w.ru));
      c.onclick = () => {
        Speech.say(w.en);
        c.classList.remove('bounce'); void c.offsetWidth; c.classList.add('bounce', 'heard');
        heard.add(id);
        if (heard.size === step.words.length) api.finish();
      };
      g.append(c);
    });
    box.append(g, h('button', { class: 'ghost', onclick: () => g.classList.toggle('show-ru') }, '👁 Показать перевод'));
  };

  // --- Сцена: герои говорят ---
  function lineRow(ln, masked) {
    const C = COURSE.characters[ln.who];
    return h('button', { class: 'sline' }, pic(ln.who, 'avatar'),
      h('div', { class: 'bubble' + (masked ? ' masked' : '') }, h('b', {}, C.name), h('div', { class: 'btext' }, ln.text)));
  }
  EX.scene = (box, step, api) => {
    const played = new Set();
    const rows = step.lines.map(ln => lineRow(ln));
    let run = 0;
    async function play(i) {
      rows.forEach(r => r.classList.remove('speaking'));
      rows[i].classList.add('speaking');
      await Speech.say(step.lines[i].text, { who: step.lines[i].who });
      rows[i].classList.remove('speaking'); rows[i].classList.add('heard');
      played.add(i);
      if (played.size === rows.length) api.finish();
    }
    rows.forEach((r, i) => r.onclick = () => { run++; play(i); });
    const all = h('button', { class: 'btn' }, '▶ Послушать всех');
    all.onclick = async () => {
      const my = ++run;
      for (let i = 0; i < rows.length; i++) { if (my !== run || !box.isConnected) return; await play(i); await sleep(350); }
    };
    box.append(all, h('div', { class: 'scene' }, rows));
  };

  // --- История для аудирования + вопросы ---
  EX.story = (box, step, api) => {
    const rows = step.lines.map(ln => lineRow(ln, true));
    let run = 0, playedAll = false;
    async function playLine(i) {
      rows.forEach(r => r.classList.remove('speaking'));
      rows[i].classList.add('speaking');
      await Speech.say(step.lines[i].text, { who: step.lines[i].who });
      rows[i].classList.remove('speaking');
    }
    async function playAll() {
      const my = ++run;
      for (let i = 0; i < rows.length; i++) { if (my !== run || !box.isConnected) return; await playLine(i); await sleep(450); }
      playedAll = true; qbtn.disabled = false; qbtn.classList.add('ready');
    }
    rows.forEach((r, i) => r.onclick = () => { run++; playLine(i); });
    const qbtn = h('button', { class: 'btn primary', disabled: true }, 'Ответить на вопросы →');
    const listenPart = h('div', { class: 'story' },
      step.title ? h('h3', {}, step.title) : null,
      h('button', { class: 'btn', onclick: playAll }, '▶ Слушать'),
      h('div', { class: 'scene' }, rows),
      h('p', { class: 'muted small' }, 'Слова спрятаны: попробуй понять на слух. Можно слушать сколько угодно раз.'),
      qbtn);
    box.append(listenPart);

    qbtn.onclick = () => {
      run++; Speech.stop();
      listenPart.remove();
      const replay = h('button', { class: 'ghost' }, '🔁 Послушать разговор ещё раз');
      replay.onclick = async () => {
        const my = ++run;
        for (const ln of step.lines) { if (my !== run || !box.isConnected) return; await Speech.say(ln.text, { who: ln.who }); await sleep(400); }
      };
      const qbox = h('div');
      box.append(replay, qbox);
      const qapi = Object.assign({}, api, {
        finish() {
          replay.remove();
          box.append(h('div', { class: 'story' }, h('h3', {}, 'Весь разговор'),
            h('div', { class: 'scene' }, step.lines.map(ln => {
              const r = lineRow(ln); r.onclick = () => Speech.say(ln.text, { who: ln.who }); return r;
            }))));
          api.finish();
        },
      });
      quiz(qbox, step.questions, qapi, (area, q, attempt) => {
        area.append(h('div', { class: 'qtext' },
          h('button', { class: 'ru-say', onclick: () => Speech.say(q.q, { lang: 'ru' }) }, '🔈'), q.q));
        const g = grid(q.options.length);
        q.options.forEach((o, idx) => {
          const label = o.t || (o.c ? COURSE.characters[o.c].name : resolve(o.w).en);
          const b = h('button', { class: 'opt' + (o.t ? ' textopt' : '') },
            o.w ? pic(o.w) : o.c ? pic(o.c) : null, h('span', { class: 'lbl' }, label));
          b.onclick = () => {
            const ok = idx === q.answer;
            if (!attempt(ok, () => sleep(150).then(() => Speech.say(label)))) return;
            if (ok) b.classList.add('right'); else { b.classList.add('wrong'); b.disabled = true; }
          };
          g.append(b);
        });
        area.append(g);
        if (Store.s.settings.ruVoice && api.mode !== 'class') Speech.say(q.q, { lang: 'ru' });
      });
    };
  };

  // --- Правило («заклинание») ---
  EX.rule = (box, step, api) => {
    box.append(renderRule(step));
    api.finish();
  };
  function renderRule(step) {
    return h('div', { class: 'spellcard' },
      h('div', { class: 'spell-title' }, '✨ ' + step.title),
      h('div', { class: 'spell-rows' }, (step.rows || []).map(r => h('div', { class: 'srow' },
        h('div', { class: 'sen' }, enText(r.full), r.short ? h('span', { class: 'arrow' }, '→') : null, r.short ? enText(r.short) : null),
        h('div', { class: 'sru' }, r.ru)))),
      step.note ? h('p', { class: 'snote', html: md(step.note) }) : null,
      h('div', { class: 'examples' }, (step.examples || []).map(e =>
        h('button', { class: 'exm', onclick: () => Speech.say(e.en) }, e.pic ? pic(e.pic, 'small') : null, h('span', {}, e.en)))));
  }

  // --- Игра без экрана ---
  EX.offline = (box, step, api) => {
    box.append(h('div', { class: 'offline' },
      h('div', { class: 'big-emoji' }, step.emoji || '🎲'),
      h('h2', {}, step.title),
      h('p', {}, step.text),
      step.phrases ? h('div', { class: 'examples' }, step.phrases.map(e =>
        h('button', { class: 'exm', onclick: () => Speech.say(e.en) }, e.pic ? pic(e.pic, 'small') : null, h('span', {}, e.en)))) : null));
    api.finish();
  };

  // --- Говорим вслух ---
  EX.speak = (box, step, api) => {
    const items = step.words.map(id => ({ en: resolve(id).en, pic: id }));
    let i = 0;
    const area = h('div', { class: 'speak' });
    box.append(area);
    function show() {
      if (i >= items.length) {
        area.replaceChildren(h('div', { class: 'big-emoji' }, '🎉'), h('p', {}, 'Молодец! Все слова сказаны.'));
        api.finish(); return;
      }
      const it = items[i];
      const status = h('div', { class: 'status' });
      const say = () => Speech.say(it.en);
      const nextItem = () => { i++; show(); };
      const ctr = h('div', { class: 'speak-ctrl' });
      if (Store.s.settings.recog && Speech.canListen) {
        const mic = h('button', { class: 'mic', 'aria-label': 'Сказать в микрофон' }, '🎤');
        mic.onclick = async () => {
          if (mic.classList.contains('on')) return;
          Speech.stop();
          mic.classList.add('on'); status.textContent = 'Слушаю…';
          const r = await Speech.listen(it.en);
          mic.classList.remove('on');
          if (r.ok) { Sound.ok(); status.textContent = '✓ Отлично!'; setTimeout(nextItem, 900); }
          else {
            Sound.no();
            status.textContent = r.error === 'not-allowed' ? 'Нет доступа к микрофону. Разрешите его в браузере.'
              : r.heard ? `Похоже на «${r.heard}». Попробуй ещё!` : 'Не расслышал. Попробуй ещё раз!';
          }
        };
        ctr.append(mic);
      }
      ctr.append(h('button', { class: 'btn ok', onclick: () => { Sound.ok(); nextItem(); } }, '✓ Получилось'),
        h('button', { class: 'ghost', onclick: nextItem }, 'Пропустить'));
      area.replaceChildren(h('div', { class: 'counter' }, `${i + 1} / ${items.length}`),
        pic(it.pic, 'big'), h('div', { class: 'readword' }, it.en), bigPlay(say, true), ctr, status);
      api.intro.then(() => sleep(200)).then(() => { if (area.isConnected) say(); });
    }
    show();
  };

  window.EX = EX;
  window.INSTR = INSTR;
  window.renderRule = renderRule;
})();
