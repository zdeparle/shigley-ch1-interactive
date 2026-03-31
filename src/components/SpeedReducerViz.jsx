import { useState } from 'react'

export default function SpeedReducerViz() {
  const [activeSection, setActiveSection] = useState(null)

  const sections = {
    motor: { label: 'Motor', color: '#3b82f6', desc: 'Electric motor provides power at 1750 rev/min. This is the input to the speed reducer.' },
    input: { label: 'Input Shaft', color: '#8b5cf6', desc: 'Connects motor to gearbox. Diameter tolerance ±0.001 in. Max axial load 50 lbf, transverse 100 lbf.' },
    gearbox: { label: 'Gearbox', color: '#2563eb', desc: 'Contains gear train that reduces speed from 1750 to 82-88 rev/min. Must fit within 14×14×22 in. Efficiency >95%.' },
    output: { label: 'Output Shaft', color: '#10b981', desc: 'Delivers power to application at 82-88 rev/min. Max axial load 50 lbf, transverse 500 lbf.' },
    application: { label: 'Application', color: '#ef4444', desc: 'Uniformly loaded equipment: conveyor belts, blowers, generators. Requires 20 hp delivered.' },
  }

  const svgW = 500
  const svgH = 160

  return (
    <div className="space-y-3">
      <div className="bg-slate-50 rounded-xl p-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Motor */}
          <g onClick={() => setActiveSection(activeSection === 'motor' ? null : 'motor')} className="cursor-pointer">
            <rect x={20} y={40} width={70} height={60} rx={8} fill={activeSection === 'motor' ? '#3b82f640' : '#ffffff'} stroke="#3b82f6" strokeWidth="2" />
            <circle cx={55} cy={70} r={18} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1={55} y1={70} x2={55 + 12} y2={70 - 8} stroke="#3b82f6" strokeWidth="2" />
            <text x={55} y={108} fill="#3b82f6" fontSize="9" textAnchor="middle" fontWeight="600">Motor</text>
            <text x={55} y={35} fill="#3b82f6" fontSize="8" textAnchor="middle">1750 rpm</text>
          </g>

          {/* Input shaft */}
          <g onClick={() => setActiveSection(activeSection === 'input' ? null : 'input')} className="cursor-pointer">
            <rect x={90} y={62} width={60} height={16} rx={3} fill={activeSection === 'input' ? '#8b5cf640' : '#e2e8f0'} stroke="#8b5cf6" strokeWidth="1.5" />
            <text x={120} y={90} fill="#8b5cf6" fontSize="8" textAnchor="middle">Input Shaft</text>
          </g>

          {/* Gearbox */}
          <g onClick={() => setActiveSection(activeSection === 'gearbox' ? null : 'gearbox')} className="cursor-pointer">
            <rect x={150} y={20} width={180} height={110} rx={10} fill={activeSection === 'gearbox' ? '#2563eb20' : '#ffffff'} stroke="#2563eb" strokeWidth="2" />
            {/* Gear 1 (large) */}
            <circle cx={210} cy={55} r={25} fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx={210} cy={55} r={5} fill="#2563eb" />
            {/* Gear 2 (small - input) */}
            <circle cx={180} cy={70} r={12} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx={180} cy={70} r={3} fill="#8b5cf6" />
            {/* Gear 3 (large - output) */}
            <circle cx={280} cy={85} r={25} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx={280} cy={85} r={5} fill="#10b981" />
            {/* Gear 4 */}
            <circle cx={260} cy={45} r={12} fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx={260} cy={45} r={3} fill="#2563eb" />
            <text x={240} y={145} fill="#2563eb" fontSize="9" textAnchor="middle" fontWeight="600">Gearbox</text>
            <text x={240} y={17} fill="#2563eb" fontSize="8" textAnchor="middle">14" × 14" × 22"</text>
          </g>

          {/* Output shaft */}
          <g onClick={() => setActiveSection(activeSection === 'output' ? null : 'output')} className="cursor-pointer">
            <rect x={330} y={77} width={60} height={16} rx={3} fill={activeSection === 'output' ? '#10b98140' : '#e2e8f0'} stroke="#10b981" strokeWidth="1.5" />
            <text x={360} y={105} fill="#10b981" fontSize="8" textAnchor="middle">Output Shaft</text>
          </g>

          {/* Application */}
          <g onClick={() => setActiveSection(activeSection === 'application' ? null : 'application')} className="cursor-pointer">
            <rect x={390} y={50} width={80} height={60} rx={8} fill={activeSection === 'application' ? '#ef444440' : '#ffffff'} stroke="#ef4444" strokeWidth="2" />
            <text x={430} y={78} fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="600">Load</text>
            <text x={430} y={92} fill="#ef4444" fontSize="8" textAnchor="middle">20 hp</text>
            <text x={430} y={35} fill="#ef4444" fontSize="8" textAnchor="middle">82-88 rpm</text>
          </g>

          {/* Flow arrow */}
          <text x={250} y={155} fill="#94a3b8" fontSize="9" textAnchor="middle">Power flow →</text>
        </svg>
      </div>

      {/* Info panel */}
      {activeSection && (
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200" style={{ borderColor: sections[activeSection].color }}>
          <div className="font-semibold text-sm mb-1" style={{ color: sections[activeSection].color }}>
            {sections[activeSection].label}
          </div>
          <p className="text-sm text-slate-500">{sections[activeSection].desc}</p>
        </div>
      )}
      {!activeSection && (
        <div className="text-xs text-slate-500 text-center">Click any component to see its specifications</div>
      )}

      {/* Key specs */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">Speed ratio</div>
          <div className="font-mono font-bold text-blue-600">{(1750 / 85).toFixed(1)}:1</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">Efficiency</div>
          <div className="font-mono font-bold text-emerald-400">&gt;95%</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <div className="text-xs text-slate-500">Design life</div>
          <div className="font-mono font-bold text-blue-400">6 years</div>
        </div>
      </div>
    </div>
  )
}
