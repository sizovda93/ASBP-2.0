import { useEffect, useState } from 'react';
import { api, type SiteSettings } from '../lib/api';
import TopBar from '../components/site/TopBar';
import Header from '../components/site/Header';
import SiteFooter from '../components/site/SiteFooter';

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.settings.getAll().then((s) => {
      setSettings(s);
      setLoaded(true);
    }).catch((err) => {
      console.error('Failed to load settings:', err);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => obs.observe(el));
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
        <section className="hero-section reveal">
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-widget">
              <div className="hero-inner">
                <div className="hero-content">
                  <div className="hero-label">
                    <div className="hero-icon-container" style={{ background: 'linear-gradient(135deg, #2eb87a, #1a7a4a)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
                      </svg>
                    </div>
                    <span className="hero-label-text">О компании</span>
                  </div>
                  <h1 className="hero-title text-gradient">
                    Агенства сопровождения<br />процедур банкротства
                  </h1>
                  <p className="hero-subtitle">
                    «Агенства сопровождения процедур банкротства» - это группа компаний, каждый работник которой является экспертом в области банкротства. Познакомьтесь с нами поближе, и посмотрите основные вехи становления и развития нашей Группы Компаний.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-story-section reveal">
          <div className="container">
            <div className="about-story-sheet">
              <div className="about-story-brand">
                <span className="about-story-brand-text">АСПБ</span>
              </div>
              <div className="about-story-text">
                <p>
                  <span className="about-story-highlight">
                    Юридическая группа «Агенства сопровождения процедур банкротства» представляет собой объединение более 30 юридических компаний и частнопрактикующих юристов (адвокатов) в сфере банкротства физических и юридических лиц.
                  </span>
                </p>
                <p>
                  <span className="about-story-highlight">
                    Миссией «Агенства сопровождения процедур банкротства» и ее партнеров является эффективная защита финансовых прав граждан и предпринимателей, которые в условиях затянувшегося кризиса и падающих доходов бизнеса, потребительского спроса, испытывают значительные сложности по оплате своих обязательных платежей в бюджет, выплатам по кредитным и иным обязательствам.
                  </span>
                </p>
                <p>
                  <span className="about-story-highlight">
                    В настоящее время Юридическая группа «Федеральная экспертная служба» освободила от долгов более 14 000 гражданам на сумму более 4.5 миллиардов рублей.
                  </span>
                </p>
                <p>
                  <span className="about-story-highlight">
                    Партнерские офисы юридической группы «Агенства сопровождения процедур банкротства» находятся в каждом регионе нашей страны.
                  </span>
                </p>
                <p>
                  <span className="about-story-highlight">
                    Мы постоянно развиваемся и улучшаем качество наших юридических услуги в сфере банкротства граждан и предпринимателей, юридических лиц. Также готовы Вам помочь в защите Ваших прав на стадии исполнительного производства, защитить Вас от давления коллекторов и недобросовестных кредиторов.
                  </span>
                </p>
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
