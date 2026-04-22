// Unit 1: Constructions and Rigid Transformations

const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "geo-u1",
  title: "Constructions and Rigid Transformations",
  color: "#6366f1",
  topics: [
    // Lessons 1–9: Constructions (no random-number practice — conceptual/compass work)
    {
      id: "u1-l1", lesson: 1,
      title: "Using a Straightedge and Compass",
      target: "I know how to use a compass to construct a circle.",
    },
    {
      id: "u1-l2", lesson: 2,
      title: "Describing Constructions",
      target: "I can use precise mathematical language to describe a construction.",
    },
    {
      id: "u1-l3", lesson: 3,
      title: "Perpendicular Bisectors",
      target: "I can construct a perpendicular bisector, and understand what is special about the set of points equidistant from two given points.",
    },
    {
      id: "u1-l4", lesson: 4,
      title: "Equilateral Triangles",
      target: "I can construct an equilateral triangle and identify congruent segments.",
    },
    {
      id: "u1-l5", lesson: 5,
      title: "Angle Bisectors",
      target: "I can construct an angle bisector and a perpendicular through a point on a line.",
    },
    {
      id: "u1-l6", lesson: 6,
      title: "Parallel and Perpendicular Lines",
      target: "I can construct a parallel line and a perpendicular line through a given point.",
    },
    {
      id: "u1-l7", lesson: 7,
      title: "Squares from Constructions",
      target: "I can construct a square inscribed in a circle and a square from a given side.",
    },
    {
      id: "u1-l8", lesson: 8,
      title: "Technology Constructions",
      target: "I can use technology to help me construct specific diagrams.",
    },
    {
      id: "u1-l9", lesson: 9,
      title: "Solving with Constructions",
      target: "I can construct perpendicular bisectors to help solve problems.",
    },
    // Lessons 10–18: Rigid Transformations (practice available)
    {
      id: "u1-l11", lesson: 11,
      title: "Reflections",
      target: "I can describe a reflection by specifying the line of reflection. I can draw reflections.",
      generate() {
        const x = rand(1, 8), y = rand(1, 8);
        const axis = pick(["x-axis", "y-axis"]);
        const correct = axis === "x-axis" ? `(${x}, ${-y})` : `(${-x}, ${y})`;
        const wrong = [
          `(${-x}, ${-y})`,
          `(${y}, ${x})`,
          axis === "x-axis" ? `(${-x}, ${y})` : `(${x}, ${-y})`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Point P is at (${x}, ${y}). What are its coordinates after reflecting over the ${axis}?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: axis === "x-axis"
            ? `Reflecting over the x-axis keeps x the same and negates y: (${x}, ${y}) → (${x}, ${-y}).`
            : `Reflecting over the y-axis negates x and keeps y: (${x}, ${y}) → (${-x}, ${y}).`,
        };
      },
    },
    {
      id: "u1-l12", lesson: 12,
      title: "Translations",
      target: "I can describe a translation by stating the directed line segment. I can draw translations.",
      generate() {
        const x = rand(1, 8), y = rand(1, 8);
        const dx = rand(-5, 5), dy = rand(-5, 5);
        const nx = x + dx, ny = y + dy;
        const correct = `(${nx}, ${ny})`;
        const wrong = [
          `(${x - dx}, ${y - dy})`,
          `(${nx}, ${y - dy})`,
          `(${x - dx}, ${ny})`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Point A is at (${x}, ${y}). It is translated by ⟨${dx}, ${dy}⟩. What are its new coordinates?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Add the translation vector: (${x} + ${dx}, ${y} + ${dy}) = (${nx}, ${ny}).`,
        };
      },
    },
    {
      id: "u1-l14", lesson: 14,
      title: "Rotations",
      target: "I can describe a rotation by stating the center and angle of rotation. I can draw rotations.",
      generate() {
        const x = rand(1, 7), y = rand(1, 7);
        const deg = pick([90, 180, 270]);
        let correct, exp;
        if (deg === 90)  { correct = `(${-y}, ${x})`;  exp = `90° CCW: (x,y) → (−y, x).`; }
        if (deg === 180) { correct = `(${-x}, ${-y})`; exp = `180°: (x,y) → (−x, −y).`; }
        if (deg === 270) { correct = `(${y}, ${-x})`;  exp = `270° CCW (= 90° CW): (x,y) → (y, −x).`; }
        const wrong = [
          `(${-x}, ${y})`, `(${y}, ${x})`, `(${-y}, ${-x})`
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Point B is at (${x}, ${y}). After a ${deg}° counterclockwise rotation about the origin, where does it land?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp + ` So (${x}, ${y}) → ${correct}.`,
        };
      },
    },
    {
      id: "u1-l15", lesson: 15,
      title: "Reflective Symmetry",
      target: "I can describe the reflections that take a figure onto itself.",
      generate() {
        const shapes = [
          { shape: "square", count: 4, wrong: ["1", "2", "8"], exp: "A square has 4 lines of reflective symmetry: 2 through opposite sides and 2 through opposite corners." },
          { shape: "equilateral triangle", count: 3, wrong: ["1", "2", "6"], exp: "An equilateral triangle has 3 lines of symmetry, one through each vertex and the midpoint of the opposite side." },
          { shape: "rectangle (non-square)", count: 2, wrong: ["0", "1", "4"], exp: "A non-square rectangle has 2 lines of symmetry: one through each pair of opposite sides." },
          { shape: "regular hexagon", count: 6, wrong: ["3", "4", "12"], exp: "A regular hexagon has 6 lines of symmetry: 3 through opposite vertices and 3 through midpoints of opposite sides." },
          { shape: "isosceles triangle (non-equilateral)", count: 1, wrong: ["0", "2", "3"], exp: "An isosceles (non-equilateral) triangle has exactly 1 line of symmetry, through the vertex angle and midpoint of the base." },
        ];
        const s = pick(shapes);
        const correct = `${s.count}`;
        const choices = shuffle([correct, ...s.wrong]);
        return {
          question: `How many lines of reflective symmetry does a ${s.shape} have?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: s.exp,
        };
      },
    },
    {
      id: "u1-l16", lesson: 16,
      title: "Rotational Symmetry",
      target: "I can describe the rotations that take a figure onto itself.",
      generate() {
        const shapes = [
          { shape: "square", angles: [90, 180, 270, 360], wrong: ["Only 180°", "Only 90° and 180°", "60°, 120°, 180°, 240°, 300°, 360°"], exp: "A square maps onto itself at 90°, 180°, 270°, and 360° rotations (order 4 symmetry)." },
          { shape: "equilateral triangle", angles: [120, 240, 360], wrong: ["90°, 180°, 270°, 360°", "Only 180°", "60°, 120°, 180°, 240°, 300°, 360°"], exp: "An equilateral triangle has rotational symmetry at 120°, 240°, and 360° (order 3)." },
          { shape: "regular hexagon", angles: [60, 120, 180, 240, 300, 360], wrong: ["Only 60° and 120°", "45°, 90°, 135°, 180°, ...", "120°, 240°, 360°"], exp: "A regular hexagon has rotational symmetry every 60°: 6 rotations in total (order 6)." },
          { shape: "rectangle (non-square)", angles: [180, 360], wrong: ["90°, 180°, 270°, 360°", "Only 360°", "120°, 240°, 360°"], exp: "A non-square rectangle only maps onto itself at 180° and 360° (order 2)." },
        ];
        const s = pick(shapes);
        const correct = s.angles.map(a => `${a}°`).join(", ");
        const choices = shuffle([correct, ...s.wrong]);
        return {
          question: `At which rotation angles (less than or equal to 360°) does a ${s.shape} map onto itself?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: s.exp,
        };
      },
    },
    {
      id: "u1-l17", lesson: 17,
      title: "Describing Transformations",
      target: "I can describe a transformation that takes given points to another set of points.",
      generate() {
        const scenarios = [
          () => {
            const dx = rand(1, 6), dy = rand(1, 6);
            return {
              q: `Point A(2, 3) maps to A'(${2 + dx}, ${3 + dy}). Which transformation is this?`,
              correct: `Translation by ⟨${dx}, ${dy}⟩`,
              wrong: [`Reflection over y = ${dy}`, `Rotation of 90° CCW`, `Dilation by factor ${dx}`],
              exp: `Each coordinate increased by the same amount: x by ${dx}, y by ${dy}. This is a translation.`,
            };
          },
          () => {
            const x = rand(2, 6), y = rand(2, 6);
            return {
              q: `Point B(${x}, ${y}) maps to B'(${-x}, ${y}). Which transformation is this?`,
              correct: "Reflection over the y-axis",
              wrong: ["Reflection over the x-axis", "Rotation of 180°", `Translation by ⟨${-2*x}, 0⟩`],
              exp: `The x-coordinate was negated and y stayed the same — that's a reflection over the y-axis.`,
            };
          },
          () => {
            const x = rand(2, 5), y = rand(2, 5);
            return {
              q: `Point C(${x}, ${y}) maps to C'(${-x}, ${-y}). Which transformation is this?`,
              correct: "Rotation of 180° about the origin",
              wrong: ["Reflection over the x-axis", "Reflection over y = x", `Translation by ⟨${-2*x}, ${-2*y}⟩`],
              exp: `Both coordinates were negated: (x,y) → (−x,−y). This is a 180° rotation about the origin.`,
            };
          },
        ];
        const s = pick(scenarios)();
        const choices = shuffle([s.correct, ...s.wrong]);
        return {
          question: s.q,
          choices,
          correctIndex: choices.indexOf(s.correct),
          explanation: s.exp,
        };
      },
    },
    {
      id: "u1-l19", lesson: 19,
      title: "Vertical Angles",
      target: "I can prove vertical angles are congruent.",
      generate() {
        const a = rand(20, 160);
        const scenarios = [
          {
            q: `Two lines intersect forming vertical angles. One angle measures ${a}°. What is the measure of its vertical angle?`,
            correct: `${a}°`,
            wrong: [`${180 - a}°`, `${90 - a > 0 ? 90 - a : 360 - a}°`, `${360 - a}°`],
            exp: `Vertical angles are congruent — they have equal measures. Both angles measure ${a}°.`,
          },
          {
            q: `Two lines intersect. One angle is ${a}°. What is the measure of an adjacent supplementary angle?`,
            correct: `${180 - a}°`,
            wrong: [`${a}°`, `${90 - a > 0 ? 90 - a : a + 90}°`, `${360 - a}°`],
            exp: `Supplementary angles sum to 180°: 180° − ${a}° = ${180 - a}°.`,
          },
        ];
        const s = pick(scenarios);
        const choices = shuffle([s.correct, ...s.wrong]);
        return {
          question: s.q,
          choices,
          correctIndex: choices.indexOf(s.correct),
          explanation: s.exp,
        };
      },
    },
    {
      id: "u1-l20", lesson: 20,
      title: "Parallel Lines and Transversals",
      target: "I can prove alternate interior angles are congruent. I can prove corresponding angles are congruent.",
      generate() {
        const a = rand(30, 150);
        const type = pick(["alternate interior", "corresponding", "co-interior (same-side interior)"]);
        let correct, exp;
        if (type === "alternate interior") {
          correct = `${a}°`;
          exp = `Alternate interior angles formed by parallel lines and a transversal are congruent: both measure ${a}°.`;
        } else if (type === "corresponding") {
          correct = `${a}°`;
          exp = `Corresponding angles formed by parallel lines and a transversal are congruent: both measure ${a}°.`;
        } else {
          correct = `${180 - a}°`;
          exp = `Co-interior (same-side interior) angles are supplementary: they add to 180°. So the other angle is ${180 - a}°.`;
        }
        const wrong = [
          `${180 - a}°`, `${90}°`, `${a + 10}°`
        ].filter(w => w !== correct).slice(0, 3);
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Two parallel lines are cut by a transversal. One angle measures ${a}°. What is the measure of its ${type} angle?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
        };
      },
    },
    {
      id: "u1-l21", lesson: 21,
      title: "Triangle Angle Sum",
      target: "I can prove the angles in a triangle sum to 180 degrees.",
      generate() {
        const a = rand(30, 90), b = rand(20, 80);
        const c = 180 - a - b;
        if (c <= 0 || c >= 180) return this.generate();
        const correct = `${c}°`;
        const wrong = [`${c + 10}°`, `${c - 10 > 0 ? c - 10 : c + 20}°`, `${360 - a - b}°`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A triangle has two angles measuring ${a}° and ${b}°. What is the third angle?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `The angles of a triangle sum to 180°: 180° − ${a}° − ${b}° = ${c}°.`,
        };
      },
    },
  ],
};
