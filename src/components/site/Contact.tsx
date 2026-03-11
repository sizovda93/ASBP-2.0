import { useState, type FormEvent } from 'react';
import { api } from '../../lib/api';

const INTEREST_OPTIONS = [
  'Передача дела',
  'Партнёрство',
  'Обучение',
  'Платформа',
  'Нужна консультация',
];

interface ContactProps {
  tag: string;
  title: string;
  subtitle: string;
  phone: string;
  email: string;
  debtOptions: string[];
}

export default function Contact({ tag, title, subtitle, phone, email }: ContactProps) {
  const [interest, setInterest] = useState('');
  const [comment, setComment] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalEmail, setModalEmail] = useState('');

  function openModal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setModalOpen(true);
  }

  async function handleModalSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!modalName.trim() || !modalPhone.trim()) return;
    setModalState('sending');
    try {
      await api.submissions.create({
        name: modalName,
        phone: modalPhone,
        email: modalEmail,
        interest,
        comment,
      });
      setModalState('success');
    } catch {
      setModalState('idle');
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  }

  return (
    <>
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

            <form
              onSubmit={openModal}
              style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid var(--card-border)',
              }}
            >
              <div className="form-group">
                <label className="form-label">Что вас интересует?</label>
                <select
                  className="form-input"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  required
                >
                  <option value="" disabled>Выберите тему</option>
                  {INTEREST_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Комментарий</label>
                <textarea
                  className="form-input"
                  name="comment"
                  placeholder="Опишите вашу задачу или вопрос"
                  rows={3}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
              >
                Оставить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="contact-modal-overlay" onClick={e => { if (e.target === e.currentTarget && modalState !== 'sending') { setModalOpen(false); setModalState('idle'); } }}>
          <div className="contact-modal">
            {modalState === 'success' ? (
              <div className="form-success">
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
                <div>Заявка принята! Мы свяжемся с вами в ближайшее время.</div>
                <button className="btn btn-glass" style={{ marginTop: '24px' }} onClick={() => { setModalOpen(false); setModalState('idle'); }}>Закрыть</button>
              </div>
            ) : (
              <>
                <div className="contact-modal-header">
                  <h3 className="contact-modal-title">Оставить заявку</h3>
                  <button className="contact-modal-close" onClick={() => setModalOpen(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleModalSubmit}>
                  <div className="form-group">
                    <label className="form-label">ФИО</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Иванов Иван Иванович"
                      value={modalName}
                      onChange={e => setModalName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+7 (999) 000-00-00"
                      value={modalPhone}
                      onChange={e => setModalPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="example@mail.ru"
                      value={modalEmail}
                      onChange={e => setModalEmail(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '8px' }}
                    disabled={modalState === 'sending'}
                  >
                    {modalState === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

