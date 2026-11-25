// Урок 4. Is it a cat? — вопросы и «нет»: Is it…? Yes, it is. / No, it isn’t.
COURSE.addLesson({
  n: 4,
  goal: 'Задавать вопрос **Is it a…?** и отвечать **Yes, it is. / No, it isn’t.** Повторить Are you…? из урока 1. 12 новых слов: вещи в детективном бюро.',
  prep: [
    'Приготовьте **непрозрачный мешок или наволочку** и 5–6 предметов из урока (чашка, носок, ключ, шапка, телефон). Это для игры «Волшебный мешок».',
    'Главное в уроке: **вопрос начинается с Is**. Поменяйте слова местами прямо руками: «It is» → «Is it?». Можно на бумажках.',
    'Сегодня Чёрная кошка — детектив. Можете тоже говорить как сыщик: шёпотом и с прищуром.',
  ],

  words: {
    box:   { en: 'box',   ru: 'коробка',  emoji: '📦' },
    bag:   { en: 'bag',   ru: 'сумка',    emoji: '👜' },
    key:   { en: 'key',   ru: 'ключ',     emoji: '🔑' },
    hat:   { en: 'hat',   ru: 'шляпа',    emoji: '🎩' },
    clock: { en: 'clock', ru: 'часы',     emoji: '⏰' },
    lamp:  { en: 'lamp',  ru: 'лампа',    emoji: '💡' },
    cup:   { en: 'cup',   ru: 'чашка',    emoji: '☕' },
    chair: { en: 'chair', ru: 'стул',     emoji: '🪑' },
    sock:  { en: 'sock',  ru: 'носок',    emoji: '🧦' },
    shoe:  { en: 'shoe',  ru: 'ботинок',  emoji: '👟' },
    phone: { en: 'phone', ru: 'телефон',  emoji: '📱' },
    door:  { en: 'door',  ru: 'дверь',    emoji: '🚪' },
  },

  // ---------------- УРОК С ПАПОЙ (~30 мин) ----------------
  class: [
    {
      type: 'offline', title: 'Разминка: we и they', emoji: '👋', time: '3 мин',
      text: 'Поздоровайся с папой. Посчитай что-нибудь в комнате до пяти!',
      phrases: [{ en: 'Hello!' }, { en: 'How are you?' }, { en: "We're friends.", pic: 'friend' }, { en: 'Three trees.', pic: 'tree' }, { en: "They're ducks.", pic: 'duck' }],
      teacher: [
        'Ритуал: **Hello, [имя]! How are you?**',
        'Повторение урока 3: **How many?** про любые предметы в комнате. Следите за хвостиком -s: **two books**.',
        'Покажите на себя и на неё: **We’re…?** (friends / happy).',
      ],
    },
    {
      type: 'scene', title: 'Загадочная коробка', time: '4 мин',
      lines: [
        { who: 'plus',     text: 'Black Cat! Look! A box!' },
        { who: 'blackcat', text: 'A box? Is it a cat?' },
        { who: 'plus',     text: "No, it isn't." },
        { who: 'blackcat', text: 'Is it a hat?' },
        { who: 'plus',     text: "No, it isn't." },
        { who: 'blackcat', text: 'Is it a key?' },
        { who: 'plus',     text: "Yes, it is! It's a magic key!" },
      ],
      teacher: [
        'Скажите: «Доктор Плюсик принесла в детективное бюро загадочную коробку. Чёрная кошка угадывает, что внутри».',
        'Спросите: «Что было в коробке? Как Чёрная кошка спрашивал?» Пусть заметит, что вопрос начинается с **Is it…**',
        'Спросите: «Как Доктор Плюсик говорила „нет“?» (No, it isn’t).',
      ],
    },
    {
      type: 'cards', title: 'Вещи детектива', time: '3 мин',
      words: ['box', 'bag', 'key', 'hat', 'clock', 'lamp'],
      teacher: [
        'Пусть нажмёт все карточки и повторит каждое слово.',
        'Если такая вещь есть в комнате, пусть подбежит и дотронется до неё: **Touch the lamp!**',
      ],
    },
    {
      type: 'cards', title: 'Ещё вещи', time: '2 мин',
      words: ['cup', 'chair', 'sock', 'shoe', 'phone', 'door'],
      teacher: ['То же самое: нажать, повторить, найти в комнате.'],
    },
    {
      type: 'listen_pick', time: '3 мин', skill: ['listening', 'vocab'],
      words: ['box', 'bag', 'key', 'hat', 'clock', 'lamp', 'cup', 'chair', 'sock', 'shoe', 'phone', 'door'], n: 8, opts: 3,
      teacher: ['Это она делает сама. Дайте подумать, не подсказывайте сразу.'],
    },
    {
      type: 'rule', title: 'Заклинание №4: вопрос и «нет»', time: '4 мин',
      rows: [
        { full: 'It is a key.', short: 'Is it a key?', ru: 'Вопрос: Is встаёт вперёд' },
        { full: 'Yes, it is.', ru: 'Да' },
        { full: 'No, it is not.', short: "No, it isn't.", ru: 'Нет' },
      ],
      note: 'Чтобы спросить, поменяй слова местами: **it is** → **Is it?** Ответ «да»: **Yes, it is.** Ответ «нет»: **No, it isn’t.** Это работает и с he, she: **Is she a doctor? Yes, she is.**',
      examples: [
        { en: 'Is it a cup?', pic: 'cup' }, { en: 'Yes, it is.', pic: 'cup' },
        { en: 'Is it a hat?', pic: 'shoe' }, { en: "No, it isn't. It's a shoe.", pic: 'shoe' },
      ],
      teacher: [
        'Напишите на двух бумажках **It** и **is**. Положите **It is**, потом поменяйте местами: **Is it?** Скажите вопрос с вопросительной интонацией, голос вверх.',
        'Покажите на чашку: **Is it a cup?** Она: **Yes, it is.** На носок: **Is it a hat?** Она: **No, it isn’t.**',
        'Повторите урок 1: **Are you a girl? Yes, I am.** Это тот же фокус, только с you.',
      ],
    },
    {
      type: 'fill', title: 'Да или нет?', time: '3 мин', skill: ['grammar'],
      items: [
        { s: 'Is it a cup? Yes, it ___.', answer: 'is', options: ['is', "isn't"], pic: 'cup' },
        { s: "Is it a hat? No, it ___.", answer: "isn't", options: ['is', "isn't"], pic: 'shoe' },
        { s: 'Is it a clock? ___, it is.', answer: 'Yes', options: ['Yes', 'No'], pic: 'clock' },
        { s: "Is it a bag? ___, it isn't.", answer: 'No', options: ['Yes', 'No'], pic: 'box' },
        { s: '___ it a lamp?', answer: 'Is', options: ['Is', 'Are', 'Am'], pic: 'lamp' },
        { s: '___ you happy?', answer: 'Are', options: ['Is', 'Are', 'Am'], pic: 'happy' },
      ],
      teacher: ['Подсказка: «Посмотри на картинку. Это правда то, о чём спрашивают?»'],
    },
    {
      type: 'offline', title: 'Игра «Волшебный мешок»', emoji: '🎒', time: '4 мин',
      text: 'Закрой глаза, потрогай вещь в мешке и угадай: Is it a…?',
      phrases: [{ en: 'Is it a cup?', pic: 'cup' }, { en: 'Yes, it is.' }, { en: "No, it isn't." }, { en: 'Is it a sock?', pic: 'sock' }, { en: 'Is it a key?', pic: 'key' }],
      teacher: [
        'Положите вещь в мешок. Она трогает и спрашивает **Is it a…?** Вы отвечаете **Yes, it is** или **No, it isn’t**.',
        'Поменяйтесь: вы угадываете, она отвечает. Специально ошибайтесь в вопросах, чтобы она чаще говорила **No, it isn’t**.',
        'Если мешка нет, можно рисовать по частям: нарисуйте кусочек предмета, она угадывает.',
      ],
    },
    {
      type: 'listen_pick', title: 'Детектив слушает', time: '2 мин', skill: ['listening'],
      items: [
        { say: "Is it a chair? No, it isn't. It's a door.", answer: 'door', options: ['chair', 'door', 'lamp'], words: ['door'] },
        { say: "Is it a phone? Yes, it is.", answer: 'phone', options: ['phone', 'clock', 'cup'], words: ['phone'] },
        { say: "Is it a sock? No, it isn't. It's a shoe.", answer: 'shoe', options: ['sock', 'shoe', 'hat'], words: ['shoe'] },
        { say: "Is it a bag? No, it isn't. It's a box.", answer: 'box', options: ['bag', 'box', 'key'], words: ['box'] },
      ],
      teacher: ['Ловушка: в фразе два предмета, а правильный — тот, что после **No, it isn’t**. Если ошибётся, послушайте ещё раз вместе.'],
    },
    {
      type: 'build', time: '2 мин', skill: ['grammar'],
      items: [
        { en: 'Is it a key?', ru: 'Это ключ?', pic: 'key', extra: ['cup'] },
        { en: "No, it isn't.", ru: 'Нет.', pic: 'sock', extra: ['is'] },
        { en: "It's a sock.", ru: 'Это носок.', pic: 'sock', extra: ['Is'] },
      ],
      teacher: ['Подсказка: «Вопрос начинается с Is».'],
    },
    {
      type: 'speak', title: 'Скажи сама', time: '2 мин',
      words: ['box', 'bag', 'key', 'hat', 'clock', 'chair', 'shoe', 'phone'],
      teacher: [
        'Следите за **ch** в **chair**: «ч», а не «ш». И за **sh** в **shoe**: «ш».',
        'Ритуал прощания: **Goodbye, [имя]!** и **Goodbye, Dad!**',
      ],
    },
  ],

  // ---------------- ДОМАШКА (~13 мин, сама) ----------------
  home: [
    {
      type: 'listen_pick', title: 'Разминка для ушей', skill: ['listening', 'vocab'],
      words: ['box', 'bag', 'key', 'hat', 'clock', 'lamp', 'cup', 'chair', 'sock', 'shoe', 'phone', 'door'],
      n: 7, opts: 4,
    },
    {
      type: 'read_pick', title: 'Читаем сами', skill: ['reading', 'vocab'],
      words: ['box', 'bag', 'key', 'hat', 'cup', 'sock', 'lamp'], n: 6, opts: 3,
    },
    {
      type: 'match', title: 'Найди пару', skill: ['reading', 'vocab'],
      words: ['clock', 'chair', 'shoe', 'phone', 'door', 'lamp'],
    },
    {
      type: 'fill', title: 'Детектив отвечает', skill: ['grammar'],
      items: [
        { s: 'Is it a key? Yes, it ___.', answer: 'is', options: ['is', "isn't"], pic: 'key' },
        { s: "Is it a cup? No, it ___.", answer: "isn't", options: ['is', "isn't"], pic: 'phone' },
        { s: 'Is it a door? ___, it is.', answer: 'Yes', options: ['Yes', 'No'], pic: 'door' },
        { s: "Is it a chair? ___, it isn't.", answer: 'No', options: ['Yes', 'No'], pic: 'lamp' },
        { s: '___ she a doctor?', answer: 'Is', options: ['Is', 'Are', 'Am'], pic: 'doctor' },
        { s: '___ they frogs?', answer: 'Are', options: ['Is', 'Are', 'Am'], pic: 'frog' },
      ],
    },
    {
      type: 'spell', title: 'Собери слово', skill: ['reading', 'vocab'],
      words: ['box', 'key', 'hat', 'cup', 'sock'],
    },
    {
      type: 'listen_pick', title: 'Вспоминаем прошлые уроки', skill: ['listening', 'vocab'],
      words: ['frog', 'duck', 'bee', 'three', 'five', 'grandma', 'baby', 'tired', 'cat'], n: 5, opts: 4,
    },
    {
      type: 'build', title: 'Собери вопрос', skill: ['grammar'],
      items: [
        { en: 'Is it a hat?', ru: 'Это шляпа?', pic: 'hat', extra: ['It'] },
        { en: 'Yes, it is.', ru: 'Да.', pic: 'hat', extra: ["isn't"] },
        { en: 'Is it a big box?', ru: 'Это большая коробка?', pic: 'box', extra: ['small'] },
      ],
    },
    {
      type: 'story', title: 'Угадай, Река!', skill: ['listening'],
      lines: [
        { who: 'blackcat', text: "Reka, close your eyes. What's this?" },
        { who: 'reka',     text: 'Is it a cup?' },
        { who: 'blackcat', text: "No, it isn't." },
        { who: 'reka',     text: 'Is it a shoe?' },
        { who: 'blackcat', text: "No, it isn't. It's small." },
        { who: 'reka',     text: 'Is it a key?' },
        { who: 'blackcat', text: 'Yes, it is! Good job, Reka!' },
      ],
      questions: [
        { q: 'Что Река назвала первым?', options: [{ w: 'cup' }, { w: 'shoe' }, { w: 'key' }], answer: 0, words: ['cup'] },
        { q: 'Это был ботинок?', options: [{ t: 'Yes, it is.' }, { t: "No, it isn't." }], answer: 1 },
        { q: 'Какой был предмет?', options: [{ w: 'big' }, { w: 'small' }], answer: 1 },
        { q: 'Что же это было?', options: [{ w: 'clock' }, { w: 'key' }, { w: 'phone' }], answer: 1, words: ['key'] },
      ],
    },
  ],
});
