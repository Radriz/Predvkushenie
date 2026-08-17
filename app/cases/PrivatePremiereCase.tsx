/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type {InvitationCase} from "../lib/cases";
import {CaseVideo} from "./CaseVideo";

export function PrivatePremiereCase({item}:{item:InvitationCase}){
  return <main className="premiere-case" style={{"--premiere-night":item.palette[0],"--premiere-blue":item.palette[1],"--premiere-pink":item.palette[2],"--premiere-silver":item.palette[3]} as React.CSSProperties}>
    <nav className="premiere-nav"><Link href="/cases">Все кейсы</Link><span>ПРЕДВКУСИЕ · ЛИЧНАЯ ПРЕМЬЕРА</span><Link href="/order?event=birthday">Создать своё ↗</Link></nav>
    <section className="premiere-hero">
      <div className="premiere-hero-media"><CaseVideo src={item.video} poster={item.image}/></div><div className="premiere-hero-shade"/><div className="premiere-perforation left"/><div className="premiere-perforation right"/>
      <div className="premiere-hero-copy"><p>ПЕРСОНАЛЬНЫЙ БИЛЕТ ДЛЯ МИШИ И ЛЕРЫ</p><div><strong>34</strong><h1>ИННА</h1></div><footer><time>23 · 01 · 27</time><span>НАЧАЛО · 19:30</span><b>МОСКВА</b></footer></div>
      <p className="premiere-scroll">Смотреть дальше ↓</p>
    </section>
    <section className="premiere-opening"><header><span>СЦЕНА ПЕРВАЯ</span><b>ХРОНОМЕТРАЖ · ОДИН ВЕЧЕР</b></header><h2>Один вечер<br/><em>без второго дубля</em></h2><div><p>{item.greeting}</p><span>{item.story}</span></div></section>
    <section className="premiere-frame"><img src={item.image} alt="Пустой кинозал с синим лучом проектора и сценой цвета фуксии" loading="lazy"/><div><span>ЛИЧНЫЙ АРХИВ · КАДР 34</span><h2>Свет<br/>включится<br/>для своих</h2></div></section>
    <section className="premiere-program"><header><p>СЦЕНАРИЙ ВЕЧЕРА</p><h2>Четыре сцены<br/>и свободный финал</h2></header><div>{item.program.map((point,index)=><article key={point.time}><span>СЦЕНА {index+1}</span><time>{point.time}</time><h3>{point.title}</h3><p>{point.note}</p><b>→</b></article>)}</div></section>
    <section className="premiere-place"><div><p>МЕСТО СЪЁМКИ</p><h2>{item.venue}</h2><span>{item.address}<br/>{item.city}</span><a href={item.mapUrl} target="_blank" rel="noreferrer">Открыть маршрут ↗</a></div><aside><span>РЯД</span><strong>07</strong><span>МЕСТО</span><strong>34</strong><small>Вход со стороны набережной<br/>Сбор гостей с 19:30</small></aside></section>
    <section className="premiere-details"><article><p>ДРЕСС-КОД</p><h2>Бархат<br/>и вспышки</h2><span>{item.dressCode}</span><div>{item.palette.map(color=><i style={{background:color}} key={color}/>)}</div></article><article><p>ВМЕСТО ПОДАРКА</p><h2>Ваш голос<br/>в титрах</h2><span>{item.giftNote}</span><button type="button" aria-label="Демонстрация записи голосового сообщения">Записать воспоминание · демо</button></article></section>
    <section className="premiere-rsvp"><div><p>БИЛЕТ ГОСТЯ · ДЕМО</p><h2>Ваше место<br/>оставить?</h2><span>Ответ в примере никуда не отправляется<br/>{item.contact}</span></div><form><label>Имена гостей<input placeholder="Миша и Лера"/></label><fieldset><legend>Будете на премьере?</legend><label><input type="radio" name="premiere-attendance" defaultChecked/>Да, ждите в первом ряду</label><label><input type="radio" name="premiere-attendance"/>Не сможем прийти</label></fieldset><label>Где удобнее сидеть?<select defaultValue="parterre"><option value="parterre">Партер</option><option value="balcony">Балкон</option></select></label><label>Песня для вечеринки<textarea placeholder="Исполнитель и название"/></label><button type="button">Подтвердить билет <span>→</span></button></form></section>
    <footer className="premiere-finale"><div><p>ГЛАВНАЯ РОЛЬ</p><h2>ИННА</h2></div><div><p>В РОЛЯХ</p><span>МИША · ЛЕРА · СОФИЯ · МАРК · ВЫ</span></div><div><p>ДАТА ПРЕМЬЕРЫ</p><span>{item.date} · МОСКВА</span></div><Link href="/cases">Смотреть другие истории ↗</Link></footer>
  </main>;
}
