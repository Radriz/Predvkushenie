import Link from "next/link";
import { occasionList } from "./lib/occasions";
import { SiteFooter } from "./components/SiteHeader";
import { EventVideo } from "./components/EventVideo";

const occasions = ["Свадьба", "День рождения", "Детский праздник", "Деловое событие", "Юбилей", "Праздник для малыша"];

const plans = [
  { name: "START", price: "1 990", note: "Быстрый запуск на готовой основе", items: ["Готовый шаблон", "Дата и адрес", "Карта проезда", "Таймер до события", "Музыка из базовой коллекции", "Форма ответа гостей", "До 50 гостей"] },
  { name: "PREMIUM", price: "4 990", note: "Больше личных деталей и контроля", badge: "ПОПУЛЯРНЫЙ", items: ["Всё из START", "Персональные ссылки", "Фотогалерея", "Индивидуальные обращения", "Управление гостями", "Дресс-код", "Программа вечера", "Несколько локаций", "Напоминания гостям"] },
  { name: "WOW", price: "9 990", note: "Нейросеть и дизайнер делают всё за вас", items: ["Уникальный дизайн", "Авторская анимация", "Видео", "Обработка фотографий", "Индивидуальный домен", "Приоритетная поддержка"] },
];

const extras = [
  ["Своя музыка", "+490 ₽"], ["Нейроанимация фотографии", "+990 ₽"], ["Собственный домен", "+990 ₽"],
  ["Видео-приглашение", "+1 490 ₽"], ["QR-карточки для печати", "+990 ₽"], ["Telegram-бот для гостей", "+1 990 ₽"],
];

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
          <p className="eyebrow"><span /> студия цифровых приглашений</p>
          <h1>Событие начинается<br />до события</h1>
          <p className="hero-lead">Кинематографичные сайты-приглашения, которые задают настроение ещё до первой встречи</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/order">Обсудить событие <span>↗</span></Link>
            <Link className="text-button" href="/demo/wedding">Смотреть демо <span>▶</span></Link>
          </div>
          <div className="trust-row"><span>6 разных стилей</span><span>ответ гостя за 20 секунд</span><span>готовность за 3–5 дней</span></div>
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
          <div className="floating-note note-one">авторский сценарий</div>
          <div className="floating-note note-two">музыка и анимация</div>
        </div>
      </section>
      <section className="occasion-strip" id="occasions" aria-label="Типы событий">
        <p>ВЫБЕРИТЕ СВОЙ ПОВОД</p>
        <div className="occasion-list">{occasions.map(occasion => <span key={occasion}>{occasion}</span>)}</div>
      </section>
      <section className="manifesto">
        <p>НЕ ПРОСТО ССЫЛКА</p>
        <h2>Приглашение — это <em>первый кадр</em><br/>вашего события</h2>
        <div><p>Мы соединяем художественную концепцию, кино, звук и удобный сервис для гостей — получается личная цифровая история, которую хочется открыть ещё раз</p><span>КОНЦЕПЦИЯ<br/>ДИЗАЙН<br/>РЕЖИССУРА<br/>ЗАПУСК</span></div>
      </section>
      <section className="direction-showcase" id="directions">
        <header><p>ШЕСТЬ НАПРАВЛЕНИЙ</p><h2>У каждого повода<br/>свой визуальный голос</h2></header>
        <div className="direction-grid">{occasionList.map(item=><Link href={`/${item.slug}`} className={`direction-card card-${item.slug}`} key={item.slug} style={{"--card-accent":item.accent,"--card-surface":item.surface,"--card-text":item.text} as React.CSSProperties}><div className="direction-image"><EventVideo slug={item.slug}/></div><div><p>{item.eyebrow}</p><h3>{item.short}</h3><span>{item.line}</span><b>↗</b></div></Link>)}</div>
      </section>
      <section className="home-preview">
        <div className="home-preview-phone"><div><small>ПЕРСОНАЛЬНО ДЛЯ ВАС</small><h3>АЛЕКСЕЙ<br/><i>&amp;</i> СОФИЯ</h3><p>12 · 09 · 2026</p><button>Открыть приглашение</button></div></div>
        <div><p>ГОСТЕВОЙ ОПЫТ</p><h2>Красиво для гостя<br/>Спокойно для вас</h2><ul><li>Персональное обращение</li><li>Ответ за 20 секунд</li><li>Карта, таймер и программа</li><li>Музыка и напоминания</li></ul><Link href="/demo/wedding">Пройти путь гостя ↗</Link></div>
      </section>
      <section className="process" id="process"><header><p>КАК МЫ РАБОТАЕМ</p><h2>От разговора<br/>до первой отправки</h2></header><div>{[["Знакомимся","20 минут, чтобы услышать атмосферу события"],["Предлагаем сцену","Палитра, типографика, движение и тон текста"],["Собираем историю","Видео, программа, карта, музыка и форма ответа"],["Запускаем","Тестируем на телефонах и отдаём личную ссылку"]].map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="prices" id="prices">
        <header><p>ПРОЗРАЧНАЯ СТОИМОСТЬ</p><h2>Выберите свой<br/>формат приглашения</h2></header>
        <div className="price-grid">{plans.map((plan, index) => <article className={index === 1 ? "featured" : index === 2 ? "signature" : ""} key={plan.name}>
          {plan.badge && <i>{plan.badge}</i>}<p>{plan.name}</p><h3>{plan.price} <span>₽</span></h3><strong>{plan.note}</strong>
          <ul>{plan.items.map(item => <li key={item}>{item}</li>)}</ul><Link href={`/order?plan=${plan.name.toLowerCase()}`}>Выбрать <span>↗</span></Link>
        </article>)}</div>
        <div className="extras-header"><p>ДОПОЛНИТЕЛЬНО</p><h3>Соберите приглашение под себя</h3><span>Можно добавить к START и PREMIUM</span></div>
        <div className="extras-grid">{extras.map(([name, price]) => <article key={name}><span>{name}</span><b>{price}</b></article>)}</div>
      </section>
      <section className="testimonials"><p>СЛОВА ПОСЛЕ ПЕРВОГО КАДРА</p><blockquote>«Гости писали, что пересматривали приглашение как трейлер — а мы впервые почувствовали: свадьба уже началась»</blockquote><span>СОФИЯ И АЛЕКСЕЙ · ДЕМО-ИСТОРИЯ</span></section>
      <section className="faq"><header><p>КОРОТКО О ВАЖНОМ</p><h2>Вопросы,<br/>которые задают</h2></header><div>{[["Сколько занимает работа?","Базовый проект готов за 3–5 рабочих дней после получения всех материалов"],["Можно изменить дату после запуска?","Да, актуальные детали события мы обновляем без потери вашей ссылки"],["Музыка включается сама?","Нет, звук всегда запускает сам гость — это комфортно и корректно для браузеров"],["Где хранятся ответы гостей?","Ответы собираются в защищённом списке, который можно выгрузить"]].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="home-final"><p>ПЕРВЫЙ КАДР МОЖЕТ СЛУЧИТЬСЯ СЕЙЧАС</p><h2>Какое событие<br/>вы предвкушаете?</h2><Link href="/order">Рассказать нам <span>↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
