import type { NavItem } from '../../lib/api';

interface HeaderProps {
  logo: string;
  ctaText: string;
  ctaHref: string;
  items: NavItem[];
}

export default function Header({ logo, ctaText, ctaHref, items }: HeaderProps) {
  return (
    <header className="main-header">
      <div className="container">
        <div className="nav-container">
          <a href="/" className="logo">
            <span>{logo}</span>
            <span className="logo-dot" />
          </a>
          <nav className="primary-nav">
            {items.map((item) =>
              item.dropdown && item.dropdown.length > 0 ? (
                <div key={item.id} className="nav-item">
                  {item.title}
                  <div className="dropdown">
                    {item.dropdown.map((d, i) => (
                      <a key={i} href={d.href}>{d.title}</a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={item.id} href={item.href} className="nav-item">
                  {item.title}
                </a>
              )
            )}
          </nav>
          <a href={ctaHref || '#contact'} className="btn btn-glass">
            {ctaText || 'Связаться'}
          </a>
        </div>
      </div>
    </header>
  );
}
