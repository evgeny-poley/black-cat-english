// Общие данные курса: герои, план из 12 уроков.
// Уроки подключаются отдельными файлами data/lessonNN.js через COURSE.addLesson(...)
window.COURSE = {
  title: 'Black Cat English',
  totalWords: 120, // сколько слов планируется на весь курс (для «зелья» слов)

  // Герои из папиных сказок. emoji — временная картинка, img — имя файла в папке img/
  // voice — как синтезатор меняет голос героя (pitch: высота, rate: скорость)
  characters: {
    blackcat: { name: 'Black Cat',   ru: 'Чёрная кошка',   emoji: '🕵️‍♂️', img: 'char_blackcat', voice: { pitch: 0.95, rate: 1.0 } },  // парень-полицейский по прозвищу Чёрная кошка
    reka:     { name: 'Reka',        ru: 'Ре́ка',           emoji: '🦫',  img: 'char_reka',     voice: { pitch: 0.7,  rate: 0.9 } },
    plus:     { name: 'Doctor Plus', ru: 'Доктор Плюсик',  emoji: '👩‍⚕️', img: 'char_plus',     voice: { pitch: 1.25, rate: 0.95 } },  // девушка-доктор, подруга Чёрной кошки
    susan:    { name: 'Susan',       ru: 'Сьюзан',         emoji: '🚕',  img: 'char_susan',    voice: { pitch: 1.45, rate: 1.05 } },
  },

  // Маршрут такси Сьюзан: 12 остановок = 12 уроков
  plan: [
    { n: 1,  icon: '🚓', title: "Hello! I'm Black Cat", ru: 'I am / you are: я и ты',               place: 'Полицейский участок' },
    { n: 2,  icon: '🏠', title: 'This is my family',     ru: 'he / she / it is: семья',             place: 'Дом Чёрной кошки' },
    { n: 3,  icon: '🌊', title: 'We are friends',        ru: 'we / they are, много предметов',      place: 'Пруд Реки' },
    { n: 4,  icon: '🔍', title: 'Is it a cat?',          ru: 'Вопросы и «нет»: Is it…? It isn’t…',  place: 'Детективное бюро' },
    { n: 5,  icon: '✉️', title: 'My name, your name',    ru: 'my / your / his / her / our / their', place: 'Почта' },
    { n: 6,  icon: '🧺', title: "I've got a…",           ru: 'have got / has got',                  place: 'Рынок' },
    { n: 7,  icon: '🏫', title: 'At school',             ru: 'Школьные вещи, this / that',          place: 'Школа' },
    { n: 8,  icon: '🍰', title: 'Yummy!',                ru: 'Еда, I like / I don’t like, a / an',  place: 'Кафе' },
    { n: 9,  icon: '🧸', title: 'Toys',                  ru: 'Игрушки, Tom’s, these / those',       place: 'Магазин игрушек' },
    { n: 10, icon: '🏥', title: 'Doctor Plus',           ru: 'Животные и тело, can / can’t',        place: 'Клиника Доктора Плюсика' },
    { n: 11, icon: '🏡', title: 'Home sweet home',       ru: 'there is / are, in / on / under',     place: 'Новый дом' },
    { n: 12, icon: '✨', title: 'The Big Case',          ru: 'Большое дело: итоговый квест',        place: 'Волшебная башня' },
  ],

  // Как синтезатору правильно произнести имена (ударение: РЕ-ка)
  pronounce: { Reka: 'Rehka' },

  words: {},
  lessons: {},
  addLesson(L) {
    Object.entries(L.words).forEach(([id, w]) => {
      this.words[id] = Object.assign({ id, img: 'w_' + id, lesson: L.n }, w);
    });
    this.lessons[L.n] = L;
  },
};
