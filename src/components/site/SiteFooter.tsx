interface FooterProps {
  logo: string;
  description: string;
  copyright: string;
  phone: string;
  email: string;
  viber: string;
  whatsapp: string;
  telegram: string;
}

export default function SiteFooter({
  logo, description, copyright, phone, email, viber, whatsapp, telegram,
}: FooterProps) {
  const telegramBotUrl = 'https://t.me/ASPB_help_bot';
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/" className="footer-logo">
              <span>{logo}</span>
              <span className="logo-dot" />
            </a>
            <p style={{ marginBottom: '24px' }}>{description}</p>
            <div className="messengers">
              <a className="telegram-cta" href={telegramBotUrl} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.2 4.6a1 1 0 0 0-1.1-.2L3.2 11.1a1 1 0 0 0 .1 1.9l4.2 1.4 1.5 4.8a1 1 0 0 0 .8.7h.1a1 1 0 0 0 .8-.5l2.3-3.2 4.1 3.1a1 1 0 0 0 1.6-.6l2.6-13a1 1 0 0 0-.4-1.1zM9.3 16.4l-.8-2.6 7.6-5.7-6.8 7-0.1 1.3z" />
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px' }}>Услуги</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/platform">Цифровая платформа</a></li>
              <li><a href="/training">Обучение для партнеров</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px' }}>Компания</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/about">О нас</a></li>
              <li><a href="#">Отзывы</a></li>
              <li><a href="#">Стоимость</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px' }}>Контакты</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>{phone}</li>
              <li>{email}</li>
              <li style={{ fontSize: '12px', marginTop: '16px' }}>{copyright}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
