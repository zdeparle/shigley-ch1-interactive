import { useState } from 'react'

const categories = [
  {
    name: 'Force',
    units: [
      { label: 'lbf', factor: 1 },
      { label: 'N', factor: 4.44822 },
      { label: 'kN', factor: 0.00444822 },
      { label: 'kip', factor: 0.001 },
    ]
  },
  {
    name: 'Stress / Pressure',
    units: [
      { label: 'psi', factor: 1 },
      { label: 'kpsi', factor: 0.001 },
      { label: 'MPa', factor: 0.00689476 },
      { label: 'GPa', factor: 0.00000689476 },
    ]
  },
  {
    name: 'Length',
    units: [
      { label: 'in', factor: 1 },
      { label: 'ft', factor: 1 / 12 },
      { label: 'mm', factor: 25.4 },
      { label: 'm', factor: 0.0254 },
    ]
  },
  {
    name: 'Mass',
    units: [
      { label: 'slug', factor: 1 },
      { label: 'kg', factor: 14.5939 },
      { label: 'lbm', factor: 32.174 },
    ]
  },
]

export default function UnitConverter() {
  const [catIdx, setCatIdx] = useState(0)
  const [baseValue, setBaseValue] = useState(1000)

  const cat = categories[catIdx]

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex gap-1 bg-slate-50 rounded-lg p-1">
        {categories.map((c, i) => (
          <button
            key={c.name}
            onClick={() => { setCatIdx(i); setBaseValue(c.name === 'Length' ? 1 : c.name === 'Mass' ? 1 : 1000) }}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              i === catIdx ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
        <input
          type="number"
          value={baseValue}
          onChange={e => setBaseValue(parseFloat(e.target.value) || 0)}
          className="flex-1 bg-transparent text-slate-800 font-mono text-lg focus:outline-none"
        />
        <span className="text-blue-600 font-mono font-bold">{cat.units[0].label}</span>
      </div>

      {/* Conversions */}
      <div className="space-y-2">
        {cat.units.slice(1).map(unit => {
          const converted = baseValue * unit.factor
          return (
            <div key={unit.label} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="text-sm text-slate-500">{unit.label}</span>
              <span className="font-mono font-bold text-slate-800">
                {Math.abs(converted) >= 1000
                  ? converted.toFixed(1)
                  : Math.abs(converted) >= 1
                    ? converted.toFixed(4)
                    : converted.toExponential(4)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
        <div className="text-xs text-slate-500 mb-1">Key relationships:</div>
        <div className="text-xs text-slate-500 space-y-0.5 font-mono">
          {catIdx === 0 && <>
            <div>1 lbf = 4.448 N</div>
            <div>1 kip = 1000 lbf</div>
          </>}
          {catIdx === 1 && <>
            <div>1 kpsi = 1000 psi</div>
            <div>1 MPa = 145.0 psi</div>
          </>}
          {catIdx === 2 && <>
            <div>1 in = 25.4 mm</div>
            <div>1 ft = 12 in = 0.3048 m</div>
          </>}
          {catIdx === 3 && <>
            <div>1 slug = 14.594 kg</div>
            <div>g = 32.174 ft/s² = 9.806 m/s²</div>
          </>}
        </div>
      </div>
    </div>
  )
}
