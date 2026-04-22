// Algebra 1 Unit 5: Introduction to Exponential Functions
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u5", title: "Introduction to Exponential Functions", color: "#10b981",
  topics: [
    {
      id: "a1u5-l3", lesson: 3,
      title: "Exponential Growth Equations",
      target: "I can write and interpret an equation that represents exponential growth.",
      generate() {
        const a = pick([100, 200, 500, 1000]);
        const b = pick([2, 3, 1.5]);
        const x = rand(2, 4);
        const result = a * Math.pow(b, x);
        const correct = `${result}`;
        const wrong = [`${a * b * x}`, `${a + b * x}`, `${a * Math.pow(b, x - 1)}`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A population starts at ${a} and triples each year. What is the population after ${x} years? (y = ${a} · ${b}ˣ)`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `y = ${a} · ${b}^${x} = ${a} · ${Math.pow(b, x)} = ${result}.`,
        };
      },
    },
    {
      id: "a1u5-l5", lesson: 5,
      title: "Exponential Decay",
      target: "I can find a growth factor from a graph and write an equation to represent exponential decay.",
      generate() {
        const a = pick([1000, 800, 500]);
        const pct = pick([10, 20, 25]);
        const b = (100 - pct) / 100;
        const x = rand(1, 4);
        const result = +(a * Math.pow(b, x)).toFixed(2);
        const bStr = b.toString();
        const correct = `${result}`;
        const wrong = [`${a - pct * x}`, `${+(a * Math.pow(b, x + 1)).toFixed(2)}`, `${+(a * Math.pow(1 + pct/100, x)).toFixed(2)}`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A car worth $${a} loses ${pct}% of its value each year. What is it worth after ${x} year(s)? (y = ${a} · ${bStr}ˣ)`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Decay factor = 1 − ${pct/100} = ${b}. y = ${a} · ${b}^${x} = $${result}.`,
        };
      },
    },
    {
      id: "a1u5-l14", lesson: 14,
      title: "Percent Increase and Decrease",
      target: "I can find the result of applying a percent increase or decrease on a quantity.",
      generate() {
        const start = rand(100, 500);
        const pct = pick([5, 10, 15, 20, 25, 50]);
        const type = pick(["increase", "decrease"]);
        const result = type === "increase" ? start * (1 + pct / 100) : start * (1 - pct / 100);
        const correct = `${result}`;
        const factor = type === "increase" ? `1 + ${pct/100} = ${1 + pct/100}` : `1 − ${pct/100} = ${1 - pct/100}`;
        const wrong = [
          `${type === "increase" ? start - start * pct / 100 : start + start * pct / 100}`,
          `${start + pct}`,
          `${result + rand(5, 20)}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A price of $${start} ${type === "increase" ? "increases" : "decreases"} by ${pct}%. What is the new price?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Multiply by ${factor}: $${start} × ${type === "increase" ? 1 + pct/100 : 1 - pct/100} = $${result}.`,
        };
      },
    },
    {
      id: "a1u5-l17", lesson: 17,
      title: "Compound Interest",
      target: "I can calculate interest when I know the starting balance, interest rate, and compounding intervals.",
      generate() {
        const P = pick([1000, 2000, 5000]);
        const r = pick([2, 4, 5, 6]) / 100;
        const n = pick([1, 4, 12]);
        const t = rand(1, 3);
        const nLabel = { 1: "annually", 4: "quarterly", 12: "monthly" }[n];
        const A = +(P * Math.pow(1 + r / n, n * t)).toFixed(2);
        const correct = `$${A}`;
        const wrong = [
          `$${+(P * (1 + r * t)).toFixed(2)}`,
          `$${+(P * Math.pow(1 + r, t)).toFixed(2)}`,
          `$${+(A + rand(5, 50)).toFixed(2)}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `$${P} is invested at ${r * 100}% interest compounded ${nLabel} for ${t} year(s). Use A = P(1 + r/n)^(nt). What is the balance?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `A = ${P}(1 + ${r}/${n})^(${n}·${t}) = ${P}(${(1 + r/n).toFixed(4)})^${n*t} ≈ $${A}.`,
        };
      },
    },
    {
      id: "a1u5-l10", lesson: 10,
      title: "Average Rate of Change: Exponential vs. Linear",
      target: "I know how the average rate of change of an exponential function differs from that of a linear function.",
      generate() {
        const a = pick([100, 200]), b = pick([2, 3]);
        const x1 = 0, x2 = rand(2, 4);
        const y1 = a, y2 = a * Math.pow(b, x2);
        const arc = +((y2 - y1) / (x2 - x1)).toFixed(1);
        const correct = `${arc} per unit`;
        const wrong = [`${b} per unit`, `${a} per unit`, `${arc * 2} per unit`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `For f(x) = ${a} · ${b}^x, find the average rate of change from x = ${x1} to x = ${x2}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `ARC = (f(${x2}) − f(${x1})) / (${x2} − ${x1}) = (${y2} − ${y1}) / ${x2} ≈ ${arc} per unit.`,
        };
      },
    },
    { id:"a1u5-l2",  lesson:2,  title:"Linear vs. Exponential",    target:"I can use words and expressions to describe patterns in tables of values, for both linear and exponential relationships." },
    { id:"a1u5-l12", lesson:12, title:"Transforming Exponentials",  target:"I can describe the effect of changing a and b on a graph that represents f(x) = a·bˣ." },
    { id:"a1u5-l19", lesson:19, title:"Comparing Growth Long-Term", target:"I can use tables, calculations, and graphs to compare growth rates of linear and exponential functions." },
  ],
};
