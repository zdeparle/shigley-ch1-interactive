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
      <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Normal Distribution</h2>
      <p className="text-slate-300">Adjust the mean, standard deviation, and z-value to explore the normal distribution.</p>

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

      <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
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
        <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
          <div className="text-xs text-slate-500">z-score</div>
          <div className="font-mono text-lg font-bold text-[#f59e0b]">{zValue.toFixed(2)}</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
          <div className="text-xs text-slate-500">x-value</div>
          <div className="font-mono text-lg font-bold text-slate-200">{xValue.toFixed(1)} kpsi</div>
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
          <div className="text-xs text-slate-500">P(X &le; x)</div>
          <div className="font-mono text-lg font-bold text-emerald-400">{(probability * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548] font-mono text-sm text-slate-400 text-center">
        z = (x &minus; &mu;) / &sigma;&circ; = ({xValue.toFixed(1)} &minus; {mean.toFixed(0)}) / {std.toFixed(1)} = <span className="text-[#f59e0b] font-bold">{zValue.toFixed(2)}</span>
      </div>
    </div>
  )
}

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Reliability: Why It Matters</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <blockquote className="text-slate-200 italic border-l-4 border-[#f59e0b] pl-4">
            &ldquo;It is very important for the designer and manufacturer to know the reliability of their product.&rdquo;
          </blockquote>
        </div>
        <p className="text-slate-300 leading-relaxed">
          The reliability method requires two things:
        </p>
        <div className="space-y-2">
          {[
            { step: '1', desc: 'Obtain the distribution of stresses at the critical location', color: 'border-red-500 bg-red-900/20', icon: '\u03c3' },
            { step: '2', desc: 'Obtain the distribution of strengths for the material', color: 'border-emerald-500 bg-emerald-900/20', icon: 'S' },
            { step: '3', desc: 'Relate the two distributions for an acceptable success rate', color: 'border-amber-500 bg-amber-900/20', icon: 'R' },
          ].map(({ step, desc, color, icon }) => (
            <div key={step} className={`flex items-center gap-3 p-3 rounded-lg border ${color}`}>
              <div className="w-8 h-8 rounded-full bg-[#0a0a16] flex items-center justify-center font-mono font-bold text-[#f59e0b] shrink-0">{icon}</div>
              <div className="text-sm text-slate-300">{desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          If the stress and strength distributions overlap, there is a nonzero probability of failure. The designer&rsquo;s job is to minimize this overlap.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The Normal (Gaussian) Distribution</h2>
        <p className="text-slate-300 leading-relaxed">
          Most material properties and many loading conditions follow the <strong className="text-slate-100">normal distribution</strong>, described by the probability density function (PDF):
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-mono text-center text-lg text-[#f59e0b] mb-2">
            f(x) = (1/(&sigma;&circ;&radic;2&pi;)) exp[&minus;&frac12;((x&minus;&mu;)/&sigma;&circ;)&sup2;]
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;4)</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="font-semibold text-slate-200 text-sm mb-1">Small &sigma;&circ;</div>
            <div className="text-xs text-slate-400">Taller, narrower bell curve. Data points are tightly clustered around the mean.</div>
            <div className="mt-2 flex justify-center">
              <BellCurve mean={0} std={0.5} width={160} height={80} color="#10b981" />
            </div>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="font-semibold text-slate-200 text-sm mb-1">Large &sigma;&circ;</div>
            <div className="text-xs text-slate-400">Shorter, wider bell curve. Data points are spread out from the mean.</div>
            <div className="mt-2 flex justify-center">
              <BellCurve mean={0} std={1.5} width={160} height={80} color="#ef4444" />
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          The total area under the curve always equals 1 (certainty). The area under any portion gives the probability of a value falling in that range.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">The z-Transform</h2>
        <p className="text-slate-300 leading-relaxed">
          The z-transform standardizes any normal distribution to a standard normal with mean = 0, standard deviation = 1.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548]">
          <div className="font-mono text-center text-2xl text-[#f59e0b] mb-2">
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
            <div key={z} className="flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-2 border border-[#252548]">
              <span className="font-mono text-[#f59e0b] font-bold w-10 text-right">{z}</span>
              <span className="text-sm text-slate-300 flex-1">{meaning}</span>
              <span className="font-mono text-xs text-slate-400 w-16 text-right">&Phi; = {pct}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Table A&ndash;10 in Shigley&rsquo;s gives cumulative probability &Phi;(z) = P(Z &le; z) for the standard normal distribution.
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <BellCurveInteractive onCorrect={onCorrect} />
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;4: Connecting Rod Strength</h2>
        <p className="text-slate-300 leading-relaxed">
          250 connecting rods have been tested for tensile strength, yielding a normal distribution:
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
            <div className="text-xs text-slate-500">Sample size</div>
            <div className="font-mono text-xl font-bold text-slate-200">N = 250</div>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
            <div className="text-xs text-slate-500">Mean strength</div>
            <div className="font-mono text-xl font-bold text-[#f59e0b]">S&#772; = 45 kpsi</div>
          </div>
          <div className="bg-[#0e0e1e] rounded-lg p-3 text-center border border-[#252548]">
            <div className="text-xs text-slate-500">Std deviation</div>
            <div className="font-mono text-xl font-bold text-[#f59e0b]">&sigma;&circ; = 5 kpsi</div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <BellCurve mean={45} std={5} shadeBelow={39.5} color="#f59e0b" fillColor="#ef4444" label="Strength (kpsi)" />
          <div className="text-center text-xs text-slate-400 mt-2">
            Red shaded region: rods with strength below 39.5 kpsi
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Question (a): How many rods have a strength less than 39.5 kpsi?
        </div>
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;4(a): Rods Below 39.5 kpsi</h2>
        <p className="text-slate-300">
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
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: z-Score</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] text-sm text-slate-300">
          <div>S&#772; = 45 kpsi, &sigma;&circ; = 5 kpsi, x = 39.5 kpsi</div>
          <div className="font-mono text-slate-200 mt-2">z = (x &minus; &mu;) / &sigma;&circ;</div>
        </div>
        <FillInTheBlank
          question="z = (39.5 &minus; 45)/5 = ___"
          answer={-1.1}
          tolerance={0.02}
          explanation="z = (39.5 &minus; 45)/5 = &minus;5.5/5 = &minus;1.10. This means 39.5 kpsi is 1.10 standard deviations below the mean."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;4(b): Rods Between 39.5 and 59.5 kpsi</h2>
        <p className="text-slate-300 leading-relaxed">
          Now find how many rods have strength between 39.5 and 59.5 kpsi.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-3">
          <div className="space-y-2 font-mono text-sm">
            <div className="text-slate-300">
              z<sub>59.5</sub> = (59.5 &minus; 45)/5 = <span className="text-[#f59e0b] font-bold">2.90</span>
            </div>
            <div className="text-slate-300">
              &Phi;(2.90) = 1 &minus; 0.00187 = <span className="text-[#f59e0b] font-bold">0.99813</span>
            </div>
            <div className="text-slate-300">
              P(between) = 0.99813 &minus; 0.1357 = <span className="text-[#f59e0b] font-bold">0.86243</span>
            </div>
          </div>
          <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-700">
            <div className="text-center">
              <span className="text-slate-300 text-sm">Number of rods = 250 &times; 0.862 &asymp; </span>
              <span className="font-mono font-bold text-[#f59e0b] text-lg">216 rods</span>
            </div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <BellCurve mean={45} std={5} shadeBelow={59.5} color="#f59e0b" fillColor="#10b981" label="Strength (kpsi)" />
          <div className="text-center text-xs text-slate-400 mt-2">
            Most rods (86%) fall within the 39.5&ndash;59.5 kpsi range
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Discrete Distributions</h2>
        <p className="text-slate-300 leading-relaxed">
          When data comes as grouped observations (histograms), we use discrete formulas for mean and standard deviation.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-3">
          <div className="space-y-2">
            <div>
              <div className="text-sm text-slate-200 font-semibold mb-1">Mean (Eq 1&ndash;6)</div>
              <div className="font-mono text-[#f59e0b] text-center">
                x&#772; = (1/N) &Sigma; f<sub>i</sub> &middot; x<sub>i</sub>
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-200 font-semibold mb-1">Standard Deviation (Eq 1&ndash;7)</div>
              <div className="font-mono text-[#f59e0b] text-center text-sm">
                s<sub>x</sub> = &radic;[(&Sigma;f<sub>i</sub>&middot;x<sub>i</sub>&sup2; &minus; N&middot;x&#772;&sup2;) / (N&minus;1)]
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Example 1&ndash;5: 9 Test Specimens</div>
          <p className="text-sm text-slate-400 mb-3">
            Histogram data from tensile tests of 9 specimens:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3 text-center">
              <div className="text-xs text-emerald-400">Mean</div>
              <div className="font-mono text-lg font-bold text-emerald-300">x&#772; = 68.2 kpsi</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-center">
              <div className="text-xs text-blue-400">Std Deviation</div>
              <div className="font-mono text-lg font-bold text-blue-300">s<sub>x</sub> = 3.39 kpsi</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Reliability R</h2>
        <p className="text-slate-300 leading-relaxed">
          Reliability is the complement of the probability of failure:
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548]">
          <div className="font-mono text-center text-2xl text-[#f59e0b] mb-2">
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
            <div key={R} className="flex items-center gap-3 bg-[#0e0e1e] rounded-lg p-2.5 border border-[#252548]">
              <span className="font-mono text-[#f59e0b] font-bold w-14">R = {R}</span>
              <span className="text-sm text-slate-300 flex-1">{pf} failures</span>
              <span className="text-xs text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          &ldquo;R = 0.994 means 6 failures per 1000.&rdquo; The designer&rsquo;s task is to select materials, processes, and geometry to achieve the reliability goal.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Series Systems: The Chain Rule</h2>
        <p className="text-slate-300 leading-relaxed">
          When a system fails if <strong className="text-slate-100">any one component</strong> fails, the components are in a reliability &ldquo;series.&rdquo;
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-5 border border-[#252548]">
          <div className="font-mono text-center text-xl text-[#f59e0b] mb-2">
            R = R<sub>1</sub> &times; R<sub>2</sub> &times; ... &times; R<sub>n</sub>
          </div>
          <div className="text-xs text-slate-500 text-center">(Eq 1&ndash;9)</div>
        </div>
        <div className="space-y-3">
          <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
            <div className="text-sm text-slate-200 font-semibold mb-1">Example: Two bearings</div>
            <div className="font-mono text-sm text-slate-300">
              R = 0.95 &times; 0.98 = <span className="text-[#f59e0b] font-bold">0.931</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">System reliability is always lower than the weakest component.</div>
          </div>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
            <div className="text-sm text-red-200 font-semibold mb-1">10 components at 99% each</div>
            <div className="font-mono text-sm text-red-300">
              R = 0.99<sup>10</sup> = <span className="text-red-200 font-bold">0.904</span>
            </div>
            <div className="text-xs text-red-300/60 mt-1">Even &ldquo;highly reliable&rdquo; components produce marginal system reliability when chained together!</div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          This is why system-level reliability analysis is critical. A system with many components needs each component to have very high individual reliability.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Reliability Chain</h2>
        <p className="text-slate-300">Add, remove, and adjust component reliabilities to see the system effect:</p>
        <ReliabilityChainViz />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Check Your Understanding</h2>
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
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate: Series System Reliability</h2>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548] space-y-2 text-sm text-slate-300">
          <div>Two bearings in a gearbox:</div>
          <div className="font-mono text-slate-200">R<sub>1</sub> = 0.95, R<sub>2</sub> = 0.98</div>
          <div className="font-mono text-slate-400 mt-1">R<sub>system</sub> = R<sub>1</sub> &times; R<sub>2</sub></div>
        </div>
        <FillInTheBlank
          question="Two bearings: R\u2081 = 0.95, R\u2082 = 0.98. System R = ___"
          answer={0.931}
          tolerance={0.01}
          explanation="R = 0.95 \u00d7 0.98 = 0.931. The system reliability (93.1%) is lower than either individual bearing's reliability."
          onCorrect={onCorrect}
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
