import Link from "next/link";
import type { Occasion } from "../lib/occasions";
import { occasionList } from "../lib/occasions";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import { EventVideo } from "./EventVideo";

export function OccasionLanding({ occasion }: { occasion: Occasion }) {
  return <main className={`occasion-page occasion-${occasion.slug}`} style={{"--event-accent":occasion.accent,"--event-surface":occasion.surface,"--event-text":occasion.text} as React.CSSProperties}>
    <SiteHeader light />
    <section className="occasion-hero">
      <div className="occasion-media">
        <EventVideo slug={occasion.slug} controls />
        <div className="media-fallback" />
      </div>
      <div className="occasion-veil" />
      <div className="occasion-heading">
        <p>{occasion.eyebrow}</p><h1>{occasion.title}</h1>
        <div><span>{occasion.line}</span><span>ПОД КЛЮЧ · 3–5 ДНЕЙ</span></div>
      </div>
      <Link href={`/demo/${occasion.slug}`} className="round-demo-link" aria-label={`Открыть демо ${occasion.short}`}><span>Живое<br/>демо</span><b>↘</b></Link>
    </section>
    <section className="occasion-intro">
      <p>ПОЧЕМУ ЭТО РАБОТАЕТ</p><h2>{occasion.description}</h2>
      <div className="feature-grid">{occasion.features.map(item=><article key={item}><h3>{item}</h3></article>)}</div>
    </section>
    <section className="preview-stage">
      <div className="preview-copy"><p>ЖИВОЙ ПРИМЕР</p><h2>Настоящее <br/>приглашение</h2><p>Откройте и пройдите путь гостя</p><Link href={`/demo/${occasion.slug}`} className="event-button">Смотреть демо <span>↗</span></Link></div>
      <div className="mini-phone"><div className="mini-phone-screen" style={{background:`linear-gradient(155deg, ${occasion.surface}, ${occasion.accent})`,color:occasion.text}}><small>{occasion.date}</small><h3>{occasion.names}</h3><p>{occasion.greeting}</p><span>ОТКРЫТЬ</span></div></div>
    </section>
    <section className="occasion-cta"><p>СЛЕДУЮЩАЯ ИСТОРИЯ — ВАША</p><h2>Создадим первое<br/>впечатление</h2><Link href={`/order?event=${occasion.slug}`}>Начать проект <span>↗</span></Link></section>
    <section className="other-directions"><p>ДРУГИЕ НАПРАВЛЕНИЯ</p><div>{occasionList.filter(x=>x.slug!==occasion.slug).map(x=><Link href={`/${x.slug}`} key={x.slug}>{x.short}<b>↗</b></Link>)}</div></section>
    <SiteFooter />
  </main>;
}
