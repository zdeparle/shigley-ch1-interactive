import { useState } from 'react'

export default function MatchingPairs({ pairs, onCorrect }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matches, setMatches] = useState({})
  const [checked, setChecked] = useState(false)

  const leftItems = pairs.map(p => p.left)
  const rightItems = useState(() => [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5))[0]
  const correctMap = Object.fromEntries(pairs.map(p => [p.left, p.right]))

  const handleLeftClick = (item) => { if (!checked) setSelectedLeft(selectedLeft === item ? null : item) }
  const handleRightClick = (item) => {
    if (checked || !selectedLeft) return
    setMatches(prev => ({ ...prev, [selectedLeft]: item }))
    setSelectedLeft(null)
  }
  const handleRemoveMatch = (left) => {
    if (checked) return
    setMatches(prev => { const next = { ...prev }; delete next[left]; return next })
  }

  const allMatched = Object.keys(matches).length === pairs.length
  const handleCheck = () => { setChecked(true); if (leftItems.every(l => matches[l] === correctMap[l]) && onCorrect) onCorrect() }
  const matchedRights = new Set(Object.values(matches))
  const allCorrect = checked && leftItems.every(l => matches[l] === correctMap[l])
  const pairColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2', '#be185d', '#4f46e5']
  const getMatchColor = (item) => pairColors[leftItems.indexOf(item) % pairColors.length]

  return (
    <div className="space-y-4">
      <div className={`text-center text-xs py-2 px-3 rounded-lg transition-all ${
        selectedLeft ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'text-slate-400'
      }`}>
        {selectedLeft ? <>Now click the match for <strong>"{selectedLeft}"</strong></> : checked ? '' : 'Click a left item, then click its match on the right'}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2.5">
          {leftItems.map(item => {
            const isMatched = item in matches
            const isSelected = selectedLeft === item
            const matchColor = isMatched ? getMatchColor(item) : null
            let borderClass = 'border-slate-200 hover:border-blue-300'
            if (isSelected) borderClass = 'border-blue-500 bg-blue-50 shadow-sm'
            if (checked && isMatched) borderClass = matches[item] === correctMap[item] ? 'border-emerald-400 bg-emerald-50' : 'border-red-400 bg-red-50'
            return (
              <button key={item} onClick={() => isMatched ? handleRemoveMatch(item) : handleLeftClick(item)}
                className={`w-full text-left p-3 rounded-xl border-2 text-sm transition-all ${borderClass} active:scale-[0.98]`}>
                <div className="flex items-center gap-2">
                  {isMatched && <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: matchColor }} />}
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
                {isMatched && (
                  <div className="text-xs mt-1.5 flex items-center gap-1" style={{ color: matchColor }}>
                    → {matches[item]}
                    {!checked && <span className="text-slate-400 ml-auto text-[10px]">click to undo</span>}
                    {checked && matches[item] !== correctMap[item] && <span className="text-red-500 ml-auto">✗</span>}
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <div className="space-y-2.5">
          {rightItems.map(item => {
            const isUsed = matchedRights.has(item)
            const matchedLeft = isUsed ? Object.entries(matches).find(([, v]) => v === item)?.[0] : null
            const matchColor = matchedLeft ? getMatchColor(matchedLeft) : null
            return (
              <button key={item} onClick={() => handleRightClick(item)} disabled={isUsed || !selectedLeft}
                className={`w-full text-left p-3 rounded-xl border-2 text-sm transition-all active:scale-[0.98] ${
                  isUsed ? 'border-slate-100 bg-slate-50 text-slate-400' : selectedLeft ? 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 cursor-pointer' : 'border-slate-200 bg-white text-slate-500'
                }`}>
                <div className="flex items-center gap-2">
                  {isUsed && matchColor && <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: matchColor }} />}
                  <span>{item}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {allMatched && !checked && (
        <button onClick={handleCheck} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98]">
          Check Matches
        </button>
      )}
      {checked && (
        <div className={`animate-fade-in-up text-center p-3 rounded-xl text-sm font-bold ${
          allCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {allCorrect ? '🎯 All pairs matched correctly!' : 'Some pairs are incorrect. Check the corrections above.'}
        </div>
      )}
    </div>
  )
}
