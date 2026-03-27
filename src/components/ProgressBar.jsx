export default function ProgressBar({ percent, className = '' }) {
  return (
    <div className={`w-full bg-[#2d2d4e] rounded-full h-2 ${className}`}>
      <div
        className="h-2 rounded-full bg-[#f59e0b] transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
