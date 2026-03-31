import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'

const CATEGORY_COLORS = {
  0: { accent: '#2563eb', bg: 'from-blue-50 to-transparent', border: 'border-blue-100' },
  1: { accent: '#7c3aed', bg: 'from-violet-50 to-transparent', border: 'border-violet-100' },
  2: { accent: '#059669', bg: 'from-emerald-50 to-transparent', border: 'border-emerald-100' },
  3: { accent: '#dc2626', bg: 'from-red-50 to-transparent', border: 'border-red-100' },
  4: { accent: '#d97706', bg: 'from-amber-50 to-transparent', border: 'border-amber-100' },
  5: { accent: '#0891b2', bg: 'from-cyan-50 to-transparent', border: 'border-cyan-100' },
}

export default function LessonCard({ module, progress, index, unitIndex = 0, locked = false }) {
  const navigate = useNavigate()
  const colors = CATEGORY_COLORS[unitIndex % 6]
  const isComplete = progress === 100

  const handleClick = () => {
    if (locked) return
    navigate(`/module/${module.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={`card-hover relative bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-5 group overflow-hidden ${
        locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
        style={{ backgroundColor: isComplete ? '#16a34a' : colors.accent, opacity: progress > 0 ? 1 : 0.2 }}
      />

      {locked && (
        <div className="absolute right-4 top-4 text-slate-400 text-lg">🔒</div>
      )}

      <div className="relative flex items-start gap-3 sm:gap-4 pl-2 sm:pl-3">
        <div className="relative">
          <div className={`text-2xl sm:text-3xl transition-transform duration-300 ${locked ? '' : 'group-hover:scale-110'}`}>
            {module.icon}
          </div>
          {isComplete && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold border-2 border-white">
              ✓
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.accent }}>
              Module {index + 1}
            </span>
            {isComplete && (
              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                Complete
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm sm:text-base text-slate-800 group-hover:text-slate-900 transition-colors leading-tight">
            {module.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2">
            {module.description}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <ProgressBar percent={progress} className="flex-1" />
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
              {progress}%
            </span>
          </div>
        </div>

        {!locked && (
          <div className="self-center text-slate-300 group-hover:text-slate-500 transition-all group-hover:translate-x-1 duration-300">
            →
          </div>
        )}
      </div>
    </div>
  )
}
