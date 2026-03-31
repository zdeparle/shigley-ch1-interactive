import { useState } from 'react'

export default function Quiz({ question, options, correctIndex, explanation, onCorrect, onIncorrect }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (i) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === correctIndex) { if (onCorrect) onCorrect() }
    else { if (onIncorrect) onIncorrect() }
  }

  const isCorrect = selected === correctIndex

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-slate-800 leading-snug">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isThis = i === selected
          const isAnswer = i === correctIndex

          let classes = 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
          if (answered && isAnswer) {
            classes = 'bg-emerald-50 border-emerald-400 shadow-sm'
          } else if (answered && isThis) {
            classes = 'bg-red-50 border-red-400 shadow-sm'
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
                      : 'bg-slate-100 text-slate-500'
                }`}>
                  {answered && isAnswer ? '✓' : answered && isThis ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span className={`text-sm leading-relaxed pt-0.5 ${answered && !isAnswer && !isThis ? 'text-slate-400' : 'text-slate-700'}`}>
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
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg">{isCorrect ? '🎯' : '💡'}</span>
            <span className="font-bold">{isCorrect ? 'Correct!' : 'Not quite'}</span>
          </div>
          <p className="text-slate-600">{explanation}</p>
        </div>
      )}
    </div>
  )
}
