import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import ToleranceStackViz from '../components/ToleranceStackViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Dimensions &amp; Tolerances: Key Terms</h2>
        <p className="text-slate-300">Every manufactured dimension has variability. Understanding tolerance terminology is essential for communicating designs.</p>
        <div className="space-y-2">
          {[
            { term: 'Nominal Size', def: 'The theoretical or ideal dimension (e.g., "1 inch rod")', formula: '' },
            { term: 'Limits', def: 'The maximum and minimum acceptable values', formula: 'Upper limit, Lower limit' },
            { term: 'Tolerance', def: 'Total permissible variation = Upper limit \u2212 Lower limit', formula: 'T = UL \u2212 LL' },
            { term: 'Bilateral Tolerance', def: 'Equal variation above and below nominal', formula: '1.000 \u00b1 0.005' },
            { term: 'Unilateral Tolerance', def: 'Variation in one direction only', formula: '1.000 +0.010/\u22120.000' },
            { term: 'Clearance Fit', def: 'Shaft always smaller than hole (positive gap)', formula: 'gap > 0 always' },
            { term: 'Interference Fit', def: 'Shaft always larger than hole (press fit)', formula: 'gap < 0 always' },
          ].map(({ term, def, formula }) => (
            <div key={term} className="flex gap-3 bg-[#12122a] rounded-lg p-3 border border-[#2d2d4e]">
              <div className="w-28 shrink-0">
                <div className="font-semibold text-[#f59e0b] text-sm">{term}</div>
                {formula && <div className="font-mono text-xs text-slate-400 mt-0.5">{formula}</div>}
              </div>
              <div className="text-sm text-slate-300">{def}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Tolerance Stack-up</h2>
        <p className="text-slate-300">When multiple toleranced dimensions combine in a chain, their tolerances <strong className="text-slate-100">accumulate</strong>. This is called tolerance stack-up.</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
            <div className="font-semibold text-red-300 mb-2">Chain Dimensioning ⚠️</div>
            <p className="text-sm text-red-200/80">Each dimension is measured from the previous one. Tolerances stack directly — worst-case error = sum of all tolerances.</p>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-800 rounded-xl p-4">
            <div className="font-semibold text-emerald-300 mb-2">Baseline Dimensioning ✓</div>
            <p className="text-sm text-emerald-200/80">All dimensions measured from one datum. Tolerances don't stack — each dimension has independent variation.</p>
          </div>
        </div>

        <div className="bg-[#12122a] rounded-xl p-4">
          <div className="font-semibold text-slate-200 mb-2">Worst-Case Stack-up Formula:</div>
          <div className="font-mono text-lg text-[#f59e0b]">T_total = &sum; T&#x1D62;</div>
          <div className="text-sm text-slate-400 mt-1">Total tolerance = sum of individual tolerances (worst case)</div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Tolerance Chain</h2>
        <p className="text-slate-300">Adjust the nominal dimensions and tolerances to see how they stack up:</p>
        <ToleranceStackViz />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Check</h2>
        <Quiz
          question="Three dimensions are chained: A = 2.000 ± 0.010, B = 1.500 ± 0.008, C = 1.000 ± 0.005. What is the worst-case total tolerance on the overall length?"
          options={[
            '±0.010 (use only the largest)',
            '±0.023 (sum: 0.010 + 0.008 + 0.005)',
            '±0.008 (average of all three)',
            '±0.046 (double the sum)'
          ]}
          correctIndex={1}
          explanation="In worst-case tolerance stack-up (chain dimensioning), all tolerances add: ±(0.010 + 0.008 + 0.005) = ±0.023 inches. This is why engineers prefer baseline dimensioning for critical features."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module6() {
  return (
    <ModuleLayout moduleId="module6" title="Dimensions & Tolerances" icon="📐" steps={steps} />
  )
}
