import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'
import useProgressStore from '../store/progressStore'

export default function ModuleLayout({ moduleId, title, icon, steps }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [canAdvance, setCanAdvance] = useState(true)
  const navigate = useNavigate()
  const { completeStep, completeModule } = useProgressStore()

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const progress = Math.round((currentStep / steps.length) * 100)

  const advance = () => {
    completeStep(moduleId, currentStep)
    if (isLast) {
      completeModule(moduleId)
      navigate('/')
    } else {
      setCurrentStep(s => s + 1)
      setCanAdvance(true)
    }
  }

  const requireInteraction = () => setCanAdvance(false)
  const allowAdvance = () => setCanAdvance(true)

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-slate-100">
      {/* Header */}
      <div className="border-b border-[#2d2d4e] bg-[#1a1a2e] px-4 py-3 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-100 transition-colors">
          &larr; Back
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span>{icon}</span>
            <span className="font-semibold">{title}</span>
            <span className="text-slate-500 text-sm">&middot; Step {currentStep + 1}/{steps.length}</span>
          </div>
          <ProgressBar percent={progress} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-2xl p-6 md:p-8 min-h-[400px] flex flex-col">
          <div className="flex-1">
            {typeof step.content === 'function'
              ? step.content({ onCorrect: allowAdvance, onInteract: requireInteraction })
              : step.content}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="text-slate-400 hover:text-slate-100 transition-colors disabled:opacity-30 text-sm"
            >
              &larr; Previous
            </button>
            <button
              onClick={advance}
              disabled={!canAdvance}
              className="bg-[#f59e0b] text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-[#d97706] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLast ? 'Complete Module \u2713' : 'Continue \u2192'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
