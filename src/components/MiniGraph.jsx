import "./MiniGraph.css";

const W = 220, H = 165, PAD = 22;

// ── coordinate helpers ───────────────────────────────────────────────────────
function px(x, xMin, xMax) {
  return PAD + (x - xMin) / (xMax - xMin) * (W - 2 * PAD);
}
function py(y, yMin, yMax) {
  return H - PAD - (y - yMin) / (yMax - yMin) * (H - 2 * PAD);
}

// ── grid + axes ──────────────────────────────────────────────────────────────
function Grid({ xMin, xMax, yMin, yMax }) {
  const els = [];
  const xSpan = xMax - xMin, ySpan = yMax - yMin;
  const xStep = xSpan <= 8 ? 1 : 2;
  const yStep = ySpan <= 8 ? 1 : 2;

  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax + 0.01; x += xStep)
    els.push(<line key={`gx${x}`} x1={px(x,xMin,xMax)} y1={PAD} x2={px(x,xMin,xMax)} y2={H-PAD}
      stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>);

  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax + 0.01; y += yStep)
    els.push(<line key={`gy${y}`} x1={PAD} y1={py(y,yMin,yMax)} x2={W-PAD} y2={py(y,yMin,yMax)}
      stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>);

  if (xMin <= 0 && 0 <= xMax)
    els.push(<line key="ya" x1={px(0,xMin,xMax)} y1={PAD-4} x2={px(0,xMin,xMax)} y2={H-PAD+4}
      stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>);
  if (yMin <= 0 && 0 <= yMax)
    els.push(<line key="xa" x1={PAD-4} y1={py(0,yMin,yMax)} x2={W-PAD+4} y2={py(0,yMin,yMax)}
      stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>);

  // sparse labels
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    if (x === 0 || x % xStep !== 0) continue;
    const yAxis = yMin <= 0 && 0 <= yMax ? 0 : yMin;
    els.push(<text key={`lx${x}`} x={px(x,xMin,xMax)} y={py(yAxis,yMin,yMax)+11}
      textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">{x}</text>);
  }
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    if (y === 0 || y % yStep !== 0) continue;
    const xAxis = xMin <= 0 && 0 <= xMax ? 0 : xMax;
    els.push(<text key={`ly${y}`} x={px(xAxis,xMin,xMax)+6} y={py(y,yMin,yMax)+3}
      fontSize="8" fill="rgba(255,255,255,0.4)">{y}</text>);
  }
  return <>{els}</>;
}

// ── clip a line y=mx+b to the viewport box ───────────────────────────────────
function clipLine(m, b, xMin, xMax, yMin, yMax) {
  const cands = [[xMin, m*xMin+b], [xMax, m*xMax+b]];
  if (Math.abs(m) > 0.0001) {
    cands.push([(yMin-b)/m, yMin], [(yMax-b)/m, yMax]);
  }
  const inside = cands.filter(([x,y]) =>
    x >= xMin-0.01 && x <= xMax+0.01 && y >= yMin-0.01 && y <= yMax+0.01);
  if (inside.length < 2) return null;
  inside.sort((a, z) => a[0] - z[0]);
  return [inside[0], inside[inside.length-1]];
}

// ── Line graph ───────────────────────────────────────────────────────────────
function LineGraph({ m, b, xRange, yRange, label }) {
  const [xMin, xMax] = xRange || [-6, 6];
  const yMin0 = m*xMin+b, yMax0 = m*xMax+b;
  const yPad = Math.abs(yMax0 - yMin0) * 0.3 || 2;
  const [yMin, yMax] = yRange || [Math.min(yMin0,yMax0)-yPad, Math.max(yMin0,yMax0)+yPad];
  const pts = clipLine(m, b, xMin, xMax, yMin, yMax);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}/>
      {pts && <line x1={px(pts[0][0],xMin,xMax)} y1={py(pts[0][1],yMin,yMax)}
        x2={px(pts[1][0],xMin,xMax)} y2={py(pts[1][1],yMin,yMax)}
        stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round"/>}
      {label && <text x={W-PAD-2} y={PAD+12} textAnchor="end" fontSize="10" fill="#818cf8">{label}</text>}
    </svg>
  );
}

// ── Two-lines graph ──────────────────────────────────────────────────────────
const LINE_COLORS = ["#818cf8", "#f59e0b", "#34d399"];

function TwoLinesGraph({ lines, xRange, yRange, intersection }) {
  const [xMin, xMax] = xRange || [-6, 6];
  const [yMin, yMax] = yRange || [-6, 6];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}/>
      {lines.map((l, i) => {
        const pts = clipLine(l.m, l.b, xMin, xMax, yMin, yMax);
        if (!pts) return null;
        return <line key={i}
          x1={px(pts[0][0],xMin,xMax)} y1={py(pts[0][1],yMin,yMax)}
          x2={px(pts[1][0],xMin,xMax)} y2={py(pts[1][1],yMin,yMax)}
          stroke={LINE_COLORS[i]} strokeWidth="2.5" strokeLinecap="round"/>;
      })}
      {intersection && (
        <circle cx={px(intersection[0],xMin,xMax)} cy={py(intersection[1],yMin,yMax)}
          r="4" fill="#fff" stroke="#1e293b" strokeWidth="1.5"/>
      )}
    </svg>
  );
}

