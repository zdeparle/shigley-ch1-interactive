import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import InteractiveSlider from '../components/InteractiveSlider'
import StressStrengthViz from '../components/StressStrengthViz'

function normalCDF(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212559 + t * 1.3302744))))
  return z > 0 ? 1 - p : p
}

function InterferenceDemo() {
  const [stressMean, setStressMean] = useState(30)
  const [stressStd, setStressStd] = useState(4)
  const [strengthMean, setStrengthMean] = useState(50)
  const [strengthStd, setStrengthStd] = useState(5)

  const Cs = stressStd / stressMean
  const Cσ = strengthStd / strengthMean
  const nd = strengthMean / stressMean
  const z = -(nd - 1) / Math.sqrt(nd * nd * Cs * Cs + Cσ * Cσ)
  const pf = normalCDF(z)
  const reliability = 1 - pf

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-red-400">Stress Distribution</div>
          <InteractiveSlider label="Mean \u03c3" value={stressMean} min={10} max={55} step={1} onChange={setStressMean} format={v => v.toFixed(0)} unit=" ksi" />
          <InteractiveSlider label="Std Dev \u03c3\u0302" value={stressStd} min={1} max={15} step={0.5} onChange={setStressStd} format={v => v.toFixed(1)} unit=" ksi" />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-emerald-400">Strength Distribution</div>
          <InteractiveSlider label="Mean S" value={strengthMean} min={25} max={100} step={1} onChange={setStrengthMean} format={v => v.toFixed(0)} unit=" ksi" />
          <InteractiveSlider label="Std Dev S\u0302" value={strengthStd} min={1} max={20} step={0.5} onChange={setStrengthStd} format={v => v.toFixed(1)} unit=" ksi" />
        </div>
      </div>

      <div className="bg-[#12122a] rounded-xl p-3">
        <StressStrengthViz
          stressMean={stressMean} stressStd={stressStd}
          strengthMean={strengthMean} strengthStd={strengthStd}
          width={500} height={200}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#12122a] rounded-lg p-2">
          <div className="text-xs text-slate-500">Design factor n&#x2090;</div>
          <div className="font-mono font-bold text-[#f59e0b]">{nd.toFixed(2)}</div>
        </div>
        <div className="bg-[#12122a] rounded-lg p-2">
          <div className="text-xs text-slate-500">z-value</div>
          <div className="font-mono font-bold text-slate-200">{z.toFixed(3)}</div>
        </div>
        <div className={`rounded-lg p-2 ${reliability > 0.99 ? 'bg-emerald-900/30' : reliability > 0.95 ? 'bg-amber-900/30' : 'bg-red-900/30'}`}>
          <div className="text-xs text-slate-500">Reliability R</div>
          <div className={`font-mono font-bold ${reliability > 0.99 ? 'text-emerald-400' : reliability > 0.95 ? 'text-amber-400' : 'text-red-400'}`}>
            {(reliability * 100).toFixed(3)}%
          </div>
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Stress-Strength Interference</h2>
        <p className="text-slate-300">
          When both stress and strength are distributions (not single values), the overlap region represents
          the <strong className="text-slate-100">probability of failure</strong>.
        </p>
        <div className="bg-[#12122a] rounded-xl p-4">
          <div className="text-center space-y-2">
            <div className="text-lg font-mono text-slate-200">Margin of safety: <span className="text-[#f59e0b]">m = S &minus; &sigma;</span></div>
            <div className="text-sm text-slate-400">Failure occurs when m &lt; 0 (stress exceeds strength)</div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { condition: 'No overlap', result: 'Very low failure probability (distributions far apart)', color: 'emerald' },
            { condition: 'Small overlap', result: 'Some failure risk (overlap = failure region)', color: 'amber' },
            { condition: 'Large overlap', result: 'High failure probability', color: 'red' },
          ].map(({ condition, result, color }) => (
            <div key={condition} className={`flex gap-3 p-3 rounded-lg border border-${color}-800 bg-${color}-900/20`}>
              <span className={`font-semibold text-${color}-300 shrink-0`}>{condition}:</span>
              <span className={`text-${color}-200/80 text-sm`}>{result}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Key Equation (Eq. 1-6)</h2>
        <p className="text-slate-300">Shigley's derives a relationship between design factor n&#x2090; and reliability through the z-transform:</p>
        <div className="bg-[#12122a] rounded-xl p-5 text-center space-y-3">
          <div className="text-xl font-mono text-[#f59e0b]">z = &minus;(n&#x2090; &minus; 1) / &radic;(n&#x2090;&sup2;C&sigma;&sup2; + C&#x53;&sup2;)</div>
          <div className="text-sm text-slate-500">where C = coefficient of variation = &sigma;\u0302/&mu;</div>
          <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <div className="text-slate-500">C&sigma; = &sigma;\u0302_stress / &mu;_stress</div>
              <div className="text-slate-300">Coeff. of variation for stress</div>
            </div>
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <div className="text-slate-500">C&#x53; = &sigma;\u0302_strength / &mu;_strength</div>
              <div className="text-slate-300">Coeff. of variation for strength</div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          💡 Given a target reliability (&rarr; lookup z in standard table), solve this equation for n&#x2090;. Higher reliability requires higher design factor.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Two-Distribution Visualization</h2>
        <p className="text-slate-300">Adjust the distributions and watch the amber overlap (failure zone) change in real time:</p>
        <InterferenceDemo />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="If we increase the mean strength S while keeping stress distribution unchanged, what happens to reliability?"
          options={[
            'Reliability decreases (more overlap)',
            'Reliability stays the same (distributions are independent)',
            'Reliability increases (distributions move further apart)',
            'Cannot determine without knowing the standard deviations'
          ]}
          correctIndex={2}
          explanation="Moving the strength distribution to higher values (larger mean S) separates it further from the stress distribution, reducing the overlap (interference) region and thus decreasing failure probability — increasing reliability."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module5() {
  return (
    <ModuleLayout moduleId="module5" title="Design Factor & Reliability" icon="🎯" steps={steps} />
  )
}
