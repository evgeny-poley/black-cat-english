// Урок 3. We are friends — we / they are, много предметов (-s)
COURSE.addLesson({
  n: 3,
  goal: 'Говорить о нескольких: we’re, they’re. Считать до пяти и говорить «много»: one frog → two frogs. Повторить he / she / it. 12 новых слов: у пруда и числа.',
  prep: [
    'Приготовьте **5 любых мелких одинаковых предметов** (пуговицы, кубики, карандаши) для счёта.',
    'Правило -s объясняйте как «хвостик»: когда предметов много, слово отращивает хвостик **s**. Детям так легче запомнить.',
    'Реку называйте **she**: она девочка. Это хороший повод повторить she’s из прошлого урока.',
  ],

  words: {
    frog:   { en: 'frog',   ru: 'лягушка',   emoji: '🐸' },
    duck:   { en: 'duck',   ru: 'утка',      emoji: '🦆' },
    bee:    { en: 'bee',    ru: 'пчела',     emoji: '🐝' },
    bird:   { en: 'bird',   ru: 'птица',     emoji: '🐦' },
    tree:   { en: 'tree',   ru: 'дерево',    emoji: '🌳' },
    flower: { en: 'flower', ru: 'цветок',    emoji: '🌸' },
    sun:    { en: 'sun',    ru: 'солнце',    emoji: '☀️' },
    boat:   { en: 'boat',   ru: 'лодка',     emoji: '⛵' },
    two:    { en: 'two',    ru: 'два',       emoji: '2️⃣' },
    three:  { en: 'three',  ru: 'три',       emoji: '3️⃣' },
    four:   { en: 'four',   ru: 'четыре',    emoji: '4️⃣' },
    five:   { en: 'five',   ru: 'пять',      emoji: '5️⃣' },
  },

  // ---------------- УРОК С ПАПОЙ (~30 мин) ----------------
  class: [
    {
      type: 'offline', title: 'Разминка: кто это?', emoji: '👋', time: '3 мин',
      text: 'Поздоровайся с папой. Покажи на кого-нибудь и скажи: He’s… / She’s… / It’s…',
      phrases: [{ en: 'Hello!' }, { en: 'How are you?' }, { en: "He's my dad.", pic: 'dad' }, { en: "She's my mum.", pic: 'mum' }, { en: "It's a dog.", pic: 'dog' }],
      teacher: [
        'Ритуал: **Hello, [имя]! How are you?**',
        'Повторение урока 2: покажите на фото или игрушку и спросите **Who’s this?** Она отвечает **He’s… / She’s… / It’s…**',
        'Одна ловушка: «It’s my mum». Пусть поймает ошибку.',
      ],
    },
    {
      type: 'scene', title: 'У пруда Реки', time: '4 мин',
      lines: [
        { who: 'reka',     text: "Hello! I'm Reka. This is my pond." },
        { who: 'blackcat', text: 'Wow! Look! Two ducks!' },
        { who: 'reka',     text: "They're my friends." },
        { who: 'blackcat', text: 'And three frogs!' },
        { who: 'reka',     text: "They're my friends too. We're all friends!" },
        { who: 'blackcat', text: "Reka, we're friends too!" },
      ],
      teacher: [
        'Скажите: «Сьюзан привезла Чёрную кошку к пруду. Там живёт Река».',
        'Спросите: «Кого он увидел? Сколько?» Пусть догадается про **two** и **three**.',
        'Обратите внимание: «Про уток Река сказала **They’re my friends**. Как думаешь, что значит they?»',
      ],
    },
    {
      type: 'cards', title: 'У пруда', time: '3 мин',
      words: ['frog', 'duck', 'bee', 'bird', 'tree', 'flower', 'sun', 'boat'],
      teacher: [
        'Пусть нажмёт все карточки и повторит каждое слово.',
        'Игра «Изобрази»: вы говорите слово, она показывает (**frog**: прыгает, **duck**: крякает, **bee**: жужжит, **bird**: машет руками, **tree**: стоит, руки вверх). Потом наоборот.',
      ],
    },
    {
      type: 'listen_pick', time: '3 мин', skill: ['listening', 'vocab'],
      words: ['frog', 'duck', 'bee', 'bird', 'tree', 'flower', 'sun', 'boat'], n: 8, opts: 3,
      teacher: ['Это она делает сама. Если ошиблась, не страшно: слово вернётся ещё раз.'],
    },
    {
      type: 'cards', title: 'Считаем: 2, 3, 4, 5', time: '3 мин',
      words: ['two', 'three', 'four', 'five'],
      teacher: [
        'Скорее всего, числа она уже знает со 2 класса. Если так, просто быстро повторите.',
        'Разложите предметы и считайте вместе: **one, two, three, four, five**. Потом спрячьте несколько и спросите **How many?**',
      ],
    },
    {
      type: 'rule', title: 'Заклинание №3: we’re, they’re и хвостик -s', time: '4 мин',
      rows: [
        { full: 'we are', short: "we're", ru: 'мы' },
        { full: 'they are', short: "they're", ru: 'они' },
        { full: 'one frog', short: 'two frogs', ru: 'много: + s' },
      ],
      note: '**we** и **they** дружат с **are**, как и **you**. Вся семья заклинания: **I am, you are, he / she / it is, we are, they are**. Когда предметов много, слово отращивает хвостик **-s**: a duck → two duck**s**.',
      examples: [
        { en: "We're friends.", pic: 'friend' }, { en: "They're ducks.", pic: 'duck' },
        { en: 'Two frogs.', pic: 'frog' }, { en: 'Three trees.', pic: 'tree' },
      ],
      teacher: [
        'Покажите на себя и на неё: **We’re friends!** На двух игрушек: **They’re bears.**',
        'Хвостик -s: положите один кубик: **one cube**, два: **two cubes**. Пусть она сама добавит хвостик к другим словам.',
        'Секрет: «Если больше одного — нужен хвостик».',
      ],
    },
    {
      type: 'fill', title: 'Один или много?', time: '3 мин', skill: ['grammar'],
      items: [
        { s: 'two ___', answer: 'ducks', options: ['duck', 'ducks'], pic: 'duck' },
        { s: 'a ___', answer: 'frog', options: ['frog', 'frogs'], pic: 'frog' },
        { s: 'three ___', answer: 'bees', options: ['bee', 'bees'], pic: 'bee' },
        { s: 'five ___', answer: 'flowers', options: ['flower', 'flowers'], pic: 'flower' },
        { s: 'a ___', answer: 'boat', options: ['boat', 'boats'], pic: 'boat' },
        { s: 'four ___', answer: 'birds', options: ['bird', 'birds'], pic: 'bird' },
      ],
      teacher: ['Подсказка: «Сколько их? Если больше одного — хвостик».'],
    },
    {
      type: 'offline', title: 'Игра «Сколько?»', emoji: '🔢', time: '3 мин',
      text: 'Папа прячет предметы в руке. Угадай, сколько, и скажи по-английски!',
      phrases: [{ en: 'How many?' }, { en: 'Two!', pic: 'two' }, { en: 'Three!', pic: 'three' }, { en: 'Four!', pic: 'four' }, { en: 'Five!', pic: 'five' }],
      teacher: [
        'Зажмите в кулаке 1–5 предметов и спросите **How many?** Она угадывает: **Three!** Открывайте кулак и считайте вместе.',
        'Потом поменяйтесь ролями. Пусть она прячет, а вы угадываете. Иногда ошибайтесь, чтобы она вас поправила.',
      ],
    },
    {
      type: 'listen_pick', title: 'Слушаем фразы: кто и сколько?', time: '2 мин', skill: ['listening'],
      items: [
        { say: 'Two ducks.', answer: 'duck', options: ['duck', 'frog', 'bird'], words: ['duck'] },
        { say: 'Three frogs.', answer: 'three', options: ['two', 'three', 'five'], words: ['three'] },
        { say: "They're bees.", answer: 'bee', options: ['bee', 'bird', 'flower'], words: ['bee'] },
        { say: 'Five flowers.', answer: 'five', options: ['four', 'five', 'two'], words: ['five'] },
        { say: "Look! It's a boat.", answer: 'boat', options: ['boat', 'tree', 'sun'], words: ['boat'] },
      ],
      teacher: ['Ей нужно выхватить главное слово. Пусть слушает столько раз, сколько нужно.'],
    },
    {
      type: 'build', time: '2 мин', skill: ['grammar'],
      items: [
        { en: "We're friends.", ru: 'Мы друзья.', pic: 'friend', extra: ["They're"] },
        { en: "They're two ducks.", ru: 'Это две утки.', pic: 'duck', extra: ['duck'] },
        { en: 'Three frogs.', ru: 'Три лягушки.', pic: 'frog', extra: ['frog'] },
      ],
      teacher: ['Подсказка: «Не забудь хвостик, если их много».'],
    },
    {
      type: 'speak', title: 'Скажи сама', time: '2 мин',
      words: ['frog', 'duck', 'bee', 'bird', 'tree', 'flower', 'three', 'five'],
      teacher: [
        'Обратите внимание на **th** в **three**: язык между зубами, как в brother. Не «сри» и не «фри».',
        'Ритуал прощания: **Goodbye, [имя]!** и **Goodbye, Dad!**',
      ],
    },
  ],

  // ---------------- ДОМАШКА (~13 мин, сама) ----------------
  home: [
    {
      type: 'listen_pick', title: 'Разминка для ушей', skill: ['listening', 'vocab'],
      words: ['frog', 'duck', 'bee', 'bird', 'tree', 'flower', 'sun', 'boat', 'two', 'three', 'four', 'five'],
      n: 7, opts: 4,
    },
    {
      type: 'read_pick', title: 'Читаем сами', skill: ['reading', 'vocab'],
      words: ['frog', 'duck', 'bee', 'sun', 'tree', 'boat', 'bird'], n: 6, opts: 3,
    },
    {
      type: 'match', title: 'Найди пару', skill: ['reading', 'vocab'],
      words: ['flower', 'bird', 'two', 'three', 'four', 'five'],
    },
    {
      type: 'fill', title: 'Заклинание: am, is или are?', skill: ['grammar'],
      items: [
        { s: 'We ___ friends.', answer: 'are', options: ['am', 'is', 'are'], pic: 'friend' },
        { s: 'They ___ frogs.', answer: 'are', options: ['am', 'is', 'are'], pic: 'frog' },
        { s: 'It ___ a duck.', answer: 'is', options: ['am', 'is', 'are'], pic: 'duck' },
        { s: 'I ___ happy.', answer: 'am', options: ['am', 'is', 'are'], pic: 'happy' },
        { s: 'She ___ my sister.', answer: 'is', options: ['am', 'is', 'are'], pic: 'sister' },
        { s: 'three ___', answer: 'trees', options: ['tree', 'trees'], pic: 'tree' },
        { s: 'two ___', answer: 'boats', options: ['boat', 'boats'], pic: 'boat' },
      ],
    },
    {
      type: 'spell', title: 'Собери слово', skill: ['reading', 'vocab'],
      words: ['sun', 'bee', 'frog', 'duck', 'five'],
    },
    {
      type: 'listen_pick', title: 'Вспоминаем уроки 1 и 2', skill: ['listening', 'vocab'],
      words: ['mum', 'dad', 'brother', 'sister', 'happy', 'hungry', 'dog', 'big', 'small'], n: 5, opts: 4,
    },
    {
      type: 'build', title: 'Собери предложение', skill: ['grammar'],
      items: [
        { en: "They're my friends.", ru: 'Они мои друзья.', pic: 'friend', extra: ["We're"] },
        { en: 'Four birds.', ru: 'Четыре птицы.', pic: 'bird', extra: ['bird'] },
        { en: "We're happy.", ru: 'Мы весёлые.', pic: 'happy', extra: ["I'm"] },
      ],
    },
    {
      type: 'story', title: 'Пикник у пруда', skill: ['listening'],
      lines: [
        { who: 'plus',     text: 'Hi, Reka! Hi, Black Cat!' },
        { who: 'reka',     text: 'Hi, Doctor Plus! Look! Four birds in the tree.' },
        { who: 'plus',     text: "They're small. And look! Five bees!" },
        { who: 'reka',     text: "They're my friends." },
        { who: 'blackcat', text: "We're hungry!" },
        { who: 'reka',     text: "I'm hungry too!" },
      ],
      questions: [
        { q: 'Сколько птиц на дереве?', options: [{ w: 'two' }, { w: 'four' }, { w: 'five' }], answer: 1, words: ['four'] },
        { q: 'Где сидят птицы?', options: [{ w: 'tree' }, { w: 'boat' }, { w: 'flower' }], answer: 0, words: ['tree'] },
        { q: 'Кого ещё увидела Доктор Плюсик?', options: [{ w: 'frog' }, { w: 'duck' }, { w: 'bee' }], answer: 2, words: ['bee'] },
        { q: 'Что сказал Чёрная кошка?', options: [{ t: "We're hungry!" }, { t: "We're tired." }], answer: 0 },
        { q: 'А Река?', options: [{ w: 'hungry' }, { w: 'sad' }, { w: 'tired' }], answer: 0 },
      ],
    },
  ],
});
