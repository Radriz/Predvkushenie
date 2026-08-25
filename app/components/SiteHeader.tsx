import Link from "next/link";

export function SiteHeader({ light = false }: { light?: boolean }) {
  return <header className={`site-header${light ? " site-header-light" : ""}`}>
    <Link className="brand" href="/">ПРЕДВКУСИЕ<span>°</span></Link>
    <nav aria-label="Основная навигация"><Link href="/cases">Кейсы</Link><Link href="/#directions">Направления</Link><Link href="/#prices">Тарифы</Link></nav>
    <Link className="header-order" href="/order">Обсудить событие <span>↗</span></Link>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div><Link className="brand" href="/">ПРЕДВКУСИЕ<span>°</span></Link><p>Событие начинается до события</p></div>
    <div><p>НАПРАВЛЕНИЯ</p><Link href="/wedding">Свадьба</Link><Link href="/birthday">День рождения</Link><Link href="/kids">Детский</Link></div>
    <div><p>ЕЩЁ</p><Link href="/business">Для бизнеса</Link><Link href="/anniversary">Юбилей</Link><Link href="/baby">Для малыша</Link></div>
    <div><p>ИНФОРМАЦИЯ</p><Link href="/cases">Кейсы</Link><Link href="/privacy">Политика</Link><Link href="/order">Оставить заявку</Link></div>
    <small>© 2026 ПРЕДВКУСИЕ · Студия цифровых приглашений</small>
  </footer>;
}
