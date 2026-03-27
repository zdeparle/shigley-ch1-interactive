import { useNavigate } from 'react-router-dom'
import LessonCard from '../components/LessonCard'
import ProgressBar from '../components/ProgressBar'
import useProgressStore from '../store/progressStore'

const MODULES = [
  { id: 'module1', title: 'The Design Process', icon: '🔄', description: 'Phases of design, considerations, and the iterative nature of engineering', totalSteps: 5 },
  { id: 'module2', title: 'Stress, Strength & Uncertainty', icon: '⚡', description: 'The fundamental difference between stress (load-dependent) and strength (material property)', totalSteps: 4 },
  { id: 'module3', title: 'Design Factor & Factor of Safety', icon: '🛡️', description: 'Size parts using design factor nd, then find actual factor of safety after rounding', totalSteps: 4 },
  { id: 'module4', title: 'Reliability & Probability', icon: '📊', description: 'Normal distributions, z-transforms, and series system reliability', totalSteps: 4 },
  { id: 'module5', title: 'Design Factor & Reliability', icon: '🎯', description: 'Stress-strength interference and quantifying failure probability', totalSteps: 4 },
  { id: 'module6', title: 'Dimensions & Tolerances', icon: '📐', description: 'Tolerance terminology, stack-up analysis, and clearance vs. interference fits', totalSteps: 4 },
]

export default function Home() {
  const { moduleProgress, resetAll } = useProgressStore()

  const getProgress = (module) => {
    const p = moduleProgress[module.id]
    if (!p) return 0
    if (p.completed) return 100
    return Math.round((p.stepsCompleted.length / module.totalSteps) * 100)
  }

  const totalCompleted = MODULES.filter(m => moduleProgress[m.id]?.completed).length
  const overallProgress = Math.round((totalCompleted / MODULES.length) * 100)

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      {/* Hero */}
      <div className="bg-[#1a1a2e] border-b border-[#2d2d4e]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-start gap-4">
            <div className="text-5xl">⚙️</div>
            <div className="flex-1">
              <div className="text-sm text-[#f59e0b] font-semibold uppercase tracking-wider mb-1">Shigley's MED 11e</div>
              <h1 className="text-3xl font-bold text-slate-100">Chapter 1: Introduction to Mechanical Engineering Design</h1>
              <p className="text-slate-400 mt-2">6 interactive modules · Progressive learning · Immediate feedback</p>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar percent={overallProgress} className="flex-1" />
                <span className="text-sm font-mono text-[#f59e0b] whitespace-nowrap">{totalCompleted}/{MODULES.length} modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-300">Learning Modules</h2>
          <button onClick={resetAll} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Reset progress
          </button>
        </div>
        <div className="grid gap-3">
          {MODULES.map((module, i) => (
            <LessonCard
              key={module.id}
              module={module}
              progress={getProgress(module)}
              index={i}
            />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-600">
          Based on Shigley's Mechanical Engineering Design, 11th Edition · Chapter 1
        </div>
      </div>
    </div>
  )
}
