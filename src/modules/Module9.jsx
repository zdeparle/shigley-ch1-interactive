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
      <h2 className="text-2xl font-bold text-blue-600">Interactive: Stress vs. Strength</h2>
      <p className="text-slate-600">Adjust the applied force and cross-sectional area to see how stress compares to material strength.</p>

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
        <div className="bg-red-50 border border-red-800 rounded-lg p-3 text-center">
          <div className="text-xs text-red-400 mb-1">&sigma; = F / A (Stress)</div>
          <div className="font-mono text-xl font-bold text-red-700">{stress.toLocaleString(undefined, { maximumFractionDigits: 0 })} psi</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-800 rounded-lg p-3 text-center">
          <div className="text-xs text-emerald-400 mb-1">S (Strength)</div>
          <div className="font-mono text-xl font-bold text-emerald-700">{strength.toLocaleString()} psi</div>
        </div>
      </div>

      {/* Progress bar showing percentage of strength used */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500">Strength Used</span>
          <span className={`font-mono font-bold ${safe ? 'text-emerald-400' : 'text-red-400'}`}>{ratio.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-4 overflow-hidden">
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
        safe ? 'bg-emerald-50 border border-emerald-200 text-emerald-400' : 'bg-red-50 border border-red-200 text-red-400'
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
        <h2 className="text-2xl font-bold text-blue-600">Stress &amp; Strength: The Central Distinction</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            &ldquo;The survival of many products depends on how the designer adjusts the maximum stresses to be less than the component&rsquo;s strength.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Stress</strong> is what the load does to the part.
          <strong className="text-slate-800"> Strength</strong> is what the material can resist.
          The designer&rsquo;s task is to keep stress well below strength.
        </p>

        {/* SVG Diagram: Stress vs Strength core concept */}
        <svg className="w-full" viewBox="0 0 720 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="720" height="260" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* LEFT: Stress side */}
          <rect x="30" y="20" width="260" height="220" rx="10" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
          <text x="160" y="48" textAnchor="middle" fontSize="15" fontWeight="700" fill="#ef4444" fontFamily="system-ui">STRESS  {'\u03c3'} = F / A</text>

          {/* Structural member rectangle */}
          <rect x="110" y="70" width="100" height="50" rx="4" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
          {/* Force arrows pushing from left */}
          <line x1="55" y1="95" x2="105" y2="95" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
          <text x="65" y="88" fontSize="14" fontWeight="700" fill="#ef4444" fontFamily="system-ui">F</text>
          {/* Force arrows pushing from right */}
          <line x1="265" y1="95" x2="215" y2="95" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
          <text x="245" y="88" fontSize="14" fontWeight="700" fill="#ef4444" fontFamily="system-ui">F</text>
          {/* Cross-section label */}
          <text x="160" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b" fontFamily="system-ui">A</text>

          {/* Stress subtitle */}
          <text x="160" y="148" textAnchor="middle" fontSize="11" fill="#b91c1c" fontFamily="system-ui">Depends on:</text>
          <text x="160" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="#dc2626" fontFamily="system-ui">Load, Geometry, Temperature</text>

          {/* Arrow marker for red */}
          <defs>
            <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
            </marker>
            <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
            </marker>
          </defs>

          {/* CENTER: Comparison operator */}
          <rect x="310" y="80" width="100" height="100" rx="50" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
          <text x="360" y="118" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2563eb" fontFamily="system-ui">{'\u03c3'} {'<'} S</text>
          <text x="360" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb" fontFamily="system-ui">{'\u2192'} Safe</text>

          {/* RIGHT: Strength side */}
          <rect x="430" y="20" width="260" height="220" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
          <text x="560" y="48" textAnchor="middle" fontSize="15" fontWeight="700" fill="#10b981" fontFamily="system-ui">STRENGTH  S</text>

          {/* Material test coupon */}
          <rect x="520" y="68" width="80" height="24" rx="3" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" />
          {/* Grip sections */}
          <rect x="500" y="64" width="20" height="32" rx="2" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />
          <rect x="600" y="64" width="20" height="32" rx="2" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />
          {/* Strength bar gauge */}
          <rect x="480" y="110" width="160" height="14" rx="7" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
          <rect x="480" y="110" width="120" height="14" rx="7" fill="#10b981" />
          <text x="560" y="120" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="system-ui">S = material limit</text>

          {/* Strength subtitle */}
          <text x="560" y="148" textAnchor="middle" fontSize="11" fill="#047857" fontFamily="system-ui">Depends on:</text>
          <text x="560" y="166" textAnchor="middle" fontSize="11" fontWeight="600" fill="#059669" fontFamily="system-ui">Material, Processing, Treatment</text>

          {/* Bottom labels */}
          <text x="160" y="200" textAnchor="middle" fontSize="10" fill="#ef4444" fontFamily="system-ui" fontWeight="600">What the LOAD does to the part</text>
          <text x="560" y="200" textAnchor="middle" fontSize="10" fill="#10b981" fontFamily="system-ui" fontWeight="600">What the MATERIAL can resist</text>
        </svg>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-800 rounded-xl p-4">
            <div className="font-semibold text-red-400 text-lg mb-2">Stress</div>
            <div className="space-y-2 text-sm text-red-700">
              <div className="flex items-center gap-2">
                <span className="font-mono text-red-700 font-bold">&sigma;, &tau;</span>
                <span>&mdash; Normal and shear stress</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-red-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Depends on applied loads
              </div>
              <div className="flex items-center gap-2 text-xs text-red-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Depends on geometry
              </div>
              <div className="flex items-center gap-2 text-xs text-red-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                Calculated from equations
              </div>
              <div className="bg-red-50 rounded-lg p-2 font-mono text-center text-red-700 text-lg mt-2">
                &sigma; = F / A
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-800 rounded-xl p-4">
            <div className="font-semibold text-emerald-400 text-lg mb-2">Strength</div>
            <div className="space-y-2 text-sm text-emerald-700">
              <div className="flex items-center gap-2">
                <span className="font-mono text-emerald-700 font-bold">S, S<sub>y</sub>, S<sub>u</sub></span>
                <span>&mdash; Material strength</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Property of the material
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Independent of loading
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700/60">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                Measured by testing
              </div>
              <div className="bg-emerald-50 rounded-lg p-2 font-mono text-center text-emerald-700 text-lg mt-2">
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
        <h2 className="text-2xl font-bold text-blue-600">Strength: An Inherent Property</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-emerald-500 pl-4">
            &ldquo;Strength is an inherent property of a part, built in by material and process.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Strength depends on the material chosen and how it was processed. It exists whether or not any load is applied.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Strength Notation</div>
          <div className="space-y-2">
            {[
              { sym: 'S', name: 'General strength' },
              { sym: 'S\u1D67', name: 'Yield strength' },
              { sym: 'S\u1D64', name: 'Ultimate (tensile) strength' },
              { sym: 'S\u209B\u1D67', name: 'Shear yield strength' },
              { sym: 'S\u2091', name: 'Endurance limit (fatigue)' },
            ].map(({ sym, name }) => (
              <div key={sym} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-blue-600 font-bold w-12">{sym}</span>
                <span className="text-slate-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          &ldquo;Various metalworking and heat-treating processes cause variations from point to point.&rdquo;
          Strength is not perfectly uniform &mdash; it varies with processing history.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Stress: A State at a Point</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-red-500 pl-4">
            &ldquo;Stress is a state property at a specific point within a body.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Stress varies from point to point within a part. It depends on the applied loads, the part geometry,
          temperature, and manufacturing processing.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Stress Notation</div>
          <div className="space-y-2">
            {[
              { sym: '\u03c3', name: 'Normal stress (general)' },
              { sym: '\u03c4', name: 'Shear stress' },
              { sym: '\u03c3\u2081', name: 'First principal stress' },
              { sym: '\u03c3\u1D67', name: 'Normal stress in the y-direction' },
            ].map(({ sym, name }) => (
              <div key={sym} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-blue-600 font-bold w-12">{sym}</span>
                <span className="text-slate-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Stress is a <strong>function</strong> of load, geometry, temperature, and manufacturing processing.
          Change any of these, and the stress state changes.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <StressStrengthDemo onCorrect={onCorrect} onIncorrect={onIncorrect} />
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Sources of Uncertainty (&sect;1&ndash;10)</h2>
        <p className="text-slate-600 leading-relaxed">
          Engineering design must account for many sources of uncertainty. Shigley&rsquo;s lists 11 specific sources &mdash; plus a reminder that the list itself may be incomplete.
        </p>

        {/* SVG Diagram: Uncertainty bullseye/target illustration */}
        <svg className="w-full" viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="220" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* LEFT: Tight cluster "Ideal" */}
          {/* Target rings */}
          <circle cx="120" cy="110" r="55" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="120" cy="110" r="40" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="120" cy="110" r="25" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="120" cy="110" r="10" fill="#2563eb" />
          {/* Tight cluster of dots */}
          <circle cx="118" cy="108" r="3" fill="#1d4ed8" />
          <circle cx="122" cy="112" r="3" fill="#1d4ed8" />
          <circle cx="116" cy="113" r="3" fill="#1d4ed8" />
          <circle cx="121" cy="106" r="3" fill="#1d4ed8" />
          <circle cx="124" cy="110" r="3" fill="#1d4ed8" />
          <circle cx="119" cy="115" r="3" fill="#1d4ed8" />
          <text x="120" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#10b981" fontFamily="system-ui">Ideal</text>
          <text x="120" y="200" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Low uncertainty</text>

          {/* CENTER: Three categories */}
          <rect x="240" y="25" width="240" height="170" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
          <text x="360" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#d97706" fontFamily="system-ui">Sources of Uncertainty</text>

          {/* Material */}
          <rect x="260" y="65" width="200" height="38" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="282" cy="84" r="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="282" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb" fontFamily="system-ui">?</text>
          <text x="306" y="79" fontSize="12" fontWeight="700" fill="#1e293b" fontFamily="system-ui">Material</text>
          <text x="306" y="94" fontSize="10" fill="#64748b" fontFamily="system-ui">Composition varies</text>

          {/* Loading */}
          <rect x="260" y="110" width="200" height="38" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="282" cy="129" r="12" fill="#fce7f3" stroke="#ef4444" strokeWidth="1.5" />
          <text x="282" y="133" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444" fontFamily="system-ui">?</text>
          <text x="306" y="124" fontSize="12" fontWeight="700" fill="#1e293b" fontFamily="system-ui">Loading</text>
          <text x="306" y="139" fontSize="10" fill="#64748b" fontFamily="system-ui">Actual use differs</text>

          {/* Model */}
          <rect x="260" y="155" width="200" height="38" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="282" cy="174" r="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="282" y="178" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed" fontFamily="system-ui">?</text>
          <text x="306" y="169" fontSize="12" fontWeight="700" fill="#1e293b" fontFamily="system-ui">Model</text>
          <text x="306" y="184" fontSize="10" fill="#64748b" fontFamily="system-ui">Simplifications used</text>

          {/* RIGHT: Wide scatter "Reality" */}
          {/* Target rings */}
          <circle cx="600" cy="110" r="55" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="600" cy="110" r="40" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="600" cy="110" r="25" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="600" cy="110" r="10" fill="#2563eb" />
          {/* Wide scatter of dots */}
          <circle cx="585" cy="78" r="3" fill="#ef4444" />
          <circle cx="628" cy="95" r="3" fill="#ef4444" />
          <circle cx="572" cy="120" r="3" fill="#ef4444" />
          <circle cx="615" cy="140" r="3" fill="#ef4444" />
          <circle cx="640" cy="112" r="3" fill="#ef4444" />
          <circle cx="580" cy="145" r="3" fill="#ef4444" />
          <circle cx="560" cy="100" r="3" fill="#ef4444" />
          <circle cx="620" cy="75" r="3" fill="#ef4444" />
          <circle cx="610" cy="130" r="3" fill="#ef4444" />
          <circle cx="590" cy="155" r="3" fill="#ef4444" />
          <circle cx="635" cy="85" r="3" fill="#ef4444" />
          <circle cx="565" cy="135" r="3" fill="#ef4444" />
          <text x="600" y="185" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ef4444" fontFamily="system-ui">Reality</text>
          <text x="600" y="200" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">High uncertainty</text>
        </svg>

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
            <div key={i} className="flex gap-2 bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <span className="text-blue-600 font-bold text-xs w-6 shrink-0 text-right">{i + 1}.</span>
              <span className="text-sm text-slate-600">{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 italic">
          &ldquo;...plus the uncertainty as to the length of any list of uncertainties.&rdquo;
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Two Approaches to Uncertainty</h2>
        <p className="text-slate-600 leading-relaxed">
          Engineers handle uncertainty using one of two approaches:
        </p>

        {/* SVG Diagram: Deterministic vs Stochastic comparison */}
        <svg className="w-full" viewBox="0 0 720 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* LEFT PANEL: Deterministic */}
          <rect x="20" y="15" width="330" height="270" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <text x="185" y="42" textAnchor="middle" fontSize="15" fontWeight="700" fill="#2563eb" fontFamily="system-ui">Deterministic</text>

          {/* Horizontal axis line */}
          <line x1="50" y1="200" x2="320" y2="200" stroke="#94a3b8" strokeWidth="1" />
          {/* Axis label */}
          <text x="185" y="218" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Parameter value</text>

          {/* Single stress line (red) */}
          <line x1="120" y1="80" x2="120" y2="200" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="0" />
          <circle cx="120" cy="80" r="4" fill="#ef4444" />
          <text x="120" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ef4444" fontFamily="system-ui">{'\u03c3'}</text>

          {/* Single strength line (green) */}
          <line x1="260" y1="80" x2="260" y2="200" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="260" cy="80" r="4" fill="#10b981" />
          <text x="260" y="72" textAnchor="middle" fontSize="12" fontWeight="700" fill="#10b981" fontFamily="system-ui">S</text>

          {/* Gap bracket and label */}
          <line x1="130" y1="140" x2="250" y2="140" stroke="#2563eb" strokeWidth="1.5" />
          <line x1="130" y1="132" x2="130" y2="148" stroke="#2563eb" strokeWidth="1.5" />
          <line x1="250" y1="132" x2="250" y2="148" stroke="#2563eb" strokeWidth="1.5" />
          <rect x="155" y="128" width="60" height="22" rx="4" fill="white" stroke="#2563eb" strokeWidth="1" />
          <text x="185" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb" fontFamily="system-ui">n = S/{'\u03c3'}</text>

          {/* Bottom label */}
          <text x="185" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af" fontFamily="system-ui">Single value {'\u2192'} Design factor</text>

          {/* RIGHT PANEL: Stochastic */}
          <rect x="370" y="15" width="330" height="270" rx="10" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
          <text x="535" y="42" textAnchor="middle" fontSize="15" fontWeight="700" fill="#7c3aed" fontFamily="system-ui">Stochastic</text>

          {/* Bell curve for stress (red) - approximated with path */}
          <path d="M 400 200 Q 410 198 430 185 Q 450 150 470 80 Q 490 150 510 185 Q 530 198 540 200" stroke="#ef4444" strokeWidth="2.5" fill="#ef444420" />
          <text x="470" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ef4444" fontFamily="system-ui">Stress dist.</text>

          {/* Bell curve for strength (green) - offset right, overlapping */}
          <path d="M 520 200 Q 530 198 550 185 Q 570 150 590 80 Q 610 150 630 185 Q 650 198 660 200" stroke="#10b981" strokeWidth="2.5" fill="#10b98120" />
          <text x="590" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#10b981" fontFamily="system-ui">Strength dist.</text>

          {/* Overlap region shaded in amber */}
          <path d="M 520 200 Q 525 198 530 194 Q 535 188 540 200 Z" fill="#d9770660" />
          <path d="M 510 200 Q 515 195 520 190 Q 525 188 530 186 Q 535 190 540 200 Z" fill="#d9770650" />

          {/* Overlap label with arrow */}
          <line x1="530" y1="175" x2="530" y2="195" stroke="#d97706" strokeWidth="1.5" />
          <rect x="490" y="155" width="80" height="20" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <text x="530" y="169" textAnchor="middle" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="system-ui">Failure prob.</text>

          {/* Horizontal axis line */}
          <line x1="390" y1="200" x2="670" y2="200" stroke="#94a3b8" strokeWidth="1" />
          <text x="535" y="218" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Parameter value</text>

          {/* Bottom label */}
          <text x="535" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="#5b21b6" fontFamily="system-ui">Distributions {'\u2192'} Reliability</text>
        </svg>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="font-semibold text-blue-700 text-lg mb-2">Deterministic</div>
            <p className="text-sm text-blue-700 mb-3">
              Uses a single <strong className="text-blue-700">design factor n<sub>d</sub></strong> to account for all uncertainties at once.
            </p>
            <div className="bg-slate-50 rounded-lg p-3 font-mono text-center space-y-2">
              <div className="text-blue-700">
                n<sub>d</sub> = <span className="text-slate-500">loss-of-function parameter</span> / <span className="text-slate-500">max allowable parameter</span>
              </div>
              <div className="text-xs text-slate-500">(Eq 1&ndash;1)</div>
              <div className="text-blue-700 mt-2">
                max allowable = <span className="text-slate-500">loss-of-function</span> / n<sub>d</sub>
              </div>
              <div className="text-xs text-slate-500">(Eq 1&ndash;2)</div>
            </div>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="font-semibold text-violet-700 text-lg mb-2">Stochastic</div>
            <p className="text-sm text-violet-700 mb-3">
              Uses <strong className="text-violet-700">probability and reliability</strong> to quantify the chance of survival.
            </p>
            <div className="bg-slate-50 rounded-lg p-3 text-sm text-violet-700 space-y-2">
              <div>Obtain stress distribution</div>
              <div>Obtain strength distribution</div>
              <div>Compute probability of overlap</div>
              <div className="text-violet-700 font-semibold">Express as reliability R</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-sm text-slate-500">
          The deterministic approach is simpler and more commonly used in practice. The stochastic approach provides deeper insight but requires statistical data on loads and strengths.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;1: Design Factor Calculation</h2>
        <p className="text-slate-600">
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
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: Maximum Allowable Load</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div><strong className="text-slate-800">Load uncertainty:</strong> &plusmn;20%</div>
          <div><strong className="text-slate-800">Failure uncertainty:</strong> &plusmn;15%</div>
          <div><strong className="text-slate-800">Nominal failure load:</strong> 2000 lbf</div>
        </div>
        <FillInTheBlank
          question="Load uncertainty &plusmn;20%, failure uncertainty &plusmn;15%, nominal failure = 2000 lbf. Max allowable load = ___"
          answer={1400}
          tolerance={0.03}
          unit=" lbf"
          explanation="nd = (1/0.85)/(1/1.2) = 1.2/0.85 = 1.41. Max allowable = 2000/1.41 &asymp; 1418 lbf. Accepting 1400&ndash;1429 range."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Check: Methods of Handling Uncertainty</h2>
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
          onIncorrect={onIncorrect}
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
