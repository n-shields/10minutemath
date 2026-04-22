// Algebra 1 Unit 4: Functions
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u4", title: "Functions", color: "#f59e0b",
  topics: [
    {
      id: "a1u4-l2", lesson: 2,
      title: "Function Notation",
      target: "I can use function notation to express functions that have specific inputs and outputs.",
      generate() {
        const a = rand(1, 5), b = rand(-8, 8);
        const x = rand(-4, 4);
        const result = a * x + b;
        const type = pick(["evaluate", "solve"]);
        if (type === "evaluate") {
          const correct = `${result}`;
          const wrong = [`${a * x}`, `${a * x + b + 1}`, `${a * (x + 1) + b}`];
          const choices = shuffle([correct, ...wrong]);
          return {
            question: `If f(x) = ${a}x + ${b >= 0 ? `+ ${b}` : `− ${-b}`}, find f(${x}).`,
            choices,
            correctIndex: choices.indexOf(correct),
            explanation: `f(${x}) = ${a}(${x}) + ${b} = ${a*x} + ${b} = ${result}.`,
          };
        } else {
          const val = a * x + b;
          const correct = `x = ${x}`;
          const wrong = [`x = ${x+1}`, `x = ${x-1}`, `x = ${-x}`];
          const choices = shuffle([correct, ...wrong]);
          return {
            question: `If f(x) = ${a}x + ${b >= 0 ? `+ ${b}` : `− ${-b}`}, solve f(x) = ${val}.`,
            choices,
            correctIndex: choices.indexOf(correct),
            explanation: `Set ${a}x + ${b} = ${val}. Subtract ${b}: ${a}x = ${val - b}. Divide: x = ${x}.`,
          };
        }
      },
    },
    {
      id: "a1u4-l7", lesson: 7,
      title: "Average Rate of Change",
      target: "I understand the meaning of 'average rate of change.' When given a graph of a function, I can estimate or calculate it between two points.",
      generate() {
        const a = rand(1, 4), b = rand(-5, 5);
        const x1 = rand(-3, 0), x2 = x1 + rand(2, 5);
        const y1 = a * x1 + b, y2 = a * x2 + b;
        const arc = (y2 - y1) / (x2 - x1);
        const correct = `${arc}`;
        const wrong = [`${arc + 1}`, `${(y1 + y2) / 2}`, `${x2 - x1}`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `For f(x) = ${a}x + ${b}, find the average rate of change from x = ${x1} to x = ${x2}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `ARC = (f(${x2}) − f(${x1})) / (${x2} − ${x1}) = (${y2} − ${y1}) / ${x2 - x1} = ${arc}.`,
        };
      },
    },
    {
      id: "a1u4-l10", lesson: 10,
      title: "Domain and Range",
      target: "I know what is meant by the 'domain' and 'range' of a function.",
      generate() {
        const type = pick(["domain", "range"]);
        const scenarios = [
          {
            desc: "f(x) = 2x + 3 for 0 ≤ x ≤ 5",
            domain: "0 ≤ x ≤ 5",
            range: "3 ≤ y ≤ 13",
            dexp: "The input x is restricted to [0, 5].",
            rexp: "f(0) = 3 and f(5) = 13, so the range is 3 ≤ y ≤ 13.",
          },
          {
            desc: "The height of a ball (in feet) t seconds after being thrown, where 0 ≤ t ≤ 3",
            domain: "0 ≤ t ≤ 3",
            range: "0 ≤ height ≤ max height",
            dexp: "Time can only be 0 to 3 seconds — that's the domain.",
            rexp: "Height ranges from 0 (ground) up to the peak and back to 0.",
          },
        ];
        const s = pick(scenarios);
        const answer = type === "domain" ? s.domain : s.range;
        const exp = type === "domain" ? s.dexp : s.rexp;
        const concepts = [
          { q: `What is the domain of a function?`, correct: "The set of all valid input values", wrong: ["The set of all output values", "The slope of the function", "The y-intercept"] },
          { q: `What is the range of a function?`, correct: "The set of all possible output values", wrong: ["The set of all input values", "The x-intercepts", "The maximum value only"] },
          { q: `A function takes the number of days (1–7) as input and outputs the daily high temperature. What is the domain?`, correct: "Whole numbers from 1 to 7", wrong: ["Any real number", "The set of temperatures", "Negative numbers"] },
        ];
        const c = pick(concepts);
        const choices = shuffle([c.correct, ...c.wrong]);
        return {
          question: c.q,
          choices,
          correctIndex: choices.indexOf(c.correct),
          explanation: `${type === "domain" ? "Domain" : "Range"}: ${type === "domain" ? "inputs" : "outputs"}. ${c.correct}.`,
        };
      },
    },
    {
      id: "a1u4-l16", lesson: 16,
      title: "Inverse Functions",
      target: "When I have an equation that defines a linear function, I know how to find its inverse.",
      generate() {
        const a = pick([2, 3, 4, 5]), b = rand(-8, 8);
        // f(x) = ax + b → f⁻¹(x) = (x - b) / a
        const invB = -b;
        const bStr = b === 0 ? "" : b > 0 ? ` − ${b}` : ` + ${-b}`;
        const correct = `f⁻¹(x) = (x${bStr}) / ${a}`;
        const wrong = [
          `f⁻¹(x) = ${a}x${b > 0 ? ` + ${b}` : b < 0 ? ` − ${-b}` : ""}`,
          `f⁻¹(x) = (x${b > 0 ? ` + ${b}` : b < 0 ? ` − ${-b}` : ""}) / ${a}`,
          `f⁻¹(x) = x / ${a}${b !== 0 ? ` + ${b}` : ""}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Find the inverse of f(x) = ${a}x${b >= 0 ? ` + ${b}` : ` − ${-b}`}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Swap x and y: x = ${a}y + ${b}. Subtract ${b}: x − ${b} = ${a}y. Divide by ${a}: y = (x − ${b}) / ${a}.`,
        };
      },
    },
    { id:"a1u4-l1",  lesson:1,  title:"What is a Function?",        target:"I can explain when a relationship between two quantities is a function. I can identify independent and dependent variables." },
    { id:"a1u4-l6",  lesson:6,  title:"Features of Function Graphs", target:"I can identify important features of graphs of functions: intercepts, maximum, minimum." },
    { id:"a1u4-l12", lesson:12, title:"Piecewise Functions",          target:"I can make sense of the rules of a piecewise function and sketch a graph of the function when the rules are given." },
  ],
};
