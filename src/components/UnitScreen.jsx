import "./Nav.css";

export default function UnitScreen({ subject, onSelectUnit, onBack }) {
  return (
    <div className="nav-root">
      <header className="nav-header">
        <button className="nav-back" onClick={onBack}>← Courses</button>
        <h1 className="nav-title">{subject.label}</h1>
        <p className="nav-subtitle">Choose a unit.</p>
      </header>

      <div className="nav-list">
        {subject.units.map((unit, i) => (
          <button
            key={unit.id}
            className="nav-card"
            style={{ "--unit-color": unit.color }}
            onClick={() => onSelectUnit(unit)}
          >
            <span className="nav-card-num">Unit {i + 1}</span>
            <span className="nav-card-label">{unit.title}</span>
            <span className="nav-card-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
