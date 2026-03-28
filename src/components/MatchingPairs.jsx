import { useState } from 'react'

export default function MatchingPairs({ pairs, onCorrect }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matches, setMatches] = useState({})
  const [checked, setChecked] = useState(false)

  const leftItems = pairs.map(p => p.left)
  const rightItems = useState(() => [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5))[0]

  const correctMap = Object.fromEntries(pairs.map(p => [p.left, p.right]))

  const handleLeftClick = (item) => {
    if (checked) return
    setSelectedLeft(selectedLeft === item ? null : item)
  }

  const handleRightClick = (item) => {
    if (checked || !selectedLeft) return
    setMatches(prev => ({ ...prev, [selectedLeft]: item }))
    setSelectedLeft(null)
  }

  const handleRemoveMatch = (left) => {
    if (checked) return
    setMatches(prev => {
      const next = { ...prev }
      delete next[left]
      return next
    })
  }

  const allMatched = Object.keys(matches).length === pairs.length

  const handleCheck = () => {
    setChecked(true)
    const allCorrect = leftItems.every(l => matches[l] === correctMap[l])
    if (allCorrect && onCorrect) onCorrect()
  }

  const matchedRights = new Set(Object.values(matches))
  const allCorrect = checked && leftItems.every(l => matches[l] === correctMap[l])

  // Color palette for matched pairs
  const pairColors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#84cc16']

  const getMatchColor = (item) => {
    const idx = leftItems.indexOf(item)
    return idx >= 0 ? pairColors[idx % pairColors.length] : null
  }

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className={`text-center text-xs py-2 px-3 rounded-lg transition-all ${
        selectedLeft
          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          : 'text-slate-500'
      }`}>
        {selectedLeft
          ? <>Now click the match for <strong>"{selectedLeft}"</strong></>
          : checked ? '' : 'Click a left item, then click its match on the right'
        }
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2.5">
          {leftItems.map(item => {
            const isMatched = item in matches
            const isSelected = selectedLeft === item
            const matchColor = isMatched ? getMatchColor(item) : null

            let borderClass = 'border-[#252548] hover:border-amber-500/50'
            if (isSelected) borderClass = 'border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
            if (checked && isMatched) {
              borderClass = matches[item] === correctMap[item]
                ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.15)]'
                : 'border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
            }

            return (
              <button
                key={item}
                onClick={() => isMatched ? handleRemoveMatch(item) : handleLeftClick(item)}
                className={`w-full text-left p-3 rounded-xl border-2 text-sm transition-all ${borderClass} ${
                  isMatched ? 'bg-[#141428]' : 'bg-[#0e0e1e]'
                } text-slate-200 active:scale-[0.98]`}
              >
                <div className="flex items-center gap-2">
                  {isMatched && (
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: matchColor }} />
                  )}
                  <span className="font-medium">{item}</span>
                </div>
                {isMatched && (
                  <div className="text-xs mt-1.5 flex items-center gap-1" style={{ color: matchColor }}>
                    → {matches[item]}
                    {!checked && <span className="text-slate-600 ml-auto text-[10px]">click to undo</span>}
                    {checked && matches[item] !== correctMap[item] && (
                      <span className="text-red-400 ml-auto">✗</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2.5">
          {rightItems.map(item => {
            const isUsed = matchedRights.has(item)
            const matchedLeft = isUsed ? Object.entries(matches).find(([, v]) => v === item)?.[0] : null
            const matchColor = matchedLeft ? getMatchColor(matchedLeft) : null

            return (
              <button
                key={item}
                onClick={() => handleRightClick(item)}
                disabled={isUsed || !selectedLeft}
                className={`w-full text-left p-3 rounded-xl border-2 text-sm transition-all active:scale-[0.98] ${
                  isUsed
                    ? 'border-[#252548]/50 bg-[#0e0e1e]/50 text-slate-600'
                    : selectedLeft
                      ? 'border-[#252548] bg-[#0e0e1e] hover:border-amber-500/50 hover:bg-amber-500/5 text-slate-200 cursor-pointer'
                      : 'border-[#252548] bg-[#0e0e1e] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isUsed && matchColor && (
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: matchColor }} />
                  )}
                  <span>{item}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {allMatched && !checked && (
        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black py-3 rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 transition-all active:scale-[0.98]"
        >
          Check Matches
        </button>
      )}
      {checked && (
        <div className={`animate-fade-in-up text-center p-3 rounded-xl text-sm font-bold ${
          allCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {allCorrect ? '🎯 All pairs matched correctly!' : 'Some pairs are incorrect. Check the corrections above.'}
        </div>
      )}
    </div>
  )
}
