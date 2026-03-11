interface HeroProps {
  label: string;
  title: string;
  subtitle: string;
  btnPrimary: string;
  btnPrimaryHref: string;
  btnSecondary: string;
  btnSecondaryHref: string;
  backgroundImage: string;
}

export default function Hero({
  label, title, subtitle,
  btnPrimary, btnPrimaryHref,
  btnSecondary, btnSecondaryHref,
  backgroundImage,
}: HeroProps) {
  const innerStyle: React.CSSProperties = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};
  const innerClass = `hero-inner${backgroundImage ? ' has-bg' : ''}`;

  return (
    <section className="hero-section reveal">
      <div className="hero-floating-card hero-floating-card-left" aria-hidden="true">
        <div className="hero-floating-title">Интеграция данных</div>
        <div className="hero-floating-bars">
          <span className="hero-floating-bar hero-floating-bar-long" />
          <span className="hero-floating-bar hero-floating-bar-short" />
        </div>
        <div className="hero-floating-status">Sync Complete</div>
      </div>

      <div className="hero-floating-card hero-floating-card-right" aria-hidden="true">
        <div className="hero-floating-label">
          <span className="hero-floating-check">✓</span>
          <span>Списано долгов</span>
        </div>
        <div className="hero-floating-value">₽ 4.5 млрд+</div>
      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="hero-widget">
          <div className={innerClass} style={innerStyle}>
            <div className="hero-content">
              <div className="hero-label">
                <div className="hero-icon-container">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
                  </svg>
                </div>
                <span className="hero-label-text">{label}</span>
              </div>
              <h1
                className="hero-title text-gradient"
                dangerouslySetInnerHTML={{
                  __html: (title || '').replace(/\n/g, '<br>'),
                }}
              />
              <p className="hero-subtitle">{subtitle}</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={btnPrimaryHref || '#contact'} className="btn btn-primary">
                  {btnPrimary}
                </a>
                <a href={btnSecondaryHref || '#cases'} className="btn btn-glass">
                  {btnSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
