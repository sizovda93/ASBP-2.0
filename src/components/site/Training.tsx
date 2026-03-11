const COURSES = [
  { icon: '⚖️', title: 'Оспаривание сделок' },
  { icon: '📋', title: 'Неосвобождение от обязательств' },
  { icon: '📑', title: 'Юридические аспекты БФЛ' },
  { icon: '💼', title: 'Продажи юридических услуг' },
  { icon: '👥', title: 'Эффективная команда' },
  { icon: '🎓', title: 'Практика для действующих специалистов' },
];

export default function Training() {
  return (
    <section className="training-section reveal">
      <div className="container">
        <div className="training-header">
          <span className="section-tag">Обучение</span>
          <h2 className="training-title">Обучение для партнёров и их команды</h2>
          <p className="training-subtitle">
            Практические программы для юристов, адвокатов, финансовых управляющих, руководителей практик и сотрудников, работающих с банкротством и смежными задачами.
          </p>
        </div>
        <div className="training-grid">
          {COURSES.map((course) => (
            <div key={course.title} className="training-card">
              <div className="training-card-dot" />
              <span className="training-card-title">{course.title}</span>
            </div>
          ))}
        </div>
        <div className="training-cta">
          <a href="/training" className="btn btn-glass training-btn">Подробнее об обучении</a>
        </div>
      </div>
    </section>
  );
}
