import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useProgressStore from '../store/progressStore'

function Confetti() {
  const colors = ['#2563eb', '#16a34a', '#7c3aed', '#dc2626', '#d97706', '#0891b2']
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i, left: Math.random() * 100, color: colors[i % colors.length],
    delay: Math.random() * 2, duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8, shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{
          left: `${p.left}%`, backgroundColor: p.color, animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`, width: p.size,
          height: p.shape === 'rect' ? p.size * 0.6 : p.size,
          borderRadius: p.shape === 'circle' ? '50%' : '2px',
        }} />
      ))}
    </div>
  )
}

function CelebrationScreen({ title, icon, stepsCount, correctAnswers, totalQuestions, xpEarned, onClose }) {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100
  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm">
      <Confetti />
      <div className="animate-celebrate bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full sm:mx-4 text-center relative overflow-hidden shadow-2xl pb-10 sm:pb-8">
        <div className="relative z-10">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 animate-float">{icon}</div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Module Complete!</h2>
          <p className="text-slate-500 text-sm mb-5 sm:mb-6">{title}</p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="animate-count-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{stepsCount}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">Steps</div>
            </div>
            <div className="animate-count-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">{accuracy}%</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">Accuracy</div>
            </div>
            <div className="animate-count-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-xl sm:text-2xl font-bold text-violet-600">+{xpEarned}</div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1">XP earned</div>
            </div>
          </div>
          <button onClick={onClose} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all active:scale-[0.98]">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

function StepDots({ total, current, completedSteps }) {
  const containerRef = useRef(null)
  useEffect(() => {
    if (containerRef.current) {
      const dot = containerRef.current.children[current]
      if (dot) dot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [current])
  return (
    <div ref={containerRef} className="flex items-center gap-1.5 overflow-x-auto py-1 px-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current
        const isCompleted = completedSteps.includes(i)
        return (
          <div key={i} className={`shrink-0 rounded-full transition-all duration-300 ${
            isActive ? 'w-8 h-2.5 bg-blue-600 shadow-sm' : isCompleted ? 'w-2.5 h-2.5 bg-emerald-500' : 'w-2.5 h-2.5 bg-slate-200'
          }`} />
        )
      })}
    </div>
  )
}

function XPPopup({ amount, show }) {
  if (!show) return null
  return <div className="animate-fade-in-up fixed top-20 right-6 z-50 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm shadow-lg">+{amount} XP ✨</div>
}

export default function ModuleLayout({ moduleId, title, icon, steps }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [canAdvance, setCanAdvance] = useState(true)
  const [direction, setDirection] = useState('right')
  const [animKey, setAnimKey] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [xpNotif, setXpNotif] = useState({ show: false, amount: 0 })
  const navigate = useNavigate()
  const { completeStep, completeModule, addXP, recordAnswer, moduleProgress } = useProgressStore()

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const progress = moduleProgress[moduleId] || { stepsCompleted: [], correctAnswers: 0, totalQuestions: 0 }

  const showXP = useCallback((amount) => {
    setXpNotif({ show: true, amount })
    setTimeout(() => setXpNotif({ show: false, amount: 0 }), 1500)
  }, [])

  const handleCorrect = useCallback(() => {
    setCanAdvance(true)
    recordAnswer(moduleId, true)
    addXP(10)
    showXP(10)
  }, [moduleId, recordAnswer, addXP, showXP])

  const handleIncorrect = useCallback(() => {
    recordAnswer(moduleId, false)
  }, [moduleId, recordAnswer])

  const requireInteraction = useCallback(() => setCanAdvance(false), [])

  const advance = () => {
    completeStep(moduleId, currentStep)
    if (isLast) {
      completeModule(moduleId)
      addXP(50)
      setShowCelebration(true)
    } else {
      setDirection('right'); setAnimKey(k => k + 1); setCurrentStep(s => s + 1); setCanAdvance(true)
    }
  }

  const goBack = () => {
    if (currentStep === 0) return
    setDirection('left'); setAnimKey(k => k + 1); setCurrentStep(s => s - 1); setCanAdvance(true)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && canAdvance) advance()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [canAdvance, currentStep])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <XPPopup amount={xpNotif.amount} show={xpNotif.show} />

      {showCelebration && (
        <CelebrationScreen title={title} icon={icon} stepsCount={steps.length}
          correctAnswers={progress.correctAnswers || 0} totalQuestions={progress.totalQuestions || 0}
          xpEarned={50 + (progress.correctAnswers || 0) * 10}
          onClose={() => { setShowCelebration(false); navigate('/') }} />
      )}

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <button onClick={() => navigate('/')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-blue-300 transition-all text-sm shrink-0">←</button>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-base sm:text-lg">{icon}</span>
              <span className="font-semibold text-xs sm:text-sm truncate text-slate-700">{title}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-200 shrink-0">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          <StepDots total={steps.length} current={currentStep} completedSteps={progress.stepsCompleted || []} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-8">
        <div key={animKey} className={`bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 md:p-8 min-h-[320px] sm:min-h-[420px] flex flex-col shadow-sm ${
          direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'
        }`}>
          <div className="flex-1 text-sm sm:text-base overflow-x-hidden">
            {typeof step.content === 'function'
              ? step.content({ onCorrect: handleCorrect, onIncorrect: handleIncorrect, onInteract: requireInteraction })
              : step.content}
          </div>
          <div className="mt-6 sm:mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
            <button onClick={goBack} disabled={currentStep === 0}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-0 disabled:pointer-events-none text-sm font-medium active:scale-95">
              <span>←</span> Back
            </button>
            <button onClick={advance} disabled={!canAdvance}
              className={`group px-5 sm:px-7 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${
                canAdvance ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}>
              {isLast ? '✓ Complete' : 'Continue →'}
            </button>
          </div>
        </div>
        <div className="text-center mt-3 text-xs text-slate-400 hidden sm:block">
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-400 font-mono text-[10px]">←</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-400 font-mono text-[10px]">→</kbd>{' '}
          to navigate
        </div>
      </div>
    </div>
  )
}
