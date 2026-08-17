export type InvitationCase = {
  slug:string;
  eventType:"wedding"|"birthday"|"kids"|"business"|"anniversary"|"baby";
  eventLabel:string;
  title:string;
  couple:string;
  date:string;
  dateIso:string;
  city:string;
  venue:string;
  address:string;
  mapUrl:string;
  image:string;
  video:string;
  palette:string[];
  description:string;
  greeting:string;
  story:string;
  dressCode:string;
  giftNote:string;
  contact:string;
  program:{time:string;title:string;note:string}[];
};

export const invitationCases:InvitationCase[]=[{
  slug:"wedding-glass-garden",
  eventType:"wedding",
  eventLabel:"Свадьба",
  title:"Стеклянный сад",
  couple:"Анна & Лев",
  date:"14 июня 2027",
  dateIso:"2027-06-14T15:30:00+03:00",
  city:"Санкт-Петербург",
  venue:"Оранжерея Таврического сада",
  address:"Шпалерная улица, 43",
  mapUrl:"https://yandex.ru/maps/?text=Оранжерея%20Таврического%20сада",
  image:"/cases/wedding-glass-garden/hero.webp",
  video:"/cases/wedding-glass-garden/hero.mp4",
  palette:["#ede7dc","#c7b5a4","#6e7767","#2b302b"],
  description:"Камерная свадьба в стеклянной оранжерее, где шёлк, утренний свет и живые ветви становятся частью истории",
  greeting:"Дорогие Мария и Илья, мы будем счастливы увидеть вас в день, когда наш общий дом станет чуть больше",
  story:"Мы познакомились в городе, где погода меняется быстрее планов, а важные разговоры всегда случаются во время долгих прогулок. Поэтому встречаемся там, где даже петербургский дождь превращается в свет",
  dressCode:"Спокойные природные оттенки, лёгкие ткани и одна деталь цвета молодой листвы",
  giftNote:"Лучший подарок — ваше присутствие. Если захочется поддержать нашу мечту, мы будем рады вкладу в путешествие по Исландии",
  contact:"Координатор Полина · +7 900 000-00-00",
  program:[
    {time:"15:30",title:"Встреча",note:"Игристое среди яблоневых ветвей"},
    {time:"16:20",title:"Церемония",note:"Несколько самых важных слов"},
    {time:"17:10",title:"Ужин",note:"Сезонное меню и живой квартет"},
    {time:"21:30",title:"Сумерки",note:"Торт, свечи и танцы под стеклянной крышей"},
  ],
},{
  slug:"wedding-midnight-atlas",
  eventType:"wedding",
  eventLabel:"Свадьба",
  title:"Полуночный атлас",
  couple:"Вера & Никита",
  date:"17 октября 2027",
  dateIso:"2027-10-17T18:40:00+03:00",
  city:"Москва",
  venue:"Павильон «Рабочий и колхозница»",
  address:"проспект Мира, 123Б",
  mapUrl:"https://yandex.ru/maps/?text=Рабочий%20и%20колхозница%20павильон",
  image:"/cases/wedding-midnight-atlas/hero.webp",
  video:"/cases/wedding-midnight-atlas/hero.mp4",
  palette:["#070a13","#19264a","#bcc8d8","#f24b63"],
  description:"Ночная городская свадьба как точный маршрут из света, архитектуры и четырёх важных остановок",
  greeting:"Катя и Андрей, этой осенью мы выбираем город, ночь и людей, рядом с которыми время перестаёт быть важным",
  story:"Мы встретились на последнем поезде, а через семь лет решили начать новую главу там, где город виден целиком. Этот вечер движется от синего часа к полуночи — следуйте за красной линией",
  dressCode:"Глубокий синий, графит и холодный металл. Красная деталь станет вашим знаком на общей фотографии",
  giftNote:"Мы собираем домашнюю библиотеку архитектуры и путешествий. Можно подарить любимую книгу с подписью или поддержать наш будущий маршрут по Японии",
  contact:"Куратор вечера Лиза · +7 900 000-00-00",
  program:[
    {time:"18:40",title:"Синий час",note:"Встречаемся на верхней галерее"},
    {time:"19:30",title:"Красная линия",note:"Церемония в центральном зале"},
    {time:"20:30",title:"Город за стеклом",note:"Ужин и короткие истории"},
    {time:"23:50",title:"Новая глава",note:"Полуночный торт и первый танец"},
  ],
}];

export function getInvitationCase(slug:string){return invitationCases.find(item=>item.slug===slug)}
