// Урок 2. This is my family — he / she / it is
COURSE.addLesson({
  n: 2,
  goal: 'Представлять семью («This is my mum»), говорить о других: he’s, she’s, it’s. Повторить I’m / you’re и чувства из урока 1. 12 новых слов: семья, друг, собака, большой и маленький.',
  prep: [
    'Если есть, приготовьте **2–3 настоящие семейные фотографии** (на телефоне тоже подойдёт). Для игры «Семейный альбом» это лучше любых картинок.',
    'Новое правило опирается на прошлое: I am, you are, а теперь **he / she / it is**. Сначала коротко повторите урок 1.',
    'Если путает he и she, не исправляйте. Повторите правильно и покажите жестом: he — рука к мужчине на фото, she — к женщине.',
  ],

  words: {
    family:  { en: 'family',  ru: 'семья',          emoji: '👨‍👩‍👧' },
    mum:     { en: 'mum',     ru: 'мама',           emoji: '👩' },
    dad:     { en: 'dad',     ru: 'папа',           emoji: '👨' },
    brother: { en: 'brother', ru: 'брат',           emoji: '👦🏽' },
    sister:  { en: 'sister',  ru: 'сестра',         emoji: '👧🏽' },
    grandma: { en: 'grandma', ru: 'бабушка',        emoji: '👵' },
    grandpa: { en: 'grandpa', ru: 'дедушка',        emoji: '👴' },
    baby:    { en: 'baby',    ru: 'малыш',          emoji: '👶' },
    friend:  { en: 'friend',  ru: 'друг, подруга',  emoji: '🧑‍🤝‍🧑' },
    dog:     { en: 'dog',     ru: 'собака',         emoji: '🐕' },
    big:     { en: 'big',     ru: 'большой',        emoji: '🐘' },
    small:   { en: 'small',   ru: 'маленький',      emoji: '🐭' },
  },

  // ---------------- УРОК С ПАПОЙ (~30 мин) ----------------
  class: [
    {
      type: 'offline', title: 'Разминка: How are you?', emoji: '👋', time: '3 мин',
      text: 'Поздоровайся с папой и расскажи, как у тебя дела!',
      phrases: [{ en: 'Hello!' }, { en: 'How are you?' }, { en: "I'm fine.", pic: 'fine' }, { en: "I'm happy.", pic: 'happy' }, { en: "I'm tired.", pic: 'tired' }],
      teacher: [
        'Ритуал: **Hello, [имя]!** и **Hello, Dad!**',
        'Спросите **How are you?** и помогите ответить: **I’m fine / happy / tired.** Потом пусть она спросит вас.',
        'Быстрая проверка урока 1, по 1 вопросу: **Are you hungry?** (Yes, I am / No, I’m not). Покажите на неё: **You’re a…?** (girl). На себя: **I’m a…?** (подскажите: Dad).',
      ],
    },
    {
      type: 'scene', title: 'В гостях у Чёрной кошки', time: '4 мин',
      lines: [
        { who: 'blackcat', text: "Hello! I'm Black Cat. This is my family." },
        { who: 'plus',     text: "Who's this?" },
        { who: 'blackcat', text: "This is my mum. She's happy." },
        { who: 'plus',     text: "And who's this?" },
        { who: 'blackcat', text: "This is my dad. He's tired." },
        { who: 'blackcat', text: "This is my sister. She's small. And this is my dog. It's big!" },
      ],
      teacher: [
        'Скажите: «Доктор Плюсик пришла в гости к Чёрной кошке, и он показывает ей семейный альбом».',
        'Послушайте всех. Спросите по-русски: «Кого он показал? Что значит **This is my…**?» Пусть догадается (это мой / моя…).',
        'Спросите: «Про маму он сказал **She’s happy**, а про папу **He’s tired**. Чем отличаются she и he?» Не объясняйте сами, дайте догадаться.',
      ],
    },
    {
      type: 'cards', title: 'Семья', time: '3 мин',
      words: ['family', 'mum', 'dad', 'brother', 'sister', 'grandma', 'grandpa', 'baby'],
      teacher: [
        'Пусть нажмёт все карточки и повторит каждое слово.',
        'Пальчиковая игра: большой палец — **dad**, указательный — **mum**, средний — **brother**, безымянный — **sister**, мизинец — **baby**. Загибайте пальцы и называйте вместе.',
        'Потом вы называете, она показывает палец, и наоборот.',
      ],
    },
    {
      type: 'listen_pick', time: '3 мин', skill: ['listening', 'vocab'],
      words: ['family', 'mum', 'dad', 'brother', 'sister', 'grandma', 'grandpa', 'baby'], n: 8, opts: 3,
      teacher: ['Это она делает сама. Дайте подумать 3–5 секунд, не подсказывайте сразу.'],
    },
    {
      type: 'cards', title: 'Друг, собака, большой и маленький', time: '2 мин',
      words: ['friend', 'dog', 'big', 'small'],
      teacher: [
        '**big**: разведите руки широко, голос низкий. **small**: покажите щёлочку пальцами, голос тоненький. Она повторяет с жестом.',
        '**friend**: обнимите её или пожмите руку: **You’re my friend!**',
      ],
    },
    {
      type: 'rule', title: 'Заклинание №2: he’s, she’s, it’s', time: '3 мин',
      rows: [
        { full: 'he is', short: "he's", ru: 'он' },
        { full: 'she is', short: "she's", ru: 'она' },
        { full: 'it is', short: "it's", ru: 'оно (животное или вещь)' },
      ],
      note: '**he**: мальчик или мужчина. **she**: девочка или женщина. **it**: животное или вещь. Все трое дружат с **is**. Вся семья заклинания: **I am, you are, he / she / it is**.',
      examples: [
        { en: "He's a policeman.", pic: 'policeman' }, { en: "She's a doctor.", pic: 'doctor' },
        { en: "It's a dog.", pic: 'dog' }, { en: "She's my sister.", pic: 'sister' },
      ],
      teacher: [
        'Объясните за 1–2 минуты. Покажите на себя: **I’m Dad.** На неё: **You’re [имя].** На маму или её фото: **She’s Mum.** На игрушку: **It’s a bear.** (или любой предмет).',
        'Секрет для запоминания: **I** дружит только с **am**, **you** с **are**, а все остальные (he, she, it) с **is**.',
        'Пусть сама покажет на кого-нибудь и скажет he’s / she’s / it’s.',
      ],
    },
    {
      type: 'fill', title: 'He, she или it?', time: '3 мин', skill: ['grammar'],
      items: [
        { s: '___ is my mum.', answer: 'She', options: ['He', 'She', 'It'], pic: 'mum' },
        { s: '___ is my dad.', answer: 'He', options: ['He', 'She', 'It'], pic: 'dad' },
        { s: '___ is a dog.', answer: 'It', options: ['He', 'She', 'It'], pic: 'dog' },
        { s: '___ is my grandma.', answer: 'She', options: ['He', 'She', 'It'], pic: 'grandma' },
        { s: '___ is my brother.', answer: 'He', options: ['He', 'She', 'It'], pic: 'brother' },
        { s: '___ is a taxi.', answer: 'It', options: ['He', 'She', 'It'], pic: 'taxi' },
      ],
      teacher: [
        'Если она путает, спросите: «Это мальчик, девочка или животное/вещь?» Ответ сам подскажет he, she или it.',
      ],
    },
    {
      type: 'offline', title: 'Игра «Семейный альбом»', emoji: '📸', time: '4 мин',
      text: 'Покажи папе фото своей семьи и расскажи про каждого: This is my… He’s… She’s…',
      phrases: [{ en: "Who's this?" }, { en: 'This is my mum.', pic: 'mum' }, { en: "She's happy.", pic: 'happy' }, { en: 'This is my dad.', pic: 'dad' }, { en: "He's tired.", pic: 'tired' }],
      teacher: [
        'Возьмите настоящие фото. Вы спрашиваете **Who’s this?**, она отвечает **This is my…** Помогите добавить вторую фразу: **She’s happy / He’s big / It’s small.**',
        'Потом поменяйтесь: она спрашивает **Who’s this?**, а вы отвечаете. Иногда специально ошибайтесь: «This is my mum. He’s happy». Пусть поймает ошибку, детям это очень нравится.',
        'Если фото нет, нарисуйте семью человечками за 1 минуту.',
      ],
    },
    {
      type: 'listen_pick', title: 'Кто это? Слушаем фразы', time: '3 мин', skill: ['listening'],
      items: [
        { say: "She's my grandma.", answer: 'grandma', options: ['grandma', 'grandpa', 'baby'], words: ['grandma'] },
        { say: "He's my brother.", answer: 'brother', options: ['sister', 'brother', 'dad'], words: ['brother'] },
        { say: "It's a big dog.", answer: 'dog', options: ['dog', 'cat', 'baby'], words: ['dog'] },
        { say: "She's small. She's a baby.", answer: 'baby', options: ['mum', 'grandma', 'baby'], words: ['baby'] },
        { say: "This is my friend. He's happy.", answer: 'friend', options: ['friend', 'family', 'dad'], words: ['friend'] },
      ],
      teacher: [
        'Теперь на слух целые фразы, а не отдельные слова. Ей нужно выхватить главное слово. Пусть слушает столько раз, сколько нужно.',
        'После ответа спросите: «А ещё какие слова ты услышала?»',
      ],
    },
    {
      type: 'build', time: '2 мин', skill: ['grammar'],
      items: [
        { en: 'This is my mum.', ru: 'Это моя мама.', pic: 'mum', extra: ['dad'] },
        { en: "She's happy.", ru: 'Она весёлая.', pic: 'happy', extra: ["He's"] },
        { en: "He's my brother.", ru: 'Он мой брат.', pic: 'brother', extra: ["She's"] },
      ],
      teacher: ['Подсказка: «Сначала кто: he’s или she’s, потом всё остальное».'],
    },
    {
      type: 'speak', title: 'Скажи сама', time: '2 мин',
      words: ['family', 'mum', 'dad', 'brother', 'sister', 'grandma', 'grandpa', 'big', 'small'],
      teacher: [
        'Хвалите за смелость. Обратите внимание на **th** в слове **brother**: кончик языка между зубами. Сделайте это смешно, как змейку.',
        'Ритуал прощания: **Goodbye, [имя]!** и **Goodbye, Dad!**',
      ],
    },
  ],

  // ---------------- ДОМАШКА (~13 мин, сама) ----------------
  home: [
    {
      type: 'listen_pick', title: 'Разминка для ушей', skill: ['listening', 'vocab'],
      words: ['family', 'mum', 'dad', 'brother', 'sister', 'grandma', 'grandpa', 'baby', 'friend', 'dog', 'big', 'small'],
      n: 7, opts: 4,
    },
    {
      type: 'read_pick', title: 'Читаем сами', skill: ['reading', 'vocab'],
      words: ['mum', 'dad', 'dog', 'baby', 'big', 'small', 'sister'], n: 6, opts: 3,
    },
    {
      type: 'match', title: 'Найди пару', skill: ['reading', 'vocab'],
      words: ['grandma', 'grandpa', 'brother', 'sister', 'friend', 'family'],
    },
    {
      type: 'fill', title: 'Заклинание: am, are или is?', skill: ['grammar'],
      items: [
        { s: 'She ___ my sister.', answer: 'is', options: ['am', 'are', 'is'], pic: 'sister' },
        { s: 'I ___ hungry.', answer: 'am', options: ['am', 'are', 'is'], pic: 'hungry' },
        { s: 'He ___ my grandpa.', answer: 'is', options: ['am', 'are', 'is'], pic: 'grandpa' },
        { s: 'You ___ my friend.', answer: 'are', options: ['am', 'are', 'is'], pic: 'friend' },
        { s: 'It ___ small.', answer: 'is', options: ['am', 'are', 'is'], pic: 'small' },
        { s: '___ is my dad.', answer: 'He', options: ['He', 'She', 'It'], pic: 'dad' },
        { s: '___ is my mum.', answer: 'She', options: ['He', 'She', 'It'], pic: 'mum' },
        { s: '___ is big.', answer: 'It', options: ['He', 'She', 'It'], pic: 'big' },
      ],
    },
    {
      type: 'spell', title: 'Собери слово', skill: ['reading', 'vocab'],
      words: ['mum', 'dad', 'dog', 'big', 'baby'],
    },
    {
      type: 'listen_pick', title: 'Вспоминаем урок 1', skill: ['listening', 'vocab'],
      words: ['happy', 'sad', 'tired', 'hungry', 'policeman', 'doctor', 'cat', 'taxi'], n: 5, opts: 4,
    },
    {
      type: 'build', title: 'Собери предложение', skill: ['grammar'],
      items: [
        { en: 'This is my dad.', ru: 'Это мой папа.', pic: 'dad', extra: ['mum'] },
        { en: "It's a small dog.", ru: 'Это маленькая собака.', pic: 'dog', extra: ['big'] },
        { en: "She's my grandma.", ru: 'Она моя бабушка.', pic: 'grandma', extra: ["He's"] },
      ],
    },
    {
      type: 'story', title: 'Альбом Доктора Плюсика', skill: ['listening'],
      lines: [
        { who: 'blackcat', text: 'Hi, Doctor Plus! How are you?' },
        { who: 'plus',     text: "I'm fine! Look! This is my family." },
        { who: 'blackcat', text: "Who's this?" },
        { who: 'plus',     text: "This is my grandma. She's happy." },
        { who: 'blackcat', text: "And who's this?" },
        { who: 'plus',     text: "This is my brother. He's a doctor." },
        { who: 'plus',     text: "And this is my cat. It's small." },
        { who: 'blackcat', text: 'Hello, cat!' },
      ],
      questions: [
        { q: 'Как дела у Доктора Плюсика?', options: [{ t: "I'm fine!" }, { t: "I'm tired." }], answer: 0 },
        { q: 'Кого она показала первым?', options: [{ w: 'grandma' }, { w: 'grandpa' }, { w: 'baby' }], answer: 0, words: ['grandma'] },
        { q: 'Какая бабушка?', options: [{ w: 'sad' }, { w: 'tired' }, { w: 'happy' }], answer: 2 },
        { q: 'Кем работает брат?', options: [{ w: 'policeman' }, { w: 'doctor' }, { w: 'taxi' }], answer: 1 },
        { q: 'Какая у неё кошка?', options: [{ w: 'big' }, { w: 'small' }], answer: 1, words: ['small'] },
      ],
    },
  ],
});
