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

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-slate-100">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let bg = 'bg-[#1e1e35] border-[#2d2d4e] hover:border-[#f59e0b] hover:bg-[#252540]'
          if (answered && i === correctIndex) bg = 'bg-emerald-900/40 border-emerald-500'
          else if (answered && i === selected) bg = 'bg-red-900/40 border-red-500'
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${bg} text-slate-200`}
            >
              <span className="font-bold text-[#f59e0b] mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`p-3 rounded-lg text-sm ${selected === correctIndex ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700' : 'bg-red-900/30 text-red-300 border border-red-700'}`}>
          <span className="font-bold">{selected === correctIndex ? '✓ Correct! ' : '✗ Not quite. '}</span>
          {explanation}
        </div>
      )}
    </div>
  )
}
