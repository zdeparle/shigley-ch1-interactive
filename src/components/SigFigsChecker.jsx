import { useState } from 'react'

const problems = [
  { value: 706, sigFigs: 3, display: '706', note: 'Three non-zero digits' },
  { value: 3.14, sigFigs: 3, display: '3.14', note: 'Three significant digits' },
  { value: 0.00219, sigFigs: 3, display: '0.00219', note: 'Leading zeros are NOT significant' },
  { value: 91600, sigFigs: 3, display: '91 600', note: 'Ambiguous — need scientific notation: 91.6 × 10³ for 3 sig figs' },
  { value: 706.0, sigFigs: 4, display: '706.0', note: 'Trailing zero after decimal IS significant' },
]

const roundingProblems = [
  { question: 'C = π × 0.40 in', answer: '1.3', sigFigs: 2, explanation: 'd = 0.40 has 2 sig figs, so C must also have 2 sig figs. C = 3.14159... × 0.40 = 1.2566... → 1.3 in' },
  { question: 'F = 12.5 × 3.1 N', answer: '39', sigFigs: 2, explanation: '3.1 has 2 sig figs (the limiting factor). 12.5 × 3.1 = 38.75 → 39 N (2 sig figs)' },
  { question: 'σ = 2000 / 0.785 psi', answer: '2550', sigFigs: 3, explanation: '0.785 has 3 sig figs. 2000/0.785 = 2547.77... → 2550 psi (3 sig figs)' },
]

export default function SigFigsChecker({ onCorrect }) {
  const [phase, setPhase] = useState('count') // 'count' or 'round'
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  const currentProblems = phase === 'count' ? problems : roundingProblems
  const allFilled = Object.keys(answers).length === currentProblems.length

  const handleChange = (idx, val) => {
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  const handleCheck = () => {
    setChecked(true)
    const allCorrect = currentProblems.every((p, i) => {
      if (phase === 'count') return parseInt(answers[i]) === p.sigFigs
      return answers[i]?.trim() === p.answer
    })
    if (allCorrect && phase === 'round' && onCorrect) onCorrect()
    if (allCorrect && phase === 'count') {
      setTimeout(() => {
        setPhase('round')
        setAnswers({})
        setChecked(false)
      }, 1500)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${phase === 'count' ? 'bg-[#f59e0b] text-black' : 'bg-[#252548] text-slate-400'}`}>
          1. Count sig figs
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${phase === 'round' ? 'bg-[#f59e0b] text-black' : 'bg-[#252548] text-slate-400'}`}>
          2. Round answers
        </div>
      </div>

      {phase === 'count' && (
        <div className="space-y-2">
          <p className="text-sm text-slate-300">How many significant figures does each number have?</p>
          {problems.map((p, i) => (
            <div key={i} className={`flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-3 border ${
              checked
                ? parseInt(answers[i]) === p.sigFigs ? 'border-emerald-600' : 'border-red-600'
                : 'border-[#252548]'
            }`}>
              <span className="font-mono text-lg text-slate-100 w-24">{p.display}</span>
              <input
                type="number"
                min={1}
                max={10}
                value={answers[i] || ''}
                onChange={e => handleChange(i, e.target.value)}
                disabled={checked}
                className="w-16 bg-[#141428] border border-[#252548] rounded px-2 py-1 text-center font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                placeholder="?"
              />
              <span className="text-xs text-slate-500">sig figs</span>
              {checked && (
                <span className={`text-xs ml-auto ${parseInt(answers[i]) === p.sigFigs ? 'text-emerald-400' : 'text-red-400'}`}>
                  {parseInt(answers[i]) === p.sigFigs ? '✓' : `✗ ${p.sigFigs} — ${p.note}`}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {phase === 'round' && (
        <div className="space-y-2">
          <p className="text-sm text-slate-300">Round each calculation to the correct number of significant figures:</p>
          {roundingProblems.map((p, i) => (
            <div key={i} className={`bg-[#0e0e1e] rounded-lg p-3 border ${
              checked
                ? answers[i]?.trim() === p.answer ? 'border-emerald-600' : 'border-red-600'
                : 'border-[#252548]'
            }`}>
              <div className="font-mono text-sm text-slate-300 mb-2">{p.question}</div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">=</span>
                <input
                  type="text"
                  value={answers[i] || ''}
                  onChange={e => handleChange(i, e.target.value)}
                  disabled={checked}
                  className="w-32 bg-[#141428] border border-[#252548] rounded px-2 py-1 font-mono text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                  placeholder="?"
                />
                <span className="text-xs text-slate-500">({p.sigFigs} sig figs)</span>
              </div>
              {checked && answers[i]?.trim() !== p.answer && (
                <div className="text-xs text-red-400 mt-1">✗ Answer: {p.answer} — {p.explanation}</div>
              )}
              {checked && answers[i]?.trim() === p.answer && (
                <div className="text-xs text-emerald-400 mt-1">✓ Correct!</div>
              )}
            </div>
          ))}
        </div>
      )}

      {allFilled && !checked && (
        <button onClick={handleCheck}
          className="w-full bg-[#f59e0b] text-black py-2.5 rounded-xl font-semibold hover:bg-[#d97706] transition-colors">
          Check Answers
        </button>
      )}
      {checked && phase === 'count' && problems.every((p, i) => parseInt(answers[i]) === p.sigFigs) && (
        <div className="text-center text-sm text-emerald-400 py-2">✓ Perfect! Moving to rounding practice...</div>
      )}
    </div>
  )
}
