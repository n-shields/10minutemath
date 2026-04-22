// Algebra 1 Unit 7: Quadratic Equations
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u7", title: "Quadratic Equations", color: "#06b6d4",
  topics: [
    {
      id: "a1u7-l4", lesson: 4,
      title: "Zero Product Property",
      target: "I can find solutions to quadratic equations when one side is a product of factors and the other side is zero.",
      generate() {
        const r1 = rand(-6, 6), r2 = rand(-6, 6);
        const r1Str = r1 >= 0 ? ` − ${r1}` : ` + ${-r1}`;
        const r2Str = r2 >= 0 ? ` − ${r2}` : ` + ${-r2}`;
        const correct = r1 === r2 ? `x = ${r1}` : `x = ${r1} or x = ${r2}`;
        const wrong = [
          `x = ${-r1} or x = ${-r2}`,
          `x = ${r1 + r2}`,
          `x = ${r1 * r2}`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Solve: (x${r1Str})(x${r2Str}) = 0`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Zero product property: set each factor to zero.\nx${r1Str} = 0 → x = ${r1}\nx${r2Str} = 0 → x = ${r2}`,
        };
      },
    },
    {
      id: "a1u7-l6", lesson: 6,
      title: "Factoring x² + bx + c",
      target: "When given quadratic expressions in the form x² + bx + c, I can rewrite them in factored form.",
      generate() {
        const r1 = rand(-6, 6), r2 = rand(-6, 6);
        const b = -(r1 + r2), c = r1 * r2;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}x` : ` − ${-b}x`;
        const cStr = c === 0 ? "" : c > 0 ? ` + ${c}` : ` − ${-c}`;
        const r1Str = r1 >= 0 ? ` − ${r1}` : ` + ${-r1}`;
        const r2Str = r2 >= 0 ? ` − ${r2}` : ` + ${-r2}`;
        const correct = `(x${r1Str})(x${r2Str})`;
        const wrong = [
          `(x + ${r1})(x + ${r2})`,
          `(x${r1Str})(x + ${r2})`,
          `(x − ${r1 + 1})(x − ${r2 - 1})`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Factor: x²${bStr}${cStr}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Find two numbers that multiply to ${c} and add to ${b}: ${-r1} and ${-r2}.\nFactored form: ${correct}.`,
        };
      },
    },
    {
      id: "a1u7-l12", lesson: 12,
      title: "Completing the Square",
      target: "I can solve quadratic equations by completing the square and finding square roots.",
      generate() {
        const h = rand(-5, 5), k = rand(1, 20);
        // (x - h)² = k  →  x = h ± √k
        // Use perfect squares for clean answers
        const kPerfect = pick([1, 4, 9, 16, 25]);
        const sqrtK = Math.sqrt(kPerfect);
        const correct = `x = ${h + sqrtK} or x = ${h - sqrtK}`;
        const wrong = [
          `x = ${h + sqrtK + 1} or x = ${h - sqrtK - 1}`,
          `x = ${h + kPerfect} or x = ${h - kPerfect}`,
          `x = ${h} ± ${kPerfect}`,
        ].filter(w => w !== correct);
        const hStr = h === 0 ? "x²" : h > 0 ? `(x − ${h})²` : `(x + ${-h})²`;
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Solve: ${hStr} = ${kPerfect}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Take square roots of both sides: x − ${h} = ±${sqrtK}.\nx = ${h} + ${sqrtK} = ${h + sqrtK}  or  x = ${h} − ${sqrtK} = ${h - sqrtK}.`,
        };
      },
    },
    {
      id: "a1u7-l16", lesson: 16,
      title: "Quadratic Formula",
      target: "I can use the quadratic formula to solve quadratic equations.",
      generate() {
        // Use integer-solution problems: x = (-b ± √disc) / 2a, pick roots first
        const r1 = rand(-5, 5), r2 = rand(-5, 5);
        const a = 1;
        const b = -(r1 + r2);
        const c = r1 * r2;
        const disc = b * b - 4 * a * c;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}x` : ` − ${-b}x`;
        const cStr = c === 0 ? "" : c > 0 ? ` + ${c}` : ` − ${-c}`;
        const correct = r1 === r2 ? `x = ${r1}` : `x = ${r1} or x = ${r2}`;
        const wrong = [
          `x = ${r1 + 1} or x = ${r2 - 1}`,
          `x = ${-r1} or x = ${-r2}`,
          `x = ${r1 * r2}`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Use the quadratic formula to solve: x²${bStr}${cStr} = 0`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `x = (−${b} ± √(${b}² − 4·${c})) / 2 = (${-b} ± √${disc}) / 2 = (${-b} ± ${Math.sqrt(disc)}) / 2.\nx = ${r1} or x = ${r2}.`,
        };
      },
    },
    {
      id: "a1u7-l22", lesson: 22,
      title: "Standard Form to Vertex Form",
      target: "When given a quadratic expression in standard form, I can rewrite it in vertex form.",
      generate() {
        const h = rand(-4, 4), k = rand(-9, 9);
        // f(x) = (x-h)² + k = x² - 2hx + h² + k
        const b = -2 * h, c = h * h + k;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}x` : ` − ${-b}x`;
        const cStr = c === 0 ? "" : c > 0 ? ` + ${c}` : ` − ${-c}`;
        const hStr = h === 0 ? "x²" : h > 0 ? `(x − ${h})²` : `(x + ${-h})²`;
        const kStr = k === 0 ? "" : k > 0 ? ` + ${k}` : ` − ${-k}`;
        const correct = `${hStr}${kStr}`;
        const wrong = [
          h > 0 ? `(x + ${h})²${kStr}` : `(x − ${-h})²${kStr}`,
          `${hStr}${k > 0 ? ` + ${k+1}` : ` − ${-k+1}`}`,
          `(x − ${h + 1})²${kStr}`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Complete the square to write in vertex form:\nx²${bStr}${cStr}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Half of ${b} is ${b/2}; (${b/2})² = ${(b/2)**2}.\nx²${bStr} + ${(b/2)**2} − ${(b/2)**2}${cStr} = ${hStr} + ${k} = ${correct}.`,
        };
      },
    },
    { id:"a1u7-l9",  lesson:9,  title:"Solving Rearranged Equations", target:"I can rearrange a quadratic equation to factored form = 0 and find the solutions." },
    { id:"a1u7-l10", lesson:10, title:"Factoring when a ≠ 1",         target:"When given ax² + bx + c with a ≠ 1, I can write equivalent expressions in factored form." },
    { id:"a1u7-l17", lesson:17, title:"Quadratic Formula in Context",  target:"I can use the quadratic formula and interpret the solutions in terms of a situation." },
    { id:"a1u7-l20", lesson:20, title:"Rational and Irrational Numbers",target:"I can explain why sums/products of rational numbers are rational, and why rational + irrational is irrational." },
    { id:"a1u7-l23", lesson:23, title:"Maximum/Minimum from Vertex Form",target:"I can find the maximum or minimum of a function by writing the quadratic expression in vertex form." },
  ],
};
