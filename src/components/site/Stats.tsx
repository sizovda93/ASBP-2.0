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
      <svg className="section-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="stats-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(46,184,122,0.06)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="stats-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(46,184,122,0.1)"/>
            <stop offset="100%" stopColor="rgba(46,184,122,0)"/>
          </radialGradient>
        </defs>
        <rect width="1440" height="500" fill="url(#stats-grid)"/>
        <rect width="1440" height="500" fill="url(#stats-glow)"/>
        {/* arcs */}
        <ellipse cx="720" cy="-40" rx="700" ry="320" fill="none" stroke="rgba(46,184,122,0.06)" strokeWidth="0.8"/>
        <ellipse cx="720" cy="-40" rx="460" ry="200" fill="none" stroke="rgba(46,184,122,0.045)" strokeWidth="0.6"/>
        {/* connection lines */}
        <line x1="0" y1="250" x2="720" y2="0" stroke="rgba(46,184,122,0.05)" strokeWidth="0.6"/>
        <line x1="1440" y1="250" x2="720" y2="0" stroke="rgba(46,184,122,0.05)" strokeWidth="0.6"/>
        <line x1="360" y1="500" x2="720" y2="0" stroke="rgba(46,184,122,0.035)" strokeWidth="0.5"/>
        <line x1="1080" y1="500" x2="720" y2="0" stroke="rgba(46,184,122,0.035)" strokeWidth="0.5"/>
      </svg>
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
