import { useState } from 'react'

export default function CategorySort({ items, categories, correctMapping, onCorrect }) {
  const [assignments, setAssignments] = useState({})
  const [pool, setPool] = useState(() => [...items].sort(() => Math.random() - 0.5))
  const [checked, setChecked] = useState(false)
  const [dragItem, setDragItem] = useState(null)
  const [clickItem, setClickItem] = useState(null)

  const handleDragStart = (item) => setDragItem(item)
  const handleDragEnd = () => setDragItem(null)

  const handleDropOnCategory = (category) => {
    if (!dragItem || checked) return
    setAssignments(prev => ({ ...prev, [dragItem]: category }))
    setPool(prev => prev.filter(i => i !== dragItem))
    setDragItem(null)
  }

  // Click-to-place: click item, then click category
  const handleItemClick = (item) => {
    if (checked) return
    setClickItem(clickItem === item ? null : item)
  }

  const handleCategoryClick = (category) => {
    if (!clickItem || checked) return
    setAssignments(prev => ({ ...prev, [clickItem]: category }))
    setPool(prev => prev.filter(i => i !== clickItem))
    setClickItem(null)
  }

  const handleRemove = (item) => {
    if (checked) return
    setAssignments(prev => {
      const next = { ...prev }
      delete next[item]
      return next
    })
    setPool(prev => [...prev, item])
  }

  const handleCheck = () => {
    setChecked(true)
    const allCorrect = items.every(item => assignments[item] === correctMapping[item])
    if (allCorrect && onCorrect) onCorrect()
  }

  const allPlaced = pool.length === 0
  const getCatItems = (cat) => Object.entries(assignments).filter(([, c]) => c === cat).map(([item]) => item)
  const allCorrect = checked && items.every(i => assignments[i] === correctMapping[i])

  return (
    <div className="space-y-4">
      {/* Item pool */}
      {pool.length > 0 && (
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5">
            <span>📦</span> Drag or click items to sort them:
          </div>
          <div className="flex flex-wrap gap-2">
            {pool.map(item => (
              <div
                key={item}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                onClick={() => handleItemClick(item)}
                className={`px-3.5 py-2 bg-[#141428] border-2 rounded-xl text-sm text-slate-200 cursor-grab active:cursor-grabbing transition-all interactive-hover select-none ${
                  clickItem === item
                    ? 'border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)] bg-amber-500/5'
                    : 'border-[#252548] hover:border-amber-500/50'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category buckets */}
      <div className={`grid gap-3 ${categories.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {categories.map(cat => {
          const catItems = getCatItems(cat)
          const isDropTarget = dragItem || clickItem
          return (
            <div
              key={cat}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDropOnCategory(cat)}
              onClick={() => clickItem && handleCategoryClick(cat)}
              className={`rounded-2xl border-2 border-dashed p-4 min-h-[130px] transition-all ${
                isDropTarget
                  ? 'border-amber-500/50 bg-amber-500/5 cursor-pointer'
                  : 'border-[#252548] bg-[#0e0e1e]'
              }`}
            >
              <div className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {cat}
              </div>
              <div className="space-y-1.5">
                {catItems.map(item => {
                  let classes = 'bg-[#141428] border-[#252548]'
                  if (checked) {
                    classes = correctMapping[item] === assignments[item]
                      ? 'bg-emerald-500/10 border-emerald-500/40 animate-correct-pulse'
                      : 'bg-red-500/10 border-red-500/40 animate-shake'
                  }
                  return (
                    <div
                      key={item}
                      onClick={() => !checked && handleRemove(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs border text-slate-200 transition-all ${classes} ${!checked ? 'cursor-pointer hover:border-red-400/50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item}</span>
                        {checked && (
                          <span className={correctMapping[item] === assignments[item] ? 'text-emerald-400' : 'text-red-400'}>
                            {correctMapping[item] === assignments[item] ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                      {checked && correctMapping[item] !== assignments[item] && (
                        <div className="text-red-400 text-[10px] mt-0.5">Should be: {correctMapping[item]}</div>
                      )}
                    </div>
                  )
                })}
                {catItems.length === 0 && (
                  <div className="text-xs text-slate-600 italic text-center py-3">Drop items here</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {allPlaced && !checked && (
        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black py-3 rounded-xl font-bold hover:from-amber-400 hover:to-orange-400 transition-all active:scale-[0.98]"
        >
          Check Answers
        </button>
      )}
      {checked && (
        <div className={`animate-fade-in-up text-center p-3 rounded-xl text-sm font-bold ${
          allCorrect
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {allCorrect ? '🎯 All correct!' : 'Some items are misplaced. Check the corrections above.'}
        </div>
      )}
    </div>
  )
}
