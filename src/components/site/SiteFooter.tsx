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
              <a href={viber || '#'}>Viber</a>
              <a href={whatsapp || '#'}>WhatsApp</a>
              <a href={telegram || '#'}>Telegram</a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px' }}>Услуги</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#">Для партнёров</a></li>
              <li><a href="#">Физическим лицам</a></li>
              <li><a href="#">Юридическим лицам</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px' }}>Компания</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#">О нас</a></li>
              <li><a href="#cases">Выигранные дела</a></li>
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
