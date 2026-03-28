import { useState } from 'react'

const phases = [
  { id: 1, label: 'Identification\nof Need', x: 250, y: 30, color: '#8b5cf6', desc: 'Recognition that a problem exists or an improvement is possible. May start as a vague discontent or sensing that something is not right.' },
  { id: 2, label: 'Definition of\nProblem', x: 250, y: 110, color: '#3b82f6', desc: 'Specifying inputs, outputs, constraints, and limitations. The "black box" model — what goes in, what comes out, and what\'s required.' },
  { id: 3, label: 'Synthesis', x: 250, y: 190, color: '#06b6d4', desc: 'Invention of the concept — generating candidate designs, brainstorming schemes, and fleshing out solutions with quantified metrics.' },
  { id: 4, label: 'Analysis &\nOptimization', x: 250, y: 270, color: '#f59e0b', desc: 'Evaluating each scheme using mathematical models. Stress, deflection, cost analysis. Schemes that fail are revised or discarded.' },
  { id: 5, label: 'Evaluation', x: 250, y: 350, color: '#f97316', desc: 'Final proof of design: prototype testing, reliability assessment, manufacturing feasibility, cost analysis, and liability review.' },
  { id: 6, label: 'Presentation', x: 250, y: 430, color: '#10b981', desc: 'Communicating the design to stakeholders. A selling job — if you can\'t explain it, the work may be wasted.' },
]

export default function FlowDiagram() {
  const [active, setActive] = useState(null)
  const boxW = 140
  const boxH = 50

  return (
    <div className="space-y-3">
      <svg viewBox="0 0 500 480" className="w-full" style={{ maxHeight: 420 }}>
        {/* Iteration arrow (right side) */}
        <path
          d="M 390 80 C 440 80, 440 400, 390 400"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="6 3"
          opacity="0.5"
        />
        <text x="440" y="240" fill="#f59e0b" fontSize="11" textAnchor="middle" opacity="0.7"
          transform="rotate(90, 440, 240)">Iteration</text>
        <polygon points="390,400 396,390 384,390" fill="#f59e0b" opacity="0.5" />

        {/* Feedback arrow (left side) */}
        <path
          d="M 110 400 C 60 400, 60 80, 110 80"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.4"
        />
        <text x="50" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle" opacity="0.5"
          transform="rotate(-90, 50, 240)">Feedback</text>
        <polygon points="110,80 116,90 104,90" fill="#94a3b8" opacity="0.4" />

        {/* Down arrows between boxes */}
        {phases.slice(0, -1).map((p, i) => (
          <line key={`arrow-${i}`}
            x1={p.x} y1={p.y + boxH/2 + 5}
            x2={phases[i+1].x} y2={phases[i+1].y - boxH/2 - 5}
            stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"
          />
        ))}

        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#475569" />
          </marker>
        </defs>

        {/* Phase boxes */}
        {phases.map(p => {
          const isActive = active === p.id
          return (
            <g key={p.id} onClick={() => setActive(isActive ? null : p.id)} className="cursor-pointer">
              <rect
                x={p.x - boxW/2} y={p.y - boxH/2}
                width={boxW} height={boxH}
                rx={10}
                fill={isActive ? p.color + '40' : '#0e0e1e'}
                stroke={isActive ? p.color : '#252548'}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              {p.label.split('\n').map((line, li) => (
                <text key={li}
                  x={p.x} y={p.y + (li - (p.label.split('\n').length - 1) / 2) * 14}
                  fill={isActive ? p.color : '#e2e8f0'}
                  fontSize="12" fontWeight="600" textAnchor="middle" dominantBaseline="central"
                >
                  {line}
                </text>
              ))}
              {/* Phase number */}
              <circle cx={p.x - boxW/2 + 14} cy={p.y - boxH/2 + 14} r={10} fill={p.color} opacity={0.8} />
              <text x={p.x - boxW/2 + 14} y={p.y - boxH/2 + 14}
                fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
                {p.id}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Description panel */}
      {active && (
        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548] transition-all">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: phases.find(p => p.id === active)?.color }}>
              {active}
            </div>
            <span className="font-semibold text-slate-200 text-sm">
              {phases.find(p => p.id === active)?.label.replace('\n', ' ')}
            </span>
          </div>
          <p className="text-sm text-slate-400">{phases.find(p => p.id === active)?.desc}</p>
        </div>
      )}
      {!active && (
        <div className="text-xs text-slate-500 text-center">Click any phase to learn more about it</div>
      )}
    </div>
  )
}
