import { useState } from 'react'

export default function ReliabilityChainViz({ onCorrect }) {
  const [components, setComponents] = useState([
    { name: 'Bearing A', R: 0.95 },
    { name: 'Shaft', R: 0.99 },
    { name: 'Gear', R: 0.97 },
    { name: 'Bearing B', R: 0.95 },
  ])

  const systemR = components.reduce((acc, c) => acc * c.R, 1)

  const addComponent = () => {
    if (components.length >= 8) return
    setComponents(prev => [...prev, { name: `Part ${prev.length + 1}`, R: 0.95 }])
  }

  const removeComponent = (idx) => {
    if (components.length <= 2) return
    setComponents(prev => prev.filter((_, i) => i !== idx))
  }

  const updateR = (idx, R) => {
    setComponents(prev => prev.map((c, i) => i === idx ? { ...c, R } : c))
  }

  const svgW = 500
  const svgH = 100
  const boxW = Math.min(80, (svgW - 60) / components.length - 10)
  const boxH = 40
  const startX = 30
  const gapX = (svgW - 60 - boxW * components.length) / Math.max(1, components.length - 1) + boxW

  return (
    <div className="space-y-4">
      {/* Chain visualization */}
      <div className="bg-[#0e0e1e] rounded-xl p-3">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Connection lines */}
          {components.map((_, i) => {
            if (i === 0) return null
            const x1 = startX + (i - 1) * gapX + boxW
            const x2 = startX + i * gapX
            return <line key={`line-${i}`} x1={x1} y1={svgH / 2} x2={x2} y2={svgH / 2} stroke="#475569" strokeWidth="2" />
          })}
          {/* Input arrow */}
          <line x1={5} y1={svgH / 2} x2={startX} y2={svgH / 2} stroke="#10b981" strokeWidth="2" />
          <polygon points={`${startX - 2},${svgH / 2 - 4} ${startX + 4},${svgH / 2} ${startX - 2},${svgH / 2 + 4}`} fill="#10b981" />
          {/* Output arrow */}
          <line x1={startX + (components.length - 1) * gapX + boxW} y1={svgH / 2} x2={svgW - 5} y2={svgH / 2} stroke={systemR > 0.9 ? '#10b981' : systemR > 0.8 ? '#f59e0b' : '#ef4444'} strokeWidth="2" />

          {/* Component boxes */}
          {components.map((c, i) => {
            const x = startX + i * gapX
            const color = c.R >= 0.99 ? '#10b981' : c.R >= 0.95 ? '#3b82f6' : c.R >= 0.90 ? '#f59e0b' : '#ef4444'
            return (
              <g key={i}>
                <rect x={x} y={svgH / 2 - boxH / 2} width={boxW} height={boxH} rx={6}
                  fill="#141428" stroke={color} strokeWidth="1.5" />
                <text x={x + boxW / 2} y={svgH / 2 - 4} fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="600">
                  {c.name}
                </text>
                <text x={x + boxW / 2} y={svgH / 2 + 10} fill={color} fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                  {(c.R * 100).toFixed(1)}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Sliders for each component */}
      <div className="space-y-2">
        {components.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-20 truncate">{c.name}</span>
            <input
              type="range"
              min={0.80}
              max={0.999}
              step={0.001}
              value={c.R}
              onChange={e => updateR(i, parseFloat(e.target.value))}
              className="flex-1 accent-[#f59e0b]"
            />
            <span className="font-mono text-xs text-slate-200 w-14 text-right">{(c.R * 100).toFixed(1)}%</span>
            {components.length > 2 && (
              <button onClick={() => removeComponent(i)} className="text-red-500 text-xs hover:text-red-300">✕</button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {components.length < 8 && (
          <button onClick={addComponent} className="flex-1 py-1.5 rounded-lg border border-dashed border-[#252548] text-slate-400 text-xs hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors">
            + Add Component
          </button>
        )}
      </div>

      {/* System reliability result */}
      <div className={`text-center p-3 rounded-xl ${
        systemR > 0.95 ? 'bg-emerald-900/30 border border-emerald-700' :
        systemR > 0.90 ? 'bg-amber-900/30 border border-amber-700' :
        'bg-red-900/30 border border-red-700'
      }`}>
        <div className="text-xs text-slate-400 mb-1">System Reliability (R = R₁ × R₂ × ... × Rₙ)</div>
        <div className={`font-mono text-2xl font-bold ${
          systemR > 0.95 ? 'text-emerald-400' : systemR > 0.90 ? 'text-amber-400' : 'text-red-400'
        }`}>
          R = {(systemR * 100).toFixed(2)}%
        </div>
        <div className="font-mono text-xs text-slate-500 mt-1">
          {components.map(c => c.R.toFixed(3)).join(' × ')} = {systemR.toFixed(6)}
        </div>
      </div>
    </div>
  )
}
