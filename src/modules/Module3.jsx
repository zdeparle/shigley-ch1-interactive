import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import CategorySort from '../components/CategorySort'

const allConsiderations = [
  'Functionality', 'Strength/Stress', 'Distortion/Deflection', 'Wear', 'Corrosion',
  'Safety', 'Reliability', 'Manufacturability', 'Utility', 'Cost',
  'Friction', 'Weight', 'Life', 'Noise', 'Styling',
  'Shape', 'Size', 'Control', 'Thermal properties', 'Surface finish',
  'Lubrication', 'Marketability', 'Maintenance', 'Liability', 'Reusability', 'Environmental impact'
]

const categorySortItems = ['Strength', 'Cost', 'Reliability', 'Manufacturability', 'Wear', 'Marketability', 'Corrosion', 'Maintenance']
const categorySortCategories = ['Mechanical Performance', 'Business/Manufacturing', 'Operational']
const categorySortMapping = {
  Strength: 'Mechanical Performance',
  Cost: 'Business/Manufacturing',
  Reliability: 'Mechanical Performance',
  Manufacturability: 'Business/Manufacturing',
  Wear: 'Mechanical Performance',
  Marketability: 'Business/Manufacturing',
  Corrosion: 'Mechanical Performance',
  Maintenance: 'Operational',
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">26 Design Considerations</h2>
        <p className="text-slate-300 leading-relaxed">
          Shigley's &sect;1-3 lists <strong className="text-slate-100">26 design considerations</strong> that engineers
          must weigh when developing any mechanical design. Every project will involve a different subset,
          but awareness of all 26 is essential.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allConsiderations.map((item, i) => (
            <div key={item} className="text-xs bg-[#0e0e1e] border border-[#252548] rounded-lg px-2 py-1.5 text-slate-300 text-center">
              <span className="text-[#f59e0b] font-bold mr-1">{i + 1}.</span>{item}
            </div>
          ))}
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          These range from purely technical (stress, deflection, wear) to business-oriented
          (cost, marketability, liability) to operational (maintenance, lubrication, control).
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Trade-off Principle</h2>
        <p className="text-slate-300 leading-relaxed">
          Design always involves <strong className="text-slate-100">trade-offs</strong>. Improving one consideration
          often worsens another. The art of engineering is finding the best balance.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            "Increasing strength may increase weight and cost. Improving surface finish increases
            manufacturing cost."
          </blockquote>
        </div>
        <div className="space-y-2 mt-3">
          <div className="text-sm font-semibold text-slate-200 mb-2">Common conflicting pairs:</div>
          {[
            { left: 'Strength', right: 'Weight', desc: 'Stronger parts often require more material' },
            { left: 'Surface Finish', right: 'Cost', desc: 'Finer finishes require more machining time' },
            { left: 'Safety', right: 'Weight', desc: 'Higher safety factors mean more material' },
            { left: 'Reliability', right: 'Cost', desc: 'Higher reliability requires better materials and QC' },
            { left: 'Size', right: 'Manufacturability', desc: 'Smaller parts are harder to machine precisely' },
          ].map(({ left, right, desc }) => (
            <div key={left + right} className="flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <span className="text-sm font-semibold text-red-400 whitespace-nowrap">{left}</span>
              <span className="text-[#f59e0b]">&harr;</span>
              <span className="text-sm font-semibold text-blue-400 whitespace-nowrap">{right}</span>
              <span className="text-xs text-slate-500 ml-auto">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Categorize Design Considerations</h2>
        <p className="text-slate-300">Sort these 8 design considerations into the correct category:</p>
        <CategorySort
          items={categorySortItems}
          categories={categorySortCategories}
          correctMapping={categorySortMapping}
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
          question="Which design considerations are MOST likely to be in direct conflict?"
          options={[
            'Safety and reliability',
            'Strength and weight',
            'Functionality and utility',
            'Shape and size'
          ]}
          correctIndex={1}
          explanation="Strength and weight are classic conflicting considerations: increasing strength typically requires adding material, which increases weight. Safety and reliability generally align (both improve with better design). Functionality and utility are complementary."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Real-World Trade-offs: Bicycle Frame</h2>
        <p className="text-slate-300 leading-relaxed">
          A bicycle frame demonstrates how material selection involves balancing multiple design considerations simultaneously.
        </p>
        <div className="space-y-2">
          {[
            { material: 'Steel (4130 Chromoly)', strength: 'High', weight: 'Heavy', cost: 'Low', notes: 'Easy to repair, comfortable ride, proven durability', color: 'border-slate-500 bg-slate-900/20' },
            { material: 'Aluminum (6061-T6)', strength: 'Moderate', weight: 'Light', cost: 'Moderate', notes: 'Most popular, good balance of properties, cannot be easily repaired', color: 'border-blue-500 bg-blue-900/20' },
            { material: 'Titanium (Ti-3Al-2.5V)', strength: 'High', weight: 'Light', cost: 'Very High', notes: 'Corrosion-proof, excellent fatigue life, difficult to weld', color: 'border-violet-500 bg-violet-900/20' },
            { material: 'Carbon Fiber (CFRP)', strength: 'Very High', weight: 'Lightest', cost: 'Very High', notes: 'Tailorable stiffness, but brittle failure mode, no warning before fracture', color: 'border-amber-500 bg-amber-900/20' },
          ].map(({ material, strength, weight, cost, notes, color }) => (
            <div key={material} className={`p-3 rounded-lg border ${color}`}>
              <div className="font-semibold text-slate-100 text-sm mb-1">{material}</div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-1">
                <span className="text-slate-400">Strength: <span className="text-slate-200">{strength}</span></span>
                <span className="text-slate-400">Weight: <span className="text-slate-200">{weight}</span></span>
                <span className="text-slate-400">Cost: <span className="text-slate-200">{cost}</span></span>
              </div>
              <div className="text-xs text-slate-500">{notes}</div>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          No single material "wins" on every consideration. The best choice depends on the priorities
          of the specific application.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Why 26 Considerations?</h2>
        <p className="text-slate-300 leading-relaxed">
          Why does Shigley's list so many? Because real-world design is complex and multi-dimensional.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            "Some have to do directly with dimensions, material, processing, and joining of the elements
            of the design. Several may be interrelated, which affects the total configuration of the system."
          </blockquote>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="font-semibold text-slate-100 text-sm mb-1">Direct considerations:</div>
            <p className="text-xs text-slate-400">
              Dimensions, material selection, processing methods, and joining techniques are determined
              directly by the engineer.
            </p>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="font-semibold text-slate-100 text-sm mb-1">Interrelated effects:</div>
            <p className="text-xs text-slate-400">
              Changing one parameter (e.g., material) cascades through many other considerations
              (weight, cost, manufacturability, corrosion, etc.).
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
          question="A designer finds that increasing the wall thickness of a pressure vessel increases safety but makes it too heavy. This is an example of:"
          options={[
            'Design failure',
            'Trade-off between competing considerations',
            'Poor material selection',
            'Manufacturing error'
          ]}
          correctIndex={1}
          explanation="This is a classic trade-off: increasing wall thickness improves safety (lower stress, higher factor of safety) but increases weight. The designer must find a balance, perhaps by choosing a stronger material or optimizing the geometry."
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
          question="Shigley's lists ___ design considerations."
          answer={26}
          tolerance={0}
          explanation="Shigley's Table 1-1 enumerates 26 specific design considerations, from Functionality to Environmental Impact."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module3() {
  return (
    <ModuleLayout moduleId="module3" title="Design Considerations" icon="⚖️" steps={steps} />
  )
}
