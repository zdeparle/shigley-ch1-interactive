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
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Design Process: 6 Phases</h2>
        <p className="text-slate-300 leading-relaxed">
          The design process from start to finish follows <strong className="text-slate-100">Figure 1-1</strong> in Shigley's.
          It consists of six phases that form an <strong className="text-slate-100">iterative process with feedback loops</strong> &mdash;
          designers frequently revisit earlier phases as new information emerges.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <p className="text-sm text-slate-400 mb-2">Key insight from Shigley's &sect;1-3:</p>
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            "Design is an iterative process &mdash; with many sequences of steps, feedback loops,
            and branches rather than a single linear path."
          </blockquote>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {designPhases.map((phase, i) => (
            <div key={phase} className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548] text-center">
              <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-black flex items-center justify-center text-sm font-bold mx-auto mb-2">{i + 1}</div>
              <div className="text-sm font-semibold text-slate-100">{phase}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Design Process Flowchart</h2>
        <p className="text-slate-300">Click on each phase to learn more about it. Notice the iteration and feedback arrows.</p>
        <FlowDiagram />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 1: Identification of Need</h2>
        <p className="text-slate-300 leading-relaxed">
          The process begins when someone recognizes that a problem exists. Shigley's describes this as:
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-violet-500 pl-4">
            "A vague discontent, a feeling of uneasiness, or a sensing that something is not right."
          </blockquote>
        </div>
        <div className="bg-violet-900/20 border border-violet-700 rounded-lg p-4">
          <div className="font-semibold text-violet-300 mb-2">Example: Food Packaging</div>
          <p className="text-sm text-violet-200/80">
            A food company notices that products are spoiling faster than expected during shipping.
            The need is vague at first &mdash; "our packaging isn't working well enough." This is not yet
            a precisely defined engineering problem, just recognition that improvement is needed.
          </p>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          The need is often expressed by a non-engineer &mdash; a customer, manager, or market analyst.
          It is usually stated in general, non-technical terms.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 2: Problem Definition</h2>
        <p className="text-slate-300 leading-relaxed">
          The engineer must transform the vague need into a <strong className="text-slate-100">precise, engineering specification</strong>.
          Shigley's introduces the <strong className="text-slate-100">black-box model</strong>: defining inputs, outputs, and constraints
          without specifying the internal mechanism.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1">Inputs</div>
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg px-3 py-2 text-sm text-blue-200">Energy, Material, Information</div>
            </div>
            <div className="text-[#f59e0b] text-2xl">&rarr;</div>
            <div className="bg-[#141428] border-2 border-[#f59e0b] rounded-xl px-6 py-4 text-center">
              <div className="text-xs text-slate-500">BLACK BOX</div>
              <div className="text-slate-100 font-semibold">Design System</div>
            </div>
            <div className="text-[#f59e0b] text-2xl">&rarr;</div>
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1">Outputs</div>
              <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg px-3 py-2 text-sm text-emerald-200">Desired Functions</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="font-semibold text-slate-100 text-sm mb-1">Specifications include:</div>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>&bull; Performance requirements</li>
              <li>&bull; Operating environment</li>
              <li>&bull; Size and weight limits</li>
              <li>&bull; Cost targets</li>
            </ul>
          </div>
          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
            <div className="font-semibold text-amber-300 text-sm mb-1">Key distinction:</div>
            <p className="text-xs text-amber-200/80">
              The need says <em>"we want to keep food fresh."</em>
              The definition says <em>"maintain temperature below 4&deg;C for 72 hours with max weight 2 kg."</em>
            </p>
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
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 3: Synthesis (Concept Design)</h2>
        <p className="text-slate-300 leading-relaxed">
          Synthesis is the <strong className="text-slate-100">most creative phase</strong> of the design process.
          This is where engineers invent candidate solutions, brainstorm design schemes, and begin quantifying metrics.
        </p>
        <div className="bg-cyan-900/20 border border-cyan-700 rounded-xl p-4">
          <div className="font-semibold text-cyan-300 mb-2">What happens during Synthesis:</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Brainstorming', desc: 'Generate many ideas without judgment', icon: '💡' },
              { label: 'Concept Sketches', desc: 'Rough drawings of candidate schemes', icon: '✏️' },
              { label: 'Quantify Metrics', desc: 'Assign preliminary numbers to concepts', icon: '📊' },
              { label: 'Feasibility Check', desc: 'Eliminate obviously impractical ideas', icon: '🔍' },
            ].map(item => (
              <div key={item.label} className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="font-semibold text-slate-100 text-sm">{item.label}</div>
                <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-cyan-500 pl-4">
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 4: Analysis & Optimization</h2>
        <p className="text-slate-300 leading-relaxed">
          In this phase, engineers build <strong className="text-slate-100">mathematical models</strong> to evaluate
          the performance of each candidate design. Analysis and synthesis are <strong className="text-slate-100">intimately tied</strong> &mdash;
          analysis results frequently lead back to revised synthesis.
        </p>
        <div className="space-y-2">
          {[
            { step: 'Model the physics', desc: 'Apply stress equations, heat transfer, dynamics, etc.', color: 'border-amber-500 bg-amber-900/20' },
            { step: 'Evaluate performance', desc: 'Compare predicted performance against specifications', color: 'border-amber-500 bg-amber-900/20' },
            { step: 'Compare schemes', desc: 'Rank candidate designs using weighted criteria', color: 'border-amber-500 bg-amber-900/20' },
            { step: 'Optimize', desc: 'Adjust parameters to maximize performance or minimize cost', color: 'border-amber-500 bg-amber-900/20' },
          ].map(({ step, desc, color }) => (
            <div key={step} className={`flex gap-3 p-3 rounded-lg border ${color}`}>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{step}</div>
                <div className="text-xs text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          This is where most of this textbook's content lives &mdash; stress analysis, fatigue, deflection,
          and failure theories are all tools for the analysis phase.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Order the Design Phases</h2>
        <p className="text-slate-300">Drag and drop the six phases into the correct sequence:</p>
        <DragAndDrop
          items={designPhases}
          correctOrder={designPhases}
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 5: Evaluation</h2>
        <p className="text-slate-300 leading-relaxed">
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
            <div key={item.label} className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="font-semibold text-slate-100 text-sm">{item.label}</div>
              <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Phase 6: Presentation</h2>
        <p className="text-slate-300 leading-relaxed">
          The final phase is <strong className="text-slate-100">selling the design</strong>. This is primarily a
          communication task &mdash; and Shigley's emphasizes its critical importance.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-emerald-500 pl-4">
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
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3 text-sm text-emerald-200">
          Communication skills &mdash; writing, speaking, and visual presentation &mdash; are not optional extras.
          They are essential engineering skills.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
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
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Fill in the Blank</h2>
        <FillInTheBlank
          question='The design process has ___ major phases.'
          answer={6}
          tolerance={0}
          explanation="Shigley's identifies six phases: Recognition of Need, Problem Definition, Synthesis, Analysis & Optimization, Evaluation, and Presentation."
          onCorrect={onCorrect}
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
