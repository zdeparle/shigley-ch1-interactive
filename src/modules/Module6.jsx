import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'
import MatchingPairs from '../components/MatchingPairs'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Standards &amp; Codes</h2>
        <p className="text-slate-300">
          <strong className="text-slate-100">A standard</strong> is a set of specifications for parts, materials, or processes intended to achieve uniformity, efficiency, and a specified quality. Standards limit arbitrary variation between manufacturers.
        </p>
        <p className="text-slate-300">
          <strong className="text-slate-100">A code</strong> is a set of specifications for the analysis, design, manufacture, and construction of something — intended to achieve a specified degree of safety, efficiency, and performance or quality.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-[#f59e0b] mb-2">Standard</div>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>Specifications for parts, materials, processes</li>
              <li>Achieves uniformity &amp; efficiency</li>
              <li>Limits arbitrary variation</li>
            </ul>
          </div>
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-[#f59e0b] mb-2">Code</div>
            <ul className="text-sm text-slate-300 space-y-1">
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
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Sort: Standard vs. Code</h2>
        <p className="text-slate-300">Drag each item into the correct category:</p>
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
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Key Engineering Organizations</h2>
        <p className="text-slate-300">Engineers rely on standards and codes published by these organizations:</p>
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
            <div key={abbr} className="bg-[#0e0e1e] rounded-lg p-2 border border-[#252548] text-center group relative">
              <div className="font-bold text-[#f59e0b] text-sm">{abbr}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Match Organizations to Their Focus</h2>
        <p className="text-slate-300">Click an organization on the left, then click its area of focus on the right:</p>
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
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
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
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Codes and Probability</h2>
        <p className="text-slate-300">
          Safety codes do <strong className="text-slate-100">not</strong> imply absolute safety. They address <strong className="text-slate-100">probability</strong>, not certainty.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548]">
          <div className="text-slate-200 italic text-center">
            &ldquo;Designing a building to withstand a 120 mi/h wind does not mean the designers think a 140 mi/h wind is impossible; it simply means they think it is highly improbable.&rdquo;
          </div>
          <div className="text-right text-xs text-slate-500 mt-2">&mdash; Shigley&rsquo;s, &sect;1-6</div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Key insight: Codes are based on risk assessment and probability. A code-compliant design has a very low probability of failure under expected conditions, but no design is immune to every possible extreme event.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Scenario Question</h2>
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
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Check</h2>
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
