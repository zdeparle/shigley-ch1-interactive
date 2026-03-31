import { useState } from 'react'

export default function RevealSteps({ steps, onComplete }) {
  const [revealed, setRevealed] = useState(1)
  const allRevealed = revealed >= steps.length

  const revealNext = () => {
    const next = revealed + 1
    setRevealed(next)
    if (next >= steps.length && onComplete) onComplete()
  }

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const visible = i < revealed
        const justRevealed = i === revealed - 1 && revealed > 1
        return (
          <div key={i} className={`rounded-xl border-2 p-4 transition-all duration-500 ${
            visible
              ? step.highlight
                ? 'border-blue-300 bg-blue-50 shadow-sm'
                : 'border-slate-200 bg-white'
              : 'border-slate-100 bg-slate-50/50 opacity-20 blur-sm pointer-events-none select-none scale-[0.98]'
          } ${justRevealed ? 'animate-fade-in-up' : ''}`}>
            <div className="flex gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                step.highlight ? 'bg-blue-600 text-white' : visible ? 'bg-slate-100 text-slate-600' : 'bg-slate-50 text-slate-400'
              }`}>{i + 1}</div>
              <div className="flex-1 min-w-0">
                {step.label && <div className="text-slate-700 text-sm font-medium mb-1">{step.label}</div>}
                {step.math && <div className="font-mono text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-1.5 inline-block mt-0.5">{step.math}</div>}
                {step.result && <div className={`font-mono font-bold text-sm mt-1.5 ${step.highlight ? 'text-blue-600' : 'text-slate-800'}`}>{step.result}</div>}
                {step.content && <div className="text-sm text-slate-600 leading-relaxed">{step.content}</div>}
              </div>
            </div>
          </div>
        )
      })}
      {!allRevealed && (
        <button onClick={revealNext} className="w-full py-3 rounded-xl border-2 border-dashed border-blue-300 text-blue-600 text-sm font-bold hover:bg-blue-50 hover:border-blue-400 transition-all active:scale-[0.99] group">
          <span className="group-hover:mr-1 transition-all">Reveal step {revealed + 1}</span> →
        </button>
      )}
      {allRevealed && (
        <div className="animate-fade-in-up text-center text-sm text-emerald-600 py-2 font-medium flex items-center justify-center gap-1.5">
          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</span>
          All steps revealed
        </div>
      )}
    </div>
  )
}
