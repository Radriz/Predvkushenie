/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type {InvitationCase} from "../lib/cases";
import {CaseVideo} from "./CaseVideo";

export function MidnightAtlasCase({item}:{item:InvitationCase}){
  return <main className="atlas-case" style={{"--atlas-night":item.palette[0],"--atlas-blue":item.palette[1],"--atlas-silver":item.palette[2],"--atlas-red":item.palette[3]} as React.CSSProperties}>
    <nav className="atlas-nav"><Link href="/cases">Коллекция</Link><span>ПРЕДВКУСИЕ · НОЧНОЙ МАРШРУТ</span><Link href="/order?event=wedding">Создать своё ↗</Link></nav>
    <section className="atlas-hero">
      <div className="atlas-hero-media"><CaseVideo src={item.video} poster={item.image}/></div>
      <div className="atlas-grid"/>
      <div className="atlas-hero-copy"><p>ПЕРСОНАЛЬНО ДЛЯ КАТИ И АНДРЕЯ</p><h1><span>ВЕРА</span><i>×</i><span>НИКИТА</span></h1><div><time>{item.date}</time><b>18:40 · МОСКВА</b></div></div>
      <aside><span>55°49′41″ N</span><span>37°38′46″ E</span></aside>
      <p className="atlas-scroll">Следуйте за линией ↓</p>
    </section>
    <section className="atlas-intro"><header><p>ТОЧКА СТАРТА</p><span>ДЛЯ КАТИ И АНДРЕЯ</span></header><h2>{item.greeting}</h2><div><p>{item.story}</p><strong>17<br/><span>ОКТ</span></strong></div></section>
    <section className="atlas-signal"><img src={item.image} alt="Ночная архитектура и красная линия света" loading="lazy"/><div><p>СИГНАЛ ПОЛУЧЕН</p><h2>Встретимся<br/>между городом<br/>и небом</h2><span>Двигайтесь вдоль красной линии</span></div></section>
    <section className="atlas-program"><header><p>КООРДИНАТЫ ВЕЧЕРА</p><h2>Четыре точки<br/>одного маршрута</h2></header><div>{item.program.map(point=><article key={point.time}><time>{point.time}</time><span>→</span><h3>{point.title}</h3><p>{point.note}</p></article>)}</div></section>
    <section className="atlas-location"><div className="atlas-location-copy"><p>ФИНАЛЬНАЯ ТОЧКА</p><h2>{item.venue}</h2><span>{item.address}<br/>{item.city}</span><a href={item.mapUrl} target="_blank" rel="noreferrer">Построить маршрут ↗</a></div><div className="atlas-map"><span>55°49′41″</span><i/><b>37°38′46″</b><small>МОСКВА · ВДНХ</small></div></section>
    <section className="atlas-details"><article><p>КОД ОДЕЖДЫ</p><h2>Ночь<br/>и металл</h2><span>{item.dressCode}</span><div>{item.palette.map(color=><i style={{background:color}} key={color}/>)}</div></article><article><p>ВМЕСТО СПИСКА</p><h2>Книга<br/>в новый дом</h2><span>{item.giftNote}</span></article></section>
    <section className="atlas-rsvp"><div><p>ПОДТВЕРЖДЕНИЕ · ДЕМО</p><h2>Вы в<br/>маршруте?</h2><span>Ответ в этом примере никуда не отправляется<br/>{item.contact}</span></div><form><label>Имена гостей<input placeholder="Катя и Андрей"/></label><fieldset><legend>Ваш сигнал</legend><label><input type="radio" name="atlas-attendance" defaultChecked/>Будем на старте</label><label><input type="radio" name="atlas-attendance"/>Не сможем</label></fieldset><label>Пищевая непереносимость<textarea placeholder="Если важно учесть"/></label><button type="button">Подтвердить маршрут <span>→</span></button></form></section>
    <footer className="atlas-finale"><p>МАРШРУТ ПОСТРОЕН</p><h2>17 · 10 · 27</h2><div><span>{item.couple}</span><Link href="/cases">Другие истории ↗</Link></div></footer>
  </main>;
}
