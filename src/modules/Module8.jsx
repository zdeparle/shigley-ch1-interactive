import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Strict Liability</h2>
        <p className="text-slate-300">
          &ldquo;The manufacturer of an article is liable for any damage or harm that results because of a defect.&rdquo;
        </p>
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 space-y-3">
          <div className="font-semibold text-red-300">Under strict liability:</div>
          <ul className="text-sm text-red-200/80 space-y-2">
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">1.</span>
              It does not matter whether the manufacturer <strong className="text-red-200">knew</strong> about the defect
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">2.</span>
              It does not matter whether the manufacturer <strong className="text-red-200">could have known</strong> about the defect
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">3.</span>
              The plaintiff must only prove that a <strong className="text-red-200">defect existed</strong> and that it <strong className="text-red-200">caused harm</strong>
            </li>
          </ul>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="text-center">
            <div className="text-lg font-mono text-[#f59e0b]">Negligence need NOT be proved</div>
            <div className="text-sm text-slate-400 mt-1">This is the critical distinction from ordinary negligence law</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The 10-Year Example</h2>
        <p className="text-slate-300">
          Consider an article manufactured <strong className="text-slate-100">10 years ago</strong>. At the time of manufacture, it was not considered defective given all available knowledge and testing methods.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548] space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏭</div>
            <div>
              <div className="text-sm text-slate-400">10 years ago</div>
              <div className="text-slate-200">Product manufactured with best available knowledge</div>
              <div className="text-xs text-slate-500">No known defect at time of manufacture</div>
            </div>
          </div>
          <div className="border-l-2 border-[#252548] ml-5 h-6" />
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <div className="text-sm text-slate-400">Today</div>
              <div className="text-slate-200">Defect discovered, causes harm</div>
              <div className="text-xs text-slate-500">New knowledge reveals a design flaw</div>
            </div>
          </div>
        </div>
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
          <div className="font-semibold text-red-300 mb-1">Result under strict liability:</div>
          <p className="text-sm text-red-200/80">
            The manufacturer is <strong className="text-red-200">STILL LIABLE</strong> even though the defect was unknowable at the time of manufacture. This is a powerful legal concept that every engineer must understand.
          </p>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="Under strict liability, must the plaintiff prove the manufacturer was negligent?"
          options={[
            'Yes, negligence must be proven',
            'No — only that a defect existed and caused harm',
            'Yes, but only for products over 5 years old',
            'Only for consumer products'
          ]}
          correctIndex={1}
          explanation="Under strict liability, the plaintiff need only prove that (1) a defect existed in the product and (2) the defect caused the harm. Negligence — whether the manufacturer knew or should have known — does not need to be established."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Preventing Product Liability</h2>
        <p className="text-slate-300">
          The best prevention comes from <strong className="text-slate-100">good engineering in analysis and design, quality control, and comprehensive testing procedures.</strong>
        </p>
        <div className="space-y-2">
          {[
            { action: 'Rigorous analysis & design', desc: 'Use proven methods (like those in this textbook!) with appropriate safety factors', icon: '🔬' },
            { action: 'Quality control', desc: 'Inspect materials, processes, and finished products systematically', icon: '✅' },
            { action: 'Comprehensive testing', desc: 'Test prototypes and production samples under realistic and extreme conditions', icon: '🧪' },
            { action: 'Review advertising & warranties', desc: 'Eliminate excessive promises that create unrealistic expectations', icon: '📝' },
            { action: 'Warnings & instructions', desc: 'Include adequate warnings and clear operating instructions with the product', icon: '⚠️' },
          ].map(({ action, desc, icon }) => (
            <div key={action} className="flex gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <div className="text-2xl shrink-0">{icon}</div>
              <div>
                <div className="font-semibold text-[#f59e0b] text-sm">{action}</div>
                <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Sort: Liability Prevention</h2>
        <p className="text-slate-300">Drag each scenario into the correct category:</p>
        <CategorySort
          items={[
            'Thorough stress analysis',
            'Skipping prototype testing',
            'Clear warning labels',
            'Exaggerated advertising claims',
            'Quality control inspections',
            'Ignoring known failure modes'
          ]}
          categories={['Helps Prevent Liability', 'Increases Liability Risk']}
          correctMapping={{
            'Thorough stress analysis': 'Helps Prevent Liability',
            'Skipping prototype testing': 'Increases Liability Risk',
            'Clear warning labels': 'Helps Prevent Liability',
            'Exaggerated advertising claims': 'Increases Liability Risk',
            'Quality control inspections': 'Helps Prevent Liability',
            'Ignoring known failure modes': 'Increases Liability Risk'
          }}
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
          question="What is the BEST protection against product liability?"
          options={[
            'Comprehensive insurance coverage',
            'Good engineering analysis, quality control, and testing',
            'Limiting product distribution',
            'Including legal disclaimers'
          ]}
          correctIndex={1}
          explanation="While insurance and disclaimers have their place, the best protection is preventing defects in the first place through good engineering analysis and design, rigorous quality control, and comprehensive testing procedures."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module8() {
  return (
    <ModuleLayout moduleId="module8" title="Safety & Product Liability" icon="⚠️" steps={steps} />
  )
}
