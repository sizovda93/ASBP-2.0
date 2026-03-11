const FORMATS = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    tag: 'Формат 1',
    title: 'Разовое сопровождение',
    desc: 'Для партнёров, которым нужен надёжный арбитражный управляющий под конкретное дело.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    tag: 'Формат 2',
    title: 'Постоянное партнёрство',
    desc: 'Для компаний и специалистов, которые регулярно работают с клиентами по банкротству.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    tag: 'Формат 3',
    title: 'Расширенная модель',
    desc: 'С сопровождением, обучением команды и подключением цифровых инструментов.',
  },
];

export default function Formats() {
  return (
    <section className="formats-section reveal">
      <div className="container">
        <div className="formats-header">
          <span className="section-tag">Сотрудничество</span>
          <h2 className="formats-title">Форматы работы с партнёрами</h2>
          <p className="formats-subtitle">
            Подбираем модель взаимодействия под задачи, поток клиентов и уровень вашей практики.
          </p>
        </div>
        <div className="formats-grid">
          {FORMATS.map((f) => (
            <div key={f.title} className="formats-card">
              <div className="formats-card-top">
                <div className="service-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                <span className="formats-card-tag">{f.tag}</span>
              </div>
              <h3 className="formats-card-title">{f.title}</h3>
              <p className="formats-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
