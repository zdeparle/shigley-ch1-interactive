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
          <div
            key={i}
            className={`rounded-xl border-2 p-4 transition-all duration-500 ${
              visible
                ? step.highlight
                  ? 'border-amber-500/40 bg-amber-500/5 shadow-[0_0_16px_rgba(245,158,11,0.08)]'
                  : 'border-[#252548] bg-[#0e0e1e]'
                : 'border-[#252548]/50 bg-[#0e0e1e]/30 opacity-20 blur-sm pointer-events-none select-none scale-[0.98]'
            } ${justRevealed ? 'animate-fade-in-up' : ''}`}
          >
            <div className="flex gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                step.highlight
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-black'
                  : visible
                    ? 'bg-[#252548] text-slate-300'
                    : 'bg-[#252548]/50 text-slate-600'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                {step.label && <div className="text-slate-200 text-sm font-medium mb-1">{step.label}</div>}
                {step.math && (
                  <div className="font-mono text-xs text-slate-400 bg-[#141428] rounded-lg px-3 py-1.5 inline-block mt-0.5">
                    {step.math}
                  </div>
                )}
                {step.result && (
                  <div className={`font-mono font-bold text-sm mt-1.5 ${step.highlight ? 'gradient-text' : 'text-slate-100'}`}>
                    {step.result}
                  </div>
                )}
                {step.content && <div className="text-sm text-slate-300 leading-relaxed">{step.content}</div>}
              </div>
            </div>
          </div>
        )
      })}

      {!allRevealed && (
        <button
          onClick={revealNext}
          className="w-full py-3 rounded-xl border-2 border-dashed border-amber-500/30 text-amber-400 text-sm font-bold hover:bg-amber-500/5 hover:border-amber-500/50 transition-all active:scale-[0.99] group"
        >
          <span className="group-hover:mr-1 transition-all">Reveal step {revealed + 1}</span> →
        </button>
      )}

      {allRevealed && (
        <div className="animate-fade-in-up text-center text-sm text-emerald-400 py-2 font-medium flex items-center justify-center gap-1.5">
          <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">✓</span>
          All steps revealed
        </div>
      )}
    </div>
  )
}
