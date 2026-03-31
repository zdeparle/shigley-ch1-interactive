import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import UnitConverter from '../components/UnitConverter'
import SigFigsChecker from '../components/SigFigsChecker'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Unit Systems Introduction</h2>
        <p className="text-slate-600">
          Engineering calculations require consistent unit systems. Newton's second law, <strong className="text-slate-800">F = ma</strong>,
          relates force, mass, length, and time through <span className="font-mono text-blue-600">F = MLT&minus;&sup2;</span>.
        </p>
        {/* F = ma in Three Unit Systems */}
        <svg className="w-full" viewBox="0 0 720 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrowFps" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#2563eb" />
            </marker>
            <marker id="arrowIps" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#10b981" />
            </marker>
            <marker id="arrowSi" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#7c3aed" />
            </marker>
          </defs>
          {/* Title */}
          <text x="360" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">F = ma across Three Unit Systems</text>

          {/* --- fps column --- */}
          <rect x="8" y="38" width="228" height="184" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
          <text x="122" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">fps System</text>
          <rect x="28" y="74" width="80" height="38" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="68" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">1 slug</text>
          <text x="68" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(mass)</text>
          <text x="118" y="97" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">&#xd7;</text>
          <rect x="130" y="74" width="88" height="38" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="174" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">{"1 ft/s\u00B2"}</text>
          <text x="174" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(acceleration)</text>
          <line x1="122" y1="118" x2="122" y2="148" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowFps)" />
          <rect x="47" y="152" width="150" height="40" rx="8" fill="#2563eb" />
          <text x="122" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="system-ui, sans-serif">= 1 lbf</text>
          <text x="122" y="185" textAnchor="middle" fontSize="9" fill="#bfdbfe" fontFamily="system-ui, sans-serif">(force)</text>
          <text x="122" y="214" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">g = 32.174 ft/s&#xB2;</text>

          {/* --- ips column --- */}
          <rect x="246" y="38" width="228" height="184" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
          <text x="360" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">ips System</text>
          <rect x="256" y="74" width="94" height="38" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <text x="303" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">{"1 lbf\u00B7s\u00B2/in"}</text>
          <text x="303" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(mass)</text>
          <text x="358" y="97" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">&#xd7;</text>
          <rect x="370" y="74" width="86" height="38" rx="6" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          <text x="413" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">{"1 in/s\u00B2"}</text>
          <text x="413" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(acceleration)</text>
          <line x1="360" y1="118" x2="360" y2="148" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowIps)" />
          <rect x="285" y="152" width="150" height="40" rx="8" fill="#10b981" />
          <text x="360" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="system-ui, sans-serif">= 1 lbf</text>
          <text x="360" y="185" textAnchor="middle" fontSize="9" fill="#a7f3d0" fontFamily="system-ui, sans-serif">(force)</text>
          <text x="360" y="214" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">g = 386.088 in/s&#xB2;</text>

          {/* --- SI column --- */}
          <rect x="484" y="38" width="228" height="184" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
          <text x="598" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">SI System</text>
          <rect x="504" y="74" width="80" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="544" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">1 kg</text>
          <text x="544" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(mass)</text>
          <text x="594" y="97" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">&#xd7;</text>
          <rect x="606" y="74" width="88" height="38" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="650" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">{"1 m/s\u00B2"}</text>
          <text x="650" y="104" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(acceleration)</text>
          <line x1="598" y1="118" x2="598" y2="148" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowSi)" />
          <rect x="523" y="152" width="150" height="40" rx="8" fill="#7c3aed" />
          <text x="598" y="170" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="system-ui, sans-serif">= 1 N</text>
          <text x="598" y="185" textAnchor="middle" fontSize="9" fill="#ddd6fe" fontFamily="system-ui, sans-serif">(force)</text>
          <text x="598" y="214" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">g = 9.806 m/s&#xB2;</text>
        </svg>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-400 mb-2">Gravitational Systems</div>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-800">Force, length, and time</strong> are base units.
            </p>
            <p className="text-xs text-slate-500 mt-1">Mass is derived from F = ma.</p>
            <div className="mt-2 font-mono text-xs text-slate-500">Base: lbf, ft, s</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-emerald-400 mb-2">Absolute Systems</div>
            <p className="text-sm text-slate-600">
              <strong className="text-slate-800">Mass, length, and time</strong> are base units.
            </p>
            <p className="text-xs text-slate-500 mt-1">Force is derived from F = ma.</p>
            <div className="mt-2 font-mono text-xs text-slate-500">Base: kg, m, s</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Key insight: In any unit system, only three of {'{'}force, mass, length, time{'}'} are independent &mdash; the fourth is derived through F = ma.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">US Customary: fps and ips Systems</h2>
        <p className="text-slate-600">
          The US customary systems are <strong className="text-slate-800">gravitational</strong> &mdash; force (lbf) is a base unit, and mass is derived.
        </p>

        <div className="space-y-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-600 mb-2">fps System (foot-pound-second)</div>
            <div className="space-y-1 text-sm">
              <div className="text-slate-600">Base units: <span className="font-mono text-slate-800">ft, lbf, s</span></div>
              <div className="text-slate-600">Derived mass:</div>
              <div className="font-mono text-lg text-blue-600 py-1">1 slug = 1 lbf &middot; s&sup2; / ft</div>
              <div className="text-xs text-slate-500">A 1 slug mass accelerates at 1 ft/s&sup2; under 1 lbf of force.</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-600 mb-2">ips System (inch-pound-second)</div>
            <div className="space-y-1 text-sm">
              <div className="text-slate-600">Base units: <span className="font-mono text-slate-800">in, lbf, s</span></div>
              <div className="text-slate-600">Derived mass:</div>
              <div className="font-mono text-lg text-blue-600 py-1">1 (mass unit) = 1 lbf &middot; s&sup2; / in</div>
              <div className="text-xs text-slate-500">This unit has no official name. It is commonly used in mechanical design calculations.</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="text-xs text-slate-500 mb-1">Gravity constants:</div>
          <div className="text-xs text-slate-500 space-y-0.5 font-mono">
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
        <h2 className="text-2xl font-bold text-blue-600">SI System (Syst&egrave;me International)</h2>
        <p className="text-slate-600">
          SI is an <strong className="text-slate-800">absolute system</strong> &mdash; mass (kg) is a base unit, and force is derived.
        </p>

        {/* SI Hub-and-Spoke Diagram */}
        <svg className="w-full" viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Spokes - lines from center to base units */}
          <line x1="300" y1="130" x2="120" y2="60" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="0" />
          <line x1="300" y1="130" x2="300" y2="40" stroke="#2563eb" strokeWidth="2.5" />
          <line x1="300" y1="130" x2="480" y2="60" stroke="#2563eb" strokeWidth="2.5" />
          {/* Spokes - lines from center to derived units */}
          <line x1="300" y1="130" x2="160" y2="260" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 3" />
          <line x1="300" y1="130" x2="440" y2="260" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 3" />

          {/* Center hub */}
          <circle cx="300" cy="130" r="48" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <text x="300" y="125" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" fontFamily="system-ui, sans-serif">SI</text>
          <text x="300" y="142" textAnchor="middle" fontSize="10" fill="#bfdbfe" fontFamily="system-ui, sans-serif">System</text>

          {/* Base unit: meter */}
          <rect x="35" y="28" width="170" height="58" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="120" y="51" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">meter (m)</text>
          <text x="120" y="72" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="system-ui, sans-serif">length</text>

          {/* Base unit: kilogram */}
          <rect x="215" y="8" width="170" height="58" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="300" y="31" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">kilogram (kg)</text>
          <text x="300" y="52" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="system-ui, sans-serif">mass</text>

          {/* Base unit: second */}
          <rect x="395" y="28" width="170" height="58" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="480" y="51" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">second (s)</text>
          <text x="480" y="72" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="system-ui, sans-serif">time</text>

          {/* Derived unit: newton */}
          <rect x="55" y="228" width="210" height="58" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x="160" y="252" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">newton (N)</text>
          <text x="160" y="272" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">{"force = kg\u00B7m/s\u00B2"}</text>

          {/* Derived unit: pascal */}
          <rect x="335" y="228" width="210" height="58" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x="440" y="252" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">pascal (Pa)</text>
          <text x="440" y="272" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">{"pressure = N/m\u00B2"}</text>

          {/* Arrow from newton to pascal */}
          <line x1="265" y1="257" x2="333" y2="257" stroke="#7c3aed" strokeWidth="1.5" />
          <polygon points="330,253 338,257 330,261" fill="#7c3aed" />

          {/* Legend */}
          <rect x="180" y="305" width="12" height="12" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          <text x="198" y="316" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Base units</text>
          <rect x="290" y="305" width="12" height="12" rx="2" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
          <text x="308" y="316" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Derived units</text>
        </svg>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-emerald-400 mb-2">Base units: kg, m, s</div>
          <div className="space-y-2 text-sm">
            <div className="text-slate-600">Derived force unit:</div>
            <div className="font-mono text-lg text-blue-600 py-1">1 Newton = 1 kg &middot; m / s&sup2;</div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">Weight from W = mg</div>
          <div className="space-y-1">
            <div className="font-mono text-sm text-slate-600">Standard gravity: <span className="text-blue-600">g = 9.806 m/s&sup2; &asymp; 9.81 m/s&sup2;</span></div>
            <div className="font-mono text-sm text-slate-600">Weight of 1 kg: <span className="text-blue-600">W = 1 &times; 9.81 = 9.81 N</span></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            <div className="text-xs text-slate-500">1 kg weight</div>
            <div className="font-mono font-bold text-blue-600">9.81 N</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            <div className="text-xs text-slate-500">1 lbf</div>
            <div className="font-mono font-bold text-blue-600">4.448 N</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
            <div className="text-xs text-slate-500">1 slug</div>
            <div className="font-mono font-bold text-blue-600">14.59 kg</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Unit Converter</h2>
        <p className="text-slate-600">Convert between unit systems to build intuition for common engineering quantities:</p>
        <UnitConverter />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Quick Check: SI Weight</h2>
        <FillInTheBlank
          question="Weight of 1 kg mass in SI = 1 × 9.81 = ___ N"
          answer={9.81}
          unit=" N"
          tolerance={0.01}
          explanation="W = mg = 1 kg × 9.81 m/s² = 9.81 N. This is the fundamental weight calculation in SI."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check: ips Unit Mass Weight</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Significant Figures</h2>
        <p className="text-slate-600">
          Engineering accuracy typically requires <strong className="text-slate-800">three or four significant figures</strong>.
          Knowing how to count them correctly is essential.
        </p>

        {/* Precision Ruler Visualization */}
        <svg className="w-full" viewBox="0 0 620 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Title */}
          <text x="310" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">More Significant Figures = More Precision</text>

          {/* Number line */}
          <line x1="50" y1="60" x2="570" y2="60" stroke="#94a3b8" strokeWidth="2" />
          {/* Tick marks and labels 0-10 */}
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <g key={`tick-${n}`}>
              <line x1={50 + n * 52} y1="54" x2={50 + n * 52} y2="66" stroke="#94a3b8" strokeWidth="1.5" />
              <text x={50 + n * 52} y="78" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">{n}</text>
            </g>
          ))}

          {/* 1 sig fig: 7 -- range roughly 6.5 to 7.5 */}
          <rect x={50 + 6.5 * 52} y="92" width={1 * 52} height="28" rx="4" fill="#dbeafe" fillOpacity="0.6" stroke="#2563eb" strokeWidth="1.5" />
          <line x1={50 + 6.5 * 52} y1="92" x2={50 + 6.5 * 52} y2="120" stroke="#2563eb" strokeWidth="1.5" />
          <line x1={50 + 7.5 * 52} y1="92" x2={50 + 7.5 * 52} y2="120" stroke="#2563eb" strokeWidth="1.5" />
          <text x={50 + 7 * 52} y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">7</text>
          <text x={50 + 7 * 52 + 46} y="110" textAnchor="start" fontSize="10" fill="#2563eb" fontFamily="system-ui, sans-serif">1 sig fig</text>

          {/* 2 sig figs: 7.1 -- range roughly 7.05 to 7.15 */}
          <rect x={50 + 7.05 * 52} y="130" width={0.1 * 52} height="28" rx="3" fill="#93c5fd" fillOpacity="0.6" stroke="#2563eb" strokeWidth="1.5" />
          <line x1={50 + 7.05 * 52} y1="130" x2={50 + 7.05 * 52} y2="158" stroke="#2563eb" strokeWidth="1.5" />
          <line x1={50 + 7.15 * 52} y1="130" x2={50 + 7.15 * 52} y2="158" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx={50 + 7.1 * 52} cy="144" r="3" fill="#2563eb" />
          <text x={50 + 7.15 * 52 + 8} y="148" textAnchor="start" fontSize="10" fontWeight="bold" fill="#1e40af" fontFamily="system-ui, sans-serif">7.1  (2 sig figs)</text>

          {/* 3 sig figs: 7.06 -- range roughly 7.055 to 7.065 */}
          <rect x={50 + 7.055 * 52} y="168" width={0.01 * 52} height="28" rx="1" fill="#60a5fa" fillOpacity="0.8" stroke="#1d4ed8" strokeWidth="1.5" />
          <circle cx={50 + 7.06 * 52} cy="182" r="3" fill="#1d4ed8" />
          <text x={50 + 7.06 * 52 + 10} y="186" textAnchor="start" fontSize="10" fontWeight="bold" fill="#1e3a8a" fontFamily="system-ui, sans-serif">7.06  (3 sig figs)</text>

          {/* 4 sig figs: 7.064 -- range roughly 7.0635 to 7.0645 */}
          <rect x={50 + 7.0635 * 52} y="206" width={0.001 * 52} height="28" rx="0.5" fill="#2563eb" fillOpacity="0.9" stroke="#1e3a8a" strokeWidth="1.5" />
          <circle cx={50 + 7.064 * 52} cy="220" r="3" fill="#1e3a8a" />
          <text x={50 + 7.064 * 52 + 10} y="224" textAnchor="start" fontSize="10" fontWeight="bold" fill="#172554" fontFamily="system-ui, sans-serif">7.064  (4 sig figs)</text>

          {/* Annotation arrow showing narrowing */}
          <line x1="560" y1="100" x2="560" y2="230" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
          <polygon points="556,228 560,238 564,228" fill="#64748b" />
          <text x="556" y="254" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">narrower</text>
          <text x="556" y="266" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">range</text>
        </svg>

        <div className="space-y-2">
          {[
            { num: '706', sf: 3, note: 'All non-zero digits are significant' },
            { num: '0.00219', sf: 3, note: 'Leading zeros are NOT significant (just placeholders)' },
            { num: '91600', sf: '?', note: 'Ambiguous! Could be 3, 4, or 5. Use scientific notation: 9.16 × 10⁴ = 3 sig figs' },
            { num: '706.0', sf: 4, note: 'Trailing zero after decimal IS significant' },
            { num: '3.14', sf: 3, note: 'All digits are significant' },
          ].map(({ num, sf, note }) => (
            <div key={num} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="font-mono text-lg text-slate-800 w-24 text-right">{num}</span>
              <span className="text-blue-600 font-bold w-10 text-center">{sf}</span>
              <span className="text-sm text-slate-500">{note}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Key Rule for Calculations</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-800 font-semibold text-lg">
            Never report more significant figures than the smallest number of significant figures used in the calculation.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Example: Circumference of a 0.40-in diameter rod</div>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-slate-600">C = &pi; &times; d = &pi; &times; 0.40 in</div>
            <div className="font-mono text-slate-500">C = 3.14159... &times; 0.40 = 1.2566...</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-slate-500">Limiting factor:</span>
              <span className="font-mono text-blue-600">d = 0.40</span>
              <span className="text-slate-500">&rarr; 2 sig figs</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2 border border-emerald-800 mt-2">
              <span className="text-emerald-700 font-semibold">Correct answer:</span>
              <span className="font-mono text-lg text-emerald-700 font-bold">C = 1.3 in</span>
              <span className="text-emerald-400 text-xs">(2 sig figs)</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 rounded-lg p-2 border border-red-800">
              <span className="text-red-700 font-semibold">Wrong:</span>
              <span className="font-mono text-red-700">C = 1.2566 in</span>
              <span className="text-red-400 text-xs">(implies false precision)</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Significant Figures Practice</h2>
        <p className="text-slate-600">Count significant figures, then round calculations to the correct precision:</p>
        <SigFigsChecker onCorrect={onCorrect} onIncorrect={onIncorrect} />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Check: Sig Figs in Practice</h2>
        <FillInTheBlank
          question="C = π × 0.40 in = ___ in (report with correct significant figures)"
          answer={1.3}
          tolerance={0.01}
          unit=" in"
          explanation="d = 0.40 has 2 significant figures, so the answer must also be reported to 2 sig figs: π × 0.40 = 1.2566... → 1.3 in."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
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
