// Hand-drawn SVG charts. No chart library: every chart is built from the
// data arrays as plain SVG strings. All charts share the same helpers so the
// axes, labels and colours stay consistent across pages.

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Nice round step for an axis that must reach `max`.
function niceStep(max, steps = 4) {
  const raw = max / steps;
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / power;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * power;
}

// Vertical bar chart. `points` is [{ label, value }]; `format` formats a value.
export function barChart(points, { width = 640, height = 300, format = (v) => String(v), yLabel = '', negative = false } = {}) {
  const padL = 44, padR = 12, padT = 14, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const maxV = Math.max(...points.map((p) => p.value), 0.0001);
  const minV = Math.min(0, ...points.map((p) => p.value));
  const step = niceStep(maxV - minV);
  const top = Math.ceil(maxV / step) * step;
  const bottom = Math.floor(minV / step) * step;
  const scale = (v) => padT + innerH - ((v - bottom) / (top - bottom)) * innerH;
  const slot = innerW / points.length;
  const barW = Math.min(44, slot * 0.6);
  let grid = '';
  for (let v = bottom; v <= top + 1e-9; v += step) {
    const y = scale(v);
    grid += `<line class="grid-line" x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}"/>`;
    grid += `<text class="tick-label" x="${padL - 6}" y="${y + 4}" text-anchor="end">${esc(format(v))}</text>`;
  }
  let bars = '';
  points.forEach((p, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    const zeroY = scale(0);
    const y = p.value >= 0 ? scale(p.value) : zeroY;
    const h = Math.max(1, Math.abs(scale(p.value) - zeroY));
    const cls = p.value < 0 ? 'bar neg' : (i % 2 === 1 ? 'bar alt' : 'bar');
    bars += `<rect class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3"/>`;
    const labelY = p.value >= 0 ? y - 5 : y + h + 12;
    bars += `<text class="value-label" x="${(x + barW / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle">${esc(format(p.value))}</text>`;
    bars += `<text class="tick-label" x="${(x + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle">${esc(p.label)}</text>`;
  });
  const zero = `<line class="axis" x1="${padL}" y1="${scale(0)}" x2="${width - padR}" y2="${scale(0)}"/>`;
  const label = yLabel ? `<text class="tick-label" x="${padL}" y="10">${esc(yLabel)}</text>` : '';
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram batang">${label}${grid}${zero}${bars}</svg>`;
}

// Line chart over years. `points` is [{ label, value }].
export function lineChart(points, { width = 640, height = 300, format = (v) => String(v), yLabel = '', colorClass = '' } = {}) {
  const padL = 48, padR = 16, padT = 18, padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = points.map((p) => p.value);
  let minV = Math.min(...values), maxV = Math.max(...values);
  const pad = (maxV - minV) * 0.2 || 1;
  minV -= pad; maxV += pad;
  const step = niceStep(maxV - minV);
  const lo = Math.floor(minV / step) * step;
  const hi = Math.ceil(maxV / step) * step;
  const x = (i) => padL + (i / (points.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - lo) / (hi - lo)) * innerH;
  let grid = '';
  for (let v = lo; v <= hi + 1e-9; v += step) {
    grid += `<line class="grid-line" x1="${padL}" y1="${y(v)}" x2="${width - padR}" y2="${y(v)}"/>`;
    grid += `<text class="tick-label" x="${padL - 6}" y="${y(v) + 4}" text-anchor="end">${esc(format(v))}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  let dots = '';
  points.forEach((p, i) => {
    dots += `<circle class="dot" cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4"/>`;
    dots += `<text class="value-label" x="${x(i).toFixed(1)}" y="${(y(p.value) - 9).toFixed(1)}" text-anchor="middle">${esc(format(p.value))}</text>`;
    dots += `<text class="tick-label" x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle">${esc(p.label)}</text>`;
  });
  const label = yLabel ? `<text class="tick-label" x="${padL}" y="10">${esc(yLabel)}</text>` : '';
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram garis">${label}${grid}${path ? `<path class="line-path ${colorClass}" d="${path}"/>` : ''}${dots}</svg>`;
}

// Horizontal bar chart, good for ranked lists (provinces, sectors).
export function hbarChart(rows, { width = 640, barHeight = 26, gap = 10, format = (v) => String(v), maxValue = null } = {}) {
  const padL = 170, padR = 64, padT = 6;
  const height = padT + rows.length * (barHeight + gap) + 8;
  const maxV = maxValue ?? Math.max(...rows.map((r) => r.value), 0.0001);
  const innerW = width - padL - padR;
  let out = '';
  rows.forEach((r, i) => {
    const y = padT + i * (barHeight + gap);
    const w = Math.max(2, (r.value / maxV) * innerW);
    out += `<text class="tick-label" x="${padL - 8}" y="${y + barHeight / 2 + 4}" text-anchor="end">${esc(r.label)}</text>`;
    out += `<rect class="bar${r.alt ? ' alt' : ''}" x="${padL}" y="${y}" width="${w.toFixed(1)}" height="${barHeight}" rx="3"/>`;
    out += `<text class="value-label" x="${(padL + w + 6).toFixed(1)}" y="${y + barHeight / 2 + 4}">${esc(format(r.value))}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram batang horizontal">${out}</svg>`;
}

// Donut chart for shares that add to 100.
export function donutChart(slices, { size = 260, format = (v) => v + '%' } = {}) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const colors = ['#17807a', '#e8a13a', '#0b3d3a', '#7fb5b0', '#b97a1d', '#d9e2df'];
  const total = slices.reduce((s, p) => s + p.value, 0) || 1;
  let angle = -Math.PI / 2;
  let paths = '';
  slices.forEach((s, i) => {
    const frac = s.value / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    paths += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"/>`;
    angle = a1;
  });
  const mid = slices[0];
  const legend = slices.map((s, i) =>
    `<div style="display:flex;justify-content:space-between;gap:12px;padding:4px 0;border-bottom:1px solid #e6ebe9"><span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${colors[i % colors.length]};margin-right:6px"></span>${esc(s.label)}</span><strong>${esc(format(s.value))}</strong></div>`
  ).join('');
  return `<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
    <svg class="chart" style="max-width:${size}px;flex:0 0 ${size}px" viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram donat">${paths}<text x="${cx}" y="${cy - 4}" text-anchor="middle" style="font-size:22px;font-weight:800;fill:#0b3d3a">${esc(format(mid.value))}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" style="font-size:11px;fill:#5b6b68">${esc(mid.label)}</text></svg>
    <div style="flex:1;min-width:200px">${legend}</div>
  </div>`;
}
