import type { Stat } from '../../lib/api';

interface StatsProps {
  items: Stat[];
}

function renderStatIcon(stat: Stat) {
  if (stat.unit?.includes('₽')) {
    return <span className="stat-card-icon-text">₽</span>;
  }

  if (stat.unit?.includes('РФ')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5s5.5-4.9 5.5-9.3a5.5 5.5 0 1 0-11 0c0 4.4 5.5 9.3 5.5 9.3Z" />
        <circle cx="12" cy="11" r="1.9" />
      </svg>
    );
  }

  if (stat.unit?.includes('%')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5 5.5 6v5.4c0 4.4 2.8 7.1 6.5 9.1 3.7-2 6.5-4.7 6.5-9.1V6L12 3.5Z" />
        <path d="m9.5 12 1.7 1.7 3.4-3.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" />
      <path d="M3.5 9.5h17" opacity="0.7" />
    </svg>
  );
}

export default function Stats({ items }: StatsProps) {
  if (!items.length) return null;
  return (
    <section className="stats-section reveal">
      <div className="container">
        <div className="stats-header">
          <div className="badge" style={{ marginBottom: '16px' }}>Результаты</div>
          <h2 className="stats-title">Практика, подтверждённая цифрами</h2>
        </div>
        <div className="stats-grid">
          {items.map((s) => (
            <div key={s.id} className="stat-card">
              <div className="stat-card-icon" aria-hidden="true">
                {renderStatIcon(s)}
              </div>
              <span className="stat-label">{s.label}</span>
              <div className="stat-value">
                {s.value}
                <span className="stat-unit">{s.unit}</span>
              </div>
              {s.badge && (
                <div className="badge" style={{ marginTop: '16px' }}>
                  {s.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
