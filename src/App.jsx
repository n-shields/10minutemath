import { useState } from "react";
import Home from "./components/Home";
import PracticeSession from "./components/PracticeSession";
import { SUBJECTS } from "./data/geometry/index";

export default function App() {
  const [subject, setSubject]       = useState("geometry");
  const [activeTopic, setActiveTopic] = useState(null);
  const [openUnits, setOpenUnits]   = useState({});

  const toggleUnit = (id) => setOpenUnits(prev => ({ ...prev, [id]: !prev[id] }));

  if (activeTopic) {
    return (
      <PracticeSession
        topic={activeTopic}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  return (
    <Home
      subjects={SUBJECTS}
      activeSubject={subject}
      onSubjectChange={setSubject}
      onSelectTopic={setActiveTopic}
      openUnits={openUnits}
      onToggleUnit={toggleUnit}
    />
  );
}
