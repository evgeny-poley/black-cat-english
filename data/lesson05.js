// Урок 5. My name, your name — my / your / his / her / our / their + цвета
COURSE.addLesson({
  n: 5,
  goal: 'Говорить, чьё это: **my, your, his, her, our, their**. Спрашивать имя: **What’s your name? My name is…** 12 новых слов: почта и цвета.',
  prep: [
    'Приготовьте **цветные карандаши или фломастеры** (красный, синий, зелёный, жёлтый, чёрный, белый, розовый, фиолетовый) и 3–4 листка — это будут «письма».',
    'Каждое новое слово-«чей» опирается на уже знакомое: **I → my, you → your, he → his, she → her, we → our, they → their**. Повторяйте парами.',
    'Скорее всего, цвета она частично знает. Тогда это быстрое повторение, а главное время отдайте словам «чей».',
  ],

  words: {
    letter:  { en: 'letter',  ru: 'письмо',          emoji: '✉️' },
    parcel:  { en: 'parcel',  ru: 'посылка',         emoji: '🎁' },
    stamp:   { en: 'stamp',   ru: 'марка',           emoji: '🏷️' },
    postbox: { en: 'postbox', ru: 'почтовый ящик',   emoji: '📮' },
    red:     { en: 'red',     ru: 'красный',         emoji: '🔴' },
    blue:    { en: 'blue',    ru: 'синий',           emoji: '🔵' },
    green:   { en: 'green',   ru: 'зелёный',         emoji: '🟢' },
    yellow:  { en: 'yellow',  ru: 'жёлтый',          emoji: '🟡' },
    black:   { en: 'black',   ru: 'чёрный',          emoji: '⚫' },
    white:   { en: 'white',   ru: 'белый',           emoji: '⚪' },
    pink:    { en: 'pink',    ru: 'розовый',         emoji: '🩷' },
    purple:  { en: 'purple',  ru: 'фиолетовый',      emoji: '🟣' },
  },

  // ---------------- УРОК С ПАПОЙ (~30 мин) ----------------
  class: [
    {
      type: 'offline', title: 'Разминка: детектив спрашивает', emoji: '👋', time: '3 мин',
      text: 'Поздоровайся с папой. Ответь на вопросы детектива: Yes, it is или No, it isn’t!',
      phrases: [{ en: 'Hello!' }, { en: 'Is it a cup?', pic: 'cup' }, { en: 'Yes, it is.' }, { en: "No, it isn't." }, { en: 'Are you happy?', pic: 'happy' }],
      teacher: [
        'Ритуал: **Hello, [имя]! How are you?**',
        'Повторение урока 4: показывайте на вещи и спрашивайте **Is it a…?** Иногда правильно, иногда нет.',
        'Пусть она тоже задаст вам 2 вопроса.',
      ],
    },
    {
      type: 'scene', title: 'Сьюзан привезла посылки', time: '4 мин',
      lines: [
        { who: 'susan',    text: "Hello! I'm Susan. Look! Three parcels!" },
        { who: 'blackcat', text: 'Is it my parcel?' },
        { who: 'susan',    text: "Yes, it is. Black Cat, your parcel is blue." },
        { who: 'plus',     text: 'And my parcel?' },
        { who: 'susan',    text: 'Doctor Plus, your parcel is red.' },
        { who: 'blackcat', text: 'And the green parcel is for Reka. Her parcel is green!' },
      ],
      teacher: [
        'Скажите: «Сьюзан работает не только такси, но и привозит почту. Сегодня у неё три посылки».',
        'Спросите: «Какого цвета посылка Чёрной кошки? А Доктора Плюсика? А Реки?»',
        'Обратите внимание: «Сьюзан сказала **your parcel** — твоя посылка. А Чёрная кошка про Реку сказал **her parcel** — её посылка».',
      ],
    },
    {
      type: 'cards', title: 'На почте', time: '2 мин',
      words: ['letter', 'parcel', 'stamp', 'postbox'],
      teacher: ['Пусть нажмёт и повторит. **Letter** — это и «письмо», и «буква». Скажите ей об этом, ей понравится.'],
    },
    {
      type: 'cards', title: 'Цвета', time: '3 мин',
      words: ['red', 'blue', 'green', 'yellow', 'black', 'white', 'pink', 'purple'],
      teacher: [
        'Пусть нажмёт все карточки. Потом игра: вы называете цвет, она находит вещь такого цвета в комнате и дотрагивается.',
        '**black** — как Чёрная кошка! Спросите: **Is Black Cat’s cap black?** Нет, она navy, но можно поспорить 🙂',
      ],
    },
    {
      type: 'listen_pick', time: '3 мин', skill: ['listening', 'vocab'],
      words: ['letter', 'parcel', 'stamp', 'postbox', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'pink', 'purple'], n: 8, opts: 3,
      teacher: ['Это она делает сама.'],
    },
    {
      type: 'rule', title: 'Заклинание №5: чьё это?', time: '4 мин',
      rows: [
        { full: 'I', short: 'my', ru: 'мой' },
        { full: 'you', short: 'your', ru: 'твой' },
        { full: 'he', short: 'his', ru: 'его' },
        { full: 'she', short: 'her', ru: 'её' },
        { full: 'we', short: 'our', ru: 'наш' },
        { full: 'they', short: 'their', ru: 'их' },
      ],
      note: 'У каждого «кто» есть свой «чей». **I am Ann. My name is Ann.** — **He is Tom. His name is Tom.** Спросить имя: **What’s your name?** Ответ: **My name is…**',
      examples: [
        { en: 'My name is Black Cat.', pic: 'policeman' }, { en: 'Her name is Reka.', pic: 'capybara' },
        { en: 'His dog is big.', pic: 'dog' }, { en: 'Our parcel is red.', pic: 'parcel' },
      ],
      teacher: [
        'Покажите пары: на себя — **I… my book**, на неё — **you… your book**, на маму или её фото — **she… her phone**.',
        'Спросите: **What’s your name?** Пусть ответит **My name is…** Потом пусть спросит вас.',
        'Не требуйте выучить все шесть сразу. Главное сегодня: **my, your, his, her**. **our** и **their** — просто познакомиться.',
      ],
    },
    {
      type: 'fill', title: 'Чей? Выбери слово', time: '3 мин', skill: ['grammar'],
      items: [
        { s: 'I am a girl. ___ name is Ann.', answer: 'My', options: ['My', 'His', 'Her'], pic: 'girl' },
        { s: 'He is my brother. ___ name is Tom.', answer: 'His', options: ['His', 'Her', 'My'], pic: 'brother' },
        { s: 'She is my mum. ___ name is Kate.', answer: 'Her', options: ['His', 'Her', 'Your'], pic: 'mum' },
        { s: 'You are a boy. ___ name is Max.', answer: 'Your', options: ['Your', 'My', 'Her'], pic: 'boy' },
        { s: 'We are friends. ___ dog is big.', answer: 'Our', options: ['Our', 'Their', 'My'], pic: 'dog' },
      ],
      teacher: ['Подсказка: «Посмотри на начало: I → my, he → his, she → her».'],
    },
    {
      type: 'offline', title: 'Игра «Почта»', emoji: '✉️', time: '4 мин',
      text: 'Нарисуйте с папой цветные письма для героев. Потом раздайте их и скажите, чьё письмо!',
      phrases: [{ en: "What's your name?" }, { en: 'My name is…' }, { en: 'This is your letter.', pic: 'letter' }, { en: 'Her letter is pink.', pic: 'pink' }, { en: 'His letter is blue.', pic: 'blue' }],
      teacher: [
        'Возьмите 3–4 листка, пусть раскрасит их в разные цвета. Это письма для вас, мамы, игрушки и неё самой.',
        'Раздавайте и говорите: **This is my letter. It’s red. This is your letter. It’s blue.** Она отвечает и раздаёт сама: **Her letter is pink. His letter is green.**',
        'Спрашивайте игрушки: **What’s your name?** — и отвечайте за них смешным голосом.',
      ],
    },
    {
      type: 'listen_pick', title: 'Какого цвета?', time: '2 мин', skill: ['listening'],
      items: [
        { say: 'My parcel is red.', answer: 'red', options: ['red', 'blue', 'green'], words: ['red'] },
        { say: 'Her letter is pink.', answer: 'pink', options: ['purple', 'pink', 'white'], words: ['pink'] },
        { say: 'His stamp is green.', answer: 'stamp', options: ['stamp', 'letter', 'parcel'], words: ['stamp'] },
        { say: 'The postbox is yellow.', answer: 'yellow', options: ['yellow', 'black', 'red'], words: ['yellow'] },
      ],
      teacher: ['После каждой фразы спросите: «Чей это предмет? Чей — его или её?»'],
    },
    {
      type: 'build', time: '2 мин', skill: ['grammar'],
      items: [
        { en: 'My name is Ann.', ru: 'Меня зовут Энн.', pic: 'girl', extra: ['Her'] },
        { en: 'His letter is blue.', ru: 'Его письмо синее.', pic: 'letter', extra: ['Her'] },
        { en: "What's your name?", ru: 'Как тебя зовут?', pic: 'friend', extra: ['my'] },
      ],
      teacher: ['Подсказка: «Вопрос начинается с What’s».'],
    },
    {
      type: 'speak', title: 'Скажи сама', time: '2 мин',
      words: ['letter', 'parcel', 'red', 'blue', 'green', 'yellow', 'white', 'purple'],
      teacher: [
        'Следите за **w** в **white**: губы трубочкой, не «в». И за **r** в **red**: язык не дрожит.',
        'Ритуал прощания: **Goodbye, [имя]!** и **Goodbye, Dad!**',
      ],
    },
  ],

  // ---------------- ДОМАШКА (~13 мин, сама) ----------------
  home: [
    {
      type: 'listen_pick', title: 'Разминка для ушей', skill: ['listening', 'vocab'],
      words: ['letter', 'parcel', 'stamp', 'postbox', 'red', 'blue', 'green', 'yellow', 'black', 'white', 'pink', 'purple'],
      n: 7, opts: 4,
    },
    {
      type: 'read_pick', title: 'Читаем сами', skill: ['reading', 'vocab'],
      words: ['red', 'blue', 'green', 'pink', 'black', 'letter', 'stamp'], n: 6, opts: 3,
    },
    {
      type: 'match', title: 'Найди пару', skill: ['reading', 'vocab'],
      words: ['yellow', 'white', 'purple', 'parcel', 'postbox', 'letter'],
    },
    {
      type: 'fill', title: 'Чей и какого цвета?', skill: ['grammar'],
      items: [
        { s: 'She is my sister. ___ name is Mia.', answer: 'Her', options: ['His', 'Her', 'My'], pic: 'sister' },
        { s: 'He is my dad. ___ cup is blue.', answer: 'His', options: ['His', 'Her', 'Our'], pic: 'dad' },
        { s: 'I am Reka. ___ name is Reka.', answer: 'My', options: ['My', 'Your', 'Her'], pic: 'capybara' },
        { s: 'They are ducks. ___ pond is small.', answer: 'Their', options: ['Our', 'Their', 'His'], pic: 'duck' },
        { s: 'The sun is ___.', answer: 'yellow', options: ['yellow', 'blue', 'black'], pic: 'sun' },
        { s: 'A frog is ___.', answer: 'green', options: ['red', 'green', 'white'], pic: 'frog' },
      ],
    },
    {
      type: 'spell', title: 'Собери слово', skill: ['reading', 'vocab'],
      words: ['red', 'blue', 'pink', 'green', 'stamp'],
    },
    {
      type: 'listen_pick', title: 'Вспоминаем прошлые уроки', skill: ['listening', 'vocab'],
      words: ['key', 'hat', 'clock', 'phone', 'bird', 'flower', 'four', 'family', 'friend'], n: 5, opts: 4,
    },
    {
      type: 'build', title: 'Собери предложение', skill: ['grammar'],
      items: [
        { en: 'Her parcel is green.', ru: 'Её посылка зелёная.', pic: 'parcel', extra: ['His'] },
        { en: 'This is your letter.', ru: 'Это твоё письмо.', pic: 'letter', extra: ['my'] },
        { en: 'Our dog is black.', ru: 'Наша собака чёрная.', pic: 'dog', extra: ['white'] },
      ],
    },
    {
      type: 'story', title: 'Письмо для Реки', skill: ['listening'],
      lines: [
        { who: 'susan',    text: 'Hello, Reka! This is your letter.' },
        { who: 'reka',     text: "Thank you, Susan! Oh, it's from Doctor Plus." },
        { who: 'blackcat', text: 'Is her letter pink?' },
        { who: 'reka',     text: 'Yes, it is! And the stamp is purple.' },
        { who: 'blackcat', text: "My letter is white. It's from my mum." },
      ],
      questions: [
        { q: 'Кому Сьюзан привезла письмо?', options: [{ c: 'reka' }, { c: 'blackcat' }, { c: 'plus' }], answer: 0 },
        { q: 'От кого письмо?', options: [{ c: 'susan' }, { c: 'plus' }, { c: 'blackcat' }], answer: 1 },
        { q: 'Какого цвета письмо от Доктора Плюсика?', options: [{ w: 'pink' }, { w: 'red' }, { w: 'blue' }], answer: 0, words: ['pink'] },
        { q: 'А марка?', options: [{ w: 'green' }, { w: 'purple' }, { w: 'yellow' }], answer: 1, words: ['purple'] },
        { q: 'Какое письмо у Чёрной кошки?', options: [{ w: 'black' }, { w: 'white' }, { w: 'blue' }], answer: 1, words: ['white'] },
      ],
    },
  ],
});
