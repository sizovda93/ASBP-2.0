interface TopBarProps {
  text: string;
  phone: string;
  viber: string;
  whatsapp: string;
  telegram: string;
}

export default function TopBar({ text, phone, viber, whatsapp, telegram }: TopBarProps) {
  const phoneClean = (phone || '').replace(/\D/g, '');
  const telegramBotUrl = 'https://t.me/ASPB_help_bot';
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <span>{text}</span>
        </div>
        <div className="top-bar-right" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className="messengers">
            <a href={telegramBotUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
          <a className="hotline" href={`tel:${phoneClean}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
}
