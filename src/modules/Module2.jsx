import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import InteractiveSlider from '../components/InteractiveSlider'
import { useState } from 'react'

function StressStrengthDemo() {
  const [force, setForce] = useState(5000)   // lb
  const [area, setArea] = useState(0.5)      // in²
  const strength = 50000 // psi (material property - fixed)
  const stress = force / area
  const safetyMargin = strength - stress
  const ratio = stress / strength

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InteractiveSlider label="Applied Force F (lb)" value={force} min={1000} max={30000} step={500} onChange={setForce} format={v => v.toLocaleString()} unit=" lb" />
        <InteractiveSlider label="Cross-section Area A (in²)" value={area} min={0.1} max={1.5} step={0.05} onChange={setArea} format={v => v.toFixed(2)} unit=" in²" />
      </div>

      {/* Visual bar */}
      <div className="bg-[#12122a] rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Stress &sigma; = F/A</span>
          <span className={`font-mono font-bold ${stress > strength ? 'text-red-400' : 'text-slate-200'}`}>
            {stress.toFixed(0).toLocaleString()} psi
          </span>
        </div>
        <div className="w-full bg-[#2d2d4e] rounded-full h-6 relative overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2 ${stress > strength ? 'bg-red-500' : stress > 0.8 * strength ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${Math.min(100, ratio * 100)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-bold">
            {(ratio * 100).toFixed(1)}% of strength
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Strength S (material)</span>
          <span className="font-mono font-bold text-emerald-400">{strength.toLocaleString()} psi &larr; fixed!</span>
        </div>
        <div className={`text-center p-2 rounded-lg text-sm font-semibold ${safetyMargin > 0 ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
          {safetyMargin > 0 ? `\u2713 Safe \u2014 margin: ${safetyMargin.toLocaleString()} psi` : '\u2717 FAILURE \u2014 stress exceeds strength!'}
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Stress vs. Strength: The Core Distinction</h2>
        <p className="text-slate-300">
          The most fundamental distinction in mechanical design: <strong className="text-slate-100">stress</strong> is what the load does to the part;
          <strong className="text-slate-100"> strength</strong> is what the material can resist.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
            <div className="text-2xl mb-2">&sigma;, &tau;</div>
            <div className="font-bold text-red-300 text-lg">Stress</div>
            <ul className="text-sm text-red-200/80 mt-2 space-y-1">
              <li>• Depends on <strong>applied loads</strong></li>
              <li>• Depends on <strong>geometry</strong></li>
              <li>• Can be calculated from equations</li>
              <li>• &sigma; = F/A (axial)</li>
              <li>• &tau; = VQ/Ib (shear)</li>
            </ul>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4">
            <div className="text-2xl mb-2">S, Sy, Su</div>
            <div className="font-bold text-emerald-300 text-lg">Strength</div>
            <ul className="text-sm text-emerald-200/80 mt-2 space-y-1">
              <li>• Property of the <strong>material</strong></li>
              <li>• Independent of loading</li>
              <li>• Measured by testing</li>
              <li>• Sy = yield strength</li>
              <li>• Su = ultimate strength</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    content: () => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Stress vs. Strength</h2>
        <p className="text-slate-300">Adjust the applied force and cross-section area. The material strength stays fixed at 50,000 psi.</p>
        <StressStrengthDemo />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Sources of Uncertainty</h2>
        <p className="text-slate-300">
          Even when &sigma; &lt; S on paper, failure can occur. Why? <strong className="text-slate-100">Uncertainty</strong> is everywhere in engineering.
        </p>
        <div className="space-y-2">
          {[
            { src: 'Material variability', detail: 'Strength varies from part to part, heat to heat. Sy might be 50,000 ± 3,000 psi.', icon: '🔩' },
            { src: 'Geometric variability', detail: 'Manufacturing tolerances mean actual dimensions differ from nominal.', icon: '📐' },
            { src: 'Load uncertainty', detail: 'Operating loads are rarely perfectly known. Overloads can occur.', icon: '⚡' },
            { src: 'Analysis uncertainty', detail: 'Our stress equations make simplifying assumptions (e.g., plane sections remain plane).', icon: '📊' },
          ].map(({ src, detail, icon }) => (
            <div key={src} className="flex gap-3 bg-[#12122a] rounded-lg p-3 border border-[#2d2d4e]">
              <span className="text-xl">{icon}</span>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{src}</div>
                <div className="text-xs text-slate-400 mt-0.5">{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          This is why we need <strong>factors of safety</strong> — to account for what we don't know!
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Quick Check</h2>
        <Quiz
          question="A steel rod has Sy = 45,000 psi. An engineer calculates σ = 30,000 psi. Which statement is correct?"
          options={[
            'The rod will definitely fail because 30,000 is close to 45,000',
            'Stress is a material property; strength depends on loading',
            'The rod may or may not fail due to uncertainty in both S and σ',
            'Factor of safety = 45,000/30,000 = 1.5 guarantees no failure'
          ]}
          correctIndex={2}
          explanation="Due to uncertainty in material strength (variability), geometry (tolerances), and loading, the actual factor of safety may be lower than calculated. This is why we design with appropriate safety factors."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module2() {
  return (
    <ModuleLayout moduleId="module2" title="Stress, Strength & Uncertainty" icon="⚡" steps={steps} />
  )
}
