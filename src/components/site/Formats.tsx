import { useState, type FormEvent } from 'react';
import { api } from '../../lib/api';

const FORMATS = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    tag: 'Формат 1',
    title: 'Разовое сопровождение',
    desc: 'Для партнёров, которым нужен надёжный арбитражный управляющий под конкретное дело.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    tag: 'Формат 2',
    title: 'Постоянное партнерство',
    desc: 'Для тех, кто регулярно передает дела и работает с АСПБ системно. Включает доступ к платформе и цифровому контролю дел.',
    featured: true,
    featuredLabel: 'Основной формат',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    tag: 'Формат 3',
    title: 'Дополнительные возможности',
    desc: 'Обучение для команды, усиление практики, развитие продаж и внутренних процессов.',
  },
];

export default function Formats() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  function closeModal() {
    if (modalState === 'sending') return;
    setModalOpen(false);
    setModalState('idle');
    setName('');
    setPhone('');
    setEmail('');
    setComment('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setModalState('sending');
    try {
      await api.submissions.create({
        name,
        phone,
        email,
        interest: 'Обсудить сотрудничество',
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
      <section className="formats-section reveal">
        <div className="container">
          <div className="formats-header">
            <span className="section-tag">Сотрудничество</span>
            <h2 className="formats-title">Форматы работы с партнёрами</h2>
            <p className="formats-subtitle">
              Подбираем модель взаимодействия под задачи, поток клиентов и уровень вашей практики.
            </p>
          </div>
          <div className="formats-grid">
            {FORMATS.map((f) => (
              <div
                key={f.title}
                className={`formats-card${f.featured ? ' formats-card--featured' : ''}`}
              >
                {f.featuredLabel ? (
                  <span className="formats-card-featured-label">{f.featuredLabel}</span>
                ) : null}
                <div className="formats-card-top">
                  <div className="service-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                  <span className="formats-card-tag">{f.tag}</span>
                </div>
                <h3 className="formats-card-title">{f.title}</h3>
                <p className="formats-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="formats-cta">
            <div className="formats-cta-copy">
              <h3 className="formats-cta-title">Не уверены, какой формат подойдет именно вам?</h3>
              <p className="formats-cta-subtitle">
                Оставьте заявку — подберем модель работы под вашу практику.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary formats-cta-button"
              onClick={() => setModalOpen(true)}
            >
              Обсудить сотрудничество
            </button>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div
          className="contact-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="contact-modal">
            {modalState === 'success' ? (
              <div className="form-success">
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
                <div>Заявка принята. Подберем формат работы и свяжемся с вами.</div>
                <button className="btn btn-glass" style={{ marginTop: '24px' }} onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <div className="contact-modal-header">
                  <h3 className="contact-modal-title">Обсудить сотрудничество</h3>
                  <button className="contact-modal-close" onClick={closeModal}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">ФИО</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Иванов Иван Иванович"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="example@mail.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Комментарий</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      placeholder="Кратко опишите вашу практику или задачу"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ resize: 'vertical' }}
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
