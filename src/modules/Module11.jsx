import { useState } from 'react'
import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import RevealSteps from '../components/RevealSteps'
import InteractiveSlider from '../components/InteractiveSlider'
import BellCurve from '../components/BellCurve'
import ReliabilityChainViz from '../components/ReliabilityChainViz'

// Approximate cumulative normal distribution function
function normalCDF(z) {
  if (z < -6) return 0
  if (z > 6) return 1
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z) / Math.sqrt(2)
  const t = 1 / (1 + p * x)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return 0.5 * (1 + sign * y)
}

function BellCurveInteractive({ onCorrect }) {
  const [mean, setMean] = useState(45)
  const [std, setStd] = useState(5)
  const [zValue, setZValue] = useState(-1.1)

  const xValue = mean + zValue * std
  const probability = normalCDF(zValue)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">Interactive: Normal Distribution</h2>
      <p className="text-slate-600">Adjust the mean, standard deviation, and z-value to explore the normal distribution.</p>

      <div className="space-y-3">
        <InteractiveSlider
          label="Mean (\u03bc)"
          value={mean}
          min={10}
          max={100}
          step={1}
          onChange={setMean}
          format={v => v.toFixed(0)}
          unit=" kpsi"
        />
        <InteractiveSlider
          label="Std Dev (\u03c3\u0302)"
          value={std}
          min={1}
          max={20}
          step={0.5}
          onChange={setStd}
          format={v => v.toFixed(1)}
          unit=" kpsi"
        />
        <InteractiveSlider
          label="z-value"
          value={zValue}
          min={-3.5}
          max={3.5}
          step={0.01}
          onChange={setZValue}
          format={v => v.toFixed(2)}
        />
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <BellCurve
          mean={mean}
          std={std}
          shadeBelow={xValue}
          color="#f59e0b"
          fillColor="#f59e0b"
          label={`x = ${xValue.toFixed(1)} kpsi`}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
          <div className="text-xs text-slate-500">z-score</div>
          <div className="font-mono text-lg font-bold text-blue-600">{zValue.toFixed(2)}</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
          <div className="text-xs text-slate-500">x-value</div>
          <div className="font-mono text-lg font-bold text-slate-700">{xValue.toFixed(1)} kpsi</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
          <div className="text-xs text-slate-500">P(X &le; x)</div>
          <div className="font-mono text-lg font-bold text-emerald-400">{(probability * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 font-mono text-sm text-slate-500 text-center">
        z = (x &minus; &mu;) / &sigma;&circ; = ({xValue.toFixed(1)} &minus; {mean.toFixed(0)}) / {std.toFixed(1)} = <span className="text-blue-600 font-bold">{zValue.toFixed(2)}</span>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Reliability: Why It Matters</h2>
        {/* Stress-Strength Overlap Diagram */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
            {/* Stress curve (red) */}
            <path d="M 60,180 C 60,180 100,178 130,160 C 160,142 180,80 210,40 C 225,20 240,20 255,40 C 270,60 290,142 320,160 C 340,172 360,178 380,180" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="2.5" />
            {/* Strength curve (green) */}
            <path d="M 220,180 C 220,180 260,178 290,160 C 320,142 340,80 370,40 C 385,20 400,20 415,40 C 430,60 450,142 480,160 C 500,172 520,178 540,180" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2.5" />
            {/* Overlap / failure zone (amber shading) */}
            <path d="M 260,180 C 260,178 280,172 300,160 C 310,152 316,140 320,132 L 320,132 C 316,140 310,152 300,160 C 290,168 270,176 260,178 Z" fill="rgba(217,119,6,0.35)" />
            <path d="M 240,180 C 250,176 270,168 290,152 C 305,140 315,120 320,108 C 325,120 340,152 360,168 C 370,174 380,178 385,180 Z" fill="rgba(217,119,6,0.35)" stroke="#d97706" strokeWidth="1" strokeDasharray="4,3" />
            {/* Baseline */}
            <line x1="40" y1="180" x2="560" y2="180" stroke="#64748b" strokeWidth="1" />
            {/* Labels */}
            <text x="210" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ef4444" fontFamily="system-ui">Stress {'\u03C3'}</text>
            <text x="400" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#10b981" fontFamily="system-ui">Strength S</text>
            {/* Failure zone label */}
            <text x="310" y="205" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d97706" fontFamily="system-ui">Failure Zone</text>
            <line x1="310" y1="198" x2="310" y2="175" stroke="#d97706" strokeWidth="1" markerEnd="url(#arrowAmber)" />
            {/* Safety margin arrow */}
            <line x1="255" y1="55" x2="370" y2="55" stroke="#2563eb" strokeWidth="2" markerStart="url(#arrowBlueL)" markerEnd="url(#arrowBlueR)" />
            <text x="312" y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">Safety Margin</text>
            {/* Mean markers */}
            <line x1="210" y1="36" x2="210" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" />
            <line x1="400" y1="36" x2="400" y2="180" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" />
            <text x="210" y="195" textAnchor="middle" fontSize="10" fill="#ef4444" fontFamily="system-ui">{'\u03BC\u03C3'}</text>
            <text x="400" y="195" textAnchor="middle" fontSize="10" fill="#10b981" fontFamily="system-ui">{'\u03BCS'}</text>
            {/* Arrow markers */}
            <defs>
              <marker id="arrowAmber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#d97706" />
              </marker>
              <marker id="arrowBlueR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#2563eb" />
              </marker>
              <marker id="arrowBlueL" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M8,0 L0,3 L8,6" fill="#2563eb" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <blockquote className="text-slate-700 italic border-l-4 border-[#f59e0b] pl-4">
            &ldquo;It is very important for the designer and manufacturer to know the reliability of their product.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-600 leading-relaxed">
          The reliability method requires two things:
        </p>
        <div className="space-y-2">
          {[
            { step: '1', desc: 'Obtain the distribution of stresses at the critical location', color: 'border-red-500 bg-red-50', icon: '\u03c3' },
            { step: '2', desc: 'Obtain the distribution of strengths for the material', color: 'border-emerald-500 bg-emerald-50', icon: 'S' },
            { step: '3', desc: 'Relate the two distributions for an acceptable success rate', color: 'border-amber-500 bg-blue-50', icon: 'R' },
          ].map(({ step, desc, color, icon }) => (
            <div key={step} className={`flex items-center gap-3 p-3 rounded-lg border ${color}`}>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-mono font-bold text-blue-600 shrink-0">{icon}</div>
              <div className="text-sm text-slate-600">{desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          If the stress and strength distributions overlap, there is a nonzero probability of failure. The designer&rsquo;s job is to minimize this overlap.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The Normal (Gaussian) Distribution</h2>
        <p className="text-slate-600 leading-relaxed">
          Most material properties and many loading conditions follow the <strong className="text-slate-800">normal distribution</strong>, described by the probability density function (PDF):
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-mono text-center text-lg text-blue-600 mb-2">
            f(x) = (1/(&sigma;&circ;&radic;2&pi;)) exp[&minus;&frac12;((x&minus;&mu;)/&sigma;&circ;)&sup2;]
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;4)</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="font-semibold text-slate-700 text-sm mb-1">Small &sigma;&circ;</div>
            <div className="text-xs text-slate-500">Taller, narrower bell curve. Data points are tightly clustered around the mean.</div>
            <div className="mt-2 flex justify-center">
              <BellCurve mean={0} std={0.5} width={160} height={80} color="#10b981" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="font-semibold text-slate-700 text-sm mb-1">Large &sigma;&circ;</div>
            <div className="text-xs text-slate-500">Shorter, wider bell curve. Data points are spread out from the mean.</div>
            <div className="mt-2 flex justify-center">
              <BellCurve mean={0} std={1.5} width={160} height={80} color="#ef4444" />
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          The total area under the curve always equals 1 (certainty). The area under any portion gives the probability of a value falling in that range.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">The z-Transform</h2>
        <p className="text-slate-600 leading-relaxed">
          The z-transform standardizes any normal distribution to a standard normal with mean = 0, standard deviation = 1.
        </p>
        {/* Standard Normal Distribution Curve */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg">
            {/* Bell curve path (standard normal) */}
            <path d={
              (() => {
                const pts = [];
                for (let i = -3.5; i <= 3.5; i += 0.1) {
                  const x = 300 + i * 70;
                  const y = 190 - Math.exp(-0.5 * i * i) * 150;
                  pts.push(`${pts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return pts.join(' ');
              })()
            } fill="none" stroke="#64748b" strokeWidth="2.5" />
            {/* Shaded area to the left of z = -1.10 */}
            <path d={
              (() => {
                const pts = [`M 55,190`];
                for (let i = -3.5; i <= -1.1; i += 0.05) {
                  const x = 300 + i * 70;
                  const y = 190 - Math.exp(-0.5 * i * i) * 150;
                  pts.push(`L ${x.toFixed(1)},${y.toFixed(1)}`);
                }
                const xEnd = 300 + (-1.1) * 70;
                pts.push(`L ${xEnd.toFixed(1)},190`);
                pts.push('Z');
                return pts.join(' ');
              })()
            } fill="rgba(37,99,235,0.25)" stroke="none" />
            {/* Vertical line at z = -1.10 */}
            {(() => {
              const xPos = 300 + (-1.1) * 70;
              const yTop = 190 - Math.exp(-0.5 * 1.1 * 1.1) * 150;
              return <line x1={xPos} y1={yTop} x2={xPos} y2={190} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />;
            })()}
            {/* X-axis */}
            <line x1="50" y1="190" x2="550" y2="190" stroke="#64748b" strokeWidth="1" />
            {/* z-value tick marks and labels */}
            {[-3, -2, -1, 0, 1, 2, 3].map(z => {
              const x = 300 + z * 70;
              return (
                <g key={z}>
                  <line x1={x} y1={187} x2={x} y2={193} stroke="#64748b" strokeWidth="1.5" />
                  <text x={x} y={208} textAnchor="middle" fontSize="12" fontWeight={z === 0 ? 'bold' : 'normal'} fill={z === 0 ? '#2563eb' : '#64748b'} fontFamily="system-ui">{z}</text>
                </g>
              );
            })}
            {/* Axis label */}
            <text x="300" y="225" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily="system-ui">z</text>
            {/* Phi label for shaded area */}
            <text x="145" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">{'\u03A6'}(-1.10) = 0.136</text>
            {/* Arrow pointing to shaded region */}
            <line x1="165" y1="173" x2="190" y2="185" stroke="#2563eb" strokeWidth="1" markerEnd="url(#arrowBlueSm)" />
            {/* Formula below curve */}
            <text x="300" y="250" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">z = (x - {'\u03BC'}) / {'\u03C3\u0302'}</text>
            <defs>
              <marker id="arrowBlueSm" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <path d="M0,0 L7,2.5 L0,5" fill="#2563eb" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="font-mono text-center text-2xl text-blue-600 mb-2">
            z = (x &minus; &mu;) / &sigma;&circ;
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;5)</div>
        </div>
        <div className="space-y-2">
          {[
            { z: '-3', meaning: 'x is 3 std devs below mean', pct: '0.13%' },
            { z: '-2', meaning: 'x is 2 std devs below mean', pct: '2.28%' },
            { z: '-1', meaning: 'x is 1 std dev below mean', pct: '15.87%' },
            { z: '0', meaning: 'x equals the mean', pct: '50.00%' },
            { z: '+1', meaning: 'x is 1 std dev above mean', pct: '84.13%' },
            { z: '+2', meaning: 'x is 2 std devs above mean', pct: '97.72%' },
            { z: '+3', meaning: 'x is 3 std devs above mean', pct: '99.87%' },
          ].map(({ z, meaning, pct }) => (
            <div key={z} className="flex items-center gap-3 bg-slate-50 rounded-lg p-2 border border-slate-200">
              <span className="font-mono text-blue-600 font-bold w-10 text-right">{z}</span>
              <span className="text-sm text-slate-600 flex-1">{meaning}</span>
              <span className="font-mono text-xs text-slate-500 w-16 text-right">&Phi; = {pct}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Table A&ndash;10 in Shigley&rsquo;s gives cumulative probability &Phi;(z) = P(Z &le; z) for the standard normal distribution.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <BellCurveInteractive onCorrect={onCorrect} onIncorrect={onIncorrect} />
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;4: Connecting Rod Strength</h2>
        <p className="text-slate-600 leading-relaxed">
          250 connecting rods have been tested for tensile strength, yielding a normal distribution:
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-xs text-slate-500">Sample size</div>
            <div className="font-mono text-xl font-bold text-slate-700">N = 250</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-xs text-slate-500">Mean strength</div>
            <div className="font-mono text-xl font-bold text-blue-600">S&#772; = 45 kpsi</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
            <div className="text-xs text-slate-500">Std deviation</div>
            <div className="font-mono text-xl font-bold text-blue-600">&sigma;&circ; = 5 kpsi</div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <BellCurve mean={45} std={5} shadeBelow={39.5} color="#f59e0b" fillColor="#ef4444" label="Strength (kpsi)" />
          <div className="text-center text-xs text-slate-500 mt-2">
            Red shaded region: rods with strength below 39.5 kpsi
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          Question (a): How many rods have a strength less than 39.5 kpsi?
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;4(a): Rods Below 39.5 kpsi</h2>
        <p className="text-slate-600">
          Transform 39.5 kpsi to a z-score and look up the cumulative probability.
        </p>
        <RevealSteps
          steps={[
            { label: 'Transform to z', math: 'z = (39.5 \u2212 45)/5 = \u22121.10' },
            { label: 'Look up \u03a6(\u22121.10)', math: 'Table A-10: \u03a6(\u22121.10) = 0.1357' },
            { label: 'Number of rods below 39.5', math: 'N \u00d7 \u03a6 = 250 \u00d7 0.1357', result: '\u2248 34 rods', highlight: true },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: z-Score</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-600">
          <div>S&#772; = 45 kpsi, &sigma;&circ; = 5 kpsi, x = 39.5 kpsi</div>
          <div className="font-mono text-slate-700 mt-2">z = (x &minus; &mu;) / &sigma;&circ;</div>
        </div>
        <FillInTheBlank
          question="z = (39.5 &minus; 45)/5 = ___"
          answer={-1.1}
          tolerance={0.02}
          explanation="z = (39.5 &minus; 45)/5 = &minus;5.5/5 = &minus;1.10. This means 39.5 kpsi is 1.10 standard deviations below the mean."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Example 1&ndash;4(b): Rods Between 39.5 and 59.5 kpsi</h2>
        <p className="text-slate-600 leading-relaxed">
          Now find how many rods have strength between 39.5 and 59.5 kpsi.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="space-y-2 font-mono text-sm">
            <div className="text-slate-600">
              z<sub>59.5</sub> = (59.5 &minus; 45)/5 = <span className="text-blue-600 font-bold">2.90</span>
            </div>
            <div className="text-slate-600">
              &Phi;(2.90) = 1 &minus; 0.00187 = <span className="text-blue-600 font-bold">0.99813</span>
            </div>
            <div className="text-slate-600">
              P(between) = 0.99813 &minus; 0.1357 = <span className="text-blue-600 font-bold">0.86243</span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="text-center">
              <span className="text-slate-600 text-sm">Number of rods = 250 &times; 0.862 &asymp; </span>
              <span className="font-mono font-bold text-blue-600 text-lg">216 rods</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <BellCurve mean={45} std={5} shadeBelow={59.5} color="#f59e0b" fillColor="#10b981" label="Strength (kpsi)" />
          <div className="text-center text-xs text-slate-500 mt-2">
            Most rods (86%) fall within the 39.5&ndash;59.5 kpsi range
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Discrete Distributions</h2>
        <p className="text-slate-600 leading-relaxed">
          When data comes as grouped observations (histograms), we use discrete formulas for mean and standard deviation.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
          <div className="space-y-2">
            <div>
              <div className="text-sm text-slate-700 font-semibold mb-1">Mean (Eq 1&ndash;6)</div>
              <div className="font-mono text-blue-600 text-center">
                x&#772; = (1/N) &Sigma; f<sub>i</sub> &middot; x<sub>i</sub>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-700 font-semibold mb-1">Standard Deviation (Eq 1&ndash;7)</div>
              <div className="font-mono text-blue-600 text-center text-sm">
                s<sub>x</sub> = &radic;[(&Sigma;f<sub>i</sub>&middot;x<sub>i</sub>&sup2; &minus; N&middot;x&#772;&sup2;) / (N&minus;1)]
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="font-semibold text-slate-700 mb-2">Example 1&ndash;5: 9 Test Specimens</div>
          <p className="text-sm text-slate-500 mb-3">
            Histogram data from tensile tests of 9 specimens:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <div className="text-xs text-emerald-400">Mean</div>
              <div className="font-mono text-lg font-bold text-emerald-700">x&#772; = 68.2 kpsi</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-xs text-blue-400">Std Deviation</div>
              <div className="font-mono text-lg font-bold text-blue-700">s<sub>x</sub> = 3.39 kpsi</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Reliability R</h2>
        <p className="text-slate-600 leading-relaxed">
          Reliability is the complement of the probability of failure:
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="font-mono text-center text-2xl text-blue-600 mb-2">
            R = 1 &minus; p<sub>f</sub>
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;8)</div>
        </div>
        <div className="space-y-2">
          {[
            { R: '0.999', pf: '1 per 1000', desc: 'Very high reliability' },
            { R: '0.994', pf: '6 per 1000', desc: 'High reliability' },
            { R: '0.99', pf: '10 per 1000', desc: 'Common target' },
            { R: '0.90', pf: '100 per 1000', desc: 'Low reliability' },
          ].map(({ R, pf, desc }) => (
            <div key={R} className="flex items-center gap-3 bg-slate-50 rounded-lg p-2.5 border border-slate-200">
              <span className="font-mono text-blue-600 font-bold w-14">R = {R}</span>
              <span className="text-sm text-slate-600 flex-1">{pf} failures</span>
              <span className="text-xs text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          &ldquo;R = 0.994 means 6 failures per 1000.&rdquo; The designer&rsquo;s task is to select materials, processes, and geometry to achieve the reliability goal.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Series Systems: The Chain Rule</h2>
        {/* Series Chain Diagram */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <svg className="w-full" viewBox="0 0 600 230" xmlns="http://www.w3.org/2000/svg">
            {/* Chain of 5 components */}
            {[0, 1, 2, 3, 4].map(i => {
              const x = 60 + i * 110;
              return (
                <g key={i}>
                  {/* Connecting line (before box) */}
                  {i > 0 && <line x1={x - 50} y1={45} x2={x} y2={45} stroke="#64748b" strokeWidth="2" />}
                  {/* Component box */}
                  <rect x={x} y={20} width="60" height="50" rx="6" fill="#f1f5f9" stroke="#2563eb" strokeWidth="2" />
                  <text x={x + 30} y={40} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="system-ui">R = 0.98</text>
                  <text x={x + 30} y={56} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#64748b" fontFamily="system-ui">#{i + 1}</text>
                </g>
              );
            })}
            {/* Input arrow */}
            <line x1="20" y1="45" x2="60" y2="45" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowGray)" />
            {/* Output arrow */}
            <line x1="560" y1="45" x2="585" y2="45" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowGray)" />
            <text x="15" y="49" textAnchor="end" fontSize="10" fill="#64748b" fontFamily="system-ui">In</text>
            <text x="590" y="49" textAnchor="start" fontSize="10" fill="#64748b" fontFamily="system-ui">Out</text>

            {/* Multiplication equation */}
            <text x="300" y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" fontFamily="system-ui">0.98 {'\u00D7'} 0.98 {'\u00D7'} 0.98 {'\u00D7'} 0.98 {'\u00D7'} 0.98 = 0.904</text>

            {/* Reliability bar visualization */}
            <text x="60" y="130" textAnchor="start" fontSize="10" fill="#64748b" fontFamily="system-ui">System reliability shrinks at each stage:</text>

            {[
              { n: 1, r: 0.98 },
              { n: 2, r: 0.9604 },
              { n: 3, r: 0.9412 },
              { n: 4, r: 0.9224 },
              { n: 5, r: 0.9039 },
            ].map(({ n, r }, i) => {
              const barWidth = r * 480;
              const y = 140 + i * 18;
              return (
                <g key={n}>
                  <rect x="60" y={y} width={barWidth} height="12" rx="3" fill={n <= 3 ? '#10b981' : n === 4 ? '#d97706' : '#ef4444'} opacity="0.7" />
                  <text x={64 + barWidth} y={y + 10} textAnchor="start" fontSize="10" fontWeight="bold" fill={n <= 3 ? '#10b981' : n === 4 ? '#d97706' : '#ef4444'} fontFamily="system-ui">{r.toFixed(4)}</text>
                  <text x="55" y={y + 10} textAnchor="end" fontSize="9" fill="#64748b" fontFamily="system-ui">{n}</text>
                </g>
              );
            })}
            <text x="55" y="225" textAnchor="end" fontSize="9" fill="#64748b" fontFamily="system-ui">#</text>

            <defs>
              <marker id="arrowGray" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <path d="M0,0 L7,2.5 L0,5" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-slate-600 leading-relaxed">
          When a system fails if <strong className="text-slate-800">any one component</strong> fails, the components are in a reliability &ldquo;series.&rdquo;
        </p>
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
          <div className="font-mono text-center text-xl text-blue-600 mb-2">
            R = R<sub>1</sub> &times; R<sub>2</sub> &times; ... &times; R<sub>n</sub>
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;9)</div>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="text-sm text-slate-700 font-semibold mb-1">Example: Two bearings</div>
            <div className="font-mono text-sm text-slate-600">
              R = 0.95 &times; 0.98 = <span className="text-blue-600 font-bold">0.931</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">System reliability is always lower than the weakest component.</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-sm text-red-700 font-semibold mb-1">10 components at 99% each</div>
            <div className="font-mono text-sm text-red-700">
              R = 0.99<sup>10</sup> = <span className="text-red-700 font-bold">0.904</span>
            </div>
            <div className="text-xs text-red-700/60 mt-1">Even &ldquo;highly reliable&rdquo; components produce marginal system reliability when chained together!</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          This is why system-level reliability analysis is critical. A system with many components needs each component to have very high individual reliability.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Interactive: Reliability Chain</h2>
        <p className="text-slate-600">Add, remove, and adjust component reliabilities to see the system effect:</p>
        <ReliabilityChainViz />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Check Your Understanding</h2>
        <Quiz
          question="A drivetrain has 5 components, each R = 0.95. System reliability = ___"
          options={[
            '0.950',
            '0.977',
            '0.774 (0.95\u2075)',
            '0.050'
          ]}
          correctIndex={2}
          explanation="For series systems, R = R\u2081 \u00d7 R\u2082 \u00d7 ... \u00d7 R\u2085 = 0.95\u2075 = 0.7738 \u2248 0.774. The system reliability drops rapidly as more components are added in series, even when each individual component has high reliability."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect, onIncorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Calculate: Series System Reliability</h2>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-sm text-slate-600">
          <div>Two bearings in a gearbox:</div>
          <div className="font-mono text-slate-700">R<sub>1</sub> = 0.95, R<sub>2</sub> = 0.98</div>
          <div className="font-mono text-slate-500 mt-1">R<sub>system</sub> = R<sub>1</sub> &times; R<sub>2</sub></div>
        </div>
        <FillInTheBlank
          question="Two bearings: R\u2081 = 0.95, R\u2082 = 0.98. System R = ___"
          answer={0.931}
          tolerance={0.01}
          explanation="R = 0.95 \u00d7 0.98 = 0.931. The system reliability (93.1%) is lower than either individual bearing's reliability."
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </div>
    )
  },
]

export default function Module11() {
  return (
    <ModuleLayout moduleId="module11" title="Reliability & Probability" icon="📊" steps={steps} />
  )
}
