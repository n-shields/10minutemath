// Algebra 1 Unit 6: Introduction to Quadratic Functions
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u6", title: "Introduction to Quadratic Functions", color: "#f97316",
  topics: [
    {
      id: "a1u6-l2", lesson: 2,
      title: "Identifying Quadratic Patterns",
      target: "I can tell whether a pattern is growing linearly, exponentially, or quadratically.",
      generate() {
        const type = pick(["linear", "quadratic", "exponential"]);
        const tables = {
          linear: { x: [0,1,2,3,4], fn: x => 3*x + 2, label: "linear (constant differences)" },
          quadratic: { x: [0,1,2,3,4], fn: x => x*x + 1, label: "quadratic (constant second differences)" },
          exponential: { x: [0,1,2,3,4], fn: x => 2 * Math.pow(3, x), label: "exponential (constant ratio)" },
        };
        const t = tables[type];
        const vals = t.x.map(x => `(${x}, ${t.fn(x)})`).join(", ");
        const correct = type.charAt(0).toUpperCase() + type.slice(1);
        const wrong = ["Linear", "Quadratic", "Exponential"].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `What type of growth does this table show?\n${vals}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: type === "linear"
            ? `The output increases by the same amount each step (constant first difference) → linear.`
            : type === "quadratic"
            ? `The second differences are constant (differences of differences) → quadratic.`
            : `Each output is multiplied by the same factor → exponential.`,
        };
      },
    },
    {
      id: "a1u6-l9", lesson: 9,
      title: "Factored Form and Standard Form",
      target: "I can rewrite quadratic expressions given in factored form in standard form.",
      generate() {
        const r1 = rand(-6, 6), r2 = rand(-6, 6);
        const b = -(r1 + r2), c = r1 * r2;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}x` : ` − ${-b}x`;
        const cStr = c === 0 ? "" : c > 0 ? ` + ${c}` : ` − ${-c}`;
        const r1Str = r1 >= 0 ? ` − ${r1}` : ` + ${-r1}`;
        const r2Str = r2 >= 0 ? ` − ${r2}` : ` + ${-r2}`;
        const factored = `(x${r1Str})(x${r2Str})`;
        const correct = `x²${bStr}${cStr}`;
        const wrong = [
          `x²${b !== 0 ? (b > 0 ? ` + ${b+1}x` : ` − ${-b+1}x`) : " + x"}${cStr}`,
          `x²${bStr}${c !== 0 ? (c > 0 ? ` + ${c+1}` : ` − ${-c+1}`) : " + 1"}`,
          `x²${bStr}${c !== 0 ? (c > 0 ? ` − ${c}` : ` + ${-c}`) : " − 1"}`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Expand to standard form: ${factored}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Use FOIL: x·x${r1Str !== ` − 0` ? ` + x·(${r2 >= 0 ? -r2 : -r2})` : ""} + (${-r1})·x + (${-r1})(${-r2}) = ${correct}.`,
        };
      },
    },
    {
      id: "a1u6-l11", lesson: 11,
      title: "Graphing from Factored Form",
      target: "I know how to find the vertex and y-intercept of a quadratic in factored form.",
      generate() {
        const r1 = rand(-5, -1), r2 = rand(1, 5);
        const vertex_x = (r1 + r2) / 2;
        const a = pick([1, -1]);
        const vertex_y = a * (vertex_x - r1) * (vertex_x - r2);
        const yint = a * r1 * r2;
        const factored = a === 1 ? `(x − ${r1})(x − ${r2})` : `−(x − ${r1})(x − ${r2})`;

        const type = pick(["x-intercepts", "vertex x", "y-intercept"]);
        let correct, wrong, exp;
        if (type === "x-intercepts") {
          correct = `x = ${r1} and x = ${r2}`;
          wrong = [`x = ${-r1} and x = ${-r2}`, `x = ${r1 + r2}`, `x = ${r1} only`];
          exp = `Set each factor to zero: x − ${r1} = 0 → x = ${r1}; x − ${r2} = 0 → x = ${r2}.`;
        } else if (type === "vertex x") {
          correct = `x = ${vertex_x}`;
          wrong = [`x = ${vertex_x + 1}`, `x = ${r1}`, `x = ${r2}`];
          exp = `Vertex x is the average of the x-intercepts: (${r1} + ${r2}) / 2 = ${vertex_x}.`;
        } else {
          correct = `${yint}`;
          wrong = [`${yint + 1}`, `${-yint}`, `${r1 * r2}`];
          exp = `Substitute x = 0: ${a === 1 ? "" : "−"}(0 − ${r1})(0 − ${r2}) = ${a === 1 ? "" : "−"}(${-r1})(${-r2}) = ${yint}.`;
        }
        const choices = shuffle([correct, ...wrong.map(String)]);
        return {
          question: `For f(x) = ${factored}, find the ${type}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
          graph: { type: "parabola", a, h: vertex_x, k: vertex_y, roots: [r1, r2] },
        };
      },
    },
    {
      id: "a1u6-l16", lesson: 16,
      title: "Vertex Form",
      target: "I can graph a quadratic in vertex form and find the maximum or minimum.",
      generate() {
        const h = rand(-4, 4), k = rand(-9, 9);
        const a = pick([1, -1, 2, -2]);
        const hStr = h === 0 ? "x²" : h > 0 ? `(x − ${h})²` : `(x + ${-h})²`;
        const kStr = k === 0 ? "" : k > 0 ? ` + ${k}` : ` − ${-k}`;
        const type = pick(["vertex", "max/min", "opens"]);
        let correct, wrong, exp;
        if (type === "vertex") {
          correct = `(${h}, ${k})`;
          wrong = [`(${-h}, ${k})`, `(${h}, ${-k})`, `(${-h}, ${-k})`];
          exp = `In vertex form f(x) = a(x−h)²+k, the vertex is (h, k) = (${h}, ${k}).`;
        } else if (type === "max/min") {
          correct = a > 0 ? `Minimum of ${k}` : `Maximum of ${k}`;
          wrong = a > 0
            ? [`Maximum of ${k}`, `Minimum of ${-k}`, `Maximum of ${-k}`]
            : [`Minimum of ${k}`, `Maximum of ${-k}`, `Minimum of ${-k}`];
          exp = `a = ${a}. Since a ${a > 0 ? "> 0" : "< 0"}, the parabola opens ${a > 0 ? "up → minimum" : "down → maximum"} at y = ${k}.`;
        } else {
          correct = a > 0 ? "Opens upward" : "Opens downward";
          wrong = a > 0 ? ["Opens downward", "Opens left", "Opens right"] : ["Opens upward", "Opens left", "Opens right"];
          exp = `The sign of a (${a}) determines direction: ${a > 0 ? "positive → opens up" : "negative → opens down"}.`;
        }
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `For f(x) = ${a === 1 ? "" : a === -1 ? "−" : a}${hStr}${kStr}, find the ${type}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
          graph: { type: "parabola", a, h, k },
        };
      },
    },
    { id:"a1u6-l5",  lesson:5,  title:"Falling Objects",            target:"I can use tables, graphs, and equations to represent the height of a falling object." },
    { id:"a1u6-l10", lesson:10, title:"Intercepts of Quadratics",   target:"I know how the numbers in factored form relate to the intercepts of the graph." },
    { id:"a1u6-l12", lesson:12, title:"Effect of a and c",          target:"I can explain how a and c in y = ax² + bx + c affect the graph." },
    { id:"a1u6-l15", lesson:15, title:"Recognizing Vertex Form",    target:"I can recognize vertex form and relate the numbers to the graph." },
  ],
};
