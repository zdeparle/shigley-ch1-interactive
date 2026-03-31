import { Link } from 'react-router-dom'
import LessonCard from '../components/LessonCard'
import ProgressBar from '../components/ProgressBar'
import useProgressStore from '../store/progressStore'
import UNIT_TESTS from '../data/testQuestions'

const UNITS = [
  {
    title: 'Foundations of Design',
    icon: '🏗️',
    modules: [
      { id: 'module1', title: 'What is Design?', icon: '💡', description: 'Design definitions, characteristics, and the scope of mechanical engineering design', totalSteps: 10 },
      { id: 'module2', title: 'The Design Process', icon: '🔄', description: 'The 6 phases: need → definition → synthesis → analysis → evaluation → presentation', totalSteps: 12 },
      { id: 'module3', title: 'Design Considerations', icon: '⚖️', description: '26 design considerations and the art of engineering trade-offs', totalSteps: 8 },
    ]
  },
  {
    title: 'Professional Context',
    icon: '🎓',
    modules: [
      { id: 'module4', title: 'Design Tools & Resources', icon: '🖥️', description: 'CAD, CAE, FEA, CFD tools and information sources for engineers', totalSteps: 9 },
      { id: 'module5', title: 'Professional Practice', icon: '👔', description: 'Ethics, communication, systematic problem-solving, and the Engineers\' Creed', totalSteps: 9 },
      { id: 'module6', title: 'Standards & Codes', icon: '📋', description: 'Standards for uniformity vs. codes for safety — ASME, ASTM, ISO, and more', totalSteps: 8 },
    ]
  },
  {
    title: 'Economics & Safety',
    icon: '💰',
    modules: [
      { id: 'module7', title: 'Engineering Economics', icon: '💰', description: 'Standard sizes, tolerance-cost curves, and breakeven analysis', totalSteps: 10 },
      { id: 'module8', title: 'Safety & Product Liability', icon: '⚠️', description: 'Strict liability, defect types, and how good engineering prevents lawsuits', totalSteps: 6 },
    ]
  },
  {
    title: 'Stress, Strength & Uncertainty',
    icon: '⚡',
    modules: [
      { id: 'module9', title: 'Stress & Strength', icon: '⚡', description: 'The core distinction: stress (load-dependent) vs. strength (material property)', totalSteps: 10 },
      { id: 'module10', title: 'Design Factor & Factor of Safety', icon: '🛡️', description: 'Sizing parts with nd, rounding to standard sizes, and eccentric loading', totalSteps: 12 },
    ]
  },
  {
    title: 'Probability & Reliability',
    icon: '📊',
    modules: [
      { id: 'module11', title: 'Reliability & Probability', icon: '📊', description: 'Normal distributions, z-transforms, series systems, and statistical data', totalSteps: 13 },
      { id: 'module12', title: 'Design Factor ↔ Reliability', icon: '🎯', description: 'Stress-strength interference, Eq 1-11, and quantifying failure probability', totalSteps: 11 },
    ]
  },
  {
    title: 'Dimensions & Practical Methods',
    icon: '📐',
    modules: [
      { id: 'module13', title: 'Dimensions & Tolerances', icon: '📐', description: 'Tolerance terminology, stack-up analysis, and the shouldered screw example', totalSteps: 14 },
      { id: 'module14', title: 'Units & Calculations', icon: '📏', description: 'SI, fps, ips unit systems and significant figures in engineering calculations', totalSteps: 10 },
      { id: 'module15', title: 'Case Study: Power Transmission', icon: '⚙️', description: 'Speed reducer design specifications and design topic interdependencies', totalSteps: 10 },
    ]
  },
]

const ALL_MODULES = UNITS.flatMap(u => u.modules)

const UNIT_COLORS = [
  { accent: '#2563eb', ring: 'ring-blue-500/30' },
  { accent: '#7c3aed', ring: 'ring-violet-500/30' },
  { accent: '#059669', ring: 'ring-emerald-500/30' },
  { accent: '#dc2626', ring: 'ring-red-500/30' },
  { accent: '#d97706', ring: 'ring-amber-500/30' },
  { accent: '#0891b2', ring: 'ring-cyan-500/30' },
]

