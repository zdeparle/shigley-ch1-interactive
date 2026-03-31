import { useMemo } from 'react'

function normalPDF(x, mu, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2)
}

export default function StressStrengthViz({ stressMean, stressStd, strengthMean, strengthStd, width = 500, height = 200 }) {
  const xMin = Math.min(stressMean - 4 * stressStd, strengthMean - 4 * strengthStd)
  const xMax = Math.max(stressMean + 4 * stressStd, strengthMean + 4 * strengthStd)
  const steps = 300
  const dx = (xMax - xMin) / steps

  const { stressPts, strengthPts } = useMemo(() => {
    const pts = Array.from({ length: steps + 1 }, (_, i) => {
      const x = xMin + i * dx
      return {
        x,
        stressY: normalPDF(x, stressMean, stressStd),
        strengthY: normalPDF(x, strengthMean, strengthStd),
      }
    })
    return {
      stressPts: pts,
      strengthPts: pts,
    }
  }, [stressMean, stressStd, strengthMean, strengthStd])

  const maxStress = normalPDF(stressMean, stressMean, stressStd)
  const maxStrength = normalPDF(strengthMean, strengthMean, strengthStd)
  const maxY = Math.max(maxStress, maxStrength) * 1.1

  const pad = { top: 15, bottom: 30, left: 10, right: 10 }
  const iW = width - pad.left - pad.right
  const iH = height - pad.top - pad.bottom

  const sx = (x) => pad.left + ((x - xMin) / (xMax - xMin)) * iW
  const sy = (y) => pad.top + (1 - y / maxY) * iH
  const baseY = pad.top + iH

  const stressPath = stressPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x)},${sy(p.stressY)}`).join(' ')
  const strengthPath = strengthPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x)},${sy(p.strengthY)}`).join(' ')

  // Interference: where stress PDF > 0 and strength PDF > 0, take min
  const interferenceArea = stressPts.filter(p => p.stressY > 1e-10 && p.strengthY > 1e-10)
  let intPath = ''
  if (interferenceArea.length > 1) {
    const minPts = interferenceArea.map(p => ({ x: p.x, y: Math.min(p.stressY, p.strengthY) }))
    intPath = `M${sx(minPts[0].x)},${baseY} ` + minPts.map(p => `L${sx(p.x)},${sy(p.y)}`).join(' ') + ` L${sx(minPts[minPts.length - 1].x)},${baseY} Z`
  }

  const stressShadePoints = stressPts.map(p => `${sx(p.x)},${sy(p.stressY)}`).join(' L')
  const stressShade = `M${sx(stressPts[0].x)},${baseY} L${stressShadePoints} L${sx(stressPts[stressPts.length - 1].x)},${baseY} Z`

  const strengthShadePoints = strengthPts.map(p => `${sx(p.x)},${sy(p.strengthY)}`).join(' L')
  const strengthShade = `M${sx(strengthPts[0].x)},${baseY} L${strengthShadePoints} L${sx(strengthPts[strengthPts.length - 1].x)},${baseY} Z`

  return (
    <div>
      <svg width={width} height={height} className="w-full">
        <path d={stressShade} fill="#ef4444" opacity="0.15" />
        <path d={strengthShade} fill="#10b981" opacity="0.15" />
        {intPath && <path d={intPath} fill="#2563eb" opacity="0.5" />}
        <path d={stressPath} fill="none" stroke="#ef4444" strokeWidth="2.5" />
        <path d={strengthPath} fill="none" stroke="#10b981" strokeWidth="2.5" />
        <line x1={pad.left} y1={baseY} x2={pad.left + iW} y2={baseY} stroke="#4b5563" strokeWidth="1" />
        {/* Labels */}
        <text x={sx(stressMean)} y={sy(maxStress) - 5} textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">σ (stress)</text>
        <text x={sx(strengthMean)} y={sy(maxStrength) - 5} textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">S (strength)</text>
      </svg>
      <div className="flex items-center gap-4 text-xs mt-2 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Stress distribution</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Strength distribution</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Failure probability</span>
      </div>
    </div>
  )
}
