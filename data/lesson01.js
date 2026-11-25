// Урок 1. Hello! I'm Black Cat — I am / you are
COURSE.addLesson({
  n: 1,
  goal: 'Здороваться и прощаться, говорить о себе «I’m…» и о собеседнике «You’re…», отвечать на вопрос «Are you…?». 14 новых слов: люди, герои, чувства.',
  prep: [
    'Ничего готовить не нужно, только этот экран и хорошее настроение. Включите звук.',
    'Говорите по-английски **короткими фразами с жестами**, по-русски только объясняйте задания и правила.',
    'Ошибки не исправляйте в лоб. Просто повторите правильно сами: она скажет «You tired», вы ответите «Yes, I’m tired!».',
    'Хвалите за попытку и за догадку, а не только за правильный ответ.',
    'Если она устала, сократите устные игры, но дойдите до последнего шага, чтобы урок засчитался и открылась домашка.',
  ],

  words: {
    hello:     { en: 'hello',     ru: 'привет, здравствуй', emoji: '🙋' },
    goodbye:   { en: 'goodbye',   ru: 'до свидания, пока',  emoji: '👋' },
    boy:       { en: 'boy',       ru: 'мальчик',            emoji: '👦' },
    girl:      { en: 'girl',      ru: 'девочка',            emoji: '👧' },
    cat:       { en: 'cat',       ru: 'кошка, кот',         emoji: '🐈' },
    capybara:  { en: 'capybara',  ru: 'капибара',           emoji: '🦫' },
    policeman: { en: 'policeman', ru: 'полицейский',        emoji: '👮' },
    doctor:    { en: 'doctor',    ru: 'врач, доктор',       emoji: '🧑‍⚕️' },
    taxi:      { en: 'taxi',      ru: 'такси',              emoji: '🚖' },
    happy:     { en: 'happy',     ru: 'весёлый, счастливый', emoji: '😄' },
    sad:       { en: 'sad',       ru: 'грустный',           emoji: '😢' },
    tired:     { en: 'tired',     ru: 'уставший',           emoji: '🥱' },
    hungry:    { en: 'hungry',    ru: 'голодный',           emoji: '🤤' },
    fine:      { en: 'fine',      ru: 'хорошо, в порядке',  emoji: '👍' },
  },

  // ---------------- УРОК С ПАПОЙ (~30 мин) ----------------
  class: [
    {
      type: 'cards', title: 'Hello и Goodbye', time: '3 мин',
      words: ['hello', 'goodbye'],
      teacher: [
        'Начните **ритуал**, который будет в каждом уроке. Помашите и скажите: **Hello, [имя]!** Подскажите ответ: **Hello, Dad!** Повторите 2–3 раза, весело.',
        'Нажмите обе карточки, пусть повторит за диктором.',
        'Мини-игра «Пришёл и ушёл»: выйдите за дверь и войдите со словом **Hello!**, уходите со словом **Goodbye!** Потом поменяйтесь ролями.',
        'Не переводите: смысл ясен из жеста.',
      ],
    },
    {
      type: 'scene', title: 'Знакомься: наши герои', time: '4 мин',
      lines: [
        { who: 'susan',    text: "Hello! I'm Susan. I'm a taxi." },
        { who: 'blackcat', text: "Hello! I'm Black Cat. I'm a policeman." },
        { who: 'reka',    text: "Hi! I'm Reka. I'm a capybara." },
        { who: 'plus',     text: "Hi! I'm Doctor Plus. I'm a doctor. I'm happy!" },
      ],
      teacher: [
        'Скажите: «Это герои наших сказок, только теперь они говорят по-английски!»',
        'Нажимайте героев по одному. После каждого спросите по-русски: «Кто это? Что ты услышала?» Black Cat — полицейский, Doctor Plus — врач и подруга Чёрной кошки.',
        'Потом спросите: «Все говорят **I’m…**. Как думаешь, что это значит?» Пусть догадается сама (I’m = я). Похвалите за догадку.',
        'Пусть нажмёт ещё раз и повторит за каждым героем его голосом: «I’m Susan!» Детям это нравится.',
      ],
    },
    {
      type: 'cards', title: 'Кто это?', time: '3 мин',
      words: ['boy', 'girl', 'cat', 'capybara', 'policeman', 'doctor', 'taxi'],
      teacher: [
        'Пусть нажмёт все карточки и повторит каждое слово.',
        'Игра на понимание: спрашивайте **Where is the taxi?**, **Where is the girl?**, а она показывает пальцем на экране. Сначала медленно, потом быстрее. Говорить ей пока не нужно.',
        'Потом наоборот: вы показываете на картинку, она называет.',
      ],
    },
    {
      type: 'listen_pick', time: '3 мин', skill: ['listening', 'vocab'],
      words: ['boy', 'girl', 'cat', 'capybara', 'policeman', 'doctor', 'taxi'], n: 7, opts: 3,
      teacher: [
        'Это задание она делает **сама**. Не подсказывайте сразу: дайте 3–5 секунд подумать.',
        'Если ошиблась, задание повторится в конце. Так и задумано: повтор закрепляет слово.',
      ],
    },
    {
      type: 'cards', title: 'Как дела?', time: '3 мин',
      words: ['happy', 'sad', 'tired', 'hungry', 'fine'],
      teacher: [
        'Каждое слово сопровождайте выражением лица и жестом. **happy**: улыбка до ушей, **sad**: трём глаза, **tired**: зеваем, **hungry**: гладим живот, **fine**: большой палец вверх.',
        'Делайте вместе: слово плюс жест. Жест помогает запомнить в разы лучше (методика TPR).',
      ],
    },
    {
      type: 'offline', title: 'Игра «Покажи!»', emoji: '🎭', time: '3 мин',
      text: 'Папа говорит слово, а ты показываешь его лицом. Потом ты говоришь, а папа показывает!',
      phrases: [{ en: "I'm happy.", pic: 'happy' }, { en: "I'm sad.", pic: 'sad' }, { en: "I'm tired.", pic: 'tired' }, { en: "I'm hungry.", pic: 'hungry' }],
      teacher: [
        'Вы называете чувство, она показывает. 5–6 раз, ускоряясь.',
        'Потом меняйтесь: она называет, вы показываете. Иногда специально ошибайтесь, пусть поправит вас. Это очень мотивирует.',
        'В конце переходите на целые фразы: изобразите грусть и скажите **I’m sad.** Пусть повторит фразу за вами.',
      ],
    },
    {
      type: 'rule', title: 'Заклинание №1: I’m и You’re', time: '2 мин',
      rows: [
        { full: 'I am', short: "I'm", ru: 'я (есть)' },
        { full: 'you are', short: "you're", ru: 'ты (есть)' },
      ],
      note: 'По-английски нельзя сказать просто «Я весёлая». Нужно волшебное слово-связка: **I** дружит только с **am**, **you** дружит с **are**. И ещё: **I** (я) всегда пишется с большой буквы!',
      examples: [
        { en: "I'm a girl.", pic: 'girl' }, { en: "You're a boy.", pic: 'boy' },
        { en: "I'm happy.", pic: 'happy' }, { en: "You're tired.", pic: 'tired' },
      ],
      teacher: [
        'Объясните коротко, 1–2 минуты, не больше. Главное: **I + am**, **you + are**.',
        'Покажите на себя: **I’m Dad.** На неё: **You’re [имя].** Пусть сделает наоборот: на себя «I’m…», на вас «You’re Dad».',
        'Нажмите примеры и послушайте вместе.',
      ],
    },
    {
      type: 'build', time: '3 мин', skill: ['grammar'],
      items: [
        { en: "I'm happy.", ru: 'Я весёлая.', pic: 'happy', extra: ["You're"] },
        { en: "You're a boy.", ru: 'Ты мальчик.', pic: 'boy', extra: ["I'm"] },
        { en: "I'm a doctor.", ru: 'Я врач.', pic: 'doctor', extra: ['taxi'] },
        { en: "You're tired.", ru: 'Ты устал.', pic: 'tired', extra: ['am'] },
      ],
      teacher: [
        'Подсказка, если застряла: «Сначала найди, **кто**: I’m или You’re. Потом **какой** или **кто такой**».',
        'Кнопка «🔊 Подсказка» произносит всё предложение. Ею можно пользоваться.',
      ],
    },
    {
      type: 'listen_who', title: 'Дело №1: кто это говорит?', time: '3 мин', skill: ['listening'],
      items: [
        { who: 'susan',    text: "Hello! I'm a taxi. I'm happy." },
        { who: 'reka',    text: "Hi! I'm not a cat. I'm a capybara. I'm hungry." },
        { who: 'plus',     text: "Hello! I'm a doctor. Are you sad?" },
        { who: 'blackcat', text: "Hello! I'm a policeman. I'm tired." },
      ],
      teacher: [
        'Скажите: «Это первое детективное дело Чёрной кошки! Нужно узнать героя по голосу и словам».',
        'Пусть слушает сколько нужно раз. После ответа спросите: «**Какие слова ты услышала?**» Это важнее, чем сам ответ.',
      ],
    },
    {
      type: 'offline', title: 'Игра «Детектив»', emoji: '🕵️', time: '3 мин',
      text: 'Папа молча изображает чувство. Ты детектив! Спрашивай: Are you tired? Are you hungry?',
      phrases: [{ en: 'Are you happy?' }, { en: 'Yes, I am.', pic: 'happy' }, { en: "No, I'm not.", pic: 'sad' }],
      teacher: [
        'Сначала нажмите фразы и повторите их вместе 2–3 раза, с вопросительной интонацией.',
        'Изобразите чувство молча. Она угадывает вопросом **Are you…?** Вы отвечаете **Yes, I am!** или **No, I’m not.**',
        'Потом поменяйтесь: вы спрашиваете, она отвечает.',
        'Если она ошибается в форме («You tired?»), повторите правильно в ответе: «Am I tired? Yes, I am!»',
      ],
    },
    {
      type: 'speak', title: 'Скажи сама', time: '2 мин',
      words: ['hello', 'boy', 'girl', 'happy', 'sad', 'tired', 'hungry', 'policeman'],
      teacher: [
        'Если в настройках включён микрофон, она нажимает 🎤. Если нет, слушайте сами и нажимайте ✓.',
        'Главное здесь смелость, а не идеальный акцент. Хвалите за каждую попытку.',
        'В конце попрощайтесь по ритуалу: **Goodbye, [имя]!** и **Goodbye, Dad!**',
      ],
    },
  ],

  // ---------------- ДОМАШКА (~12 мин, сама) ----------------
  home: [
    {
      type: 'listen_pick', title: 'Разминка для ушей', skill: ['listening', 'vocab'],
      words: ['boy', 'girl', 'cat', 'capybara', 'policeman', 'doctor', 'taxi', 'happy', 'sad', 'tired', 'hungry', 'hello', 'goodbye', 'fine'],
      n: 7, opts: 4,
    },
    {
      type: 'read_pick', title: 'Читаем сами', skill: ['reading', 'vocab'],
      words: ['boy', 'girl', 'cat', 'taxi', 'sad', 'happy', 'doctor'], n: 6, opts: 3,
    },
    {
      type: 'match', title: 'Найди пару', skill: ['reading', 'vocab'],
      words: ['hello', 'policeman', 'tired', 'hungry', 'capybara', 'fine'],
    },
    {
      type: 'fill', title: 'Заклинание: am или are?', skill: ['grammar'],
      items: [
        { s: 'I ___ happy.', answer: 'am', options: ['am', 'are'], pic: 'happy' },
        { s: 'You ___ a girl.', answer: 'are', options: ['am', 'are'], pic: 'girl' },
        { s: 'I ___ tired.', answer: 'am', options: ['am', 'are'], pic: 'tired' },
        { s: 'You ___ hungry.', answer: 'are', options: ['am', 'are'], pic: 'hungry' },
        { s: '___ am a doctor.', answer: 'I', options: ['I', 'You'], pic: 'doctor' },
        { s: '___ are a policeman.', answer: 'You', options: ['I', 'You'], pic: 'policeman' },
      ],
    },
    {
      type: 'spell', title: 'Собери слово', skill: ['reading', 'vocab'],
      words: ['cat', 'sad', 'boy', 'taxi'],
    },
    {
      type: 'build', title: 'Собери предложение', skill: ['grammar'],
      items: [
        { en: "You're happy.", ru: 'Ты весёлый.', pic: 'happy', extra: ["I'm"] },
        { en: "I'm a girl.", ru: 'Я девочка.', pic: 'girl', extra: ['boy'] },
        { en: "I'm a policeman.", ru: 'Я полицейский.', pic: 'policeman', extra: ["You're"] },
      ],
    },
    {
      type: 'story', title: 'Black Cat и Reka', skill: ['listening'],
      lines: [
        { who: 'blackcat', text: 'Hello, Reka!' },
        { who: 'reka',    text: 'Hello, Black Cat!' },
        { who: 'blackcat', text: 'How are you?' },
        { who: 'reka',    text: "I'm hungry." },
        { who: 'blackcat', text: 'Are you tired?' },
        { who: 'reka',    text: "No, I'm not. I'm hungry!" },
        { who: 'blackcat', text: 'Goodbye, Reka!' },
        { who: 'reka',    text: 'Goodbye!' },
      ],
      questions: [
        { q: 'Кто спросил «How are you?»', options: [{ c: 'blackcat' }, { c: 'reka' }, { c: 'susan' }], answer: 0 },
        { q: 'Какая сегодня Reka?', options: [{ w: 'happy' }, { w: 'hungry' }, { w: 'sad' }], answer: 1, words: ['hungry'] },
        { q: 'Reka устала? Что она ответила?', options: [{ t: 'Yes, I am.' }, { t: "No, I'm not." }], answer: 1 },
        { q: 'Чем закончился разговор?', options: [{ w: 'hello' }, { w: 'goodbye' }], answer: 1, words: ['goodbye'] },
      ],
    },
  ],
});
