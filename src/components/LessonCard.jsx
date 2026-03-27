import { useNavigate } from 'react-router-dom'
import ProgressBar from './ProgressBar'

export default function LessonCard({ module, progress, index }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/module/${module.id}`)}
      className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 cursor-pointer hover:border-[#f59e0b] hover:bg-[#1e1e35] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{module.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Module {index + 1}</span>
            {progress === 100 && <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-700">Complete</span>}
          </div>
          <h3 className="font-semibold text-slate-100 group-hover:text-[#f59e0b] transition-colors">{module.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{module.description}</p>
          <ProgressBar percent={progress} className="mt-3" />
        </div>
      </div>
    </div>
  )
}
