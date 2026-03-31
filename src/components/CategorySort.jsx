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
      {pool.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-xs text-slate-500 mb-2.5">Drag or click items to sort them:</div>
          <div className="flex flex-wrap gap-2">
            {pool.map(item => (
              <div
                key={item}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                onClick={() => handleItemClick(item)}
                className={`px-3.5 py-2 bg-white border-2 rounded-xl text-sm text-slate-700 cursor-grab active:cursor-grabbing transition-all interactive-hover select-none ${
                  clickItem === item
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

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
                  ? 'border-blue-400 bg-blue-50/50 cursor-pointer'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div className="text-sm font-bold text-blue-600 mb-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {cat}
              </div>
              <div className="space-y-1.5">
                {catItems.map(item => {
                  let classes = 'bg-white border-slate-200'
                  if (checked) {
                    classes = correctMapping[item] === assignments[item]
                      ? 'bg-emerald-50 border-emerald-300 animate-correct-pulse'
                      : 'bg-red-50 border-red-300 animate-shake'
                  }
                  return (
                    <div
                      key={item}
                      onClick={() => !checked && handleRemove(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs border text-slate-700 transition-all ${classes} ${!checked ? 'cursor-pointer hover:border-red-300' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item}</span>
                        {checked && (
                          <span className={correctMapping[item] === assignments[item] ? 'text-emerald-500' : 'text-red-500'}>
                            {correctMapping[item] === assignments[item] ? '✓' : '✗'}
                          </span>
                        )}
                      </div>
                      {checked && correctMapping[item] !== assignments[item] && (
                        <div className="text-red-500 text-[10px] mt-0.5">Should be: {correctMapping[item]}</div>
                      )}
                    </div>
                  )
                })}
                {catItems.length === 0 && (
                  <div className="text-xs text-slate-400 italic text-center py-3">Drop items here</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {allPlaced && !checked && (
        <button onClick={handleCheck} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98]">
          Check Answers
        </button>
      )}
      {checked && (
        <div className={`animate-fade-in-up text-center p-3 rounded-xl text-sm font-bold ${
          allCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {allCorrect ? '🎯 All correct!' : 'Some items are misplaced. Check the corrections above.'}
        </div>
      )}
    </div>
  )
}
