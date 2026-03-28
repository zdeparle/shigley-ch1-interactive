import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useProgressStore from '../store/progressStore'

function Confetti() {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316']
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[i % colors.length],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.6 : p.size,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

function CelebrationScreen({ title, icon, stepsCount, correctAnswers, totalQuestions, xpEarned, onClose }) {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Confetti />
      <div className="animate-celebrate bg-[#141428] border border-[#252548] rounded-3xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-float">{icon}</div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">Module Complete!</h2>
          <p className="text-slate-400 mb-6">{title}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="animate-count-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl font-bold gradient-text">{stepsCount}</div>
              <div className="text-xs text-slate-500 mt-1">Steps</div>
            </div>
            <div className="animate-count-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
              <div className="text-xs text-slate-500 mt-1">Accuracy</div>
            </div>
            <div className="animate-count-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-2xl font-bold text-amber-400">+{xpEarned}</div>
              <div className="text-xs text-slate-500 mt-1">XP earned</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black py-3 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-orange-400 transition-all active:scale-[0.98]"
          >
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
    <div
      ref={containerRef}
      className="flex items-center gap-1.5 overflow-x-auto py-1 px-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current
        const isCompleted = completedSteps.includes(i)
        return (
          <div
            key={i}
            className={`shrink-0 rounded-full transition-all duration-300 ${
              isActive
                ? 'w-8 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                : isCompleted
                  ? 'w-2.5 h-2.5 bg-emerald-500'
                  : 'w-2.5 h-2.5 bg-[#252548]'
            }`}
          />
        )
      })}
    </div>
  )
}

function XPPopup({ amount, show }) {
  if (!show) return null
  return (
    <div className="animate-fade-in-up fixed top-20 right-6 z-50 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-xl font-bold text-sm backdrop-blur-sm">
      +{amount} XP ✨
    </div>
  )
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

  const requireInteraction = useCallback(() => setCanAdvance(false), [])

  const advance = () => {
    completeStep(moduleId, currentStep)
    if (isLast) {
      completeModule(moduleId)
      addXP(50)
      setShowCelebration(true)
    } else {
      setDirection('right')
      setAnimKey(k => k + 1)
      setCurrentStep(s => s + 1)
      setCanAdvance(true)
    }
  }

  const goBack = () => {
    if (currentStep === 0) return
    setDirection('left')
    setAnimKey(k => k + 1)
    setCurrentStep(s => s - 1)
    setCanAdvance(true)
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
    <div className="min-h-screen bg-[#0a0a16] text-slate-100">
      <XPPopup amount={xpNotif.amount} show={xpNotif.show} />

      {showCelebration && (
        <CelebrationScreen
          title={title}
          icon={icon}
          stepsCount={steps.length}
          correctAnswers={progress.correctAnswers || 0}
          totalQuestions={progress.totalQuestions || 0}
          xpEarned={50 + (progress.correctAnswers || 0) * 10}
          onClose={() => { setShowCelebration(false); navigate('/') }}
        />
      )}

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-[#252548] bg-[#0a0a16]/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2.5">
            <button
              onClick={() => navigate('/')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#141428] border border-[#252548] text-slate-400 hover:text-slate-100 hover:border-[#f59e0b] transition-all text-sm"
            >
              ←
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg">{icon}</span>
              <span className="font-semibold text-sm truncate">{title}</span>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-[#141428] px-2.5 py-1 rounded-full border border-[#252548]">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
          <StepDots
            total={steps.length}
            current={currentStep}
            completedSteps={progress.stepsCompleted || []}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div
          key={animKey}
          className={`bg-[#141428] border border-[#252548] rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col shadow-xl shadow-black/20 ${
            direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          }`}
        >
          <div className="flex-1">
            {typeof step.content === 'function'
              ? step.content({ onCorrect: handleCorrect, onInteract: requireInteraction })
              : step.content}
          </div>

          <div className="mt-8 flex justify-between items-center pt-4 border-t border-[#252548]/50">
            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-0 disabled:pointer-events-none text-sm font-medium"
            >
              <span>←</span> Back
            </button>
            <button
              onClick={advance}
              disabled={!canAdvance}
              className={`group px-7 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${
                canAdvance
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 shadow-[0_4px_16px_rgba(245,158,11,0.25)]'
                  : 'bg-[#252548] text-slate-500 cursor-not-allowed'
              }`}
            >
              {isLast ? 'Complete Module ✓' : 'Continue →'}
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-slate-600">
          <kbd className="px-1.5 py-0.5 bg-[#141428] border border-[#252548] rounded text-slate-500 font-mono text-[10px]">←</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-[#141428] border border-[#252548] rounded text-slate-500 font-mono text-[10px]">→</kbd>{' '}
          to navigate
        </div>
      </div>
    </div>
  )
}
