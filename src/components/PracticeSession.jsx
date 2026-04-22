import { useState, useEffect, useCallback } from "react";
import "./PracticeSession.css";

export default function PracticeSession({ topic, onBack }) {
  const [problem, setProblem]   = useState(null);
  const [selected, setSelected] = useState(null); // index chosen
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak]     = useState(0);
  const [total, setTotal]       = useState(0);

  const nextProblem = useCallback(() => {
    setProblem(topic.generate());
    setSelected(null);
    setRevealed(false);
  }, [topic]);

  useEffect(() => { nextProblem(); }, [nextProblem]);

  const handleChoice = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    const correct = idx === problem.correctIndex;
    setTotal(t => t + 1);
    setStreak(s => correct ? s + 1 : 0);
  };

  if (!problem) return null;

  const correct = selected === problem.correctIndex;

  return (
    <div className="ps-root">
      <div className="ps-header">
        <button className="ps-back" onClick={onBack}>← Back</button>
        <div className="ps-meta">
          <span className="ps-topic-label">{topic.title}</span>
          {total > 0 && (
            <span className="ps-streak">
              🔥 {streak} / {total}
            </span>
          )}
        </div>
      </div>

      <div className="ps-card">
        <p className="ps-question">{problem.question}</p>

        <div className="ps-choices">
          {problem.choices.map((choice, i) => {
            let cls = "ps-choice";
            if (revealed) {
              if (i === problem.correctIndex) cls += " ps-choice--correct";
              else if (i === selected)        cls += " ps-choice--wrong";
              else                            cls += " ps-choice--dim";
            } else if (selected === i) {
              cls += " ps-choice--selected";
            }
            return (
              <button key={i} className={cls} onClick={() => handleChoice(i)}>
                <span className="ps-choice-letter">{String.fromCharCode(65 + i)}</span>
                <span className="ps-choice-text">{choice}</span>
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className={`ps-feedback ${correct ? "ps-feedback--correct" : "ps-feedback--wrong"}`}>
            <div className="ps-feedback-icon">{correct ? "✓" : "✗"}</div>
            <div className="ps-feedback-text">
              <div className="ps-feedback-verdict">{correct ? "Correct!" : "Not quite."}</div>
              <div className="ps-feedback-explanation">{problem.explanation}</div>
            </div>
          </div>
        )}
      </div>

      {revealed && (
        <button className="ps-next" onClick={nextProblem}>
          Next Problem →
        </button>
      )}
    </div>
  );
}
