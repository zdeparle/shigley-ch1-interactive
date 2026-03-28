import { useState } from 'react'

export default function FillInTheBlank({ question, answer, tolerance = 0.01, unit = '', explanation, onCorrect, prefix = '', inputLabel = 'Your answer' }) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numAnswer = typeof answer === 'number' ? answer : parseFloat(answer)
  const isNumeric = !isNaN(numAnswer)

  const checkAnswer = () => {
    if (submitted) return
    setSubmitted(true)
    let correct = false
    if (isNumeric) {
      const numVal = parseFloat(value)
      if (!isNaN(numVal)) {
        const relErr = Math.abs(numVal - numAnswer) / (Math.abs(numAnswer) || 1)
        correct = relErr <= tolerance
      }
    } else {
      correct = value.trim().toLowerCase() === String(answer).toLowerCase()
    }
    if (correct && onCorrect) onCorrect()
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') checkAnswer()
  }

  const isCorrect = submitted && (() => {
    if (isNumeric) {
      const numVal = parseFloat(value)
      if (isNaN(numVal)) return false
      return Math.abs(numVal - numAnswer) / (Math.abs(numAnswer) || 1) <= tolerance
    }
    return value.trim().toLowerCase() === String(answer).toLowerCase()
  })()

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-slate-100 leading-snug">{question}</p>
      <div className="flex items-center gap-2.5">
        {prefix && <span className="font-mono text-slate-400 text-sm">{prefix}</span>}
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            disabled={submitted}
            placeholder={inputLabel}
            className={`w-full bg-[#0e0e1e] border-2 rounded-xl px-4 py-3 font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition-all ${
              submitted
                ? isCorrect
                  ? 'border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.15)]'
                : 'border-[#252548] focus:border-amber-500 focus:shadow-[0_0_12px_rgba(245,158,11,0.15)]'
            }`}
          />
          {submitted && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {isCorrect ? '✓' : '✗'}
            </div>
          )}
        </div>
        {unit && <span className="font-mono text-slate-400 text-sm">{unit}</span>}
        {!submitted && (
          <button
            onClick={checkAnswer}
            disabled={!value.trim()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black px-5 py-3 rounded-xl font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.97]"
          >
            Check
          </button>
        )}
      </div>
      {submitted && (
        <div className={`animate-fade-in-up p-4 rounded-xl text-sm leading-relaxed ${
          isCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
            : 'bg-red-500/10 border border-red-500/30 text-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg">{isCorrect ? '🎯' : '💡'}</span>
            <span className="font-bold">{isCorrect ? 'Correct!' : `The answer is ${answer}${unit ? ' ' + unit : ''}`}</span>
          </div>
          {explanation && <p className="text-slate-300">{explanation}</p>}
        </div>
      )}
    </div>
  )
}
