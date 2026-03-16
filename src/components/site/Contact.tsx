import { useState, type FormEvent } from 'react';
import { api } from '../../lib/api';

const INTEREST_OPTIONS = [
  'Передача дел',
  'Партнёрство',
  'Обучение',
  'Платформа',
];

const PARTNERSHIP_FEATURES = [
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16"/><path d="M7 4v16"/><path d="M17 11c0 3-2 5-5 5s-5-2-5-5c0-2.5 1.7-4.5 5-7 3.3 2.5 5 4.5 5 7z"/></svg>`,
    text: 'Сопровождение дел под ключ',
  },
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>`,
    text: 'Платформа для контроля процедур',
  },
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12.5V17l6 3 6-3v-4.5"/></svg>`,
    text: 'Обучение для команды партнера',
  },
  {
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/><path d="M5 6v12"/></svg>`,
    text: 'Быстрый старт сотрудничества',
  },
];

interface ContactProps {
  tag: string;
  title: string;
  subtitle: string;
}

export default function Contact({ tag, title, subtitle }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [comment, setComment] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !interest.trim()) return;

    setFormState('sending');
    try {
      await api.submissions.create({
        name,
        phone,
        interest,
        comment,
      });
      setFormState('success');
      setName('');
      setPhone('');
      setInterest('');
      setComment('');
    } catch {
      setFormState('idle');
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  }

  return (
    <section className="contact-section reveal" id="contact">
      <div className="container">
        <div className="contact-widget">
          <div className="contact-copy">
            <span className="section-tag">{tag}</span>
            <h2 className="section-title contact-title">{title}</h2>
            <p className="contact-subtitle">{subtitle}</p>

            <div className="contact-feature-grid">
              {PARTNERSHIP_FEATURES.map((item) => (
                <div key={item.text} className="contact-feature">
                  <div
                    className="contact-feature-icon"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <span className="contact-feature-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-card">
            {formState === 'success' ? (
              <div className="contact-form-success">
                <div className="contact-form-success-icon">✓</div>
                <div className="contact-form-success-title">Заявка отправлена</div>
                <p className="contact-form-success-text">
                  Мы свяжемся с вами, уточним задачу и предложим подходящий формат сотрудничества.
                </p>
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => setFormState('idle')}
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-header">
                  <h3 className="contact-form-title">Обсудить задачу</h3>
                  <p className="contact-form-subtitle">
                    Ответим лично и предложим подходящий формат работы.
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Имя</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Как к вам обращаться"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Телефон / Telegram</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+7 (999) 000-00-00 или @username"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Что вас интересует?</label>
                  <div className="contact-choice-group" role="radiogroup" aria-label="Выберите тему">
                    {INTEREST_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`contact-choice-chip${interest === opt ? ' is-active' : ''}`}
                        onClick={() => setInterest(opt)}
                        aria-pressed={interest === opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Комментарий</label>
                  <textarea
                    className="form-input"
                    name="comment"
                    placeholder="Кратко опишите вашу задачу или вопрос"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-form-submit"
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? 'Отправка...' : 'Подобрать формат сотрудничества'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
