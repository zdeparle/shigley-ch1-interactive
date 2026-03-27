import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import InteractiveSlider from '../components/InteractiveSlider'
import BellCurve from '../components/BellCurve'

function normalCDF(z) {
  // Approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212559 + t * 1.3302744))))
  return z > 0 ? 1 - p : p
}

function BellCurveInteractive() {
  const [mean, setMean] = useState(100)
  const [std, setStd] = useState(15)
  const [zVal, setZVal] = useState(1.0)

  const xAtZ = mean + zVal * std
  const area = normalCDF(zVal) - normalCDF(-10)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InteractiveSlider label="Mean \u03bc" value={mean} min={50} max={150} step={1} onChange={setMean} format={v => v.toFixed(0)} />
        <InteractiveSlider label="Std Dev \u03c3\u0302" value={std} min={5} max={40} step={1} onChange={setStd} format={v => v.toFixed(0)} />
      </div>
      <InteractiveSlider label="z-value" value={zVal} min={-3} max={3} step={0.1} onChange={setZVal} format={v => v.toFixed(1)} />

      <div className="bg-[#12122a] rounded-xl p-4">
        <BellCurve mean={mean} std={std} shadeBelow={xAtZ} color="#f59e0b" fillColor="#f59e0b" width={500} height={160} />
        <div className="grid grid-cols-2 gap-4 mt-3 text-center">
          <div className="bg-[#1a1a2e] rounded-lg p-2">
            <div className="text-xs text-slate-500">x at z = {zVal.toFixed(1)}</div>
            <div className="font-mono font-bold text-[#f59e0b]">{xAtZ.toFixed(1)}</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-lg p-2">
            <div className="text-xs text-slate-500">P(X &le; {xAtZ.toFixed(1)})</div>
            <div className="font-mono font-bold text-[#f59e0b]">{(area * 100).toFixed(2)}%</div>
          </div>
        </div>
      </div>

      <div className="bg-[#12122a] rounded-xl p-3 font-mono text-sm">
        <span className="text-slate-400">z = (x &minus; &mu;) / &sigma;\u0302 = ({xAtZ.toFixed(1)} &minus; {mean}) / {std} = </span>
        <span className="text-[#f59e0b] font-bold">{zVal.toFixed(2)}</span>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Why Probability? The Statistical View</h2>
        <p className="text-slate-300">
          Material strength isn't a single number — it's a <strong className="text-slate-100">distribution</strong>.
          The same is true for stress. To reliably design parts, we need statistics.
        </p>
        <div className="bg-[#12122a] rounded-xl p-4 space-y-3">
          <div className="text-center">
            <div className="text-xl font-bold font-mono text-[#f59e0b]">f(x) = (1/&sigma;\u0302&radic;2&pi;) e^(&minus;&frac12;((x&minus;&mu;)/&sigma;\u0302)&sup2;)</div>
            <div className="text-sm text-slate-500 mt-1">Normal (Gaussian) Probability Density Function</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { sym: '\u03bc', name: 'Mean', desc: 'Center of distribution, most likely value' },
            { sym: '\u03c3\u0302', name: 'Std Dev', desc: 'Spread of distribution; larger = more uncertain' },
            { sym: 'z', name: 'z-score', desc: 'Number of std devs from the mean: z=(x\u2212\u03bc)/\u03c3\u0302' },
          ].map(({ sym, name, desc }) => (
            <div key={sym} className="text-center bg-[#12122a] rounded-lg p-3 border border-[#2d2d4e]">
              <div className="text-2xl font-bold font-mono text-[#f59e0b]">{sym}</div>
              <div className="font-semibold text-slate-200 text-sm mt-1">{name}</div>
              <div className="text-xs text-slate-400 mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive Bell Curve</h2>
        <p className="text-slate-300">Adjust the distribution parameters and z-value to see how areas change:</p>
        <BellCurveInteractive />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Reliability and Series Systems</h2>
        <div className="space-y-3">
          <div className="bg-[#12122a] rounded-xl p-4">
            <div className="font-semibold text-slate-200 mb-2">Reliability R and failure probability p&#x2089;:</div>
            <div className="font-mono text-xl text-[#f59e0b]">R = 1 &minus; p&#x2089;</div>
            <p className="text-sm text-slate-400 mt-2">If we design for 99% reliability, 1% of parts will fail over their design life.</p>
          </div>
          <div className="bg-[#12122a] rounded-xl p-4">
            <div className="font-semibold text-slate-200 mb-2">Series System Reliability (Eq. 1-2):</div>
            <div className="font-mono text-xl text-[#f59e0b]">R = R&#x2081; &times; R&#x2082; &times; R&#x2083; &times; ... &times; R&#x2099;</div>
            <p className="text-sm text-slate-400 mt-2">All components must survive for the system to survive. System reliability is always lower than individual component reliability.</p>
          </div>
        </div>
        <div className="bg-[#12122a] rounded-xl p-4">
          <p className="text-sm text-slate-400 mb-2">Example: 10 components each with 99% reliability:</p>
          <div className="font-mono text-lg text-slate-200">R<sub>system</sub> = 0.99<sup>10</sup> = <span className="text-red-400 font-bold">90.4%</span></div>
          <p className="text-xs text-slate-500 mt-1">System is only 90.4% reliable even though each part is 99%!</p>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="A drivetrain has 5 components, each with reliability R = 0.95. What is the system reliability?"
          options={[
            '0.950 (same as each component)',
            '0.977 (average)',
            '0.774 (product: 0.95\u2075)',
            '0.050 (sum of failure probabilities)'
          ]}
          correctIndex={2}
          explanation="Series system reliability = product of all reliabilities: 0.95\u2075 = 0.7738. This shows why high-component-count systems require very high individual reliabilities."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module4() {
  return (
    <ModuleLayout moduleId="module4" title="Reliability & Probability" icon="📊" steps={steps} />
  )
}
