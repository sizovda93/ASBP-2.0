import { useEffect, useState } from 'react';
import { api, type SiteSettings } from '../lib/api';
import TopBar from '../components/site/TopBar';
import Header from '../components/site/Header';
import SiteFooter from '../components/site/SiteFooter';

const COURSES = [
  { icon: '⚖️', title: 'Оспаривание сделок' },
  { icon: '📋', title: 'Неосвобождение от обязательств' },
  { icon: '📑', title: 'Юридические аспекты БФЛ' },
  { icon: '💼', title: 'Продажи юридических услуг' },
  { icon: '👥', title: 'Эффективная команда' },
  { icon: '🎓', title: 'Практика для действующих специалистов' },
];

export default function TrainingPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loaded, setLoaded] = useState(false);

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
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                      </svg>
                    </div>
                    <span className="hero-label-text">Обучение для партнёров</span>
                  </div>
                  <h1 className="hero-title text-gradient">
                    Обучение для партнёров<br />и их команды
                  </h1>
                  <p className="hero-subtitle">
                    Практические программы для юристов, адвокатов, финансовых управляющих, руководителей практик и сотрудников, работающих с банкротством и смежными задачами.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="training-section reveal" style={{ paddingTop: '0' }}>
          <div className="container">
            <div className="training-grid">
              {COURSES.map((course) => (
                <div key={course.title} className="training-card">
                  <div className="training-card-dot" />
                  <span className="training-card-title">{course.title}</span>
                </div>
              ))}
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
    </>
  );
}
