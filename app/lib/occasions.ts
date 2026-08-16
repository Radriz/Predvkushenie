export type OccasionSlug = "wedding" | "birthday" | "kids" | "business" | "anniversary" | "baby";

export type Occasion = {
  slug: OccasionSlug;
  number: string;
  short: string;
  eyebrow: string;
  title: string;
  line: string;
  description: string;
  accent: string;
  surface: string;
  text: string;
  date: string;
  names: string;
  greeting: string;
  venue: string;
  address: string;
  mapUrl: string;
  dress: string;
  gift: string;
  contact: string;
  targetDate: string;
  schedule: { time: string; title: string; note: string }[];
  rsvpQuestions: string[];
  features: string[];
};

export const occasions: Record<OccasionSlug, Occasion> = {
  wedding: {
    slug: "wedding", number: "01", short: "Свадьба", eyebrow: "История двоих",
    title: "Нежность, у которой есть адрес", line: "Светлая editorial-режиссура",
    description: "Первый цифровой кадр вашей свадьбы: тактильный, личный и наполненный предвкушением.",
    accent: "#b19162", surface: "#f1eadf", text: "#2f2b24", date: "12 сентября 2026",
    names: "Алексей & София", greeting: "Дорогие Анна и Михаил, будем счастливы разделить этот день вместе с вами.",
    venue: "Усадьба Архангельское", address: "Московская область, Ильинское шоссе, 4",
    mapUrl: "https://yandex.ru/maps/?text=Усадьба%20Архангельское", dress: "Молочный · оливковый · дымчато-розовый",
    gift: "Лучшим подарком для нас станет вклад в наше первое большое путешествие.", contact: "Организатор Мария · +7 900 000-00-00",
    targetDate: "2026-09-12T15:30:00+03:00",
    schedule: [{time:"15:30",title:"Welcome",note:"Игристое и первые объятия"},{time:"16:30",title:"Церемония",note:"Самый важный момент"},{time:"17:30",title:"Ужин",note:"Тосты, музыка и танцы"},{time:"23:30",title:"Финал",note:"Бенгальские огни"}],
    rsvpQuestions:["Присутствие","Количество гостей","Предпочтения по меню","Трансфер"], features:["Персональное обращение","RSVP для семьи","Тайминг и карта","Музыка и чат гостей"]
  },
  birthday: {
    slug:"birthday",number:"02",short:"День рождения",eyebrow:"Главная ночь года",title:"Вечеринка как арт-объект",line:"Cherry noir & kinetic type",
    description:"Смелое приглашение для тех, кто собирает любимых людей и превращает вечер в сцену.",accent:"#f13b59",surface:"#130f12",text:"#fff4eb",date:"24 октября 2026",
    names:"DASHA / 30",greeting:"Это тот самый повод надеть лучшее, оставить планы на завтра и быть со мной до последнего трека.",venue:"Blanc Rooftop",address:"Москва, Хохловский переулок, 7",mapUrl:"https://yandex.ru/maps/?text=Хохловский%20переулок%207",dress:"Black · cherry · chrome",gift:"Никаких цветов — сохраните силы для танцпола.",contact:"Консьерж вечеринки · +7 900 000-00-00",targetDate:"2026-10-24T20:00:00+03:00",
    schedule:[{time:"20:00",title:"Doors",note:"Коктейли и полароиды"},{time:"21:00",title:"Dinner",note:"Ужин без длинных речей"},{time:"22:30",title:"Live set",note:"Громче обычного"},{time:"01:00",title:"After",note:"Для тех, кто не сдаётся"}],
    rsvpQuestions:["Будете ли вы","+1","Любимый коктейль","Песня для плейлиста"],features:["Тизер вечеринки","Вишлист","Гостевой плейлист","Секретная локация"]
  },
  kids: {
    slug:"kids",number:"03",short:"Детский",eyebrow:"Мир, придуманный для игры",title:"Праздник с собственной планетой",line:"Clay play & stop motion",
    description:"Добрая интерактивная история для маленьких гостей и понятная логистика для родителей.",accent:"#ff6847",surface:"#ddf5e8",text:"#213b39",date:"16 августа 2026",
    names:"МИШЕ 7!",greeting:"Команда исследователей, готовьтесь! Мы отправляемся на Планету Семь — там будут сокровища, эксперименты и очень много торта.",venue:"Творческая станция «Лес»",address:"Москва, ул. Большая Дмитровка, 32",mapUrl:"https://yandex.ru/maps/?text=Большая%20Дмитровка%2032",dress:"Любимый цвет и удобная обувь",gift:"Если хотите порадовать Мишу — выберите книгу или набор для опытов.",contact:"Мама Лена · +7 900 000-00-00",targetDate:"2026-08-16T13:00:00+03:00",
    schedule:[{time:"13:00",title:"Сбор команды",note:"Знакомимся и получаем значки"},{time:"13:30",title:"Большой квест",note:"Ищем семь артефактов"},{time:"15:00",title:"Торт",note:"Загадываем желание"},{time:"16:00",title:"Домой",note:"С подарком исследователя"}],
    rsvpQuestions:["Имя и возраст ребёнка","Сопровождающий","Аллергии","Любимый герой без лицензий"],features:["Отдельный мир","Аллергии и питание","Сопровождающие","Маршрут для родителей"]
  },
  business: {
    slug:"business",number:"04",short:"Business",eyebrow:"События для тех, кто меняет рынок",title:"Точное впечатление до регистрации",line:"Cobalt architecture",
    description:"Digital-premium для конференций, запусков и корпоративных вечеров: бренд, программа и регистрация в одном интерфейсе.",accent:"#4f7cff",surface:"#10131a",text:"#f4f6fb",date:"19 ноября 2026",
    names:"FUTURE / HUMAN",greeting:"Закрытая встреча лидеров продукта, дизайна и технологий. Один вечер, чтобы увидеть следующий год раньше остальных.",venue:"GES-2 House of Culture",address:"Москва, Болотная набережная, 15",mapUrl:"https://yandex.ru/maps/?text=Болотная%20набережная%2015",dress:"Modern business · cobalt detail",gift:"Именной QR-код появится после подтверждения регистрации.",contact:"Event desk · events@example.ru",targetDate:"2026-11-19T17:00:00+03:00",
    schedule:[{time:"17:00",title:"Check-in",note:"Кофе и networking"},{time:"18:00",title:"Keynote",note:"Человек в эпоху AI"},{time:"19:30",title:"Dinner",note:"Камерный разговор"},{time:"21:00",title:"Live",note:"Аудиовизуальный перформанс"}],
    rsvpQuestions:["Компания и должность","Формат участия","Пропуск","Пищевая непереносимость"],features:["Брендирование","Сегментация гостей","QR check-in","Экспорт регистраций"]
  },
  anniversary: {
    slug:"anniversary",number:"05",short:"Юбилей",eyebrow:"Время собирать истории",title:"Тёплый свет важных воспоминаний",line:"Burgundy 35 mm",
    description:"Элегантная цифровая история о человеке, семье или компании — без шаблонной торжественности.",accent:"#c48a54",surface:"#39191d",text:"#fff0db",date:"3 октября 2026",
    names:"ОЛЕГ · 50",greeting:"Полвека — прекрасный повод собрать за одним столом людей, благодаря которым каждая глава получилась настоящей.",venue:"Дом литераторов",address:"Москва, Большая Никитская, 53",mapUrl:"https://yandex.ru/maps/?text=Большая%20Никитская%2053",dress:"Вечерний · бордовый акцент",gift:"Принесите одну фотографию или историю — соберём семейную киноленту.",contact:"Дочь Алина · +7 900 000-00-00",targetDate:"2026-10-03T18:00:00+03:00",
    schedule:[{time:"18:00",title:"Встреча",note:"Аперитив у камина"},{time:"19:00",title:"Ужин",note:"Вкус и разговоры"},{time:"20:30",title:"Кинолента",note:"Истории длиною в жизнь"},{time:"22:00",title:"Музыка",note:"Любимые песни"}],
    rsvpQuestions:["Присутствие","С кем будете","Пожелания по меню","История для юбиляра"],features:["Архив фотографий","Семейные истории","Деликатный RSVP","Цифровая капсула"]
  },
  baby: {
    slug:"baby",number:"06",short:"Baby",eyebrow:"Самая нежная тайна",title:"Облако, в котором живёт чудо",line:"Soft dreamscape",
    description:"Воздушные приглашения для baby shower, гендер-пати и крестин — тактильные, спокойные и очень личные.",accent:"#9576d5",surface:"#f1eaf7",text:"#41384b",date:"30 августа 2026",
    names:"A LITTLE SECRET",greeting:"Совсем скоро в нашей истории появится новый герой. Давайте вместе откроем самую нежную тайну этого лета.",venue:"Оранжерея «Воздух»",address:"Москва, проспект Мира, 119",mapUrl:"https://yandex.ru/maps/?text=проспект%20Мира%20119",dress:"Lavender · peach · sky",gift:"Вместо цветов можно принести любимую детскую книгу с подписью.",contact:"Будущая мама Аня · +7 900 000-00-00",targetDate:"2026-08-30T15:00:00+03:00",
    schedule:[{time:"15:00",title:"Welcome",note:"Лимонад и лёгкий brunch"},{time:"16:00",title:"Игры",note:"Предсказания и истории"},{time:"17:00",title:"Reveal",note:"Открываем тайну"},{time:"18:00",title:"Фото",note:"Сохраняем момент"}],
    rsvpQuestions:["Присутствие","С кем будете","Пожелания по меню","Ваше предсказание"],features:["Baby shower","Gender reveal","Крестины","Семейный RSVP"]
  }
};

export const occasionList = Object.values(occasions);
export function isOccasionSlug(value: string): value is OccasionSlug { return value in occasions; }
