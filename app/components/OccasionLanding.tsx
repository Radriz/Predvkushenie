import Link from "next/link";
import type { Occasion } from "../lib/occasions";
import { occasionList } from "../lib/occasions";
import { SiteFooter, SiteHeader } from "./SiteHeader";

export function OccasionLanding({ occasion }: { occasion: Occasion }) {
  return <main className={`occasion-page occasion-${occasion.slug}`} style={{"--event-accent":occasion.accent,"--event-surface":occasion.surface,"--event-text":occasion.text} as React.CSSProperties}>
    <SiteHeader light />
    <section className="occasion-hero">
      <div className="occasion-media" aria-hidden="true">
        <video autoPlay muted loop playsInline poster={`/media/${occasion.slug}.jpg`}><source src={`/media/${occasion.slug}-mobile.mp4`} media="(max-width: 640px)" type="video/mp4" /><source src={`/media/${occasion.slug}.webm`} type="video/webm" /><source src={`/media/${occasion.slug}.mp4`} type="video/mp4" /></video>
        <div className="media-fallback" />
      </div>
      <div className="occasion-veil" />
      <div className="occasion-heading">
        <p>{occasion.number} / {occasion.eyebrow}</p><h1>{occasion.title}</h1>
        <div><span>{occasion.line}</span><span>ПОД КЛЮЧ · ОТ 5 ДНЕЙ</span></div>
      </div>
      <Link href={`/demo/${occasion.slug}`} className="round-demo-link" aria-label={`Открыть демо ${occasion.short}`}><span>Смотреть<br/>живое демо</span><b>↘</b></Link>
    </section>
    <section className="occasion-intro">
      <p>ПОЧЕМУ ЭТО РАБОТАЕТ</p><h2>{occasion.description}</h2>
      <div className="feature-grid">{occasion.features.map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3><p>Продуманная деталь гостевого опыта, встроенная в общую режиссуру события.</p></article>)}</div>
    </section>
    <section className="preview-stage">
      <div className="preview-copy"><p>ЖИВОЙ ПРИМЕР</p><h2>Не макет.<br/>Настоящее приглашение.</h2><p>Откройте, включите звук, изучите программу и пройдите путь гостя до ответа RSVP.</p><Link href={`/demo/${occasion.slug}`} className="event-button">Открыть приглашение <span>↗</span></Link></div>
      <div className="mini-phone"><div className="mini-phone-screen" style={{background:`linear-gradient(155deg, ${occasion.surface}, ${occasion.accent})`,color:occasion.text}}><small>{occasion.date}</small><h3>{occasion.names}</h3><p>{occasion.greeting}</p><span>ОТКРЫТЬ</span></div></div>
    </section>
    <section className="occasion-cta"><p>ВАШЕ СОБЫТИЕ — СЛЕДУЮЩЕЕ</p><h2>Давайте создадим<br/>его первое впечатление.</h2><Link href={`/order?event=${occasion.slug}`}>Начать проект <span>↗</span></Link></section>
    <section className="other-directions"><p>ДРУГИЕ НАПРАВЛЕНИЯ</p><div>{occasionList.filter(x=>x.slug!==occasion.slug).map(x=><Link href={`/${x.slug}`} key={x.slug}><span>{x.number}</span>{x.short}<b>↗</b></Link>)}</div></section>
    <SiteFooter />
  </main>;
}
