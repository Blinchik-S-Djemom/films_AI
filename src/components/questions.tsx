const checkboxOptions1 = [
  { label: "Веселое", value: "Happy" },
  { label: "Нейтральное", value: "neutral" },
  { label: "Грустное", value: "Sad" },
];

const checkboxOptions2 = [
  { label: "Комедия", value: "Comedy" },
  { label: "Фантастика", value: "Sci-Fi" },
  { label: "Драма", value: "Drama" },
  { label: "Триллер", value: "Thriller" },
  { label: "Ужасы", value: "Horror" },
  { label: "Романтика", value: "Romance" },
  { label: "Приключения", value: "Adventure" },
  { label: "Детектив", value: "Mystery" },
];

const checkboxOptions3 = [
  { label: "Крутой сюжет с неожиданной развязкой", value: "Plot" },
  { label: "Развитие персонажей", value: "Characters" },
  { label: "Атмосфера и визуальный стиль", value: "Atmosphere" },
  { label: "Умный юмор", value: "Humor" },
  { label: "Захватывающие экшн-сцены", value: "Action" },
  { label: "Философская глубина", value: "Deep" },
];

const checkboxOptions4 = [
  { label: "0+ (Для любой аудитории)", value: "0+" },
  { label: "6+ (Для детей старше 6 лет)", value: "6+" },
  { label: "12+ (Для детей старше 12 лет)", value: "12+" },
  { label: "16+ (Для подростков от 16 лет)", value: "16+" },
  { label: "18+ (Только для взрослых)", value: "18+" },
];

const checkboxOptions5 = [
  { label: "В одиночку", value: "alone" },
  { label: "С семьей (включая детей)", value: "family" },
  { label: "С друзьями", value: "friends" },
  { label: "Со второй половинкой", value: "partner" },
  { label: "На вечеринке/в компании", value: "party" },
];

const checkboxOptions6 = [
  { label: "Полнометражный фильм (~2 часа)", value: "feature" },
  { label: "Короткометражный фильм (< 60 мин.)", value: "short" },
  { label: "Мини-сериал (2-6 серий)", value: "miniseries" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions7 = [
  { label: "Классика (до 70-х)", value: "old" },
  { label: "80-е - 90-е", value: "80s-90s" },
  { label: "Современное кино (2000-е и новее)", value: "modern" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions8 = [
  { label: "С известными актерами", value: "famous" },
  { label: "С независимыми актерами", value: "new" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions9 = [
  { label: "Медленное, вдумчивое", value: "slow" },
  { label: "Умеренный темп", value: "medium" },
  { label: "Динамичный и напряженный", value: "fast" },
  { label: "Не важно", value: "any" },
];

/*const sliderOption1 = {
  min: 0,
  max: 9,
  step: 0.5,
  default: 6.5,
  minLabel: "Любой рейтинг",
  maxLabel: "Только шедевры (8.5+)",
};*/

const checkboxOptions10 = [
  { label: "Ниже 5⭐", value: "1-5" },
  { label: "Выше 5⭐", value: "5-10" },
  { label: "Динамичный и напряженныИдеальный 9-10⭐", value: "9-10" },
  { label: "Не важно", value: "any" },
];

const checkboxOptions11 = [
  { label: "Фильм", value: "Films" },
  { label: "Аниме", value: "Anime" },
  { label: "Сериал", value: "Serial" },
  { label: "Мультфильм", value: "Cartoon" },
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
  /*subtitle:
    "Перетащи ползунок, чтобы выбрать минимальный рейтинг IMDb/Kinopoisk",
  type: "slider",*/
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
