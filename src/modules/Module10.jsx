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
        <h2 className="text-2xl font-bold text-blue-600">Design Factor vs. Factor of Safety</h2>
        <p className="text-slate-600 leading-relaxed">
          These two terms are related but not identical:
        </p>

        {/* SVG Diagram: Design Phase to Verification timeline */}
        <svg className="w-full" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* LEFT: Design Phase */}
          <rect x="20" y="20" width="270" height="120" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          <text x="155" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb" fontFamily="system-ui">DESIGN PHASE</text>
          {/* nd box */}
          <rect x="55" y="58" width="200" height="40" rx="8" fill="white" stroke="#2563eb" strokeWidth="2" />
          <text x="155" y="83" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2563eb" fontFamily="system-ui">{'Choose n'}<tspan baselineShift="sub" fontSize="11">d</tspan>{' = 2.5'}</text>
          <text x="155" y="118" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Target minimum ratio</text>

          {/* Arrow in the middle */}
          <defs>
            <marker id="arrowBlueM10" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
            </marker>
          </defs>
          <line x1="300" y1="80" x2="420" y2="80" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlueM10)" />
          <text x="360" y="70" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2563eb" fontFamily="system-ui">Size the part</text>
          <text x="360" y="95" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui">Round to standard</text>

          {/* RIGHT: Verification Phase */}
          <rect x="430" y="20" width="270" height="120" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
          <text x="565" y="45" textAnchor="middle" fontSize="13" fontWeight="700" fill="#10b981" fontFamily="system-ui">VERIFICATION</text>
          {/* n box */}
          <rect x="465" y="58" width="200" height="40" rx="8" fill="white" stroke="#10b981" strokeWidth="2" />
          <text x="565" y="83" textAnchor="middle" fontSize="15" fontWeight="700" fill="#10b981" fontFamily="system-ui">{'Calculate n = 3.68'}</text>
          {/* Checkmark and comparison */}
          <rect x="495" y="106" width="140" height="24" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
          <text x="565" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#059669" fontFamily="system-ui">{'\u2713'} n {'\u2265'} n_d  (3.68 {'\u2265'} 2.5)</text>
        </svg>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="font-semibold text-blue-700 text-lg mb-2">Design Factor n<sub>d</sub></div>
            <p className="text-sm text-blue-700">
              Chosen <strong className="text-blue-700">before</strong> sizing the part. It is the minimum acceptable ratio of strength to stress.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="font-semibold text-emerald-700 text-lg mb-2">Factor of Safety n</div>
            <p className="text-sm text-emerald-700">
              The <strong className="text-emerald-700">actual</strong> ratio after the part has been sized and rounded to a standard dimension.
            </p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-mono text-center text-lg text-blue-600 mb-2">
            n<sub>d</sub> = S / &sigma; &nbsp;&nbsp;&nbsp; (Eq 1&ndash;3)
          </div>
          <div className="text-sm text-slate-500 text-center">
            Stress and strength must be of the same type and units, and apply to the same critical location.
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          &ldquo;Design factor n<sub>d</sub> is chosen before sizing; factor of safety n is the actual ratio after rounding to standard sizes.&rdquo;
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Why Stress-Based, Not Load-Based?</h2>
        <p className="text-slate-600 leading-relaxed">
          Why do we define the design factor as S/&sigma; rather than as a ratio of loads?
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            &ldquo;Because stress may not vary linearly with load.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          For example, in bending of a curved beam or in buckling problems, doubling the load may more than double the stress. Using a load-based factor would underestimate the required margin.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="font-semibold text-slate-700 mb-2">Important Principle</div>
          <div className="space-y-2">
            {[
              'All loss-of-function modes must be analyzed separately',
              'The mode with the smallest design factor governs the design',
              'Always check: yielding, fracture, fatigue, buckling, deflection...',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          A part that is safe against yielding may still fail by fatigue or buckling. The weakest mode governs.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;2: Sizing a Round Rod</h2>
        <p className="text-slate-600">
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
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Preferred Size Selection</h2>
        <p className="text-slate-600">
          Your computed dimension is <span className="font-mono text-blue-600">0.564&quot;</span>. See how it rounds up to the next preferred fractional size:
        </p>
        <PreferredSizeTable computedSize={0.564} />
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
          <div className="text-sm text-slate-500">
            <span className="font-mono text-slate-700">0.564&quot;</span> rounds to the next preferred size: <span className="font-mono text-blue-600">5/8&quot; = 0.625&quot;</span>. This small increase in material ensures availability and lower cost, while also increasing the actual factor of safety above the design factor.
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Design Factor Calculator</h2>
        <p className="text-slate-600">Adjust force, strength, and design factor to explore how they interact:</p>
        <DesignFactorCalc />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: Required Diameter</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div><strong className="text-slate-800">Applied load:</strong> P = 2000 lbf</div>
          <div><strong className="text-slate-800">Material strength:</strong> S = 24 kpsi</div>
          <div><strong className="text-slate-800">Design factor:</strong> n<sub>d</sub> = 3.0</div>
        </div>
        <FillInTheBlank
          question="P=2000lb, S=24kpsi, nd=3. Required diameter = ___ in"
          answer={0.564}
          tolerance={0.02}
          unit=" in"
          explanation="d = &radic;(4&middot;P&middot;nd / (&pi;&middot;S)) = &radic;(4 &times; 2000 &times; 3 / (&pi; &times; 24000)) = &radic;(0.3183) = 0.564 in."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: Actual Factor of Safety</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div>After rounding to the preferred size d = 5/8 in = 0.625 in:</div>
          <div className="font-mono text-slate-700 mt-2">
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;3: Eccentric Loading</h2>
        <p className="text-slate-600 leading-relaxed">
          A vertical rod supports an axial load, but with several real-world complications:
        </p>

        {/* SVG Diagram: Waterfall / compounding multiplication diagram */}
        <svg className="w-full" viewBox="0 0 720 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="280" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Title */}
          <text x="360" y="28" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b" fontFamily="system-ui">How Uncertainty Factors Compound</text>

          {/* Stress side label */}
          <text x="360" y="50" textAnchor="middle" fontSize="11" fontWeight="600" fill="#ef4444" fontFamily="system-ui">Stress multipliers (each factor increases effective stress)</text>

          {/* Bar 0: sigma_nom (baseline) */}
          <rect x="40" y="160" width="60" height="60" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="70" y="185" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af" fontFamily="system-ui">{'\u03c3'}_nom</text>
          <text x="70" y="200" textAnchor="middle" fontSize="9" fill="#2563eb" fontFamily="system-ui">1.0x</text>

          {/* Arrow 1 */}
          <text x="115" y="175" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b" fontFamily="system-ui">{'\u00d7'}</text>

          {/* Bar 1: Geometry x1.05 */}
          <rect x="130" y="147" width="90" height="73" rx="4" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
          <text x="175" y="172" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e3a8a" fontFamily="system-ui">{'\u00d7'}1.05</text>
          <text x="175" y="188" textAnchor="middle" fontSize="9" fill="#1e40af" fontFamily="system-ui">Geometry</text>
          <text x="175" y="200" textAnchor="middle" fontSize="8" fill="#3b82f6" fontFamily="system-ui">(eccentric+tol)</text>

          {/* Arrow 2 */}
          <text x="235" y="175" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b" fontFamily="system-ui">{'\u00d7'}</text>

          {/* Bar 2: Dynamic x2.0 (tallest jump) */}
          <rect x="250" y="95" width="90" height="125" rx="4" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
          <text x="295" y="145" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="system-ui">{'\u00d7'}2.0</text>
          <text x="295" y="161" textAnchor="middle" fontSize="9" fill="#dbeafe" fontFamily="system-ui">Dynamic</text>
          <text x="295" y="173" textAnchor="middle" fontSize="8" fill="#bfdbfe" fontFamily="system-ui">(suddenly applied)</text>

          {/* Arrow 3 */}
          <text x="355" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b" fontFamily="system-ui">{'\u00d7'}</text>

          {/* Bar 3: Bending x1.11 */}
          <rect x="370" y="80" width="90" height="140" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
          <text x="415" y="140" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="system-ui">{'\u00d7'}1.11</text>
          <text x="415" y="156" textAnchor="middle" fontSize="9" fill="#dbeafe" fontFamily="system-ui">Bending</text>
          <text x="415" y="168" textAnchor="middle" fontSize="8" fill="#bfdbfe" fontFamily="system-ui">(from eccentricity)</text>

          {/* Arrow 4 */}
          <text x="475" y="145" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b" fontFamily="system-ui">{'\u00d7'}</text>

          {/* Bar 4: Material x1.0 (no change) */}
          <rect x="490" y="80" width="90" height="140" rx="4" fill="#2563eb" stroke="#1e40af" strokeWidth="1.5" />
          <text x="535" y="140" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="system-ui">{'\u00d7'}1.0</text>
          <text x="535" y="156" textAnchor="middle" fontSize="9" fill="#dbeafe" fontFamily="system-ui">Material</text>
          <text x="535" y="168" textAnchor="middle" fontSize="8" fill="#bfdbfe" fontFamily="system-ui">(no added factor)</text>

          {/* Equals sign */}
          <text x="598" y="145" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e293b" fontFamily="system-ui">=</text>

          {/* Result bar */}
          <rect x="615" y="68" width="90" height="152" rx="4" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
          <text x="660" y="132" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" fontFamily="system-ui">2.332</text>
          <text x="660" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="#bfdbfe" fontFamily="system-ui">{'\u03c3'}_nom</text>

          {/* Baseline floor line */}
          <line x1="30" y1="220" x2="710" y2="220" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />

          {/* Strength side below */}
          <rect x="40" y="235" width="640" height="32" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
          <text x="360" y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981" fontFamily="system-ui">
            {'Strength side:   S_nom \u00d7 0.965 = S_min   (material uncertainty reduces available strength)'}
          </text>
        </svg>

        <div className="space-y-2">
          {[
            { factor: 'Eccentricity', value: '\u00b11.5% of diameter', desc: 'Load not perfectly centered on the rod' },
            { factor: 'Diameter tolerance', value: '\u00b11%', desc: 'Machining variation' },
            { factor: 'Load uncertainty', value: '\u00b12%', desc: 'Applied force varies' },
            { factor: 'Strength uncertainty', value: '\u00b13.5%', desc: 'Material property variation' },
            { factor: 'Dynamic loading', value: 'Suddenly applied \u2192 F = 2P', desc: 'Impact factor doubles the effective load' },
          ].map(({ factor, value, desc }) => (
            <div key={factor} className="flex gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-sm">{factor}</span>
                  <span className="font-mono text-blue-600 text-sm">{value}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Each of these factors individually seems small, but when multiplied together they produce a significant design factor.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Eccentric Load Visualization</h2>
        <p className="text-slate-600">Explore how eccentricity, diameter, force, and dynamic loading combine to increase stress:</p>
        <EccentricLoadViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;3 Result</h2>
        <p className="text-slate-600 leading-relaxed">
          Combining all uncertainty factors, the maximum stress is 2.332 times the nominal stress, while the minimum strength is 0.965 times the nominal.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 border border-red-800 rounded-lg p-3 text-center">
            <div className="text-xs text-red-400 mb-1">Max stress multiplier</div>
            <div className="font-mono text-xl font-bold text-red-700">&sigma;<sub>max</sub> = 2.332 &sigma;<sub>nom</sub></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-800 rounded-lg p-3 text-center">
            <div className="text-xs text-emerald-400 mb-1">Min strength multiplier</div>
            <div className="font-mono text-xl font-bold text-emerald-700">S<sub>min</sub> = 0.965 S<sub>nom</sub></div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-mono text-center text-lg text-blue-600 mb-3">
            n<sub>d</sub> = 2.332 / 0.965 = 2.42
          </div>
          <div className="font-semibold text-slate-700 mb-2">Loss-of-Function Factor Breakdown</div>
          <div className="space-y-1.5">
            {[
              { factor: 'Geometry (eccentricity + tolerance)', value: '1.05' },
              { factor: 'Dynamic load (suddenly applied)', value: '2.0' },
              { factor: 'Bending (from eccentricity)', value: '1.1' },
              { factor: 'Strength data uncertainty', value: '1.05' },
            ].map(({ factor, value }) => (
              <div key={factor} className="flex items-center justify-between bg-white rounded-lg p-2 border border-slate-200">
                <span className="text-sm text-slate-600">{factor}</span>
                <span className="font-mono text-blue-600 font-bold">&times; {value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-blue-50 rounded-lg p-2 border border-blue-200 mt-2">
              <span className="text-sm font-semibold text-blue-800">Product</span>
              <span className="font-mono text-blue-600 font-bold text-lg">= 2.43 &asymp; 2.42</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: Design Factor from Stress Ratio</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div>&sigma;<sub>max</sub> = 2.332 &sigma;<sub>nom</sub></div>
          <div>S<sub>min</sub> = 0.965 S<sub>nom</sub></div>
          <div className="text-slate-500 mt-1">n<sub>d</sub> = &sigma;<sub>max</sub> / S<sub>min</sub> (ratio of multipliers)</div>
        </div>
        <FillInTheBlank
          question="&sigma;_max = 2.332&sigma;_nom, S_min = 0.965S_nom &rarr; nd = ___"
          answer={2.42}
          tolerance={0.02}
          explanation="nd = 2.332 / 0.965 = 2.416 &asymp; 2.42. This represents the combined effect of all uncertainty sources."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
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
