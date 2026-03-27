import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import DragAndDrop from '../components/DragAndDrop'

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
        <h2 className="text-2xl font-bold text-[#f59e0b]">What is Engineering Design?</h2>
        <p className="text-slate-300 leading-relaxed">
          Engineering design is an <strong className="text-slate-100">iterative, decision-making process</strong> — not a one-and-done procedure.
          Shigley's defines it as: the formulation of a plan to satisfy a particular need, both explicit and implied.
        </p>
        <div className="bg-[#12122a] rounded-xl p-4 border border-[#2d2d4e]">
          <p className="text-sm text-slate-400 mb-2">Key insight from Shigley's §1-1:</p>
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            "Design is either to formulate a plan for satisfying a specified need or to solve a specific problem."
          </blockquote>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { label: 'Iterative', desc: 'You go back and revise previous decisions', icon: '🔄' },
            { label: 'Decision-making', desc: 'Choose from among multiple valid approaches', icon: '🎯' },
            { label: 'Constrained', desc: 'Subject to real-world limitations', icon: '⚖️' },
            { label: 'Open-ended', desc: 'Multiple acceptable solutions may exist', icon: '🌐' },
          ].map(item => (
            <div key={item.label} className="bg-[#12122a] rounded-lg p-3 border border-[#2d2d4e]">
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
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Design Process: 6 Phases</h2>
        <p className="text-slate-300">Every engineering design follows this iterative sequence. Note: the process often loops back to earlier phases.</p>
        <div className="space-y-2">
          {[
            { n: 1, phase: 'Recognition of Need', desc: 'Identifying that a problem exists or an improvement is possible', color: 'border-violet-500 bg-violet-900/20' },
            { n: 2, phase: 'Problem Definition', desc: 'Specifying what the design must accomplish — goals, constraints, criteria', color: 'border-blue-500 bg-blue-900/20' },
            { n: 3, phase: 'Synthesis', desc: 'Generating candidate design solutions; brainstorming', color: 'border-cyan-500 bg-cyan-900/20' },
            { n: 4, phase: 'Analysis & Optimization', desc: 'Evaluating each solution — stress, deflection, cost, etc.', color: 'border-amber-500 bg-amber-900/20' },
            { n: 5, phase: 'Evaluation', desc: 'Comparing against specifications; prototype/test', color: 'border-orange-500 bg-orange-900/20' },
            { n: 6, phase: 'Presentation', desc: 'Communicating the final design to stakeholders', color: 'border-emerald-500 bg-emerald-900/20' },
          ].map(({ n, phase, desc, color }) => (
            <div key={n} className={`flex gap-3 p-3 rounded-lg border ${color}`}>
              <div className="w-7 h-7 rounded-full bg-[#0f0f1a] flex items-center justify-center text-sm font-bold text-slate-200 shrink-0">{n}</div>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{phase}</div>
                <div className="text-xs text-slate-400">{desc}</div>
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Order the Phases</h2>
        <p className="text-slate-300">Drag and drop the design phases into the correct order:</p>
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design Considerations</h2>
        <p className="text-slate-300">Shigley's §1-2 lists 26 design considerations that engineers must weigh. These vary by project but always involve trade-offs.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            'Functionality', 'Strength/Stress', 'Distortion/Deflection', 'Wear', 'Corrosion',
            'Safety', 'Reliability', 'Manufacturability', 'Utility', 'Cost',
            'Friction', 'Weight', 'Life', 'Noise', 'Styling',
            'Shape', 'Size', 'Control', 'Thermal properties', 'Surface finish',
            'Lubrication', 'Marketability', 'Maintenance', 'Liability', 'Reusability', 'Environmental impact'
          ].map(item => (
            <div key={item} className="text-xs bg-[#12122a] border border-[#2d2d4e] rounded-lg px-2 py-1.5 text-slate-300 text-center">
              {item}
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          ⚠️ Design always involves <strong>trade-offs</strong>. Increasing strength may increase weight and cost. Improving surface finish increases manufacturing cost.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
        <Quiz
          question="Which phase of the design process involves generating multiple possible solutions?"
          options={['Problem Definition', 'Synthesis', 'Evaluation', 'Presentation']}
          correctIndex={1}
          explanation="Synthesis is the creative phase where engineers brainstorm and generate candidate design solutions. Problem Definition specifies requirements; Evaluation tests against specs."
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
      title="The Design Process"
      icon="🔄"
      steps={steps}
    />
  )
}
