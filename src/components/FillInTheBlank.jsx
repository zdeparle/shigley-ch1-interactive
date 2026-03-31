import { useState } from 'react'

export default function FillInTheBlank({ question, answer, tolerance = 0.01, unit = '', explanation, onCorrect, onIncorrect, prefix = '', inputLabel = 'Your answer' }) {
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
    if (correct) { if (onCorrect) onCorrect() }
    else { if (onIncorrect) onIncorrect() }
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
      <p className="text-lg font-semibold text-slate-800 leading-snug">{question}</p>
      <div className="flex items-center gap-2.5">
        {prefix && <span className="font-mono text-slate-500 text-sm">{prefix}</span>}
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            disabled={submitted}
            placeholder={inputLabel}
            className={`w-full bg-white border-2 rounded-xl px-4 py-3 font-mono text-slate-800 placeholder-slate-300 focus:outline-none transition-all ${
              submitted
                ? isCorrect
                  ? 'border-emerald-400 bg-emerald-50'
                  : 'border-red-400 bg-red-50'
                : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
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
        {unit && <span className="font-mono text-slate-500 text-sm">{unit}</span>}
        {!submitted && (
          <button
            onClick={checkAnswer}
            disabled={!value.trim()}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.97]"
          >
            Check
          </button>
        )}
      </div>
      {submitted && (
        <div className={`animate-fade-in-up p-4 rounded-xl text-sm leading-relaxed ${
          isCorrect
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg">{isCorrect ? '🎯' : '💡'}</span>
            <span className="font-bold">{isCorrect ? 'Correct!' : `The answer is ${answer}${unit ? ' ' + unit : ''}`}</span>
          </div>
          {explanation && <p className="text-slate-600">{explanation}</p>}
        </div>
      )}
    </div>
  )
}
