import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'

const CATEGORY_COLORS = {
  0: { accent: '#f59e0b', bg: 'from-amber-500/10 to-transparent', border: 'border-amber-500/20' },
  1: { accent: '#3b82f6', bg: 'from-blue-500/10 to-transparent', border: 'border-blue-500/20' },
  2: { accent: '#10b981', bg: 'from-emerald-500/10 to-transparent', border: 'border-emerald-500/20' },
  3: { accent: '#8b5cf6', bg: 'from-violet-500/10 to-transparent', border: 'border-violet-500/20' },
  4: { accent: '#ec4899', bg: 'from-pink-500/10 to-transparent', border: 'border-pink-500/20' },
  5: { accent: '#f97316', bg: 'from-orange-500/10 to-transparent', border: 'border-orange-500/20' },
}

export default function LessonCard({ module, progress, index, unitIndex = 0 }) {
  const navigate = useNavigate()
  const colors = CATEGORY_COLORS[unitIndex % 6]
  const isComplete = progress === 100

  return (
    <div
      onClick={() => navigate(`/module/${module.id}`)}
      className="card-hover relative bg-[#141428] border border-[#252548] rounded-2xl p-5 cursor-pointer group overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
        style={{ backgroundColor: isComplete ? '#10b981' : colors.accent, opacity: progress > 0 ? 1 : 0.3 }}
      />

      <div className="relative flex items-start gap-4 pl-3">
        {/* Icon with glow on hover */}
        <div className="relative">
          <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
            {module.icon}
          </div>
          {isComplete && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold border-2 border-[#141428]">
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
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                Complete
              </span>
            )}
          </div>
          <h3 className="font-bold text-slate-100 group-hover:text-white transition-colors leading-tight">
            {module.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
            {module.description}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <ProgressBar percent={progress} className="flex-1" glow={progress > 0 && !isComplete} />
            <span className="text-xs font-mono text-slate-600 whitespace-nowrap">
              {progress}%
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="self-center text-slate-600 group-hover:text-slate-400 transition-all group-hover:translate-x-1 duration-300">
          →
        </div>
      </div>
    </div>
  )
}
