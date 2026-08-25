/* eslint-disable @next/next/no-img-element */
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {CaseVideo} from "../CaseVideo";
import {MidnightAtlasCase} from "../MidnightAtlasCase";
import {SaffronTideCase} from "../SaffronTideCase";
import {PrivatePremiereCase} from "../PrivatePremiereCase";
import {PhotoInvitationCase} from "../PhotoInvitationCase";
import {getInvitationCase,invitationCases} from "../../lib/cases";
import {absoluteUrl} from "../../lib/site";

export function generateStaticParams(){return invitationCases.map(item=>({slug:item.slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const item=getInvitationCase((await params).slug); if(!item)return {};
  const image=absoluteUrl(item.image);
  const title=`${item.title} — ${item.couple} · ПРЕДВКУСИЕ`;
  return {title,description:item.description,alternates:{canonical:absoluteUrl(`/cases/${item.slug}`)},openGraph:{title,description:item.description,images:[image]},twitter:{card:"summary_large_image",title,description:item.description,images:[image]}};
}

export default async function InvitationCasePage({params}:{params:Promise<{slug:string}>}){
  const item=getInvitationCase((await params).slug); if(!item)notFound();
  if(item.slug==="wedding-midnight-atlas")return <MidnightAtlasCase item={item}/>;
  if(item.slug==="wedding-saffron-tide")return <SaffronTideCase item={item}/>;
  if(item.slug==="birthday-private-premiere")return <PrivatePremiereCase item={item}/>;
  if(!item.video)return <PhotoInvitationCase item={item}/>;
  return <main className="glass-case" style={{"--case-ivory":item.palette[0],"--case-sand":item.palette[1],"--case-sage":item.palette[2],"--case-ink":item.palette[3]} as React.CSSProperties}>
    <nav className="case-topbar"><Link href="/cases">Все кейсы</Link><span>ПРЕДВКУСИЕ · ПРИМЕР</span><Link href="/order?event=wedding">Создать своё ↗</Link></nav>
    <section className="glass-hero">
      <div className="glass-hero-media"><CaseVideo src={item.video} poster={item.image}/></div>
      <div className="glass-hero-shade"/>
      <div className="glass-hero-copy"><p>ПЕРСОНАЛЬНО ДЛЯ МАРИИ И ИЛЬИ</p><h1>{item.couple.split(" & ")[0]}<i>&amp;</i>{item.couple.split(" & ")[1]}</h1><div><span>{item.date}</span><span>{item.venue}</span></div></div>
      <span className="case-scroll">Листайте, чтобы войти в историю ↓</span>
    </section>
    <section className="glass-welcome"><p>ДОРОГИЕ МАРИЯ И ИЛЬЯ</p><h2>{item.greeting}</h2><div><span>{item.date}</span><i/><span>15:30</span></div></section>
    <section className="glass-story"><div className="glass-story-art"><img src={item.image} alt="Шёлк и яблоневые ветви в стеклянной оранжерее" loading="lazy"/></div><div><p>НАША ИСТОРИЯ</p><h2>Там, где дождь<br/>становится светом</h2><span>{item.story}</span></div></section>
    <section className="glass-program"><header><p>ПРОГРАММА</p><h2>Один длинный<br/>летний вечер</h2></header><div>{item.program.map(point=><article key={point.time}><time>{point.time}</time><div><h3>{point.title}</h3><p>{point.note}</p></div><span>○</span></article>)}</div></section>
    <section className="glass-place"><div><p>МЕСТО</p><h2>{item.venue}</h2><span>{item.address}<br/>{item.city}</span><a href={item.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a></div><div className="glass-place-image"><img src={item.image} alt="Светлая оранжерея" loading="lazy"/></div></section>
    <section className="glass-notes"><article><p>ДРЕСС-КОД</p><h2>Живые оттенки</h2><span>{item.dressCode}</span><div className="glass-palette">{item.palette.map(color=><i style={{background:color}} key={color}/>)}</div></article><article><p>ПОДАРКИ</p><h2>Главное — вы</h2><span>{item.giftNote}</span></article></section>
    <section className="glass-rsvp"><div><p>ОТВЕТ ГОСТЯ · ДЕМО</p><h2>Будете<br/>с нами?</h2><span>Ответ в этом примере никуда не отправляется<br/>{item.contact}</span></div><form><label>Ваше имя<input placeholder="Мария и Илья"/></label><fieldset><legend>Получится прийти?</legend><label><input type="radio" name="attendance" defaultChecked/>С радостью будем</label><label><input type="radio" name="attendance"/>Не сможем</label></fieldset><label>Пожелания<textarea placeholder="Напишите несколько слов"/></label><button type="button">Сохранить ответ ↗</button></form></section>
    <footer className="glass-finale"><p>ДО ВСТРЕЧИ В СТЕКЛЯННОМ САДУ</p><h2>{item.couple}</h2><span>{item.date}</span><Link href="/cases">Смотреть другие кейсы ←</Link></footer>
  </main>;
}