// ── Parabola graph ───────────────────────────────────────────────────────────
function ParabolaGraph({ a, h, k, roots, xRange, yRange }) {
  const spread = Math.max(3, roots ? Math.abs(roots[1]-roots[0])*0.7 : 3);
  const [xMin, xMax] = xRange || [h - spread - 1, h + spread + 1];
  const yAtEdges = [a*(xMin-h)**2+k, a*(xMax-h)**2+k, k];
  const yMinRaw = Math.min(...yAtEdges), yMaxRaw = Math.max(...yAtEdges);
  const yPad = Math.max(1, (yMaxRaw-yMinRaw)*0.15);
  const [yMin, yMax] = yRange || [yMinRaw-yPad, yMaxRaw+yPad];

  const steps = 60;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (xMax-xMin)*i/steps;
    const y = a*(x-h)**2+k;
    if (y >= yMin-0.01 && y <= yMax+0.01)
      points.push(`${px(x,xMin,xMax)},${py(y,yMin,yMax)}`);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}/>
      <polyline points={points.join(" ")} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinejoin="round"/>
      {roots && roots.map((r, i) => (
        <circle key={i} cx={px(r,xMin,xMax)} cy={py(0,yMin,yMax)}
          r="4" fill="#818cf8" stroke="#1e293b" strokeWidth="1.5"/>
      ))}
      {/* vertex dot */}
      <circle cx={px(h,xMin,xMax)} cy={py(k,yMin,yMax)}
        r="4" fill="#f59e0b" stroke="#1e293b" strokeWidth="1.5"/>
    </svg>
  );
}

// ── Circle graph ─────────────────────────────────────────────────────────────
function CircleGraph({ h, k, r }) {
  const pad = r * 0.4 + 1;
  const xMin = h - r - pad, xMax = h + r + pad;
  const yMin = k - r - pad, yMax = k + r + pad;
  const cx = px(h, xMin, xMax), cy = py(k, yMin, yMax);
  const rx = (W - 2*PAD) / (xMax - xMin) * r;
  const ry = (H - 2*PAD) / (yMax - yMin) * r;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}/>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
        fill="rgba(99,102,241,0.12)" stroke="#818cf8" strokeWidth="2.5"/>
      <circle cx={cx} cy={cy} r="3.5" fill="#f59e0b" stroke="#1e293b" strokeWidth="1.5"/>
      {/* radius label */}
      <line x1={cx} y1={cy} x2={cx+rx} y2={cy} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x={cx + rx/2} y={cy-5} textAnchor="middle" fontSize="9" fill="#f59e0b">r={r}</text>
    </svg>
  );
}

// ── Number line ──────────────────────────────────────────────────────────────
function NumberLine({ value, op, min, max }) {
  const lo = min ?? Math.min(value - 4, -2);
  const hi = max ?? Math.max(value + 4, value + 3);
  const svgMin = lo - 0.5, svgMax = hi + 0.5;
  const toX = v => PAD + (v - svgMin) / (svgMax - svgMin) * (W - 2*PAD);
  const midY = H / 2;

  const shade = ["<", "≤"].includes(op)
    ? { x1: PAD, x2: toX(value) }
    : { x1: toX(value), x2: W - PAD };
  const open = op === "<" || op === ">";
  const ticks = [];
  for (let v = Math.ceil(lo); v <= hi; v++) {
    ticks.push(
      <g key={v}>
        <line x1={toX(v)} y1={midY-5} x2={toX(v)} y2={midY+5} stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <text x={toX(v)} y={midY+16} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">{v}</text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      {/* shaded region */}
      <rect x={shade.x1} y={midY-6} width={shade.x2-shade.x1} height={12}
        fill="rgba(99,102,241,0.25)" rx="3"/>
      {/* line */}
      <line x1={PAD} y1={midY} x2={W-PAD} y2={midY} stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
      {/* arrows */}
      <polygon points={`${PAD-1},${midY} ${PAD+6},${midY-4} ${PAD+6},${midY+4}`} fill="rgba(255,255,255,0.35)"/>
      <polygon points={`${W-PAD+1},${midY} ${W-PAD-6},${midY-4} ${W-PAD-6},${midY+4}`} fill="rgba(255,255,255,0.35)"/>
      {ticks}
      {/* boundary point */}
      {open
        ? <circle cx={toX(value)} cy={midY} r="6" fill="none" stroke="#818cf8" strokeWidth="2.5"/>
        : <circle cx={toX(value)} cy={midY} r="6" fill="#818cf8" stroke="#1e293b" strokeWidth="1.5"/>}
    </svg>
  );
}

// ── Exponential graph ────────────────────────────────────────────────────────
function ExponentialGraph({ a, b, xRange }) {
  const [xMin, xMax] = xRange || [0, 5];
  const yVals = Array.from({length: 40}, (_, i) => a * Math.pow(b, xMin + (xMax-xMin)*i/39));
  const yMax = Math.min(Math.max(...yVals) * 1.15, a * Math.pow(b, xMax) * 1.2);
  const yMin = Math.min(0, ...yVals) - yMax * 0.05;

  const points = [];
  for (let i = 0; i <= 60; i++) {
    const x = xMin + (xMax-xMin)*i/60;
    const y = a * Math.pow(b, x);
    if (y >= yMin && y <= yMax)
      points.push(`${px(x,xMin,xMax)},${py(y,yMin,yMax)}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mg-svg">
      <Grid xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}/>
      <polyline points={points.join(" ")} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main dispatcher ───────────────────────────────────────────────────────────
export default function MiniGraph({ graph }) {
  if (!graph) return null;
  switch (graph.type) {
    case "line":        return <LineGraph        {...graph}/>;
    case "twolines":    return <TwoLinesGraph    {...graph}/>;
    case "parabola":    return <ParabolaGraph    {...graph}/>;
    case "circle":      return <CircleGraph      {...graph}/>;
    case "numberline":  return <NumberLine       {...graph}/>;
    case "exponential": return <ExponentialGraph {...graph}/>;
    default:            return null;
  }
}
