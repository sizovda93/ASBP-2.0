import { Link } from 'react-router-dom';
import type { NavItem } from '../../lib/api';

interface HeaderProps {
  logo: string;
  ctaText: string;
  ctaHref: string;
  items: NavItem[];
}

export default function Header({ logo, ctaText, ctaHref, items }: HeaderProps) {
  const resolveItemHref = (item: NavItem): string => {
    if (item.href && item.href !== '#') return item.href;
    if (item.title.trim().toLowerCase() === 'о нас') return '/about';
    return item.href || '#';
  };

  const resolveDropdownItem = (parent: NavItem, child: { title: string; href: string }) => {
    const isAbout = parent.title.trim().toLowerCase() === 'о нас';
    const isClientStories = child.title.trim().toLowerCase() === 'истории клиентов';
    const isFaq = /вопросы\s*-\s*ответы|вопросы\s*ответы/i.test(child.title.trim().toLowerCase());
    if (isAbout && isClientStories) {
      return { title: 'История компании', href: '/about' };
    }
    if (isAbout && isFaq) {
      return { title: 'Вопросы - ответы', href: '/faq' };
    }
    return child;
  };

  const resolveDropdownItems = (parent: NavItem): { title: string; href: string }[] => {
    const source = parent.dropdown || [];
    const normalizedTitles = source.map((d) => d.title.trim().toLowerCase());
    const hasLegacyServicesSet =
      normalizedTitles.includes('для партнёров') ||
      normalizedTitles.includes('для партнеров') ||
      normalizedTitles.includes('физическим лицам') ||
      normalizedTitles.includes('юридическим лицам');
    const isServices = parent.title.trim().toLowerCase().includes('услуг');

    if (isServices || hasLegacyServicesSet) {
      return [
        { title: 'Цифровая платформа', href: '/platform' },
        { title: 'Обучение для партнеров', href: '/training' },
      ];
    }
    return source;
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="nav-container">
          <a href="/" className="logo">
            <span>{logo}</span>
            <span className="logo-dot" />
          </a>
          <nav className="primary-nav">
            {items.map((item) => {
              const itemHref = resolveItemHref(item);

              return item.dropdown && item.dropdown.length > 0 ? (
                <div key={item.id} className="nav-item">
                  {itemHref.startsWith('/') && !itemHref.startsWith('/#') ? (
                    <Link to={itemHref} className="nav-item-title">{item.title}</Link>
                  ) : (
                    <a href={itemHref} className="nav-item-title">{item.title}</a>
                  )}
                  <div className="dropdown">
                    {resolveDropdownItems(item).map((d, i) => {
                      const dropdownItem = resolveDropdownItem(item, d);
                      return dropdownItem.href && dropdownItem.href.startsWith('/') && !dropdownItem.href.startsWith('/#') ? (
                        <Link key={i} to={dropdownItem.href}>{dropdownItem.title}</Link>
                      ) : (
                        <a key={i} href={dropdownItem.href}>{dropdownItem.title}</a>
                      );
                    })}
                  </div>
                </div>
              ) : itemHref && itemHref.startsWith('/') && !itemHref.startsWith('/#') ? (
                <Link key={item.id} to={itemHref} className="nav-item">
                  {item.title}
                </Link>
              ) : (
                <a key={item.id} href={itemHref} className="nav-item">
                  {item.title}
                </a>
              );
            })}
          </nav>
          <a href={ctaHref || '#contact'} className="btn btn-glass">
            {ctaText || 'Связаться'}
          </a>
        </div>
      </div>
    </header>
  );
}
