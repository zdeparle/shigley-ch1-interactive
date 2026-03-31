import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DragAndDrop from '../components/DragAndDrop'

const problemSolvingSteps = [
  'Understand the problem',
  'Identify the knowns',
  'Identify unknowns & strategy',
  'State assumptions & decisions',
  'Analyze the problem',
  'Evaluate your solution',
  'Present your solution',
]

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Professional Responsibilities</h2>
        <p className="text-slate-600 leading-relaxed">
          Shigley's &sect;1-5 emphasizes that engineers must be <strong className="text-slate-800">competent,
          responsible, ethical, and professional</strong>. These are not optional qualities &mdash;
          they are fundamental requirements of the profession.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            "Communication skills play a large role in professional practice. Start developing these
            skills before graduation."
          </blockquote>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {[
            { label: 'Competence', desc: 'Deep technical knowledge, continuously updated', icon: '📚' },
            { label: 'Responsibility', desc: 'Accountability for design decisions and outcomes', icon: '🎯' },
            { label: 'Ethics', desc: 'Honest practice, public welfare first', icon: '⚖️' },
            { label: 'Communication', desc: 'Writing, speaking, and presenting effectively', icon: '🗣️' },
          ].map(item => (
            <div key={item.label} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
              <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Many engineers spend the majority of their working time communicating &mdash; writing reports,
          presenting to teams, and coordinating with manufacturing. Technical skill alone is not sufficient.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Systematic Problem-Solving Approach</h2>
        <p className="text-slate-600 leading-relaxed">
          Shigley's recommends a structured <strong className="text-slate-800">7-step approach</strong> to solving
          engineering problems. Following this method reduces errors and ensures thoroughness.
        </p>

        {/* Flowchart: 7-step problem-solving process */}
        <svg className="w-full" viewBox="0 0 400 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="400" height="620" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Step 1 */}
          <rect x="80" y="16" width="240" height="48" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
          <circle cx="100" cy="40" r="12" fill="#7c3aed" />
          <text x="100" y="40" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">1</text>
          <text x="200" y="40" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Understand the Problem</text>

          {/* Arrow 1-2 */}
          <line x1="200" y1="64" x2="200" y2="84" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,80 206,80 200,88" fill="#94a3b8" />

          {/* Step 2 */}
          <rect x="80" y="88" width="240" height="48" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="100" cy="112" r="12" fill="#2563eb" />
          <text x="100" y="112" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">2</text>
          <text x="200" y="112" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Identify the Knowns</text>

          {/* Arrow 2-3 */}
          <line x1="200" y1="136" x2="200" y2="156" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,152 206,152 200,160" fill="#94a3b8" />

          {/* Step 3 */}
          <rect x="80" y="160" width="240" height="48" rx="10" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.5" />
          <circle cx="100" cy="184" r="12" fill="#06b6d4" />
          <text x="100" y="184" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">3</text>
          <text x="200" y="184" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Identify Unknowns &amp; Strategy</text>

          {/* Arrow 3-4 */}
          <line x1="200" y1="208" x2="200" y2="228" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,224 206,224 200,232" fill="#94a3b8" />

          {/* Step 4 */}
          <rect x="80" y="232" width="240" height="48" rx="10" fill="#f0fdfa" stroke="#14b8a6" strokeWidth="1.5" />
          <circle cx="100" cy="256" r="12" fill="#14b8a6" />
          <text x="100" y="256" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">4</text>
          <text x="200" y="256" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">State Assumptions</text>

          {/* Arrow 4-5 */}
          <line x1="200" y1="280" x2="200" y2="300" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,296 206,296 200,304" fill="#94a3b8" />

          {/* Step 5 */}
          <rect x="80" y="304" width="240" height="48" rx="10" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="100" cy="328" r="12" fill="#d97706" />
          <text x="100" y="328" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">5</text>
          <text x="200" y="328" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Analyze the Problem</text>

          {/* Arrow 5-6 */}
          <line x1="200" y1="352" x2="200" y2="372" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,368 206,368 200,376" fill="#94a3b8" />

          {/* Step 6 */}
          <rect x="80" y="376" width="240" height="48" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
          <circle cx="100" cy="400" r="12" fill="#ea580c" />
          <text x="100" y="400" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">6</text>
          <text x="200" y="400" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Evaluate Your Solution</text>

          {/* Arrow 6-7 */}
          <line x1="200" y1="424" x2="200" y2="444" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="194,440 206,440 200,448" fill="#94a3b8" />

          {/* Step 7 */}
          <rect x="80" y="448" width="240" height="48" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="100" cy="472" r="12" fill="#10b981" />
          <text x="100" y="472" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="700">7</text>
          <text x="200" y="472" textAnchor="middle" dominantBaseline="central" fill="#334155" fontSize="13" fontWeight="600">Present Your Solution</text>

          {/* Feedback loop arrow (evaluate back to analyze) */}
          <path d="M320,400 Q360,400 360,328 Q360,260 320,260" stroke="#64748b" strokeWidth="1" strokeDasharray="4 3" fill="none" markerEnd="url(#feedbackArrow)" />
          <defs>
            <marker id="feedbackArrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <polygon points="0,0 6,3 0,6" fill="#64748b" />
            </marker>
          </defs>
          <text x="372" y="334" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="start">Iterate if</text>
          <text x="372" y="346" fill="#64748b" fontSize="9" fontWeight="500" textAnchor="start">needed</text>

          {/* Bottom label */}
          <rect x="80" y="520" width="240" height="36" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 3" />
          <text x="200" y="538" textAnchor="middle" dominantBaseline="central" fill="#2563eb" fontSize="11" fontWeight="600">Shigley&apos;s Structured Approach (&sect;1-5)</text>

          {/* Decorative top-right corner label */}
          <rect x="280" y="570" width="110" height="30" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="335" y="585" textAnchor="middle" dominantBaseline="central" fill="#64748b" fontSize="9" fontWeight="500">7 Steps to Success</text>
        </svg>

        <div className="space-y-2">
          {problemSolvingSteps.map((step, i) => {
            const colors = [
              'border-violet-500 bg-violet-50',
              'border-blue-500 bg-blue-50',
              'border-cyan-500 bg-cyan-50',
              'border-teal-500 bg-teal-50',
              'border-amber-500 bg-blue-50',
              'border-orange-500 bg-orange-50',
              'border-emerald-500 bg-emerald-50',
            ]
            const descriptions = [
              'Read the problem carefully. What is being asked? What physical situation is described?',
              'List all given data: dimensions, loads, material properties, constraints.',
              'What do you need to find? What equations or methods will you use?',
              'State all simplifying assumptions explicitly (e.g., "neglect friction," "assume static loading").',
              'Apply the relevant equations and solve step by step. Show your work.',
              'Check: Do the units work out? Is the magnitude reasonable? Does the sign make sense?',
              'Organize your solution clearly. Others must be able to follow your reasoning.',
            ]
            return (
              <div key={step} className={`flex gap-3 p-3 rounded-lg border ${colors[i]}`}>
                <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">{i + 1}</div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{step}</div>
                  <div className="text-xs text-slate-500">{descriptions[i]}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Order the Problem-Solving Steps</h2>
        <p className="text-slate-600">Drag and drop the seven steps into the correct sequence:</p>
        <DragAndDrop
          items={problemSolvingSteps}
          correctOrder={problemSolvingSteps}
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
          question="Which step should come FIRST when solving a design problem?"
          options={[
            'State assumptions',
            'Analyze the problem',
            'Understand the problem',
            'Present the solution'
          ]}
          correctIndex={2}
          explanation="You must first understand what the problem is asking before you can identify knowns, choose a strategy, or begin analysis. Jumping straight to equations without understanding the problem is a common source of errors."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Engineers' Creed (NSPE)</h2>
        <p className="text-slate-600 leading-relaxed">
          The National Society of Professional Engineers (NSPE) established the Engineers' Creed &mdash;
          four pledges that define the ethical foundation of the profession.
        </p>
        <div className="space-y-3">
          {[
            { pledge: 'Utmost Performance', detail: 'Give the utmost of performance in the service of employers and clients', color: 'border-blue-500 bg-blue-50', num: 1 },
            { pledge: 'Honest Enterprise', detail: 'Participate only in honest enterprise, maintaining fair dealing in all professional relationships', color: 'border-emerald-500 bg-emerald-50', num: 2 },
            { pledge: 'Laws & Professional Conduct', detail: 'Live and work in accordance with the laws of the land and the highest standards of professional conduct', color: 'border-violet-500 bg-violet-50', num: 3 },
            { pledge: 'Service Before Profit', detail: 'Place service before profit, honor and standing of the profession before personal advantage, and public welfare above all other considerations', color: 'border-amber-500 bg-blue-50', num: 4 },
          ].map(({ pledge, detail, color, num }) => (
            <div key={pledge} className={`flex gap-3 p-3 rounded-lg border ${color}`}>
              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">{num}</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{pledge}</div>
                <div className="text-xs text-slate-500 mt-0.5">{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          The fourth pledge is paramount: <strong>"Public welfare above all other considerations."</strong>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Communication & Logbook Keeping</h2>
        <p className="text-slate-600 leading-relaxed">
          Shigley's emphasizes two practical professional skills that many students overlook:
          <strong className="text-slate-800"> communication</strong> and <strong className="text-slate-800">record-keeping</strong>.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-slate-800 mb-2">Engineering Logbook</div>
            <div className="space-y-1.5">
              {[
                'Keep a neat and clear journal/logbook with dated entries',
                'Separate journals for each project',
                'Record all decisions and the reasoning behind them',
                'Critical for patent protection and liability defense',
                'Must be legible enough for others to follow your work',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-slate-800 mb-2">Communication Reality</div>
            <p className="text-sm text-slate-500">
              Many engineers spend the majority of their professional time communicating &mdash;
              writing reports, email correspondence, presenting findings to teams, negotiating with vendors,
              and coordinating with manufacturing. Technical analysis, while important, is often a smaller
              fraction of the workday than students expect.
            </p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          A good logbook protects you legally, helps you recall decisions months later,
          and demonstrates due diligence in your engineering process.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
        <Quiz
          question="Why should engineers keep detailed dated logbooks?"
          options={[
            "It's required by law",
            'For patent protection, liability, and to explain decisions later',
            'To track billing hours',
            'For personal notes only'
          ]}
          correctIndex={1}
          explanation="Engineering logbooks serve multiple critical purposes: establishing dates of invention for patent claims, documenting due diligence for liability defense, and providing a record that allows you (or others) to understand past decisions. While some industries have legal requirements, the primary reasons are patent protection and liability documentation."
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
          question="The Engineers' Creed places what above all other considerations?"
          options={[
            'Corporate profit',
            'Engineering excellence',
            'Public welfare',
            'Professional advancement'
          ]}
          correctIndex={2}
          explanation={"The fourth pledge of the Engineers' Creed states: \"Place service before profit, honor and standing of the profession before personal advantage, and public welfare above all other considerations.\" Public safety and welfare are the paramount responsibility of every engineer."}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module5() {
  return (
    <ModuleLayout moduleId="module5" title="Professional Practice" icon="👔" steps={steps} />
  )
}
