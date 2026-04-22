import "./Nav.css";

export default function LessonsScreen({ unit, onSelectTopic, onBack }) {
  return (
    <div className="nav-root">
      <header className="nav-header" style={{ "--unit-color": unit.color }}>
        <button className="nav-back" onClick={onBack}>← Units</button>
        <div className="nav-unit-tag">{unit.title}</div>
      </header>

      <div className="nav-list nav-list--lessons">
        {unit.topics.map(topic => {
          const playable = typeof topic.generate === "function";
          return (
            <button
              key={topic.id}
              className={`nav-lesson ${!playable ? "nav-lesson--stub" : ""}`}
              onClick={() => playable && onSelectTopic(topic)}
              disabled={!playable}
            >
              <span className="nav-lesson-num" style={{ "--unit-color": unit.color }}>
                L{topic.lesson}
              </span>
              <span className="nav-lesson-text">
                <span className="nav-lesson-title">{topic.title}</span>
                <span className="nav-lesson-target">{topic.target}</span>
              </span>
              {playable
                ? <span className="nav-lesson-arrow">→</span>
                : <span className="nav-lesson-soon">Soon</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
