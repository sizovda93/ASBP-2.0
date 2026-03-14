const ICONS = {
  briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  graduation: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  monitor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
};

const CARDS = [
  {
    icon: 'briefcase',
    badge: 'Процедуры под контролем',
    title: 'Ведение дел',
    desc: 'Берем на себя сопровождение процедур банкротства по вашим клиентам — профессионально, прозрачно и с понятной моделью взаимодействия.',
  },
  {
    icon: 'graduation',
    badge: 'Практика без лишней теории',
    title: 'Обучение команды',
    desc: 'Даем практические программы для юристов, руководителей и сотрудников, чтобы вы могли развивать направление банкротства системно.',
  },
  {
    icon: 'monitor',
    badge: 'Статусы и документы в системе',
    title: 'Цифровой контроль',
    desc: 'Помогаем держать под контролем статусы дел, документы и взаимодействие с клиентами в единой рабочей системе.',
  },
];

export default function PartnerValue() {
  return (
    <section className="partner-value-section reveal">
      <svg className="section-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="pv-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(46,184,122,0.055)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="pv-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(46,184,122,0.09)"/>
            <stop offset="100%" stopColor="rgba(46,184,122,0)"/>
          </radialGradient>
        </defs>
        <rect width="1440" height="600" fill="url(#pv-grid)"/>
        <rect width="1440" height="600" fill="url(#pv-glow)"/>
        {/* arcs */}
        <ellipse cx="720" cy="600" rx="800" ry="380" fill="none" stroke="rgba(46,184,122,0.065)" strokeWidth="0.8"/>
        <ellipse cx="720" cy="600" rx="520" ry="240" fill="none" stroke="rgba(46,184,122,0.045)" strokeWidth="0.6"/>
        {/* network lines */}
        <line x1="240" y1="0" x2="720" y2="600" stroke="rgba(46,184,122,0.05)" strokeWidth="0.6"/>
        <line x1="1200" y1="0" x2="720" y2="600" stroke="rgba(46,184,122,0.05)" strokeWidth="0.6"/>
        <line x1="0" y1="300" x2="1440" y2="300" stroke="rgba(46,184,122,0.04)" strokeWidth="0.5"/>
        <line x1="480" y1="0" x2="960" y2="600" stroke="rgba(46,184,122,0.03)" strokeWidth="0.5"/>
        <line x1="960" y1="0" x2="480" y2="600" stroke="rgba(46,184,122,0.03)" strokeWidth="0.5"/>
      </svg>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Для партнёров</span>
          <h2 className="section-title">Что получает партнёр с АСПБ</h2>
          <p className="partner-value-subtitle">
            Мы закрываем ключевые задачи партнёрской практики в банкротстве: берём процедуры в сопровождение, усиливаем команду через обучение и даём цифровые инструменты для контроля работы.
          </p>
        </div>
        <div className="partner-value-grid">
          {CARDS.map((card) => (
            <div key={card.title} className={`partner-value-card${card.icon === 'monitor' ? ' partner-value-card--featured' : ''}`}>
              <div
                className="service-icon"
                dangerouslySetInnerHTML={{ __html: ICONS[card.icon as keyof typeof ICONS] }}
              />
              <h3 className="partner-value-card-title">{card.title}</h3>
              <p className="partner-value-card-desc">{card.desc}</p>
              {card.badge && <span className="partner-value-badge">{card.badge}</span>}
            </div>
          ))}
        </div>
        <p className="partner-value-footer">Все три направления работают как единая партнерская система</p>
      </div>
    </section>
  );
}
