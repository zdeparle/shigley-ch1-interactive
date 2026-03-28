import { useState } from 'react'

const processes = [
  { name: 'Rough turn', tol: 0.030, cost: 30 },
  { name: 'Semi-finish turn', tol: 0.015, cost: 55 },
  { name: 'Finish turn', tol: 0.010, cost: 100 },
  { name: 'Grind', tol: 0.005, cost: 175 },
  { name: 'Hone', tol: 0.001, cost: 400 },
]

export default function CostToleranceViz() {
  const [selectedTol, setSelectedTol] = useState(0.010)

  const svgW = 500
  const svgH = 220
  const pad = { l: 55, r: 30, t: 20, b: 50 }
  const plotW = svgW - pad.l - pad.r
  const plotH = svgH - pad.t - pad.b

  const tolRange = [0.0005, 0.035]
  const costRange = [0, 420]

  const xScale = (t) => pad.l + plotW - ((t - tolRange[0]) / (tolRange[1] - tolRange[0])) * plotW
  const yScale = (c) => pad.t + plotH - ((c - costRange[0]) / (costRange[1] - costRange[0])) * plotH

  // Exponential curve: cost ≈ a * e^(-b*tol)
  const curvePts = 100
  const curvePath = Array.from({ length: curvePts + 1 }, (_, i) => {
    const t = tolRange[0] + (i / curvePts) * (tolRange[1] - tolRange[0])
    const cost = 12 * Math.exp(-t * 120) + 25
    const clampedCost = Math.min(costRange[1], Math.max(costRange[0], cost))
    return `${i === 0 ? 'M' : 'L'}${xScale(t).toFixed(1)},${yScale(clampedCost).toFixed(1)}`
  }).join(' ')

  const interpCost = 12 * Math.exp(-selectedTol * 120) + 25

  const nearestProcess = processes.reduce((best, p) =>
    Math.abs(p.tol - selectedTol) < Math.abs(best.tol - selectedTol) ? p : best
  )

  return (
    <div className="space-y-4">
      <div className="bg-[#0e0e1e] rounded-xl p-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Grid */}
          {[100, 200, 300, 400].map(c => (
            <g key={c}>
              <line x1={pad.l} y1={yScale(c)} x2={svgW - pad.r} y2={yScale(c)} stroke="#252548" strokeWidth="0.5" />
              <text x={pad.l - 5} y={yScale(c) + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{c}%</text>
            </g>
          ))}

          {/* Axes */}
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={svgH - pad.b} stroke="#475569" strokeWidth="1" />
          <line x1={pad.l} y1={svgH - pad.b} x2={svgW - pad.r} y2={svgH - pad.b} stroke="#475569" strokeWidth="1" />

          {/* Curve */}
          <path d={curvePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Process points */}
          {processes.map(p => (
            <g key={p.name}>
              <circle cx={xScale(p.tol)} cy={yScale(p.cost)} r="5"
                fill={p.name === nearestProcess.name ? '#f59e0b' : '#141428'}
                stroke={p.name === nearestProcess.name ? '#f59e0b' : '#475569'} strokeWidth="2" />
              <text x={xScale(p.tol)} y={yScale(p.cost) - 10}
                fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="500">{p.name}</text>
            </g>
          ))}

          {/* Selected tolerance line */}
          <line x1={xScale(selectedTol)} y1={pad.t} x2={xScale(selectedTol)} y2={svgH - pad.b}
            stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          <circle cx={xScale(selectedTol)} cy={yScale(Math.min(interpCost, costRange[1]))} r="6"
            fill="#f59e0b" stroke="#0a0a16" strokeWidth="2" />

          {/* Axis labels */}
          <text x={svgW / 2} y={svgH - 5} fill="#94a3b8" fontSize="10" textAnchor="middle">
            ← Tighter tolerance          Looser tolerance →
          </text>
          <text x={10} y={svgH / 2} fill="#94a3b8" fontSize="10" textAnchor="middle"
            transform={`rotate(-90, 10, ${svgH / 2})`}>Relative Cost %</text>

          {/* Tolerance labels on x-axis */}
          {processes.map(p => (
            <text key={`lbl-${p.name}`} x={xScale(p.tol)} y={svgH - pad.b + 14}
              fill="#94a3b8" fontSize="8" textAnchor="middle">±{p.tol}</text>
          ))}
        </svg>
      </div>

      <div className="px-2">
        <label className="text-xs text-slate-500 block mb-1">Adjust tolerance: ±{selectedTol.toFixed(4)} in</label>
        <input
          type="range"
          min={0.0005}
          max={0.035}
          step={0.0005}
          value={selectedTol}
          onChange={e => setSelectedTol(parseFloat(e.target.value))}
          className="w-full accent-[#f59e0b]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Selected tolerance</div>
          <div className="font-mono font-bold text-[#f59e0b]">±{selectedTol.toFixed(4)} in</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Relative cost</div>
          <div className="font-mono font-bold text-slate-200">~{Math.min(Math.round(interpCost), 400)}%</div>
        </div>
      </div>

      <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
        Key insight: Moving from ±0.010 to ±0.001 can increase costs by <strong>4-10×</strong>. Always use the loosest tolerance that still meets functional requirements.
      </div>
    </div>
  )
}
