import type { Stat } from '../../lib/api';

interface StatsProps {
  items: Stat[];
}

export default function Stats({ items }: StatsProps) {
  if (!items.length) return null;
  return (
    <section className="stats-section reveal">
      <div className="container">
        <div className="stats-grid">
          {items.map((s) => (
            <div key={s.id} className="stat-card">
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
