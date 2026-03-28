import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import UnitConverter from '../components/UnitConverter'
import SigFigsChecker from '../components/SigFigsChecker'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Unit Systems Introduction</h2>
        <p className="text-slate-300">
          Engineering calculations require consistent unit systems. Newton's second law, <strong className="text-slate-100">F = ma</strong>,
          relates force, mass, length, and time through <span className="font-mono text-[#f59e0b]">F = MLT&minus;&sup2;</span>.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-blue-400 mb-2">Gravitational Systems</div>
            <p className="text-sm text-slate-300">
              <strong className="text-slate-100">Force, length, and time</strong> are base units.
            </p>
            <p className="text-xs text-slate-400 mt-1">Mass is derived from F = ma.</p>
            <div className="mt-2 font-mono text-xs text-slate-500">Base: lbf, ft, s</div>
          </div>
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-emerald-400 mb-2">Absolute Systems</div>
            <p className="text-sm text-slate-300">
              <strong className="text-slate-100">Mass, length, and time</strong> are base units.
            </p>
            <p className="text-xs text-slate-400 mt-1">Force is derived from F = ma.</p>
            <div className="mt-2 font-mono text-xs text-slate-500">Base: kg, m, s</div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Key insight: In any unit system, only three of {'{'}force, mass, length, time{'}'} are independent &mdash; the fourth is derived through F = ma.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">US Customary: fps and ips Systems</h2>
        <p className="text-slate-300">
          The US customary systems are <strong className="text-slate-100">gravitational</strong> &mdash; force (lbf) is a base unit, and mass is derived.
        </p>

        <div className="space-y-3">
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-[#f59e0b] mb-2">fps System (foot-pound-second)</div>
            <div className="space-y-1 text-sm">
              <div className="text-slate-300">Base units: <span className="font-mono text-slate-100">ft, lbf, s</span></div>
              <div className="text-slate-300">Derived mass:</div>
              <div className="font-mono text-lg text-[#f59e0b] py-1">1 slug = 1 lbf &middot; s&sup2; / ft</div>
              <div className="text-xs text-slate-400">A 1 slug mass accelerates at 1 ft/s&sup2; under 1 lbf of force.</div>
            </div>
          </div>

          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-[#f59e0b] mb-2">ips System (inch-pound-second)</div>
            <div className="space-y-1 text-sm">
              <div className="text-slate-300">Base units: <span className="font-mono text-slate-100">in, lbf, s</span></div>
              <div className="text-slate-300">Derived mass:</div>
              <div className="font-mono text-lg text-[#f59e0b] py-1">1 (mass unit) = 1 lbf &middot; s&sup2; / in</div>
              <div className="text-xs text-slate-400">This unit has no official name. It is commonly used in mechanical design calculations.</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
          <div className="text-xs text-slate-500 mb-1">Gravity constants:</div>
          <div className="text-xs text-slate-400 space-y-0.5 font-mono">
            <div>fps: g = 32.174 ft/s&sup2;</div>
            <div>ips: g = 386.088 in/s&sup2;</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">SI System (Syst&egrave;me International)</h2>
        <p className="text-slate-300">
          SI is an <strong className="text-slate-100">absolute system</strong> &mdash; mass (kg) is a base unit, and force is derived.
        </p>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-emerald-400 mb-2">Base units: kg, m, s</div>
          <div className="space-y-2 text-sm">
            <div className="text-slate-300">Derived force unit:</div>
            <div className="font-mono text-lg text-[#f59e0b] py-1">1 Newton = 1 kg &middot; m / s&sup2;</div>
          </div>
        </div>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Weight from W = mg</div>
          <div className="space-y-1">
            <div className="font-mono text-sm text-slate-300">Standard gravity: <span className="text-[#f59e0b]">g = 9.806 m/s&sup2; &asymp; 9.81 m/s&sup2;</span></div>
            <div className="font-mono text-sm text-slate-300">Weight of 1 kg: <span className="text-[#f59e0b]">W = 1 &times; 9.81 = 9.81 N</span></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#0e0e1e] rounded-lg p-2 border border-[#252548]">
            <div className="text-xs text-slate-500">1 kg weight</div>
            <div className="font-mono font-bold text-[#f59e0b]">9.81 N</div>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-2 border border-[#252548]">
            <div className="text-xs text-slate-500">1 lbf</div>
            <div className="font-mono font-bold text-[#f59e0b]">4.448 N</div>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-2 border border-[#252548]">
            <div className="text-xs text-slate-500">1 slug</div>
            <div className="font-mono font-bold text-[#f59e0b]">14.59 kg</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Unit Converter</h2>
        <p className="text-slate-300">Convert between unit systems to build intuition for common engineering quantities:</p>
        <UnitConverter />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Quick Check: SI Weight</h2>
        <FillInTheBlank
          question="Weight of 1 kg mass in SI = 1 × 9.81 = ___ N"
          answer={9.81}
          unit=" N"
          tolerance={0.01}
          explanation="W = mg = 1 kg × 9.81 m/s² = 9.81 N. This is the fundamental weight calculation in SI."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check: ips Unit Mass Weight</h2>
        <Quiz
          question="In the ips system, a unit mass (1 lbf·s²/in) weighs approximately ___ lbf"
          options={[
            '32.2 lbf',
            '386 lbf',
            '9.81 lbf',
            '1 lbf',
          ]}
          correctIndex={1}
          explanation="W = mg = (1 lbf·s²/in)(386 in/s²) = 386 lbf. The value 386 comes from g = 386.088 in/s², which is the gravitational constant in the ips system (32.174 ft/s² × 12 in/ft)."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Significant Figures</h2>
        <p className="text-slate-300">
          Engineering accuracy typically requires <strong className="text-slate-100">three or four significant figures</strong>.
          Knowing how to count them correctly is essential.
        </p>

        <div className="space-y-2">
          {[
            { num: '706', sf: 3, note: 'All non-zero digits are significant' },
            { num: '0.00219', sf: 3, note: 'Leading zeros are NOT significant (just placeholders)' },
            { num: '91600', sf: '?', note: 'Ambiguous! Could be 3, 4, or 5. Use scientific notation: 9.16 × 10⁴ = 3 sig figs' },
            { num: '706.0', sf: 4, note: 'Trailing zero after decimal IS significant' },
            { num: '3.14', sf: 3, note: 'All digits are significant' },
          ].map(({ num, sf, note }) => (
            <div key={num} className="flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <span className="font-mono text-lg text-slate-100 w-24 text-right">{num}</span>
              <span className="text-[#f59e0b] font-bold w-10 text-center">{sf}</span>
              <span className="text-sm text-slate-400">{note}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Key Rule for Calculations</h2>
        <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-4">
          <p className="text-amber-200 font-semibold text-lg">
            Never report more significant figures than the smallest number of significant figures used in the calculation.
          </p>
        </div>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Example: Circumference of a 0.40-in diameter rod</div>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-slate-300">C = &pi; &times; d = &pi; &times; 0.40 in</div>
            <div className="font-mono text-slate-400">C = 3.14159... &times; 0.40 = 1.2566...</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-slate-400">Limiting factor:</span>
              <span className="font-mono text-[#f59e0b]">d = 0.40</span>
              <span className="text-slate-400">&rarr; 2 sig figs</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-900/20 rounded-lg p-2 border border-emerald-800 mt-2">
              <span className="text-emerald-300 font-semibold">Correct answer:</span>
              <span className="font-mono text-lg text-emerald-200 font-bold">C = 1.3 in</span>
              <span className="text-emerald-400 text-xs">(2 sig figs)</span>
            </div>
            <div className="flex items-center gap-2 bg-red-900/20 rounded-lg p-2 border border-red-800">
              <span className="text-red-300 font-semibold">Wrong:</span>
              <span className="font-mono text-red-200">C = 1.2566 in</span>
              <span className="text-red-400 text-xs">(implies false precision)</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Significant Figures Practice</h2>
        <p className="text-slate-300">Count significant figures, then round calculations to the correct precision:</p>
        <SigFigsChecker onCorrect={onCorrect} />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Check: Sig Figs in Practice</h2>
        <FillInTheBlank
          question="C = π × 0.40 in = ___ in (report with correct significant figures)"
          answer={1.3}
          tolerance={0.01}
          unit=" in"
          explanation="d = 0.40 has 2 significant figures, so the answer must also be reported to 2 sig figs: π × 0.40 = 1.2566... → 1.3 in."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module14() {
  return (
    <ModuleLayout moduleId="module14" title="Units & Calculations" icon="📏" steps={steps} />
  )
}
