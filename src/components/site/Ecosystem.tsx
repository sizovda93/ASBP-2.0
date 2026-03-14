const ICONS = {
  scale: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 9l1.5 11h17L22 9z"/><path d="M12 2v20M2 9h20"/></svg>`,
  support: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  growth: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
};

const CARDS = [
  {
    icon: 'scale',
    label: 'Процессы',
    title: 'Контроль ваших процедур',
    badge: 'Физлица и юрлица',
    desc: 'Работаем по делам физических и юридических лиц, берём на себя процесс и поддерживаем партнёра на каждом этапе.',
  },
  {
    icon: 'support',
    label: 'Экспертиза',
    title: 'Поддержка сложных кейсов',
    badge: 'Нетиповые ситуации',
    desc: 'Помогаем разбирать нетиповые ситуации, риски и практические вопросы по сопровождению процедур.',
  },
  {
    icon: 'growth',
    label: 'Масштабирование',
    title: 'Рост партнёрской практики',
    badge: 'Обучение + цифровые инструменты',
    desc: 'Объединяем сопровождение дел, обучение и цифровые инструменты в одну систему масштабирования.',
  },
];

export default function Ecosystem() {
  return (
    <section className="ecosystem-section reveal">
      <svg className="ecosystem-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="eco-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(46,184,122,0.06)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="1440" height="600" fill="url(#eco-grid)"/>
        {/* arcs */}
        <ellipse cx="720" cy="780" rx="860" ry="480" fill="none" stroke="rgba(46,184,122,0.07)" strokeWidth="1"/>
        <ellipse cx="720" cy="780" rx="580" ry="320" fill="none" stroke="rgba(46,184,122,0.05)" strokeWidth="0.7"/>
        <ellipse cx="720" cy="780" rx="320" ry="180" fill="none" stroke="rgba(46,184,122,0.04)" strokeWidth="0.5"/>
        {/* connection lines */}
        <line x1="360" y1="0" x2="720" y2="600" stroke="rgba(46,184,122,0.06)" strokeWidth="0.7"/>
        <line x1="1080" y1="0" x2="720" y2="600" stroke="rgba(46,184,122,0.06)" strokeWidth="0.7"/>
        <line x1="720" y1="0" x2="240" y2="600" stroke="rgba(46,184,122,0.04)" strokeWidth="0.5"/>
        <line x1="720" y1="0" x2="1200" y2="600" stroke="rgba(46,184,122,0.04)" strokeWidth="0.5"/>
      </svg>
      <div className="container">
        <div className="ecosystem-header">
          <span className="section-tag">Экосистема</span>
          <h2 className="ecosystem-title">Экосистема для партнёров</h2>
          <p className="ecosystem-subtitle">
            АСПБ помогает не просто передавать дела в работу, а выстраивать устойчивую и управляемую практику банкротства.
          </p>
        </div>
        <div className="ecosystem-grid">
          {CARDS.map((card) => (
            <div key={card.title} className={`ecosystem-card${card.icon === 'growth' ? ' ecosystem-card--featured' : ''}`}>
              <div
                className="service-icon ecosystem-icon"
                dangerouslySetInnerHTML={{ __html: ICONS[card.icon as keyof typeof ICONS] }}
              />
              {card.label && <span className="ecosystem-card-label">{card.label}</span>}
              <h3 className="ecosystem-card-title">{card.title}</h3>
              <p className="ecosystem-card-desc">{card.desc}</p>
              {card.badge && <span className="ecosystem-card-badge">{card.badge}</span>}
              {card.icon === 'growth' && (
                <a href="/training" className="ecosystem-card-cta">
                  <span>Узнать подробнее</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              )}
            </div>
          ))}
        </div>
        <p className="ecosystem-footer">Все элементы работают как единая система развития партнера</p>
      </div>
    </section>
  );
}
