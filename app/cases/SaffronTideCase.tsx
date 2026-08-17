/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type {InvitationCase} from "../lib/cases";
import {CaseVideo} from "./CaseVideo";

export function SaffronTideCase({item}:{item:InvitationCase}){
  return <main className="tide-case" style={{"--tide-shell":item.palette[0],"--tide-saffron":item.palette[1],"--tide-sea":item.palette[2],"--tide-clay":item.palette[3]} as React.CSSProperties}>
    <nav className="tide-nav"><Link href="/cases">Все истории</Link><span>ПРЕДВКУСИЕ · У МОРЯ</span><Link href="/order?event=wedding">Создать своё ↗</Link></nav>
    <section className="tide-hero">
      <div className="tide-hero-media"><CaseVideo src={item.video} poster={item.image}/></div>
      <div className="tide-hero-wash"/>
      <div className="tide-hero-copy"><p>ПЕРСОНАЛЬНО ДЛЯ СЕРЁЖИ И ДАШИ</p><h1><span>Алиса</span><i>&amp;</i><span>Матвей</span></h1><div><time>05 · 09 · 27</time><b>СОЧИ · 16:00</b></div></div>
      <p className="tide-scroll">Поймайте наш ритм ↓</p>
    </section>
    <section className="tide-letter"><div className="tide-stamp"><span>ЧЁРНОЕ<br/>МОРЕ</span><strong>05</strong><small>СЕНТЯБРЯ</small></div><div><p>ПИСЬМО С ПОБЕРЕЖЬЯ</p><h2>{item.greeting}</h2><span>{item.story}</span></div></section>
    <section className="tide-picture"><img src={item.image} alt="Каменная терраса с шафрановым шёлком у моря" loading="lazy"/><div><p>МЕСТО, КУДА<br/>ХОЧЕТСЯ ВЕРНУТЬСЯ</p><span>43°34′ N · 39°44′ E</span></div></section>
    <section className="tide-program"><header><p>РИТМ ДНЯ</p><h2>От первого<br/>ветра до огней</h2></header><div>{item.program.map((point,index)=><article key={point.time}><span>{String(index+1).padStart(2,"0")}</span><time>{point.time}</time><h3>{point.title}</h3><p>{point.note}</p></article>)}</div></section>
    <section className="tide-place"><div className="tide-sun"><i/><span>ЗАКАТ · 19:11</span></div><div><p>НА БЕРЕГУ</p><h2>{item.venue}</h2><span>{item.address}<br/>{item.city}</span><a href={item.mapUrl} target="_blank" rel="noreferrer">Открыть маршрут ↗</a><small>Трансфер отправится от Морского вокзала в 15:20</small></div></section>
    <section className="tide-notes"><article><p>ЧТО НАДЕТЬ</p><h2>Цвета<br/>южного дня</h2><span>{item.dressCode}</span><div>{item.palette.map(color=><i style={{background:color}} key={color}/>)}</div></article><article><p>БЕЗ БУКЕТОВ</p><h2>Вино<br/>с историей</h2><span>{item.giftNote}</span></article></section>
    <section className="tide-rsvp"><header><p>ОТВЕТ ГОСТЯ · ДЕМО</p><h2>Оставить место<br/>за длинным столом?</h2><span>Ответ никуда не отправляется<br/>{item.contact}</span></header><form><label>Ваши имена<input placeholder="Серёжа и Даша"/></label><fieldset><legend>Будете с нами?</legend><label><input type="radio" name="tide-attendance" defaultChecked/>Да, ждите у моря</label><label><input type="radio" name="tide-attendance"/>Не получится приехать</label></fieldset><label>Нужен трансфер?<select defaultValue="yes"><option value="yes">Да, от Морского вокзала</option><option value="no">Доберёмся самостоятельно</option></select></label><label>Меню и пожелания<textarea placeholder="Аллергии, ограничения или несколько тёплых слов"/></label><button type="button">Оставить ответ <span>↗</span></button></form></section>
    <footer className="tide-finale"><p>УВИДИМСЯ У ВОДЫ</p><h2>А + М</h2><div><span>{item.date}</span><Link href="/cases">Вернуться к кейсам ↗</Link></div></footer>
  </main>;
}
