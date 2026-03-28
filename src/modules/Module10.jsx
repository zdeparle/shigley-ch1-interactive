import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import RevealSteps from '../components/RevealSteps'
import PreferredSizeTable from '../components/PreferredSizeTable'
import DesignFactorCalc from '../components/DesignFactorCalc'
import EccentricLoadViz from '../components/EccentricLoadViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design Factor vs. Factor of Safety</h2>
        <p className="text-slate-300 leading-relaxed">
          These two terms are related but not identical:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
            <div className="font-semibold text-blue-300 text-lg mb-2">Design Factor n<sub>d</sub></div>
            <p className="text-sm text-blue-200/80">
              Chosen <strong className="text-blue-200">before</strong> sizing the part. It is the minimum acceptable ratio of strength to stress.
            </p>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4">
            <div className="font-semibold text-emerald-300 text-lg mb-2">Factor of Safety n</div>
            <p className="text-sm text-emerald-200/80">
              The <strong className="text-emerald-200">actual</strong> ratio after the part has been sized and rounded to a standard dimension.
            </p>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-mono text-center text-lg text-[#f59e0b] mb-2">
            n<sub>d</sub> = S / &sigma; &nbsp;&nbsp;&nbsp; (Eq 1&ndash;3)
          </div>
          <div className="text-sm text-slate-400 text-center">
            Stress and strength must be of the same type and units, and apply to the same critical location.
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          &ldquo;Design factor n<sub>d</sub> is chosen before sizing; factor of safety n is the actual ratio after rounding to standard sizes.&rdquo;
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Why Stress-Based, Not Load-Based?</h2>
        <p className="text-slate-300 leading-relaxed">
          Why do we define the design factor as S/&sigma; rather than as a ratio of loads?
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            &ldquo;Because stress may not vary linearly with load.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          For example, in bending of a curved beam or in buckling problems, doubling the load may more than double the stress. Using a load-based factor would underestimate the required margin.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-3">
          <div className="font-semibold text-slate-200 mb-2">Important Principle</div>
          <div className="space-y-2">
            {[
              'All loss-of-function modes must be analyzed separately',
              'The mode with the smallest design factor governs the design',
              'Always check: yielding, fracture, fatigue, buckling, deflection...',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 text-sm text-red-200">
          A part that is safe against yielding may still fail by fatigue or buckling. The weakest mode governs.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;2: Sizing a Round Rod</h2>
        <p className="text-slate-300">
          Given: P = 2000 lbf, S = 24 kpsi, n<sub>d</sub> = 3.0. Find the required diameter and actual factor of safety.
        </p>
        <RevealSteps
          steps={[
            { label: 'Given', content: 'P = 2000 lbf, S = 24 kpsi, nd = 3.0' },
            { label: 'Set up \u03c3 = S/nd', math: 'P/(\u03c0d\u00b2/4) = S/nd', result: 'Solve for d' },
            { label: 'Solve for diameter', math: 'd = \u221a(4\u00b7P\u00b7nd/(\u03c0\u00b7S)) = \u221a(4\u00d72000\u00d73/(\u03c0\u00d724000))', result: 'd = 0.564 in' },
            { label: 'Round to preferred size', math: 'Table A-17: next size \u2265 0.564', result: 'd = 5/8" = 0.625 in', highlight: true },
            { label: 'Actual factor of safety', math: 'n = \u03c0Sd\u00b2/(4P) = \u03c0(24000)(0.625\u00b2)/(4\u00d72000)', result: 'n = 3.68 \u2265 nd = 3.0 \u2713', highlight: true },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Preferred Size Selection</h2>
        <p className="text-slate-300">
          Your computed dimension is <span className="font-mono text-[#f59e0b]">0.564&quot;</span>. See how it rounds up to the next preferred fractional size:
        </p>
        <PreferredSizeTable computedSize={0.564} />
        <div className="bg-[#0e0e1e] rounded-xl p-3 border border-[#252548]">
          <div className="text-sm text-slate-400">
            <span className="font-mono text-slate-200">0.564&quot;</span> rounds to the next preferred size: <span className="font-mono text-[#f59e0b]">5/8&quot; = 0.625&quot;</span>. This small increase in material ensures availability and lower cost, while also increasing the actual factor of safety above the design factor.
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Design Factor Calculator</h2>
        <p className="text-slate-300">Adjust force, strength, and design factor to explore how they interact:</p>
        <DesignFactorCalc />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: Required Diameter</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-2 text-sm text-slate-300">
          <div><strong className="text-slate-100">Applied load:</strong> P = 2000 lbf</div>
          <div><strong className="text-slate-100">Material strength:</strong> S = 24 kpsi</div>
          <div><strong className="text-slate-100">Design factor:</strong> n<sub>d</sub> = 3.0</div>
        </div>
        <FillInTheBlank
          question="P=2000lb, S=24kpsi, nd=3. Required diameter = ___ in"
          answer={0.564}
          tolerance={0.02}
          unit=" in"
          explanation="d = &radic;(4&middot;P&middot;nd / (&pi;&middot;S)) = &radic;(4 &times; 2000 &times; 3 / (&pi; &times; 24000)) = &radic;(0.3183) = 0.564 in."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: Actual Factor of Safety</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-2 text-sm text-slate-300">
          <div>After rounding to the preferred size d = 5/8 in = 0.625 in:</div>
          <div className="font-mono text-slate-200 mt-2">
            n = &pi;Sd&sup2; / (4P) = &pi;(24000)(0.625)&sup2; / (4 &times; 2000)
          </div>
        </div>
        <FillInTheBlank
          question="After rounding to 5/8 in, actual factor of safety n = ___"
          answer={3.68}
          tolerance={0.03}
          unit=""
          explanation="n = &pi;(24000)(0.625)&sup2; / (4 &times; 2000) = &pi;(24000)(0.3906) / 8000 = 29,452 / 8000 = 3.68. Since 3.68 &gt; 3.0, the design is safe."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;3: Eccentric Loading</h2>
        <p className="text-slate-300 leading-relaxed">
          A vertical rod supports an axial load, but with several real-world complications:
        </p>
        <div className="space-y-2">
          {[
            { factor: 'Eccentricity', value: '\u00b11.5% of diameter', desc: 'Load not perfectly centered on the rod' },
            { factor: 'Diameter tolerance', value: '\u00b11%', desc: 'Machining variation' },
            { factor: 'Load uncertainty', value: '\u00b12%', desc: 'Applied force varies' },
            { factor: 'Strength uncertainty', value: '\u00b13.5%', desc: 'Material property variation' },
            { factor: 'Dynamic loading', value: 'Suddenly applied \u2192 F = 2P', desc: 'Impact factor doubles the effective load' },
          ].map(({ factor, value, desc }) => (
            <div key={factor} className="flex gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100 text-sm">{factor}</span>
                  <span className="font-mono text-[#f59e0b] text-sm">{value}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Each of these factors individually seems small, but when multiplied together they produce a significant design factor.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Eccentric Load Visualization</h2>
        <p className="text-slate-300">Explore how eccentricity, diameter, force, and dynamic loading combine to increase stress:</p>
        <EccentricLoadViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;3 Result</h2>
        <p className="text-slate-300 leading-relaxed">
          Combining all uncertainty factors, the maximum stress is 2.332 times the nominal stress, while the minimum strength is 0.965 times the nominal.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-center">
            <div className="text-xs text-red-400 mb-1">Max stress multiplier</div>
            <div className="font-mono text-xl font-bold text-red-300">&sigma;<sub>max</sub> = 2.332 &sigma;<sub>nom</sub></div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3 text-center">
            <div className="text-xs text-emerald-400 mb-1">Min strength multiplier</div>
            <div className="font-mono text-xl font-bold text-emerald-300">S<sub>min</sub> = 0.965 S<sub>nom</sub></div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-mono text-center text-lg text-[#f59e0b] mb-3">
            n<sub>d</sub> = 2.332 / 0.965 = 2.42
          </div>
          <div className="font-semibold text-slate-200 mb-2">Loss-of-Function Factor Breakdown</div>
          <div className="space-y-1.5">
            {[
              { factor: 'Geometry (eccentricity + tolerance)', value: '1.05' },
              { factor: 'Dynamic load (suddenly applied)', value: '2.0' },
              { factor: 'Bending (from eccentricity)', value: '1.1' },
              { factor: 'Strength data uncertainty', value: '1.05' },
            ].map(({ factor, value }) => (
              <div key={factor} className="flex items-center justify-between bg-[#141428] rounded-lg p-2 border border-[#252548]">
                <span className="text-sm text-slate-300">{factor}</span>
                <span className="font-mono text-[#f59e0b] font-bold">&times; {value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-amber-900/20 rounded-lg p-2 border border-amber-700 mt-2">
              <span className="text-sm font-semibold text-amber-200">Product</span>
              <span className="font-mono text-[#f59e0b] font-bold text-lg">= 2.43 &asymp; 2.42</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="Why is nd = 2.42 rather than 1.0 in Example 1-3?"
          options={[
            'Because the material is weak',
            'Accounts for eccentricity, dynamic loading, and all tolerances/uncertainties',
            'Standard practice requires nd > 2',
            'The rod is too thin'
          ]}
          correctIndex={1}
          explanation="The design factor of 2.42 is not arbitrary &mdash; it is the product of individual factors accounting for eccentricity (1.05), dynamic loading (2.0), bending effects (1.1), and material uncertainty (1.05). Each factor represents a specific, quantifiable source of uncertainty."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: Design Factor from Stress Ratio</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-2 text-sm text-slate-300">
          <div>&sigma;<sub>max</sub> = 2.332 &sigma;<sub>nom</sub></div>
          <div>S<sub>min</sub> = 0.965 S<sub>nom</sub></div>
          <div className="text-slate-400 mt-1">n<sub>d</sub> = &sigma;<sub>max</sub> / S<sub>min</sub> (ratio of multipliers)</div>
        </div>
        <FillInTheBlank
          question="&sigma;_max = 2.332&sigma;_nom, S_min = 0.965S_nom &rarr; nd = ___"
          answer={2.42}
          tolerance={0.02}
          explanation="nd = 2.332 / 0.965 = 2.416 &asymp; 2.42. This represents the combined effect of all uncertainty sources."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module10() {
  return (
    <ModuleLayout moduleId="module10" title="Design Factor & Factor of Safety" icon="🛡️" steps={steps} />
  )
}
