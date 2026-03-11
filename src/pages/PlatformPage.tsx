import { useEffect, useState } from 'react';
import { api, type SiteSettings } from '../lib/api';
import TopBar from '../components/site/TopBar';
import Header from '../components/site/Header';
import SiteFooter from '../components/site/SiteFooter';

export default function PlatformPage() {
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
                    Все статусы, документы и взаимодействие по клиенту — в одной системе. Партнёр всегда понимает, что происходит по каждому делу.
                  </p>
                </div>
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
    </>
  );
}
