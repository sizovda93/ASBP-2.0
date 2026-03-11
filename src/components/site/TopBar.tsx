interface TopBarProps {
  text: string;
  phone: string;
  viber: string;
  whatsapp: string;
  telegram: string;
}

export default function TopBar({ text, phone, viber, whatsapp, telegram }: TopBarProps) {
  const phoneClean = (phone || '').replace(/\D/g, '');
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <span>{text}</span>
        </div>
        <div className="top-bar-right" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className="messengers">
            <a href={viber || '#'}>Viber</a>
            <a href={whatsapp || '#'}>WhatsApp</a>
            <a href={telegram || '#'}>Telegram</a>
          </div>
          <a className="hotline" href={`tel:${phoneClean}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
}
