import "./Home.css";

export default function Home({ subjects, activeSubject, onSubjectChange, onSelectTopic, openUnits, onToggleUnit }) {
  const subject = subjects.find(s => s.id === activeSubject) || subjects[0];

  return (
    <div className="home-root">
      <header className="home-header">
        <h1 className="home-logo">10minutemath</h1>
        {subjects.length > 1 && (
          <div className="home-subject-tabs">
            {subjects.map(s => (
              <button
                key={s.id}
                className={`home-subject-tab ${s.id === activeSubject ? "home-subject-tab--active" : ""}`}
                onClick={() => onSubjectChange(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="home-units">
        {subject.units.map((unit, ui) => {
          const open = !!openUnits[unit.id];
          return (
            <div key={unit.id} className={`home-unit ${open ? "home-unit--open" : ""}`}>
              <button
                className="home-unit-header"
                style={{ "--unit-color": unit.color }}
                onClick={() => onToggleUnit(unit.id)}
                aria-expanded={open}
              >
                <span className="home-unit-num">Unit {ui + 1}</span>
                <span className="home-unit-title">{unit.title}</span>
                <span className={`home-unit-chevron ${open ? "home-unit-chevron--open" : ""}`}>›</span>
              </button>

              {open && unit.topics.length > 0 && (
                <div className="home-topics">
                  {unit.topics.map(topic => {
                    const playable = typeof topic.generate === "function";
                    return (
                      <button
                        key={topic.id}
                        className={`home-topic-btn ${!playable ? "home-topic-btn--stub" : ""}`}
                        onClick={() => playable && onSelectTopic(topic)}
                        disabled={!playable}
                        aria-disabled={!playable}
                      >
                        <span className="home-topic-lesson" style={{ "--unit-color": unit.color }}>
                          L{topic.lesson}
                        </span>
                        <span className="home-topic-text">
                          <span className="home-topic-title">{topic.title}</span>
                          <span className="home-topic-target">{topic.target}</span>
                        </span>
                        {playable
                          ? <span className="home-topic-arrow">→</span>
                          : <span className="home-topic-soon">Soon</span>
                        }
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
