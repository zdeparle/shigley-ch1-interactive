import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import CategorySort from '../components/CategorySort'
import MatchingPairs from '../components/MatchingPairs'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">What is Engineering Design?</h2>
        <p className="text-slate-600 leading-relaxed">
          Shigley's defines design as: <strong className="text-slate-800">"to formulate a plan for the satisfaction of a specified need or to solve a specific problem."</strong>
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">If the plan creates something with physical reality, the product must be:</p>
          <div className="flex flex-wrap gap-2">
            {['Functional', 'Safe', 'Reliable', 'Competitive', 'Usable', 'Manufacturable', 'Marketable'].map(item => (
              <span key={item} className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-xs text-blue-600 font-semibold">{item}</span>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Key insight from §1-1:</p>
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            "Decisions sometimes have to be made with too little information, occasionally with just the right amount, or with an excess of partially contradictory information."
          </blockquote>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Four Key Characteristics of Design</h2>
        <p className="text-slate-600">Engineering design is not a linear, one-shot process. It has these essential characteristics:</p>

        {/* Iterative cycle diagram */}
        <svg className="w-full" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="400" height="220" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Circular arrow path */}
          <path d="M200 30 A80 80 0 0 1 280 110" stroke="#e2e8f0" strokeWidth="3" fill="none" />
          <path d="M280 110 A80 80 0 0 1 200 190" stroke="#e2e8f0" strokeWidth="3" fill="none" />
          <path d="M200 190 A80 80 0 0 1 120 110" stroke="#e2e8f0" strokeWidth="3" fill="none" />
          <path d="M120 110 A80 80 0 0 1 200 30" stroke="#e2e8f0" strokeWidth="3" fill="none" />

          {/* Curved arrows between nodes */}
          {/* Top to Right */}
          <path d="M230 42 Q270 55 274 85" stroke="#7c3aed" strokeWidth="2" fill="none" markerEnd="url(#arrowViolet1)" />
          {/* Right to Bottom */}
          <path d="M274 135 Q270 165 230 178" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue1)" />
          {/* Bottom to Left */}
          <path d="M170 178 Q130 165 126 135" stroke="#d97706" strokeWidth="2" fill="none" markerEnd="url(#arrowAmber1)" />
          {/* Left to Top */}
          <path d="M126 85 Q130 55 170 42" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowEmerald1)" />

          {/* Arrow markers */}
          <defs>
            <marker id="arrowViolet1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#7c3aed" />
            </marker>
            <marker id="arrowBlue1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#2563eb" />
            </marker>
            <marker id="arrowAmber1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#d97706" />
            </marker>
            <marker id="arrowEmerald1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#10b981" />
            </marker>
          </defs>

          {/* Node: Iterate (top) */}
          <rect x="160" y="18" width="80" height="34" rx="17" fill="#7c3aed" />
          <text x="200" y="40" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Iterate</text>

          {/* Node: Decide (right) */}
          <rect x="260" y="93" width="80" height="34" rx="17" fill="#2563eb" />
          <text x="300" y="115" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Decide</text>

          {/* Node: Constrain (bottom) */}
          <rect x="160" y="168" width="80" height="34" rx="17" fill="#d97706" />
          <text x="200" y="190" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Constrain</text>

          {/* Node: Explore (left) */}
          <rect x="60" y="93" width="80" height="34" rx="17" fill="#10b981" />
          <text x="100" y="115" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Explore</text>

          {/* Center label */}
          <text x="200" y="108" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">DESIGN</text>
          <text x="200" y="122" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">CYCLE</text>
        </svg>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Iterative', desc: 'You go back and revise previous decisions as more becomes known', icon: '🔄', color: 'border-violet-500 bg-violet-50' },
            { label: 'Decision-making', desc: 'Choose among multiple valid approaches, often with incomplete information', icon: '🎯', color: 'border-blue-500 bg-blue-50' },
            { label: 'Constrained', desc: 'Subject to real-world limitations: cost, materials, manufacturing, time', icon: '⚖️', color: 'border-amber-500 bg-blue-50' },
            { label: 'Open-ended', desc: 'Multiple acceptable solutions may exist — there is rarely one "right" answer', icon: '🌐', color: 'border-emerald-500 bg-emerald-50' },
          ].map(item => (
            <div key={item.label} className={`rounded-lg p-3 border ${item.color}`}>
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
              <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Design vs. Analysis</h2>
        <p className="text-slate-600">Design and analysis are related but different. Sort these activities:</p>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Quick Check</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Mechanical Engineering Design</h2>
        <p className="text-slate-600">
          Mechanical engineers deal with <strong className="text-slate-800">production and processing of energy</strong>, means of production, tools of transportation, and techniques of automation.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">A simple journal bearing involves ALL of these:</p>

          {/* Journal Bearing Cross-Section Diagram */}
          <svg className="w-full" viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background */}
            <rect width="500" height="320" rx="12" fill="#ffffff" />

            {/* Title */}
            <text x="250" y="24" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">Journal Bearing Cross-Section</text>

            {/* Outer circle (bearing housing) */}
            <circle cx="210" cy="170" r="95" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />

            {/* Inner circle (shaft) - offset slightly down-left to show eccentric position */}
            <circle cx="210" cy="185" r="65" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />

            {/* Shaft center cross */}
            <line x1="205" y1="185" x2="215" y2="185" stroke="#475569" strokeWidth="1.5" />
            <line x1="210" y1="180" x2="210" y2="190" stroke="#475569" strokeWidth="1.5" />

            {/* Fluid film region - crescent shape at top gap */}
            <path d="M145 135 A65 65 0 0 1 275 135 A95 95 0 0 0 145 135" fill="#93c5fd" opacity="0.5" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* Shaft label */}
            <text x="210" y="205" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">SHAFT</text>

            {/* Housing label */}
            <text x="210" y="280" textAnchor="middle" fill="#64748b" fontSize="10">BEARING HOUSING</text>

            {/* Label: Fluid Film (top, pointing to gap) */}
            <line x1="210" y1="95" x2="210" y2="60" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="210" cy="95" r="3" fill="#2563eb" />
            <rect x="155" y="42" width="110" height="22" rx="11" fill="#2563eb" />
            <text x="210" y="57" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Fluid Film</text>

            {/* Label: Heat Flow (upper-right) */}
            <line x1="278" y1="110" x2="340" y2="70" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="278" cy="110" r="3" fill="#ef4444" />
            <rect x="340" y="58" width="100" height="22" rx="11" fill="#ef4444" />
            <text x="390" y="73" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Heat Flow</text>

            {/* Label: Friction Surface (right) */}
            <line x1="275" y1="185" x2="340" y2="185" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="275" cy="185" r="3" fill="#d97706" />
            <rect x="340" y="173" width="130" height="22" rx="11" fill="#d97706" />
            <text x="405" y="188" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Friction Surface</text>

            {/* Label: Material Selection (lower-right) */}
            <line x1="270" y1="240" x2="340" y2="260" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="270" cy="240" r="3" fill="#7c3aed" />
            <rect x="340" y="248" width="145" height="22" rx="11" fill="#7c3aed" />
            <text x="412" y="263" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Material Selection</text>

            {/* Label: Load Path (left) */}
            <line x1="140" y1="220" x2="60" y2="250" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="140" cy="220" r="3" fill="#10b981" />
            <rect x="10" y="240" width="100" height="22" rx="11" fill="#10b981" />
            <text x="60" y="255" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Load Path</text>

            {/* Load arrow (downward on shaft) */}
            <defs>
              <marker id="arrowLoad" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#10b981" />
              </marker>
            </defs>
            <line x1="210" y1="30" x2="210" y2="38" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowLoad)" />

            {/* Rotation arrow inside shaft */}
            <path d="M190 170 A20 20 0 1 1 230 170" stroke="#475569" strokeWidth="1.5" fill="none" markerEnd="url(#arrowRotate)" />
            <defs>
              <marker id="arrowRotate" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="#475569" />
              </marker>
            </defs>
            <text x="210" y="172" textAnchor="middle" fill="#475569" fontSize="8">rotation</text>
          </svg>

          <div className="grid grid-cols-3 gap-2">
            {['Fluid flow', 'Heat transfer', 'Friction', 'Energy transport', 'Material selection', 'Statistical descriptions'].map(item => (
              <div key={item} className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 text-center">{item}</div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Key insight: <strong>Real problems resist compartmentalization.</strong> Terms like "machine design," "turbomachinery design," and "HVAC design" all draw on the same bodies of knowledge.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Match the Subdomain</h2>
        <p className="text-slate-600">All of these are examples of mechanical engineering design. Match each to its primary focus:</p>
        <MatchingPairs
          pairs={[
            { left: 'HVAC Design', right: 'Heating & cooling systems' },
            { left: 'IC Engine Design', right: 'Combustion & power cycles' },
            { left: 'Turbomachinery', right: 'Rotating fluid machines' },
            { left: 'Machine Element Design', right: 'Gears, bearings, shafts' },
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
        <h2 className="text-2xl font-bold text-blue-600">Design is Communication</h2>
        <p className="text-slate-600">
          "Design is a <strong className="text-slate-800">communication-intensive activity</strong> in which both words and pictures are used, and written and oral forms are employed."
        </p>
        {/* Design Process Flow Diagram */}
        <svg className="w-full" viewBox="0 0 600 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="600" height="260" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          <defs>
            <marker id="arrowFlowRight" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#2563eb" />
            </marker>
          </defs>

          {/* Left column: Inputs */}
          <text x="70" y="24" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">INPUTS</text>
          {[
            { label: 'Knowledge', y: 45, color: '#7c3aed' },
            { label: 'Experience', y: 85, color: '#2563eb' },
            { label: 'Tools', y: 125, color: '#10b981' },
            { label: 'Creativity', y: 165, color: '#d97706' },
          ].map(({ label, y, color }) => (
            <g key={label}>
              <rect x="15" y={y} width="110" height="30" rx="6" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" />
              <text x="70" y={y + 20} textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">{label}</text>
              {/* Arrow from input to center */}
              <line x1="130" y1={y + 15} x2="195" y2={130} stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrowFlowRight)" opacity="0.5" />
            </g>
          ))}

          {/* Center: Design Process box */}
          <rect x="200" y="85" width="200" height="90" rx="12" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <text x="300" y="122" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">DESIGN</text>
          <text x="300" y="142" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">PROCESS</text>
          <text x="300" y="162" textAnchor="middle" fill="#93c5fd" fontSize="10">synthesis + analysis + iteration</text>

          {/* Right column: Outputs */}
          <text x="510" y="24" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">OUTPUTS</text>
          {[
            { label: 'Functional', y: 35 },
            { label: 'Safe', y: 65 },
            { label: 'Reliable', y: 95 },
            { label: 'Competitive', y: 125 },
            { label: 'Usable', y: 155 },
            { label: 'Manufacturable', y: 185 },
          ].map(({ label, y }) => (
            <g key={label}>
              <rect x="455" y={y} width="130" height="26" rx="6" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="1.5" />
              <text x="520" y={y + 17} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">{label}</text>
              {/* Arrow from center to output */}
              <line x1="405" y1={130} x2="450" y2={y + 13} stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowFlowRight)" opacity="0.5" />
            </g>
          ))}

          {/* Bottom label */}
          <text x="300" y="245" textAnchor="middle" fill="#94a3b8" fontSize="10">A designer combines personal resources with technical knowledge to produce effective products</text>
        </svg>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-sm font-semibold text-slate-700 mb-1">What a designer combines:</div>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Creativity & problem-solving</li>
              <li>• Knowledge of technology</li>
              <li>• Mathematics & statistics</li>
              <li>• Computer tools & graphics</li>
              <li>• Communication skills</li>
            </ul>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-sm font-semibold text-slate-700 mb-1">To produce a product that is:</div>
            <ul className="text-xs text-slate-500 space-y-1">
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
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Design vs. Analysis</h2>
        <p className="text-slate-600">An important distinction for this course:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="font-bold text-blue-700 text-lg mb-2">Design</div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Open-ended synthesis</li>
              <li>• "What should we build?"</li>
              <li>• Multiple valid solutions</li>
              <li>• Requires creativity</li>
              <li>• Iterative process</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="font-bold text-emerald-700 text-lg mb-2">Analysis</div>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Closed-form evaluation</li>
              <li>• "Will this design work?"</li>
              <li>• Usually one correct answer</li>
              <li>• Uses equations & models</li>
              <li>• Part of the design loop</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-500 border border-slate-200">
          This textbook covers both: you'll learn to <strong className="text-slate-700">design</strong> mechanical systems and <strong className="text-slate-700">analyze</strong> them using engineering principles.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Challenge</h2>
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
          onIncorrect={onIncorrect}
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
