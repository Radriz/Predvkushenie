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
}];

export function getInvitationCase(slug:string){return invitationCases.find(item=>item.slug===slug)}
