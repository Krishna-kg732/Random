export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TopicQuiz {
  topicId: string;
  questions: QuizQuestion[];
}

export const QUIZZES: TopicQuiz[] = [
  {
    topicId: "propositional-logic",
    questions: [
      { id: "pl-q1", question: "What is the contrapositive of p→q?", options: ["q→p", "¬p→¬q", "¬q→¬p", "¬q→p"], correct: 2, explanation: "Contrapositive of p→q is ¬q→¬p. It is logically equivalent to the original." },
      { id: "pl-q2", question: "Modus Ponens: given p→q and p, conclude:", options: ["¬p", "¬q", "q", "p∧q"], correct: 2, explanation: "Modus Ponens: (p→q)∧p → q." },
      { id: "pl-q3", question: "p→q is FALSE only when:", options: ["p=T, q=T", "p=T, q=F", "p=F, q=T", "p=F, q=F"], correct: 1, explanation: "Implication is false only when the hypothesis is true and conclusion is false." },
      { id: "pl-q4", question: "Which is a tautology?", options: ["p∧¬p", "p∨¬p", "p→¬p", "p↔¬p"], correct: 1, explanation: "p∨¬p is always true (Law of Excluded Middle)." },
      { id: "pl-q5", question: "De Morgan's Law: ¬(p∧q) equals:", options: ["¬p∧¬q", "¬p∨¬q", "p∨q", "¬p→¬q"], correct: 1, explanation: "De Morgan: ¬(p∧q) = ¬p∨¬q." },
      { id: "pl-q6", question: "¬(∀x P(x)) is equivalent to:", options: ["∀x ¬P(x)", "∃x ¬P(x)", "¬∃x P(x)", "∃x P(x)"], correct: 1, explanation: "Negation of universal is existential with negated predicate." },
      { id: "pl-q7", question: "\"At least one student passed\" translates to:", options: ["∀x [S(x)→P(x)]", "∃x [S(x)∧P(x)]", "∀x [S(x)∧P(x)]", "∃x [S(x)→P(x)]"], correct: 1, explanation: "'At least one' uses existential quantifier with conjunction." },
      { id: "pl-q8", question: "Disjunctive Syllogism: p∨q and ¬p gives:", options: ["p", "¬q", "q", "p∧q"], correct: 2, explanation: "If p∨q is true and p is false, then q must be true." }
    ]
  },
  {
    topicId: "set-theory-relations",
    questions: [
      { id: "sr-q1", question: "If |A|=3, how many elements in P(A)?", options: ["3", "6", "8", "9"], correct: 2, explanation: "|P(A)| = 2^|A| = 2³ = 8." },
      { id: "sr-q2", question: "An equivalence relation must be:", options: ["Reflexive + Symmetric", "Reflexive + Transitive", "Reflexive + Symmetric + Transitive", "Symmetric + Antisymmetric"], correct: 2, explanation: "Equivalence = Reflexive + Symmetric + Transitive." },
      { id: "sr-q3", question: "|A∪B| = |A|+|B|−|A∩B| is called:", options: ["De Morgan's Law", "Pigeonhole Principle", "Inclusion-Exclusion", "Distributive Law"], correct: 2, explanation: "This is the Inclusion-Exclusion principle for two sets." },
      { id: "sr-q4", question: "A POSET requires:", options: ["Reflexive + Symmetric + Transitive", "Reflexive + Antisymmetric + Transitive", "Reflexive + Antisymmetric", "Symmetric + Transitive"], correct: 1, explanation: "Partial Order = Reflexive + Antisymmetric + Transitive." },
      { id: "sr-q5", question: "Total reflexive relations on set of n elements:", options: ["2^n", "2^(n²)", "2^(n²−n)", "n²"], correct: 2, explanation: "Diagonal must be all 1s (n fixed), remaining n²−n entries are free." },
      { id: "sr-q6", question: "If A={1,2} and B={a,b,c}, |A×B| = ?", options: ["5", "6", "8", "9"], correct: 1, explanation: "|A×B| = |A|·|B| = 2·3 = 6." }
    ]
  },
  {
    topicId: "poset-lattice",
    questions: [
      { id: "po-q1", question: "In a Hasse diagram, we remove:", options: ["All edges", "Reflexive and transitive edges", "Only symmetric edges", "Only reflexive edges"], correct: 1, explanation: "Hasse diagrams remove self-loops (reflexive) and implied transitive edges." },
      { id: "po-q2", question: "A lattice requires every pair to have:", options: ["Only LUB", "Only GLB", "Both LUB and GLB", "Neither"], correct: 2, explanation: "A lattice is a POSET where every pair has both a join (LUB) and meet (GLB)." },
      { id: "po-q3", question: "A Boolean Algebra is a lattice that is:", options: ["Only bounded", "Only complemented", "Only distributive", "Complemented + Distributive"], correct: 3, explanation: "Boolean Algebra = Complemented + Distributive Lattice." },
      { id: "po-q4", question: "Maximal element in a POSET means:", options: ["Greatest element", "No element is greater", "Largest value", "Top of chain"], correct: 1, explanation: "Maximal: no element in the set is greater than it. There can be multiple." },
      { id: "po-q5", question: "LUB is also called:", options: ["Meet", "Join", "Infimum", "Minimum"], correct: 1, explanation: "LUB = Least Upper Bound = Join = Supremum." },
      { id: "po-q6", question: "If a∨b = top and a∧b = bottom, then a and b are:", options: ["Equal", "Comparable", "Complements", "Incomparable"], correct: 2, explanation: "Elements are complements if their join is top and meet is bottom." }
    ]
  },
  {
    topicId: "mathematical-induction",
    questions: [
      { id: "mi-q1", question: "The first step in mathematical induction is:", options: ["Inductive step", "Base case", "Assume for n=k", "Prove for all n"], correct: 1, explanation: "Always start by proving the base case (usually n=1)." },
      { id: "mi-q2", question: "In strong induction, we assume true for:", options: ["Only n=k", "Only n=k and n=k-1", "All values from base to k", "n=k+1"], correct: 2, explanation: "Strong induction assumes the statement for ALL values up to k." },
      { id: "mi-q3", question: "To prove n³−n is divisible by 3, what's the key rewrite?", options: ["n(n²−1)", "(n−1)n(n+1)", "n³−1−(n−1)", "All of these"], correct: 1, explanation: "n³−n = n(n²−1) = (n−1)n(n+1), product of 3 consecutive integers." },
      { id: "mi-q4", question: "In the inductive step, we prove for:", options: ["n=k", "n=k−1", "n=k+1", "All n"], correct: 2, explanation: "After assuming for k, we prove the statement holds for k+1." },
      { id: "mi-q5", question: "1+2+3+...+n equals:", options: ["n²", "n(n+1)/2", "n(n−1)/2", "2n+1"], correct: 1, explanation: "Sum of first n natural numbers = n(n+1)/2." },
      { id: "mi-q6", question: "Sum 1+3+5+...+(2n−1) equals:", options: ["n(n+1)", "n²", "2n²−1", "(2n−1)n/2"], correct: 1, explanation: "Sum of first n odd numbers = n²." }
    ]
  },
  {
    topicId: "functions-combinatorics",
    questions: [
      { id: "fc-q1", question: "A bijective function is:", options: ["Only injective", "Only surjective", "Both injective and surjective", "Neither"], correct: 2, explanation: "Bijection = One-to-one (injective) + Onto (surjective)." },
      { id: "fc-q2", question: "⁵C₃ equals:", options: ["60", "10", "20", "15"], correct: 1, explanation: "⁵C₃ = 5!/(3!·2!) = 120/12 = 10." },
      { id: "fc-q3", question: "Total functions from set A (size m) to B (size n):", options: ["m^n", "n^m", "m×n", "m+n"], correct: 1, explanation: "Each element of A has n choices → n^m total functions." },
      { id: "fc-q4", question: "Pigeonhole Principle: 13 people → at least ___ share birth month:", options: ["1", "2", "3", "13"], correct: 1, explanation: "13 people, 12 months → at least ⌈13/12⌉ = 2 share a month." },
      { id: "fc-q5", question: "fog(x) means:", options: ["f(x)·g(x)", "g(f(x))", "f(g(x))", "f(x)+g(x)"], correct: 2, explanation: "fog(x) = f(g(x)): apply g first, then f." },
      { id: "fc-q6", question: "Number of permutations of 5 items taken 3 at a time:", options: ["60", "10", "125", "15"], correct: 0, explanation: "⁵P₃ = 5!/(5−3)! = 120/2 = 60." }
    ]
  },
  {
    topicId: "recurrence-relations",
    questions: [
      { id: "rr-q1", question: "For aₙ=5aₙ₋₁−6aₙ₋₂, the characteristic equation is:", options: ["r²−5r+6=0", "r²+5r−6=0", "r²−5r−6=0", "r²+5r+6=0"], correct: 0, explanation: "Replace aₙ with r², aₙ₋₁ with r, aₙ₋₂ with 1: r²−5r+6=0." },
      { id: "rr-q2", question: "Repeated root r gives general solution:", options: ["A·rⁿ", "(A+Bn)·rⁿ", "A·rⁿ+B·rⁿ", "A·n·rⁿ"], correct: 1, explanation: "For repeated root r: aₙ = (A+Bn)·rⁿ." },
      { id: "rr-q3", question: "1/(1−x) generates the sequence:", options: ["1,1,1,1,...", "1,2,3,4,...", "0,1,2,3,...", "1,0,1,0,..."], correct: 0, explanation: "1/(1−x) = Σxⁿ = 1+x+x²+... → coefficients are 1,1,1,..." },
      { id: "rr-q4", question: "1/(1−x)² generates:", options: ["1,1,1,...", "1,2,3,4,...", "0,1,2,3,...", "1,2,4,8,..."], correct: 1, explanation: "1/(1−x)² = Σ(n+1)xⁿ → coefficients 1,2,3,4,..." },
      { id: "rr-q5", question: "Non-homogeneous recurrence solution =", options: ["Only particular", "Only homogeneous", "Homogeneous + Particular", "Homogeneous × Particular"], correct: 2, explanation: "General solution = homogeneous solution + particular solution." },
      { id: "rr-q6", question: "Fibonacci: Fₙ=Fₙ₋₁+Fₙ₋₂. Characteristic roots are:", options: ["1,2", "(1±√5)/2", "2,3", "(1±√3)/2"], correct: 1, explanation: "r²−r−1=0 → r=(1±√5)/2 (golden ratio and conjugate)." }
    ]
  },
  {
    topicId: "algebraic-structures",
    questions: [
      { id: "as-q1", question: "A group must satisfy:", options: ["Closure + Associativity", "Closure + Assoc + Identity", "Closure + Assoc + Identity + Inverse", "Only Closure"], correct: 2, explanation: "Group = Closure + Associativity + Identity + Inverse." },
      { id: "as-q2", question: "(Z,+) is a group. What is the identity?", options: ["1", "0", "−1", "No identity"], correct: 1, explanation: "For addition, the identity element is 0 since a+0=a." },
      { id: "as-q3", question: "Lagrange's Theorem states:", options: ["|H| = |G|", "|H| divides |G|", "|G| divides |H|", "|H| + |G| = 0"], correct: 1, explanation: "The order of any subgroup divides the order of the group." },
      { id: "as-q4", question: "Zₙ is a field if and only if n is:", options: ["Even", "Odd", "Prime", "Composite"], correct: 2, explanation: "Every non-zero element has inverse iff n is prime." },
      { id: "as-q5", question: "A 4-cycle decomposes into how many transpositions?", options: ["2", "3", "4", "1"], correct: 1, explanation: "A k-cycle = (k−1) transpositions. So 4-cycle = 3 transpositions." },
      { id: "as-q6", question: "If Φ is a homomorphism, Φ(e) = ?", options: ["e", "ē (identity of target)", "0", "1"], correct: 1, explanation: "Homomorphism maps identity to identity of the target group." },
      { id: "as-q7", question: "Zero divisors in Z₈ are:", options: ["{1,3,5,7}", "{2,4,6}", "{0,4}", "{2,3,5}"], correct: 1, explanation: "Even elements 2,4,6 are zero divisors. 2×4=8≡0, 4×4=16≡0, 6×4=24≡0." },
      { id: "as-q8", question: "A semigroup has:", options: ["Closure only", "Closure + Associativity", "Closure + Identity", "All group properties"], correct: 1, explanation: "Semigroup = Closure + Associativity." }
    ]
  },
  {
    topicId: "graph-theory",
    questions: [
      { id: "gt-q1", question: "Handshaking Theorem: Σdeg(v) = ?", options: ["|E|", "2|E|", "|V|", "2|V|"], correct: 1, explanation: "Sum of all degrees = 2 × number of edges." },
      { id: "gt-q2", question: "Complete graph K₅ has how many edges?", options: ["5", "10", "15", "20"], correct: 1, explanation: "Kₙ has n(n−1)/2 edges. K₅ = 5×4/2 = 10." },
      { id: "gt-q3", question: "Euler circuit exists iff:", options: ["All vertices even degree", "Exactly 2 odd vertices", "All vertices odd", "Graph is complete"], correct: 0, explanation: "Connected graph has Euler circuit iff ALL vertices have even degree." },
      { id: "gt-q4", question: "Euler's formula for planar graphs: v−e+f = ?", options: ["0", "1", "2", "3"], correct: 2, explanation: "v − e + f = 2 for connected planar graphs." },
      { id: "gt-q5", question: "A tree with n vertices has how many edges?", options: ["n", "n−1", "n+1", "2n"], correct: 1, explanation: "Tree: connected, no cycles, exactly n−1 edges." },
      { id: "gt-q6", question: "Chromatic number of K₄:", options: ["2", "3", "4", "5"], correct: 2, explanation: "Complete graph Kₙ needs exactly n colors. χ(K₄) = 4." },
      { id: "gt-q7", question: "Which is NOT a tree property?", options: ["Connected", "n−1 edges", "Contains a cycle", "Unique paths"], correct: 2, explanation: "Trees have NO cycles. That's their defining property." },
      { id: "gt-q8", question: "Kruskal's algorithm finds:", options: ["Shortest path", "Euler circuit", "MST", "Chromatic number"], correct: 2, explanation: "Kruskal's finds Minimum Spanning Tree by sorting edges and adding greedily." }
    ]
  }
];
