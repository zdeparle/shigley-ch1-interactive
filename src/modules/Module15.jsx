import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import SpeedReducerViz from '../components/SpeedReducerViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design Topic Interdependencies</h2>
        <p className="text-slate-300">
          Real mechanical designs are <strong className="text-slate-100">interconnected, not isolated</strong>.
          Changing one component ripples through the entire system.
        </p>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Example: Spur vs. Helical Gear Change</div>
          <div className="space-y-2">
            {[
              { step: 'Gear type', detail: 'Switch from spur gear to helical gear', color: '#f59e0b' },
              { step: 'New forces', detail: 'Helical gears introduce axial thrust forces', color: '#ef4444' },
              { step: 'Shaft design', detail: 'Shaft layout and diameter must accommodate axial loads', color: '#8b5cf6' },
              { step: 'Bearing selection', detail: 'Must change to bearings that handle combined radial + axial loads', color: '#3b82f6' },
              { step: 'Housing design', detail: 'Bearing seats and housing geometry must be updated', color: '#10b981' },
            ].map(({ step, detail, color }, i) => (
              <div key={step} className="flex items-center gap-3">
                {i > 0 && <div className="w-6 text-center text-slate-600">&darr;</div>}
                {i === 0 && <div className="w-6" />}
                <div className="flex-1 bg-[#141428] rounded-lg p-2 border border-[#252548]" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
                  <span className="font-semibold text-sm" style={{ color }}>{step}:</span>
                  <span className="text-sm text-slate-400 ml-2">{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Table 1&ndash;2 in Shigley's maps specific problems across chapters, showing how the same design is revisited with increasing depth throughout the textbook.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Why a Case Study?</h2>
        <p className="text-slate-300">
          Shigley's uses a single, comprehensive case study to help the reader see the
          <strong className="text-slate-100"> interdependence between various design topics</strong>.
        </p>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">The Power Transmission Speed Reducer</div>
          <p className="text-sm text-slate-400 mb-3">
            This case study is introduced in Chapter 1 and revisited throughout the entire textbook,
            culminating in the full assembly design in <strong className="text-slate-300">Chapter 18</strong>.
          </p>
          <div className="space-y-1">
            {[
              { ch: 'Ch 1', topic: 'Problem definition & specifications' },
              { ch: 'Ch 3', topic: 'Load analysis on shafts' },
              { ch: 'Ch 7', topic: 'Shaft design for strength' },
              { ch: 'Ch 11', topic: 'Rolling-contact bearing selection' },
              { ch: 'Ch 13', topic: 'Gear design and analysis' },
              { ch: 'Ch 18', topic: 'Final assembly and complete design' },
            ].map(({ ch, topic }) => (
              <div key={ch} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-[#f59e0b] w-12 shrink-0">{ch}</span>
                <span className="text-slate-300">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Each chapter adds a new layer of analysis to the same design, showing how topics like stress, fatigue, bearings, and gears all connect in practice.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">What Is a Speed Reducer?</h2>
        <p className="text-slate-300">
          A speed reducer (gearbox) converts <strong className="text-slate-100">high-speed, low-torque</strong> motor output
          into <strong className="text-slate-100">low-speed, high-torque</strong> output for the application.
        </p>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="flex items-center justify-between mb-3">
            <div className="text-center">
              <div className="text-2xl">&#x26A1;</div>
              <div className="text-xs text-slate-400">Motor</div>
              <div className="font-mono text-sm text-blue-400">High speed</div>
              <div className="font-mono text-sm text-blue-400">Low torque</div>
            </div>
            <div className="text-[#f59e0b] text-2xl">&rarr;</div>
            <div className="text-center bg-[#141428] rounded-lg p-3 border-2 border-[#f59e0b]">
              <div className="text-2xl">&#x2699;&#xFE0F;</div>
              <div className="text-xs text-[#f59e0b] font-semibold">Speed Reducer</div>
              <div className="font-mono text-xs text-slate-400">Gear train</div>
            </div>
            <div className="text-[#f59e0b] text-2xl">&rarr;</div>
            <div className="text-center">
              <div className="text-2xl">&#x1F3ED;</div>
              <div className="text-xs text-slate-400">Application</div>
              <div className="font-mono text-sm text-emerald-400">Low speed</div>
              <div className="font-mono text-sm text-emerald-400">High torque</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Industrial Applications</div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {[
              { app: 'Conveyor Belts', desc: 'Material handling' },
              { app: 'Blowers & Fans', desc: 'HVAC systems' },
              { app: 'Generators', desc: 'Power generation' },
            ].map(({ app, desc }) => (
              <div key={app} className="bg-[#141428] rounded-lg p-2 border border-[#252548]">
                <div className="text-slate-200 font-semibold">{app}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
          <div className="font-mono text-sm text-slate-300">
            Power balance: <span className="text-[#f59e0b]">P_in &times; &eta; = P_out</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">Since power is roughly conserved (&eta; &gt; 95%), reducing speed must increase torque proportionally.</div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Speed Reducer Layout</h2>
        <p className="text-slate-300">Click each component to explore the specifications of the power transmission system:</p>
        <SpeedReducerViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Customer Requirements (The Need)</h2>
        <p className="text-slate-300">
          Before any engineering begins, we must understand <strong className="text-slate-100">what the customer needs</strong>.
          These are qualitative and quantitative requirements that define the design problem.
        </p>

        <div className="space-y-2">
          {[
            { req: 'Power', spec: '20 hp delivered to application', icon: '&#x26A1;' },
            { req: 'Input speed', spec: '1750 rev/min (standard motor)', icon: '&#x1F504;' },
            { req: 'Output speed', spec: '85 rev/min (approximate)', icon: '&#x1F3AF;' },
            { req: 'Shaft arrangement', spec: 'In-line input and output shafts', icon: '&#x2194;' },
            { req: 'Mounting', spec: 'Base-mounted gearbox', icon: '&#x1F4E6;' },
            { req: 'Operation', spec: 'Continuous duty cycle', icon: '&#x23F0;' },
            { req: 'Design life', spec: '6 years (8 hr/day, 5 day/week)', icon: '&#x1F4C5;' },
            { req: 'Maintenance', spec: 'Low maintenance requirements', icon: '&#x1F527;' },
            { req: 'Cost', spec: 'Competitive with similar products', icon: '&#x1F4B0;' },
          ].map(({ req, spec, icon }) => (
            <div key={req} className="flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <span className="text-lg" dangerouslySetInnerHTML={{ __html: icon }} />
              <div>
                <span className="font-semibold text-[#f59e0b] text-sm">{req}:</span>
                <span className="text-sm text-slate-300 ml-2">{spec}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Design Specifications (The Definition)</h2>
        <p className="text-slate-300">
          Engineering specifications translate customer needs into <strong className="text-slate-100">precise, measurable targets</strong>.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-emerald-400 text-sm mb-2">Performance</div>
            <div className="space-y-1.5 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Efficiency</span>
                <span className="font-mono text-[#f59e0b]">&gt;95%</span>
              </div>
              <div className="flex justify-between">
                <span>Max input speed</span>
                <span className="font-mono text-[#f59e0b]">2400 rpm</span>
              </div>
              <div className="flex justify-between">
                <span>Output speed range</span>
                <span className="font-mono text-[#f59e0b]">82&ndash;88 rpm</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
            <div className="font-semibold text-blue-400 text-sm mb-2">Dimensional</div>
            <div className="space-y-1.5 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Shaft tolerance</span>
                <span className="font-mono text-[#f59e0b]">&plusmn;0.001 in</span>
              </div>
              <div className="flex justify-between">
                <span>Concentricity</span>
                <span className="font-mono text-[#f59e0b]">&plusmn;0.005 in</span>
              </div>
              <div className="flex justify-between">
                <span>Max base footprint</span>
                <span className="font-mono text-[#f59e0b]">14&times;14 in</span>
              </div>
              <div className="flex justify-between">
                <span>Max height</span>
                <span className="font-mono text-[#f59e0b]">22 in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Notice how customer requirements like "competitive cost" and "low maintenance" are now translated into specific engineering numbers that can be verified through analysis.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check: Speed Ratio</h2>
        <FillInTheBlank
          question="Speed ratio = 1750 / 85 = ___"
          answer={20.6}
          tolerance={0.05}
          explanation="The speed ratio tells us the gearbox must reduce speed by approximately 20.6:1. This is a significant reduction that will likely require a compound gear train (multiple stages)."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check: Torque and Speed</h2>
        <Quiz
          question="Since the speed reducer decreases speed, the output torque is ___ the input torque."
          options={[
            'less than',
            'equal to',
            'greater than',
            'unrelated to',
          ]}
          correctIndex={2}
          explanation="Power ≈ Torque × Speed. If speed decreases by ~20× and power is roughly conserved (>95% efficiency), torque must increase by ~20×. This is the fundamental purpose of a speed reducer — trade speed for torque."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Maintenance & Life Specifications</h2>
        <p className="text-slate-300">
          Design life calculations ensure all components last long enough for the intended service.
        </p>

        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Design Life Calculation</div>
          <div className="font-mono text-sm text-slate-300 space-y-1">
            <div>Life = 6 yr &times; 52 wk/yr &times; 5 day/wk &times; 8 hr/day</div>
            <div className="text-[#f59e0b] text-lg font-bold">= 12,480 hours</div>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { item: 'Lubrication check', interval: 'Every 2,000 hours', color: 'emerald' },
            { item: 'Lubrication change', interval: 'Every 8,000 hours', color: 'blue' },
            { item: 'Gears & bearings life', interval: '> 12,000 hours', color: 'amber' },
            { item: 'Shaft life', interval: 'Infinite (no fatigue failure)', color: 'purple' },
            { item: 'All parts', interval: 'Must be individually replaceable', color: 'slate' },
          ].map(({ item, interval, color }) => (
            <div key={item} className={`flex items-center justify-between bg-[#0e0e1e] rounded-lg p-3 border border-${color}-800/50`}>
              <span className={`text-sm font-semibold text-${color}-300`}>{item}</span>
              <span className="text-sm font-mono text-slate-300">{interval}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Gears and bearings must last at least 12,000 hours &mdash; which is close to the 12,480-hour design life. Shafts must have infinite life (no fatigue failure) since they cannot be easily replaced.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Final Check: The Case Study Approach</h2>
        <Quiz
          question="Why does this textbook use a single case study across multiple chapters?"
          options={[
            'To save page space',
            'To demonstrate how design topics are interdependent',
            'Because speed reducers are the only important design',
            'To test memorization',
          ]}
          correctIndex={1}
          explanation="The power transmission case study demonstrates that mechanical design is not a collection of isolated problems. Changing a gear affects the shaft, which affects the bearings, which affects the housing — every topic is interconnected. This holistic view is essential for real engineering practice."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module15() {
  return (
    <ModuleLayout moduleId="module15" title="Case Study: Power Transmission" icon="⚙️" steps={steps} />
  )
}
