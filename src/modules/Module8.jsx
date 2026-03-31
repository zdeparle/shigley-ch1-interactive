import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Strict Liability</h2>

        {/* Decision flow diagram: strict liability logic */}
        <svg className="w-full" viewBox="0 0 460 310" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="460" height="310" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Question 1: Product has defect? */}
          <rect x="130" y="16" width="200" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="230" y="38" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="12" fontWeight="700">Product has defect?</text>

          {/* YES arrow down to Q2 */}
          <line x1="230" y1="60" x2="230" y2="88" stroke="#10b981" strokeWidth="2" />
          <polygon points="224,84 236,84 230,92" fill="#10b981" />
          <rect x="238" y="66" width="36" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          <text x="256" y="75" textAnchor="middle" dominantBaseline="central" fill="#10b981" fontSize="10" fontWeight="700">YES</text>

          {/* Question 2: Defect caused harm? */}
          <rect x="130" y="92" width="200" height="44" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <text x="230" y="114" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="12" fontWeight="700">Defect caused harm?</text>

          {/* YES arrow down to LIABLE */}
          <line x1="230" y1="136" x2="230" y2="164" stroke="#10b981" strokeWidth="2" />
          <polygon points="224,160 236,160 230,168" fill="#10b981" />
          <rect x="238" y="142" width="36" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          <text x="256" y="151" textAnchor="middle" dominantBaseline="central" fill="#10b981" fontSize="10" fontWeight="700">YES</text>

          {/* Manufacturer LIABLE box */}
          <rect x="130" y="168" width="200" height="50" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
          <text x="230" y="186" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="14" fontWeight="800">Manufacturer LIABLE</text>
          <text x="230" y="204" textAnchor="middle" dominantBaseline="central" fill="#991b1b" fontSize="9" fontWeight="500">(regardless of fault or knowledge)</text>

          {/* Side branch: Must plaintiff prove negligence? */}
          <rect x="16" y="132" width="94" height="60" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
          <text x="63" y="150" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="600">Must plaintiff</text>
          <text x="63" y="162" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="600">prove</text>
          <text x="63" y="174" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="600">negligence?</text>

          {/* Arrow from side question to NO answer */}
          <line x1="63" y1="192" x2="63" y2="218" stroke="#ef4444" strokeWidth="1.5" />
          <polygon points="57,214 69,214 63,222" fill="#ef4444" />

          {/* NO box */}
          <rect x="20" y="222" width="86" height="32" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="63" y="234" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="11" fontWeight="800">NO</text>
          <text x="63" y="246" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="8" fontWeight="500">Not required</text>

          {/* Dashed line connecting side branch to main flow */}
          <line x1="110" y1="162" x2="130" y2="145" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />

          {/* Bottom summary bar */}
          <rect x="40" y="268" width="380" height="28" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
          <text x="230" y="282" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="10" fontWeight="600">Defect + Harm = Liability (no negligence proof needed)</text>

          {/* Right-side annotation */}
          <rect x="350" y="30" width="96" height="44" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="398" y="46" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="8" fontWeight="600">Key distinction</text>
          <text x="398" y="58" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="8" fontWeight="500">from negligence</text>
          <text x="398" y="68" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="8" fontWeight="500">law</text>
        </svg>

        <p className="text-slate-600">
          &ldquo;The manufacturer of an article is liable for any damage or harm that results because of a defect.&rdquo;
        </p>
        <div className="bg-red-50 border border-red-800 rounded-xl p-4 space-y-3">
          <div className="font-semibold text-red-700">Under strict liability:</div>
          <ul className="text-sm text-red-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">1.</span>
              It does not matter whether the manufacturer <strong className="text-red-700">knew</strong> about the defect
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">2.</span>
              It does not matter whether the manufacturer <strong className="text-red-700">could have known</strong> about the defect
            </li>
            <li className="flex gap-2">
              <span className="text-red-400 shrink-0">3.</span>
              The plaintiff must only prove that a <strong className="text-red-700">defect existed</strong> and that it <strong className="text-red-700">caused harm</strong>
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="text-center">
            <div className="text-lg font-mono text-blue-600">Negligence need NOT be proved</div>
            <div className="text-sm text-slate-500 mt-1">This is the critical distinction from ordinary negligence law</div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The 10-Year Example</h2>

        {/* Timeline visualization: knowledge gap and liability */}
        <svg className="w-full" viewBox="0 0 460 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="460" height="220" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          <defs>
            <linearGradient id="timelineGrad" x1="50" y1="0" x2="410" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Title */}
          <text x="230" y="26" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="12" fontWeight="600">Strict Liability Timeline</text>

          {/* Main timeline bar */}
          <rect x="50" y="80" width="360" height="6" rx="3" fill="url(#timelineGrad)" opacity="0.3" />
          <rect x="50" y="80" width="360" height="6" rx="3" fill="url(#timelineGrad)" />

          {/* Dotted sections between events */}
          <line x1="130" y1="83" x2="230" y2="83" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <line x1="290" y1="83" x2="370" y2="83" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

          {/* Event 1: 2016 - Product manufactured */}
          <circle cx="80" cy="83" r="8" fill="#10b981" stroke="white" strokeWidth="2" />
          <line x1="80" y1="91" x2="80" y2="108" stroke="#10b981" strokeWidth="1.5" />
          <rect x="20" y="108" width="120" height="44" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          <text x="80" y="120" textAnchor="middle" dominantBaseline="central" fill="#10b981" fontSize="10" fontWeight="700">2016</text>
          <text x="80" y="134" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="8" fontWeight="500">Product manufactured</text>
          <text x="80" y="146" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="7">(best knowledge at time)</text>

          {/* Event 2: 2020 - New research reveals risk */}
          <circle cx="250" cy="83" r="8" fill="#d97706" stroke="white" strokeWidth="2" />
          <line x1="250" y1="71" x2="250" y2="50" stroke="#d97706" strokeWidth="1.5" />
          <rect x="185" y="40" width="130" height="10" rx="0" fill="none" />
          <text x="250" y="46" textAnchor="middle" dominantBaseline="central" fill="#d97706" fontSize="10" fontWeight="700">2020</text>
          <text x="250" y="60" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="8" fontWeight="500">New research reveals risk</text>

          {/* Event 3: 2026 - Injury occurs */}
          <circle cx="370" cy="83" r="8" fill="#ef4444" stroke="white" strokeWidth="2" />
          <line x1="370" y1="91" x2="370" y2="108" stroke="#ef4444" strokeWidth="1.5" />
          <rect x="310" y="108" width="120" height="44" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
          <text x="370" y="120" textAnchor="middle" dominantBaseline="central" fill="#ef4444" fontSize="10" fontWeight="700">2026</text>
          <text x="370" y="134" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="8" fontWeight="500">Injury occurs</text>
          <text x="370" y="146" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="7">(defect discovered)</text>

          {/* Arrow from injury to verdict */}
          <path d="M410,120 Q430,120 430,140 Q430,160 410,160" stroke="#ef4444" strokeWidth="1.5" fill="none" />
          <polygon points="412,156 412,164 404,160" fill="#ef4444" />

          {/* Verdict box */}
          <rect x="310" y="158" width="120" height="26" rx="5" fill="#ef4444" />
          <text x="370" y="171" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="700">Manufacturer STILL LIABLE</text>

          {/* Knowledge gap annotation */}
          <line x1="100" y1="97" x2="232" y2="97" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="166" y="103" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="7" fontWeight="500">No knowledge of defect</text>

          {/* Bottom bar */}
          <rect x="40" y="192" width="380" height="20" rx="5" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="230" y="202" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="8" fontWeight="500">Knowledge at time of manufacture is irrelevant under strict liability</text>
        </svg>

        <p className="text-slate-600">
          Consider an article manufactured <strong className="text-slate-800">10 years ago</strong>. At the time of manufacture, it was not considered defective given all available knowledge and testing methods.
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏭</div>
            <div>
              <div className="text-sm text-slate-500">10 years ago</div>
              <div className="text-slate-700">Product manufactured with best available knowledge</div>
              <div className="text-xs text-slate-500">No known defect at time of manufacture</div>
            </div>
          </div>
          <div className="border-l-2 border-slate-200 ml-5 h-6" />
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <div className="text-sm text-slate-500">Today</div>
              <div className="text-slate-700">Defect discovered, causes harm</div>
              <div className="text-xs text-slate-500">New knowledge reveals a design flaw</div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-800 rounded-xl p-4">
          <div className="font-semibold text-red-700 mb-1">Result under strict liability:</div>
          <p className="text-sm text-red-700">
            The manufacturer is <strong className="text-red-700">STILL LIABLE</strong> even though the defect was unknowable at the time of manufacture. This is a powerful legal concept that every engineer must understand.
          </p>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Preventing Product Liability</h2>
        <p className="text-slate-600">
          The best prevention comes from <strong className="text-slate-800">good engineering in analysis and design, quality control, and comprehensive testing procedures.</strong>
        </p>
        <div className="space-y-2">
          {[
            { action: 'Rigorous analysis & design', desc: 'Use proven methods (like those in this textbook!) with appropriate safety factors', icon: '🔬' },
            { action: 'Quality control', desc: 'Inspect materials, processes, and finished products systematically', icon: '✅' },
            { action: 'Comprehensive testing', desc: 'Test prototypes and production samples under realistic and extreme conditions', icon: '🧪' },
            { action: 'Review advertising & warranties', desc: 'Eliminate excessive promises that create unrealistic expectations', icon: '📝' },
            { action: 'Warnings & instructions', desc: 'Include adequate warnings and clear operating instructions with the product', icon: '⚠️' },
          ].map(({ action, desc, icon }) => (
            <div key={action} className="flex gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-2xl shrink-0">{icon}</div>
              <div>
                <div className="font-semibold text-blue-600 text-sm">{action}</div>
                <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
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
        <h2 className="text-2xl font-bold text-blue-600">Sort: Liability Prevention</h2>
        <p className="text-slate-600">Drag each scenario into the correct category:</p>
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
          onIncorrect={onIncorrect}
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
