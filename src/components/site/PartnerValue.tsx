const ICONS = {
  briefcase: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  graduation: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  monitor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
};

const CARDS = [
  {
    icon: 'briefcase',
    title: 'Ведение дел',
    desc: 'Берем на себя сопровождение процедур банкротства по вашим клиентам — профессионально, прозрачно и с понятной моделью взаимодействия.',
  },
  {
    icon: 'graduation',
    title: 'Обучение команды',
    desc: 'Даем практические программы для юристов, руководителей и сотрудников, чтобы вы могли развивать направление банкротства системно.',
  },
  {
    icon: 'monitor',
    title: 'Цифровой контроль',
    desc: 'Помогаем держать под контролем статусы дел, документы и взаимодействие с клиентами в единой рабочей системе.',
  },
];

export default function PartnerValue() {
  return (
    <section className="partner-value-section reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Для партнёров</span>
          <h2 className="section-title">Что получает партнёр с АСПБ</h2>
          <p className="partner-value-subtitle">
            Мы закрываем ключевые задачи партнёрской практики в банкротстве: берём процедуры в сопровождение, усиливаем команду через обучение и даём цифровые инструменты для контроля работы.
          </p>
        </div>
        <div className="partner-value-grid">
          {CARDS.map((card) => (
            <div key={card.title} className="partner-value-card">
              <div
                className="service-icon"
                dangerouslySetInnerHTML={{ __html: ICONS[card.icon as keyof typeof ICONS] }}
              />
              <h3 className="partner-value-card-title">{card.title}</h3>
              <p className="partner-value-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
