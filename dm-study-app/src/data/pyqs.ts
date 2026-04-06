export interface SolutionStep {
  step: number;
  title: string;
  content: string;
  isAnswer?: boolean;
}

export interface PYQ {
  id: string;
  year: number;
  section: string;
  marks: number;
  topicId: string;
  question: string;
  solution: {
    steps: SolutionStep[];
    conceptUsed: string;
  };
}

export const PYQS: PYQ[] = [
  {
    id: "2022-1a",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "propositional-logic",
    question: "Translate \"Not all people are honest\" into logical expression using predicate and quantifier.",
    solution: {
      steps: [
        { step: 1, title: "Identify predicates", content: "Let P(x) = 'x is a person', H(x) = 'x is honest'" },
        { step: 2, title: "Understand the statement", content: "\"Not all people are honest\" means there EXISTS at least one person who is NOT honest" },
        { step: 3, title: "Write in logic", content: "~(∀x [P(x)→H(x)]) = ∃x [P(x)∧~H(x)]" },
        { step: 4, title: "Final Answer", content: "∃x [P(x) ∧ ~H(x)]", isAnswer: true }
      ],
      conceptUsed: "Predicate Logic, Quantifier Negation Rule: ~∀x P(x) = ∃x ~P(x)"
    }
  },
  {
    id: "2022-1b",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "propositional-logic",
    question: "Which rule of inference is applied: [(¬p→¬q)∧¬p]→¬q ≡ T?",
    solution: {
      steps: [
        { step: 1, title: "Identify the structure", content: "We have: Premise 1 = (¬p→¬q), Premise 2 = ¬p, Conclusion = ¬q" },
        { step: 2, title: "Match to known rules", content: "Modus Ponens: [(P→Q)∧P]→Q. Here P=¬p and Q=¬q" },
        { step: 3, title: "Final Answer", content: "MODUS PONENS", isAnswer: true }
      ],
      conceptUsed: "Rules of Inference: Modus Ponens"
    }
  },
  {
    id: "2022-1c",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "propositional-logic",
    question: "What is the converse of \"To be a citizen of this country, it is sufficient that you were born in India\"?",
    solution: {
      steps: [
        { step: 1, title: "Rewrite as if-then", content: "Original: 'If you were born in India, then you are a citizen of this country.' (p→q where p=born in India, q=citizen)" },
        { step: 2, title: "Converse definition", content: "Converse of p→q is q→p" },
        { step: 3, title: "Final Answer", content: "If you are a citizen of this country, then you were born in India.", isAnswer: true }
      ],
      conceptUsed: "Conditional Statements: Converse (q→p)"
    }
  },
  {
    id: "2022-1d",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "set-theory-relations",
    question: "List ordered pairs in equivalence relation R produced by partitions A₁={a,b}, A₂={c}, A₃={d,e} of S={a,b,c,d,e}.",
    solution: {
      steps: [
        { step: 1, title: "Rule for partitions→equivalence", content: "Each partition Aᵢ contributes pairs (x,y) where x,y∈Aᵢ (including (x,x) reflexive pairs)" },
        { step: 2, title: "From A₁={a,b}", content: "{(a,a),(a,b),(b,a),(b,b)}" },
        { step: 3, title: "From A₂={c}", content: "{(c,c)}" },
        { step: 4, title: "From A₃={d,e}", content: "{(d,d),(d,e),(e,d),(e,e)}" },
        { step: 5, title: "Final Answer", content: "R = {(a,a),(a,b),(b,a),(b,b),(c,c),(d,d),(d,e),(e,d),(e,e)}", isAnswer: true }
      ],
      conceptUsed: "Equivalence Relation from Partitions"
    }
  },
  {
    id: "2022-1e",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "functions-combinatorics",
    question: "How many positive integers not exceeding 1000 are divisible by 7 or 11?",
    solution: {
      steps: [
        { step: 1, title: "Count divisible by 7", content: "|A| = ⌊1000/7⌋ = 142" },
        { step: 2, title: "Count divisible by 11", content: "|B| = ⌊1000/11⌋ = 90" },
        { step: 3, title: "Count divisible by LCM(7,11)=77", content: "|A∩B| = ⌊1000/77⌋ = 12" },
        { step: 4, title: "Inclusion-Exclusion", content: "|A∪B| = 142 + 90 − 12 = 220" },
        { step: 5, title: "Final Answer", content: "220", isAnswer: true }
      ],
      conceptUsed: "Inclusion-Exclusion Principle"
    }
  },
  {
    id: "2022-1f",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "algebraic-structures",
    question: "What is a normal subgroup? Give an example.",
    solution: {
      steps: [
        { step: 1, title: "Definition", content: "A subgroup N of group G is NORMAL if gNg⁻¹ = N for all g∈G. Equivalently, gN = Ng for all g∈G." },
        { step: 2, title: "Example", content: "The subgroup {0,2,4} of (Z₆,+₆). Since Z₆ is abelian, ALL subgroups are normal." },
        { step: 3, title: "Another Example", content: "In (Z,+), every subgroup nZ={...,−2n,−n,0,n,2n,...} is normal since Z is abelian.", isAnswer: true }
      ],
      conceptUsed: "Normal Subgroups"
    }
  },
  {
    id: "2022-1g",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "recurrence-relations",
    question: "Solve aₙ − 5aₙ₋₁ + 6aₙ₋₂ = 0 for n≥2.",
    solution: {
      steps: [
        { step: 1, title: "Write characteristic equation", content: "r² − 5r + 6 = 0" },
        { step: 2, title: "Factor", content: "(r−2)(r−3) = 0 → r₁=2, r₂=3" },
        { step: 3, title: "General solution (distinct roots)", content: "aₙ = A·2ⁿ + B·3ⁿ" },
        { step: 4, title: "Final Answer", content: "aₙ = A·2ⁿ + B·3ⁿ, where A and B are determined by initial conditions", isAnswer: true }
      ],
      conceptUsed: "Homogeneous Linear Recurrence — Characteristic Equation Method"
    }
  },
  {
    id: "2022-1h",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "algebraic-structures",
    question: "Check whether f=(1234567/5132476) is even or odd permutation.",
    solution: {
      steps: [
        { step: 1, title: "Write in cycle notation", content: "1→5→4→2→1 gives cycle (1542), then 3→3 (fixed), 6→7→6 gives cycle (67)" },
        { step: 2, title: "Cycle lengths", content: "Cycles: (1 5 4 2) of length 4, (3) trivial, (6 7) of length 2" },
        { step: 3, title: "Count transpositions", content: "4-cycle = 3 transpositions, 2-cycle = 1 transposition. Total = 3+1 = 4 transpositions" },
        { step: 4, title: "Even or Odd?", content: "4 is even → EVEN permutation", isAnswer: true }
      ],
      conceptUsed: "Permutations: k-cycle = (k−1) transpositions. Even if total is even."
    }
  },
  {
    id: "2022-1i",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "algebraic-structures",
    question: "Find the generator(s) of the group ({1,−1,i,−i}, ×).",
    solution: {
      steps: [
        { step: 1, title: "Test element i", content: "i¹=i, i²=−1, i³=−i, i⁴=1. Generated set = {i,−1,−i,1} = whole group ✓" },
        { step: 2, title: "Test element −i", content: "(−i)¹=−i, (−i)²=−1, (−i)³=i, (−i)⁴=1. Generated set = whole group ✓" },
        { step: 3, title: "Test element −1", content: "(−1)¹=−1, (−1)²=1. Generated set = {−1,1} ≠ whole group ✗" },
        { step: 4, title: "Test element 1", content: "1¹=1. Generated set = {1} ✗" },
        { step: 5, title: "Final Answer", content: "Generators are i and −i", isAnswer: true }
      ],
      conceptUsed: "Cyclic Groups and Generators"
    }
  },
  {
    id: "2022-1j",
    year: 2022,
    section: "A",
    marks: 1,
    topicId: "set-theory-relations",
    question: "Let R={(a,b)|a<b} on real numbers. What are Rᶜ and R⁻¹?",
    solution: {
      steps: [
        { step: 1, title: "Find Rᶜ (complement)", content: "Rᶜ contains all pairs NOT in R. Rᶜ = {(a,b)|a≥b}" },
        { step: 2, title: "Find R⁻¹ (inverse)", content: "R⁻¹ = {(b,a)|(a,b)∈R} = {(a,b)|a>b}" },
        { step: 3, title: "Final Answer", content: "Rᶜ = {(a,b)|a≥b} and R⁻¹ = {(a,b)|a>b}", isAnswer: true }
      ],
      conceptUsed: "Complement and Inverse of Relations"
    }
  },
  {
    id: "2022-2a",
    year: 2022,
    section: "B",
    marks: 4,
    topicId: "algebraic-structures",
    question: "Prove that the order of any subgroup divides the order of the group (Lagrange's Theorem).",
    solution: {
      steps: [
        { step: 1, title: "Setup", content: "Let G be a finite group with |G|=n, and H be a subgroup with |H|=m. We need to show m|n." },
        { step: 2, title: "Define cosets", content: "For any a∈G, define left coset: aH = {ah | h∈H}." },
        { step: 3, title: "Cosets have same size", content: "|aH|=|H|=m. Proof: map h↦ah is bijective." },
        { step: 4, title: "Cosets partition G", content: "Two cosets are either IDENTICAL or DISJOINT." },
        { step: 5, title: "Count elements", content: "G is partitioned into distinct cosets, each of size m. If there are k cosets: n = k·m, so m|n." },
        { step: 6, title: "Conclusion", content: "|H| divides |G|. ∎", isAnswer: true }
      ],
      conceptUsed: "Lagrange's Theorem, Cosets"
    }
  },
  {
    id: "2022-3a",
    year: 2022,
    section: "B",
    marks: 4,
    topicId: "poset-lattice",
    question: "For poset ({2,4,6,9,12,18,27,36,48,60,72},|): find maximal, minimal, greatest, least elements, upper/lower bounds.",
    solution: {
      steps: [
        { step: 1, title: "Draw divisibility relations", content: "a|b means a divides b. Draw Hasse diagram with divisibility arrows going up." },
        { step: 2, title: "Find minimal elements", content: "Elements with nothing below them: 2 and 9 are minimal." },
        { step: 3, title: "Find maximal elements", content: "Elements with nothing above them: 48, 60, 72 are maximal" },
        { step: 4, title: "Greatest element?", content: "72: does 72/60? No. NO greatest element." },
        { step: 5, title: "Least element?", content: "2: does 2|9? No. NO least element." },
        { step: 6, title: "Upper bounds of {2,9}", content: "Elements divisible by both 2 and 9 (lcm=18): {18,36,72}" },
        { step: 7, title: "LUB of {2,9}", content: "Smallest upper bound = 18" },
        { step: 8, title: "Lower bounds of {60,72}", content: "Elements dividing both. gcd(60,72)=12. In set: {2,4,6,12}" },
        { step: 9, title: "GLB of {60,72}", content: "Greatest lower bound = 12", isAnswer: true }
      ],
      conceptUsed: "POSET, Hasse Diagrams, LUB, GLB"
    }
  },
  {
    id: "2022-3b",
    year: 2022,
    section: "B",
    marks: 4,
    topicId: "mathematical-induction",
    question: "Prove 21 divides 4^(n+1) + 5^(2n−1) for any positive integer n.",
    solution: {
      steps: [
        { step: 1, title: "Base case n=1", content: "4² + 5¹ = 16 + 5 = 21. 21|21 ✓" },
        { step: 2, title: "Inductive hypothesis", content: "Assume 21 | (4^(k+1) + 5^(2k−1))" },
        { step: 3, title: "Prove for n=k+1", content: "Need to show 21 | (4^(k+2) + 5^(2k+1))" },
        { step: 4, title: "Manipulate expression", content: "4^(k+2) + 5^(2k+1) = 4·4^(k+1) + 25·5^(2k−1)" },
        { step: 5, title: "Clever rewriting", content: "= 4·4^(k+1) + 4·5^(2k−1) + 21·5^(2k−1)" },
        { step: 6, title: "Factor", content: "= 4(4^(k+1) + 5^(2k−1)) + 21·5^(2k−1)" },
        { step: 7, title: "Conclude", content: "Both terms divisible by 21 (first by hypothesis, second obviously). ∎", isAnswer: true }
      ],
      conceptUsed: "Mathematical Induction"
    }
  },
  {
    id: "2022-4a",
    year: 2022,
    section: "C",
    marks: 4,
    topicId: "set-theory-relations",
    question: "Prove R={(a,b)|a≡b(mod 5)} is an equivalence relation and find equivalence classes.",
    solution: {
      steps: [
        { step: 1, title: "Check Reflexive", content: "a≡a(mod 5) since a−a=0=5·0. REFLEXIVE ✓" },
        { step: 2, title: "Check Symmetric", content: "If a≡b(mod 5), then 5|(a−b), so 5|(b−a). SYMMETRIC ✓" },
        { step: 3, title: "Check Transitive", content: "If a≡b and b≡c (mod 5), then 5|(a−b) and 5|(b−c). So 5|(a−c). TRANSITIVE ✓" },
        { step: 4, title: "Conclusion", content: "R is an Equivalence Relation ✓" },
        { step: 5, title: "Equivalence Classes", content: "[0]={...−10,−5,0,5,10,...}\n[1]={...−9,−4,1,6,11,...}\n[2]={...−8,−3,2,7,12,...}\n[3]={...−7,−2,3,8,13,...}\n[4]={...−6,−1,4,9,14,...}", isAnswer: true }
      ],
      conceptUsed: "Equivalence Relations, Modular Arithmetic"
    }
  },
  {
    id: "2022-4b",
    year: 2022,
    section: "C",
    marks: 4,
    topicId: "algebraic-structures",
    question: "If Φ is homomorphism from (G,*) to (G̅,#), show: (i) Φ(e)=ē (ii) Φ(a⁻¹)=(Φ(a))⁻¹",
    solution: {
      steps: [
        { step: 1, title: "Part (i): Φ(e)=ē", content: "Φ(e) = Φ(e*e) = Φ(e)#Φ(e)" },
        { step: 2, title: "Part (i) continued", content: "Multiply both sides by [Φ(e)]⁻¹: ē = Φ(e) ✓" },
        { step: 3, title: "Part (ii): Φ(a⁻¹)=[Φ(a)]⁻¹", content: "Φ(a*a⁻¹) = Φ(e) = ē" },
        { step: 4, title: "Part (ii) continued", content: "Φ(a)#Φ(a⁻¹) = ē → Φ(a⁻¹) = [Φ(a)]⁻¹ ✓", isAnswer: true }
      ],
      conceptUsed: "Group Homomorphism Properties"
    }
  },
  {
    id: "2022-5a",
    year: 2022,
    section: "C",
    marks: 4,
    topicId: "recurrence-relations",
    question: "Using generating functions, solve aₙ−6aₙ₋₁+9aₙ₋₂=0 with a₀=1, a₁=6.",
    solution: {
      steps: [
        { step: 1, title: "Set up generating function", content: "Let G(x) = Σₙ₌₀^∞ aₙxⁿ" },
        { step: 2, title: "Multiply recurrence by xⁿ and sum", content: "Σₙ₌₂^∞ aₙxⁿ − 6Σaₙ₋₁xⁿ + 9Σaₙ₋₂xⁿ = 0" },
        { step: 3, title: "Express in terms of G(x)", content: "[G(x)−a₀−a₁x] − 6x[G(x)−a₀] + 9x²G(x) = 0" },
        { step: 4, title: "Substitute initial conditions", content: "G(1−6x+9x²) = 1" },
        { step: 5, title: "Solve for G(x)", content: "G(x) = 1/(1−3x)²" },
        { step: 6, title: "Expand", content: "1/(1−3x)² = Σ (n+1)·3ⁿ·xⁿ" },
        { step: 7, title: "Extract coefficients", content: "aₙ = (n+1)·3ⁿ", isAnswer: true }
      ],
      conceptUsed: "Generating Functions for Recurrence Relations"
    }
  },
  {
    id: "2022-5b",
    year: 2022,
    section: "C",
    marks: 4,
    topicId: "propositional-logic",
    question: "Prove [¬p∧(p∨q)]→q is a tautology by series of equivalences.",
    solution: {
      steps: [
        { step: 1, title: "Start with expression", content: "[¬p∧(p∨q)]→q" },
        { step: 2, title: "Apply A→B ≡ ¬A∨B", content: "¬[¬p∧(p∨q)]∨q" },
        { step: 3, title: "Apply De Morgan", content: "[p∨¬(p∨q)]∨q" },
        { step: 4, title: "Apply De Morgan again", content: "[p∨(¬p∧¬q)]∨q" },
        { step: 5, title: "Distributive law", content: "[(p∨¬p)∧(p∨¬q)]∨q" },
        { step: 6, title: "p∨¬p=T", content: "(p∨¬q)∨q" },
        { step: 7, title: "Associativity & Complement", content: "p∨(¬q∨q) = p∨T = T", isAnswer: true }
      ],
      conceptUsed: "Propositional Equivalences, De Morgan's Laws, Tautology"
    }
  },
  {
    id: "2022-7a",
    year: 2022,
    section: "D",
    marks: 4,
    topicId: "recurrence-relations",
    question: "Find general solution of aₙ = 4aₙ₋₁ − 4aₙ₋₂ + n·2ⁿ.",
    solution: {
      steps: [
        { step: 1, title: "Solve homogeneous part", content: "r²−4r+4=0 → (r−2)²=0 → r=2 (repeated root)" },
        { step: 2, title: "Homogeneous solution", content: "aₙ⁽ʰ⁾ = (A+Bn)·2ⁿ" },
        { step: 3, title: "Find particular solution", content: "f(n)=n·2ⁿ. Since 2 is root of multiplicity 2, try: aₙ⁽ᵖ⁾ = n²(Cn+D)·2ⁿ" },
        { step: 4, title: "Substitute and solve", content: "After algebra: C=1/6, D=0" },
        { step: 5, title: "General solution", content: "aₙ = [A + Bn + n³/6]·2ⁿ", isAnswer: true }
      ],
      conceptUsed: "Non-homogeneous Recurrence — Method of Undetermined Coefficients"
    }
  },
  {
    id: "2022-7b",
    year: 2022,
    section: "D",
    marks: 4,
    topicId: "set-theory-relations",
    question: "Use Warshall's algorithm to find transitive closure of R={(1,4),(2,1),(2,3),(3,1),(3,4),(4,3)} on {1,2,3,4}.",
    solution: {
      steps: [
        { step: 1, title: "Initial matrix M₀", content: "  1 2 3 4\n1[0 0 0 1]\n2[1 0 1 0]\n3[1 0 0 1]\n4[0 0 1 0]" },
        { step: 2, title: "k=1: paths through vertex 1", content: "Row 2: M[2][1]=1 & row 1 col4=1 → add M[2][4]=1\n  1 2 3 4\n1[0 0 0 1]\n2[1 0 1 1]\n3[1 0 0 1]\n4[0 0 1 0]" },
        { step: 3, title: "k=2: paths through vertex 2", content: "M[i][2]=0 for all i, so no changes." },
        { step: 4, title: "k=3: paths through vertex 3", content: "Row 4: M[4][3]=1 → add M[4][1]=1, M[4][4]=1\n  1 2 3 4\n1[0 0 0 1]\n2[1 0 1 1]\n3[1 0 0 1]\n4[1 0 1 1]" },
        { step: 5, title: "k=4: paths through vertex 4", content: "Final:\n  1 2 3 4\n1[1 0 1 1]\n2[1 0 1 1]\n3[1 0 1 1]\n4[1 0 1 1]", isAnswer: true }
      ],
      conceptUsed: "Warshall's Algorithm for Transitive Closure"
    }
  },
  {
    id: "2022-8a",
    year: 2022,
    section: "D",
    marks: 4,
    topicId: "propositional-logic",
    question: "Using rules of inference show the Ajaya-Bijaya-Chinmay-Deb argument is valid.",
    solution: {
      steps: [
        { step: 1, title: "Define variables", content: "D=Ajaya learns DM, B=Bijaya learns Calculus, C=Chinmay learns Calculus, E=Deb learns Calculus" },
        { step: 2, title: "Write premises", content: "P1: D→(B∨C)\nP2: B→¬D\nP3: E→¬C\nConclusion: D→¬E" },
        { step: 3, title: "Assume D is true", content: "Assume D (hypothesis for conditional proof)" },
        { step: 4, title: "Apply P1 with Modus Ponens", content: "D→(B∨C) and D → B∨C" },
        { step: 5, title: "Apply P2 (Modus Tollens)", content: "B→¬D and D is true → ¬B" },
        { step: 6, title: "Apply Disjunctive Syllogism", content: "B∨C and ¬B → C" },
        { step: 7, title: "Apply P3 (Modus Tollens)", content: "E→¬C and C is true → ¬E" },
        { step: 8, title: "Conclusion", content: "From D, we derived ¬E. Therefore D→¬E. ∎", isAnswer: true }
      ],
      conceptUsed: "Modus Ponens, Modus Tollens, Disjunctive Syllogism"
    }
  },
  {
    id: "2022-8b",
    year: 2022,
    section: "D",
    marks: 4,
    topicId: "algebraic-structures",
    question: "What is zero divisor in a ring? Find all zero divisors in (Z₈,⊕,⊗).",
    solution: {
      steps: [
        { step: 1, title: "Definition", content: "A non-zero element a in ring R is a zero divisor if ∃ non-zero b with a·b=0" },
        { step: 2, title: "Setup Z₈={0,1,2,3,4,5,6,7}", content: "Find non-zero a where a⊗₈b=0 for some non-zero b" },
        { step: 3, title: "Test a=2", content: "2⊗₈4=8≡0(mod8). So 2 is a zero divisor" },
        { step: 4, title: "Test a=4", content: "4⊗₈2=8≡0. So 4 is a zero divisor" },
        { step: 5, title: "Test a=6", content: "6⊗₈4=24≡0(mod8). So 6 is a zero divisor" },
        { step: 6, title: "Test odd elements", content: "1,3,5,7 are coprime to 8 → NOT zero divisors" },
        { step: 7, title: "Final Answer", content: "Zero divisors in Z₈: {2, 4, 6}", isAnswer: true }
      ],
      conceptUsed: "Zero Divisors in Rings, Modular Arithmetic"
    }
  },
  {
    id: "2023-1a",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "propositional-logic",
    question: "What is the contrapositive of \"It is necessary to have a valid password to log on to the server\"?",
    solution: {
      steps: [
        { step: 1, title: "Convert to if-then", content: "'If you log on, then you have a valid password.' (p→q)" },
        { step: 2, title: "Contrapositive rule", content: "Contrapositive of p→q is ¬q→¬p" },
        { step: 3, title: "Final Answer", content: "If you do not have a valid password, then you cannot log on to the server.", isAnswer: true }
      ],
      conceptUsed: "Contrapositive: ¬q→¬p"
    }
  },
  {
    id: "2023-1b",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "propositional-logic",
    question: "Translate \"At least one of your friends is perfect\" into logical expression.",
    solution: {
      steps: [
        { step: 1, title: "Identify predicates", content: "Let F(x)='x is your friend', P(x)='x is perfect'" },
        { step: 2, title: "Analyze statement", content: "'At least one' means there EXISTS" },
        { step: 3, title: "Final Answer", content: "∃x [F(x) ∧ P(x)]", isAnswer: true }
      ],
      conceptUsed: "Existential Quantifier, Predicate Logic"
    }
  },
  {
    id: "2023-1c",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "set-theory-relations",
    question: "Find reflexive and symmetric closures of R={(1,1),(1,3),(3,3)} on A={1,2,3}.",
    solution: {
      steps: [
        { step: 1, title: "Reflexive Closure", content: "Add (2,2): {(1,1),(1,3),(3,3),(2,2)}" },
        { step: 2, title: "Symmetric Closure", content: "Add (3,1): {(1,1),(1,3),(3,1),(3,3)}" },
        { step: 3, title: "Final Answer", content: "Reflexive closure: {(1,1),(2,2),(3,3),(1,3)}\nSymmetric closure: {(1,1),(1,3),(3,1),(3,3)}", isAnswer: true }
      ],
      conceptUsed: "Reflexive and Symmetric Closure"
    }
  },
  {
    id: "2023-1d",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "functions-combinatorics",
    question: "Company must hire 20 system programmers and 30 applications programmers; 5 can do both. How many must be hired?",
    solution: {
      steps: [
        { step: 1, title: "Use Inclusion-Exclusion", content: "|A∪B| = |A|+|B|−|A∩B|" },
        { step: 2, title: "Substitute", content: "= 20+30−5 = 45" },
        { step: 3, title: "Final Answer", content: "45 programmers must be hired", isAnswer: true }
      ],
      conceptUsed: "Inclusion-Exclusion Principle"
    }
  },
  {
    id: "2023-1h",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "algebraic-structures",
    question: "Define cyclic group with an example.",
    solution: {
      steps: [
        { step: 1, title: "Definition", content: "A group G is CYCLIC if ∃ generator g such that G = <g> = {gⁿ | n∈Z}" },
        { step: 2, title: "Example", content: "({1,−1,i,−i},×) with generator i: i¹=i, i²=−1, i³=−i, i⁴=1", isAnswer: true }
      ],
      conceptUsed: "Cyclic Groups and Generators"
    }
  },
  {
    id: "2023-1j",
    year: 2023,
    section: "A",
    marks: 1,
    topicId: "algebraic-structures",
    question: "If ring (Zₙ,⊕ₙ,⊗ₙ) is always a field, then n must be?",
    solution: {
      steps: [
        { step: 1, title: "Field requirement", content: "Every non-zero element needs multiplicative inverse" },
        { step: 2, title: "Condition", content: "Element a has inverse iff gcd(a,n)=1" },
        { step: 3, title: "Final Answer", content: "n must be a PRIME number", isAnswer: true }
      ],
      conceptUsed: "Fields, Zₙ is field iff n is prime"
    }
  },
  {
    id: "2023-2b",
    year: 2023,
    section: "B",
    marks: 4,
    topicId: "recurrence-relations",
    question: "Solve Fₙ = 6Fₙ₋₁ − 9Fₙ₋₂ where F₀=1, F₁=6.",
    solution: {
      steps: [
        { step: 1, title: "Characteristic equation", content: "r² − 6r + 9 = 0 → (r−3)² = 0 → r=3 (repeated)" },
        { step: 2, title: "General solution", content: "Fₙ = (A + Bn)·3ⁿ" },
        { step: 3, title: "Apply F₀=1", content: "A = 1" },
        { step: 4, title: "Apply F₁=6", content: "(1+B)·3 = 6 → B=1" },
        { step: 5, title: "Final Answer", content: "Fₙ = (n+1)·3ⁿ", isAnswer: true }
      ],
      conceptUsed: "Homogeneous Recurrence — Repeated Root Case"
    }
  },
  {
    id: "2023-3a",
    year: 2023,
    section: "B",
    marks: 4,
    topicId: "functions-combinatorics",
    question: "1807 freshmen: 453 in CS, 567 in Math, 299 in both. How many NOT in either?",
    solution: {
      steps: [
        { step: 1, title: "Given", content: "Total=1807, |CS|=453, |Math|=567, |CS∩Math|=299" },
        { step: 2, title: "Find |CS∪Math|", content: "453+567−299 = 721" },
        { step: 3, title: "Find neither", content: "1807−721 = 1086" },
        { step: 4, title: "Final Answer", content: "1086 students are not taking either course", isAnswer: true }
      ],
      conceptUsed: "Inclusion-Exclusion Principle"
    }
  },
  {
    id: "2023-5a",
    year: 2023,
    section: "C",
    marks: 4,
    topicId: "mathematical-induction",
    question: "Using strong induction, show every integer n>1 can be written as product of primes.",
    solution: {
      steps: [
        { step: 1, title: "Base case n=2", content: "2 is prime ✓" },
        { step: 2, title: "Strong hypothesis", content: "Assume true for all k with 2≤k<n" },
        { step: 3, title: "Case 1: n is prime", content: "Done ✓" },
        { step: 4, title: "Case 2: n is composite", content: "n=a·b where 1<a,b<n" },
        { step: 5, title: "Apply hypothesis", content: "a and b are products of primes by hypothesis" },
        { step: 6, title: "Conclusion", content: "n = a·b = product of primes. ∎", isAnswer: true }
      ],
      conceptUsed: "Strong Mathematical Induction"
    }
  },
  {
    id: "2023-6a",
    year: 2023,
    section: "C",
    marks: 4,
    topicId: "mathematical-induction",
    question: "Using mathematical induction, show that n³−n is divisible by 3.",
    solution: {
      steps: [
        { step: 1, title: "Base case n=1", content: "1³−1 = 0. 3|0 ✓" },
        { step: 2, title: "Inductive hypothesis", content: "Assume 3|(k³−k)" },
        { step: 3, title: "Prove for n=k+1", content: "(k+1)³−(k+1) = k³+3k²+3k+1−k−1 = k³+3k²+2k" },
        { step: 4, title: "Rewrite", content: "= (k³−k) + 3k² + 3k = (k³−k) + 3k(k+1)" },
        { step: 5, title: "Divisibility", content: "Both terms divisible by 3" },
        { step: 6, title: "Conclusion", content: "3|(n³−n) for all n≥1. ∎", isAnswer: true }
      ],
      conceptUsed: "Mathematical Induction, Divisibility"
    }
  },
  {
    id: "2023-6b",
    year: 2023,
    section: "C",
    marks: 4,
    topicId: "poset-lattice",
    question: "For poset ({3,5,9,15,24,45},|): find maximal, minimal, greatest, least elements, bounds.",
    solution: {
      steps: [
        { step: 1, title: "Divisibility relations", content: "3|9, 3|15, 3|45; 5|15, 5|45; 15|45; 3|24" },
        { step: 2, title: "Minimal elements", content: "{3, 5}" },
        { step: 3, title: "Maximal elements", content: "{9, 24, 45}" },
        { step: 4, title: "Greatest/Least", content: "None for both" },
        { step: 5, title: "Upper bounds of {3,5}", content: "Divisible by lcm(3,5)=15: {15, 45}" },
        { step: 6, title: "LUB of {3,5}", content: "15" },
        { step: 7, title: "Lower bounds of {15,45}", content: "Divide gcd(15,45)=15: {3, 5, 15}" },
        { step: 8, title: "GLB of {15,45}", content: "15", isAnswer: true }
      ],
      conceptUsed: "POSET with Divisibility, Bounds, LUB, GLB"
    }
  },
  {
    id: "2023-7b",
    year: 2023,
    section: "D",
    marks: 4,
    topicId: "set-theory-relations",
    question: "Show R₃ (same first 3 bits or equal) on bit strings is equivalence relation.",
    solution: {
      steps: [
        { step: 1, title: "Reflexive", content: "s=s for all s. REFLEXIVE ✓" },
        { step: 2, title: "Symmetric", content: "If sR₃t then tR₃s. SYMMETRIC ✓" },
        { step: 3, title: "Transitive", content: "If sR₃t and tR₃u, all share first 3 bits. TRANSITIVE ✓" },
        { step: 4, title: "Equivalence classes", content: "Classes for length<3: {ε},{0},{1},{00},{01},{10},{11}. For length≥3: grouped by first 3 bits.", isAnswer: true }
      ],
      conceptUsed: "Equivalence Relations, Bit Strings"
    }
  },
  {
    id: "2023-8a",
    year: 2023,
    section: "D",
    marks: 4,
    topicId: "recurrence-relations",
    question: "Solve Fₙ = Fₙ₋₁ − 2Fₙ₋₂ where F₀=2, F₁=7.",
    solution: {
      steps: [
        { step: 1, title: "Characteristic equation", content: "r² − r + 2 = 0" },
        { step: 2, title: "Find roots", content: "r = (1 ± √(−7))/2 = (1 ± i√7)/2" },
        { step: 3, title: "Polar form", content: "|r| = √2, θ = arctan(√7)" },
        { step: 4, title: "General solution", content: "Fₙ = (√2)ⁿ[A·cos(nθ) + B·sin(nθ)]" },
        { step: 5, title: "Apply F₀=2", content: "A = 2" },
        { step: 6, title: "Apply F₁=7", content: "Solve for B from √2[2cos(θ)+Bsin(θ)] = 7", isAnswer: true }
      ],
      conceptUsed: "Recurrence with Complex Roots"
    }
  }
];

export const TOTAL_PYQS = PYQS.length;
