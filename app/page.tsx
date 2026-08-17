import Link from "next/link";
import { occasionList } from "./lib/occasions";
import { SiteFooter } from "./components/SiteHeader";
import { EventVideo } from "./components/EventVideo";

const occasions = ["Свадьба", "День рождения", "Детский праздник", "Бизнес", "Юбилей", "Baby"];

export default function Home() {
  return (
    <main className="home-shell">
      <nav className="topbar" aria-label="Главная навигация">
        <Link className="brand" href="/" aria-label="Предвкусие — на главную">ПРЕДВКУСИЕ<span>°</span></Link>
        <div className="nav-links"><a href="#occasions">Поводы</a><a href="#prices">Стоимость</a></div>
        <Link className="nav-cta" href="/order">Создать приглашение</Link>
      </nav>
      <section className="hero">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> digital atelier приглашений</p>
          <h1>Событие начинается<br />до события</h1>
          <p className="hero-lead">Кинематографичные сайты-приглашения, которые задают настроение ещё до первой встречи.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/order">Обсудить событие <span>↗</span></Link>
            <Link className="text-button" href="/demo/wedding">Смотреть демо <span>▶</span></Link>
          </div>
          <div className="trust-row"><span>6 уникальных режиссур</span><span>RSVP за 20 секунд</span><span>готовность от 5 дней</span></div>
        </div>
        <div className="hero-visual" aria-label="Пример приглашения на свадьбу">
          <div className="hero-film"><EventVideo slug="wedding" /></div>
          <div className="orbital orbital-one" /><div className="orbital orbital-two" />
          <div className="phone">
            <div className="phone-top"><span /></div>
            <div className="invitation-card">
              <p>ПРИГЛАШЕНИЕ НА СВАДЬБУ</p><h2>Алексей<br /><em>&amp;</em> София</h2>
              <div className="date-line"><span />12 · 09 · 2026<span /></div>
              <p className="invite-note">Будем счастливы разделить<br />этот день вместе с вами</p>
              <button type="button">ОТКРЫТЬ ПРИГЛАШЕНИЕ</button>
            </div>
          </div>
          <div className="floating-note note-one"><span>01</span> авторский сценарий</div>
          <div className="floating-note note-two"><span>02</span> музыка и motion</div>
        </div>
      </section>
      <section className="occasion-strip" id="occasions" aria-label="Типы событий">
        <p>ВЫБЕРИТЕ СВОЙ ПОВОД</p>
        <div className="occasion-list">{occasions.map((occasion, index) => <span key={occasion}>{String(index + 1).padStart(2, "0")} {occasion}</span>)}</div>
      </section>
      <section className="manifesto">
        <p>НЕ ПРОСТО ССЫЛКА</p>
        <h2>Приглашение — это <em>первый кадр</em><br/>вашего события.</h2>
        <div><p>Мы соединяем арт-дирекшн, кино, звук и удобный гостевой сервис. Получается личная цифровая история, которую хочется открыть ещё раз.</p><span>01 — КОНЦЕПЦИЯ<br/>02 — ДИЗАЙН<br/>03 — РЕЖИССУРА<br/>04 — ЗАПУСК</span></div>
      </section>
      <section className="direction-showcase" id="directions">
        <header><p>ШЕСТЬ НАПРАВЛЕНИЙ</p><h2>У каждого повода<br/>свой визуальный голос.</h2></header>
        <div className="direction-grid">{occasionList.map(item=><Link href={`/${item.slug}`} className={`direction-card card-${item.slug}`} key={item.slug} style={{"--card-accent":item.accent,"--card-surface":item.surface,"--card-text":item.text} as React.CSSProperties}><div className="direction-image"><EventVideo slug={item.slug}/><span>{item.number}</span></div><div><p>{item.eyebrow}</p><h3>{item.short}</h3><span>{item.line}</span><b>↗</b></div></Link>)}</div>
      </section>
      <section className="home-preview">
        <div className="home-preview-phone"><div><small>ПЕРСОНАЛЬНО ДЛЯ ВАС</small><h3>АЛЕКСЕЙ<br/><i>&amp;</i> СОФИЯ</h3><p>12 · 09 · 2026</p><button>Открыть приглашение</button></div></div>
        <div><p>ГОСТЕВОЙ ОПЫТ</p><h2>Красиво для гостя.<br/>Спокойно для вас.</h2><ul><li><span>01</span>Персональное обращение</li><li><span>02</span>RSVP за 20 секунд</li><li><span>03</span>Карта, таймер и программа</li><li><span>04</span>Музыка и напоминания</li></ul><Link href="/demo/wedding">Пройти путь гостя ↗</Link></div>
      </section>
      <section className="process" id="process"><header><p>КАК МЫ РАБОТАЕМ</p><h2>От разговора<br/>до первой отправки.</h2></header><div>{[["01","Знакомимся","20 минут, чтобы услышать атмосферу события."],["02","Предлагаем сцену","Палитра, типографика, движение и тон текста."],["03","Собираем историю","Видео, программа, карта, музыка и RSVP."],["04","Запускаем","Тестируем на телефонах и отдаём личную ссылку."]].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="prices" id="prices"><header><p>ПРОЗРАЧНАЯ СТОИМОСТЬ</p><h2>Выберите глубину<br/>впечатления.</h2></header><div className="price-grid"><article><p>ЭССЕНЦИЯ</p><h3>5 900 <span>₽</span></h3><ul><li>Готовая арт-режиссура</li><li>Карта, программа и таймер</li><li>Базовый RSVP</li><li>1 круг правок</li></ul><Link href="/order">Выбрать ↗</Link></article><article className="featured"><i>ВЫБОР КЛИЕНТОВ</i><p>КИНО</p><h3>9 900 <span>₽</span></h3><ul><li>Всё из «Эссенции»</li><li>Кинематографичное видео</li><li>Музыка и продвинутый RSVP</li><li>Персональные обращения</li></ul><Link href="/order">Выбрать ↗</Link></article><article><p>АВТОРСКИЙ</p><h3>17 900 <span>₽</span></h3><ul><li>Уникальная концепция</li><li>Новая визуальная сцена</li><li>Расширенная гостевая логика</li><li>2 круга правок</li></ul><Link href="/order">Обсудить ↗</Link></article></div><p className="business-price">Business / Agency — проекты от 29 900 ₽ · <Link href="/business">подробнее ↗</Link></p></section>
      <section className="testimonials"><p>СЛОВА ПОСЛЕ ПЕРВОГО КАДРА</p><blockquote>«Гости писали, что пересматривали приглашение как трейлер. А мы впервые почувствовали: свадьба уже началась».</blockquote><span>СОФИЯ И АЛЕКСЕЙ · ДЕМО-ИСТОРИЯ</span></section>
      <section className="faq"><header><p>КОРОТКО О ВАЖНОМ</p><h2>Вопросы,<br/>которые задают.</h2></header><div>{[["Сколько занимает работа?","Базовый проект — от пяти рабочих дней после получения всех материалов."],["Можно изменить дату после запуска?","Да. Актуальные детали события мы обновляем без потери вашей ссылки."],["Музыка включается сама?","Нет. Звук всегда запускает сам гость — это комфортно и корректно для браузеров."],["Где хранятся ответы гостей?","RSVP собирается в защищённом списке, который можно экспортировать." ]].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="home-final"><p>ПЕРВЫЙ КАДР МОЖЕТ СЛУЧИТЬСЯ СЕЙЧАС</p><h2>Какое событие<br/>вы предвкушаете?</h2><Link href="/order">Рассказать нам <span>↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
