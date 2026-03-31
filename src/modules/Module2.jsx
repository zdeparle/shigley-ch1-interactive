import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DragAndDrop from '../components/DragAndDrop'
import FillInTheBlank from '../components/FillInTheBlank'
import FlowDiagram from '../components/FlowDiagram'

const designPhases = [
  'Recognition of Need',
  'Problem Definition',
  'Synthesis',
  'Analysis & Optimization',
  'Evaluation',
  'Presentation'
]

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Design Process: 6 Phases</h2>
        <p className="text-slate-600 leading-relaxed">
          The design process from start to finish follows <strong className="text-slate-800">Figure 1-1</strong> in Shigley's.
          It consists of six phases that form an <strong className="text-slate-800">iterative process with feedback loops</strong> &mdash;
          designers frequently revisit earlier phases as new information emerges.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500 mb-2">Key insight from Shigley's &sect;1-3:</p>
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            "Design is an iterative process &mdash; with many sequences of steps, feedback loops,
            and branches rather than a single linear path."
          </blockquote>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {designPhases.map((phase, i) => (
            <div key={phase} className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">{i + 1}</div>
              <div className="text-sm font-semibold text-slate-800">{phase}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Design Process Flowchart</h2>
        <p className="text-slate-600">Click on each phase to learn more about it. Notice the iteration and feedback arrows.</p>
        <FlowDiagram />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 1: Identification of Need</h2>
        <p className="text-slate-600 leading-relaxed">
          The process begins when someone recognizes that a problem exists. Shigley's describes this as:
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-violet-500 pl-4">
            "A vague discontent, a feeling of uneasiness, or a sensing that something is not right."
          </blockquote>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <div className="font-semibold text-violet-700 mb-2">Example: Food Packaging</div>
          <p className="text-sm text-violet-700">
            A food company notices that products are spoiling faster than expected during shipping.
            The need is vague at first &mdash; "our packaging isn't working well enough." This is not yet
            a precisely defined engineering problem, just recognition that improvement is needed.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          The need is often expressed by a non-engineer &mdash; a customer, manager, or market analyst.
          It is usually stated in general, non-technical terms.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 2: Problem Definition</h2>
        <p className="text-slate-600 leading-relaxed">
          The engineer must transform the vague need into a <strong className="text-slate-800">precise, engineering specification</strong>.
          Shigley's introduces the <strong className="text-slate-800">black-box model</strong>: defining inputs, outputs, and constraints
          without specifying the internal mechanism.
        </p>

        {/* Black Box SVG Diagram */}
        <svg className="w-full" viewBox="0 0 520 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="520" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          <defs>
            <marker id="arrowIn" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#2563eb" />
            </marker>
            <marker id="arrowOut" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#10b981" />
            </marker>
          </defs>

          {/* Central black box */}
          <rect x="185" y="60" width="150" height="110" rx="12" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <text x="260" y="108" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">SYSTEM</text>
          <text x="260" y="128" textAnchor="middle" fill="#94a3b8" fontSize="10">(black box)</text>

          {/* Input arrows and labels */}
          {[
            { label: 'Energy', y: 80 },
            { label: 'Material', y: 115 },
            { label: 'Information', y: 150 },
          ].map(({ label, y }) => (
            <g key={`in-${label}`}>
              <rect x="20" y={y - 12} width="100" height="24" rx="6" fill="#2563eb" opacity="0.1" stroke="#2563eb" strokeWidth="1.5" />
              <text x="70" y={y + 4} textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">{label}</text>
              <line x1="125" y1={y} x2="180" y2={y} stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowIn)" />
            </g>
          ))}

          {/* Output arrows and labels */}
          {[
            { label: 'Motion', y: 80 },
            { label: 'Force', y: 115 },
            { label: 'Product', y: 150 },
          ].map(({ label, y }) => (
            <g key={`out-${label}`}>
              <line x1="340" y1={y} x2="390" y2={y} stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowOut)" />
              <rect x="395" y={y - 12} width="100" height="24" rx="6" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1.5" />
              <text x="445" y={y + 4} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">{label}</text>
            </g>
          ))}

          {/* Constraint labels below the box */}
          <text x="260" y="200" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">CONSTRAINTS</text>
          <line x1="200" y1="207" x2="320" y2="207" stroke="#e2e8f0" strokeWidth="1" />

          {[
            { label: 'Safety', x: 110 },
            { label: 'Cost', x: 220 },
            { label: 'Size', x: 310 },
            { label: 'Weight', x: 410 },
          ].map(({ label, x }) => (
            <g key={`c-${label}`}>
              <rect x={x - 40} y={218} width="80" height="24" rx="6" fill="#ef4444" opacity="0.1" stroke="#ef4444" strokeWidth="1.2" />
              <text x={x} y={234} textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">{label}</text>
              {/* Dashed line up to box */}
              <line x1={x} y1={218} x2={x > 150 && x < 370 ? x : x > 300 ? 335 : 185} y2={175} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
            </g>
          ))}

          {/* Side labels */}
          <text x="70" y="46" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold">INPUTS</text>
          <text x="445" y="46" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">OUTPUTS</text>

          {/* Bottom caption */}
          <text x="260" y="275" textAnchor="middle" fill="#94a3b8" fontSize="10">Define what goes in and what comes out -- not how it works inside</text>
        </svg>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Inputs</div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700">Energy, Material, Information</div>
            </div>
            <div className="text-blue-600 text-2xl">&rarr;</div>
            <div className="bg-white border-2 border-blue-500 rounded-xl px-6 py-4 text-center">
              <div className="text-xs text-slate-500">BLACK BOX</div>
              <div className="text-slate-800 font-semibold">Design System</div>
            </div>
            <div className="text-blue-600 text-2xl">&rarr;</div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">Outputs</div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-sm text-emerald-700">Desired Functions</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="font-semibold text-slate-800 text-sm mb-1">Specifications include:</div>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>&bull; Performance requirements</li>
              <li>&bull; Operating environment</li>
              <li>&bull; Size and weight limits</li>
              <li>&bull; Cost targets</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="font-semibold text-amber-700 text-sm mb-1">Key distinction:</div>
            <p className="text-xs text-blue-800/80">
              The need says <em>"we want to keep food fresh."</em>
              The definition says <em>"maintain temperature below 4&deg;C for 72 hours with max weight 2 kg."</em>
            </p>
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
          question="What is the difference between identifying a need and defining the problem?"
          options={[
            'They are the same thing',
            'Need is vague; definition specifies requirements precisely',
            'Definition comes before need',
            'Need focuses on solutions'
          ]}
          correctIndex={1}
          explanation="Identifying a need is recognizing that a problem exists (often vaguely). Defining the problem transforms that vague need into precise engineering specifications with inputs, outputs, and constraints."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 3: Synthesis (Concept Design)</h2>
        <p className="text-slate-600 leading-relaxed">
          Synthesis is the <strong className="text-slate-800">most creative phase</strong> of the design process.
          This is where engineers invent candidate solutions, brainstorm design schemes, and begin quantifying metrics.
        </p>
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
          <div className="font-semibold text-cyan-700 mb-2">What happens during Synthesis:</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Brainstorming', desc: 'Generate many ideas without judgment', icon: '💡' },
              { label: 'Concept Sketches', desc: 'Rough drawings of candidate schemes', icon: '✏️' },
              { label: 'Quantify Metrics', desc: 'Assign preliminary numbers to concepts', icon: '📊' },
              { label: 'Feasibility Check', desc: 'Eliminate obviously impractical ideas', icon: '🔍' },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
                <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-cyan-500 pl-4">
            "Synthesis cannot be learned or done by formula. It requires creativity, ingenuity, and
            the ability to think laterally across disciplinary boundaries."
          </blockquote>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 4: Analysis & Optimization</h2>
        <p className="text-slate-600 leading-relaxed">
          In this phase, engineers build <strong className="text-slate-800">mathematical models</strong> to evaluate
          the performance of each candidate design. Analysis and synthesis are <strong className="text-slate-800">intimately tied</strong> &mdash;
          analysis results frequently lead back to revised synthesis.
        </p>

        {/* Analysis Cycle Diagram */}
        <svg className="w-full" viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="420" height="280" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          <defs>
            <marker id="arrowCycleA" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 1 L7 4 L0 7 Z" fill="#2563eb" />
            </marker>
          </defs>

          {/* Title */}
          <text x="210" y="25" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">ANALYSIS CYCLE</text>

          {/* Node positions: top=210,55  right=345,140  bottom=210,225  left=75,140 */}

          {/* Arrows: curved paths between nodes */}
          {/* Top -> Right */}
          <path d="M280 65 Q340 70 345 110" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowCycleA)" />
          {/* Right -> Bottom */}
          <path d="M345 175 Q340 210 280 220" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowCycleA)" />
          {/* Bottom -> Left */}
          <path d="M140 220 Q80 210 75 175" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowCycleA)" />
          {/* Left -> Top */}
          <path d="M75 110 Q80 70 140 65" stroke="#2563eb" strokeWidth="2" fill="none" markerEnd="url(#arrowCycleA)" />

          {/* Node 1: Build Math Model (top) */}
          <rect x="130" y="42" width="160" height="42" rx="10" fill="#d97706" opacity="0.12" stroke="#d97706" strokeWidth="2" />
          <text x="210" y="60" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Build</text>
          <text x="210" y="75" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Math Model</text>

          {/* Node 2: Evaluate Performance (right) */}
          <rect x="265" y="110" width="160" height="42" rx="10" fill="#2563eb" opacity="0.12" stroke="#2563eb" strokeWidth="2" />
          <text x="345" y="128" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Evaluate</text>
          <text x="345" y="143" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">Performance</text>

          {/* Node 3: Compare to Requirements (bottom) */}
          <rect x="130" y="202" width="160" height="42" rx="10" fill="#10b981" opacity="0.12" stroke="#10b981" strokeWidth="2" />
          <text x="210" y="220" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Compare to</text>
          <text x="210" y="235" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">Requirements</text>

          {/* Node 4: Optimize Parameters (left) */}
          <rect x="-5" y="110" width="160" height="42" rx="10" fill="#7c3aed" opacity="0.12" stroke="#7c3aed" strokeWidth="2" />
          <text x="75" y="128" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">Optimize</text>
          <text x="75" y="143" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">Parameters</text>

          {/* Center label */}
          <text x="210" y="137" textAnchor="middle" fill="#94a3b8" fontSize="10">repeat until</text>
          <text x="210" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">specs are met</text>
        </svg>

        <div className="space-y-2">
          {[
            { step: 'Model the physics', desc: 'Apply stress equations, heat transfer, dynamics, etc.', color: 'border-amber-500 bg-blue-50' },
            { step: 'Evaluate performance', desc: 'Compare predicted performance against specifications', color: 'border-amber-500 bg-blue-50' },
            { step: 'Compare schemes', desc: 'Rank candidate designs using weighted criteria', color: 'border-amber-500 bg-blue-50' },
            { step: 'Optimize', desc: 'Adjust parameters to maximize performance or minimize cost', color: 'border-amber-500 bg-blue-50' },
          ].map(({ step, desc, color }) => (
            <div key={step} className={`flex gap-3 p-3 rounded-lg border ${color}`}>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{step}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          This is where most of this textbook's content lives &mdash; stress analysis, fatigue, deflection,
          and failure theories are all tools for the analysis phase.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Order the Design Phases</h2>
        <p className="text-slate-600">Drag and drop the six phases into the correct sequence:</p>
        <DragAndDrop
          items={designPhases}
          correctOrder={designPhases}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 5: Evaluation</h2>
        <p className="text-slate-600 leading-relaxed">
          Evaluation is the final proof of a design. The design must be tested against the real world
          before it can be approved for production.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Prototype Testing', desc: 'Build and test physical prototypes', icon: '🔧' },
            { label: 'Reliability Assessment', desc: 'Will it perform consistently over its design life?', icon: '📈' },
            { label: 'Manufacturing Feasibility', desc: 'Can it actually be made at scale?', icon: '🏭' },
            { label: 'Cost Analysis', desc: 'Does it meet budget constraints?', icon: '💰' },
            { label: 'Liability Review', desc: 'What are the legal risks if it fails?', icon: '⚖️' },
            { label: 'Insurance', desc: 'Can the product be insured at reasonable cost?', icon: '🛡️' },
          ].map(item => (
            <div key={item.label} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
              <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Phase 6: Presentation</h2>
        <p className="text-slate-600 leading-relaxed">
          The final phase is <strong className="text-slate-800">selling the design</strong>. This is primarily a
          communication task &mdash; and Shigley's emphasizes its critical importance.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-emerald-500 pl-4">
            "Many great designs have been lost because their originators could not explain them
            or sell them to others."
          </blockquote>
        </div>
        <div className="space-y-2 mt-3">
          {[
            'Written reports and documentation',
            'Oral presentations to stakeholders',
            'Engineering drawings and specifications',
            'Demonstration prototypes',
            'Cost and timeline projections',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700">
          Communication skills &mdash; writing, speaking, and visual presentation &mdash; are not optional extras.
          They are essential engineering skills.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
        <Quiz
          question="Which phase involves generating candidate design solutions?"
          options={[
            'Problem Definition',
            'Synthesis',
            'Evaluation',
            'Presentation'
          ]}
          correctIndex={1}
          explanation="Synthesis is the creative phase where engineers brainstorm and generate multiple candidate design solutions. Problem Definition specifies requirements; Evaluation tests against specs; Presentation communicates results."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Fill in the Blank</h2>
        <FillInTheBlank
          question='The design process has ___ major phases.'
          answer={6}
          tolerance={0}
          explanation="Shigley's identifies six phases: Recognition of Need, Problem Definition, Synthesis, Analysis & Optimization, Evaluation, and Presentation."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module2() {
  return (
    <ModuleLayout moduleId="module2" title="The Design Process" icon="🔄" steps={steps} />
  )
}
