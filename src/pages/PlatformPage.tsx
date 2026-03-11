import { useEffect, useState, type FormEvent } from 'react';
import { api, type SiteSettings } from '../lib/api';
import TopBar from '../components/site/TopBar';
import Header from '../components/site/Header';
import SiteFooter from '../components/site/SiteFooter';

const STEPS = [
  { num: '01', title: 'Вы передаёте клиента' },
  { num: '02', title: 'Дело попадает в систему сопровождения' },
  { num: '03', title: 'Документы, статусы и коммуникация ведутся внутри платформы' },
  { num: '04', title: 'Вы, должник и помощник взаимодействуют в едином рабочем пространстве' },
  { num: '05', title: 'Процесс становится прозрачным, управляемым и удобным для всех участников' },
];

const MOBILE_CARDS = [
  {
    title: 'Общение с телефона',
    desc: 'Вся важная переписка доступна в мобильном формате.',
  },
  {
    title: 'Быстрый отклик',
    desc: 'Проще оперативно отвечать и не терять темп работы по делу.',
  },
  {
    title: 'Доступ к информации в любой момент',
    desc: 'Ключевые сообщения и данные по делу всегда под рукой.',
  },
  {
    title: 'Удобство для всех участников',
    desc: 'Партнёру, должнику и помощнику проще взаимодействовать в привычном мобильном формате.',
  },
];

const COMM_CARDS = [
  {
    title: 'Чат с партнёром',
    desc: 'Партнёр может быстро получать информацию по делу, задавать вопросы и быть в курсе движения процедуры.',
  },
  {
    title: 'Чат с должником',
    desc: 'Клиенту проще передавать информацию, задавать вопросы и понимать, что происходит по его делу.',
  },
  {
    title: 'Чат с помощником арбитражного управляющего',
    desc: 'Операционные вопросы решаются быстрее, без потери информации в мессенджерах.',
  },
  {
    title: 'Коммуникация в контексте дела',
    desc: 'Все сообщения привязаны к конкретному делу, поэтому ничего не теряется и не путается.',
  },
];

const TASKS = [
  { title: 'Нет хаоса в чатах' },
  { title: 'Не теряются документы' },
  { title: 'Видны этапы по делу' },
  { title: 'Проще контролировать процессы' },
  { title: 'Удобнее работать с клиентом' },
  { title: 'Легче масштабировать практику' },
];

const PARTNER_GETS = [
  { title: 'Личный кабинет', desc: 'Вся информация по делам и клиентам собрана в одном месте.' },
  { title: 'Контроль этапов', desc: 'Понимание, на каком этапе находится каждое дело и что происходит сейчас.' },
  { title: 'Документы в системе', desc: 'Структурированное хранение важных данных без потерь в переписках.' },
  { title: 'Прозрачность работы', desc: 'Партнёру проще контролировать сопровождение и держать клиента в курсе.' },
  { title: 'Быстрый доступ к информации', desc: 'Ключевые данные по делам всегда под рукой.' },
  { title: 'Основа для масштабирования', desc: 'Система помогает сохранять качество работы при росте объёма дел.' },
];

