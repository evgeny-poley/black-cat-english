// Озвучка (Web Speech API) и распознавание речи (только Chrome / Edge).
(function () {
  const synth = window.speechSynthesis || null;
  let voices = [];
  const listeners = [];
  function load() { voices = synth ? synth.getVoices() : []; }
  if (synth) {
    load();
    synth.addEventListener('voiceschanged', () => { load(); listeners.forEach(f => f()); });
  }

  // Порядок предпочтения английских голосов (Chrome на Mac / Windows)
  const PREF = ['Google UK English Female', 'Google US English', 'Samantha', 'Microsoft Libby', 'Microsoft Sonia',
    'Microsoft Aria', 'Microsoft Jenny', 'Karen', 'Moira', 'Daniel', 'Google UK English Male'];

  const enVoices = () => voices.filter(v => /^en[-_]/i.test(v.lang));
  function enVoice() {
    const name = Store.s.settings.voiceName;
    if (name) { const v = voices.find(v => v.name === name); if (v) return v; }
    for (const p of PREF) { const v = voices.find(v => v.name.startsWith(p)); if (v) return v; }
    const en = enVoices();
    return en.find(v => /GB/i.test(v.lang)) || en[0] || null;
  }
  const ruVoice = () => voices.find(v => /Google русский/i.test(v.name)) || voices.find(v => /^ru/i.test(v.lang)) || null;

  let seq = 0;
  function say(text, { lang = 'en', who, rate, pitch } = {}) {
    return new Promise(res => {
      if (!synth || !text) return res();
      const my = ++seq;
      synth.cancel();
      if (lang !== 'ru' && COURSE.pronounce) {
        for (const [w, p] of Object.entries(COURSE.pronounce)) text = text.replace(new RegExp('\\b' + w + '\\b', 'g'), p);
      }
      const u = new SpeechSynthesisUtterance(text);
      const ch = who && COURSE.characters[who];
      if (lang === 'ru') {
        const v = ruVoice(); if (v) u.voice = v;
        u.lang = 'ru-RU'; u.rate = 1.05;
      } else {
        const v = enVoice(); if (v) u.voice = v;
        u.lang = v ? v.lang : 'en-GB';
        u.rate = (rate || Store.s.settings.rate) * (ch ? ch.voice.rate : 1);
        u.pitch = pitch || (ch ? ch.voice.pitch : 1);
      }
      let finished = false;
      const done = () => { if (finished) return; finished = true; clearTimeout(t); res(); };
      u.onend = done; u.onerror = done;
      // страховка: Chrome иногда не присылает onend
      const t = setTimeout(done, 2500 + text.length * 120 / (u.rate || 1));
      setTimeout(() => { if (my === seq) synth.speak(u); else done(); }, 60);
    });
  }
  function stop() { seq++; if (synth) synth.cancel(); }

  // --- распознавание ---
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim();
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function listen(target) {
    return new Promise(res => {
      if (!SR) return res({ ok: false });
      const r = new SR();
      r.lang = 'en-US'; r.maxAlternatives = 5; r.interimResults = false;
      let got = false;
      r.onresult = e => {
        got = true;
        const alts = [...e.results[0]].map(a => a.transcript);
        const t = norm(target);
        const ok = alts.some(a => {
          const n = norm(a);
          return n === t || (' ' + n + ' ').includes(' ' + t + ' ') || lev(n, t) <= Math.max(1, Math.floor(t.length / 5));
        });
        res({ ok, heard: alts[0] });
      };
      r.onerror = e => { if (!got) res({ ok: false, error: e.error }); };
      r.onend = () => { if (!got) res({ ok: false }); };
      try { r.start(); } catch (e) { res({ ok: false }); }
      setTimeout(() => { try { r.stop(); } catch (e) {} }, 6000);
    });
  }

  window.Speech = {
    say, stop, listen, enVoices, enVoice,
    get canListen() { return !!SR; },
    get canSpeak() { return !!synth; },
    onVoices(f) { listeners.push(f); },
  };
})();
