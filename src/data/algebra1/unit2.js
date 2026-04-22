// Algebra 1 Unit 2: Equations, Inequalities, and Systems
const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default {
  id: "alg1-u2", title: "Equations, Inequalities, and Systems", color: "#8b5cf6",
  topics: [
    {
      id: "a1u2-l4", lesson: 4,
      title: "Solving One-Variable Equations",
      target: "I can find solutions to equations by reasoning about a situation or by using algebra.",
      generate() {
        const x = rand(1, 10);
        const a = rand(2, 8), b = rand(1, 20), c = rand(1, 8);
        // ax + b = cx + d  → solve for x
        const d = a * x + b - c * x;
        const lhs = `${a}x + ${b}`;
        const rhs = `${c}x + ${d}`;
        const correct = `x = ${x}`;
        const wrong = [`x = ${x + 1}`, `x = ${x - 1}`, `x = ${-x}`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Solve for x: ${lhs} = ${rhs}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Subtract ${c}x from both sides: ${a-c}x + ${b} = ${d}. Subtract ${b}: ${a-c}x = ${d-b}. Divide: x = ${x}.`,
        };
      },
    },
    {
      id: "a1u2-l8", lesson: 8,
      title: "Solving for a Variable",
      target: "Given an equation, I can solve for a particular variable.",
      generate() {
        const formulas = [
          { eq: "A = lw", solveFor: "l", answer: "l = A / w", wrong: ["l = A - w", "l = Aw", "l = w / A"], exp: "Divide both sides by w: l = A / w." },
          { eq: "P = 2l + 2w", solveFor: "l", answer: "l = (P − 2w) / 2", wrong: ["l = P − 2w", "l = P / 2 − w", "l = (P + 2w) / 2"], exp: "Subtract 2w: P − 2w = 2l. Divide by 2: l = (P − 2w) / 2." },
          { eq: "y = mx + b", solveFor: "m", answer: "m = (y − b) / x", wrong: ["m = y / x + b", "m = (y + b) / x", "m = y − b − x"], exp: "Subtract b: y − b = mx. Divide by x: m = (y − b) / x." },
          { eq: "d = rt", solveFor: "t", answer: "t = d / r", wrong: ["t = d − r", "t = dr", "t = r / d"], exp: "Divide both sides by r: t = d / r." },
          { eq: "V = lwh", solveFor: "h", answer: "h = V / (lw)", wrong: ["h = V − lw", "h = lw / V", "h = V / l + w"], exp: "Divide both sides by lw: h = V / (lw)." },
        ];
        const f = pick(formulas);
        const choices = shuffle([f.answer, ...f.wrong]);
        return {
          question: `Solve the formula ${f.eq} for ${f.solveFor}.`,
          choices,
          correctIndex: choices.indexOf(f.answer),
          explanation: f.exp,
        };
      },
    },
    {
      id: "a1u2-l11", lesson: 11,
      title: "Slope and Intercept from ax + by = c",
      target: "I can find the slope and vertical intercept of a line with equation ax + by = c.",
      generate() {
        const a = rand(1, 5), b = rand(1, 5), c = rand(2, 20);
        // ax + by = c → y = (-a/b)x + c/b
        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const g1 = gcd(a, b), g2 = gcd(c, b);
        const mNum = -a/gcd(a,b), mDen = b/gcd(a,b);
        const mStr = mDen === 1 ? `${mNum}` : `${mNum}/${mDen}`;
        const yintNum = c/gcd(c,b), yintDen = b/gcd(c,b);
        const yintStr = yintDen === 1 ? `${yintNum}` : `${yintNum}/${yintDen}`;
        const correct = `slope = ${mStr}, y-intercept = ${yintStr}`;
        const wrong = [
          `slope = ${a}/${b}, y-intercept = ${c}/${b}`,
          `slope = ${mStr}, y-intercept = ${c}`,
          `slope = ${a}, y-intercept = ${c}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Find the slope and y-intercept of: ${a}x + ${b}y = ${c}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Rearrange: ${b}y = −${a}x + ${c}, so y = ${mStr}x + ${yintStr}. Slope = ${mStr}, y-intercept = ${yintStr}.`,
        };
      },
    },
    {
      id: "a1u2-l13", lesson: 13,
      title: "Systems by Substitution",
      target: "I can solve systems of equations by substituting a variable or an expression.",
      generate() {
        const x = rand(1, 6), y = rand(1, 6);
        const a = rand(1, 4), b = rand(1, 4);
        // y = ax + b (first eq, solved for y)
        const rhs = a * x + b;
        if (rhs !== y + (a * x + b - y)) { /* ensure consistent */ }
        // second eq: cx + dy = e
        const c = rand(1, 3), d = rand(1, 3);
        const e = c * x + d * y;
        const correct = `(${x}, ${y})`;
        const wrong = [`(${x+1}, ${y})`, `(${x}, ${y+1})`, `(${-x}, ${y})`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Solve the system:\n  y = ${a}x + ${a*x+b-y}\n  ${c}x + ${d}y = ${e}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Substitute y = ${a}x + ${a*x+b-y} into the second equation and solve for x = ${x}, then y = ${y}.`,
        };
      },
    },
    {
      id: "a1u2-l14", lesson: 14,
      title: "Systems by Elimination",
      target: "I can solve systems of equations by adding or subtracting them to eliminate a variable.",
      generate() {
        const x = rand(1, 6), y = rand(1, 6);
        const a = rand(1, 4), b = rand(1, 4), c = rand(1, 4), d = rand(1, 4);
        const e1 = a * x + b * y;
        const e2 = c * x + d * y;
        const correct = `(${x}, ${y})`;
        const wrong = [`(${x+1}, ${y-1})`, `(${y}, ${x})`, `(${-x}, ${-y})`];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Solve by elimination:\n  ${a}x + ${b}y = ${e1}\n  ${c}x + ${d}y = ${e2}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Multiply equations to match coefficients, then add or subtract to eliminate one variable. Solution: x = ${x}, y = ${y}.`,
        };
      },
    },
    {
      id: "a1u2-l17", lesson: 17,
      title: "Number of Solutions in a System",
      target: "I can tell how many solutions a system has by graphing or analyzing the equations.",
      generate() {
        const type = pick(["one", "none", "infinite"]);
        let eq1, eq2, exp;
        const m = rand(1, 4), b1 = rand(1, 8), b2 = rand(1, 8);
        if (type === "one") {
          eq1 = `y = ${m}x + ${b1}`;
          eq2 = `y = ${m+1}x + ${b1}`;
          exp = `Different slopes (${m} ≠ ${m+1}) → lines intersect at exactly one point.`;
        } else if (type === "none") {
          eq1 = `y = ${m}x + ${b1}`;
          eq2 = `y = ${m}x + ${b1+2}`;
          exp = `Same slope (${m}), different y-intercepts → parallel lines, no solution.`;
        } else {
          eq1 = `y = ${m}x + ${b1}`;
          eq2 = `${2*m}x − 2y = ${-2*b1}`;
          exp = `Both equations describe the same line → infinitely many solutions.`;
        }
        const correct = type === "one" ? "One solution" : type === "none" ? "No solution" : "Infinitely many solutions";
        const wrong = ["One solution", "No solution", "Infinitely many solutions"].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `How many solutions does this system have?\n  ${eq1}\n  ${eq2}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
        };
      },
    },
    {
      id: "a1u2-l19", lesson: 19,
      title: "Solving One-Variable Inequalities",
      target: "I can solve one-variable inequalities and interpret the solutions.",
      generate() {
        const x = rand(1, 8);
        const a = rand(2, 5), b = rand(1, 15);
        const op = pick(["<", ">", "≤", "≥"]);
        const rhs = a * x + b + (op === "<" || op === "≤" ? 1 : -1);
        // ax + b op rhs  → x op (rhs - b)/a
        const sol = (rhs - b) / a;
        const solStr = Number.isInteger(sol) ? `${sol}` : `${(rhs-b)}/${a}`;
        const flipMap = { "<": "<", ">": ">", "≤": "≤", "≥": "≥" };
        const correct = `x ${op} ${solStr}`;
        const wrong = [
          `x ${op === "<" ? ">" : op === ">" ? "<" : op === "≤" ? "≥" : "≤"} ${solStr}`,
          `x ${op} ${+solStr + 1}`,
          `x ${op} ${+solStr - 1}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Solve: ${a}x + ${b} ${op} ${rhs}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Subtract ${b}: ${a}x ${op} ${rhs - b}. Divide by ${a}: x ${op} ${solStr}.`,
        };
      },
    },
    { id:"a1u2-l12", lesson:12, title:"Solving Systems Graphically",     target:"I can use tables and graphs to solve systems of equations." },
    { id:"a1u2-l21", lesson:21, title:"Two-Variable Inequalities",        target:"I can describe the graph that represents the solutions to a linear inequality in two variables." },
    { id:"a1u2-l24", lesson:24, title:"Systems of Inequalities",          target:"I can write a system of inequalities to describe a situation, find the solution by graphing, and interpret points in the solution." },
  ],
};
