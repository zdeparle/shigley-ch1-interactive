import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useProgressStore from '../store/progressStore'
import UNIT_TESTS from '../data/testQuestions'

export default function LevelTest() {
  const { unitIndex } = useParams()
  const ui = parseInt(unitIndex)
  const navigate = useNavigate()
  const { passUnitTest, unitTests } = useProgressStore()

  const test = UNIT_TESTS.find(t => t.unitIndex === ui)
  const alreadyPassed = unitTests?.[ui]

  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState({}) // { qIndex: Set of wrong option indices }
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  // Shuffle questions on mount
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  useEffect(() => {
    if (test) {
      setShuffledQuestions([...test.questions].sort(() => Math.random() - 0.5))
    }
  }, [ui])

  if (!test) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-xl font-bold text-slate-700">Test not found</h1>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Back to Home</button>
        </div>
      </div>
    )
  }

  if (shuffledQuestions.length === 0) return null

  const totalQuestions = shuffledQuestions.length
  const q = shuffledQuestions[currentQ]
  const currentWrong = wrongAttempts[currentQ] || new Set()

  const handleSelect = (optIdx) => {
    if (confirmed) return
    if (currentWrong.has(optIdx)) return // Can't re-select a wrong answer
    setSelected(optIdx)
  }

  const handleConfirm = () => {
    if (selected === null || confirmed) return
    const correct = selected === q.correct
    setIsCorrect(correct)
    setConfirmed(true)

    if (correct) {
      if (currentWrong.size === 0) {
        setFirstTryCorrect(prev => prev + 1)
      }
    } else {
      setWrongAttempts(prev => ({
        ...prev,
        [currentQ]: new Set([...(prev[currentQ] || []), selected])
      }))
    }
  }

  const handleNext = () => {
    if (!isCorrect) {
      // Try again — reset selection but keep wrong attempts
      setSelected(null)
      setConfirmed(false)
      setIsCorrect(false)
      return
    }

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
      setConfirmed(false)
      setIsCorrect(false)
    } else {
      // Finished all questions
      setFinished(true)
      if (!alreadyPassed) {
        passUnitTest(ui)
      }
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setSelected(null)
    setConfirmed(false)
    setIsCorrect(false)
    setWrongAttempts({})
    setFirstTryCorrect(0)
    setFinished(false)
    setShuffledQuestions([...test.questions].sort(() => Math.random() - 0.5))
  }

  // Completion screen
  if (finished) {
    const pct = Math.round((firstTryCorrect / totalQuestions) * 100)
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center mt-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Test Complete!</h1>
            <p className="text-slate-500 mb-6">You answered every question correctly.</p>

            <div className="inline-flex items-center gap-6 bg-slate-50 rounded-2xl px-8 py-5 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold font-mono text-blue-600">{pct}%</div>
                <div className="text-xs text-slate-500 mt-1">First-try accuracy</div>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <div className="text-4xl font-bold font-mono text-emerald-600">{firstTryCorrect}/{totalQuestions}</div>
                <div className="text-xs text-slate-500 mt-1">Correct on first try</div>
              </div>
            </div>

            {!alreadyPassed && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <span className="text-emerald-700 font-semibold">Next unit unlocked! +50 XP</span>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Continue Learning
              </button>
              <button onClick={handleRetry}
                className="px-6 py-3 rounded-xl font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                Retake
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question screen
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm">
            <span>←</span> Exit Test
          </button>
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600">
            Unit {ui + 1} Test
          </span>
        </div>

        {alreadyPassed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 text-sm text-emerald-700 text-center">
            ✓ Already passed — taking again for practice.
          </div>
        )}

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {shuffledQuestions.map((_, qi) => (
            <div
              key={qi}
              className={`w-3 h-3 rounded-full transition-all ${
                qi < currentQ
                  ? 'bg-emerald-500'
                  : qi === currentQ
                    ? 'bg-blue-600 scale-125'
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
          <div className="text-xs font-bold text-slate-400 uppercase mb-3">
            Question {currentQ + 1} of {totalQuestions}
          </div>
          <p className="text-slate-800 font-medium mb-6 leading-relaxed text-lg">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt, oi) => {
              const isWrong = currentWrong.has(oi)
              const isSelected = selected === oi
              const showCorrect = confirmed && isCorrect && oi === q.correct
              const showWrong = confirmed && !isCorrect && isSelected

              let borderClass = 'border-slate-200 bg-white'
              let textClass = 'text-slate-600'
              let badgeClass = 'bg-slate-100 text-slate-500'

              if (isWrong && !isSelected) {
                // Previously wrong — greyed out
                borderClass = 'border-slate-100 bg-slate-50 opacity-40'
                textClass = 'text-slate-400 line-through'
                badgeClass = 'bg-red-100 text-red-400'
              } else if (showCorrect) {
                borderClass = 'border-emerald-400 bg-emerald-50'
                textClass = 'text-emerald-700 font-medium'
                badgeClass = 'bg-emerald-500 text-white'
              } else if (showWrong) {
                borderClass = 'border-red-400 bg-red-50'
                textClass = 'text-red-600'
                badgeClass = 'bg-red-500 text-white'
              } else if (isSelected) {
                borderClass = 'border-blue-500 bg-blue-50'
                textClass = 'text-blue-700 font-medium'
                badgeClass = 'bg-blue-600 text-white'
              }

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(oi)}
                  disabled={isWrong || confirmed}
                  className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${borderClass} ${
                    !isWrong && !confirmed ? 'hover:border-slate-300 hover:bg-slate-50 cursor-pointer' : ''
                  } ${isWrong ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${badgeClass}`}>
                    {showCorrect ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + oi)}
                  </div>
                  <span className={`text-sm pt-0.5 ${textClass}`}>{opt}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feedback + action area */}
        {confirmed && (
          <div className={`rounded-xl p-4 mb-4 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                {isCorrect ? 'Correct!' : 'Not quite — try again.'}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-sm text-red-600">That option has been eliminated. Select another answer.</p>
            )}
          </div>
        )}

        {/* Action button */}
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="w-full py-3.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-colors ${
              isCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isCorrect
              ? currentQ < totalQuestions - 1 ? 'Next Question →' : 'Finish Test'
              : 'Try Again'
            }
          </button>
        )}
      </div>
    </div>
  )
}
