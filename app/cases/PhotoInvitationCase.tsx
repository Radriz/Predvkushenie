/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type {InvitationCase} from "../lib/cases";

const eventNames:Record<InvitationCase["eventType"],string>={wedding:"Свадебная история",birthday:"Личный праздник",kids:"Детское приключение",business:"Частное событие",anniversary:"Семейная история",baby:"Праздник для малыша"};

export function PhotoInvitationCase({item}:{item:InvitationCase}){
  const dateParts=item.date.split(" ");
  return <main className={`photo-case photo-${item.eventType} photo-${item.variant??"split"}`} style={{"--photo-bg":item.palette[0],"--photo-accent":item.palette[1],"--photo-ink":item.palette[2],"--photo-soft":item.palette[3]} as React.CSSProperties}>
    <nav className="photo-nav"><Link href="/cases">Все кейсы</Link><span>ПРЕДВКУСИЕ · {eventNames[item.eventType]}</span><Link href={`/order?event=${item.eventType}`}>Создать своё ↗</Link></nav>
    <section className="photo-hero">
      <div className="photo-hero-media"><img src={item.image} alt={item.photoAlt??"Атмосфера события"}/></div>
      <div className="photo-hero-shade"/>
      <div className="photo-hero-copy"><p>{item.guestLine}</p><h1>{item.title}</h1><div><time dateTime={item.dateIso}>{item.date}</time><span>{item.city}</span></div></div>
      <span className="photo-scroll">Листайте дальше ↓</span>
    </section>

    <section className="photo-letter"><header><p>{eventNames[item.eventType]}</p><span>{dateParts.at(-1)}</span></header><h2>{item.greeting}</h2><div><p>{item.heroLine}</p><span>{item.story}</span></div></section>

    <section className="photo-scene"><img src={item.image} alt="" loading="lazy"/><div><p>НАСТРОЕНИЕ</p><h2>{item.detailTitle}</h2><span>{item.description}</span></div><b aria-hidden="true">{String(dateParts[0]).padStart(2,"0")}</b></section>

    <section className="photo-program"><header><p>ПЛАН СОБЫТИЯ</p><h2>Всё важное<br/>в своём ритме</h2></header><div>{item.program.map((point,index)=><article key={point.time}><span>{String(index+1).padStart(2,"0")}</span><time>{point.time}</time><h3>{point.title}</h3><p>{point.note}</p></article>)}</div></section>

    <section className="photo-place"><div className="photo-place-art"><img src={item.image} alt="" loading="lazy"/><span aria-hidden="true"/></div><div><p>МЕСТО ВСТРЕЧИ</p><h2>{item.venue}</h2><span>{item.address}<br/>{item.city}</span><a href={item.mapUrl} target="_blank" rel="noreferrer">Построить маршрут ↗</a></div></section>

    <section className="photo-notes"><article><p>КАК ОДЕТЬСЯ</p><h2>Палитра<br/>события</h2><span>{item.dressCode}</span><div>{item.palette.map(color=><i style={{background:color}} key={color}/>)}</div></article><article><p>О ПОДАРКАХ</p><h2>Вместо<br/>формальностей</h2><span>{item.giftNote}</span></article></section>

    <section className="photo-rsvp"><header><p>ОТВЕТ ГОСТЯ · ДЕМО</p><h2>Будете<br/>с нами?</h2><span>Ответ в этом примере никуда не отправляется<br/>{item.contact}</span></header><form><label>Имя или имена гостей<input placeholder="Как к вам обращаться"/></label><fieldset><legend>Получится прийти?</legend><label><input type="radio" name={`${item.slug}-attendance`} defaultChecked/>Да, буду</label><label><input type="radio" name={`${item.slug}-attendance`}/>Не смогу</label></fieldset><label>{item.formPrompt}<textarea placeholder="Можно ответить коротко"/></label><button type="button">Сохранить ответ <span>↗</span></button></form></section>

    <footer className="photo-finale"><p>ДО ВСТРЕЧИ</p><h2>{item.couple}</h2><div><time>{item.date}</time><Link href="/cases">Другие истории ↗</Link></div></footer>
  </main>;
}