export default function PlatformPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loaded, setLoaded] = useState(false);

  // Demo CTA modal state
  const [demoModal, setDemoModal] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoState, setDemoState] = useState<'idle' | 'sending' | 'success'>('idle');

  async function handleDemoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!demoName.trim() || !demoPhone.trim()) return;
    setDemoState('sending');
    try {
      await api.submissions.create({
        name: demoName,
        phone: demoPhone,
        email: demoEmail,
        interest: 'Демонстрация платформы',
      });
      setDemoState('success');
    } catch {
      setDemoState('idle');
      alert('Ошибка при отправке. Попробуйте ещё раз.');
    }
  }

  function closeDemoModal() {
    setDemoModal(false);
    setDemoState('idle');
    setDemoName('');
    setDemoPhone('');
    setDemoEmail('');
  }

  useEffect(() => {
    api.settings.getAll().then((s) => {
      setSettings(s);
      setLoaded(true);
    }).catch(err => {
      console.error('Failed to load settings:', err);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  const navItems = settings.nav_items ? JSON.parse(settings.nav_items) : [];

  if (!loaded) return null;

  return (
    <>
      <div className="ambient-light" />
      <TopBar
        text={settings.topbar_text}
        phone={settings.topbar_phone}
        viber={settings.topbar_viber}
        whatsapp={settings.topbar_whatsapp}
        telegram={settings.topbar_telegram}
      />
      <Header
        logo={settings.nav_logo}
        ctaText={settings.nav_cta_text}
        ctaHref={settings.nav_cta_href}
        items={navItems}
      />
      <main>
        {/* Hero Block */}
        <section className="hero-section reveal">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-widget">
              <div className="hero-inner">
                <div className="hero-content">
                  <div className="hero-label">
                    <div className="hero-icon-container" style={{ background: 'linear-gradient(135deg, #2eb87a, #1a7a4a)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    </div>
                    <span className="hero-label-text">Цифровая платформа</span>
                  </div>
                  <h1 className="hero-title text-gradient">
                    Платформа для ведения<br />дел партнёров
                  </h1>
                  <p className="hero-subtitle">
                    Все статусы, документы и взаимодействие по клиенту — в одной системе. Вы всегда понимаете, что происходит по каждому делу.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks Block */}
        <section className="ptasks-section reveal">
          <div className="container">
            <div className="ptasks-header">
              <h2 className="ptasks-title">Какие задачи решает платформа</h2>
            </div>
            <div className="ptasks-grid">
              {TASKS.map((item) => (
                <div key={item.title} className="ptasks-card">
                  <div className="ptasks-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="ptasks-card-title">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Gets Block */}
        <section className="pgets-section reveal">
          <div className="container">
            <div className="pgets-header">
              <h2 className="pgets-title">Что получает партнёр</h2>
            </div>
            <div className="pgets-grid">
              {PARTNER_GETS.map((item) => (
                <div key={item.title} className="pgets-card">
                  <h3 className="pgets-card-title">{item.title}</h3>
                  <p className="pgets-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication Block */}
        <section className="pcomm-section reveal">
          <div className="container">
            <div className="pcomm-header">
              <h2 className="pcomm-title">Вся коммуникация по делу —<br />внутри платформы</h2>
              <p className="pcomm-subtitle">
                Вместо разрозненных чатов и постоянных пересылок вся рабочая переписка ведётся
                в едином пространстве по конкретному делу.
              </p>
            </div>
            <div className="pcomm-grid">
              {COMM_CARDS.map((item) => (
                <div key={item.title} className="pcomm-card">
                  <div className="pcomm-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3 className="pcomm-card-title">{item.title}</h3>
                  <p className="pcomm-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile App Block */}
        <section className="pmobile-section reveal">
          <div className="container">
            <div className="pmobile-header">
              <h2 className="pmobile-title">Мобильное приложение для<br />удобной работы с коммуникацией</h2>
              <p className="pmobile-subtitle">
                Партнёр, клиент и участники процесса могут вести коммуникацию по делу
                прямо с телефона — без привязки к рабочему месту.
              </p>
            </div>
            <div className="pmobile-grid">
              {MOBILE_CARDS.map((item) => (
                <div key={item.title} className="pmobile-card">
                  <div className="pmobile-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <circle cx="12" cy="17" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="pmobile-card-title">{item.title}</h3>
                  <p className="pmobile-card-desc">{item.desc}</p>
                </div>
              ))}‌
            </div>
          </div>
        </section>

        {/* How it Works Steps Block */}
        <section className="psteps-section reveal">
          <div className="container">
            <div className="psteps-header">
              <h2 className="psteps-title">Как строится работа</h2>
            </div>
            <div className="psteps-list">
              {STEPS.map((step) => (
                <div key={step.num} className="pstep">
                  <span className="pstep-num">{step.num}</span>
                  <div className="pstep-line" />
                  <span className="pstep-title">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Block */}
        <section className="pscreens-section reveal">
          <div className="container">
            <div className="pscreens-header">
              <h2 className="pscreens-title">Интерфейс платформы</h2>
            </div>
            <div className="pscreens-grid">
              {[
                { key: 'platform_screenshot_1', label: 'Личный кабинет партнёра' },
                { key: 'platform_screenshot_2', label: 'Карточка дела' },
                { key: 'platform_screenshot_3', label: 'Экран внутреннего чата' },
                { key: 'platform_screenshot_4', label: 'Экран мобильного приложения' },
              ].map((item) => (
                <div key={item.key} className="pscreen-card">
                  {settings[item.key] ? (
                    <img src={settings[item.key]} alt={item.label} className="pscreen-img" />
                  ) : (
                    <div className="pscreen-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>Скриншот будет здесь</span>
                    </div>
                  )}
                  <div className="pscreen-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform CTA Block */}
        <section className="training-cta-section reveal">
          <div className="container">
            <div className="training-cta-inner">
              <div className="training-cta-text">
                <h2 className="training-cta-title">Подключение и внедрение платформы</h2>
                <p className="training-cta-subtitle">
                  Оставьте заявку, чтобы узнать, как платформа внедряется в работу партнёра.
                  Или перейдите на сайт платформы и войдите в рабочую систему.
                </p>
              </div>
              <div className="training-cta-buttons">
                <button className="btn btn-primary" onClick={() => setDemoModal(true)}>
                  Запросить демонстрацию
                </button>
                <a
                  href={settings.platform_site_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass"
                >
                  Сайт платформы
                </a>
                <a
                  href="https://sau.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Войти в платформу
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter
        logo={settings.nav_logo}
        description={settings.footer_description}
        copyright={settings.footer_copyright}
        phone={settings.contact_phone}
        email={settings.contact_email}
        viber={settings.footer_viber}
        whatsapp={settings.footer_whatsapp}
        telegram={settings.footer_telegram}
      />

      {/* Platform Demo Modal */}
      {demoModal && (
        <div
          className="contact-modal-overlay"
          onClick={e => { if (e.target === e.currentTarget && demoState !== 'sending') closeDemoModal(); }}
        >
          <div className="contact-modal">
            {demoState === 'success' ? (
              <div className="form-success">
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
                <div>Заявка принята! Мы свяжемся с вами и расскажем, как внедрить платформу в вашу работу.</div>
                <button className="btn btn-glass" style={{ marginTop: '24px' }} onClick={closeDemoModal}>Закрыть</button>
              </div>
            ) : (
              <>
                <div className="contact-modal-header">
                  <h3 className="contact-modal-title">Запросить демонстрацию платформы</h3>
                  <button className="contact-modal-close" onClick={closeDemoModal}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleDemoSubmit}>
                  <div className="form-group">
                    <label className="form-label">ФИО</label>
                    <input type="text" className="form-input" placeholder="Иванов Иван Иванович" value={demoName} onChange={e => setDemoName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Телефон</label>
                    <input type="tel" className="form-input" placeholder="+7 (999) 000-00-00" value={demoPhone} onChange={e => setDemoPhone(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="example@mail.ru" value={demoEmail} onChange={e => setDemoEmail(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} disabled={demoState === 'sending'}>
                    {demoState === 'sending' ? 'Отправка...' : 'Отправить заявку'}
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
