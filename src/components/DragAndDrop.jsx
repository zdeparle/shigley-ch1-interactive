import { useState } from 'react'

export default function DragAndDrop({ items, correctOrder, onCorrect }) {
  const [order, setOrder] = useState(() => [...items].sort(() => Math.random() - 0.5))
  const [dragging, setDragging] = useState(null)
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleDragStart = (i) => setDragging(i)
  const handleDrop = (i) => {
    if (dragging === null || dragging === i) return
    const newOrder = [...order]
    const [item] = newOrder.splice(dragging, 1)
    newOrder.splice(i, 0, item)
    setOrder(newOrder)
    setDragging(null)
    setChecked(false)
  }

  const check = () => {
    const correct = order.every((item, i) => item === correctOrder[i])
    setIsCorrect(correct)
    setChecked(true)
    if (correct && onCorrect) onCorrect()
  }

  const reset = () => {
    setOrder([...items].sort(() => Math.random() - 0.5))
    setChecked(false)
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400">Drag to reorder the design phases in the correct sequence:</p>
      <div className="space-y-2">
        {order.map((item, i) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all
              ${checked && item === correctOrder[i] ? 'border-emerald-500 bg-emerald-900/20' : ''}
              ${checked && item !== correctOrder[i] ? 'border-red-500 bg-red-900/20' : ''}
              ${!checked ? 'border-[#2d2d4e] bg-[#1e1e35] hover:border-[#f59e0b]' : ''}
            `}
          >
            <span className="text-slate-500 text-sm font-mono w-5">{i + 1}.</span>
            <span className="flex-1 text-slate-200">{item}</span>
            <span className="text-slate-600">⠿</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={check} className="bg-[#f59e0b] text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#d97706] transition-colors">
          Check Order
        </button>
        <button onClick={reset} className="border border-[#2d2d4e] text-slate-400 px-4 py-2 rounded-lg text-sm hover:border-[#f59e0b] transition-colors">
          Shuffle
        </button>
      </div>
      {checked && (
        <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
          {isCorrect ? "✓ Perfect! That's the correct order." : '✗ Not quite. Try again!'}
        </p>
      )}
    </div>
  )
}
