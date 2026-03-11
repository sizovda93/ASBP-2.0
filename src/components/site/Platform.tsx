const FEATURES = [
  { title: 'Личный кабинет партнёра' },
  { title: 'Личный кабинет должника' },
  { title: 'Чат внутри платформы' },
  { title: 'Контроль этапов' },
  { title: 'Документы в системе' },
  { title: 'Прозрачность работы' },
  { title: 'Быстрый доступ к информации' },
  { title: 'Основа для масштабирования' },
];

export default function Platform() {
  return (
    <section className="platform-section reveal">
      <div className="container">
        <div className="platform-inner">
          <div className="platform-left">
            <span className="section-tag">Платформа</span>
            <h2 className="platform-title">Цифровая платформа для ведения дел</h2>
            <p className="platform-subtitle">
              Партнёр получает удобный инструмент для контроля статусов, документов и взаимодействия по каждому клиенту. Все ключевые процессы — в одном месте.
            </p>
            <a href="/platform" className="btn btn-glass platform-btn">Смотреть платформу</a>
          </div>
          <div className="platform-right">
            <div className="platform-grid">
              {FEATURES.map((f) => (
                <div key={f.title} className="platform-feature">
                  <div className="platform-feature-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="platform-feature-text">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
