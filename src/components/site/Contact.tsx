import { useState, type FormEvent } from 'react';
import { api } from '../../lib/api';

interface ContactProps {
  tag: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  debtOptions: string[];
}

export default function Contact({ tag, title, subtitle, phone, email, debtOptions }: ContactProps) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const phoneVal = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const debt = (form.elements.namedItem('debt') as HTMLSelectElement).value;

    if (!name || !phoneVal) return;
    setFormState('sending');

    try {
      await api.submissions.create({ name, phone: phoneVal, debt });
      setFormState('success');
    } catch {
      setFormState('idle');
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  }

  return (
    <section className="contact-section reveal" id="contact">
      <div className="container">
        <div className="contact-widget">
          <div>
            <span className="section-tag">{tag}</span>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>{title}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
              {subtitle}
            </p>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <span className="stat-label">Горячая линия</span>
                <div style={{ fontSize: '20px', fontWeight: 500 }}>{phone}</div>
              </div>
              <div>
                <span className="stat-label">Email</span>
                <div style={{ fontSize: '20px', fontWeight: 500 }}>{email}</div>
              </div>
            </div>
          </div>

          {formState === 'success' ? (
            <div className="form-success">
              ✓ Заявка принята! Мы свяжемся с вами в ближайшее время.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid var(--card-border)',
              }}
            >
              <div className="form-group">
                <label className="form-label">Ваше имя</label>
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  placeholder="Иванов Иван"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Телефон</label>
                <input
                  type="tel"
                  className="form-input"
                  name="phone"
                  placeholder="+7 (999) 000-00-00"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Сумма долга</label>
                <select className="form-input" name="debt">
                  {debtOptions.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
                disabled={formState === 'sending'}
              >
                {formState === 'sending' ? 'Отправка...' : 'Оставить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
