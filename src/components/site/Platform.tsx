import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

const MOCK_CASES = [
  { name: 'Иванов А.П.', stage: 'Реализация имущества', status: 'active', statusLabel: 'Активен' },
  { name: 'Смирнова Е.В.', stage: 'Реструктуризация долгов', status: 'pending', statusLabel: 'Ожидание' },
  { name: 'Козлов Д.М.', stage: 'Подача заявления', status: 'new', statusLabel: 'Новый' },
];

const MOCK_COUNTERS = [
  { num: '24', label: 'Дела' },
  { num: '147', label: 'Документов' },
  { num: '98%', label: 'Контроль' },
];

const FEATURES_MED = [
  { title: 'Чат по каждому делу', sub: 'Прямая связь без мессенджеров' },
  { title: 'Документы в системе', sub: 'Хранение и доступ в один клик' },
  { title: 'Мобильный доступ', sub: 'С любого устройства' },
];

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Platform() {
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');

  useEffect(() => {
    api.settings.getAll().then(s => {
      if (s.platform_screenshot) setScreenshotUrl(s.platform_screenshot);
    }).catch(() => {});
  }, []);

  return (
    <section className="platform-section reveal">
      <div className="container">
        <div className="platform-inner">

          {/* Left — text */}
          <div className="platform-left">
            <span className="section-tag">Платформа</span>
            <h2 className="platform-title">Цифровая платформа для ведения дел</h2>
            <p className="platform-subtitle">
              Партнёр получает удобный инструмент для контроля статусов, документов и взаимодействия по каждому клиенту. Все ключевые процессы — в одном месте.
            </p>
            <a href="/platform" className="btn btn-glass platform-btn">Смотреть платформу</a>
          </div>

          {/* Right — mockup + cards */}
          <div className="platform-right">

            {/* Dashboard UI mockup or uploaded screenshot */}
            {screenshotUrl ? (
              <div className="platform-mockup platform-mockup--screenshot">
                <div className="platform-mockup-chrome">
                  <div className="platform-mockup-dots"><span /><span /><span /></div>
                  <div className="platform-mockup-url">cabinet.аспб.рф</div>
                </div>
                <img src={screenshotUrl} alt="Личный кабинет" className="platform-mockup-img" />
              </div>
            ) : (
            <div className="platform-mockup">
              <div className="platform-mockup-chrome">
                <div className="platform-mockup-dots">
                  <span /><span /><span />
                </div>
                <div className="platform-mockup-url">cabinet.аспб.рф</div>
              </div>
              <div className="platform-mockup-body">
                <div className="platform-mock-header">
                  <span className="platform-mock-label">Личный кабинет партнёра</span>
                  <span className="platform-mock-online">● Онлайн</span>
                </div>
                <div className="platform-mock-cases">
                  {MOCK_CASES.map(c => (
                    <div key={c.name} className="platform-mock-case">
                      <div className="platform-mock-case-avatar">{c.name[0]}</div>
                      <div className="platform-mock-case-info">
                        <span className="platform-mock-case-name">{c.name}</span>
                        <span className="platform-mock-case-stage">{c.stage}</span>
                      </div>
                      <span className={`platform-mock-status platform-mock-status--${c.status}`}>
                        {c.statusLabel}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="platform-mock-row">
                  <div className="platform-mock-chat">
                    <div className="platform-mock-chat-label">Чат</div>
                    <div className="platform-mock-chat-msg platform-mock-chat-msg--in">Документы загружены ✓</div>
                    <div className="platform-mock-chat-msg platform-mock-chat-msg--out">Принято, этап обновлён</div>
                  </div>
                  <div className="platform-mock-counters">
                    {MOCK_COUNTERS.map(c => (
                      <div key={c.label} className="platform-mock-counter">
                        <span className="platform-mock-counter-num">{c.num}</span>
                        <span className="platform-mock-counter-label">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Feature cards hierarchy */}
            <div className="platform-features-wrap">
              {/* Main card */}
              <div className="platform-feature-main">
                <div className="platform-feature-check">{CHECK_ICON}</div>
                <div className="platform-feature-main-text">
                  <span className="platform-feature-main-title">Контроль этапов в реальном времени</span>
                  <span className="platform-feature-main-sub">Каждый статус и переход фиксируется в системе. Партнёр и клиент всегда видят актуальный прогресс процедуры.</span>
                </div>
              </div>
              {/* Medium cards */}
              <div className="platform-features-row">
                {FEATURES_MED.map(f => (
                  <div key={f.title} className="platform-feature-med">
                    <div className="platform-feature-check platform-feature-check--sm">{CHECK_ICON}</div>
                    <div>
                      <span className="platform-feature-med-title">{f.title}</span>
                      <span className="platform-feature-med-sub">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
