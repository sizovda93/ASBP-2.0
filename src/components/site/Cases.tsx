import { useState, type FormEvent } from 'react';
import { api } from '../../lib/api';
import type { Case } from '../../lib/api';

interface CasesProps {
  tag: string;
  title: string;
  items: Case[];
}

const TABS = [
  { key: 'all', label: 'Все кейсы' },
  { key: 'individual', label: 'Физические лица' },
  { key: 'corporate', label: 'Юридические лица' },
  { key: 'complex', label: 'Сложные дела' },
];

const CATEGORY_LABELS: Record<string, string> = {
  individual: 'Физическое лицо',
  corporate: 'Юридическое лицо',
  complex: 'Сложное дело',
};

export default function Cases({ tag, title, items }: CasesProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  const filtered = items;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setFormState('sending');
    try {
      await api.submissions.create({ name, phone, email, interest: 'Обсудить кейс', comment: '' });
      setFormState('success');
    } catch {
      setFormState('idle');
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  }

  return (
    <section className="cases-section reveal" id="cases">
      <div className="container">
        <div className="section-header cases-section-header">
          <span className="section-tag">{tag || 'Судебная практика'}</span>
          <h2 className="section-title cases-section-title">{title || 'Выигранные дела'}</h2>
          <p className="cases-section-subtitle">Практика, подтверждённая результатом</p>
        </div>

        <div className="cases-curated-label">
          <span className="cases-curated-line" />
          Избранные кейсы из практики АСПБ
          <span className="cases-curated-line" />
        </div>

        <div className="cases-grid">
          {filtered.map((c) => (
            <div
              key={c.id}
              className={`case-card ${c.card_size}${c.accent ? ' accent' : ''}`}
            >
              {/* Row 1: result badge */}
              <div className="case-meta">
                <span className="case-result-badge">{c.status || 'Завершено успешно'}</span>
              </div>

              {/* Row 2: type label */}
              {c.category && CATEGORY_LABELS[c.category] && (
                <span className="case-type-label">{CATEGORY_LABELS[c.category]}</span>
              )}

              {/* Row 3: amount */}
              <div className="case-amount">{c.amount}</div>

              {/* Row 4: description */}
              <p className="case-desc">{c.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cases-cta">
          <div className="cases-cta__left">
            <h3 className="cases-cta__title">Обсудите ваш кейс с нами</h3>
            <p className="cases-cta__sub">Оставьте заявку — мы свяжемся и разберём вашу ситуацию бесплатно.</p>
          </div>
          <div className="cases-cta__right">
            {formState === 'success' ? (
              <div className="cases-cta__success">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2eb87a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Заявка отправлена. Мы свяжемся с вами!</span>
              </div>
            ) : (
              <form className="cases-cta__form" onSubmit={handleSubmit}>
                <input
                  className="cases-cta__input"
                  placeholder="Ваше имя *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  className="cases-cta__input"
                  placeholder="Телефон *"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
                <input
                  className="cases-cta__input"
                  placeholder="Email (необязательно)"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary cases-cta__btn" disabled={formState === 'sending'}>
                  {formState === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
