const ICONS: Record<string, string> = {
  shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  book: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  chart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  team: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  briefcase: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
};

const COURSES = [
  { category: 'Процедура', icon: 'shield', title: 'Оспаривание сделок', sub: 'Практика БФЛ', highlight: 'Популярное' },
  { category: 'Риски', icon: 'lock', title: 'Неосвобождение от обязательств', sub: 'Ключевые риски процедуры' },
  { category: 'Право', icon: 'book', title: 'Юридические аспекты БФЛ', sub: 'Системная база' },
  { category: 'Бизнес', icon: 'chart', title: 'Продажи юридических услуг', sub: 'Развитие практики', highlight: 'Рекомендуем' },
  { category: 'Управление', icon: 'team', title: 'Эффективная команда', sub: 'Управление и масштабирование' },
  { category: 'Практика', icon: 'briefcase', title: 'Практика для действующих специалистов', sub: 'Прикладной формат', highlight: 'Для практиков' },
];

export default function Training() {
  return (
    <section className="training-section reveal">
      <svg className="training-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="train-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(46,184,122,0.09)" strokeWidth="0.7"/>
          </pattern>
          <radialGradient id="train-glow" cx="50%" cy="85%" r="40%">
            <stop offset="0%" stopColor="rgba(46,184,122,0.14)"/>
            <stop offset="100%" stopColor="rgba(46,184,122,0)"/>
          </radialGradient>
        </defs>
        <rect width="1440" height="600" fill="url(#train-grid)"/>
        <rect width="1440" height="600" fill="url(#train-glow)"/>
        <line x1="200" y1="0" x2="200" y2="600" stroke="rgba(46,184,122,0.055)" strokeWidth="0.8"/>
        <line x1="480" y1="0" x2="480" y2="600" stroke="rgba(46,184,122,0.055)" strokeWidth="0.8"/>
        <line x1="960" y1="0" x2="960" y2="600" stroke="rgba(46,184,122,0.055)" strokeWidth="0.8"/>
        <line x1="1240" y1="0" x2="1240" y2="600" stroke="rgba(46,184,122,0.055)" strokeWidth="0.8"/>
      </svg>
      <div className="container">
        <div className="training-header">
          <span className="section-tag">Обучение</span>
          <h2 className="training-title">Обучение для партнёров и их команды</h2>
          <p className="training-subtitle">
            Практические программы для юристов, адвокатов, финансовых управляющих, руководителей практик и сотрудников, работающих с банкротством и смежными задачами.
          </p>
        </div>
        <div className="training-grid">
          {COURSES.map((course) => (
            <div key={course.title} className={`training-card${course.highlight ? ' training-card--highlight' : ''}`}>
              <span className="training-card-category">{course.category}</span>
              <div className="training-card-body">
                <div
                  className="training-card-icon"
                  dangerouslySetInnerHTML={{ __html: ICONS[course.icon] }}
                />
                <div className="training-card-text">
                  <span className="training-card-title">{course.title}</span>
                  <span className="training-card-sub">{course.sub}</span>
                  {course.highlight && <span className="training-card-highlight">{course.highlight}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="training-cta">
          <a href="/training" className="btn btn-glass training-btn">
            Подробнее об обучении
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="http://bankrot.academy/#courses" target="_blank" rel="noopener noreferrer" className="training-academy-link">
            Перейти в Академию
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
