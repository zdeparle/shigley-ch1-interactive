import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import SpeedReducerViz from '../components/SpeedReducerViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Design Topic Interdependencies</h2>
        <p className="text-slate-600">
          Real mechanical designs are <strong className="text-slate-800">interconnected, not isolated</strong>.
          Changing one component ripples through the entire system.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Example: Spur vs. Helical Gear Change</div>
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
                <div className="flex-1 bg-white rounded-lg p-2 border border-slate-200" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
                  <span className="font-semibold text-sm" style={{ color }}>{step}:</span>
                  <span className="text-sm text-slate-500 ml-2">{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Table 1&ndash;2 in Shigley's maps specific problems across chapters, showing how the same design is revisited with increasing depth throughout the textbook.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Why a Case Study?</h2>
        <p className="text-slate-600">
          Shigley's uses a single, comprehensive case study to help the reader see the
          <strong className="text-slate-800"> interdependence between various design topics</strong>.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">The Power Transmission Speed Reducer</div>
          <p className="text-sm text-slate-500 mb-3">
            This case study is introduced in Chapter 1 and revisited throughout the entire textbook,
            culminating in the full assembly design in <strong className="text-slate-600">Chapter 18</strong>.
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
                <span className="font-mono text-blue-600 w-12 shrink-0">{ch}</span>
                <span className="text-slate-600">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Each chapter adds a new layer of analysis to the same design, showing how topics like stress, fatigue, bearings, and gears all connect in practice.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">What Is a Speed Reducer?</h2>
        <p className="text-slate-600">
          A speed reducer (gearbox) converts <strong className="text-slate-800">high-speed, low-torque</strong> motor output
          into <strong className="text-slate-800">low-speed, high-torque</strong> output for the application.
        </p>

        {/* Gear Speed Reducer Schematic */}
        <svg className="w-full" viewBox="0 0 640 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrowRotCW" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="#2563eb" />
            </marker>
            <marker id="arrowRotCCW" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="#10b981" />
            </marker>
          </defs>

          {/* Housing */}
          <rect x="160" y="40" width="320" height="210" rx="18" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="0" />
          <rect x="160" y="40" width="320" height="210" rx="18" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          <text x="320" y="68" textAnchor="middle" fontSize="11" fill="#94a3b8" fontWeight="600" fontFamily="system-ui, sans-serif">HOUSING</text>

          {/* Input shaft */}
          <rect x="30" y="138" width="160" height="16" rx="3" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="80" y="132" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">Input Shaft</text>

          {/* Pinion (small gear) */}
          <circle cx="220" cy="146" r="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
          <circle cx="220" cy="146" r="28" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="220" cy="146" r="6" fill="#2563eb" />
          {/* Pinion teeth suggestion */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
            <line key={`pt-${a}`} x1={220 + 35 * Math.cos(a * Math.PI / 180)} y1={146 + 35 * Math.sin(a * Math.PI / 180)} x2={220 + 42 * Math.cos(a * Math.PI / 180)} y2={146 + 42 * Math.sin(a * Math.PI / 180)} stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          <text x="220" y="200" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">Pinion</text>
          <text x="220" y="212" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">(small gear)</text>

          {/* Rotation arrow - input (clockwise) */}
          <path d="M 195 102 A 30 30 0 0 1 245 102" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#arrowRotCW)" />
          <text x="220" y="96" textAnchor="middle" fontSize="8" fill="#2563eb" fontFamily="system-ui, sans-serif">CW</text>

          {/* Large gear */}
          <circle cx="410" cy="146" r="75" fill="#d1fae5" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="410" cy="146" r="60" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="410" cy="146" r="6" fill="#10b981" />
          {/* Gear teeth suggestion */}
          {[0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345].map(a => (
            <line key={`gt-${a}`} x1={410 + 68 * Math.cos(a * Math.PI / 180)} y1={146 + 68 * Math.sin(a * Math.PI / 180)} x2={410 + 77 * Math.cos(a * Math.PI / 180)} y2={146 + 77 * Math.sin(a * Math.PI / 180)} stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          ))}
          <text x="410" y="232" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">Gear</text>
          <text x="410" y="244" textAnchor="middle" fontSize="9" fill="#64748b" fontFamily="system-ui, sans-serif">(large gear)</text>

          {/* Rotation arrow - output (counter-clockwise) */}
          <path d="M 435 68 A 30 30 0 0 0 385 68" fill="none" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowRotCCW)" />
          <text x="410" y="62" textAnchor="middle" fontSize="8" fill="#10b981" fontFamily="system-ui, sans-serif">CCW</text>

          {/* Mesh point indicator */}
          <circle cx="278" cy="146" r="8" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="278" y="168" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ef4444" fontFamily="system-ui, sans-serif">mesh</text>

          {/* Output shaft */}
          <rect x="450" y="138" width="160" height="16" rx="3" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />
          <text x="560" y="132" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">Output Shaft</text>

          {/* Input label */}
          <text x="30" y="176" textAnchor="start" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">Input:</text>
          <text x="30" y="190" textAnchor="start" fontSize="10" fill="#2563eb" fontFamily="system-ui, sans-serif">1750 rpm</text>
          <text x="30" y="203" textAnchor="start" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">Low Torque</text>

          {/* Output label */}
          <text x="610" y="176" textAnchor="end" fontSize="11" fontWeight="bold" fill="#10b981" fontFamily="system-ui, sans-serif">Output:</text>
          <text x="610" y="190" textAnchor="end" fontSize="10" fill="#10b981" fontFamily="system-ui, sans-serif">85 rpm</text>
          <text x="610" y="203" textAnchor="end" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">High Torque</text>

          {/* Speed ratio note */}
          <rect x="220" y="264" width="200" height="26" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
          <text x="320" y="281" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">{"Ratio \u2248 1750/85 \u2248 20.6 : 1"}</text>
        </svg>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-center">
              <div className="text-2xl">&#x26A1;</div>
              <div className="text-xs text-slate-500">Motor</div>
              <div className="font-mono text-sm text-blue-400">High speed</div>
              <div className="font-mono text-sm text-blue-400">Low torque</div>
            </div>
            <div className="text-blue-600 text-2xl">&rarr;</div>
            <div className="text-center bg-white rounded-lg p-3 border-2 border-blue-500">
              <div className="text-2xl">&#x2699;&#xFE0F;</div>
              <div className="text-xs text-blue-600 font-semibold">Speed Reducer</div>
              <div className="font-mono text-xs text-slate-500">Gear train</div>
            </div>
            <div className="text-blue-600 text-2xl">&rarr;</div>
            <div className="text-center">
              <div className="text-2xl">&#x1F3ED;</div>
              <div className="text-xs text-slate-500">Application</div>
              <div className="font-mono text-sm text-emerald-400">Low speed</div>
              <div className="font-mono text-sm text-emerald-400">High torque</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">Industrial Applications</div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {[
              { app: 'Conveyor Belts', desc: 'Material handling' },
              { app: 'Blowers & Fans', desc: 'HVAC systems' },
              { app: 'Generators', desc: 'Power generation' },
            ].map(({ app, desc }) => (
              <div key={app} className="bg-white rounded-lg p-2 border border-slate-200">
                <div className="text-slate-700 font-semibold">{app}</div>
                <div className="text-xs text-slate-500">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
          <div className="font-mono text-sm text-slate-600">
            Power balance: <span className="text-blue-600">P_in &times; &eta; = P_out</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">Since power is roughly conserved (&eta; &gt; 95%), reducing speed must increase torque proportionally.</div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Speed Reducer Layout</h2>
        <p className="text-slate-600">Click each component to explore the specifications of the power transmission system:</p>
        <SpeedReducerViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Customer Requirements (The Need)</h2>
        <p className="text-slate-600">
          Before any engineering begins, we must understand <strong className="text-slate-800">what the customer needs</strong>.
          These are qualitative and quantitative requirements that define the design problem.
        </p>

        {/* Specification Sheet Visual */}
        <svg className="w-full" viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer border - document look */}
          <rect x="10" y="6" width="460" height="268" rx="6" fill="white" stroke="#94a3b8" strokeWidth="2" />
          {/* Shadow effect */}
          <rect x="14" y="10" width="460" height="268" rx="6" fill="none" stroke="#e2e8f0" strokeWidth="1" />

          {/* Header bar */}
          <rect x="10" y="6" width="460" height="44" rx="6" fill="#2563eb" />
          <rect x="10" y="30" width="460" height="20" fill="#2563eb" />
          <text x="240" y="34" textAnchor="middle" fontSize="15" fontWeight="bold" fill="white" fontFamily="system-ui, sans-serif" letterSpacing="2">DESIGN REQUIREMENTS</text>

          {/* Horizontal rules */}
          <line x1="30" y1="55" x2="450" y2="55" stroke="#e2e8f0" strokeWidth="1" />

          {/* Column headers */}
          <text x="50" y="74" fontSize="10" fontWeight="bold" fill="#64748b" fontFamily="system-ui, sans-serif" letterSpacing="1">PARAMETER</text>
          <text x="280" y="74" fontSize="10" fontWeight="bold" fill="#64748b" fontFamily="system-ui, sans-serif" letterSpacing="1">SPECIFICATION</text>
          <line x1="30" y1="82" x2="450" y2="82" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Row 1 - Power */}
          <rect x="30" y="88" width="420" height="32" rx="0" fill="#f8fafc" />
          <text x="50" y="109" fontSize="12" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">Power</text>
          <text x="280" y="109" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">20 hp</text>
          <line x1="30" y1="120" x2="450" y2="120" stroke="#e2e8f0" strokeWidth="1" />

          {/* Row 2 - Input Speed */}
          <rect x="30" y="120" width="420" height="32" rx="0" fill="white" />
          <text x="50" y="141" fontSize="12" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">Input Speed</text>
          <text x="280" y="141" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">1750 rpm</text>
          <line x1="30" y1="152" x2="450" y2="152" stroke="#e2e8f0" strokeWidth="1" />

          {/* Row 3 - Output Speed */}
          <rect x="30" y="152" width="420" height="32" rx="0" fill="#f8fafc" />
          <text x="50" y="173" fontSize="12" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">Output Speed</text>
          <text x="280" y="173" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">85 rpm</text>
          <line x1="30" y1="184" x2="450" y2="184" stroke="#e2e8f0" strokeWidth="1" />

          {/* Row 4 - Design Life */}
          <rect x="30" y="184" width="420" height="32" rx="0" fill="white" />
          <text x="50" y="205" fontSize="12" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">Design Life</text>
          <text x="280" y="205" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">6 years (12,480 hr)</text>
          <line x1="30" y1="216" x2="450" y2="216" stroke="#e2e8f0" strokeWidth="1" />

          {/* Row 5 - Duty Cycle */}
          <rect x="30" y="216" width="420" height="32" rx="0" fill="#f8fafc" />
          <text x="50" y="237" fontSize="12" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">Duty Cycle</text>
          <text x="280" y="237" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui, sans-serif">Continuous (8 hr/day, 5 day/wk)</text>
          <line x1="30" y1="248" x2="450" y2="248" stroke="#94a3b8" strokeWidth="1" />

          {/* Footer */}
          <text x="240" y="264" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="system-ui, sans-serif">Speed Reducer Specification  |  Shigley Ch. 1 Case Study</text>
        </svg>

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
            <div key={req} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="text-lg" dangerouslySetInnerHTML={{ __html: icon }} />
              <div>
                <span className="font-semibold text-blue-600 text-sm">{req}:</span>
                <span className="text-sm text-slate-600 ml-2">{spec}</span>
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
        <h2 className="text-2xl font-bold text-blue-600">Design Specifications (The Definition)</h2>
        <p className="text-slate-600">
          Engineering specifications translate customer needs into <strong className="text-slate-800">precise, measurable targets</strong>.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-emerald-400 text-sm mb-2">Performance</div>
            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Efficiency</span>
                <span className="font-mono text-blue-600">&gt;95%</span>
              </div>
              <div className="flex justify-between">
                <span>Max input speed</span>
                <span className="font-mono text-blue-600">2400 rpm</span>
              </div>
              <div className="flex justify-between">
                <span>Output speed range</span>
                <span className="font-mono text-blue-600">82&ndash;88 rpm</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="font-semibold text-blue-400 text-sm mb-2">Dimensional</div>
            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Shaft tolerance</span>
                <span className="font-mono text-blue-600">&plusmn;0.001 in</span>
              </div>
              <div className="flex justify-between">
                <span>Concentricity</span>
                <span className="font-mono text-blue-600">&plusmn;0.005 in</span>
              </div>
              <div className="flex justify-between">
                <span>Max base footprint</span>
                <span className="font-mono text-blue-600">14&times;14 in</span>
              </div>
              <div className="flex justify-between">
                <span>Max height</span>
                <span className="font-mono text-blue-600">22 in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Notice how customer requirements like "competitive cost" and "low maintenance" are now translated into specific engineering numbers that can be verified through analysis.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check: Speed Ratio</h2>
        <FillInTheBlank
          question="Speed ratio = 1750 / 85 = ___"
          answer={20.6}
          tolerance={0.05}
          explanation="The speed ratio tells us the gearbox must reduce speed by approximately 20.6:1. This is a significant reduction that will likely require a compound gear train (multiple stages)."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check: Torque and Speed</h2>
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
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Maintenance & Life Specifications</h2>
        <p className="text-slate-600">
          Design life calculations ensure all components last long enough for the intended service.
        </p>

        {/* Gantt-style Maintenance Timeline */}
        <svg className="w-full" viewBox="0 0 620 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Title */}
          <text x="370" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">Maintenance Schedule over 6-Year Design Life</text>

          {/* Y-axis labels */}
          <text x="115" y="68" textAnchor="end" fontSize="10" fontWeight="600" fill="#10b981" fontFamily="system-ui, sans-serif">Lube Check</text>
          <text x="115" y="82" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(every 2,000 hr)</text>

          <text x="115" y="118" textAnchor="end" fontSize="10" fontWeight="600" fill="#2563eb" fontFamily="system-ui, sans-serif">Lube Change</text>
          <text x="115" y="132" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(every 8,000 hr)</text>

          <text x="115" y="168" textAnchor="end" fontSize="10" fontWeight="600" fill="#d97706" fontFamily="system-ui, sans-serif">Bearing/Gear Life</text>
          <text x="115" y="182" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(12,000+ hr)</text>

          <text x="115" y="218" textAnchor="end" fontSize="10" fontWeight="600" fill="#7c3aed" fontFamily="system-ui, sans-serif">Shaft Life</text>
          <text x="115" y="232" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="system-ui, sans-serif">(infinite)</text>

          {/* Grid area background */}
          <rect x="125" y="36" width="480" height="212" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

          {/* Vertical grid lines for each year + labels */}
          {[0,1,2,3,4,5,6].map(yr => (
            <g key={`yr-${yr}`}>
              <line x1={125 + yr * 80} y1="36" x2={125 + yr * 80} y2="248" stroke="#e2e8f0" strokeWidth={yr === 0 || yr === 6 ? 0 : 1} />
              <text x={125 + yr * 80} y="258" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">{`Yr ${yr}`}</text>
            </g>
          ))}

          {/* --- Lube Check row: quarterly ticks (every ~0.25 year) --- */}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(q => (
            <g key={`lc-${q}`}>
              <rect x={125 + (q / 4) * 80 - 3} y="58" width="6" height="20" rx="2" fill="#10b981" fillOpacity="0.7" />
            </g>
          ))}

          {/* --- Lube Change row: yearly marks (every ~1 year) --- */}
          {[1,2,3,4,5,6].map(y => (
            <g key={`lch-${y}`}>
              <rect x={125 + y * 80 - 8} y="108" width="16" height="24" rx="3" fill="#2563eb" fillOpacity="0.75" />
            </g>
          ))}

          {/* --- Bearing/Gear Life row: long bar from 0 to ~5.77 years (12000/2080) --- */}
          <rect x="127" y="160" width={80 * (12000 / 2080)} height="24" rx="6" fill="#d97706" fillOpacity="0.3" stroke="#d97706" strokeWidth="1.5" />
          <text x={127 + 80 * (12000 / 2080) / 2} y="176" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706" fontFamily="system-ui, sans-serif">{"12,000 hr min life"}</text>

          {/* --- Shaft Life row: full bar spanning all 6 years --- */}
          <rect x="127" y="210" width={80 * 6 - 4} height="24" rx="6" fill="#7c3aed" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
          <text x={127 + (80 * 6 - 4) / 2} y="226" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">{"Infinite life (no fatigue failure)"}</text>
          <text x={127 + 80 * 6 + 2} y="226" textAnchor="start" fontSize="9" fill="#7c3aed" fontFamily="system-ui, sans-serif">&#x221E;</text>
        </svg>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-3">Design Life Calculation</div>
          <div className="font-mono text-sm text-slate-600 space-y-1">
            <div>Life = 6 yr &times; 52 wk/yr &times; 5 day/wk &times; 8 hr/day</div>
            <div className="text-blue-600 text-lg font-bold">= 12,480 hours</div>
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
            <div key={item} className={`flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-${color}-800/50`}>
              <span className={`text-sm font-semibold text-${color}-300`}>{item}</span>
              <span className="text-sm font-mono text-slate-600">{interval}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          Gears and bearings must last at least 12,000 hours &mdash; which is close to the 12,480-hour design life. Shafts must have infinite life (no fatigue failure) since they cannot be easily replaced.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Final Check: The Case Study Approach</h2>
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
          onIncorrect={onIncorrect}
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
