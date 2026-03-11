import type { Case } from '../../lib/api';

interface CasesProps {
  tag: string;
  title: string;
  items: Case[];
}

export default function Cases({ tag, title, items }: CasesProps) {
  return (
    <section className="cases-section reveal" id="cases">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{tag || 'Судебная практика'}</span>
          <h2 className="section-title">{title || 'Выигранные дела'}</h2>
        </div>
        <div className="cases-grid">
          {items.map((c) => (
            <div
              key={c.id}
              className={`case-card ${c.card_size}${c.accent ? ' accent' : ''}`}
            >
              <div className="case-meta">
                <span className="case-number">{c.case_number}</span>
                {c.status && <span className="case-status">{c.status}</span>}
              </div>
              <div>
                {c.card_size === 'large' && (
                  <span className="stat-label">Списана сумма</span>
                )}
                <div
                  className="case-amount"
                  style={c.card_size === 'small' ? { fontSize: '24px' } : undefined}
                >
                  {c.amount}
                </div>
                <p className="case-desc">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
