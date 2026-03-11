import { useEffect, useState, useCallback } from 'react';
import { api, type SiteSettings, type Stat, type Case } from '../lib/api';
import TopBar from '../components/site/TopBar';
import Header from '../components/site/Header';
import Hero from '../components/site/Hero';
import Stats from '../components/site/Stats';
import PartnerValue from '../components/site/PartnerValue';
import Ecosystem from '../components/site/Ecosystem';
import Training from '../components/site/Training';
import Platform from '../components/site/Platform';
import Cases from '../components/site/Cases';
import Formats from '../components/site/Formats';
import Contact from '../components/site/Contact';
import SiteFooter from '../components/site/SiteFooter';
import LegalModals from '../components/site/LegalModals';

export default function Index() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [stats, setStats] = useState<Stat[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      api.settings.getAll(),
      api.stats.list(),
      api.cases.list(),
    ]).then(([s, st, cs]) => {
      setSettings(s);
      setStats(st);
      setCases(cs);
      setLoaded(true);
    }).catch(err => console.error('Failed to load content:', err));
  }, []);

  // Scroll reveal
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
  const debtOptions = settings.contact_debt_options ? JSON.parse(settings.contact_debt_options) : [];

  const [legalType, setLegalType] = useState<string | null>(null);
  const openLegal = useCallback((type: string) => setLegalType(type), []);
  const closeLegal = useCallback(() => setLegalType(null), []);

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
        <Hero
          label={settings.hero_label}
          title={settings.hero_title}
          subtitle={settings.hero_subtitle}
          btnPrimary={settings.hero_btn_primary}
          btnPrimaryHref={settings.hero_btn_primary_href}
          btnSecondary={settings.hero_btn_secondary}
          btnSecondaryHref={settings.hero_btn_secondary_href}
          backgroundImage={settings.hero_background_image}
        />
        <Stats items={stats} />
        <PartnerValue />
        <Ecosystem />
        <Training />
        <Platform />
        <Cases
          tag={settings.cases_tag}
          title={settings.cases_title}
          items={cases}
        />
        <Formats />
        <Contact
          tag={settings.contact_tag}
          title={settings.contact_title}
          subtitle={settings.contact_subtitle}
          phone={settings.contact_phone}
          email={settings.contact_email}
          debtOptions={debtOptions}
        />
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
      <div className="legal-bar">
        <div className="container">
          <div className="legal-links">
            <button className="legal-link" onClick={() => openLegal('privacy')}>
              Политика конфиденциальности
            </button>
            <span className="legal-sep">·</span>
            <button className="legal-link" onClick={() => openLegal('pd')}>
              Обработка персональных данных
            </button>
            <span className="legal-sep">·</span>
            <button className="legal-link" onClick={() => openLegal('cookies')}>
              Cookies
            </button>
          </div>
        </div>
      </div>
      <LegalModals type={legalType} onClose={closeLegal} />
    </>
  );
}
