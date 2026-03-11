import { type ReactNode } from 'react';

const SECTIONS = [
  { key: 'dashboard', label: 'Дашборд', group: 'Обзор', icon: 'grid' },
  { key: 'submissions', label: 'Заявки', group: 'Обзор', icon: 'mail', badge: true },
  { key: 'topbar', label: 'Верхняя строка', group: 'Контент', icon: 'lines' },
  { key: 'navigation', label: 'Навигация', group: 'Контент', icon: 'home' },
  { key: 'hero', label: 'Герой (баннер)', group: 'Контент', icon: 'star' },
  { key: 'stats', label: 'Статистика', group: 'Контент', icon: 'chart' },
  { key: 'services', label: 'Услуги', group: 'Контент', icon: 'shield' },
  { key: 'cases', label: 'Выигранные дела', group: 'Контент', icon: 'briefcase' },
  { key: 'contacts', label: 'Контакты', group: 'Контент', icon: 'phone' },
  { key: 'footer', label: 'Футер', group: 'Контент', icon: 'lines' },
  { key: 'gallery', label: 'Галерея', group: 'Медиа', icon: 'image' },
  { key: 'settings', label: 'Настройки', group: 'Система', icon: 'gear' },
];

interface AdminLayoutProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  newCount?: number;
  onLogout: () => void;
  children: ReactNode;
}

export default function AdminLayout({ currentSection, onNavigate, newCount, onLogout, children }: AdminLayoutProps) {
  let currentGroup = '';

  return (
    <div id="admin-screen" style={{ display: 'flex' }}>
      <aside className="sidebar">
        <div className="sidebar-logo">АСПБ <span className="logo-dot" /></div>

        {SECTIONS.map((s) => {
          const showGroup = s.group !== currentGroup;
          if (showGroup) currentGroup = s.group;
          return (
            <div key={s.key}>
              {showGroup && <div className="sidebar-label">{s.group}</div>}
              <div
                className={`sidebar-item${currentSection === s.key ? ' active' : ''}`}
                onClick={() => onNavigate(s.key)}
              >
                <SidebarIcon type={s.icon} />
                {s.label}
                {s.badge && newCount && newCount > 0 ? (
                  <span className="sidebar-badge" style={{ display: 'inline-block' }}>
                    {newCount}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}

        <div className="sidebar-footer">
          <span className="sidebar-user">Вы вошли как <strong>admin</strong></span>
          <button className="btn-logout" onClick={onLogout}>Выйти</button>
        </div>
      </aside>

      <div className="main-content">{children}</div>
    </div>
  );
}

function SidebarIcon({ type }: { type: string }) {
  const iconPaths: Record<string, string> = {
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    lines: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M1 12h2M21 12h2M12 1v2M12 21v2"/>',
  };

  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      dangerouslySetInnerHTML={{ __html: iconPaths[type] || iconPaths.grid }}
    />
  );
}
