import { useState } from 'react'

export default function ToleranceStackViz() {
  const [dims, setDims] = useState([
    { nominal: 2.0, plus: 0.010, minus: 0.010, label: 'A' },
    { nominal: 1.5, plus: 0.008, minus: 0.008, label: 'B' },
    { nominal: 1.0, plus: 0.005, minus: 0.005, label: 'C' },
  ])

  const totalNominal = dims.reduce((s, d) => s + d.nominal, 0)
  const totalPlus = dims.reduce((s, d) => s + d.plus, 0)
  const totalMinus = dims.reduce((s, d) => s + d.minus, 0)
  const worst = { max: totalNominal + totalPlus, min: totalNominal - totalMinus }

  const update = (i, field, val) => {
    const next = [...dims]
    next[i] = { ...next[i], [field]: val }
    setDims(next)
  }

  return (
    <div className="space-y-4">
      {/* SVG diagram */}
      <div className="bg-slate-50 rounded-lg p-4">
        <svg width="100%" viewBox="0 0 500 100">
          {dims.map((d, i) => {
            const totalWidth = dims.reduce((s, dd) => s + dd.nominal, 0)
            const x = dims.slice(0, i).reduce((s, dd) => s + dd.nominal, 0)
            const w = d.nominal
            const scale = 460 / totalWidth
            const sx = 20 + x * scale
            const sw = w * scale
            return (
              <g key={i}>
                <rect x={sx} y={30} width={sw} height={40} fill="#f1f5f9" stroke="#2563eb" strokeWidth="1.5" />
                <text x={sx + sw / 2} y={55} textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">{d.label}</text>
                <text x={sx + sw / 2} y={70} textAnchor="middle" fill="#94a3b8" fontSize="9">{d.nominal}"</text>
                {/* Tolerance arrows */}
                <text x={sx + sw / 2} y={25} textAnchor="middle" fill="#10b981" fontSize="8">+{d.plus}</text>
                <text x={sx + sw / 2} y={15} textAnchor="middle" fill="#ef4444" fontSize="8">&minus;{d.minus}</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Dimension inputs */}
      <div className="grid gap-3">
        {dims.map((d, i) => (
          <div key={i} className="bg-slate-50 rounded-lg p-3 grid grid-cols-4 gap-2 items-center">
            <span className="text-blue-600 font-bold">{d.label}</span>
            {[
              { label: 'Nominal', field: 'nominal', step: 0.5 },
              { label: '+Tol', field: 'plus', step: 0.001 },
              { label: '\u2212Tol', field: 'minus', step: 0.001 },
            ].map(({ label, field, step }) => (
              <div key={field}>
                <label className="text-xs text-slate-500">{label}</label>
                <input
                  type="number"
                  value={d[field]}
                  step={step}
                  onChange={e => update(i, field, parseFloat(e.target.value))}
                  className="w-full bg-slate-100 border border-slate-200 rounded px-2 py-1 text-sm font-mono text-slate-700"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Stack-up result */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-slate-600 mb-2">Worst-Case Stack-up</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold font-mono text-slate-800">{totalNominal.toFixed(3)}"</div>
            <div className="text-xs text-slate-500">Total Nominal</div>
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-emerald-400">{worst.max.toFixed(3)}"</div>
            <div className="text-xs text-slate-500">Maximum</div>
          </div>
          <div>
            <div className="text-lg font-bold font-mono text-red-400">{worst.min.toFixed(3)}"</div>
            <div className="text-xs text-slate-500">Minimum</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-slate-500">Total tolerance: </span>
          <span className="font-mono font-bold text-blue-600">&plusmn;{((worst.max - worst.min) / 2).toFixed(3)}"</span>
        </div>
      </div>
    </div>
  )
}
