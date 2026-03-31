import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'
import MatchingPairs from '../components/MatchingPairs'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Standards &amp; Codes</h2>

        {/* Comparison diagram: Standard vs Code */}
        <svg className="w-full" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="460" height="320" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Left column: STANDARD */}
          <rect x="20" y="16" width="190" height="160" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="115" y="42" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="16" fontWeight="700">STANDARD</text>

          {/* Ruler/spec icon */}
          <rect x="90" y="56" width="50" height="6" rx="2" fill="#2563eb" opacity="0.3" />
          <rect x="90" y="56" width="30" height="6" rx="2" fill="#2563eb" />
          <rect x="90" y="66" width="50" height="6" rx="2" fill="#2563eb" opacity="0.3" />
          <rect x="90" y="66" width="42" height="6" rx="2" fill="#2563eb" />
          <rect x="90" y="76" width="50" height="6" rx="2" fill="#2563eb" opacity="0.3" />
          <rect x="90" y="76" width="22" height="6" rx="2" fill="#2563eb" />
          <line x1="87" y1="54" x2="87" y2="84" stroke="#2563eb" strokeWidth="2" />

          <text x="115" y="104" textAnchor="middle" dominantBaseline="central" fill="#1e40af" fontSize="11" fontWeight="600">Uniformity &amp; Efficiency</text>

          <line x1="50" y1="118" x2="180" y2="118" stroke="#bfdbfe" strokeWidth="1" />

          <text x="115" y="136" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">ASTM material specs</text>
          <text x="115" y="152" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">ISO thread dimensions</text>
          <text x="115" y="168" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">Steel grade designations</text>

          {/* Right column: CODE */}
          <rect x="250" y="16" width="190" height="160" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="345" y="42" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="16" fontWeight="700">CODE</text>

          {/* Shield icon */}
          <path d="M335,56 L335,78 Q335,88 345,92 Q355,88 355,78 L355,56 Z" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
          <text x="345" y="74" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="14" fontWeight="700">!</text>

          <text x="345" y="104" textAnchor="middle" dominantBaseline="central" fill="#991b1b" fontSize="11" fontWeight="600">Safety &amp; Performance</text>

          <line x1="280" y1="118" x2="410" y2="118" stroke="#fecaca" strokeWidth="1" />

          <text x="345" y="136" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">ASME pressure vessel code</text>
          <text x="345" y="152" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">NEC electrical code</text>
          <text x="345" y="168" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">Building seismic codes</text>

          {/* Center divider */}
          <line x1="230" y1="30" x2="230" y2="170" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="230" y="196" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10" fontWeight="500">vs</text>

          {/* Bottom banner */}
          <rect x="40" y="220" width="380" height="44" rx="10" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="230" y="238" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="12" fontWeight="600">Both ensure quality — different purposes</text>
          <text x="230" y="254" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="10">Standards limit variation; Codes enforce safety requirements</text>

          {/* Connecting arrows from columns to banner */}
          <line x1="115" y1="176" x2="140" y2="220" stroke="#2563eb" strokeWidth="1" opacity="0.4" />
          <line x1="345" y1="176" x2="320" y2="220" stroke="#ef4444" strokeWidth="1" opacity="0.4" />

          {/* Bottom corner label */}
          <rect x="320" y="280" width="126" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="383" y="293" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="500">Shigley&apos;s &sect;1-6</text>
        </svg>

        <p className="text-slate-600">
          <strong className="text-slate-800">A standard</strong> is a set of specifications for parts, materials, or processes intended to achieve uniformity, efficiency, and a specified quality. Standards limit arbitrary variation between manufacturers.
        </p>
        <p className="text-slate-600">
          <strong className="text-slate-800">A code</strong> is a set of specifications for the analysis, design, manufacture, and construction of something — intended to achieve a specified degree of safety, efficiency, and performance or quality.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-600 mb-2">Standard</div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Specifications for parts, materials, processes</li>
              <li>Achieves uniformity &amp; efficiency</li>
              <li>Limits arbitrary variation</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-600 mb-2">Code</div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Specifications for analysis, design, manufacture</li>
              <li>Achieves safety &amp; performance</li>
              <li>Often legally enforceable</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Sort: Standard vs. Code</h2>
        <p className="text-slate-600">Drag each item into the correct category:</p>
        <CategorySort
          items={[
            'ASTM material specifications',
            'ASME Boiler & Pressure Vessel',
            'ISO thread dimensions',
            'Building seismic requirements',
            'Steel grade designations',
            'Elevator safety rules'
          ]}
          categories={['Standard', 'Code']}
          correctMapping={{
            'ASTM material specifications': 'Standard',
            'ASME Boiler & Pressure Vessel': 'Code',
            'ISO thread dimensions': 'Standard',
            'Building seismic requirements': 'Code',
            'Steel grade designations': 'Standard',
            'Elevator safety rules': 'Code'
          }}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Key Engineering Organizations</h2>
        <p className="text-slate-600">Engineers rely on standards and codes published by these organizations:</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {[
            { abbr: 'AA', name: 'Aluminum Association' },
            { abbr: 'ABMA', name: 'American Bearing Manufacturers Assoc.' },
            { abbr: 'AGMA', name: 'American Gear Manufacturers Assoc.' },
            { abbr: 'AISC', name: 'American Inst. of Steel Construction' },
            { abbr: 'AISI', name: 'American Iron and Steel Inst.' },
            { abbr: 'ANSI', name: 'American National Standards Inst.' },
            { abbr: 'ASHRAE', name: 'American Soc. of Heating, Refrigerating & AC Eng.' },
            { abbr: 'ASME', name: 'American Soc. of Mechanical Engineers' },
            { abbr: 'ASTM', name: 'American Soc. for Testing & Materials' },
            { abbr: 'AWS', name: 'American Welding Society' },
            { abbr: 'ASM Intl', name: 'ASM International (Materials)' },
            { abbr: 'BSI', name: 'British Standards Institution' },
            { abbr: 'IFI', name: 'Industrial Fasteners Institute' },
            { abbr: 'IMechE', name: 'Inst. of Mechanical Engineers (UK)' },
            { abbr: 'ISO', name: 'Intl Organization for Standardization' },
            { abbr: 'NIST', name: 'Natl Inst. of Standards & Technology' },
            { abbr: 'SAE', name: 'SAE International (Automotive)' },
          ].map(({ abbr, name }) => (
            <div key={abbr} className="bg-slate-50 rounded-lg p-2 border border-slate-200 text-center group relative">
              <div className="font-bold text-blue-600 text-sm">{abbr}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Match Organizations to Their Focus</h2>
        <p className="text-slate-600">Click an organization on the left, then click its area of focus on the right:</p>
        <MatchingPairs
          pairs={[
            { left: 'AGMA', right: 'Gears' },
            { left: 'AWS', right: 'Welding' },
            { left: 'ASTM', right: 'Materials & Testing' },
            { left: 'ASME', right: 'Mechanical Engineering' },
            { left: 'ISO', right: 'International Standards' },
            { left: 'SAE', right: 'Automotive Engineering' },
          ]}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
        <Quiz
          question="What is the PRIMARY purpose of a safety code?"
          options={[
            'To increase manufacturing cost',
            'To achieve a specified degree of safety and performance',
            'To standardize part sizes',
            'To limit engineering creativity'
          ]}
          correctIndex={1}
          explanation="A code is a set of specifications for the analysis, design, manufacture, and construction of something, intended to achieve a specified degree of safety, efficiency, and performance or quality."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Codes and Probability</h2>

        {/* Bell curve / probability distribution diagram */}
        <svg className="w-full" viewBox="0 0 460 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="460" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          <defs>
            {/* Gradient for the main area under curve */}
            <linearGradient id="curveGrad" x1="60" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.15" />
              <stop offset="78%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="90%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </linearGradient>
            <clipPath id="bellClip">
              <path d="M60,230 Q80,228 100,222 Q130,210 150,190 Q175,158 200,120 Q215,95 230,78 Q245,68 260,65 Q275,68 290,78 Q310,95 325,130 Q340,160 355,190 Q370,212 385,222 Q395,228 405,230 L405,230 L60,230 Z" />
            </clipPath>
          </defs>

          {/* Title */}
          <text x="230" y="30" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Probability Distribution of Wind Speed</text>

          {/* Filled area under curve */}
          <rect x="60" y="40" width="345" height="192" fill="url(#curveGrad)" clipPath="url(#bellClip)" />

          {/* Red danger zone - area past 140 mph */}
          <rect x="350" y="40" width="55" height="192" fill="#ef4444" opacity="0.12" clipPath="url(#bellClip)" />

          {/* Bell curve line */}
          <path d="M60,230 Q80,228 100,222 Q130,210 150,190 Q175,158 200,120 Q215,95 230,78 Q245,68 260,65 Q275,68 290,78 Q310,95 325,130 Q340,160 355,190 Q370,212 385,222 Q395,228 405,230" stroke="#2563eb" strokeWidth="2.5" fill="none" />

          {/* Design basis line at 120 mph */}
          <line x1="325" y1="48" x2="325" y2="230" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 3" />
          <rect x="285" y="48" width="80" height="20" rx="4" fill="#2563eb" />
          <text x="325" y="58" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="600">Design Basis</text>
          <text x="325" y="74" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="10" fontWeight="600">120 mph</text>

          {/* Red zone marker at 140 mph */}
          <line x1="370" y1="100" x2="370" y2="230" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="370" y="92" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="9" fontWeight="600">140 mph</text>

          {/* Red zone label */}
          <rect x="355" y="132" width="90" height="36" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
          <text x="400" y="146" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="8" fontWeight="600">Low probability</text>
          <text x="400" y="158" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="8" fontWeight="600">but possible</text>

          {/* Safe zone label */}
          <rect x="160" y="140" width="105" height="36" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
          <text x="212" y="154" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="8" fontWeight="600">Most likely range</text>
          <text x="212" y="166" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="8" fontWeight="500">Code covers this</text>

          {/* X-axis */}
          <line x1="50" y1="230" x2="420" y2="230" stroke="#334155" strokeWidth="1.5" />
          <text x="230" y="254" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="11" fontWeight="600">Wind Speed (mph)</text>

          {/* X-axis tick marks */}
          <line x1="110" y1="230" x2="110" y2="236" stroke="#334155" strokeWidth="1" />
          <text x="110" y="246" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9">60</text>

          <line x1="175" y1="230" x2="175" y2="236" stroke="#334155" strokeWidth="1" />
          <text x="175" y="246" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9">80</text>

          <line x1="240" y1="230" x2="240" y2="236" stroke="#334155" strokeWidth="1" />
          <text x="240" y="246" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9">100</text>

          <line x1="325" y1="230" x2="325" y2="236" stroke="#334155" strokeWidth="1" />
          <text x="325" y="246" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="9" fontWeight="600">120</text>

          <line x1="370" y1="230" x2="370" y2="236" stroke="#334155" strokeWidth="1" />
          <text x="370" y="246" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="9" fontWeight="600">140</text>

          {/* Y-axis label */}
          <text x="36" y="140" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="500" transform="rotate(-90, 36, 140)">Probability</text>

          {/* Bottom insight */}
          <rect x="60" y="264" width="340" height="24" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="230" y="276" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="500">Codes address probable conditions, not absolutes</text>
        </svg>

        <p className="text-slate-600">
          Safety codes do <strong className="text-slate-800">not</strong> imply absolute safety. They address <strong className="text-slate-800">probability</strong>, not certainty.
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="text-slate-700 italic text-center">
            &ldquo;Designing a building to withstand a 120 mi/h wind does not mean the designers think a 140 mi/h wind is impossible; it simply means they think it is highly improbable.&rdquo;
          </div>
          <div className="text-right text-xs text-slate-500 mt-2">&mdash; Shigley&rsquo;s, &sect;1-6</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Key insight: Codes are based on risk assessment and probability. A code-compliant design has a very low probability of failure under expected conditions, but no design is immune to every possible extreme event.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Scenario Question</h2>
        <Quiz
          question='A building designed for 120 mph wind is hit by 140 mph wind. Does this mean the code was violated?'
          options={[
            'Yes, the building should survive any wind',
            'No — codes address probability, not absolutes',
            'Yes, the engineers were negligent',
            'No, but only because wind speed is unpredictable'
          ]}
          correctIndex={1}
          explanation="Codes are based on probability and acceptable risk levels. A 120 mph design wind speed means the designers judged higher speeds to be highly improbable — not impossible. The code was followed correctly; extreme events beyond the design basis can still occur."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Check</h2>
        <Quiz
          question="Which correctly describes the difference between standards and codes?"
          options={[
            'Standards ensure safety; codes ensure uniformity',
            'Standards ensure uniformity; codes ensure safety',
            'Both ensure safety only',
            'Both ensure uniformity only'
          ]}
          correctIndex={1}
          explanation="Standards are specifications for parts, materials, and processes to achieve uniformity and efficiency. Codes are specifications for analysis, design, and construction to achieve safety and performance. They are complementary but serve different primary purposes."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module6() {
  return (
    <ModuleLayout moduleId="module6" title="Standards & Codes" icon="📋" steps={steps} />
  )
}
