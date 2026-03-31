// Normal PDF
function normalPDF(x, mu, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2)
}

export default function BellCurve({ mean = 0, std = 1, shadeBelow, color = '#2563eb', fillColor, label, width = 400, height = 180 }) {
  const xMin = mean - 4 * std
  const xMax = mean + 4 * std
  const steps = 200
  const dx = (xMax - xMin) / steps

  const points = Array.from({ length: steps + 1 }, (_, i) => {
    const x = xMin + i * dx
    const y = normalPDF(x, mean, std)
    return { x, y }
  })

  const maxY = normalPDF(mean, mean, std)
  const padding = { top: 15, bottom: 25, left: 10, right: 10 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  const toSVG = (x, y) => ({
    sx: padding.left + ((x - xMin) / (xMax - xMin)) * innerW,
    sy: padding.top + (1 - y / (maxY * 1.1)) * innerH
  })

  const curvePath = points.map((p, i) => {
    const { sx, sy } = toSVG(p.x, p.y)
    return `${i === 0 ? 'M' : 'L'}${sx},${sy}`
  }).join(' ')

  // Shaded area
  let shadePath = ''
  if (shadeBelow !== undefined) {
    const shadeX = Math.min(shadeBelow, xMax)
    const shadePoints = points.filter(p => p.x <= shadeX)
    if (shadePoints.length > 0) {
      const baseY = padding.top + innerH
      const startSVG = toSVG(shadePoints[0].x, 0)
      const endSVG = toSVG(shadePoints[shadePoints.length - 1].x, 0)
      const pathPts = shadePoints.map(p => {
        const { sx, sy } = toSVG(p.x, p.y)
        return `${sx},${sy}`
      }).join(' L')
      shadePath = `M${startSVG.sx},${baseY} L${pathPts} L${endSVG.sx},${baseY} Z`
    }
  }

  return (
    <svg width={width} height={height} className="w-full">
      {shadePath && <path d={shadePath} fill={fillColor || color} opacity="0.3" />}
      <path d={curvePath} fill="none" stroke={color} strokeWidth="2.5" />
      {/* x-axis */}
      <line
        x1={padding.left} y1={padding.top + innerH}
        x2={padding.left + innerW} y2={padding.top + innerH}
        stroke="#4b5563" strokeWidth="1"
      />
      {label && (
        <text x={padding.left + innerW / 2} y={height - 4} textAnchor="middle" fill="#94a3b8" fontSize="11">
          {label}
        </text>
      )}
    </svg>
  )
}
