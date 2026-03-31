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
        <h2 className="text-2xl font-bold text-blue-600">26 Design Considerations</h2>
        <p className="text-slate-600 leading-relaxed">
          Shigley's &sect;1-3 lists <strong className="text-slate-800">26 design considerations</strong> that engineers
          must weigh when developing any mechanical design. Every project will involve a different subset,
          but awareness of all 26 is essential.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {allConsiderations.map((item, i) => (
            <div key={item} className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 text-center">
              <span className="text-blue-600 font-bold mr-1">{i + 1}.</span>{item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          These range from purely technical (stress, deflection, wear) to business-oriented
          (cost, marketability, liability) to operational (maintenance, lubrication, control).
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Trade-off Principle</h2>
        <p className="text-slate-600 leading-relaxed">
          Design always involves <strong className="text-slate-800">trade-offs</strong>. Improving one consideration
          often worsens another. The art of engineering is finding the best balance.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            "Increasing strength may increase weight and cost. Improving surface finish increases
            manufacturing cost."
          </blockquote>
        </div>
        {/* Trade-off Pareto Frontier Plot */}
        <svg className="w-full" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="460" height="320" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Title */}
          <text x="260" y="28" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Trade-off: Weight vs. Cost</text>

          {/* Axes */}
          {/* Y-axis (Cost, going up = more expensive) */}
          <line x1="80" y1="50" x2="80" y2="250" stroke="#64748b" strokeWidth="2" />
          {/* X-axis (Weight, going right = heavier) */}
          <line x1="80" y1="250" x2="420" y2="250" stroke="#64748b" strokeWidth="2" />

          {/* Y-axis label */}
          <text x="30" y="150" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold" transform="rotate(-90, 30, 150)">Cost ($)</text>
          {/* Y-axis arrow */}
          <polygon points="80,50 76,60 84,60" fill="#64748b" />
          <text x="80" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">expensive</text>

          {/* X-axis label */}
          <text x="260" y="282" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">Weight</text>
          {/* X-axis arrow */}
          <polygon points="420,250 410,246 410,254" fill="#64748b" />
          <text x="420" y="268" textAnchor="end" fill="#94a3b8" fontSize="9">heavy</text>

          {/* Grid lines (light) */}
          <line x1="80" y1="150" x2="420" y2="150" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="80" y1="200" x2="420" y2="200" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="80" y1="100" x2="420" y2="100" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="200" y1="50" x2="200" y2="250" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="300" y1="50" x2="300" y2="250" stroke="#e2e8f0" strokeWidth="1" />

          {/* Pareto frontier curve */}
          <path d="M140 80 Q200 95 250 145 Q300 195 360 220" stroke="#2563eb" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />

          {/* Data point: Titanium (light, expensive) */}
          <circle cx="140" cy="80" r="10" fill="#7c3aed" opacity="0.2" stroke="#7c3aed" strokeWidth="2" />
          <circle cx="140" cy="80" r="4" fill="#7c3aed" />
          <text x="140" y="68" textAnchor="middle" fill="#7c3aed" fontSize="12" fontWeight="bold">Titanium</text>
          <text x="146" y="100" textAnchor="start" fill="#7c3aed" fontSize="9">light, expensive</text>

          {/* Data point: Aluminum (medium, medium) */}
          <circle cx="250" cy="145" r="10" fill="#2563eb" opacity="0.2" stroke="#2563eb" strokeWidth="2" />
          <circle cx="250" cy="145" r="4" fill="#2563eb" />
          <text x="260" y="133" textAnchor="start" fill="#2563eb" fontSize="12" fontWeight="bold">Aluminum</text>
          <text x="260" y="147" textAnchor="start" fill="#2563eb" fontSize="9">balanced</text>

          {/* Data point: Steel (heavy, cheap) */}
          <circle cx="360" cy="220" r="10" fill="#64748b" opacity="0.2" stroke="#64748b" strokeWidth="2" />
          <circle cx="360" cy="220" r="4" fill="#64748b" />
          <text x="360" y="210" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">Steel</text>
          <text x="360" y="240" textAnchor="middle" fill="#64748b" fontSize="9">heavy, cheap</text>

          {/* Pareto frontier label */}
          <text x="260" y="300" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold">Pareto Frontier -- you cannot improve one without worsening the other</text>

          {/* Small arrow annotation on the curve */}
          <text x="320" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9" transform="rotate(-40, 320, 175)">frontier</text>
        </svg>

        <div className="space-y-2 mt-3">
          <div className="text-sm font-semibold text-slate-700 mb-2">Common conflicting pairs:</div>
          {[
            { left: 'Strength', right: 'Weight', desc: 'Stronger parts often require more material' },
            { left: 'Surface Finish', right: 'Cost', desc: 'Finer finishes require more machining time' },
            { left: 'Safety', right: 'Weight', desc: 'Higher safety factors mean more material' },
            { left: 'Reliability', right: 'Cost', desc: 'Higher reliability requires better materials and QC' },
            { left: 'Size', right: 'Manufacturability', desc: 'Smaller parts are harder to machine precisely' },
          ].map(({ left, right, desc }) => (
            <div key={left + right} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="text-sm font-semibold text-red-400 whitespace-nowrap">{left}</span>
              <span className="text-blue-600">&harr;</span>
              <span className="text-sm font-semibold text-blue-400 whitespace-nowrap">{right}</span>
              <span className="text-xs text-slate-500 ml-auto">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Categorize Design Considerations</h2>
        <p className="text-slate-600">Sort these 8 design considerations into the correct category:</p>
        <CategorySort
          items={categorySortItems}
          categories={categorySortCategories}
          correctMapping={categorySortMapping}
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Real-World Trade-offs: Bicycle Frame</h2>
        <p className="text-slate-600 leading-relaxed">
          A bicycle frame demonstrates how material selection involves balancing multiple design considerations simultaneously.
        </p>
        {/* Radar/Spider Chart: Material Comparison */}
        <svg className="w-full" viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="480" height="380" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Title */}
          <text x="240" y="28" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">Material Comparison (Bicycle Frame)</text>

          {/*
            3 axes from center (240, 195):
            Axis 1: Strength - straight up (240, 195) -> (240, 65)  = 130px
            Axis 2: Weight (lighter=better) - lower-left (240, 195) -> (127, 260)  ~(-113, 65) at 210 deg
            Axis 3: Cost (cheaper=better) - lower-right (240, 195) -> (353, 260)  ~(113, 65) at 330 deg

            Scale: 0-100% maps to 0-130px from center
            Directions (from center):
              Strength: dx=0, dy=-1
              Weight(light=good): dx=-sin(30deg)*1= -0.866, dy=cos(30deg)*1 = 0.5
              Cost(cheap=good): dx=sin(30deg)*1= 0.866, dy=0.5

            Ratings (out of 100):
            Steel:    Strength=70, LightWeight=30, CheapCost=90
            Aluminum: Strength=55, LightWeight=70, CheapCost=70
            Titanium: Strength=80, LightWeight=75, CheapCost=20
            Carbon:   Strength=95, LightWeight=95, CheapCost=15
          */}

          {/* Grid rings at 25%, 50%, 75%, 100% */}
          {[0.25, 0.5, 0.75, 1.0].map((scale) => {
            const r = scale * 120;
            const topY = 195 - r;
            const blX = 240 - r * 0.866;
            const blY = 195 + r * 0.5;
            const brX = 240 + r * 0.866;
            const brY = 195 + r * 0.5;
            return (
              <polygon
                key={`grid-${scale}`}
                points={`240,${topY} ${blX},${blY} ${brX},${brY}`}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis lines */}
          <line x1="240" y1="195" x2="240" y2="75" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="240" y1="195" x2="136.08" y2="255" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="240" y1="195" x2="343.92" y2="255" stroke="#cbd5e1" strokeWidth="1" />

          {/* Axis labels */}
          <text x="240" y="58" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Strength</text>
          <text x="118" y="278" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Light Weight</text>
          <text x="118" y="291" textAnchor="middle" fill="#94a3b8" fontSize="9">(lighter = better)</text>
          <text x="362" y="278" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Low Cost</text>
          <text x="362" y="291" textAnchor="middle" fill="#94a3b8" fontSize="9">(cheaper = better)</text>

          {/*
            Helper: point on radar given (strength%, weight%, cost%) out of 100
            Strength axis: (240, 195 - val*1.2)
            Weight axis: (240 - val*1.2*0.866, 195 + val*1.2*0.5)
            Cost axis: (240 + val*1.2*0.866, 195 + val*1.2*0.5)

            Steel: S=70, W=30, C=90
              s: (240, 195-84)=(240,111)
              w: (240-31.2, 195+18)=(208.8, 213)
              c: (240+93.5, 195+54)=(333.5, 249)

            Aluminum: S=55, W=70, C=70
              s: (240, 195-66)=(240,129)
              w: (240-72.7, 195+42)=(167.3, 237)
              c: (240+72.7, 195+42)=(312.7, 237)

            Titanium: S=80, W=75, C=20
              s: (240, 195-96)=(240,99)
              w: (240-77.9, 195+45)=(162.1, 240)
              c: (240+20.8, 195+12)=(260.8, 207)

            Carbon Fiber: S=95, W=95, C=15
              s: (240, 195-114)=(240,81)
              w: (240-98.7, 195+57)=(141.3, 252)
              c: (240+15.6, 195+9)=(255.6, 204)
          */}

          {/* Steel polygon */}
          <polygon
            points="240,111 208.8,213 333.5,249"
            fill="#64748b"
            opacity="0.15"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Aluminum polygon */}
          <polygon
            points="240,129 167.3,237 312.7,237"
            fill="#2563eb"
            opacity="0.15"
            stroke="#2563eb"
            strokeWidth="2"
          />

          {/* Titanium polygon */}
          <polygon
            points="240,99 162.1,240 260.8,207"
            fill="#7c3aed"
            opacity="0.15"
            stroke="#7c3aed"
            strokeWidth="2"
          />

          {/* Carbon Fiber polygon */}
          <polygon
            points="240,81 141.3,252 255.6,204"
            fill="#d97706"
            opacity="0.15"
            stroke="#d97706"
            strokeWidth="2"
          />

          {/* Data point dots */}
          {/* Steel dots */}
          <circle cx="240" cy="111" r="3" fill="#64748b" />
          <circle cx="208.8" cy="213" r="3" fill="#64748b" />
          <circle cx="333.5" cy="249" r="3" fill="#64748b" />

          {/* Aluminum dots */}
          <circle cx="240" cy="129" r="3" fill="#2563eb" />
          <circle cx="167.3" cy="237" r="3" fill="#2563eb" />
          <circle cx="312.7" cy="237" r="3" fill="#2563eb" />

          {/* Titanium dots */}
          <circle cx="240" cy="99" r="3" fill="#7c3aed" />
          <circle cx="162.1" cy="240" r="3" fill="#7c3aed" />
          <circle cx="260.8" cy="207" r="3" fill="#7c3aed" />

          {/* Carbon Fiber dots */}
          <circle cx="240" cy="81" r="3" fill="#d97706" />
          <circle cx="141.3" cy="252" r="3" fill="#d97706" />
          <circle cx="255.6" cy="204" r="3" fill="#d97706" />

          {/* Legend */}
          <rect x="60" y="320" width="12" height="12" rx="2" fill="#64748b" opacity="0.5" stroke="#64748b" strokeWidth="1" />
          <text x="78" y="331" fill="#64748b" fontSize="11" fontWeight="bold">Steel</text>

          <rect x="145" y="320" width="12" height="12" rx="2" fill="#2563eb" opacity="0.5" stroke="#2563eb" strokeWidth="1" />
          <text x="163" y="331" fill="#2563eb" fontSize="11" fontWeight="bold">Aluminum</text>

          <rect x="260" y="320" width="12" height="12" rx="2" fill="#7c3aed" opacity="0.5" stroke="#7c3aed" strokeWidth="1" />
          <text x="278" y="331" fill="#7c3aed" fontSize="11" fontWeight="bold">Titanium</text>

          <rect x="365" y="320" width="12" height="12" rx="2" fill="#d97706" opacity="0.5" stroke="#d97706" strokeWidth="1" />
          <text x="383" y="331" fill="#d97706" fontSize="11" fontWeight="bold">Carbon Fiber</text>

          {/* Subtitle */}
          <text x="240" y="355" textAnchor="middle" fill="#94a3b8" fontSize="10">No single material dominates all three axes -- each excels in different areas</text>
        </svg>

        <div className="space-y-2">
          {[
            { material: 'Steel (4130 Chromoly)', strength: 'High', weight: 'Heavy', cost: 'Low', notes: 'Easy to repair, comfortable ride, proven durability', color: 'border-slate-500 bg-slate-100' },
            { material: 'Aluminum (6061-T6)', strength: 'Moderate', weight: 'Light', cost: 'Moderate', notes: 'Most popular, good balance of properties, cannot be easily repaired', color: 'border-blue-500 bg-blue-50' },
            { material: 'Titanium (Ti-3Al-2.5V)', strength: 'High', weight: 'Light', cost: 'Very High', notes: 'Corrosion-proof, excellent fatigue life, difficult to weld', color: 'border-violet-500 bg-violet-50' },
            { material: 'Carbon Fiber (CFRP)', strength: 'Very High', weight: 'Lightest', cost: 'Very High', notes: 'Tailorable stiffness, but brittle failure mode, no warning before fracture', color: 'border-amber-500 bg-blue-50' },
          ].map(({ material, strength, weight, cost, notes, color }) => (
            <div key={material} className={`p-3 rounded-lg border ${color}`}>
              <div className="font-semibold text-slate-800 text-sm mb-1">{material}</div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-1">
                <span className="text-slate-500">Strength: <span className="text-slate-700">{strength}</span></span>
                <span className="text-slate-500">Weight: <span className="text-slate-700">{weight}</span></span>
                <span className="text-slate-500">Cost: <span className="text-slate-700">{cost}</span></span>
              </div>
              <div className="text-xs text-slate-500">{notes}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          No single material "wins" on every consideration. The best choice depends on the priorities
          of the specific application.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Why 26 Considerations?</h2>
        <p className="text-slate-600 leading-relaxed">
          Why does Shigley's list so many? Because real-world design is complex and multi-dimensional.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-blue-500 pl-4">
            "Some have to do directly with dimensions, material, processing, and joining of the elements
            of the design. Several may be interrelated, which affects the total configuration of the system."
          </blockquote>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="font-semibold text-slate-800 text-sm mb-1">Direct considerations:</div>
            <p className="text-xs text-slate-500">
              Dimensions, material selection, processing methods, and joining techniques are determined
              directly by the engineer.
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="font-semibold text-slate-800 text-sm mb-1">Interrelated effects:</div>
            <p className="text-xs text-slate-500">
              Changing one parameter (e.g., material) cascades through many other considerations
              (weight, cost, manufacturability, corrosion, etc.).
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
          question="Shigley's lists ___ design considerations."
          answer={26}
          tolerance={0}
          explanation="Shigley's Table 1-1 enumerates 26 specific design considerations, from Functionality to Environmental Impact."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
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
