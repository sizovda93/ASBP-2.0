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
            <a className="telegram-cta" href={telegramBotUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.2 4.6a1 1 0 0 0-1.1-.2L3.2 11.1a1 1 0 0 0 .1 1.9l4.2 1.4 1.5 4.8a1 1 0 0 0 .8.7h.1a1 1 0 0 0 .8-.5l2.3-3.2 4.1 3.1a1 1 0 0 0 1.6-.6l2.6-13a1 1 0 0 0-.4-1.1zM9.3 16.4l-.8-2.6 7.6-5.7-6.8 7-0.1 1.3z" />
              </svg>
              <span>Telegram</span>
            </a>
          </div>
          <a className="hotline" href={`tel:${phoneClean}`}>{phone}</a>
        </div>
      </div>
    </div>
  );
}
