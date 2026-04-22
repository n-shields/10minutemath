// Unit 6: Coordinate Geometry

const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const sq = n => n * n;
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);

const slopeStr = (rise, run) => {
  const g = gcd(Math.abs(rise), Math.abs(run));
  const rn = rise / g, rd = run / g;
  if (rd === 1) return `${rn}`;
  if (rd === -1) return `${-rn}`;
  return `${rn}/${rd}`;
};

export default {
  id: "geo-u6",
  title: "Coordinate Geometry",
  color: "#0ea5e9",
  topics: [
    {
      id: "u6-l1", lesson: 1,
      title: "Transformations in the Coordinate Plane",
      target: "I can reflect, rotate, and translate figures in the coordinate plane. I can prove triangles are congruent using coordinates.",
      generate() {
        const x = rand(1, 7), y = rand(1, 7);
        const type = pick(["reflect over x-axis", "reflect over y-axis", "translate", "rotate 180°"]);
        let correct, wrong, exp;
        if (type === "reflect over x-axis") {
          correct = `(${x}, ${-y})`;
          wrong = [`(${-x}, ${y})`, `(${-x}, ${-y})`, `(${y}, ${x})`];
          exp = `Reflecting over the x-axis negates y: (${x}, ${y}) → (${x}, ${-y}).`;
        } else if (type === "reflect over y-axis") {
          correct = `(${-x}, ${y})`;
          wrong = [`(${x}, ${-y})`, `(${-x}, ${-y})`, `(${y}, ${x})`];
          exp = `Reflecting over the y-axis negates x: (${x}, ${y}) → (${-x}, ${y}).`;
        } else if (type === "translate") {
          const dx = rand(1, 5), dy = rand(1, 5);
          correct = `(${x + dx}, ${y + dy})`;
          wrong = [`(${x - dx}, ${y - dy})`, `(${x + dx}, ${y - dy})`, `(${x - dx}, ${y + dy})`];
          exp = `Add the vector ⟨${dx}, ${dy}⟩: (${x}+${dx}, ${y}+${dy}) = (${x+dx}, ${y+dy}).`;
          return { question: `Point P(${x}, ${y}) is translated by ⟨${dx}, ${dy}⟩. Where does it land?`, choices: shuffle([correct, ...wrong]), correctIndex: shuffle([correct, ...wrong]).indexOf(correct), explanation: exp };
        } else {
          correct = `(${-x}, ${-y})`;
          wrong = [`(${x}, ${-y})`, `(${-x}, ${y})`, `(${y}, ${-x})`];
          exp = `A 180° rotation about the origin maps (x,y) → (−x, −y): (${x}, ${y}) → (${-x}, ${-y}).`;
        }
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Point P is at (${x}, ${y}). Where does it land after a ${type}?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
        };
      },
    },
    {
      id: "u6-l2", lesson: 2,
      title: "Transformation Notation",
      target: "I can use coordinate transformation notation to take points in the plane as inputs and give other points as outputs.",
      generate() {
        const x = rand(-4, 4), y = rand(-4, 4);
        const rules = [
          { rule: "(x, y) → (−x, y)",   fn: (x,y) => `(${-x}, ${y})`,   exp: "Negate x: reflects over the y-axis." },
          { rule: "(x, y) → (x, −y)",   fn: (x,y) => `(${x}, ${-y})`,   exp: "Negate y: reflects over the x-axis." },
          { rule: "(x, y) → (−x, −y)",  fn: (x,y) => `(${-x}, ${-y})`,  exp: "Negate both: 180° rotation about the origin." },
          { rule: "(x, y) → (y, x)",    fn: (x,y) => `(${y}, ${x})`,    exp: "Swap x and y: reflection over y = x." },
        ];
        const r = pick(rules);
        const correct = r.fn(x, y);
        const wrong = rules.filter(o => o !== r).map(o => o.fn(x, y));
        const choices = shuffle([correct, ...wrong.slice(0, 3)]);
        return {
          question: `Using the rule ${r.rule}, what is the image of (${x}, ${y})?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: r.exp + ` Apply to (${x}, ${y}): ${correct}.`,
        };
      },
    },
    {
      id: "u6-l3", lesson: 3,
      title: "Congruent vs. Similar Transformations",
      target: "I can determine whether a transformation produces congruent or similar images (or neither).",
      generate() {
        const transforms = [
          { t: "rotation of 90°",      result: "Congruent", exp: "Rotations are rigid transformations — they preserve size and shape, so the image is congruent." },
          { t: "reflection over y = x", result: "Congruent", exp: "Reflections are rigid transformations — the image is congruent to the original." },
          { t: "translation by ⟨3, −2⟩", result: "Congruent", exp: "Translations are rigid — every point moves the same distance and direction, preserving size and shape." },
          { t: "dilation by scale factor 2", result: "Similar (not congruent)", exp: "Dilations produce similar but not congruent images (unless the scale factor is 1)." },
          { t: "dilation by scale factor 1", result: "Congruent", exp: "A dilation with scale factor 1 is the identity — the image is identical (congruent)." },
          { t: "horizontal stretch (x doubled, y unchanged)", result: "Neither congruent nor similar", exp: "A non-uniform stretch distorts angles, so the image is neither congruent nor similar." },
        ];
        const s = pick(transforms);
        const choices = shuffle(["Congruent", "Similar (not congruent)", "Neither congruent nor similar", "Always both congruent and similar"]);
        return {
          question: `A figure undergoes a ${s.t}. Is the image congruent to the original, similar but not congruent, or neither?`,
          choices,
          correctIndex: choices.indexOf(s.result),
          explanation: s.exp,
        };
      },
    },
    {
      id: "u6-l4", lesson: 4,
      title: "Equation of a Circle",
      target: "I can derive an equation for a circle in the coordinate plane.",
      generate() {
        const h = rand(-4, 4), k = rand(-4, 4), r = rand(2, 7);
        const r2 = r * r;
        const hs = h === 0 ? "x²" : h > 0 ? `(x − ${h})²` : `(x + ${-h})²`;
        const ks = k === 0 ? "y²" : k > 0 ? `(y − ${k})²` : `(y + ${-k})²`;
        const correct = `${hs} + ${ks} = ${r2}`;
        const wrong = [
          `${hs} + ${ks} = ${r}`,
          h !== 0 || k !== 0 ? `x² + y² = ${r2}` : `(x − 1)² + y² = ${r2}`,
          `${hs} + ${ks} = ${r2 + r}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Write the equation of the circle with center (${h}, ${k}) and radius ${r}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Standard form: (x−h)²+(y−k)²=r². With center (${h},${k}) and r=${r}: ${correct}.`,
        };
      },
    },
    {
      id: "u6-l5", lesson: 5,
      title: "Squared Binomials and Circles",
      target: "I can understand how squared binomials relate to the equation of a circle.",
      generate() {
        const a = rand(-5, 5);
        const type = pick(["expand", "identify"]);
        if (type === "expand") {
          const expanded = a >= 0
            ? `x² − ${2*a}x + ${a*a}`
            : `x² + ${-2*a}x + ${a*a}`;
          const correct = expanded;
          const aStr = a >= 0 ? `(x − ${a})²` : `(x + ${-a})²`;
          const wrong = [
            `x² + ${a*a}`,
            `x² − ${a}x + ${a*a}`,
            `x² − ${2*a}x + ${2*a*a}`,
          ];
          const choices = shuffle([correct, ...wrong]);
          return {
            question: `Expand ${aStr}.`,
            choices,
            correctIndex: choices.indexOf(correct),
            explanation: `(x − ${a})² = x² − 2(${a})x + ${a}² = x² − ${2*a}x + ${a*a}.`,
          };
        } else {
          // identify center from factored form
          const h = rand(-5, 5), k = rand(-5, 5), r = rand(1, 6);
          const r2 = sq(r);
          const hs = h === 0 ? "x²" : h > 0 ? `(x − ${h})²` : `(x + ${-h})²`;
          const ks = k === 0 ? "y²" : k > 0 ? `(y − ${k})²` : `(y + ${-k})²`;
          const correct = `(${h}, ${k})`;
          const wrong = [`(${-h}, ${-k})`, `(${h}, ${-k})`, `(${-h}, ${k})`];
          const choices = shuffle([correct, ...wrong]);
          return {
            question: `What is the center of the circle ${hs} + ${ks} = ${r2}?`,
            choices,
            correctIndex: choices.indexOf(correct),
            explanation: `In (x−h)²+(y−k)²=r², the center is (h,k). Read the signs carefully: center = (${h}, ${k}).`,
          };
        }
      },
    },
    {
      id: "u6-l6", lesson: 6,
      title: "Completing the Square",
      target: "I can complete the square to find the center and radius of a circle.",
      generate() {
        const h = rand(-4, 4), k = rand(-4, 4), r = rand(2, 6);
        // Expanded: x²−2hx+h²+y²−2ky+k²=r²
        // Written as: x²+bx+y²+cy=d  where b=−2h, c=−2k, d=r²−h²−k²
        const b = -2 * h, c = -2 * k, d = sq(r) - sq(h) - sq(k);
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}x` : ` − ${-b}x`;
        const cStr = c === 0 ? "" : c > 0 ? ` + ${c}y` : ` − ${-c}y`;
        const eq = `x²${bStr} + y²${cStr} = ${d}`;
        const correct = `Center (${h}, ${k}), radius ${r}`;
        const wrong = [
          `Center (${-h}, ${-k}), radius ${r}`,
          `Center (${h}, ${k}), radius ${sq(r)}`,
          `Center (${b/2}, ${c/2}), radius ${r}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Complete the square to find the center and radius of: ${eq}`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Group and complete the square: (x${b>0?` − ${b/2}`:b<0?` + ${-b/2}`:""})² + (y${c>0?` − ${c/2}`:c<0?` + ${-c/2}`:""})² = ${sq(r)}. Center (${h},${k}), radius ${r}.`,
        };
      },
    },
    {
      id: "u6-l7", lesson: 7,
      title: "Definition of a Parabola",
      target: "I know that a parabola is the set of points equidistant from a given point and line.",
      generate() {
        const p = rand(1, 4);
        // focus (0,p), directrix y = -p  ⟹  vertex (0,0)
        const px = rand(-3, 3);
        const py = (sq(px)) / (4 * p); // point on parabola
        const distFocus = Math.sqrt(sq(px) + sq(py - p));
        const distDir   = Math.abs(py + p);
        const scenarios = [
          {
            q: `A parabola has focus (0, ${p}) and directrix y = ${-p}. Which describes every point on the parabola?`,
            correct: `Equidistant from (0, ${p}) and the line y = ${-p}`,
            wrong: [
              `Equidistant from the origin and (0, ${p})`,
              `The set of points at distance ${p} from the origin`,
              `Equidistant from (0, ${p}) and (0, ${-p})`,
            ],
            exp: `By definition, a parabola is the set of all points equidistant from the focus (0, ${p}) and the directrix y = ${-p}.`,
          },
          {
            q: `The focus of a parabola is (0, ${p}) and the directrix is y = ${-p}. What is the vertex?`,
            correct: `(0, 0)`,
            wrong: [`(0, ${p})`, `(0, ${-p})`, `(${p}, 0)`],
            exp: `The vertex is halfway between the focus and directrix: midpoint of y = ${p} and y = ${-p} is y = 0. Vertex = (0, 0).`,
          },
          {
            q: `A parabola has focus (0, ${p}) and directrix y = ${-p}. The value of p (focal length) is:`,
            correct: `${p}`,
            wrong: [`${2*p}`, `${p/2}`, `${-p}`],
            exp: `p is the distance from the vertex to the focus (or vertex to directrix). Here p = ${p}.`,
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
      id: "u6-l8", lesson: 8,
      title: "Equation of a Parabola",
      target: "I can derive an equation for a parabola in the coordinate plane given a focus and a directrix.",
      generate() {
        const p = rand(1, 5);
        const type = pick(["vertical-up", "vertical-down"]);
        // vertical parabola: x² = 4py  (opens up if p>0)
        const r2 = 4 * p;
        let focusStr, dirStr, correct, wrong, exp;
        if (type === "vertical-up") {
          focusStr = `(0, ${p})`;
          dirStr = `y = ${-p}`;
          correct = `x² = ${r2}y`;
          wrong = [`x² = ${p}y`, `y² = ${r2}x`, `x² = ${-r2}y`];
          exp = `With focus (0,${p}) and directrix y = ${-p}, the equation is x² = 4py = ${r2}y.`;
        } else {
          focusStr = `(0, ${-p})`;
          dirStr = `y = ${p}`;
          correct = `x² = ${-r2}y`;
          wrong = [`x² = ${r2}y`, `x² = ${-p}y`, `y² = ${-r2}x`];
          exp = `With focus (0,${-p}) and directrix y = ${p}, the parabola opens downward: x² = −${r2}y.`;
        }
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A parabola has focus ${focusStr} and directrix ${dirStr}. What is its equation?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: exp,
        };
      },
    },
    {
      id: "u6-l9", lesson: 9,
      title: "Point-Slope Form",
      target: "I can use the definition of slope to write the equation for a line in point-slope form.",
      generate() {
        const x1 = rand(-5, 5), y1 = rand(-5, 5);
        const rise = pick([-3, -2, -1, 1, 2, 3]);
        const run  = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
        const m = slopeStr(rise, run);

        const xPart = x1 === 0 ? "x" : x1 > 0 ? `(x − ${x1})` : `(x + ${-x1})`;
        const correct = `y − ${y1} = ${m}${xPart}`;
        const wrong = [
          `y − ${y1} = ${m}${x1 === 0 ? "x" : x1 > 0 ? `(x + ${x1})` : `(x − ${-x1})`}`,
          `y + ${y1} = ${m}${xPart}`,
          `y − ${x1} = ${m}${y1 === 0 ? "x" : y1 > 0 ? `(x − ${y1})` : `(x + ${-y1})`}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Write the point-slope equation of the line through (${x1}, ${y1}) with slope ${m}.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Point-slope form: y − y₁ = m(x − x₁). Substitute: ${correct}.`,
        };
      },
    },
    {
      id: "u6-l10", lesson: 10,
      title: "Parallel Lines",
      target: "I can prove that the slopes of parallel lines are equal. I can use slopes of parallel lines to solve problems.",
      generate() {
        const rise = pick([-3, -2, -1, 1, 2, 3]);
        const run  = pick([-4, -3, -2, -1, 1, 2, 3, 4]);
        const m = slopeStr(rise, run);
        const correct = m;
        const g = gcd(Math.abs(rise), Math.abs(run));
        const rn = rise/g, rd = run/g;
        const wrong = [
          rd === 1 ? `${-rn}` : `${-rn}/${rd}`,
          rd === 1 ? `${rd}` : `${rd}/${rn}`,
          rd === 1 ? `${-rd}` : `${-rd}/${rn}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A line has slope ${m}. What is the slope of a line parallel to it?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Parallel lines have equal slopes. The slope is also ${m}.`,
        };
      },
    },
    {
      id: "u6-l11", lesson: 11,
      title: "Perpendicular Lines",
      target: "I can prove that the slopes of perpendicular lines are opposite reciprocals. I can use slopes of perpendicular lines to solve problems.",
      generate() {
        const rise = pick([-3, -2, -1, 1, 2, 3]);
        const run  = pick([-4, -3, -2, 2, 3, 4]);
        const m = slopeStr(rise, run);
        // perpendicular slope: negative reciprocal
        const g = gcd(Math.abs(rise), Math.abs(run));
        const rn = rise/g, rd = run/g;
        const perpRise = -rd, perpRun = rn;
        const correct = slopeStr(perpRise, perpRun);
        const wrong = [
          m,
          slopeStr(-rn, rd),
          slopeStr(rd, rn),
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A line has slope ${m}. What is the slope of a perpendicular line?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `Perpendicular slopes are negative reciprocals. The negative reciprocal of ${m} is ${correct}.`,
        };
      },
    },
    {
      id: "u6-l12", lesson: 12,
      title: "Writing Equations of Lines",
      target: "I can gather information about a line and write its equation.",
      generate() {
        const m = pick([-3, -2, -1, 1, 2, 3]);
        const b = rand(-6, 6);
        const x1 = rand(-4, 4);
        const y1 = m * x1 + b;
        const bStr = b === 0 ? "" : b > 0 ? ` + ${b}` : ` − ${-b}`;
        const correct = `y = ${m}x${bStr}`;
        const wrong = [
          `y = ${m}x${b !== 0 ? (b > 0 ? ` − ${b}` : ` + ${-b}`) : " + 1"}`,
          `y = ${-m}x${bStr}`,
          `y = ${m}x${b !== 0 ? (b > 0 ? ` + ${b + 1}` : ` − ${-b + 1}`) : " + 2"}`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `A line passes through (${x1}, ${y1}) with slope ${m}. Write it in slope-intercept form.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `y − ${y1} = ${m}(x − ${x1})  →  y = ${m}x + ${b}  →  ${correct}.`,
        };
      },
    },
    {
      id: "u6-l13", lesson: 13,
      title: "Intersection of a Line and Circle",
      target: "I can use a graph to find the intersection points of a line and a circle.",
      generate() {
        // Simple cases: circle centered at origin, horizontal/vertical lines
        const r = pick([3, 4, 5]);
        const scenarios = [
          {
            q: `The circle x² + y² = ${sq(r)} and the line y = 0 (x-axis). How many intersection points are there?`,
            correct: "2",
            wrong: ["0", "1", "Infinitely many"],
            exp: `Substitute y = 0: x² = ${sq(r)}, so x = ±${r}. Two intersection points: (${r}, 0) and (${-r}, 0).`,
          },
          {
            q: `The circle x² + y² = ${sq(r)} and the line y = ${r + 1}. How many intersection points are there?`,
            correct: "0",
            wrong: ["1", "2", "4"],
            exp: `The line y = ${r+1} is above the circle's top point (0, ${r}), so it doesn't intersect. 0 intersection points.`,
          },
          {
            q: `The circle x² + y² = ${sq(r)} and the tangent line x = ${r}. How many intersection points are there?`,
            correct: "1",
            wrong: ["0", "2", "4"],
            exp: `Substitute x = ${r}: ${sq(r)} + y² = ${sq(r)}, so y = 0. Exactly 1 point: (${r}, 0). It's a tangent.`,
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
      id: "u6-l14", lesson: 14,
      title: "Proving Geometric Theorems with Coordinates",
      target: "I can use coordinates of figures to prove geometric theorems.",
      generate() {
        const scenarios = [
          () => {
            const x1 = rand(1,4), y1 = rand(1,4);
            const run = rand(2,5), rise = rand(1,4);
            const x2 = x1+run, y2 = y1+rise;
            const x3 = x1-rise, y3 = y1+run;
            return {
              q: `A triangle has vertices A(${x1},${y1}), B(${x2},${y2}), C(${x3},${y3}). The slopes of AB and AC have a product of −1. What does this prove?`,
              correct: "The triangle has a right angle at A",
              wrong: ["The triangle is equilateral","The triangle is isosceles","AB and AC are parallel"],
              exp: `When two lines have slopes whose product is −1, they are perpendicular. So AB ⊥ AC, meaning the angle at A is 90°.`,
            };
          },
          () => {
            const a = rand(2,6);
            return {
              q: `A quadrilateral has vertices (0,0), (${a},0), (${a},${a}), (0,${a}). What can you conclude?`,
              correct: "It is a square",
              wrong: ["It is a rectangle but not a square","It is a rhombus but not a square","It is a parallelogram only"],
              exp: `All four sides have length ${a} (equal) and all angles are 90° (perpendicular adjacent sides). It is a square.`,
            };
          },
          () => {
            const a = rand(2,5), b = rand(2,5);
            return {
              q: `A quadrilateral has vertices (0,0), (${2*a},0), (${2*a+b},${b}), (${b},${b}). What type is it?`,
              correct: "Parallelogram",
              wrong: ["Square","Rectangle","Trapezoid"],
              exp: `Both pairs of opposite sides are parallel (same slope). It is a parallelogram.`,
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
      id: "u6-l15", lesson: 15,
      title: "Partitioning a Line Segment",
      target: "I can calculate the coordinates of a point on a line segment that partitions the segment in a given ratio.",
      generate() {
        const x1 = rand(-4, 4), y1 = rand(-4, 4);
        const x2 = rand(-4, 4), y2 = rand(-4, 4);
        const [m, n] = pick([[1,1],[1,2],[1,3],[2,1],[3,1]]);
        const t = m / (m + n);
        const px = x1 + t * (x2 - x1);
        const py = y1 + t * (y2 - y1);
        const fmtV = v => Number.isInteger(v) ? `${v}` : `${+(v.toFixed(1))}`;
        const correct = `(${fmtV(px)}, ${fmtV(py)})`;
        const t2 = 1 - t;
        const wrong = [
          `(${fmtV((x1+x2)/2)}, ${fmtV((y1+y2)/2)})`,
          `(${fmtV(x1 + t2*(x2-x1))}, ${fmtV(y1 + t2*(y2-y1))})`,
          `(${fmtV(px+1)}, ${fmtV(py)})`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0,3)]);
        return {
          question: `Find the point that divides the segment from (${x1},${y1}) to (${x2},${y2}) in a ${m}:${n} ratio from the first point.`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `P = (x₁ + ${m}/(${m+n})·Δx, y₁ + ${m}/(${m+n})·Δy) = (${fmtV(px)}, ${fmtV(py)}).`,
        };
      },
    },
    {
      id: "u6-l16", lesson: 16,
      title: "Centroid",
      target: "I can determine the point where the medians of a triangle intersect.",
      generate() {
        const x1 = rand(-4,4), y1 = rand(-4,4);
        const x2 = rand(-4,4), y2 = rand(-4,4);
        const x3 = rand(-4,4), y3 = rand(-4,4);
        const cx = (x1+x2+x3)/3, cy = (y1+y2+y3)/3;
        const fmtV = v => Number.isInteger(v) ? `${v}` : `${+(v.toFixed(2))}`;
        const correct = `(${fmtV(cx)}, ${fmtV(cy)})`;
        const wrong = [
          `(${fmtV((x1+x2)/2)}, ${fmtV((y1+y2)/2)})`,
          `(${fmtV(cx+1)}, ${fmtV(cy)})`,
          `(${fmtV((x1+x3)/2)}, ${fmtV((y1+y3)/2)})`,
        ].filter(w => w !== correct);
        const choices = shuffle([correct, ...wrong.slice(0,3)]);
        return {
          question: `Triangle has vertices A(${x1},${y1}), B(${x2},${y2}), C(${x3},${y3}). Where do the medians intersect (centroid)?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `The centroid is the average of the vertices: ((${x1}+${x2}+${x3})/3, (${y1}+${y2}+${y3})/3) = (${fmtV(cx)}, ${fmtV(cy)}).`,
        };
      },
    },
    {
      id: "u6-l17", lesson: 17,
      title: "Orthocenter",
      target: "I can determine the point where the altitudes of a triangle intersect.",
      generate() {
        // Use a right triangle so orthocenter = right-angle vertex (clean answer)
        const x1 = rand(-3,3), y1 = rand(-3,3);
        const run = pick([2,3,4,-2,-3,-4]);
        const rise = pick([2,3,-2,-3]);
        const x2 = x1+run, y2 = y1;        // horizontal leg
        const x3 = x1, y3 = y1+rise;       // vertical leg
        const correct = `(${x1}, ${y1})`;
        const wrong = [
          `(${(x1+x2+x3)/3}, ${(y1+y2+y3)/3})`,
          `(${x2}, ${y3})`,
          `(${(x1+x2)/2}, ${(y1+y3)/2})`,
        ];
        const choices = shuffle([correct, ...wrong]);
        return {
          question: `Triangle has vertices A(${x1},${y1}), B(${x2},${y2}), C(${x3},${y3}). This is a right triangle. Where do the altitudes meet (orthocenter)?`,
          choices,
          correctIndex: choices.indexOf(correct),
          explanation: `In a right triangle, the orthocenter is at the vertex of the right angle. AB is horizontal and AC is vertical, so the right angle is at A(${x1},${y1}).`,
        };
      },
    },
  ],
};
