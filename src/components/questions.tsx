const checkboxOptions1 = [
  { label: "Веселое", value: "Веселое" },
  { label: "Нейтральное", value: "Нейтральное" },
  { label: "Грустное", value: "Грустное" },
];

const checkboxOptions2 = [
  { label: "Комедия", value: "Комедия" },
  { label: "Фантастика", value: "Фантастика" },
  { label: "Драма", value: "Драма" },
  { label: "Триллер", value: "Триллер" },
  { label: "Ужасы", value: "Ужасы" },
  { label: "Романтика", value: "Романтика" },
  { label: "Приключения", value: "Приключения" },
  { label: "Детектив", value: "Детектив" },
  { label: "Криминал", value: "Криминал" },
  { label: "Космос", value: "Космос" },
  { label: "Сверхъестественное", value: "Сверхъестественное" },
];

const checkboxOptions3 = [
  {
    label: "Крутой сюжет с неожиданной развязкой",
    value: "Крутой сюжет с неожиданной развязкой",
  },
  { label: "Развитие персонажей", value: "Развитие персонажей" },
  {
    label: "Атмосфера и визуальный стиль",
    value: "Атмосфера и визуальный стил",
  },
  { label: "Умный юмор", value: "Умный юмо" },
  { label: "Захватывающие экшн-сцены", value: "Экшен" },
  { label: "Философская глубина", value: "Философская глубина" },
];

const checkboxOptions4 = [
  { label: "0+ (Для любой аудитории)", value: "0+" },
  { label: "6+ (Для детей старше 6 лет)", value: "6+" },
  { label: "12+ (Для детей старше 12 лет)", value: "12+" },
  { label: "16+ (Для подростков от 16 лет)", value: "16+" },
  { label: "18+ (Только для взрослых)", value: "18+" },
];

const checkboxOptions5 = [
  { label: "В одиночку", value: "один" },
  { label: "С семьей (включая детей)", value: "С семьёй" },
  { label: "С друзьями", value: "с друзьями" },
  { label: "Со второй половинкой", value: "со второй половинкой" },
  { label: "На вечеринке/в компании", value: "На вечеринке/в компании" },
];

const checkboxOptions6 = [
  { label: "Полнометражный фильм (~2 часа)", value: "Полнометражный фильм" },
  {
    label: "Короткометражный фильм (< 60 мин.)",
    value: "короткометражный фильм",
  },
  { label: "Мини-сериал (2-6 серий)", value: "мини-сериал" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions7 = [
  { label: "Классика (до 70-х)", value: "до 1970 годов" },
  { label: "80-е - 90-е", value: "80е-90е года" },
  { label: "Современное кино (2000-е и новее)", value: "после 2000 г" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions8 = [
  { label: "С известными актерами", value: "Со знаменитыми актерами" },
  { label: "С малоизвестнымы актерами", value: "С малоизвестнымы актерами" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions9 = [
  { label: "Медленное, вдумчивое", value: "Медленное,вдумчивое" },
  { label: "Умеренный темп", value: "Умеренный темп" },
  { label: "Динамичный и напряженный", value: "Динамичный и напряженный" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions10 = [
  { label: "Ниже 5⭐", value: "1-5" },
  { label: "Выше 5⭐", value: "5-10" },
  { label: "Идеальный 9-10⭐", value: "9-10" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions11 = [
  { label: "Фильм", value: "Фильм" },
  { label: "Аниме", value: "Анииме" },
  { label: "Сериал", value: "Сериал" },
  { label: "Мультфильм", value: "Мультфильм" },
];

const a = {
  title: "Укажи свое настроение",
  type: "checkbox",
  quest: checkboxOptions1,
};

const b = {
  title: "Выбери жанр",
  type: "checkbox",
  quest: checkboxOptions2,
};

const c = {
  title: "Что для тебя важно в фильме?",
  subtitle: "Выбери один или несколько пунктов",
  type: "checkbox",
  quest: checkboxOptions3,
};

const d = {
  title: "Какой хронометраж предпочитаешь?",
  type: "checkbox",
  quest: checkboxOptions6,
};

const e = {
  title: "Фильм какой эпохи хочешь посмотреть?",
  type: "checkbox",
  quest: checkboxOptions7,
};

const f = {
  title: "Насколько высокие требования к рейтингу?",
  type: "checkbox",
  quest: checkboxOptions10,
};

const g = {
  title: "Для тебя важен состав актеров?",
  type: "checkbox",
  quest: checkboxOptions8,
};

const h = {
  title: "Какой темп повествования тебе по душе?",
  type: "checkbox",
  quest: checkboxOptions9,
};

const i = {
  title: "Какой возрастной рейтинг предпочитаешь?",
  type: "checkbox",
  quest: checkboxOptions4,
};

const j = {
  title: "В какой обстановке будешь смотреть?",
  type: "checkbox",
  quest: checkboxOptions5,
};

const k = {
  title: "Что именно вы ищите?",
  type: "checkbox",
  quest: checkboxOptions11,
};

export const Quiz = [k, a, b, c, d, e, f, g, h, i, j];

export let start = [
  "Найди ОДИН ",
  " по критериям: Настроение: ",
  ", Жанр: ",
  ", Важно что бы было: ",
  ", Продолжительность в минутах: ",
  ", Дата выхода: ",
  ", Рейтинг: ",
  ", Популярность актеров: ",
  ", Темп повествования: ",
  ", Возрастной рейтинг: ",
  ", Буду смотреть c: ",
];

export let ansver: string[] = [
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
];
