import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import MatchingPairs from '../components/MatchingPairs'
import CategorySort from '../components/CategorySort'

const toolPairs = [
  { left: 'CAD', right: '3D modeling & drawings' },
  { left: 'FEA', right: 'Stress & deflection analysis' },
  { left: 'CFD', right: 'Fluid flow simulation' },
  { left: 'MATLAB', right: 'Mathematical computation' },
  { left: 'ADAMS', right: 'Mechanism dynamics' },
  { left: 'Excel', right: 'Spreadsheet calculations' },
]

const sourceSortItems = ['NASA', 'ASME', 'Thomas Register', 'NIST', 'SAE', 'McMaster-Carr']
const sourceSortCategories = ['Government', 'Professional Society', 'Commercial']
const sourceSortMapping = {
  NASA: 'Government',
  ASME: 'Professional Society',
  'Thomas Register': 'Commercial',
  NIST: 'Government',
  SAE: 'Professional Society',
  'McMaster-Carr': 'Commercial',
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Modern Design Tools: CAD</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's &sect;1-4 notes: <em className="text-slate-200">"Today the engineer has a great variety of tools
          and resources available to assist in the solution of design problems."</em>
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-100 mb-2">Computer-Aided Design (CAD)</div>
          <p className="text-sm text-slate-400 mb-3">
            CAD software creates 3D solid models that can generate 2D drawings, tool paths for CNC,
            mass properties, and files for 3D printing.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '3D Modeling', desc: 'Parametric solid models of parts and assemblies', icon: '📐' },
              { label: '2D Drawings', desc: 'Automated engineering drawings from 3D models', icon: '📄' },
              { label: 'Mass Properties', desc: 'Volume, weight, center of gravity, moments of inertia', icon: '⚖️' },
              { label: 'Rapid Prototyping', desc: 'Export to 3D printers and CNC machines', icon: '🖨️' },
            ].map(item => (
              <div key={item.label} className="bg-[#141428] rounded-lg p-2.5 border border-[#252548]">
                <div className="text-lg mb-1">{item.icon}</div>
                <div className="font-semibold text-slate-100 text-xs">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {['CATIA', 'SolidWorks', 'Creo (Pro/E)', 'AutoCAD', 'NX (Unigraphics)'].map(sw => (
            <span key={sw} className="px-3 py-1 bg-[#0e0e1e] border border-[#252548] rounded-full text-xs text-slate-300">
              {sw}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Computer-Aided Engineering (CAE)</h2>
        <p className="text-slate-300 leading-relaxed">
          Beyond drawing, engineers use simulation software to predict how designs will perform
          before building physical prototypes.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-4">
            <div className="font-semibold text-blue-300 mb-2">Finite Element Analysis (FEA)</div>
            <p className="text-sm text-blue-200/80 mb-2">
              Predicts stress, deflection, vibration, and heat transfer by dividing geometry into small elements.
            </p>
            <div className="flex flex-wrap gap-2">
              {['ANSYS', 'NASTRAN', 'Abaqus'].map(sw => (
                <span key={sw} className="px-2 py-0.5 bg-blue-900/30 border border-blue-700 rounded text-xs text-blue-200">{sw}</span>
              ))}
            </div>
          </div>
          <div className="bg-cyan-900/20 border border-cyan-700 rounded-xl p-4">
            <div className="font-semibold text-cyan-300 mb-2">Computational Fluid Dynamics (CFD)</div>
            <p className="text-sm text-cyan-200/80 mb-2">
              Simulates fluid flow, pressure distributions, and heat convection.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Fluent', 'Star-CCM+', 'OpenFOAM'].map(sw => (
                <span key={sw} className="px-2 py-0.5 bg-cyan-900/30 border border-cyan-700 rounded text-xs text-cyan-200">{sw}</span>
              ))}
            </div>
          </div>
          <div className="bg-violet-900/20 border border-violet-700 rounded-xl p-4">
            <div className="font-semibold text-violet-300 mb-2">Other Engineering Software</div>
            <div className="grid grid-cols-2 gap-2 text-sm text-violet-200/80">
              <div><strong className="text-violet-300">ADAMS:</strong> Mechanism dynamics simulation</div>
              <div><strong className="text-violet-300">Excel:</strong> Spreadsheet calculations</div>
              <div><strong className="text-violet-300">MATLAB:</strong> Mathematical computation</div>
              <div><strong className="text-violet-300">Maple:</strong> Symbolic math</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Match Tools to Applications</h2>
        <p className="text-slate-300">Match each tool type on the left with its primary application on the right:</p>
        <MatchingPairs
          pairs={toolPairs}
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
          question="A designer needs to predict stress concentrations in a bracket. Which tool type is most appropriate?"
          options={[
            'CAD',
            'FEA',
            'CFD',
            'Spreadsheet'
          ]}
          correctIndex={1}
          explanation="Finite Element Analysis (FEA) is specifically designed to predict stress distributions, including stress concentrations at geometric features like holes, fillets, and notches. CAD creates the geometry but doesn't analyze stresses. CFD handles fluids, not structural stress."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Critical Warning: The Human Factor</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's offers a <strong className="text-slate-100">vital warning</strong> about the use of computer tools:
        </p>
        <div className="bg-red-900/20 border-2 border-red-700 rounded-xl p-5">
          <blockquote className="text-red-200 italic text-lg border-l-4 border-red-500 pl-4">
            "Computer software is no substitute for the human thought process. You are the driver;
            the computer is the vehicle."
          </blockquote>
        </div>
        <div className="space-y-2 mt-3">
          {[
            { issue: 'Garbage in, garbage out', detail: 'Incorrect inputs (wrong material properties, boundary conditions, loads) produce meaningless results that may look professional', icon: '🗑️' },
            { issue: 'Model assumptions', detail: 'Every simulation makes simplifying assumptions. The engineer must understand what they are and when they break down', icon: '⚠️' },
            { issue: 'Software bugs', detail: 'All software has limitations and potential bugs. Results must be validated against hand calculations or known benchmarks', icon: '🐛' },
            { issue: 'False confidence', detail: 'Colorful contour plots can create a false sense of precision. A beautiful visualization does not guarantee a correct answer', icon: '🎨' },
          ].map(({ issue, detail, icon }) => (
            <div key={issue} className="flex gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{issue}</div>
                <div className="text-xs text-slate-400 mt-0.5">{detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Always validate: benchmark test against known solutions, perform hand-calculation spot checks,
          and verify that results make physical sense.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Information Sources & Resources</h2>
        <p className="text-slate-300 leading-relaxed">
          Engineers must know where to find reliable data &mdash; material properties, standards, design codes,
          and component specifications.
        </p>
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
            <div className="font-semibold text-blue-300 text-sm mb-1">Government Agencies</div>
            <p className="text-xs text-blue-200/80">NASA (technical reports), NIST (standards & material data), USPTO (patents)</p>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3">
            <div className="font-semibold text-emerald-300 text-sm mb-1">Professional Societies</div>
            <p className="text-xs text-emerald-200/80">ASME (mechanical standards), SAE (automotive), SME (manufacturing), ASTM (materials testing), AWS (welding)</p>
          </div>
          <div className="bg-violet-900/20 border border-violet-700 rounded-lg p-3">
            <div className="font-semibold text-violet-300 text-sm mb-1">Commercial Sources</div>
            <p className="text-xs text-violet-200/80">Thomas Register (supplier directory), McMaster-Carr (components catalog), vendor catalogs, trade publications</p>
          </div>
          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
            <div className="font-semibold text-amber-300 text-sm mb-1">Other</div>
            <p className="text-xs text-amber-200/80">University libraries, textbooks, handbooks (Machinery's Handbook, Mark's Handbook), Internet resources</p>
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Categorize Information Sources</h2>
        <p className="text-slate-300">Sort these engineering information sources into the correct category:</p>
        <CategorySort
          items={sourceSortItems}
          categories={sourceSortCategories}
          correctMapping={sourceSortMapping}
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
          question="Why must engineers always verify computer simulation results?"
          options={[
            'Computers are always wrong',
            'Incorrect input, model assumptions, or bugs can produce wrong results',
            'Simulations are just for visualization',
            'Only physical testing matters'
          ]}
          correctIndex={1}
          explanation="Computer simulations are powerful but depend on correct inputs, appropriate model assumptions, and bug-free software. Engineers must validate results through hand calculations, benchmark tests, and physical intuition. The computer is a tool, not a replacement for engineering judgment."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module4() {
  return (
    <ModuleLayout moduleId="module4" title="Design Tools & Resources" icon="🖥️" steps={steps} />
  )
}
