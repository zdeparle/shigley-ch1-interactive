export default function ProgressBar({ percent, className = '', size = 'sm', glow = false }) {
  const heights = { xs: 'h-1', sm: 'h-2', md: 'h-3' }
  const h = heights[size] || heights.sm

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-[#1a1a36] rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-700 ease-out relative ${
            percent === 100
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
              : 'bg-gradient-to-r from-amber-500 to-orange-500'
          }`}
          style={{ width: `${Math.max(percent, 0)}%` }}
        >
          {glow && percent > 0 && percent < 100 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 blur-[4px] opacity-80" />
          )}
        </div>
      </div>
    </div>
  )
}
