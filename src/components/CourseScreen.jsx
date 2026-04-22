import "./Nav.css";

export default function CourseScreen({ subjects, onSelectSubject }) {
  return (
    <div className="nav-root">
      <header className="nav-header">
        <h1 className="nav-logo">10minutemath</h1>
        <p className="nav-subtitle">Choose a course to get started.</p>
      </header>

      <div className="nav-list">
        {subjects.map(s => (
          <button key={s.id} className="nav-card" onClick={() => onSelectSubject(s)}>
            <span className="nav-card-label">{s.label}</span>
            <span className="nav-card-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
