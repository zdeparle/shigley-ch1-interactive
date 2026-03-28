import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'
import MatchingPairs from '../components/MatchingPairs'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">What is Engineering Design?</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's defines design as: <strong className="text-slate-100">"to formulate a plan for the satisfaction of a specified need or to solve a specific problem."</strong>
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <p className="text-sm text-slate-400 mb-2">If the plan creates something with physical reality, the product must be:</p>
          <div className="flex flex-wrap gap-2">
            {['Functional', 'Safe', 'Reliable', 'Competitive', 'Usable', 'Manufacturable', 'Marketable'].map(item => (
              <span key={item} className="px-2.5 py-1 bg-[#141428] border border-[#252548] rounded-full text-xs text-[#f59e0b] font-semibold">{item}</span>
            ))}
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <p className="text-sm text-slate-400 mb-2">Key insight from §1-1:</p>
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            "Decisions sometimes have to be made with too little information, occasionally with just the right amount, or with an excess of partially contradictory information."
          </blockquote>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Four Key Characteristics of Design</h2>
        <p className="text-slate-300">Engineering design is not a linear, one-shot process. It has these essential characteristics:</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Iterative', desc: 'You go back and revise previous decisions as more becomes known', icon: '🔄', color: 'border-violet-500 bg-violet-900/20' },
            { label: 'Decision-making', desc: 'Choose among multiple valid approaches, often with incomplete information', icon: '🎯', color: 'border-blue-500 bg-blue-900/20' },
            { label: 'Constrained', desc: 'Subject to real-world limitations: cost, materials, manufacturing, time', icon: '⚖️', color: 'border-amber-500 bg-amber-900/20' },
            { label: 'Open-ended', desc: 'Multiple acceptable solutions may exist — there is rarely one "right" answer', icon: '🌐', color: 'border-emerald-500 bg-emerald-900/20' },
          ].map(item => (
            <div key={item.label} className={`rounded-lg p-3 border ${item.color}`}>
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-100 text-sm">{item.label}</div>
              <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Design vs. Analysis</h2>
        <p className="text-slate-300">Design and analysis are related but different. Sort these activities:</p>
        <CategorySort
          items={['Brainstorm solutions', 'Calculate beam deflection', 'Choose materials', 'Compute stress in a shaft', 'Sketch concepts', 'Verify safety factor']}
          categories={['Design Activity', 'Analysis Activity']}
          correctMapping={{
            'Brainstorm solutions': 'Design Activity',
            'Calculate beam deflection': 'Analysis Activity',
            'Choose materials': 'Design Activity',
            'Compute stress in a shaft': 'Analysis Activity',
            'Sketch concepts': 'Design Activity',
            'Verify safety factor': 'Analysis Activity',
          }}
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Quick Check</h2>
        <Quiz
          question="Which is NOT a characteristic of engineering design?"
          options={[
            'It is iterative — you revisit earlier decisions',
            'It always has exactly one correct solution',
            'It involves decision-making with incomplete information',
            'It is constrained by real-world limitations'
          ]}
          correctIndex={1}
          explanation="Design is open-ended with multiple acceptable solutions. There is rarely a single 'correct' answer — the best solution depends on trade-offs among competing requirements."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Mechanical Engineering Design</h2>
        <p className="text-slate-300">
          Mechanical engineers deal with <strong className="text-slate-100">production and processing of energy</strong>, means of production, tools of transportation, and techniques of automation.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <p className="text-sm text-slate-400 mb-2">A simple journal bearing involves ALL of these:</p>
          <div className="grid grid-cols-3 gap-2">
            {['Fluid flow', 'Heat transfer', 'Friction', 'Energy transport', 'Material selection', 'Statistical descriptions'].map(item => (
              <div key={item} className="text-xs bg-[#141428] border border-[#252548] rounded-lg px-2 py-1.5 text-slate-300 text-center">{item}</div>
            ))}
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Key insight: <strong>Real problems resist compartmentalization.</strong> Terms like "machine design," "turbomachinery design," and "HVAC design" all draw on the same bodies of knowledge.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Match the Subdomain</h2>
        <p className="text-slate-300">All of these are examples of mechanical engineering design. Match each to its primary focus:</p>
        <MatchingPairs
          pairs={[
            { left: 'HVAC Design', right: 'Heating & cooling systems' },
            { left: 'IC Engine Design', right: 'Combustion & power cycles' },
            { left: 'Turbomachinery', right: 'Rotating fluid machines' },
            { left: 'Machine Element Design', right: 'Gears, bearings, shafts' },
          ]}
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design is Communication</h2>
        <p className="text-slate-300">
          "Design is a <strong className="text-slate-100">communication-intensive activity</strong> in which both words and pictures are used, and written and oral forms are employed."
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="text-sm font-semibold text-slate-200 mb-1">What a designer combines:</div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Creativity & problem-solving</li>
              <li>• Knowledge of technology</li>
              <li>• Mathematics & statistics</li>
              <li>• Computer tools & graphics</li>
              <li>• Communication skills</li>
            </ul>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="text-sm font-semibold text-slate-200 mb-1">To produce a product that is:</div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Functional & safe</li>
              <li>• Reliable & competitive</li>
              <li>• Usable & manufacturable</li>
              <li>• Marketable</li>
              <li>• <em>...regardless of who builds or uses it</em></li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="A journal bearing design involves which of these disciplines?"
          options={[
            'Only fluid mechanics',
            'Only material science and heat transfer',
            'Fluid flow, heat transfer, friction, energy transport, material selection, and more',
            'Only stress analysis'
          ]}
          correctIndex={2}
          explanation="Real engineering problems resist compartmentalization. A simple journal bearing crosses fluid flow, heat transfer, friction, energy transport, material selection, and statistical descriptions — all at once."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design vs. Analysis</h2>
        <p className="text-slate-300">An important distinction for this course:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
            <div className="font-bold text-blue-300 text-lg mb-2">Design</div>
            <ul className="text-sm text-blue-200/80 space-y-1">
              <li>• Open-ended synthesis</li>
              <li>• "What should we build?"</li>
              <li>• Multiple valid solutions</li>
              <li>• Requires creativity</li>
              <li>• Iterative process</li>
            </ul>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4">
            <div className="font-bold text-emerald-300 text-lg mb-2">Analysis</div>
            <ul className="text-sm text-emerald-200/80 space-y-1">
              <li>• Closed-form evaluation</li>
              <li>• "Will this design work?"</li>
              <li>• Usually one correct answer</li>
              <li>• Uses equations & models</li>
              <li>• Part of the design loop</li>
            </ul>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 text-sm text-slate-400 border border-[#252548]">
          This textbook covers both: you'll learn to <strong className="text-slate-200">design</strong> mechanical systems and <strong className="text-slate-200">analyze</strong> them using engineering principles.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Challenge</h2>
        <Quiz
          question="A designer's personal resources of creativeness, communicative ability, and problem-solving skill are intertwined with:"
          options={[
            'Only computer skills',
            'Knowledge of technology and first principles',
            'Management approval',
            'Manufacturing equipment'
          ]}
          correctIndex={1}
          explanation="Shigley's emphasizes that engineering tools (math, statistics, computers, graphics, languages) are combined with knowledge of technology and first principles to produce effective designs."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module1() {
  return (
    <ModuleLayout
      moduleId="module1"
      title="What is Design?"
      icon="💡"
      steps={steps}
    />
  )
}
