import { useState } from 'react'

// Standard preferred sizes (inches) per Shigley's Table A-17
const PREFERRED_SIZES = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0, 1.125, 1.25, 1.375, 1.5, 1.75, 2.0, 2.25, 2.5]

export default function DesignFactorCalc() {
  const [force, setForce] = useState(1000)  // lb
  const [strength, setStrength] = useState(50000) // psi
  const [nd, setNd] = useState(2.5)

  const requiredArea = (nd * force) / strength
  const requiredDiameter = Math.sqrt(4 * requiredArea / Math.PI)
  const standardDiameter = PREFERRED_SIZES.find(d => d >= requiredDiameter) || requiredDiameter
  const actualArea = Math.PI * standardDiameter ** 2 / 4
  const actualStress = force / actualArea
  const actualN = strength / actualStress

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Applied Force F', value: force, setValue: setForce, min: 100, max: 10000, step: 100, unit: 'lb', format: v => v.toLocaleString() },
          { label: 'Material Strength S', value: strength, setValue: setStrength, min: 10000, max: 200000, step: 1000, unit: 'psi', format: v => v.toLocaleString() },
          { label: 'Design Factor n\u2090', value: nd, setValue: setNd, min: 1.1, max: 5, step: 0.1, unit: '', format: v => v.toFixed(1) },
        ].map(({ label, value, setValue, min, max, step: s, unit, format }) => (
          <div key={label} className="bg-[#0e0e1e] rounded-lg p-3">
            <label className="text-xs text-slate-400 block mb-1">{label}</label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(parseFloat(e.target.value))}
              className="w-full bg-transparent text-[#f59e0b] font-mono font-bold text-lg border-b border-[#252548] outline-none"
            />
            <input type="range" min={min} max={max} step={s} value={value}
              onChange={e => setValue(parseFloat(e.target.value))}
              className="w-full mt-2 accent-[#f59e0b]"
            />
            <span className="text-xs text-slate-500">{unit}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {[
          {
            num: 1,
            title: 'Required cross-sectional area',
            formula: 'A = n\u2090 \u00b7 F / S',
            calc: `= ${nd.toFixed(1)} \u00d7 ${force.toLocaleString()} / ${strength.toLocaleString()}`,
            result: `= ${requiredArea.toFixed(4)} in\u00b2`
          },
          {
            num: 2,
            title: 'Required diameter (circular rod)',
            formula: 'd = \u221a(4A/\u03c0)',
            calc: `= \u221a(4 \u00d7 ${requiredArea.toFixed(4)} / \u03c0)`,
            result: `= ${requiredDiameter.toFixed(4)} in`
          },
          {
            num: 3,
            title: 'Round UP to next standard size',
            formula: 'Table A-17 preferred sizes',
            calc: `${requiredDiameter.toFixed(4)} in \u2192 next standard`,
            result: `d = ${standardDiameter} in`,
            highlight: true
          },
          {
            num: 4,
            title: 'Actual factor of safety',
            formula: 'n = S / \u03c3 = S / (F/A)',
            calc: `= ${strength.toLocaleString()} / (${force.toLocaleString()} / ${actualArea.toFixed(4)})`,
            result: `n = ${actualN.toFixed(2)}`,
            highlight: true
          },
        ].map(s => (
          <div key={s.num} className={`rounded-lg p-3 border ${s.highlight ? 'border-[#f59e0b] bg-amber-900/10' : 'border-[#252548] bg-[#0e0e1e]'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.highlight ? 'bg-[#f59e0b] text-black' : 'bg-[#252548] text-slate-400'}`}>
                {s.num}
              </div>
              <div className="flex-1">
                <div className="text-sm text-slate-300 font-medium">{s.title}</div>
                <div className="text-xs font-mono mt-1">
                  <span className="text-slate-500">{s.formula}</span>
                  <br />
                  <span className="text-slate-400">{s.calc}</span>
                  <br />
                  <span className={s.highlight ? 'text-[#f59e0b] font-bold text-sm' : 'text-slate-200 font-bold'}>{s.result}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-3 rounded-lg text-center ${actualN >= nd ? 'bg-emerald-900/20 border border-emerald-700' : 'bg-red-900/20 border border-red-700'}`}>
        <span className="text-sm text-slate-400">Actual factor of safety </span>
        <span className={`font-bold text-lg ${actualN >= nd ? 'text-emerald-400' : 'text-red-400'}`}>n = {actualN.toFixed(2)}</span>
        <span className="text-slate-400 text-sm"> {actualN >= nd ? `\u2265 n\u2090 = ${nd.toFixed(1)} \u2713` : `< n\u2090 = ${nd.toFixed(1)} \u2717`}</span>
      </div>
    </div>
  )
}
