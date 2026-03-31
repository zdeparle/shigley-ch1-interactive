import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import MatchingPairs from '../components/MatchingPairs'
import RevealSteps from '../components/RevealSteps'
import ToleranceStackViz from '../components/ToleranceStackViz'
import GapAssemblyViz from '../components/GapAssemblyViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Dimensions &amp; Tolerances: The Designer&rsquo;s Language</h2>
        <p className="text-slate-600 leading-relaxed">
          &ldquo;Part of a machine designer&rsquo;s task is to specify parts precisely enough that
          <strong className="text-slate-800"> any manufacturer can make the part to any inspector&rsquo;s satisfaction</strong>.&rdquo;
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">Engineering Drawings as Legal Documents</div>
          <p className="text-sm text-slate-500">
            An engineering drawing is not just a communication tool &mdash; it is a <strong className="text-slate-600">legal contract</strong> between the designer, manufacturer, and inspector. Every dimension, tolerance, and note has binding meaning.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          If a part is dimensioned ambiguously, any interpretation is technically valid. The responsibility for
          clarity falls on the designer, not the manufacturer.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Key Terminology</h2>
        <p className="text-slate-600 leading-relaxed">
          Precise vocabulary is essential when specifying dimensions and tolerances:
        </p>
        {/* Tolerance Terminology Diagram */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            {/* Shaft shape */}
            <rect x="120" y="55" width="360" height="40" rx="2" fill="#f1f5f9" stroke="#2563eb" strokeWidth="2" />
            <text x="300" y="80" textAnchor="middle" fontSize="12" fill="#2563eb" fontWeight="bold" fontFamily="system-ui">Shaft</text>

            {/* Nominal dimension line */}
            <line x1="120" y1="30" x2="120" y2="16" stroke="#64748b" strokeWidth="1" />
            <line x1="480" y1="30" x2="480" y2="16" stroke="#64748b" strokeWidth="1" />
            <line x1="120" y1="22" x2="480" y2="22" stroke="#64748b" strokeWidth="1.5" markerStart="url(#dimArrowL13)" markerEnd="url(#dimArrowR13)" />
            <text x="300" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" fontFamily="system-ui">Nominal = 1.000 in</text>

            {/* Upper limit line */}
            <line x1="482" y1="55" x2="540" y2="55" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="544" y="59" textAnchor="start" fontSize="10" fontWeight="bold" fill="#10b981" fontFamily="system-ui">Upper Limit = 1.002</text>

            {/* Lower limit line */}
            <line x1="482" y1="95" x2="540" y2="95" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="544" y="99" textAnchor="start" fontSize="10" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Lower Limit = 0.998</text>

            {/* Tolerance bracket on right side */}
            <line x1="530" y1="58" x2="530" y2="92" stroke="#7c3aed" strokeWidth="2" />
            <line x1="526" y1="58" x2="534" y2="58" stroke="#7c3aed" strokeWidth="2" />
            <line x1="526" y1="92" x2="534" y2="92" stroke="#7c3aed" strokeWidth="2" />
            <text x="515" y="80" textAnchor="end" fontSize="11" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui">Tolerance = 0.004</text>

            {/* === Bilateral Example === */}
            <text x="175" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">Bilateral Tolerance</text>
            {/* Part shape */}
            <rect x="80" y="150" width="190" height="28" rx="2" fill="#f1f5f9" stroke="#2563eb" strokeWidth="1.5" />
            {/* Dimension line */}
            <line x1="80" y1="195" x2="80" y2="205" stroke="#64748b" strokeWidth="1" />
            <line x1="270" y1="195" x2="270" y2="205" stroke="#64748b" strokeWidth="1" />
            <line x1="80" y1="200" x2="270" y2="200" stroke="#64748b" strokeWidth="1.5" markerStart="url(#dimArrowL13)" markerEnd="url(#dimArrowR13)" />
            <text x="175" y="218" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">1.000 {'\u00B1'} 0.002</text>
            <text x="175" y="235" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Varies both directions from nominal</text>

            {/* === Unilateral Example === */}
            <text x="430" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#d97706" fontFamily="system-ui">Unilateral Tolerance</text>
            {/* Part shape */}
            <rect x="335" y="150" width="190" height="28" rx="2" fill="#f1f5f9" stroke="#d97706" strokeWidth="1.5" />
            {/* Dimension line */}
            <line x1="335" y1="195" x2="335" y2="205" stroke="#64748b" strokeWidth="1" />
            <line x1="525" y1="195" x2="525" y2="205" stroke="#64748b" strokeWidth="1" />
            <line x1="335" y1="200" x2="525" y2="200" stroke="#64748b" strokeWidth="1.5" markerStart="url(#dimArrowL13)" markerEnd="url(#dimArrowR13)" />
            <text x="430" y="215" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#d97706" fontFamily="system-ui">1.000</text>
            <text x="467" y="210" textAnchor="start" fontSize="10" fontWeight="bold" fill="#10b981" fontFamily="system-ui">+0.004</text>
            <text x="467" y="222" textAnchor="start" fontSize="10" fontWeight="bold" fill="#64748b" fontFamily="system-ui">{'\u2212'}0.000</text>
            <text x="430" y="245" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Varies in one direction only</text>

            {/* Dimension arrow markers */}
            <defs>
              <marker id="dimArrowL13" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#64748b" />
              </marker>
              <marker id="dimArrowR13" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="space-y-2">
          {[
            {
              term: 'Nominal size',
              def: 'The theoretical or ideal dimension, e.g. 1\u00BD-in pipe is actually 1.900 in OD',
              icon: '📏',
              color: 'border-blue-200 bg-blue-50',
            },
            {
              term: 'Limits',
              def: 'The maximum and minimum acceptable values of a dimension',
              icon: '📊',
              color: 'border-violet-200 bg-violet-50',
            },
            {
              term: 'Tolerance',
              def: 'T = UL \u2212 LL, the total permissible variation in a dimension',
              icon: '📐',
              color: 'border-emerald-200 bg-emerald-50',
            },
            {
              term: 'Bilateral tolerance',
              def: '1.005 \u00B1 0.002 \u2014 variation allowed in both directions from nominal',
              icon: '\u2194\uFE0F',
              color: 'border-blue-200 bg-blue-50',
            },
            {
              term: 'Unilateral tolerance',
              def: '1.005 +0.004 / \u22120.000 \u2014 variation in only one direction',
              icon: '\u2192',
              color: 'border-cyan-200 bg-cyan-50',
            },
          ].map(({ term, def, icon, color }) => (
            <div key={term} className={`flex gap-3 rounded-lg p-3 border ${color}`}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{term}</div>
                <div className="text-xs text-slate-500 mt-0.5">{def}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">More Key Terms</h2>
        <p className="text-slate-600 leading-relaxed">
          Understanding fits and assembly relationships:
        </p>
        {/* Clearance vs Interference Fit Diagram */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            {/* === LEFT: Clearance Fit === */}
            <text x="150" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10b981" fontFamily="system-ui">Clearance Fit</text>
            {/* Hole (outer circle) - blue */}
            <circle cx="150" cy="120" r="80" fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="2.5" />
            <text x="150" y="210" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">Hole</text>
            {/* Shaft (inner circle) - red, smaller */}
            <circle cx="150" cy="120" r="52" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="2.5" />
            <text x="150" y="127" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Shaft</text>
            {/* Clearance gap annotation */}
            <line x1="150" y1="68" x2="150" y2="40" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#dimArr13u)" />
            <line x1="170" y1="68" x2="205" y2="50" stroke="#10b981" strokeWidth="1" />
            <text x="208" y="48" textAnchor="start" fontSize="10" fontWeight="bold" fill="#10b981" fontFamily="system-ui">Clearance</text>
            <text x="208" y="60" textAnchor="start" fontSize="9" fill="#64748b" fontFamily="system-ui">(visible gap)</text>
            {/* Radial dimension showing gap */}
            <line x1="150" y1="120" x2="150" y2="40" stroke="#64748b" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="202" y1="120" x2="230" y2="120" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
            <line x1="230" y1="120" x2="230" y2="40" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,2" />

            {/* Divider */}
            <line x1="300" y1="15" x2="300" y2="245" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6,4" />

            {/* === RIGHT: Interference Fit === */}
            <text x="450" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Interference Fit</text>
            {/* Hole (outer circle) - blue */}
            <circle cx="450" cy="120" r="68" fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="2.5" />
            <text x="450" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">Hole</text>
            {/* Shaft (slightly larger than hole) - red with interference hatching */}
            <circle cx="450" cy="120" r="74" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,3" />
            {/* Interference overlap region (hatched between 68 and 74) */}
            <clipPath id="holeClip">
              <circle cx="450" cy="120" r="74" />
            </clipPath>
            <circle cx="450" cy="120" r="74" fill="rgba(239,68,68,0.15)" stroke="none" clipPath="url(#holeClip)" />
            <circle cx="450" cy="120" r="68" fill="rgba(37,99,235,0.08)" stroke="none" />
            {/* Hatching lines in the interference zone */}
            {[-60, -40, -20, 0, 20, 40, 60].map(offset => (
              <line key={offset} x1={450 + offset - 10} y1={48} x2={450 + offset + 10} y2={192} stroke="#ef4444" strokeWidth="0.5" opacity="0.3" clipPath="url(#holeClip)" />
            ))}
            <text x="450" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Shaft</text>
            <text x="450" y="128" textAnchor="middle" fontSize="9" fill="#ef4444" fontFamily="system-ui">(larger than hole)</text>
            {/* Interference annotation */}
            <line x1="518" y1="120" x2="555" y2="90" stroke="#ef4444" strokeWidth="1" />
            <text x="520" y="78" textAnchor="start" fontSize="10" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Interference</text>
            <text x="520" y="90" textAnchor="start" fontSize="9" fill="#64748b" fontFamily="system-ui">press fit required</text>

            {/* Bottom labels */}
            <text x="150" y="240" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Shaft slides in freely</text>
            <text x="450" y="240" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">Force/heat needed to assemble</text>

            <defs>
              <marker id="dimArr13u" markerWidth="7" markerHeight="5" refX="3.5" refY="5" orient="auto">
                <path d="M0,5 L3.5,0 L7,5" fill="#10b981" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="space-y-2">
          {[
            {
              term: 'Clearance',
              def: 'Internal member is smaller than external member \u2014 a positive gap exists between parts',
              icon: '\u2B55',
              color: 'border-emerald-200 bg-emerald-50',
            },
            {
              term: 'Interference',
              def: 'Internal member is larger than external \u2014 press fit required for assembly',
              icon: '\u26D4',
              color: 'border-red-200 bg-red-50',
            },
            {
              term: 'Allowance',
              def: 'The minimum clearance or maximum interference \u2014 the tightest acceptable condition',
              icon: '\u2696\uFE0F',
              color: 'border-blue-200 bg-blue-50',
            },
            {
              term: 'Fit',
              def: 'The amount of clearance or interference between mating parts',
              icon: '\uD83D\uDD27',
              color: 'border-blue-200 bg-blue-50',
            },
            {
              term: 'GD&T',
              def: 'Geometric Dimensioning and Tolerancing \u2014 comprehensive system of symbols for specifying geometry and tolerances on drawings',
              icon: '\u2B1B',
              color: 'border-violet-200 bg-violet-50',
            },
          ].map(({ term, def, icon, color }) => (
            <div key={term} className={`flex gap-3 rounded-lg p-3 border ${color}`}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{term}</div>
                <div className="text-xs text-slate-500 mt-0.5">{def}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Match the Terms</h2>
        <p className="text-slate-600">Click a term on the left, then click its definition on the right:</p>
        <MatchingPairs
          pairs={[
            { left: 'Nominal size', right: 'Theoretical ideal dimension' },
            { left: 'Tolerance', right: 'UL minus LL' },
            { left: 'Bilateral', right: '\u00B1variation from basic' },
            { left: 'Clearance fit', right: 'Shaft smaller than hole' },
            { left: 'Interference fit', right: 'Press fit assembly' },
            { left: 'Allowance', right: 'Min clearance or max interference' },
          ]}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Choosing Tolerances Wisely</h2>
        <p className="text-slate-600 leading-relaxed">
          &ldquo;Tolerances should be selected based on functionality, fit, assembly, manufacturing process,
          quality, and cost. <strong className="text-slate-800">Functionality must not be compromised.</strong>&rdquo;
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Tolerance Selection Factors</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { factor: 'Functionality', desc: 'Does the part work correctly?', priority: 'Critical', color: 'text-red-400' },
              { factor: 'Fit & Assembly', desc: 'Can parts be assembled together?', priority: 'Critical', color: 'text-red-400' },
              { factor: 'Mfg. Process', desc: 'What precision can the process achieve?', priority: 'High', color: 'text-amber-400' },
              { factor: 'Quality', desc: 'How many parts will pass inspection?', priority: 'High', color: 'text-amber-400' },
              { factor: 'Cost', desc: 'Tighter = exponentially more expensive', priority: 'Important', color: 'text-blue-400' },
              { factor: 'Less expensive methods', desc: 'Should be selected when possible', priority: 'Goal', color: 'text-emerald-400' },
            ].map(({ factor, desc, priority, color }) => (
              <div key={factor} className="bg-white rounded-lg p-2.5 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-xs">{factor}</span>
                  <span className={`text-[10px] font-mono ${color}`}>{priority}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-50 border border-red-800 rounded-lg p-3 text-sm text-red-700">
          Tight tolerance = expensive (reference Figure 1&ndash;2). The relationship is exponential &mdash;
          halving the tolerance can more than double the cost.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Don&rsquo;t Over-Specify Dimensions</h2>
        <p className="text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Figure 1&ndash;8:</strong> A part with 5 dimensions specified, but only 3 are needed.
          Over-specifying creates contradictions.
        </p>
        {/* Over-Specification Diagram */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 310" xmlns="http://www.w3.org/2000/svg">
            {/* === TOP: Correct - 3 dimensions === */}
            <text x="300" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981" fontFamily="system-ui">{'\u2713'} Correct: 3 independent dimensions</text>
            {/* Stepped part shape */}
            <rect x="80" y="35" width="180" height="50" rx="1" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            <rect x="260" y="50" width="200" height="35" rx="1" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            {/* Dimension a */}
            <line x1="80" y1="100" x2="80" y2="112" stroke="#2563eb" strokeWidth="1" />
            <line x1="260" y1="100" x2="260" y2="112" stroke="#2563eb" strokeWidth="1" />
            <line x1="80" y1="108" x2="260" y2="108" stroke="#2563eb" strokeWidth="1.5" markerStart="url(#dimL13os)" markerEnd="url(#dimR13os)" />
            <text x="170" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">a</text>
            {/* Dimension b */}
            <line x1="260" y1="100" x2="260" y2="132" stroke="#7c3aed" strokeWidth="1" />
            <line x1="460" y1="100" x2="460" y2="132" stroke="#7c3aed" strokeWidth="1" />
            <line x1="260" y1="128" x2="460" y2="128" stroke="#7c3aed" strokeWidth="1.5" markerStart="url(#dimL13osV)" markerEnd="url(#dimR13osV)" />
            <text x="360" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui">b</text>
            {/* Dimension c (overall) */}
            <line x1="80" y1="28" x2="80" y2="16" stroke="#10b981" strokeWidth="1" />
            <line x1="460" y1="28" x2="460" y2="16" stroke="#10b981" strokeWidth="1" />
            <line x1="80" y1="20" x2="460" y2="20" stroke="#10b981" strokeWidth="1.5" markerStart="url(#dimL13osG)" markerEnd="url(#dimR13osG)" />
            <text x="270" y="14" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981" fontFamily="system-ui">c = a + b</text>

            {/* Divider */}
            <line x1="40" y1="155" x2="560" y2="155" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="6,4" />

            {/* === BOTTOM: Over-specified - 4th dimension added === */}
            <text x="300" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">{'\u2717'} Over-specified: redundant 4th dimension</text>
            {/* Stepped part shape */}
            <rect x="80" y="190" width="180" height="50" rx="1" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            <rect x="260" y="205" width="200" height="35" rx="1" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
            {/* Dimension a */}
            <line x1="80" y1="255" x2="80" y2="267" stroke="#2563eb" strokeWidth="1" />
            <line x1="260" y1="255" x2="260" y2="267" stroke="#2563eb" strokeWidth="1" />
            <line x1="80" y1="263" x2="260" y2="263" stroke="#2563eb" strokeWidth="1.5" markerStart="url(#dimL13os)" markerEnd="url(#dimR13os)" />
            <text x="170" y="277" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">a</text>
            {/* Dimension b */}
            <line x1="260" y1="255" x2="260" y2="287" stroke="#7c3aed" strokeWidth="1" />
            <line x1="460" y1="255" x2="460" y2="287" stroke="#7c3aed" strokeWidth="1" />
            <line x1="260" y1="283" x2="460" y2="283" stroke="#7c3aed" strokeWidth="1.5" markerStart="url(#dimL13osV)" markerEnd="url(#dimR13osV)" />
            <text x="360" y="297" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui">b</text>
            {/* Dimension c (overall) */}
            <line x1="80" y1="183" x2="80" y2="171" stroke="#10b981" strokeWidth="1" />
            <line x1="460" y1="183" x2="460" y2="171" stroke="#10b981" strokeWidth="1" />
            <line x1="80" y1="175" x2="460" y2="175" stroke="#10b981" strokeWidth="1.5" markerStart="url(#dimL13osG)" markerEnd="url(#dimR13osG)" />
            <text x="270" y="169" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981" fontFamily="system-ui">c</text>
            {/* Redundant dimension d - highlighted in red */}
            <line x1="80" y1="242" x2="80" y2="248" stroke="#ef4444" strokeWidth="2" />
            <line x1="460" y1="242" x2="460" y2="248" stroke="#ef4444" strokeWidth="2" />
            <line x1="80" y1="245" x2="460" y2="245" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,3" markerStart="url(#dimL13osR)" markerEnd="url(#dimR13osR)" />
            <text x="270" y="241" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">d ??</text>
            {/* Red X over the redundant dimension */}
            <circle cx="510" cy="245" r="14" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2" />
            <text x="510" y="250" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">{'\u2717'}</text>

            {/* Explanation text */}
            <text x="300" y="310" textAnchor="middle" fontSize="11" fill="#ef4444" fontFamily="system-ui">If a + b = c is already defined, adding d creates a contradiction</text>

            <defs>
              <marker id="dimL13os" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#2563eb" />
              </marker>
              <marker id="dimR13os" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#2563eb" />
              </marker>
              <marker id="dimL13osV" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#7c3aed" />
              </marker>
              <marker id="dimR13osV" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#7c3aed" />
              </marker>
              <marker id="dimL13osG" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#10b981" />
              </marker>
              <marker id="dimR13osG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#10b981" />
              </marker>
              <marker id="dimL13osR" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#ef4444" />
              </marker>
              <marker id="dimR13osR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">The Over-Specification Problem</div>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-800 rounded-lg p-3">
              <div className="font-semibold text-red-700 text-sm mb-1">5 dimensions with &plusmn;1 tolerance each</div>
              <p className="text-xs text-red-700">
                If all 5 are specified with tolerances, some dimensions become contradictory.
                The total of sub-dimensions must equal the overall dimension, but tolerances on each
                make it impossible to satisfy all constraints simultaneously.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-800 rounded-lg p-3">
              <div className="font-semibold text-emerald-700 text-sm mb-1">Solution: specify only 3 dimensions</div>
              <p className="text-xs text-emerald-700">
                The designer should determine which three dimensions are most important for function,
                specify those, and let the remaining dimensions be derived.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Rule: Never dimension a part so that a single feature is controlled by more than one tolerance path.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Choosing the Right Dimensions</h2>
        <p className="text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Figure 1&ndash;9:</strong> Four different dimension choices for the same part.
          None are incorrect, but they are <strong className="text-slate-800">not equivalent for function</strong>.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Example: Part with Two Holes</div>
          <p className="text-sm text-slate-500 mb-3">
            If the holes must mate with pins on another part, the <strong className="text-slate-600">distance between holes</strong> is
            the critical dimension.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="font-semibold text-emerald-700 text-sm mb-1">Good: (a) or (b)</div>
              <p className="text-xs text-emerald-700">
                Hole-to-hole distance is directly dimensioned. Tolerance on this critical feature is controlled.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="font-semibold text-red-700 text-sm mb-1">Risky: (c)</div>
              <p className="text-xs text-red-700">
                Holes dimensioned from edges. Hole spacing becomes a derived dimension with accumulated tolerance.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Always dimension the features that matter most for function directly. Let less-critical dimensions absorb the tolerance variation.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Tolerance Stack-Up</h2>
        <p className="text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Chain dimensioning:</strong> tolerances add up along the chain.
          <strong className="text-slate-800"> Baseline dimensioning:</strong> dimensions from a common datum avoid stack-up.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">Figure 1&ndash;9a vs 1&ndash;9d</div>
          <div className="space-y-2 text-sm text-slate-500">
            <div>
              <strong className="text-slate-700">Chain (Figure 1&ndash;9a):</strong> Three &plusmn;1 dimensions in series &rarr; total length has effective
              <span className="font-mono text-red-400"> &plusmn;3</span> tolerance.
            </div>
            <div>
              <strong className="text-slate-700">Baseline (Figure 1&ndash;9d):</strong> Each dimension measured from same datum &rarr; each feature has only
              <span className="font-mono text-emerald-400"> &plusmn;1</span> tolerance from the reference.
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Stack-up is a critical concern in assemblies with many parts. The more dimensions in the chain, the larger the accumulated tolerance.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Chain vs. Baseline Dimensioning</h2>
        <p className="text-slate-600">Compare the two approaches and explore tolerance stack-up:</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="font-semibold text-red-700 mb-2">Chain Dimensioning</div>
            <div className="text-sm text-red-700 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>Tolerances accumulate along the chain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>End-to-end tolerance = sum of all individual tolerances</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>Worst case grows with number of dimensions</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="font-semibold text-emerald-700 mb-2">Baseline Dimensioning</div>
            <div className="text-sm text-emerald-700 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>Each dimension from a common datum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>No tolerance accumulation between features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>Each feature has independent tolerance</span>
              </div>
            </div>
          </div>
        </div>
        <ToleranceStackViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;7: Gap Analysis</h2>
        <p className="text-slate-600 leading-relaxed">
          A shouldered screw passes through 3 cylindrical sleeves. The gap w between the last sleeve and
          the nut must be at least 0.003 in for the assembly to function.
        </p>
        <div className="space-y-2">
          {[
            { part: 'Screw shank (a)', value: '1.750 \u00B1 0.003 in' },
            { part: 'Sleeve b', value: '0.750 \u00B1 0.001 in' },
            { part: 'Sleeve c', value: '0.120 \u00B1 0.005 in' },
            { part: 'Sleeve d', value: '0.875 \u00B1 0.001 in' },
          ].map(({ part, value }) => (
            <div key={part} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="font-semibold text-blue-600 text-sm">{part}</span>
              <span className="font-mono text-slate-700 text-sm">{value}</span>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="font-mono text-sm text-slate-600 text-center">
            Gap: <span className="text-blue-600">w = a &minus; b &minus; c &minus; d</span>
          </div>
          <div className="text-xs text-slate-500 text-center mt-1">
            Requirement: w<sub>min</sub> &ge; 0.003 in
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Gap Assembly Visualization</h2>
        <p className="text-slate-600">
          Explore the shouldered screw assembly. Adjust dimensions and tolerances to see how the gap changes:
        </p>
        <GapAssemblyViz />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;7: Step-by-Step Solution</h2>
        <p className="text-slate-600">Work through the gap analysis:</p>
        <RevealSteps
          steps={[
            {
              label: 'Mean gap',
              math: 'w\u0304 = a \u2212 b \u2212 c \u2212 d = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875',
              result: '= 0.005 in',
            },
            {
              label: 'Total tolerance',
              math: 'tw = 0.003 + 0.001 + 0.005 + 0.001',
              result: '= \u00B10.010 in',
            },
            {
              label: 'Gap range',
              math: 'wmax = 0.005 + 0.010 = 0.015 in',
              content: 'wmin = 0.005 \u2212 0.010 = \u22120.005 in',
            },
            {
              label: 'Problem!',
              content: 'Both clearance and interference are possible! wmin < 0.003 in requirement',
              highlight: true,
            },
            {
              label: 'Fix: adjust d',
              math: 'w\u0304_new = 0.003 + 0.010 = 0.013 \u2192 d = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.013',
              result: 'd = 0.867 in',
              highlight: true,
            },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate the Mean Gap</h2>
        <FillInTheBlank
          question="w\u0304 = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875 = ___"
          answer={0.005}
          unit=" in"
          tolerance={0.001}
          explanation="The mean gap is the screw shank length minus the sum of all sleeve lengths: w\u0304 = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875 = 0.005 in. This is a very small nominal gap."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate the Total Tolerance</h2>
        <FillInTheBlank
          question="Total tolerance tw = 0.003 + 0.001 + 0.005 + 0.001 = ___"
          answer={0.010}
          unit=" in"
          tolerance={0.001}
          explanation="The total tolerance is the sum of all individual tolerances in the chain: tw = 0.003 + 0.001 + 0.005 + 0.001 = 0.010 in. Since tw (0.010) > w\u0304 (0.005), the gap can go negative \u2014 meaning interference is possible. This is why the design must be adjusted."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module13() {
  return (
    <ModuleLayout moduleId="module13" title="Dimensions & Tolerances" icon="📐" steps={steps} />
  )
}
