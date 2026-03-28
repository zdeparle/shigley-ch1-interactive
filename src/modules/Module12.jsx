import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import InteractiveSlider from '../components/InteractiveSlider'
import StressStrengthViz from '../components/StressStrengthViz'
import RevealSteps from '../components/RevealSteps'

// Approximation of the cumulative normal distribution function (Abramowitz & Stegun)
function normalCDF(z) {
  if (z < -6) return 0
  if (z > 6) return 1
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1.0 + sign * y)
}

function InterferenceDemo() {
  const [stressMean, setStressMean] = useState(50)
  const [stressStd, setStressStd] = useState(6)
  const [strengthMean, setStrengthMean] = useState(78)
  const [strengthStd, setStrengthStd] = useState(6)

  const nd = strengthMean / stressMean
  const muM = strengthMean - stressMean
  const sigmaM = Math.sqrt(strengthStd ** 2 + stressStd ** 2)
  const z = -muM / sigmaM
  const R = normalCDF(-z)
  const pFail = 1 - R

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Stress Distribution</div>
          <InteractiveSlider label="Mean stress (kpsi)" value={stressMean} min={20} max={80} step={0.5} onChange={setStressMean} format={v => v.toFixed(1)} />
          <InteractiveSlider label="Std dev (kpsi)" value={stressStd} min={1} max={15} step={0.1} onChange={setStressStd} format={v => v.toFixed(1)} />
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500 font-semibold">Strength Distribution</div>
          <InteractiveSlider label="Mean strength (kpsi)" value={strengthMean} min={40} max={120} step={0.5} onChange={setStrengthMean} format={v => v.toFixed(1)} />
          <InteractiveSlider label="Std dev (kpsi)" value={strengthStd} min={1} max={15} step={0.1} onChange={setStrengthStd} format={v => v.toFixed(1)} />
        </div>
      </div>

      <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
        <StressStrengthViz
          stressMean={stressMean}
          stressStd={stressStd}
          strengthMean={strengthMean}
          strengthStd={strengthStd}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">Design factor n_d</div>
          <div className="font-mono font-bold text-[#f59e0b]">{nd.toFixed(3)}</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-2">
          <div className="text-xs text-slate-500">z-value</div>
          <div className="font-mono font-bold text-slate-200">{z.toFixed(3)}</div>
        </div>
        <div className={`rounded-lg p-2 ${R > 0.999 ? 'bg-emerald-900/30' : R > 0.99 ? 'bg-amber-900/30' : 'bg-red-900/30'}`}>
          <div className="text-xs text-slate-500">Reliability R</div>
          <div className={`font-mono font-bold ${R > 0.999 ? 'text-emerald-400' : R > 0.99 ? 'text-amber-400' : 'text-red-400'}`}>
            {R > 0.999999 ? '> 0.999999' : R.toFixed(6)}
          </div>
        </div>
      </div>

      <div className="font-mono text-xs text-slate-400 bg-[#0e0e1e] rounded-lg p-3">
        <div>z = &minus;({strengthMean.toFixed(1)} &minus; {stressMean.toFixed(1)}) / &radic;({strengthStd.toFixed(1)}&sup2; + {stressStd.toFixed(1)}&sup2;) = <span className="text-[#f59e0b]">{z.toFixed(4)}</span></div>
        <div>R = &Phi;(&minus;z) = <span className="text-[#f59e0b]">{R > 0.999999 ? '> 0.999999' : R.toFixed(6)}</span></div>
        <div>P(failure) = <span className={pFail < 0.001 ? 'text-emerald-400' : pFail < 0.01 ? 'text-amber-400' : 'text-red-400'}>{pFail < 0.000001 ? '< 0.000001' : pFail.toFixed(6)}</span></div>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Stress-Strength Interference</h2>
        <p className="text-slate-300 leading-relaxed">
          When both stress and strength are distributions, the <strong className="text-slate-100">overlap region represents
          failure probability</strong>. This is the stress-strength interference concept from &sect;1&ndash;13.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Figure 1&ndash;7a: Two Overlapping Distributions</div>
          <p className="text-sm text-slate-400">
            The stress distribution (from applied loads) and the strength distribution (from material properties)
            are both bell curves. Where they overlap, there is a nonzero chance that stress exceeds strength &mdash;
            meaning failure can occur.
          </p>
          <div className="mt-3 bg-[#141428] rounded-lg p-3 border border-[#252548]">
            <div className="flex items-center gap-4 text-sm justify-center">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Stress &sigma;</span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Strength S</span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Overlap = failure zone</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Unlike simple factor-of-safety approaches that use single values, interference theory accounts for the
          <strong> statistical scatter</strong> in both stress and strength.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Margin of Safety &amp; Reliability</h2>
        <p className="text-slate-300 leading-relaxed">
          Define the <strong className="text-slate-100">margin of safety</strong>: <span className="font-mono text-[#f59e0b]">m = S &minus; &sigma;</span>.
          Failure occurs when <span className="font-mono text-red-400">m &lt; 0</span>.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Figure 1&ndash;7b: Distribution of m</div>
          <p className="text-sm text-slate-400">
            Since both S and &sigma; are random variables, m is also a random variable with its own distribution.
            The reliability R = P(m &gt; 0) is the probability that strength exceeds stress.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">&#x2705;</div>
            <div className="font-semibold text-emerald-300 text-sm">No overlap</div>
            <div className="text-xs text-emerald-200/80 mt-1">Very low failure probability. Distributions well separated.</div>
          </div>
          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">&#x26A0;&#xFE0F;</div>
            <div className="font-semibold text-amber-300 text-sm">Small overlap</div>
            <div className="text-xs text-amber-200/80 mt-1">Some risk of failure. Tails of distributions intersect.</div>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">&#x274C;</div>
            <div className="font-semibold text-red-300 text-sm">Large overlap</div>
            <div className="text-xs text-red-200/80 mt-1">High failure probability. Distributions nearly on top of each other.</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The z-Score: Statistics Meet Reliability</h2>
        <p className="text-slate-300 leading-relaxed">
          Since &sigma; and S are both normal, <strong className="text-slate-100">m = S &minus; &sigma; is also normal</strong>.
          We can compute a standard z-score for the margin distribution:
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548] text-center">
          <div className="text-xs text-slate-500 mb-2">Equation 1&ndash;10</div>
          <div className="font-mono text-xl text-[#f59e0b]">
            z = &minus;(&mu;<sub>S</sub> &minus; &mu;<sub>&sigma;</sub>) / &radic;(&sigma;&#770;<sub>S</sub>&sup2; + &sigma;&#770;<sub>&sigma;</sub>&sup2;)
          </div>
          <div className="text-sm text-slate-400 mt-3">
            where &mu;<sub>S</sub>, &sigma;&#770;<sub>S</sub> are the mean and std dev of strength,
            and &mu;<sub>&sigma;</sub>, &sigma;&#770;<sub>&sigma;</sub> are the mean and std dev of stress.
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          This is the key equation connecting statistics to reliability. Once you have z, you can look up R = &Phi;(&minus;z) in a normal table (Table A&ndash;10).
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Coefficient of Variation</h2>
        <p className="text-slate-300 leading-relaxed">
          The <strong className="text-slate-100">coefficient of variation</strong> C is a dimensionless ratio that
          measures <strong className="text-slate-100">relative uncertainty</strong>:
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548]">
          <div className="space-y-4 text-center">
            <div>
              <div className="text-sm text-slate-400 mb-1">General definition</div>
              <div className="font-mono text-xl text-[#f59e0b]">C = &sigma;&#770; / &mu;</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141428] rounded-lg p-3 border border-emerald-800">
                <div className="text-sm text-emerald-300 mb-1">For strength</div>
                <div className="font-mono text-lg text-emerald-400">C<sub>S</sub> = &sigma;&#770;<sub>S</sub> / &mu;<sub>S</sub></div>
              </div>
              <div className="bg-[#141428] rounded-lg p-3 border border-red-800">
                <div className="text-sm text-red-300 mb-1">For stress</div>
                <div className="font-mono text-lg text-red-400">C<sub>&sigma;</sub> = &sigma;&#770;<sub>&sigma;</sub> / &mu;<sub>&sigma;</sub></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
          <div className="text-sm text-slate-400">
            <strong className="text-slate-200">Why use C instead of &sigma;&#770;?</strong> Because C allows comparison
            of scatter across different magnitudes. A standard deviation of 5 kpsi means very different things
            for a 50 kpsi material vs. a 500 kpsi material.
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Master Equation: n<sub>d</sub> from Reliability</h2>
        <p className="text-slate-300 leading-relaxed">
          Substituting the coefficient of variation into the z-score equation yields:
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548] text-center space-y-4">
          <div>
            <div className="text-xs text-slate-500 mb-2">Equation 1&ndash;11</div>
            <div className="font-mono text-lg text-slate-200">
              z = &minus;(n<sub>d</sub> &minus; 1) / &radic;(n<sub>d</sub>&sup2;C<sub>S</sub>&sup2; + C<sub>&sigma;</sub>&sup2;)
            </div>
          </div>
          <div className="border-t border-[#252548] pt-4">
            <div className="text-xs text-slate-500 mb-2">Equation 1&ndash;12 (solving for n<sub>d</sub>)</div>
            <div className="font-mono text-sm text-[#f59e0b] leading-relaxed">
              n<sub>d</sub> = [1 &plusmn; &radic;(1 &minus; (1 &minus; z&sup2;C<sub>S</sub>&sup2;)(1 &minus; z&sup2;C<sub>&sigma;</sub>&sup2;))] / (1 &minus; z&sup2;C<sub>S</sub>&sup2;)
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-4">
          <p className="text-amber-200 font-semibold">
            &ldquo;Remarkable: relates n<sub>d</sub> to reliability (through z) and the coefficients of variation.&rdquo;
          </p>
          <p className="text-sm text-amber-200/80 mt-2">
            Given desired reliability R, look up z. Given material scatter C<sub>S</sub> and load scatter C<sub>&sigma;</sub>,
            compute the required design factor n<sub>d</sub>. This is the rigorous, probabilistic alternative to
            picking a safety factor from a table.
          </p>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Stress-Strength Interference</h2>
        <p className="text-slate-300">
          Adjust the mean and standard deviation of both distributions to explore how overlap, design factor, and reliability change:
        </p>
        <InterferenceDemo />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;6 Setup</h2>
        <p className="text-slate-300 leading-relaxed">
          A 1018 steel rod is subjected to a tensile load. Given data:
        </p>
        <div className="space-y-2">
          {[
            { param: 'Yield strength', value: 'Sy = 78.4 kpsi', detail: 'Mean value', std: '\u03C3\u0302 = 5.90 kpsi' },
            { param: 'Applied load', value: 'P = 50 kip', detail: 'Mean value', std: '\u03C3\u0302_P = 4.1 kip' },
            { param: 'Required reliability', value: 'R = 0.999', detail: '99.9% probability of survival', std: '' },
          ].map(({ param, value, detail, std }) => (
            <div key={param} className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#f59e0b] text-sm">{param}</span>
                <span className="font-mono text-slate-200 text-sm">{value}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-slate-500">{detail}</span>
                {std && <span className="text-xs font-mono text-slate-400">{std}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Goal: Find the required design factor n<sub>d</sub> and the rod diameter d for 99.9% reliability.
          The diameter is treated as deterministic (no uncertainty in geometry).
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;6: Step-by-Step Solution</h2>
        <p className="text-slate-300">Work through the solution step by step:</p>
        <RevealSteps
          steps={[
            {
              label: 'Coefficient of variation for strength',
              math: 'CS = 5.90 / 78.4 = 0.0753',
            },
            {
              label: 'Coefficient of variation for stress',
              math: 'C\u03C3 = CP = 4.1 / 50 = 0.082',
              content: '(Diameter treated deterministically, so stress variation = load variation)',
            },
            {
              label: 'For R = 0.999, look up z',
              math: 'z = \u22123.09',
              content: 'From Table A\u201310',
            },
            {
              label: 'Apply Eq 1\u201312',
              math: 'nd = [1 + \u221A(1 \u2212 (1\u22129.547\u00D70.00567)(1\u22129.547\u00D70.00672))] / (1 \u2212 9.547\u00D70.00567)',
              result: 'nd = 1.416',
              highlight: true,
            },
            {
              label: 'Find diameter',
              math: 'd = \u221A(4 \u00D7 50 \u00D7 1.416 / (\u03C0 \u00D7 78.4))',
              result: 'd = 1.072 in',
              highlight: true,
            },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate C<sub>S</sub></h2>
        <FillInTheBlank
          question="CS = 5.90 / 78.4 = ___"
          answer={0.0753}
          tolerance={0.01}
          explanation="The coefficient of variation for strength is the standard deviation divided by the mean: CS = 5.90 / 78.4 = 0.0753. This tells us the strength scatter is about 7.5% of the mean."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate n<sub>d</sub></h2>
        <FillInTheBlank
          question="For R=0.999, z=\u22123.09. Using Eq 1\u201312, nd = ___"
          answer={1.416}
          tolerance={0.02}
          explanation="Using Eq 1\u201312 with z = \u22123.09, CS = 0.0753, C\u03C3 = 0.082: nd = [1 + \u221A(1 \u2212 (1 \u2212 9.547 \u00D7 0.00567)(1 \u2212 9.547 \u00D7 0.00672))] / (1 \u2212 9.547 \u00D7 0.00567) = 1.416. This is the probabilistically-determined design factor."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check: Reliability and n<sub>d</sub></h2>
        <Quiz
          question="If we want higher reliability (e.g., 0.9999 vs 0.999), what happens to the required nd?"
          options={[
            'Decreases',
            'Stays the same',
            'Increases',
            'Becomes undefined',
          ]}
          correctIndex={2}
          explanation="Higher reliability \u2192 more negative z \u2192 larger nd to separate the distributions further. To achieve 99.99% reliability instead of 99.9%, we need a bigger gap between the mean stress and mean strength, which means a larger design factor."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check: Coefficient of Variation</h2>
        <Quiz
          question="What does a large coefficient of variation C indicate?"
          options={[
            'High precision in the data',
            'The mean is very large',
            'High relative uncertainty/scatter in the data',
            'The distribution is normal',
          ]}
          correctIndex={2}
          explanation="The coefficient of variation C = \u03C3\u0302/\u03BC measures relative scatter. A large C means the standard deviation is a large fraction of the mean, indicating high relative uncertainty. For example, C = 0.20 means the scatter is 20% of the mean value \u2014 much more uncertain than C = 0.05 (5%)."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module12() {
  return (
    <ModuleLayout moduleId="module12" title="Design Factor & Reliability" icon="🎯" steps={steps} />
  )
}
