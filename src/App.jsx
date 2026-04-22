import { useState } from "react";
import CourseScreen from "./components/CourseScreen";
import UnitScreen from "./components/UnitScreen";
import LessonsScreen from "./components/LessonsScreen";
import PracticeSession from "./components/PracticeSession";
import { SUBJECTS } from "./data/geometry/index";

export default function App() {
  const [subject,     setSubject]     = useState(null);
  const [unit,        setUnit]        = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  if (activeTopic) {
    return (
      <PracticeSession
        topic={activeTopic}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  if (unit) {
    return (
      <LessonsScreen
        unit={unit}
        onSelectTopic={setActiveTopic}
        onBack={() => setUnit(null)}
      />
    );
  }

  if (subject) {
    return (
      <UnitScreen
        subject={subject}
        onSelectUnit={setUnit}
        onBack={() => setSubject(null)}
      />
    );
  }

  return (
    <CourseScreen
      subjects={SUBJECTS}
      onSelectSubject={setSubject}
    />
  );
}
