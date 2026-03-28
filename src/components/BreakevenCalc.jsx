import { useState } from 'react'
import InteractiveSlider from './InteractiveSlider'

export default function BreakevenCalc() {
  const [autoRate, setAutoRate] = useState(25)
  const [handRate, setHandRate] = useState(10)
  const [setupTime, setSetupTime] = useState(3)
  const [laborCost, setLaborCost] = useState(20)

  const breakeven = (setupTime * laborCost * autoRate * handRate) / (laborCost * (autoRate - handRate))
  const breakevenSimplified = (setupTime * autoRate * handRate) / (autoRate - handRate)

  const maxQ = Math.max(Math.ceil(breakevenSimplified * 2.5), 100)
  const points = 200
  const svgW = 500
  const svgH = 200
  const pad = { l: 50, r: 20, t: 10, b: 35 }
  const plotW = svgW - pad.l - pad.r
  const plotH = svgH - pad.t - pad.b

  const autoCost = (q) => (setupTime + q / autoRate) * laborCost
  const handCost = (q) => (q / handRate) * laborCost

  const xScale = (q) => pad.l + (q / maxQ) * plotW
  const maxCost = Math.max(autoCost(maxQ), handCost(maxQ))
  const yScale = (c) => pad.t + plotH - (c / maxCost) * plotH

  const autoPath = Array.from({ length: points + 1 }, (_, i) => {
    const q = (i / points) * maxQ
    return `${i === 0 ? 'M' : 'L'}${xScale(q).toFixed(1)},${yScale(autoCost(q)).toFixed(1)}`
  }).join(' ')

  const handPath = Array.from({ length: points + 1 }, (_, i) => {
    const q = (i / points) * maxQ
    return `${i === 0 ? 'M' : 'L'}${xScale(q).toFixed(1)},${yScale(handCost(q)).toFixed(1)}`
  }).join(' ')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InteractiveSlider label="Auto machine (parts/hr)" value={autoRate} min={10} max={50} step={1} onChange={setAutoRate} format={v => v.toFixed(0)} />
        <InteractiveSlider label="Hand machine (parts/hr)" value={handRate} min={2} max={autoRate - 1} step={1} onChange={setHandRate} format={v => v.toFixed(0)} />
        <InteractiveSlider label="Setup time (hr)" value={setupTime} min={0.5} max={8} step={0.5} onChange={setSetupTime} format={v => v.toFixed(1)} />
        <InteractiveSlider label="Labor cost ($/hr)" value={laborCost} min={10} max={50} step={1} onChange={setLaborCost} format={v => `$${v}`} />
      </div>

      <div className="bg-[#0e0e1e] rounded-xl p-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map(f => (
            <line key={f} x1={pad.l} y1={yScale(f * maxCost)} x2={svgW - pad.r} y2={yScale(f * maxCost)}
              stroke="#252548" strokeWidth="0.5" />
          ))}
          {/* Axes */}
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={svgH - pad.b} stroke="#475569" strokeWidth="1" />
          <line x1={pad.l} y1={svgH - pad.b} x2={svgW - pad.r} y2={svgH - pad.b} stroke="#475569" strokeWidth="1" />

          {/* Lines */}
          <path d={autoPath} fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d={handPath} fill="none" stroke="#ef4444" strokeWidth="2" />

          {/* Breakeven point */}
          {breakevenSimplified > 0 && breakevenSimplified < maxQ && (
            <>
              <line x1={xScale(breakevenSimplified)} y1={pad.t} x2={xScale(breakevenSimplified)} y2={svgH - pad.b}
                stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx={xScale(breakevenSimplified)} cy={yScale(autoCost(breakevenSimplified))} r="5"
                fill="#f59e0b" stroke="#0a0a16" strokeWidth="2" />
              <text x={xScale(breakevenSimplified)} y={pad.t + 12}
                fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                Breakeven: {Math.round(breakevenSimplified)} parts
              </text>
            </>
          )}

          {/* Labels */}
          <text x={svgW - pad.r} y={yScale(autoCost(maxQ)) - 5} fill="#3b82f6" fontSize="10" textAnchor="end">Auto</text>
          <text x={svgW - pad.r} y={yScale(handCost(maxQ)) - 5} fill="#ef4444" fontSize="10" textAnchor="end">Hand</text>
          <text x={svgW / 2} y={svgH - 5} fill="#94a3b8" fontSize="10" textAnchor="middle">Production quantity</text>
          <text x={15} y={svgH / 2} fill="#94a3b8" fontSize="10" textAnchor="middle"
            transform={`rotate(-90, 15, ${svgH / 2})`}>Cost ($)</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Breakeven point</div>
          <div className="font-mono font-bold text-[#f59e0b]">{Math.round(breakevenSimplified)} parts</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Auto setup cost</div>
          <div className="font-mono font-bold text-blue-400">${(setupTime * laborCost).toFixed(0)}</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Cost at breakeven</div>
          <div className="font-mono font-bold text-slate-200">${autoCost(breakevenSimplified).toFixed(0)}</div>
        </div>
      </div>
    </div>
  )
}
