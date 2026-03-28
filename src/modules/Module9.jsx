import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import InteractiveSlider from '../components/InteractiveSlider'
import RevealSteps from '../components/RevealSteps'

function StressStrengthDemo({ onCorrect }) {
  const [force, setForce] = useState(5000)
  const [area, setArea] = useState(0.2)
  const strength = 50000

  const stress = force / area
  const ratio = (stress / strength) * 100
  const safe = stress < strength

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Stress vs. Strength</h2>
      <p className="text-slate-300">Adjust the applied force and cross-sectional area to see how stress compares to material strength.</p>

      <div className="space-y-3">
        <InteractiveSlider
          label="Applied Force F"
          value={force}
          min={500}
          max={20000}
          step={100}
          onChange={setForce}
          format={v => v.toLocaleString()}
          unit=" lbf"
        />
        <InteractiveSlider
          label="Cross-sectional Area A"
          value={area}
          min={0.05}
          max={1.0}
          step={0.01}
          onChange={setArea}
          format={v => v.toFixed(2)}
          unit=" in&sup2;"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-center">
          <div className="text-xs text-red-400 mb-1">&sigma; = F / A (Stress)</div>
          <div className="font-mono text-xl font-bold text-red-300">{stress.toLocaleString(undefined, { maximumFractionDigits: 0 })} psi</div>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 text-center">
          <div className="text-xs text-emerald-400 mb-1">S (Strength)</div>
          <div className="font-mono text-xl font-bold text-emerald-300">{strength.toLocaleString()} psi</div>
        </div>
      </div>

      {/* Progress bar showing percentage of strength used */}
      <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Strength Used</span>
          <span className={`font-mono font-bold ${safe ? 'text-emerald-400' : 'text-red-400'}`}>{ratio.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-[#141428] rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              ratio < 60 ? 'bg-emerald-500' : ratio < 90 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(ratio, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className={`p-3 rounded-xl text-center text-lg font-bold ${
        safe ? 'bg-emerald-900/30 border border-emerald-700 text-emerald-400' : 'bg-red-900/30 border border-red-700 text-red-400'
      }`}>
        {safe ? 'SAFE: \u03c3 < S' : 'FAILURE: \u03c3 \u2265 S'}
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Stress &amp; Strength: The Central Distinction</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            &ldquo;The survival of many products depends on how the designer adjusts the maximum stresses to be less than the component&rsquo;s strength.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Stress</strong> is what the load does to the part.
          <strong className="text-slate-100"> Strength</strong> is what the material can resist.
          The designer&rsquo;s task is to keep stress well below strength.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
            <div className="font-semibold text-red-400 text-lg mb-2">Stress</div>
            <div className="space-y-2 text-sm text-red-200/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-red-300 font-bold">&sigma;, &tau;</span>
                <span>&mdash; Normal and shear stress</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-red-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Depends on applied loads
              </div>
              <div className="flex items-center gap-2 text-xs text-red-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Depends on geometry
              </div>
              <div className="flex items-center gap-2 text-xs text-red-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Calculated from equations
              </div>
              <div className="bg-red-900/30 rounded-lg p-2 font-mono text-center text-red-200 text-lg mt-2">
                &sigma; = F / A
              </div>
            </div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4">
            <div className="font-semibold text-emerald-400 text-lg mb-2">Strength</div>
            <div className="space-y-2 text-sm text-emerald-200/80">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-300 font-bold">S, S<sub>y</sub>, S<sub>u</sub></span>
                <span>&mdash; Material strength</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Property of the material
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Independent of loading
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Measured by testing
              </div>
              <div className="bg-emerald-900/30 rounded-lg p-2 font-mono text-center text-emerald-200 text-lg mt-2">
                S = material property
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Strength: An Inherent Property</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-emerald-500 pl-4">
            &ldquo;Strength is an inherent property of a part, built in by material and process.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Strength depends on the material chosen and how it was processed. It exists whether or not any load is applied.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Strength Notation</div>
          <div className="space-y-2">
            {[
              { sym: 'S', name: 'General strength' },
              { sym: 'S\u1D67', name: 'Yield strength' },
              { sym: 'S\u1D64', name: 'Ultimate (tensile) strength' },
              { sym: 'S\u209B\u1D67', name: 'Shear yield strength' },
              { sym: 'S\u2091', name: 'Endurance limit (fatigue)' },
            ].map(({ sym, name }) => (
              <div key={sym} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-[#f59e0b] font-bold w-12">{sym}</span>
                <span className="text-slate-300">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          &ldquo;Various metalworking and heat-treating processes cause variations from point to point.&rdquo;
          Strength is not perfectly uniform &mdash; it varies with processing history.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Stress: A State at a Point</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-red-500 pl-4">
            &ldquo;Stress is a state property at a specific point within a body.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Stress varies from point to point within a part. It depends on the applied loads, the part geometry,
          temperature, and manufacturing processing.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Stress Notation</div>
          <div className="space-y-2">
            {[
              { sym: '\u03c3', name: 'Normal stress (general)' },
              { sym: '\u03c4', name: 'Shear stress' },
              { sym: '\u03c3\u2081', name: 'First principal stress' },
              { sym: '\u03c3\u1D67', name: 'Normal stress in the y-direction' },
            ].map(({ sym, name }) => (
              <div key={sym} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-[#f59e0b] font-bold w-12">{sym}</span>
                <span className="text-slate-300">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Stress is a <strong>function</strong> of load, geometry, temperature, and manufacturing processing.
          Change any of these, and the stress state changes.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <StressStrengthDemo onCorrect={onCorrect} />
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="A spring is removed from a machine undamaged. What happens?"
          options={[
            'Both stress and strength return to zero',
            'Stress returns to zero; strength remains unchanged',
            'Strength decreases; stress increases',
            'Neither changes'
          ]}
          correctIndex={1}
          explanation="Stress depends on external loads &mdash; remove the load, stress goes to zero. Strength is an inherent property of the material. It remains unchanged regardless of whether load is applied or removed."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Sources of Uncertainty (&sect;1&ndash;10)</h2>
        <p className="text-slate-300 leading-relaxed">
          Engineering design must account for many sources of uncertainty. Shigley&rsquo;s lists 11 specific sources &mdash; plus a reminder that the list itself may be incomplete.
        </p>
        <div className="space-y-1.5">
          {[
            'Composition of material may vary',
            'Variation of properties within a piece of stock',
            'Effect of processing (e.g., cold working, grinding)',
            'Effect of nearby parts (weldments, press fits, shrink fits)',
            'Effect of thermomechanical treatment (heat treating, quenching)',
            'Intensity and distribution of loading may not match assumptions',
            'Validity of mathematical models used in analysis',
            'Intensity of stress concentrations',
            'Effect of time on strength and geometry (creep, corrosion)',
            'Effect of corrosion',
            'Effect of wear',
          ].map((item, i) => (
            <div key={i} className="flex gap-2 bg-[#0e0e1e] rounded-lg p-2.5 border border-[#252548]">
              <span className="text-[#f59e0b] font-bold text-xs w-6 shrink-0 text-right">{i + 1}.</span>
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200 italic">
          &ldquo;...plus the uncertainty as to the length of any list of uncertainties.&rdquo;
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Two Approaches to Uncertainty</h2>
        <p className="text-slate-300 leading-relaxed">
          Engineers handle uncertainty using one of two approaches:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
            <div className="font-semibold text-blue-300 text-lg mb-2">Deterministic</div>
            <p className="text-sm text-blue-200/80 mb-3">
              Uses a single <strong className="text-blue-200">design factor n<sub>d</sub></strong> to account for all uncertainties at once.
            </p>
            <div className="bg-[#0e0e1e] rounded-lg p-3 font-mono text-center space-y-2">
              <div className="text-blue-200">
                n<sub>d</sub> = <span className="text-slate-400">loss-of-function parameter</span> / <span className="text-slate-400">max allowable parameter</span>
              </div>
              <div className="text-xs text-slate-500">(Eq 1&ndash;1)</div>
              <div className="text-blue-200 mt-2">
                max allowable = <span className="text-slate-400">loss-of-function</span> / n<sub>d</sub>
              </div>
              <div className="text-xs text-slate-500">(Eq 1&ndash;2)</div>
            </div>
          </div>
          <div className="bg-violet-900/20 border border-violet-700 rounded-xl p-4">
            <div className="font-semibold text-violet-300 text-lg mb-2">Stochastic</div>
            <p className="text-sm text-violet-200/80 mb-3">
              Uses <strong className="text-violet-200">probability and reliability</strong> to quantify the chance of survival.
            </p>
            <div className="bg-[#0e0e1e] rounded-lg p-3 text-sm text-violet-200/80 space-y-2">
              <div>Obtain stress distribution</div>
              <div>Obtain strength distribution</div>
              <div>Compute probability of overlap</div>
              <div className="text-violet-300 font-semibold">Express as reliability R</div>
            </div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548] text-sm text-slate-400">
          The deterministic approach is simpler and more commonly used in practice. The stochastic approach provides deeper insight but requires statistical data on loads and strengths.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;1: Design Factor Calculation</h2>
        <p className="text-slate-300">
          Given: Max load uncertainty &plusmn;20%, failure load uncertainty &plusmn;15%, nominal failure = 2000 lbf. Find the design factor and max allowable load.
        </p>
        <RevealSteps
          steps={[
            { label: 'Given', content: 'Max load uncertainty \u00b120%, failure load uncertainty \u00b115%, nominal failure = 2000 lbf' },
            { label: 'Loss-of-function load must increase', math: 'Factor = 1/0.85 = 1.176', result: 'Account for \u00b115% uncertainty' },
            { label: 'Max allowable load must decrease', math: 'Factor = 1/1.2 = 0.833', result: 'Account for \u00b120% uncertainty' },
            { label: 'Design factor', math: 'nd = (1/0.85)/(1/1.2) = 1.2/0.85', result: 'nd = 1.41', highlight: true },
            { label: 'Maximum allowable load', math: '= 2000/1.41', result: '= 1400 lbf', highlight: true },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: Maximum Allowable Load</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-2 text-sm text-slate-300">
          <div><strong className="text-slate-100">Load uncertainty:</strong> &plusmn;20%</div>
          <div><strong className="text-slate-100">Failure uncertainty:</strong> &plusmn;15%</div>
          <div><strong className="text-slate-100">Nominal failure load:</strong> 2000 lbf</div>
        </div>
        <FillInTheBlank
          question="Load uncertainty &plusmn;20%, failure uncertainty &plusmn;15%, nominal failure = 2000 lbf. Max allowable load = ___"
          answer={1400}
          tolerance={0.03}
          unit=" lbf"
          explanation="nd = (1/0.85)/(1/1.2) = 1.2/0.85 = 1.41. Max allowable = 2000/1.41 &asymp; 1418 lbf. Accepting 1400&ndash;1429 range."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Check: Methods of Handling Uncertainty</h2>
        <Quiz
          question="Stochastic methods focus on ___ while deterministic methods use ___"
          options={[
            'cost / time',
            'probability of survival / absolute design factors',
            'material testing / computer simulation',
            'manufacturing / assembly'
          ]}
          correctIndex={1}
          explanation="Stochastic methods use probability distributions of stress and strength to compute reliability (probability of survival). Deterministic methods use a single design factor to ensure the maximum allowable parameter stays below the loss-of-function value."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module9() {
  return (
    <ModuleLayout moduleId="module9" title="Stress & Strength" icon="⚡" steps={steps} />
  )
}
