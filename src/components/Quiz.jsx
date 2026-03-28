import { useState } from 'react'

export default function Quiz({ question, options, correctIndex, explanation, onCorrect }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (i) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === correctIndex && onCorrect) onCorrect()
  }

  const isCorrect = selected === correctIndex

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-slate-100 leading-snug">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isThis = i === selected
          const isAnswer = i === correctIndex

          let classes = 'bg-[#1a1a36] border-[#252548] hover:border-amber-500/50 hover:bg-[#1e1e3a]'
          if (answered && isAnswer) {
            classes = 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
          } else if (answered && isThis) {
            classes = 'bg-red-500/10 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)]'
          }

          const animClass = answered && isThis
            ? isCorrect ? 'animate-correct-pulse' : 'animate-shake'
            : ''

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 ${classes} ${animClass} ${
                !answered ? 'active:scale-[0.98] cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  answered && isAnswer
                    ? 'bg-emerald-500 text-white'
                    : answered && isThis
                      ? 'bg-red-500 text-white'
                      : 'bg-[#252548] text-slate-400'
                }`}>
                  {answered && isAnswer ? '✓' : answered && isThis ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span className={`text-sm leading-relaxed pt-0.5 ${answered && !isAnswer && !isThis ? 'text-slate-500' : 'text-slate-200'}`}>
                  {opt}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`animate-fade-in-up p-4 rounded-xl text-sm leading-relaxed ${
          isCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
            : 'bg-red-500/10 border border-red-500/30 text-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-lg ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? '🎯' : '💡'}
            </span>
            <span className="font-bold">{isCorrect ? 'Correct!' : 'Not quite'}</span>
          </div>
          <p className="text-slate-300">{explanation}</p>
        </div>
      )}
    </div>
  )
}
