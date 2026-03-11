const ICONS = {
  scale: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 9l1.5 11h17L22 9z"/><path d="M12 2v20M2 9h20"/></svg>`,
  support: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  growth: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
};

const CARDS = [
  {
    icon: 'scale',
    title: 'Сопровождение процедур',
    desc: 'Работаем по делам физических и юридических лиц, берём на себя процесс и поддерживаем партнёра на каждом этапе.',
  },
  {
    icon: 'support',
    title: 'Поддержка сложных кейсов',
    desc: 'Помогаем разбирать нетиповые ситуации, риски и практические вопросы по сопровождению процедур.',
  },
  {
    icon: 'growth',
    title: 'Рост партнёрской практики',
    desc: 'Объединяем сопровождение дел, обучение и цифровые инструменты в одну систему масштабирования.',
  },
];

export default function Ecosystem() {
  return (
    <section className="ecosystem-section reveal">
      <div className="container">
        <div className="ecosystem-header">
          <span className="section-tag">Экосистема</span>
          <h2 className="ecosystem-title">Экосистема для партнёров</h2>
          <p className="ecosystem-subtitle">
            АСПБ помогает не просто передавать дела в работу, а выстраивать устойчивую и управляемую практику банкротства.
          </p>
        </div>
        <div className="ecosystem-grid">
          {CARDS.map((card) => (
            <div key={card.title} className="ecosystem-card">
              <div
                className="service-icon"
                dangerouslySetInnerHTML={{ __html: ICONS[card.icon as keyof typeof ICONS] }}
              />
              <h3 className="ecosystem-card-title">{card.title}</h3>
              <p className="ecosystem-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
