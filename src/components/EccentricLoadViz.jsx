import { useState } from 'react'
import InteractiveSlider from './InteractiveSlider'

export default function EccentricLoadViz() {
  const [diameter, setDiameter] = useState(0.5)    // inches
  const [force, setForce] = useState(2000)          // lbf
  const [eccentricityPct, setEccentricityPct] = useState(1.5) // % of diameter
  const [loadFactor, setLoadFactor] = useState(2.0)  // dynamic multiplier

  const e = (eccentricityPct / 100) * diameter
  const A = Math.PI * diameter * diameter / 4
  const axialStress = force / A
  const bendingStress = (32 * force * e) / (Math.PI * diameter * diameter * diameter)
  const totalStress = axialStress + bendingStress
  const dynamicStress = totalStress * loadFactor

  const svgW = 200
  const svgH = 280

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* SVG diagram */}
        <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: 250 }}>
            {/* Support at top */}
            <rect x={60} y={10} width={80} height={12} rx={2} fill="#475569" />
            <line x1={70} y1={10} x2={60} y2={0} stroke="#475569" strokeWidth="1.5" />
            <line x1={100} y1={10} x2={90} y2={0} stroke="#475569" strokeWidth="1.5" />
            <line x1={130} y1={10} x2={120} y2={0} stroke="#475569" strokeWidth="1.5" />

            {/* Rod */}
            <rect x={100 - 15} y={22} width={30} height={180} rx={4}
              fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
            <text x={100} y={112} fill="#3b82f6" fontSize="10" textAnchor="middle" fontWeight="bold">d</text>

            {/* Eccentricity marker */}
            {eccentricityPct > 0 && (
              <>
                <line x1={100} y1={210} x2={100 + 30} y2={210} stroke="#2563eb" strokeWidth="1" strokeDasharray="3 2" />
                <line x1={100 + 30} y1={205} x2={100 + 30} y2={215} stroke="#2563eb" strokeWidth="1" />
                <text x={100 + 15} y={225} fill="#2563eb" fontSize="9" textAnchor="middle">e</text>
              </>
            )}

            {/* Force arrow */}
            <line x1={100 + 30} y1={210} x2={100 + 30} y2={265} stroke="#ef4444" strokeWidth="2.5" />
            <polygon points={`${100 + 30 - 5},${260} ${100 + 30 + 5},${260} ${100 + 30},${270}`} fill="#ef4444" />
            <text x={100 + 30 + 12} y={245} fill="#ef4444" fontSize="11" fontWeight="bold">P</text>

            {/* Centerline */}
            <line x1={100} y1={22} x2={100} y2={210} stroke="#475569" strokeWidth="0.5" strokeDasharray="4 3" />
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <InteractiveSlider label="Diameter d" value={diameter} min={0.25} max={1.5} step={0.05}
            onChange={setDiameter} format={v => v.toFixed(2)} unit=" in" />
          <InteractiveSlider label="Force P" value={force} min={500} max={5000} step={100}
            onChange={setForce} format={v => v.toLocaleString()} unit=" lbf" />
          <InteractiveSlider label="Eccentricity" value={eccentricityPct} min={0} max={5} step={0.1}
            onChange={setEccentricityPct} format={v => v.toFixed(1)} unit="% of d" />
          <InteractiveSlider label="Load factor" value={loadFactor} min={1.0} max={3.0} step={0.1}
            onChange={setLoadFactor} format={v => v.toFixed(1)} unit="×" />
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <div className="text-xs text-slate-500">Axial: P/A</div>
          <div className="font-mono font-bold text-blue-400">{axialStress.toFixed(0)} psi</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <div className="text-xs text-slate-500">Bending: 32Pe/(πd³)</div>
          <div className="font-mono font-bold text-amber-400">{bendingStress.toFixed(0)} psi</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <div className="text-xs text-slate-500">Combined (static)</div>
          <div className="font-mono font-bold text-slate-700">{totalStress.toFixed(0)} psi</div>
        </div>
        <div className={`rounded-lg p-2 text-center ${dynamicStress > 50000 ? 'bg-red-50' : 'bg-emerald-50'}`}>
          <div className="text-xs text-slate-500">Dynamic σ_max</div>
          <div className={`font-mono font-bold ${dynamicStress > 50000 ? 'text-red-400' : 'text-emerald-400'}`}>
            {dynamicStress.toFixed(0)} psi
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs text-slate-500">
        <div>σ_max = {loadFactor.toFixed(1)} × [4P/(πd²)] × [1 + 8×({eccentricityPct.toFixed(1)}%)]</div>
        <div className="text-slate-700 mt-1">σ_max = {loadFactor.toFixed(1)} × {totalStress.toFixed(0)} = <span className="text-blue-600 font-bold">{dynamicStress.toFixed(0)} psi</span></div>
        <div className="mt-1">Ratio σ_max/σ_nom = <span className="text-blue-600 font-bold">{(dynamicStress / axialStress).toFixed(3)}</span></div>
      </div>
    </div>
  )
}
