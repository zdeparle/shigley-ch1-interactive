import ModuleLayout from '../components/ModuleLayout'
import Quiz from '../components/Quiz'
import FillInTheBlank from '../components/FillInTheBlank'
import MatchingPairs from '../components/MatchingPairs'
import RevealSteps from '../components/RevealSteps'
import ToleranceStackViz from '../components/ToleranceStackViz'
import GapAssemblyViz from '../components/GapAssemblyViz'

const steps = [
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Dimensions &amp; Tolerances: The Designer&rsquo;s Language</h2>
        <p className="text-slate-300 leading-relaxed">
          &ldquo;Part of a machine designer&rsquo;s task is to specify parts precisely enough that
          <strong className="text-slate-100"> any manufacturer can make the part to any inspector&rsquo;s satisfaction</strong>.&rdquo;
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Engineering Drawings as Legal Documents</div>
          <p className="text-sm text-slate-400">
            An engineering drawing is not just a communication tool &mdash; it is a <strong className="text-slate-300">legal contract</strong> between the designer, manufacturer, and inspector. Every dimension, tolerance, and note has binding meaning.
          </p>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          If a part is dimensioned ambiguously, any interpretation is technically valid. The responsibility for
          clarity falls on the designer, not the manufacturer.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Key Terminology</h2>
        <p className="text-slate-300 leading-relaxed">
          Precise vocabulary is essential when specifying dimensions and tolerances:
        </p>
        <div className="space-y-2">
          {[
            {
              term: 'Nominal size',
              def: 'The theoretical or ideal dimension, e.g. 1\u00BD-in pipe is actually 1.900 in OD',
              icon: '📏',
              color: 'border-blue-700 bg-blue-900/20',
            },
            {
              term: 'Limits',
              def: 'The maximum and minimum acceptable values of a dimension',
              icon: '📊',
              color: 'border-violet-700 bg-violet-900/20',
            },
            {
              term: 'Tolerance',
              def: 'T = UL \u2212 LL, the total permissible variation in a dimension',
              icon: '📐',
              color: 'border-emerald-700 bg-emerald-900/20',
            },
            {
              term: 'Bilateral tolerance',
              def: '1.005 \u00B1 0.002 \u2014 variation allowed in both directions from nominal',
              icon: '\u2194\uFE0F',
              color: 'border-amber-700 bg-amber-900/20',
            },
            {
              term: 'Unilateral tolerance',
              def: '1.005 +0.004 / \u22120.000 \u2014 variation in only one direction',
              icon: '\u2192',
              color: 'border-cyan-700 bg-cyan-900/20',
            },
          ].map(({ term, def, icon, color }) => (
            <div key={term} className={`flex gap-3 rounded-lg p-3 border ${color}`}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{term}</div>
                <div className="text-xs text-slate-400 mt-0.5">{def}</div>
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">More Key Terms</h2>
        <p className="text-slate-300 leading-relaxed">
          Understanding fits and assembly relationships:
        </p>
        <div className="space-y-2">
          {[
            {
              term: 'Clearance',
              def: 'Internal member is smaller than external member \u2014 a positive gap exists between parts',
              icon: '\u2B55',
              color: 'border-emerald-700 bg-emerald-900/20',
            },
            {
              term: 'Interference',
              def: 'Internal member is larger than external \u2014 press fit required for assembly',
              icon: '\u26D4',
              color: 'border-red-700 bg-red-900/20',
            },
            {
              term: 'Allowance',
              def: 'The minimum clearance or maximum interference \u2014 the tightest acceptable condition',
              icon: '\u2696\uFE0F',
              color: 'border-amber-700 bg-amber-900/20',
            },
            {
              term: 'Fit',
              def: 'The amount of clearance or interference between mating parts',
              icon: '\uD83D\uDD27',
              color: 'border-blue-700 bg-blue-900/20',
            },
            {
              term: 'GD&T',
              def: 'Geometric Dimensioning and Tolerancing \u2014 comprehensive system of symbols for specifying geometry and tolerances on drawings',
              icon: '\u2B1B',
              color: 'border-violet-700 bg-violet-900/20',
            },
          ].map(({ term, def, icon, color }) => (
            <div key={term} className={`flex gap-3 rounded-lg p-3 border ${color}`}>
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <div className="font-semibold text-slate-100 text-sm">{term}</div>
                <div className="text-xs text-slate-400 mt-0.5">{def}</div>
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
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Match the Terms</h2>
        <p className="text-slate-300">Click a term on the left, then click its definition on the right:</p>
        <MatchingPairs
          pairs={[
            { left: 'Nominal size', right: 'Theoretical ideal dimension' },
            { left: 'Tolerance', right: 'UL minus LL' },
            { left: 'Bilateral', right: '\u00B1variation from basic' },
            { left: 'Clearance fit', right: 'Shaft smaller than hole' },
            { left: 'Interference fit', right: 'Press fit assembly' },
            { left: 'Allowance', right: 'Min clearance or max interference' },
          ]}
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Choosing Tolerances Wisely</h2>
        <p className="text-slate-300 leading-relaxed">
          &ldquo;Tolerances should be selected based on functionality, fit, assembly, manufacturing process,
          quality, and cost. <strong className="text-slate-100">Functionality must not be compromised.</strong>&rdquo;
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Tolerance Selection Factors</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { factor: 'Functionality', desc: 'Does the part work correctly?', priority: 'Critical', color: 'text-red-400' },
              { factor: 'Fit & Assembly', desc: 'Can parts be assembled together?', priority: 'Critical', color: 'text-red-400' },
              { factor: 'Mfg. Process', desc: 'What precision can the process achieve?', priority: 'High', color: 'text-amber-400' },
              { factor: 'Quality', desc: 'How many parts will pass inspection?', priority: 'High', color: 'text-amber-400' },
              { factor: 'Cost', desc: 'Tighter = exponentially more expensive', priority: 'Important', color: 'text-blue-400' },
              { factor: 'Less expensive methods', desc: 'Should be selected when possible', priority: 'Goal', color: 'text-emerald-400' },
            ].map(({ factor, desc, priority, color }) => (
              <div key={factor} className="bg-[#141428] rounded-lg p-2.5 border border-[#252548]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-100 text-xs">{factor}</span>
                  <span className={`text-[10px] font-mono ${color}`}>{priority}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-sm text-red-200">
          Tight tolerance = expensive (reference Figure 1&ndash;2). The relationship is exponential &mdash;
          halving the tolerance can more than double the cost.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Don&rsquo;t Over-Specify Dimensions</h2>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Figure 1&ndash;8:</strong> A part with 5 dimensions specified, but only 3 are needed.
          Over-specifying creates contradictions.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">The Over-Specification Problem</div>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
              <div className="font-semibold text-red-300 text-sm mb-1">5 dimensions with &plusmn;1 tolerance each</div>
              <p className="text-xs text-red-200/80">
                If all 5 are specified with tolerances, some dimensions become contradictory.
                The total of sub-dimensions must equal the overall dimension, but tolerances on each
                make it impossible to satisfy all constraints simultaneously.
              </p>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-3">
              <div className="font-semibold text-emerald-300 text-sm mb-1">Solution: specify only 3 dimensions</div>
              <p className="text-xs text-emerald-200/80">
                The designer should determine which three dimensions are most important for function,
                specify those, and let the remaining dimensions be derived.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Rule: Never dimension a part so that a single feature is controlled by more than one tolerance path.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Choosing the Right Dimensions</h2>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Figure 1&ndash;9:</strong> Four different dimension choices for the same part.
          None are incorrect, but they are <strong className="text-slate-100">not equivalent for function</strong>.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-3">Example: Part with Two Holes</div>
          <p className="text-sm text-slate-400 mb-3">
            If the holes must mate with pins on another part, the <strong className="text-slate-300">distance between holes</strong> is
            the critical dimension.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3">
              <div className="font-semibold text-emerald-300 text-sm mb-1">Good: (a) or (b)</div>
              <p className="text-xs text-emerald-200/80">
                Hole-to-hole distance is directly dimensioned. Tolerance on this critical feature is controlled.
              </p>
            </div>
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
              <div className="font-semibold text-red-300 text-sm mb-1">Risky: (c)</div>
              <p className="text-xs text-red-200/80">
                Holes dimensioned from edges. Hole spacing becomes a derived dimension with accumulated tolerance.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          Always dimension the features that matter most for function directly. Let less-critical dimensions absorb the tolerance variation.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Tolerance Stack-Up</h2>
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Chain dimensioning:</strong> tolerances add up along the chain.
          <strong className="text-slate-100"> Baseline dimensioning:</strong> dimensions from a common datum avoid stack-up.
        </p>
        <div className="bg-[#0e0e1e] rounded-xl p-4 border border-[#252548]">
          <div className="font-semibold text-slate-200 mb-2">Figure 1&ndash;9a vs 1&ndash;9d</div>
          <div className="space-y-2 text-sm text-slate-400">
            <div>
              <strong className="text-slate-200">Chain (Figure 1&ndash;9a):</strong> Three &plusmn;1 dimensions in series &rarr; total length has effective
              <span className="font-mono text-red-400"> &plusmn;3</span> tolerance.
            </div>
            <div>
              <strong className="text-slate-200">Baseline (Figure 1&ndash;9d):</strong> Each dimension measured from same datum &rarr; each feature has only
              <span className="font-mono text-emerald-400"> &plusmn;1</span> tolerance from the reference.
            </div>
          </div>
        </div>
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3 text-sm text-amber-200">
          Stack-up is a critical concern in assemblies with many parts. The more dimensions in the chain, the larger the accumulated tolerance.
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Chain vs. Baseline Dimensioning</h2>
        <p className="text-slate-300">Compare the two approaches and explore tolerance stack-up:</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4">
            <div className="font-semibold text-red-300 mb-2">Chain Dimensioning</div>
            <div className="text-sm text-red-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>Tolerances accumulate along the chain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>End-to-end tolerance = sum of all individual tolerances</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">&#x26A0;</span>
                <span>Worst case grows with number of dimensions</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-900/20 border border-emerald-700 rounded-xl p-4">
            <div className="font-semibold text-emerald-300 mb-2">Baseline Dimensioning</div>
            <div className="text-sm text-emerald-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>Each dimension from a common datum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>No tolerance accumulation between features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span>Each feature has independent tolerance</span>
              </div>
            </div>
          </div>
        </div>
        <ToleranceStackViz />
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;7: Gap Analysis</h2>
        <p className="text-slate-300 leading-relaxed">
          A shouldered screw passes through 3 cylindrical sleeves. The gap w between the last sleeve and
          the nut must be at least 0.003 in for the assembly to function.
        </p>
        <div className="space-y-2">
          {[
            { part: 'Screw shank (a)', value: '1.750 \u00B1 0.003 in' },
            { part: 'Sleeve b', value: '0.750 \u00B1 0.001 in' },
            { part: 'Sleeve c', value: '0.120 \u00B1 0.005 in' },
            { part: 'Sleeve d', value: '0.875 \u00B1 0.001 in' },
          ].map(({ part, value }) => (
            <div key={part} className="flex items-center justify-between bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
              <span className="font-semibold text-[#f59e0b] text-sm">{part}</span>
              <span className="font-mono text-slate-200 text-sm">{value}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#0e0e1e] rounded-lg p-3 border border-[#252548]">
          <div className="font-mono text-sm text-slate-300 text-center">
            Gap: <span className="text-[#f59e0b]">w = a &minus; b &minus; c &minus; d</span>
          </div>
          <div className="text-xs text-slate-500 text-center mt-1">
            Requirement: w<sub>min</sub> &ge; 0.003 in
          </div>
        </div>
      </div>
    )
  },
  {
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Interactive: Gap Assembly Visualization</h2>
        <p className="text-slate-300">
          Explore the shouldered screw assembly. Adjust dimensions and tolerances to see how the gap changes:
        </p>
        <GapAssemblyViz />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Example 1&ndash;7: Step-by-Step Solution</h2>
        <p className="text-slate-300">Work through the gap analysis:</p>
        <RevealSteps
          steps={[
            {
              label: 'Mean gap',
              math: 'w\u0304 = a \u2212 b \u2212 c \u2212 d = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875',
              result: '= 0.005 in',
            },
            {
              label: 'Total tolerance',
              math: 'tw = 0.003 + 0.001 + 0.005 + 0.001',
              result: '= \u00B10.010 in',
            },
            {
              label: 'Gap range',
              math: 'wmax = 0.005 + 0.010 = 0.015 in',
              content: 'wmin = 0.005 \u2212 0.010 = \u22120.005 in',
            },
            {
              label: 'Problem!',
              content: 'Both clearance and interference are possible! wmin < 0.003 in requirement',
              highlight: true,
            },
            {
              label: 'Fix: adjust d',
              math: 'w\u0304_new = 0.003 + 0.010 = 0.013 \u2192 d = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.013',
              result: 'd = 0.867 in',
              highlight: true,
            },
          ]}
          onComplete={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate the Mean Gap</h2>
        <FillInTheBlank
          question="w\u0304 = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875 = ___"
          answer={0.005}
          unit=" in"
          tolerance={0.001}
          explanation="The mean gap is the screw shank length minus the sum of all sleeve lengths: w\u0304 = 1.750 \u2212 0.750 \u2212 0.120 \u2212 0.875 = 0.005 in. This is a very small nominal gap."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
  {
    content: ({ onCorrect }) => (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#f59e0b]">Calculate the Total Tolerance</h2>
        <FillInTheBlank
          question="Total tolerance tw = 0.003 + 0.001 + 0.005 + 0.001 = ___"
          answer={0.010}
          unit=" in"
          tolerance={0.001}
          explanation="The total tolerance is the sum of all individual tolerances in the chain: tw = 0.003 + 0.001 + 0.005 + 0.001 = 0.010 in. Since tw (0.010) > w\u0304 (0.005), the gap can go negative \u2014 meaning interference is possible. This is why the design must be adjusted."
          onCorrect={onCorrect}
        />
      </div>
    )
  },
]

export default function Module13() {
  return (
    <ModuleLayout moduleId="module13" title="Dimensions & Tolerances" icon="📐" steps={steps} />
  )
}
