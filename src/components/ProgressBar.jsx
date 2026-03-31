export default function ProgressBar({ percent, className = '', size = 'sm', glow = false }) {
  const heights = { xs: 'h-1', sm: 'h-2', md: 'h-3' }
  const h = heights[size] || heights.sm

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-slate-200 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-700 ease-out relative ${
            percent === 100
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
              : 'bg-gradient-to-r from-blue-600 to-blue-500'
          }`}
          style={{ width: `${Math.max(percent, 0)}%` }}
        />
      </div>
    </div>
  )
}
