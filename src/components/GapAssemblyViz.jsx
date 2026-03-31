import { useState } from 'react'
import InteractiveSlider from './InteractiveSlider'

export default function GapAssemblyViz({ onCorrect }) {
  const [a, setA] = useState(1.750)
  const [ta, setTa] = useState(0.003)
  const [b, setB] = useState(0.750)
  const [tb, setTb] = useState(0.001)
  const [c, setC] = useState(0.120)
  const [tc, setTc] = useState(0.005)
  const [d, setD] = useState(0.875)
  const [td, setTd] = useState(0.001)

  const wMean = a - b - c - d
  const tw = ta + tb + tc + td
  const wMax = wMean + tw
  const wMin = wMean - tw

  const svgW = 500
  const svgH = 100
  const scale = 200

  const parts = [
    { label: 'b', width: b * scale, color: '#3b82f6' },
    { label: 'c', width: c * scale, color: '#8b5cf6' },
    { label: 'd', width: d * scale, color: '#06b6d4' },
  ]

  const totalPartsWidth = parts.reduce((s, p) => s + p.width, 0)
  const boltWidth = a * scale
  const gapWidth = (a - b - c - d) * scale

  return (
    <div className="space-y-4">
      {/* SVG Assembly diagram */}
      <div className="bg-slate-50 rounded-xl p-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Bolt/screw (full length a) */}
          <rect x={50} y={20} width={boltWidth} height={14} rx={2} fill="#475569" stroke="#64748b" strokeWidth="1" />
          <text x={50 + boltWidth / 2} y={15} fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">a = {a.toFixed(3)}"</text>

          {/* Bolt head */}
          <rect x={38} y={16} width={16} height={22} rx={2} fill="#64748b" />

          {/* Parts */}
          {(() => {
            let cx = 50
            return parts.map((p, i) => {
              const el = (
                <g key={i}>
                  <rect x={cx} y={40} width={p.width} height={40} rx={3}
                    fill={p.color + '30'} stroke={p.color} strokeWidth="1.5" />
                  <text x={cx + p.width / 2} y={64} fill={p.color} fontSize="10" textAnchor="middle" fontWeight="bold">
                    {p.label}
                  </text>
                </g>
              )
              cx += p.width
              return el
            })
          })()}

          {/* Gap w */}
          {gapWidth > 2 && (
            <>
              <rect x={50 + totalPartsWidth} y={40} width={Math.max(gapWidth, 1)} height={40} rx={2}
                fill={wMin >= 0.003 ? '#10b98130' : '#ef444430'} stroke={wMin >= 0.003 ? '#10b981' : '#ef4444'} strokeWidth="1" strokeDasharray="3 2" />
              <text x={50 + totalPartsWidth + gapWidth / 2} y={64} fill={wMin >= 0.003 ? '#10b981' : '#ef4444'}
                fontSize="9" textAnchor="middle" fontWeight="bold">w</text>
            </>
          )}

          {/* Nut */}
          <rect x={50 + boltWidth - 4} y={36} width={16} height={48} rx={2} fill="#64748b" />

          {/* Dimension line for a */}
          <line x1={50} y1={90} x2={50 + boltWidth} y2={90} stroke="#94a3b8" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Bolt shank (a)</div>
          <InteractiveSlider label="Nominal" value={a} min={1.5} max={2.0} step={0.001} onChange={setA} format={v => v.toFixed(3)} unit='"' />
          <InteractiveSlider label="Tolerance" value={ta} min={0.001} max={0.010} step={0.001} onChange={setTa} format={v => `±${v.toFixed(3)}`} />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Sleeve b</div>
          <InteractiveSlider label="Nominal" value={b} min={0.5} max={1.0} step={0.001} onChange={setB} format={v => v.toFixed(3)} unit='"' />
          <InteractiveSlider label="Tolerance" value={tb} min={0.001} max={0.010} step={0.001} onChange={setTb} format={v => `±${v.toFixed(3)}`} />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Sleeve c</div>
          <InteractiveSlider label="Nominal" value={c} min={0.050} max={0.300} step={0.001} onChange={setC} format={v => v.toFixed(3)} unit='"' />
          <InteractiveSlider label="Tolerance" value={tc} min={0.001} max={0.010} step={0.001} onChange={setTc} format={v => `±${v.toFixed(3)}`} />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Sleeve d</div>
          <InteractiveSlider label="Nominal" value={d} min={0.5} max={1.0} step={0.001} onChange={setD} format={v => v.toFixed(3)} unit='"' />
          <InteractiveSlider label="Tolerance" value={td} min={0.001} max={0.010} step={0.001} onChange={setTd} format={v => `±${v.toFixed(3)}`} />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">w̄ (mean gap)</div>
          <div className="font-mono font-bold text-slate-700">{wMean.toFixed(4)}"</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">t_w (total tol)</div>
          <div className="font-mono font-bold text-blue-600">±{tw.toFixed(4)}"</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">w_max</div>
          <div className="font-mono font-bold text-emerald-400">{wMax.toFixed(4)}"</div>
        </div>
        <div className={`rounded-lg p-2 ${wMin >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <div className="text-xs text-slate-500">w_min</div>
          <div className={`font-mono font-bold ${wMin >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {wMin.toFixed(4)}"
          </div>
        </div>
      </div>

      <div className="font-mono text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
        <div>w = a − b − c − d = {a.toFixed(3)} − {b.toFixed(3)} − {c.toFixed(3)} − {d.toFixed(3)} = <span className="text-blue-600">{wMean.toFixed(4)}"</span></div>
        <div>t_w = {ta.toFixed(3)} + {tb.toFixed(3)} + {tc.toFixed(3)} + {td.toFixed(3)} = <span className="text-blue-600">±{tw.toFixed(4)}"</span></div>
        <div className={`mt-1 font-semibold ${wMin >= 0.003 ? 'text-emerald-400' : 'text-red-400'}`}>
          {wMin >= 0.003 ? '✓ Gap always ≥ 0.003" — assembly will function' : '✗ Gap can go below 0.003" — risk of interference'}
        </div>
      </div>
    </div>
  )
}
