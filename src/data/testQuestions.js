// Unique, challenging test questions for each unit gate test.
// These do NOT repeat any questions from the module quizzes.
// 8 questions per test. Pass threshold: 80% (7/8 correct).

const UNIT_TESTS = [
  {
    unitIndex: 0,
    title: 'Foundations of Design',
    subtitle: 'Covers: What is Design, The Design Process, Design Considerations',
    passingScore: 7,
    questions: [
      {
        id: 'u1q1',
        question: 'A designer realizes mid-project that a chosen material cannot withstand thermal cycling. She revisits synthesis to explore alternatives. This best illustrates which property of the design process?',
        options: [
          'The process is linear and sequential',
          'The process is iterative with feedback loops',
          'Evaluation always precedes synthesis',
          'Material selection is independent of design phases',
        ],
        correct: 1,
      },
      {
        id: 'u1q2',
        question: 'During the "Definition of Problem" phase, an engineer creates a black-box model. Which of the following would NOT typically be part of this model?',
        options: [
          'Required input energy and motion',
          'Output force and speed specifications',
          'A detailed bill of materials',
          'Environmental constraints and limitations',
        ],
        correct: 2,
      },
      {
        id: 'u1q3',
        question: 'A bicycle frame must be lightweight yet affordable. Increasing strength requires thicker walls (more weight) or exotic alloys (more cost). This conflict between strength, weight, and cost is an example of:',
        options: [
          'Design factor calculation',
          'Trade-off analysis among design considerations',
          'Tolerance stack-up accumulation',
          'Breakeven cost optimization',
        ],
        correct: 1,
      },
      {
        id: 'u1q4',
        question: 'If a team completes synthesis, analysis, and evaluation — then discovers a fundamental flaw — they must return to an earlier phase. The arrows in Figure 1-1 that represent this are labeled:',
        options: [
          'Forward arrows only',
          'Iteration (right side) and Feedback (left side)',
          'Convergence arrows',
          'Phase-gate checkpoints',
        ],
        correct: 1,
      },
      {
        id: 'u1q5',
        question: 'An engineer has designed a component and must now communicate the design to management for funding. Which phase of the design process is this?',
        options: [
          'Evaluation',
          'Analysis & Optimization',
          'Presentation',
          'Definition of Problem',
        ],
        correct: 2,
      },
      {
        id: 'u1q6',
        question: 'Shigley lists 26 design considerations. Which statement is TRUE about these considerations?',
        options: [
          'They are listed in strict order of priority',
          'Every consideration must be addressed equally in every design',
          'They are not in priority order — importance depends on the specific design',
          'Only the first 10 are relevant to mechanical design',
        ],
        correct: 2,
      },
      {
        id: 'u1q7',
        question: 'A journal bearing design requires knowledge of fluid mechanics, heat transfer, and materials science. According to Shigley, this illustrates that:',
        options: [
          'Journal bearings should only be designed by specialists',
          'Real problems resist compartmentalization into neat engineering subdisciplines',
          'Heat transfer is more important than materials in bearing design',
          'Fluid mechanics courses should replace materials courses',
        ],
        correct: 1,
      },
      {
        id: 'u1q8',
        question: 'What is the key distinction between "design" and "analysis" in engineering?',
        options: [
          'Design uses computers; analysis uses hand calculations',
          'Design is open-ended synthesis of solutions; analysis is closed-form evaluation of a specific design',
          'Analysis is more creative than design',
          'Design only involves drawings; analysis only involves equations',
        ],
        correct: 1,
      },
    ],
  },
  {
    unitIndex: 1,
    title: 'Professional Context',
    subtitle: 'Covers: Design Tools, Professional Practice, Standards & Codes',
    passingScore: 7,
    questions: [
      {
        id: 'u2q1',
        question: 'A CFD simulation of airflow over a heat sink shows unexpectedly low thermal resistance. Before proceeding, the engineer should:',
        options: [
          'Accept the result — CFD is always accurate',
          'Verify results by checking mesh sensitivity, boundary conditions, and comparing with empirical correlations',
          'Discard CFD entirely and use only hand calculations',
          'Increase the mesh density to maximum and re-run without checking inputs',
        ],
        correct: 1,
      },
      {
        id: 'u2q2',
        question: 'A pressure vessel is designed to ASME Boiler and Pressure Vessel Code standards. A customer asks: "Does meeting the code guarantee the vessel will never fail?" The correct answer is:',
        options: [
          'Yes — meeting the code means absolute safety',
          'No — codes address probable conditions, not all conceivable situations',
          'Yes — codes cover every possible loading scenario',
          'No — codes are voluntary guidelines with no real authority',
        ],
        correct: 1,
      },
      {
        id: 'u2q3',
        question: 'The systematic problem-solving approach in §1-5 begins with "Understand the problem" and ends with "Present results." The step immediately after identifying knowns and unknowns is:',
        options: [
          'Evaluate results',
          'State all assumptions and decisions',
          'Begin calculations',
          'Build a prototype',
        ],
        correct: 1,
      },
      {
        id: 'u2q4',
        question: 'Which pair correctly matches the organization to its primary domain?',
        options: [
          'AGMA → Welding, AWS → Gears',
          'AGMA → Gears, AWS → Welding',
          'ASTM → Pressure vessels, ASME → Materials testing',
          'SAE → Steel structures, AISC → Automotive',
        ],
        correct: 1,
      },
      {
        id: 'u2q5',
        question: 'An engineer\'s dated logbook can serve as critical evidence in which of the following scenarios?',
        options: [
          'Patent disputes and product liability cases',
          'Marketing presentations only',
          'Company holiday party planning',
          'Employee performance reviews exclusively',
        ],
        correct: 0,
      },
      {
        id: 'u2q6',
        question: 'FEA software can compute stress distributions in complex geometries. Shigley warns that the computer is the "vehicle" and the engineer is the "driver." This means:',
        options: [
          'The engineer should always trust software output without question',
          'Engineers must understand the underlying theory to correctly set up, interpret, and validate results',
          'FEA has completely replaced hand calculations',
          'Only software vendors should interpret FEA results',
        ],
        correct: 1,
      },
      {
        id: 'u2q7',
        question: 'The key difference between a "standard" and a "code" is:',
        options: [
          'Standards are written by government; codes by industry',
          'Standards specify uniformity in parts/materials; codes specify safety requirements for design and construction',
          'Codes are optional; standards are mandatory',
          'There is no meaningful difference between the two',
        ],
        correct: 1,
      },
      {
        id: 'u2q8',
        question: 'According to the NSPE Engineers\' Creed, an engineer\'s primary obligation is to:',
        options: [
          'Maximize corporate profit above all else',
          'Hold public welfare paramount over personal gain',
          'Develop the most technically complex solutions',
          'Minimize project duration regardless of quality',
        ],
        correct: 1,
      },
    ],
  },
  {
    unitIndex: 2,
    title: 'Economics & Safety',
    subtitle: 'Covers: Engineering Economics, Safety & Product Liability',
    passingScore: 7,
    questions: [
      {
        id: 'u3q1',
        question: 'An automatic machine produces 30 parts/hr with a 4-hour setup. A hand machine produces 8 parts/hr with no setup. Labor costs $25/hr for both. At what production quantity does the automatic machine become cheaper?',
        options: [
          'About 44 parts',
          'About 109 parts',
          'About 200 parts',
          'About 30 parts',
        ],
        correct: 0,
      },
      {
        id: 'u3q2',
        question: 'A computed shaft diameter is 1.37 inches. Using Table A-17 preferred sizes (in inches: ... 1.25, 1.375, 1.5 ...), the correct specification is:',
        options: [
          '1.37 in (use computed value)',
          '1.25 in (round down to save cost)',
          '1.375 in (next standard size ≥ computed)',
          '1.5 in (always round to nearest 0.5)',
        ],
        correct: 2,
      },
      {
        id: 'u3q3',
        question: 'Moving from a grinding tolerance (±0.005 in) to a honing tolerance (±0.001 in) approximately increases cost by:',
        options: [
          '10–20%',
          '50–100%',
          '2–4× (200–400%)',
          'Cost does not change with tolerance',
        ],
        correct: 2,
      },
      {
        id: 'u3q4',
        question: 'Under strict product liability, a manufacturer sold a product in 2016 using the best engineering knowledge available. In 2026, a flaw is discovered. The manufacturer:',
        options: [
          'Is not liable because they used best available knowledge',
          'Is liable — strict liability does not require proof of negligence',
          'Is only liable if they were aware of the flaw at time of sale',
          'Cannot be sued after 5 years',
        ],
        correct: 1,
      },
      {
        id: 'u3q5',
        question: 'A designer specifies AISI 1020 bar at 53mm diameter. The purchasing department recommends changing to 50mm. Why?',
        options: [
          '50mm bar has better material properties',
          '50mm is a standard preferred size — it\'s cheaper and more readily available',
          '53mm bar cannot be manufactured',
          'The 3mm reduction improves strength',
        ],
        correct: 1,
      },
      {
        id: 'u3q6',
        question: 'In a breakeven analysis, which factor causes the biggest shift in the breakeven point?',
        options: [
          'Doubling labor cost (affects both methods equally)',
          'Halving the production rate difference between methods',
          'Changing the part material',
          'Working a different shift',
        ],
        correct: 1,
      },
      {
        id: 'u3q7',
        question: 'A consumer modifies a power tool by removing the safety guard and is injured. Under product liability law, this is most likely classified as:',
        options: [
          'Design defect',
          'Manufacturing defect',
          'User misuse or modification',
          'Failure to warn',
        ],
        correct: 2,
      },
      {
        id: 'u3q8',
        question: 'The single best engineering defense against product liability lawsuits is:',
        options: [
          'Hiring more lawyers',
          'Adding warning labels to cover every scenario',
          'Thorough engineering analysis, testing, and quality control during design and manufacturing',
          'Manufacturing only in countries with weak liability laws',
        ],
        correct: 2,
      },
    ],
  },
  {
    unitIndex: 3,
    title: 'Stress, Strength & Uncertainty',
    subtitle: 'Covers: Stress & Strength, Design Factor & Factor of Safety',
    passingScore: 7,
    questions: [
      {
        id: 'u4q1',
        question: 'A steel rod has ultimate strength Su = 60 kpsi. It carries a tensile load producing σ = 20 kpsi. When the load is removed, what happens to the rod\'s strength?',
        options: [
          'Strength decreases to 40 kpsi',
          'Strength increases because the rod was "exercised"',
          'Strength remains at 60 kpsi — it\'s an inherent material property',
          'Strength drops to zero',
        ],
        correct: 2,
      },
      {
        id: 'u4q2',
        question: 'A round rod must carry P = 3000 lbf with Sy = 36 kpsi and nd = 2.5. The required diameter is:',
        options: [
          'd = √(4 × 2.5 × 3000 / (π × 36000)) = 0.515 in',
          'd = √(4 × 3000 / (π × 36000)) = 0.326 in',
          'd = 4 × 2.5 × 3000 / (π × 36000) = 0.265 in',
          'd = √(2.5 × 3000 / 36000) = 0.456 in',
        ],
        correct: 0,
      },
      {
        id: 'u4q3',
        question: 'After computing d = 0.515 in and rounding to the next preferred size d = 0.625 in, the actual factor of safety n is:',
        options: [
          'n = nd = 2.5 (same as design factor)',
          'n = Sy × A / P = 36000 × π(0.625²)/4 / 3000 = 3.68',
          'n = P / (Sy × A) = 0.68',
          'n cannot be determined without additional information',
        ],
        correct: 1,
      },
      {
        id: 'u4q4',
        question: 'In Example 1-3, eccentricity causes σ_max = 2.332σ_nom. Material variation gives S_min = 0.965S_nom. The design factor nd = S_min/σ_max relative to nominal is:',
        options: [
          'nd = 0.965 / 2.332 = 0.414',
          'nd = 2.332 / 0.965 = 2.42',
          'nd = 1 / (2.332 × 0.965) = 0.444',
          'nd = 2.332 + 0.965 = 3.30',
        ],
        correct: 1,
      },
      {
        id: 'u4q5',
        question: 'Why does Shigley define the design factor in terms of stress (nd = S/σ) rather than load (nd = F_failure/F_applied)?',
        options: [
          'It makes calculations easier',
          'Stress may not be linearly proportional to load (e.g., combined loading, stress concentrations)',
          'Load-based factors are not used in industry',
          'Stress is always proportional to load, so it doesn\'t matter',
        ],
        correct: 1,
      },
      {
        id: 'u4q6',
        question: 'Shigley §1-10 lists 11 sources of uncertainty. Which of these is an example of uncertainty in the STRESS (not strength)?',
        options: [
          'Variation in material composition from heat to heat',
          'Effect of thermomechanical treatment on properties',
          'Intensity and distribution of loading in actual use',
          'Variation in tensile coupon specimen properties',
        ],
        correct: 2,
      },
      {
        id: 'u4q7',
        question: 'The distinction between nd (design factor) and n (factor of safety) is:',
        options: [
          'They are identical terms used interchangeably',
          'nd is chosen before sizing the part; n is calculated after selecting a standard size',
          'n is always larger than nd',
          'nd applies only to static loads; n applies only to fatigue',
        ],
        correct: 1,
      },
      {
        id: 'u4q8',
        question: 'If the maximum load uncertainty is ±25% and the minimum failure load uncertainty is ±18%, then using the deterministic method, nd equals:',
        options: [
          'nd = (1/0.82) / (1/1.25) = 1.52',
          'nd = 1.25 × 1.18 = 1.475',
          'nd = 0.25 + 0.18 = 0.43',
          'nd = 1.25 / 1.18 = 1.06',
        ],
        correct: 0,
      },
    ],
  },
  {
    unitIndex: 4,
    title: 'Probability & Reliability',
    subtitle: 'Covers: Reliability & Probability, Design Factor ↔ Reliability',
    passingScore: 7,
    questions: [
      {
        id: 'u5q1',
        question: 'A normal distribution has μ = 50 kpsi and σ̂ = 4 kpsi. The z-value for x = 42 kpsi is:',
        options: [
          'z = (50 − 42) / 4 = 2.0',
          'z = (42 − 50) / 4 = −2.0',
          'z = (42 − 50) / 50 = −0.16',
          'z = 42 / 50 = 0.84',
        ],
        correct: 1,
      },
      {
        id: 'u5q2',
        question: 'A system has 5 components in series, each with R = 0.98. The system reliability is:',
        options: [
          'R = 5 × 0.98 = 4.90',
          'R = 0.98⁵ ≈ 0.904',
          'R = 0.98 / 5 = 0.196',
          'R = 1 − 5(1 − 0.98) = 0.90',
        ],
        correct: 1,
      },
      {
        id: 'u5q3',
        question: 'In stress-strength interference theory, failure occurs when:',
        options: [
          'The mean stress exceeds the mean strength',
          'The margin m = S − σ is less than zero for a particular specimen',
          'The coefficient of variation exceeds 1.0',
          'The z-value is positive',
        ],
        correct: 1,
      },
      {
        id: 'u5q4',
        question: 'If R = 0.999, approximately how many failures occur per 10,000 units?',
        options: [
          '1 failure',
          '10 failures',
          '100 failures',
          '999 failures',
        ],
        correct: 1,
      },
      {
        id: 'u5q5',
        question: 'The coefficient of variation for strength is Cs = 0.08 and for stress is Cσ = 0.10. The design factor nd = 1.5. Using Eq 1-11, z = −(nd − 1)/√(nd²Cs² + Cσ²). The value of z is approximately:',
        options: [
          'z = −(0.5) / √(1.5²×0.08² + 0.10²) = −0.5/√(0.0244) = −0.5/0.156 = −3.20',
          'z = −(0.5) / √(0.0064 + 0.01) = −0.5/0.128 = −3.91',
          'z = −1.5 / √(0.0244) = −9.6',
          'z = −0.5 / (0.08 + 0.10) = −2.78',
        ],
        correct: 0,
      },
      {
        id: 'u5q6',
        question: 'Increasing the required reliability from R = 0.99 to R = 0.9999 will:',
        options: [
          'Decrease the required design factor nd',
          'Not change the design factor',
          'Significantly increase the required design factor nd',
          'Only affect the cost, not the design factor',
        ],
        correct: 2,
      },
      {
        id: 'u5q7',
        question: 'Example 1-4: 250 rods with S̄ = 45 kpsi, σ̂ = 5 kpsi. How many rods have strength ABOVE 50 kpsi?',
        options: [
          'z = (50−45)/5 = 1.0; Φ(1.0) = 0.8413; rods above = 250 × (1−0.8413) ≈ 40',
          'z = (50−45)/5 = 1.0; Φ(1.0) = 0.8413; rods above = 250 × 0.8413 ≈ 210',
          'z = 1.0; rods above = 250 × 0.50 = 125',
          'Cannot be determined without more data',
        ],
        correct: 0,
      },
      {
        id: 'u5q8',
        question: 'In Eq 1-12, solving for nd given z and the coefficients of variation, what happens to nd as Cs and Cσ both approach zero?',
        options: [
          'nd approaches infinity',
          'nd approaches 1.0 (no design factor needed if there\'s no variability)',
          'nd approaches 0',
          'The equation becomes undefined',
        ],
        correct: 1,
      },
    ],
  },
]

export default UNIT_TESTS