export default function Home() {
  const { moduleProgress, unitTests, xp, streak, resetAll, isUnitUnlocked } = useProgressStore()

  const getProgress = (module) => {
    const p = moduleProgress[module.id]
    if (!p) return 0
    if (p.completed) return 100
    return Math.round((p.stepsCompleted.length / module.totalSteps) * 100)
  }

  const totalCompleted = ALL_MODULES.filter(m => moduleProgress[m.id]?.completed).length
  const overallProgress = Math.round((totalCompleted / ALL_MODULES.length) * 100)
  const totalSteps = ALL_MODULES.reduce((s, m) => s + m.totalSteps, 0)
  const stepsCompleted = ALL_MODULES.reduce((s, m) => {
    const p = moduleProgress[m.id]
    return s + (p ? p.stepsCompleted.length : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-200">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-start gap-3 sm:gap-5">
            <div className="text-4xl sm:text-5xl animate-float shrink-0">⚙️</div>
            <div className="flex-1 min-w-0">
              <div className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                Shigley's MED 11e
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                Chapter 1: Introduction to<br />
                <span className="gradient-text">Mechanical Engineering Design</span>
              </h1>
              <p className="text-slate-500 mt-2 sm:mt-3 text-xs sm:text-sm">
                {ALL_MODULES.length} modules · {totalSteps} steps · Immediate feedback
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-3 sm:gap-6 mt-4 sm:mt-5">
                <div className="flex items-center gap-3 flex-1">
                  <ProgressBar percent={overallProgress} className="flex-1 max-w-xs" size="md" glow />
                  <span className="text-xs sm:text-sm font-bold text-slate-500 whitespace-nowrap">
                    {totalCompleted}<span className="text-slate-400">/{ALL_MODULES.length}</span>
                  </span>
                </div>
              </div>

              {/* Gamification stats */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
                  <span className="text-blue-500 text-xs sm:text-sm">⚡</span>
                  <span className="text-xs sm:text-sm font-bold text-blue-600">{xp || 0}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">XP</span>
                </div>
                {(streak || 0) > 0 && (
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
                    <span className="text-orange-500 text-xs sm:text-sm">🔥</span>
                    <span className="text-xs sm:text-sm font-bold text-orange-600">{streak}</span>
                    <span className="text-[10px] sm:text-xs text-slate-500">streak</span>
                  </div>
                )}
                <div className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-sm">
                  <span className="text-emerald-500 text-xs sm:text-sm">✓</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">{stepsCompleted}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">done</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules by unit */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="font-bold text-slate-700 text-base sm:text-lg">Learning Modules</h2>
          <button
            onClick={resetAll}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200"
          >
            Reset progress
          </button>
        </div>

        <div className="space-y-8">
          {UNITS.map((unit, ui) => {
            const color = UNIT_COLORS[ui]
            const unitModules = unit.modules
            const unitComplete = unitModules.every(m => moduleProgress[m.id]?.completed)
            const unlocked = isUnitUnlocked(ui)
            const testPassed = !!unitTests?.[ui]
            const hasTest = UNIT_TESTS.some(t => t.unitIndex === ui)
            const testData = UNIT_TESTS.find(t => t.unitIndex === ui)

            return (
              <div key={unit.title} className="animate-fade-in-up" style={{ animationDelay: `${ui * 0.05}s` }}>
                {/* Unit header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ring-2 ${!unlocked ? 'opacity-40' : ''}`}
                    style={{
                      backgroundColor: color.accent + '15',
                      color: color.accent,
                      '--tw-ring-color': color.accent + '30',
                    }}
                  >
                    {!unlocked ? '🔒' : unitComplete ? '✓' : ui + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${!unlocked ? 'opacity-40' : ''}`} style={{ color: color.accent }}>
                      {unit.title}
                      {!unlocked && <span className="text-xs font-normal text-slate-400 ml-2">Pass previous test to unlock</span>}
                    </h3>
                  </div>
                  <div className="h-px flex-1 max-w-24" style={{ backgroundColor: color.accent + '20' }} />
                </div>

                {/* Module cards */}
                <div className="grid gap-3 pl-2">
                  {unitModules.map((module) => {
                    const globalIdx = ALL_MODULES.findIndex(m => m.id === module.id)
                    return (
                      <LessonCard
                        key={module.id}
                        module={module}
                        progress={getProgress(module)}
                        index={globalIdx}
                        unitIndex={ui}
                        locked={!unlocked}
                      />
                    )
                  })}
                </div>

                {/* Unit test card — appears after every unit that has a test (units 0-4) */}
                {hasTest && (
                  <div className="pl-2 mt-3">
                    {testPassed ? (
                      /* Passed test card */
                      <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl shrink-0">
                          ✅
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-emerald-700 text-sm">Unit {ui + 1} Test — Passed!</div>
                          <div className="text-xs text-emerald-600 mt-0.5">You've unlocked the next unit. +50 XP earned.</div>
                        </div>
                        <Link
                          to={`/test/${ui}`}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          Retake
                        </Link>
                      </div>
                    ) : unlocked ? (
                      /* Available test card */
                      <Link
                        to={`/test/${ui}`}
                        className="flex items-center gap-4 bg-white border-2 border-dashed border-blue-300 rounded-2xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                          📝
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-blue-700 text-sm">Unit {ui + 1} Test: {testData.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {testData.questions.length} questions · {Math.round(testData.passingScore / testData.questions.length * 100)}% to pass · Unlocks next unit
                          </div>
                        </div>
                        <div className="text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                          Take Test →
                        </div>
                      </Link>
                    ) : (
                      /* Locked test card */
                      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 opacity-40">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                          🔒
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-500 text-sm">Unit {ui + 1} Test</div>
                          <div className="text-xs text-slate-400 mt-0.5">Complete previous units to unlock</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pb-8 text-center">
          <div className="text-xs text-slate-700">
            Based on Shigley's Mechanical Engineering Design, 11th Edition · Chapter 1 (§1-1 through §1-18)
          </div>
        </div>
      </div>
    </div>
  )
}
