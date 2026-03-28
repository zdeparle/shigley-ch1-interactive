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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Professional Responsibilities</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's &sect;1-5 emphasizes that engineers must be <strong className="text-slate-100">competent,
          responsible, ethical, and professional</strong>. These are not optional qualities &mdash;
          they are fundamental requirements of the profession.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
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
            <div key={item.label} className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-100 text-sm">{item.label}</div>
              <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Many engineers spend the majority of their working time communicating &mdash; writing reports,
          presenting to teams, and coordinating with manufacturing. Technical skill alone is not sufficient.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Systematic Problem-Solving Approach</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's recommends a structured <strong className="text-slate-100">7-step approach</strong> to solving
          engineering problems. Following this method reduces errors and ensures thoroughness.
        </p>
        <div className="space-y-2">
          {problemSolvingSteps.map((step, i) => {
            const colors = [
              'border-violet-500 bg-violet-900/20',
              'border-blue-500 bg-blue-900/20',
              'border-cyan-500 bg-cyan-900/20',
              'border-teal-500 bg-teal-900/20',
              'border-amber-500 bg-amber-900/20',
              'border-orange-500 bg-orange-900/20',
              'border-emerald-500 bg-emerald-900/20',
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
                <div className="w-7 h-7 rounded-full bg-[#0a0a16] flex items-center justify-center text-sm font-bold text-slate-200 shrink-0">{i + 1}</div>
                <div>
                  <div className="font-semibold text-slate-100 text-sm">{step}</div>
                  <div className="text-xs text-slate-400">{descriptions[i]}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Order the Problem-Solving Steps</h2>
        <p className="text-slate-300">Drag and drop the seven steps into the correct sequence:</p>
        <DragAndDrop
          items={problemSolvingSteps}
          correctOrder={problemSolvingSteps}
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
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Engineers' Creed (NSPE)</h2>
        <p className="text-slate-300 leading-relaxed">
          The National Society of Professional Engineers (NSPE) established the Engineers' Creed &mdash;
          four pledges that define the ethical foundation of the profession.
        </p>
        <div className="space-y-3">
          {[
            { pledge: 'Utmost Performance', detail: 'Give the utmost of performance in the service of employers and clients', color: 'border-blue-500 bg-blue-900/20', num: 1 },
            { pledge: 'Honest Enterprise', detail: 'Participate only in honest enterprise, maintaining fair dealing in all professional relationships', color: 'border-emerald-500 bg-emerald-900/20', num: 2 },
            { pledge: 'Laws & Professional Conduct', detail: 'Live and work in accordance with the laws of the land and the highest standards of professional conduct', color: 'border-violet-500 bg-violet-900/20', num: 3 },
            { pledge: 'Service Before Profit', detail: 'Place service before profit, honor and standing of the profession before personal advantage, and public welfare above all other considerations', color: 'border-amber-500 bg-amber-900/20', num: 4 },
          ].map(({ pledge, detail, color, num }) => (
            <div key={pledge} className={`flex gap-3 p-3 rounded-lg border ${color}`}>
              <div className="w-7 h-7 rounded-full bg-[#0a0a16] flex items-center justify-center text-sm font-bold text-slate-200 shrink-0">{num}</div>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{pledge}</div>
                <div className="text-xs text-slate-400 mt-0.5">{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          The fourth pledge is paramount: <strong>"Public welfare above all other considerations."</strong>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Communication & Logbook Keeping</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's emphasizes two practical professional skills that many students overlook:
          <strong className="text-slate-100"> communication</strong> and <strong className="text-slate-100">record-keeping</strong>.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-slate-100 mb-2">Engineering Logbook</div>
            <div className="space-y-1.5">
              {[
                'Keep a neat and clear journal/logbook with dated entries',
                'Separate journals for each project',
                'Record all decisions and the reasoning behind them',
                'Critical for patent protection and liability defense',
                'Must be legible enough for others to follow your work',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-slate-100 mb-2">Communication Reality</div>
            <p className="text-sm text-slate-400">
              Many engineers spend the majority of their professional time communicating &mdash;
              writing reports, email correspondence, presenting findings to teams, negotiating with vendors,
              and coordinating with manufacturing. Technical analysis, while important, is often a smaller
              fraction of the workday than students expect.
            </p>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          A good logbook protects you legally, helps you recall decisions months later,
          and demonstrates due diligence in your engineering process.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
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
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
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
