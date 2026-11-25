// Мелкие помощники для интерфейса.
(function () {
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return el;
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // **жирный** → <b>
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ссылка на слово или героя → { emoji, img, en }
  function resolve(ref) {
    if (ref && typeof ref === 'object') return ref;
    const C = COURSE.characters[ref];
    if (C) return { emoji: C.emoji, img: C.img, en: C.name, ru: C.ru, char: ref };
    const W = COURSE.words[ref];
    if (W) return W;
    return { emoji: '❓', en: String(ref) };
  }

  // Картинка: сначала эмодзи, затем, если в img/ есть файл, он заменяет эмодзи.
  const imgCache = {};
  function findImg(name) {
    if (!imgCache[name]) imgCache[name] = new Promise(res => {
      const exts = ['webp', 'png', 'svg', 'jpg'];
      const tryNext = () => {
        if (!exts.length) return res(null);
        const src = 'img/' + name + '.' + exts.shift();
        const im = new Image();
        im.onload = () => res(src);
        im.onerror = tryNext;
        im.src = src;
      };
      tryNext();
    });
    return imgCache[name];
  }
  function pic(ref, cls = '') {
    const d = resolve(ref);
    const box = h('div', { class: 'pic ' + cls }, h('span', { class: 'emoji' }, d.emoji || '❓'));
    if (d.img) findImg(d.img).then(src => {
      if (!src) return;
      box.replaceChildren(h('img', { src, alt: d.en || '' }));
      box.classList.add('has-img');
    });
    return box;
  }

  // Английский текст, который можно нажать и услышать
  function enText(text, who) {
    return h('span', {
      class: 'en-t', role: 'button', tabindex: '0',
      onclick: e => { e.stopPropagation(); Speech.say(text, { who }); },
    }, text);
  }

  // Короткие звуки «правильно / ошибка»
  const Sound = {
    ctx: null,
    tone(freqs, dur, type) {
      try {
        this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
        const c = this.ctx, t0 = c.currentTime;
        freqs.forEach((f, i) => {
          const o = c.createOscillator(), g = c.createGain(), t = t0 + i * dur;
          o.type = type || 'sine'; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.8);
          o.connect(g).connect(c.destination);
          o.start(t); o.stop(t + dur * 2);
        });
      } catch (e) {}
    },
    ok() { this.tone([660, 880, 1175], 0.08, 'triangle'); },
    no() { this.tone([240, 200], 0.12, 'sine'); },
    win() { this.tone([523, 659, 784, 1047], 0.12, 'triangle'); },
  };

  window.UI = { h, md, esc, shuffle, sample, sleep, resolve, pic, enText, Sound };
})();
