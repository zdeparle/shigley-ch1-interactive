import { useState } from 'react'

const preferredFractional = [
  1/16, 3/32, 1/8, 5/32, 3/16, 1/4, 5/16, 3/8, 7/16, 1/2,
  9/16, 5/8, 11/16, 3/4, 7/8, 1, 1.125, 1.25, 1.375, 1.5,
  1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4
]

const fractionalLabels = [
  '1/16', '3/32', '1/8', '5/32', '3/16', '1/4', '5/16', '3/8', '7/16', '1/2',
  '9/16', '5/8', '11/16', '3/4', '7/8', '1', '1-1/8', '1-1/4', '1-3/8', '1-1/2',
  '1-3/4', '2', '2-1/4', '2-1/2', '2-3/4', '3', '3-1/4', '3-1/2', '3-3/4', '4'
]

export default function PreferredSizeTable({ computedSize, onSelect }) {
  const [selected, setSelected] = useState(null)

  const nextLarger = preferredFractional.find(s => s >= (computedSize || 0))
  const nextLargerIdx = nextLarger ? preferredFractional.indexOf(nextLarger) : -1

  const handleSelect = (idx) => {
    setSelected(idx)
    if (onSelect) onSelect(preferredFractional[idx])
  }

  return (
    <div className="space-y-3">
      {computedSize && (
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-500">Computed size:</span>
          <span className="font-mono font-bold text-slate-700">{computedSize.toFixed(4)} in</span>
        </div>
      )}

      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
        <div className="text-xs text-slate-500 mb-2">Table A-17: Preferred Fractional Sizes (inches)</div>
        <div className="grid grid-cols-5 gap-1">
          {preferredFractional.map((size, i) => {
            const isNextLarger = i === nextLargerIdx && computedSize
            const isSelected = i === selected
            const isTooSmall = computedSize && size < computedSize

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`p-1.5 rounded text-xs font-mono text-center transition-all border ${
                  isNextLarger
                    ? 'bg-blue-600/20 border-blue-500 text-blue-600 font-bold ring-1 ring-blue-500'
                    : isSelected
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : isTooSmall
                        ? 'bg-red-50 border-slate-200 text-slate-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-500'
                }`}
              >
                <div>{fractionalLabels[i]}</div>
                <div className="text-[10px] text-slate-500">{size.toFixed(4)}</div>
              </button>
            )
          })}
        </div>
      </div>

      {computedSize && nextLarger && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700">
          Next preferred size ≥ {computedSize.toFixed(4)}: <strong className="text-blue-600">{fractionalLabels[nextLargerIdx]}" = {nextLarger.toFixed(4)} in</strong>
        </div>
      )}

      <div className="flex gap-2 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-50 border border-slate-200" /> Too small</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-600/20 border border-blue-500" /> Next larger</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-white border border-slate-200" /> Available</div>
      </div>
    </div>
  )
}
