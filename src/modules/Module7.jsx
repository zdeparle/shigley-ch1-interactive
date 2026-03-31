import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import PreferredSizeTable from '../components/PreferredSizeTable'
import CostToleranceViz from '../components/CostToleranceViz'
import BreakevenCalc from '../components/BreakevenCalc'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Role of Cost in Design</h2>
        <p className="text-slate-600">
          &ldquo;The consideration of cost plays such an important role in the design decision process...&rdquo; Every engineering decision has economic consequences.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-800 rounded-xl p-4">
            <div className="font-semibold text-red-700 mb-2">Costs That Increase</div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>Raw materials</li>
              <li>Labor wages</li>
              <li>Specialty tooling</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-800 rounded-xl p-4">
            <div className="font-semibold text-emerald-700 mb-2">Costs That Decrease</div>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>Processing (with automation)</li>
              <li>Per-unit cost at volume</li>
              <li>Standardized components</li>
            </ul>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-500">
            Costs vary significantly by plant, city, and overhead structure. A design decision that is economical in one context may not be in another.
          </p>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Standard Sizes Save Money</h2>
        <p className="text-slate-600">
          &ldquo;An engineer who specifies an AISI 1020 bar of 53mm square has added cost, provided that 50 or 60 mm would do.&rdquo;
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="text-sm text-slate-600">
            <strong className="text-slate-800">Preferred sizes</strong> (from Table A-17) are readily stocked by suppliers. Specifying a non-standard size means:
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '💰', label: 'Higher cost', desc: 'Custom milling or ordering' },
              { icon: '🕐', label: 'Longer lead time', desc: 'Not carried in stock' },
              { icon: '📦', label: 'Supply risk', desc: 'Fewer vendors available' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="bg-white rounded-lg p-3 text-center border border-slate-200">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs font-semibold text-slate-700">{label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Remember: not all sizes in a catalog are stocked. Always check availability before specifying.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Preferred Size Selection</h2>
        <p className="text-slate-600">
          Your computed dimension is <span className="font-mono text-blue-600">0.564&quot;</span>. See how it rounds up to the next preferred fractional size:
        </p>
        <PreferredSizeTable computedSize={0.564} />
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
          <div className="text-sm text-slate-500">
            <span className="font-mono text-slate-700">0.564&quot;</span> rounds to the next preferred size: <span className="font-mono text-blue-600">5/8&quot; = 0.625&quot;</span>. This small increase in material ensures availability and lower cost.
          </div>
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Standard Sizes Check</h2>
        <Quiz
          question="Why should a designer specify 50mm instead of 53mm bar stock?"
          options={[
            '53mm is stronger',
            'Preferred sizes are readily available and cheaper',
            '50mm is always the right size',
            'Custom sizes are more precise'
          ]}
          correctIndex={1}
          explanation="Preferred (standard) sizes are carried in stock by suppliers, reducing cost and lead time. Unless the design truly requires 53mm, specifying the nearest preferred size (50mm) is more economical."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Tolerances and Cost</h2>
        <p className="text-slate-600">
          &ldquo;Close tolerances may necessitate additional processing steps or render a part completely impractical to produce economically.&rdquo;
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="text-center">
            <div className="text-sm text-slate-500 mb-2">The tolerance-cost relationship (Figure 1-2):</div>
            <div className="text-xl font-mono text-blue-600">Tighter Tolerance &rarr; Exponentially Higher Cost</div>
          </div>
          <div className="space-y-2">
            {[
              { tol: 'Loose (\u00b10.030")', cost: '$', bar: 'w-1/6', color: 'bg-emerald-500' },
              { tol: 'Medium (\u00b10.010")', cost: '$$', bar: 'w-1/3', color: 'bg-amber-500' },
              { tol: 'Close (\u00b10.003")', cost: '$$$$$', bar: 'w-2/3', color: 'bg-orange-500' },
              { tol: 'Very close (\u00b10.001")', cost: '$$$$$$$$', bar: 'w-full', color: 'bg-red-500' },
            ].map(({ tol, cost, bar, color }) => (
              <div key={tol} className="flex items-center gap-3">
                <div className="w-36 shrink-0 text-xs text-slate-500">{tol}</div>
                <div className="flex-1 bg-white rounded-full h-4 overflow-hidden">
                  <div className={`h-full ${color} ${bar} rounded-full`} />
                </div>
                <div className="w-20 text-right text-xs font-mono text-slate-500">{cost}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Tolerance vs. Cost</h2>
        <p className="text-slate-600">Explore how tightening tolerances impacts manufacturing cost:</p>
        <CostToleranceViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Breakeven Analysis</h2>
        <p className="text-slate-600">
          When choosing between manufacturing methods, cost depends on quantity. The <strong className="text-slate-800">breakeven point</strong> is where two methods cost the same.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="font-semibold text-blue-700 mb-1">Automatic Screw Machine</div>
              <ul className="text-sm text-blue-700 space-y-0.5">
                <li>Rate: 25 parts/hr</li>
                <li>Setup: 3 hours</li>
                <li>Faster per part, but fixed setup cost</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="font-semibold text-purple-700 mb-1">Hand Screw Machine</div>
              <ul className="text-sm text-purple-700 space-y-0.5">
                <li>Rate: 10 parts/hr</li>
                <li>Setup: 0 hours</li>
                <li>Slower per part, but no setup cost</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500">
            &ldquo;There occurs a point corresponding to equal cost, called the breakeven point.&rdquo;
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Breakeven Calculator</h2>
        <p className="text-slate-600">Adjust the parameters and find the breakeven quantity:</p>
        <BreakevenCalc />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate the Breakeven</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div><strong className="text-slate-800">Automatic:</strong> 25 parts/hr, 3 hr setup</div>
          <div><strong className="text-slate-800">Hand:</strong> 10 parts/hr, 0 hr setup</div>
          <div><strong className="text-slate-800">Labor rate:</strong> $20/hr for both</div>
        </div>
        <FillInTheBlank
          question="At what quantity Q do the two methods cost the same?"
          answer={50}
          tolerance={0.01}
          unit=" parts"
          explanation="Auto cost = $20 × (3 + Q/25) = 60 + 0.8Q. Hand cost = $20 × (Q/10) = 2Q. Setting equal: 60 + 0.8Q = 2Q → 60 = 1.2Q → Q = 50 parts."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Check</h2>
        <Quiz
          question="Which factor has the MOST dramatic effect on manufacturing cost?"
          options={[
            'Material selection',
            'Part color',
            'Tolerances and precision',
            'Packaging'
          ]}
          correctIndex={2}
          explanation={'Tolerances have an exponential relationship with cost. Tightening a tolerance from \u00b10.010" to \u00b10.001" can increase manufacturing cost by an order of magnitude due to additional processing steps, slower machining, and higher rejection rates.'}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module7() {
  return (
    <ModuleLayout moduleId="module7" title="Engineering Economics" icon="💰" steps={steps} />
  )
}
