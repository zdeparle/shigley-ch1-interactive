import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DesignFactorCalc from '../components/DesignFactorCalc'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design Factor vs. Factor of Safety</h2>
        <p className="text-slate-300">Shigley's §1-3 introduces two related but distinct concepts:</p>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#12122a] border border-[#f59e0b] rounded-xl p-4">
            <div className="text-sm text-amber-400 font-semibold mb-1">Design Factor n&#x2090; (chosen before sizing)</div>
            <div className="font-mono text-2xl text-slate-100 mb-2">n&#x2090; = S / &sigma;</div>
            <p className="text-sm text-slate-400">
              A <em>target</em> ratio we choose based on uncertainty. Used to size the part — we solve for the geometry that achieves this ratio.
            </p>
          </div>
          <div className="bg-[#12122a] border border-[#2d2d4e] rounded-xl p-4">
            <div className="text-sm text-slate-400 font-semibold mb-1">Factor of Safety n (after rounding to standard sizes)</div>
            <div className="font-mono text-2xl text-slate-100 mb-2">n = S / &sigma;_actual</div>
            <p className="text-sm text-slate-400">
              The <em>actual</em> ratio after we round up to a standard size. Always n &ge; n&#x2090; since we round up (more material = less stress).
            </p>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          💡 <strong>Key insight:</strong> Standard sizes (bolt diameters, bar stock) come in discrete increments. Rounding UP gives a slightly conservative (larger) actual factor of safety.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Worked Example: Sizing a Tension Rod</h2>
        <p className="text-slate-300">A rod carries F = 2,000 lb in tension. Material: Sy = 54,000 psi. Design factor n&#x2090; = 2.0. Find the required diameter.</p>
        <div className="space-y-3">
          {[
            { n: 1, text: 'Required area:', eq: 'A \u2265 n\u2090\u00b7F/S = 2.0 \u00d7 2000 / 54000', result: '= 0.07407 in\u00b2' },
            { n: 2, text: 'Required diameter:', eq: 'd = \u221a(4A/\u03c0) = \u221a(4 \u00d7 0.07407/\u03c0)', result: '= 0.3072 in' },
            { n: 3, text: 'Round UP to standard:', eq: 'Next preferred size (Table A-17)', result: 'd = 5/16" = 0.3125 in', highlight: true },
            { n: 4, text: 'Actual stress:', eq: '\u03c3 = F/A = 2000 / (\u03c0\u00d70.3125\u00b2/4)', result: '= 26,085 psi' },
            { n: 5, text: 'Actual factor of safety:', eq: 'n = S/\u03c3 = 54,000 / 26,085', result: 'n = 2.07 \u2265 n\u2090 = 2.0 \u2713', highlight: true },
          ].map(({ n, text, eq, result, highlight }) => (
            <div key={n} className={`flex gap-3 rounded-lg p-3 border ${highlight ? 'border-amber-600 bg-amber-900/20' : 'border-[#2d2d4e] bg-[#12122a]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${highlight ? 'bg-[#f59e0b] text-black' : 'bg-[#2d2d4e] text-slate-400'}`}>{n}</div>
              <div>
                <span className="text-slate-300 text-sm">{text} </span>
                <span className="font-mono text-xs text-slate-400">{eq} </span>
                <span className={`font-mono font-bold text-sm ${highlight ? 'text-[#f59e0b]' : 'text-slate-200'}`}>{result}</span>
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive Calculator</h2>
        <p className="text-slate-300">Adjust the inputs and see each step computed live:</p>
        <DesignFactorCalc />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="A designer uses n\u2090 = 3.0 to size a rod, then rounds up to the next standard diameter. The actual factor of safety n will be:"
          options={[
            "Exactly 3.0, because that's what was designed for",
            'Less than 3.0, because standard sizes introduce error',
            'Greater than or equal to 3.0, because rounding up gives more material',
            'Undefined until the rod is physically tested'
          ]}
          correctIndex={2}
          explanation="Rounding UP to a larger standard size gives MORE cross-sectional area, which means LESS actual stress, which means a HIGHER actual factor of safety than the design factor. n \u2265 n\u2090 always when rounding up."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module3() {
  return (
    <ModuleLayout moduleId="module3" title="Design Factor & Factor of Safety" icon="🛡️" steps={steps} />
  )
}
