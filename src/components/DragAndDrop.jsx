import { useState } from 'react'

export default function DragAndDrop({ items, correctOrder, onCorrect }) {
  const [order, setOrder] = useState(() => [...items].sort(() => Math.random() - 0.5))
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleDragStart = (i) => setDragging(i)
  const handleDragOver = (e, i) => { e.preventDefault(); setDragOver(i) }
  const handleDrop = (i) => {
    if (dragging === null || dragging === i) return
    const newOrder = [...order]
    const [item] = newOrder.splice(dragging, 1)
    newOrder.splice(i, 0, item)
    setOrder(newOrder)
    setDragging(null); setDragOver(null); setChecked(false)
  }
  const handleDragEnd = () => { setDragging(null); setDragOver(null) }
  const check = () => { const c = order.every((item, i) => item === correctOrder[i]); setIsCorrect(c); setChecked(true); if (c && onCorrect) onCorrect() }
  const reset = () => { setOrder([...items].sort(() => Math.random() - 0.5)); setChecked(false); setIsCorrect(false) }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Drag to reorder into the correct sequence:</p>
      <div className="space-y-2">
        {order.map((item, i) => {
          const isInCorrectSpot = checked && item === correctOrder[i]
          const isWrong = checked && item !== correctOrder[i]
          const isDraggingThis = dragging === i
          const isDragTarget = dragOver === i && dragging !== i
          return (
            <div key={item} draggable={!checked} onDragStart={() => handleDragStart(i)} onDragOver={(e) => handleDragOver(e, i)}
              onDrop={() => handleDrop(i)} onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all select-none ${!checked ? 'cursor-grab active:cursor-grabbing' : ''}
                ${isDraggingThis ? 'opacity-40 scale-[0.97]' : ''} ${isDragTarget ? 'border-blue-400 bg-blue-50' : ''}
                ${isInCorrectSpot ? 'border-emerald-300 bg-emerald-50 animate-correct-pulse' : ''}
                ${isWrong ? 'border-red-300 bg-red-50 animate-shake' : ''}
                ${!checked && !isDraggingThis && !isDragTarget ? 'border-slate-200 bg-white hover:border-blue-200' : ''}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                isInCorrectSpot ? 'bg-emerald-500 text-white' : isWrong ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {isInCorrectSpot ? '✓' : i + 1}
              </div>
              <span className="flex-1 text-slate-700 text-sm">{item}</span>
              {!checked && <span className="text-slate-300 text-sm">⠿</span>}
            </div>
          )
        })}
      </div>
      <div className="flex gap-2.5">
        {!checked && <button onClick={check} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-[0.98]">Check Order</button>}
        <button onClick={reset} className="px-4 py-2.5 border-2 border-slate-200 text-slate-500 rounded-xl text-sm font-medium hover:border-blue-300 hover:text-slate-700 transition-all">
          {checked ? 'Try Again' : 'Shuffle'}
        </button>
      </div>
      {checked && (
        <div className={`animate-fade-in-up text-center p-3 rounded-xl text-sm font-bold ${
          isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {isCorrect ? "🎯 Perfect order!" : 'Not quite right. Try rearranging and check again!'}
        </div>
      )}
    </div>
  )
}
