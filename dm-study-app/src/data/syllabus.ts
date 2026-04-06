export interface Subtopic {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  weightage: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  subtopics: Subtopic[];
}

export const TOPICS: Topic[] = [
  {
    id: "propositional-logic",
    title: "Propositional Logic",
    slug: "propositional-logic",
    weightage: 10,
    priority: "HIGH",
    subtopics: [
      {
        id: "propositions",
        title: "Propositions & Truth Values",
        content: `A proposition is a statement/sentence that can be TRUE or FALSE but not both.
Examples: "2+3=5" ✓ (True), "Hello & welcome Dosto" ✗ (not a proposition)

CONNECTIVES (Operators):
1. NOT / Negation (~, ¬): flips truth value. T→F, F→T
2. Conjunction (∧) AND: T only when BOTH are T
   Truth table: TT→T, TF→F, FT→F, FF→F
3. Disjunction (∨) OR: F only when BOTH are F
   Truth table: TT→T, TF→T, FT→T, FF→F
4. Implication (→) "If A then B": FALSE only when A=T and B=F
   Truth table: TT→T, TF→F, FT→T, FF→T
5. Exclusive OR (⊕): T when exactly one is T
   Truth table: TT→F, TF→T, FT→T, FF→F
6. Biconditional (↔): T when both same
   Truth table: TT→T, TF→F, FT→F, FF→T

KEY RELATIONS (given A→B):
- Converse: B→A
- Inverse: ~A→~B
- Contrapositive: ~B→~A  [EQUIVALENT to original]
- A→B is equivalent to ~A∨B`
      },
      {
        id: "tautology",
        title: "Tautology, Contradiction, Contingency",
        content: `TAUTOLOGY: All rows in truth table are TRUE
CONTRADICTION: All rows are FALSE
CONTINGENCY: Mix of True and False

Example: [(A→B) ∧ A] → B
Build truth table:
A  B  A→B  (A→B)∧A  [(A→B)∧A]→B
T  T   T      T          T
T  F   F      F          T
F  T   T      F          T
F  F   T      F          T
All TRUE → TAUTOLOGY (this is Modus Ponens!)

Example: (A∧B)∧~(A∨B)
All FALSE → CONTRADICTION`
      },
      {
        id: "propositional-equivalences",
        title: "Propositional Equivalences & Laws",
        content: `TWO ways to check equivalence:
1. Same truth values in truth table
2. A↔B is a tautology

LAWS:
- Idempotence: P∨P=P, P∧P=P
- Commutative: P∨Q=Q∨P, P∧Q=Q∧P
- Associative: P∨(Q∨R)=(P∨Q)∨R
- Distributive: P∧(Q∨R)=(P∧Q)∨(P∧R)
- Double Negation: ~(~P)=P
- De Morgan: ~(P∧Q)=~P∨~Q, ~(P∨Q)=~P∧~Q
- Identity: P∨T=T, P∨F=P, P∧T=P, P∧F=F
- Complement: P∨~P=T, P∧~P=F

NORMAL FORMS:
- DNF (Disjunctive Normal Form): OR of ANDs
  Example: (A∧B)∨(~A∧B)
- CNF (Conjunctive Normal Form): AND of ORs
  Example: (A∨B)∧(~A∨B)

Converting to DNF:
Step 1: Replace → using A→B ≡ ~A∨B
Step 2: Push ~ inward using De Morgan
Step 3: Distribute ∧ over ∨`
      },
      {
        id: "rules-of-inference",
        title: "Rules of Inference",
        content: `An argument has PREMISES (given true statements) and a CONCLUSION.
Valid argument: if all premises true → conclusion must be true.

RULES:
1. MODUS PONENS:    P→Q (true), P (true) ∴ Q
2. MODUS TOLLENS:   P→Q (true), ~Q (true) ∴ ~P
3. HYPOTHETICAL SYLLOGISM: P→Q, Q→R ∴ P→R
4. DISJUNCTIVE SYLLOGISM: P∨Q, ~P ∴ Q
5. CONJUNCTION: P, Q ∴ P∧Q
6. SIMPLIFICATION: P∧Q ∴ P
7. ADDITION: P ∴ P∨Q

Example argument (from 2022 PYQ):
Let D=Ajaya learns DM, B=Bijaya learns Calc, C=Chinmay learns Calc, E=Deb learns Calc
P1: D→(B∨C)
P2: B→~D
P3: E→~C
Prove: D→~E
From P1,P2: If D, then B or C. If B then ~D (contradiction with D). So C must be true.
From P3: E→~C. Since C is true, ~C is false, so E must be false. ∴ D→~E ✓`
      },
      {
        id: "predicates-quantifiers",
        title: "Predicates & Quantifiers",
        content: `PREDICATE: A statement with variables. P(x): "x is a student"
QUANTIFIERS:
- Universal (∀): "For all" — ∀x P(x) means P(x) is true for every x
- Existential (∃): "There exists" — ∃x P(x) means P(x) true for at least one x

NEGATION RULES:
- ~(∀x P(x)) = ∃x ~P(x)   [negation of "all" = "there exists some not"]
- ~(∃x P(x)) = ∀x ~P(x)   [negation of "exists" = "for all not"]

TRANSLATIONS:
- "All engineers love 5ME" → ∀x [E(x)→L(x)]
- "Some engineers love 5ME" → ∃x [E(x)∧L(x)]
- "Not all people are honest" → ∃x [P(x)∧~H(x)]
- "At least one friend is perfect" → ∃x [F(x)∧P(x)]
- "Not all students are naughty" → ~∀x[S(x)→N(x)] = ∃x[S(x)∧~N(x)]`
      }
    ]
  },
  {
    id: "set-theory-relations",
    title: "Set Theory & Relations",
    slug: "set-theory-relations",
    weightage: 8,
    priority: "HIGH",
    subtopics: [
      {
        id: "sets",
        title: "Sets & Operations",
        content: `SET: Collection of well-defined objects/elements. Notation: { }
Example: S = {2,4,6,8}

TYPES: Singleton, Empty(∅), Finite, Infinite, Subset, Powerset, Universal, Disjoint

OPERATIONS:
- Union (∪): A∪B = all elements in A or B
- Intersection (∩): A∩B = elements in both
- Difference (−): A−B = in A but not B
- Complement (Aᶜ): elements NOT in A
- Symmetric Difference (⊕): (A∪B)−(A∩B) = elements in one but not both

POWER SET: P(A) = all subsets of A. If |A|=n, |P(A)|=2ⁿ
Example: A={1,2} → P(A)={∅,{1},{2},{1,2}}

CARTESIAN PRODUCT: A×B = {(a,b) | a∈A, b∈B}
If |A|=m, |B|=n → |A×B|=m×n, total relations=2^(m×n)

INCLUSION-EXCLUSION:
|A∪B| = |A|+|B|−|A∩B|
|A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|`
      },
      {
        id: "relations",
        title: "Types of Relations",
        content: `RELATION R on set A: subset of A×A

TYPES:
1. EMPTY: R = {} (no pairs)
2. UNIVERSAL: R = A×A (all pairs)
3. IDENTITY: I = {(a,a) | a∈A}
4. INVERSE: R⁻¹ = {(b,a) | (a,b)∈R}

PROPERTIES:
5. REFLEXIVE: (a,a)∈R for ALL a∈A
   Min pairs: n (diagonal). Total reflexive relations = 2^(n²−n)
6. SYMMETRIC: (a,b)∈R → (b,a)∈R
7. ANTISYMMETRIC: (a,b)∈R and (b,a)∈R → a=b
8. TRANSITIVE: (a,b)∈R and (b,c)∈R → (a,c)∈R
   Key: if A→B and B→C then A→C must be in R

9. EQUIVALENCE = Reflexive + Symmetric + Transitive
10. PARTIAL ORDER (POSET) = Reflexive + Antisymmetric + Transitive

COMPLEMENT of R (Rᶜ): pairs NOT in R
INVERSE of R (R⁻¹): reverse all pairs

Example: R={(a,b)|a<b} on reals
Rᶜ = {(a,b)|a≥b}, R⁻¹ = {(a,b)|a>b}`
      },
      {
        id: "closure",
        title: "Closure Operations",
        content: `REFLEXIVE CLOSURE: Add all (a,a) pairs
SYMMETRIC CLOSURE: For each (a,b), add (b,a)
TRANSITIVE CLOSURE: Use Warshall's Algorithm

WARSHALL'S ALGORITHM:
Given relation on set {1,2,...,n}:
1. Create boolean matrix M where M[i][j]=1 if (i,j)∈R
2. For k=1 to n:
   For i=1 to n:
     For j=1 to n:
       M[i][j] = M[i][j] OR (M[i][k] AND M[k][j])
3. Final matrix gives transitive closure

Example: R={(1,4),(2,1),(2,3),(3,1),(3,4),(4,3)} on {1,2,3,4}
Build 4×4 matrix, apply Warshall's → get transitive closure matrix`
      },
      {
        id: "equivalence-classes",
        title: "Equivalence Classes & Partitions",
        content: `EQUIVALENCE CLASS of a: [a] = {b∈A | (a,b)∈R}
Equivalence classes PARTITION the set (disjoint, cover whole set)

Example: R = {(a,b) | a≡b (mod 5)} on integers
Equivalence classes: [0]={...,-5,0,5,10,...}
                     [1]={...,-4,1,6,11,...}
                     [2]={...,-3,2,7,12,...}
                     [3]={...,-2,3,8,13,...}
                     [4]={...,-1,4,9,14,...}
5 disjoint equivalence classes

PARTITIONS → EQUIVALENCE RELATION:
If A₁={a,b}, A₂={c}, A₃={d,e} partition S={a,b,c,d,e}
Then R={(a,a),(a,b),(b,a),(b,b),(c,c),(d,d),(d,e),(e,d),(e,e)}`
      }
    ]
  },
  {
    id: "poset-lattice",
    title: "POSET, Hasse Diagrams & Lattices",
    slug: "poset-lattice",
    weightage: 8,
    priority: "HIGH",
    subtopics: [
      {
        id: "poset",
        title: "Partially Ordered Sets",
        content: `POSET: A set with a Partial Order Relation (Reflexive+Antisymmetric+Transitive)
Notation: [A, R] or (A, ≤)

COMPARABLE: a and b comparable if a≤b or b≤a
TOTALLY ORDERED SET (Chain): ALL elements comparable

POSET TERMINOLOGY:
- MAXIMAL: no element GREATER than it (can have multiple)
- MINIMAL: no element LESS than it (can have multiple)
- GREATEST (MAXIMUM): ONE element greater than ALL others
- LEAST (MINIMUM): ONE element less than ALL others

Upper Bound of {a,b}: element x where a≤x AND b≤x
Lower Bound of {a,b}: element x where x≤a AND x≤b
LUB (Least Upper Bound / Join ∨): smallest upper bound
GLB (Greatest Lower Bound / Meet ∧): largest lower bound

Example: Poset ({2,4,6,9,12,18,27,36,48,60,72}, |) [divides relation]
- Minimal elements: 2, 9
- Maximal elements: 48, 60, 72
- Greatest element: None
- Least element: None
- Upper bounds of {2,9}: {18,36,72}
- LUB of {2,9}: 18
- Lower bounds of {60,72}: {2,4,6,12}
- GLB of {60,72}: 12`
      },
      {
        id: "hasse",
        title: "Hasse Diagrams",
        content: `Hasse diagram: simplified picture of POSET
Rules to draw:
1. Plot a vertex for every element
2. Draw edge from x to y (upward) if x<y in the partial order
3. REMOVE reflexive edges (self-loops)
4. REMOVE transitive edges (if x<y<z, remove x→z, it's implied)
5. Direction = upward (no arrowheads needed)

Example: A={4,5,6,7}, R is total order
Hasse Diagram:
    7
    |
    6
    |
    5
    |
    4
(Linear chain: 4<5<6<7)

Example: A={2,3,4,7}
Hasse:
      7
     / \\
    3   4
     \\ /
      2`
      },
      {
        id: "lattice",
        title: "Lattices",
        content: `LATTICE: A POSET where EVERY PAIR of elements has both a LUB (join) and GLB (meet)

Notation: a∨b = join (LUB), a∧b = meet (GLB)

Example lattice with Hasse:
      7
     / \\
    3   4
     \\ /
      2
3∨4 = 7 (join), 3∧4 = 2 (meet) ✓ → IS a lattice

BOUNDED LATTICE: has a greatest element (1/top) and least element (0/bottom)
COMPLEMENTED LATTICE: every element a has complement aᶜ where:
  a∨aᶜ = top (1), a∧aᶜ = bottom (0)
DISTRIBUTIVE LATTICE: a∧(b∨c) = (a∧b)∨(a∧c) and a∨(b∧c) = (a∨b)∧(a∨c)

BOOLEAN ALGEBRA: Complemented + Distributive Lattice

Example: Find complement in lattice {1,2,3,4} with Hasse:
      4
     / \\
    2   3
     \\ /
      1
2∨3=4 (top), 2∧3=1 (bottom) → 2 and 3 are complements of each other!`
      }
    ]
  },
  {
    id: "mathematical-induction",
    title: "Mathematical Induction",
    slug: "mathematical-induction",
    weightage: 6,
    priority: "MEDIUM",
    subtopics: [
      {
        id: "induction-steps",
        title: "Steps of Mathematical Induction",
        content: `THREE STEPS:
① Base case: prove for n=1
② Inductive hypothesis: ASSUME true for n=k
③ Inductive step: PROVE true for n=k+1

Example 1: Prove 1+3+5+...+(2n−1) = n²
① n=1: LHS = 2(1)−1 = 1. RHS = 1² = 1. LHS=RHS ✓
② Assume: 1+3+5+...+(2k−1) = k²
③ Prove for n=k+1: 1+3+...+(2k−1)+(2(k+1)−1) = (k+1)²
   LHS = k² + (2k+1) = k²+2k+1 = (k+1)² = RHS ✓

Example 2: Prove 1+2+3+...+n = n(n+1)/2
① n=1: LHS=1, RHS=1(2)/2=1 ✓
② Assume: 1+2+...+k = k(k+1)/2
③ For n=k+1: 1+2+...+k+(k+1) = (k+1)(k+2)/2
   LHS = k(k+1)/2 + (k+1) = (k+1)[k/2+1] = (k+1)(k+2)/2 = RHS ✓

STRONG INDUCTION: Assume true for ALL values up to k (not just k)
Used to prove: every integer n>1 can be written as product of primes

Example 3 (PYQ 2022): Prove 21 | (4^(n+1) + 5^(2n−1)) for all positive integers n
① n=1: 4²+5¹=16+5=21. 21|21 ✓
② Assume: 21 | (4^(k+1) + 5^(2k−1))
③ 4^(k+2)+5^(2k+1) = 4·4^(k+1)+25·5^(2k−1)
   = 4·4^(k+1)+4·5^(2k−1)+21·5^(2k−1)
   = 4(4^(k+1)+5^(2k−1))+21·5^(2k−1)
   Both terms divisible by 21 ✓

Example 4 (PYQ 2023): Prove n³−n divisible by 3
① n=1: 1−1=0. 3|0 ✓
② Assume: 3|(k³−k)
③ (k+1)³−(k+1) = k³+3k²+3k+1−k−1
   = (k³−k)+3k²+3k = (k³−k)+3k(k+1)
   Both terms divisible by 3 ✓`
      }
    ]
  },
  {
    id: "functions-combinatorics",
    title: "Functions & Combinatorics",
    slug: "functions-combinatorics",
    weightage: 7,
    priority: "MEDIUM",
    subtopics: [
      {
        id: "functions",
        title: "Functions & Types",
        content: `FUNCTION f: A→B: Each element of A maps to exactly one element of B

TYPES:
1. INJECTIVE (One-to-One): different inputs → different outputs. |A|≤|B|
   Count: n!/(n-m)! (n=|B|, m=|A|)
2. SURJECTIVE (Onto): every element of B is mapped to. |A|≥|B|
3. BIJECTIVE: both injective and surjective. |A|=|B|, count=n!
4. INVERSE f⁻¹: only exists if f is bijective. f(x)=y ↔ f⁻¹(y)=x

FUNCTION COMPOSITION:
fog(x) = f(g(x))  [apply g first, then f]
gof(x) = g(f(x))  [apply f first, then g]

Example: f(x)=2x, g(x)=x+1
fog(x) = f(g(x)) = f(x+1) = 2(x+1)
At x=1: fog(1) = 2(2) = 4

Total functions from A to B: |B|^|A|`
      },
      {
        id: "combinatorics",
        title: "Combinations & Permutations",
        content: `PERMUTATION (order matters, like passwords/arrangements):
ⁿPₖ = n!/(n-k)!

COMBINATION (order doesn't matter, like selecting teams):
ⁿCₖ = n!/(k!(n-k)!)

PRODUCT RULE: Task1 has m ways AND Task2 has n ways → m×n total
SUM RULE: Task1 has m ways OR Task2 has n ways (mutually exclusive) → m+n total

Examples:
- 3-digit number from {1,2,3,4,5} with repetition: 5×5×5=125
- Without repetition: ⁵P₃ = 5!/(5-3)! = 60
- Select 5 from 25: ²⁵C₅ = 25!/(5!·20!) = 53130
- Group of 5 from 7 girls and 4 boys with at least 3 girls:
  ⁷C₃·⁴C₂ + ⁷C₄·⁴C₁ + ⁷C₅·⁴C₀ = 35·6+35·4+21·1 = 210+140+21=371

PIGEONHOLE PRINCIPLE: If n+1 objects in n boxes → at least one box has ≥2 objects`
      }
    ]
  },
  {
    id: "recurrence-relations",
    title: "Recurrence Relations",
    slug: "recurrence-relations",
    weightage: 8,
    priority: "HIGH",
    subtopics: [
      {
        id: "homogeneous",
        title: "Homogeneous Recurrence Relations",
        content: `FORM: aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ (no extra function of n on RHS)

SOLUTION METHOD (Characteristic Equation):
1. Write characteristic equation: r² - c₁r - c₂ = 0
2. Find roots r₁, r₂

CASE 1 - DISTINCT ROOTS (r₁ ≠ r₂):
  aₙ = A·r₁ⁿ + B·r₂ⁿ
  Use initial conditions to find A, B

CASE 2 - REPEATED ROOT (r₁ = r₂ = r):
  aₙ = (A + Bn)·rⁿ

Example (PYQ 2022): aₙ − 5aₙ₋₁ + 6aₙ₋₂ = 0
Characteristic eq: r² − 5r + 6 = 0 → (r−2)(r−3)=0 → r₁=2, r₂=3
General solution: aₙ = A·2ⁿ + B·3ⁿ

Example (PYQ 2023): Fₙ = 6Fₙ₋₁ − 9Fₙ₋₂, F₀=1, F₁=6
Char eq: r² − 6r + 9 = 0 → (r−3)² = 0 → r=3 (repeated)
General: Fₙ = (A+Bn)·3ⁿ
At n=0: A·1 = 1 → A=1
At n=1: (1+B)·3 = 6 → 1+B=2 → B=1
∴ Fₙ = (1+n)·3ⁿ`
      },
      {
        id: "non-homogeneous",
        title: "Non-Homogeneous Recurrence Relations",
        content: `FORM: aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + f(n)  [f(n) ≠ 0]

SOLUTION = Homogeneous solution + Particular solution

METHOD 1: Using Generating Functions
METHOD 2: Method of undetermined coefficients

Example (PYQ): aₙ = 3aₙ₋₁ + 4ⁿ, a₀=1
Homogeneous: aₙ⁽ʰ⁾ = A·3ⁿ (from r−3=0)
Particular: Try aₙ⁽ᵖ⁾ = C·4ⁿ
  C·4ⁿ = 3·C·4ⁿ⁻¹ + 4ⁿ
  C·4 = 3C + 4
  4C−3C = 4 → C=4
Particular: aₙ⁽ᵖ⁾ = 4·4ⁿ = 4ⁿ⁺¹
General: aₙ = A·3ⁿ + 4ⁿ⁺¹
At n=0: 1 = A + 4 → A = −3
∴ aₙ = −3·3ⁿ + 4ⁿ⁺¹ = 4ⁿ⁺¹ − 3ⁿ⁺¹

Example (PYQ 2022): aₙ = 4aₙ₋₁ − 4aₙ₋₂ + n·2ⁿ
Char eq: r²−4r+4=0 → (r−2)²=0 → r=2 (repeated)
Homogeneous: aₙ⁽ʰ⁾ = (A+Bn)·2ⁿ
Particular: f(n)=n·2ⁿ, since 2 is double root of multiplicity 2, try:
  aₙ⁽ᵖ⁾ = n²(Cn+D)·2ⁿ
Solve for C, D using recurrence.`
      },
      {
        id: "generating-functions",
        title: "Generating Functions",
        content: `GENERATING FUNCTION of sequence {aₙ}: G(x) = Σ aₙxⁿ = a₀+a₁x+a₂x²+...

USE: To solve recurrence relations

Example (PYQ 2022): aₙ−6aₙ₋₁+9aₙ₋₂=0, a₀=1, a₁=6
Step 1: Multiply recurrence by xⁿ and sum from n=2 to ∞
  G(x)−a₀−a₁x − 6x(G(x)−a₀) + 9x²G(x) = 0
  G(x)(1−6x+9x²) = a₀+a₁x−6a₀x = 1+6x−6x = 1
  G(x) = 1/(1−6x+9x²) = 1/(1−3x)²
  = Σ (n+1)·3ⁿ·xⁿ
∴ aₙ = (n+1)·3ⁿ

Key generating function formulas:
- 1/(1−x) = Σ xⁿ
- 1/(1−ax) = Σ aⁿxⁿ
- 1/(1−x)² = Σ (n+1)xⁿ
- (1+x)ⁿ = Σ C(n,k)xᵏ

Writing GF for sequences:
- <1,−1,1,−1,...> = 1/(1+x)`
      }
    ]
  },
  {
    id: "algebraic-structures",
    title: "Algebraic Structures (Groups, Rings)",
    slug: "algebraic-structures",
    weightage: 10,
    priority: "HIGH",
    subtopics: [
      {
        id: "algebraic-structure",
        title: "Algebraic Structure, Semigroup, Monoid",
        content: `ALGEBRAIC STRUCTURE (A, *): Non-empty set A with binary operation * that satisfies CLOSURE:
  For all a,b∈A → a*b∈A

SEMIGROUP: Closure + Associativity
  (a*b)*c = a*(b*c) for all a,b,c
  Examples: (N,+), (N,×), (Z,+), (Z,×), (R,+), (R,×), (M,+), (M,×)

MONOID: Semigroup + Identity element e where:
  a*e = e*a = a for all a
  Identity for + is 0, for × is 1
  (N,+): 0∉N so NOT monoid. (N,×): 1∈N → IS monoid
  (Z,+),(Z,×),(R,+),(R,×),(M,+),(M,×) are all monoids

GROUP: Monoid + Inverse element for each a∈A:
  ∃a⁻¹ such that a*a⁻¹ = a⁻¹*a = e
  (N,+): no negatives → NOT group. (N,×): no fractions → NOT group
  (Z,+): YES group (5+(−5)=0). (Z,×): 1/5∉Z → NOT group
  (R,+): YES group. (R−{0},×): YES group (every element has reciprocal)

ABELIAN GROUP: Group + Commutativity (a*b=b*a)
  (Z,+),(R,+),(M,+) are Abelian groups`
      },
      {
        id: "group-theorems",
        title: "Group Theorems & Properties",
        content: `LAGRANGE'S THEOREM: Order of any subgroup H divides order of group G
  |G| = |H| × number of cosets

Proof sketch:
- Let H be subgroup of G with |H|=m
- Define cosets: aH = {ah | h∈H} for each a∈G
- Show cosets are either equal or disjoint
- Show each coset has exactly |H| elements
- G is partitioned by cosets → |G| = |H| × (number of cosets)

SUBGROUP: H⊆G is subgroup if (H,*) is itself a group
  Test: a,b∈H → a*b⁻¹∈H (one-step subgroup test)

CYCLIC GROUP: Group generated by a single element g
  G = {gⁿ | n∈Z} = <g>
  Example: ({1,−1,i,−i}, ×)
  i¹=i, i²=−1, i³=−i, i⁴=1 → i generates the whole group

ORDER OF ELEMENT a: smallest positive n where aⁿ=e

NORMAL SUBGROUP N of G: gNg⁻¹=N for all g∈G
  Every subgroup of abelian group is normal`
      },
      {
        id: "homomorphism",
        title: "Homomorphism & Isomorphism",
        content: `HOMOMORPHISM Φ: G→G̅ (structure-preserving map):
  Φ(a*b) = Φ(a)#Φ(b) for all a,b∈G

PROPERTIES OF HOMOMORPHISM (PYQ 2022):
1. Φ(e) = ē (identity maps to identity)
   Proof: Φ(e) = Φ(e*e) = Φ(e)#Φ(e)
   Multiply both sides by [Φ(e)]⁻¹: ē = Φ(e) ✓

2. Φ(a⁻¹) = [Φ(a)]⁻¹ for all a∈G
   Proof: Φ(a)*Φ(a⁻¹) = Φ(a*a⁻¹) = Φ(e) = ē
   So Φ(a⁻¹) is inverse of Φ(a) → Φ(a⁻¹)=[Φ(a)]⁻¹ ✓

ISOMORPHISM: Bijective homomorphism (one-to-one and onto)
KERNEL: ker(Φ) = {a∈G | Φ(a)=ē} — always a normal subgroup

PERMUTATION GROUPS:
Permutation: bijection from {1,...,n} to itself
Cycle notation: (1 5 4 2)(3)(6 7)
Even permutation: even number of transpositions
Odd permutation: odd number of transpositions`
      },
      {
        id: "rings",
        title: "Rings & Fields",
        content: `RING (R,+,×):
- (R,+) is abelian group
- (R,×) is semigroup (closure + associativity)
- Distributive: a×(b+c)=a×b+a×c

ZERO DIVISOR: Non-zero a∈R where ∃ non-zero b with a×b=0
Example: In Z₈: 2⊗₈4=8≡0 → 2,4 are zero divisors
Zero divisors in Z₈: {2, 4, 6}

UNIT: Element with multiplicative inverse
Units of Z₆: Elements coprime to 6 → {1,5}

INTEGRAL DOMAIN: Commutative ring with no zero divisors
FIELD: Commutative ring where every non-zero element has multiplicative inverse
  (Zₙ,⊕ₙ,⊗ₙ) is field iff n is PRIME

ADDITION MODULO n (⊕ₙ): a⊕ₙb = (a+b) mod n
MULTIPLICATION MODULO n (⊗ₙ): a⊗ₙb = (a×b) mod n`
      }
    ]
  },
  {
    id: "graph-theory",
    title: "Graph Theory",
    slug: "graph-theory",
    weightage: 9,
    priority: "HIGH",
    subtopics: [
      {
        id: "graph-basics",
        title: "Graph Basics & Types",
        content: `GRAPH G=(V,E): V=vertices (nodes), E=edges (lines/arcs)
ORDER: |V| (number of vertices)
SIZE: |E| (number of edges)

TYPES:
1. Undirected: edges are unordered pairs {u,v}
2. Directed (Digraph): edges are ordered pairs (u,v)
3. Simple: no self-loops, no multiple edges
4. Multigraph: multiple edges allowed
5. Weighted: edges have numerical weights
6. Complete graph Kₙ: every pair adjacent, has n(n−1)/2 edges
7. Bipartite: vertices split into V₁,V₂ where edges only go V₁↔V₂
8. Regular: all vertices have same degree (k-regular)
9. Planar: can be drawn without edge crossings
10. Null graph: no edges

DEGREE: deg(v) = number of edges incident to v
  Self-loop contributes 2 to degree!

HANDSHAKING THEOREM: Σdeg(v) = 2|E|
  Corollary: Number of odd-degree vertices is ALWAYS EVEN

ADJACENCY MATRIX: n×n matrix, A[i][j]=1 if edge between vᵢ and vⱼ
INCIDENCE MATRIX: n×m matrix, M[i][j]=1 if vertex vᵢ on edge eⱼ`
      },
      {
        id: "paths-circuits",
        title: "Paths, Circuits & Connectivity",
        content: `WALK: sequence of vertices and edges (can repeat)
TRAIL: walk with no repeated EDGES
PATH: walk with no repeated VERTICES
CIRCUIT: closed trail
CYCLE: closed path

EULER GRAPH (Eulerian Circuit):
- Visits every EDGE exactly once, returns to start
- Condition: Connected + ALL vertices have EVEN degree
- Euler PATH: exactly 2 odd-degree vertices

HAMILTONIAN GRAPH (Hamiltonian Circuit):
- Visits every VERTEX exactly once, returns to start
- No simple necessary+sufficient condition (NP-complete)

DIJKSTRA'S ALGORITHM:
1. Start: S={source}, set d[source]=0, d[others]=∞
2. Find unvisited vertex with minimum tentative distance
3. Add to S, update distances through it
4. Repeat until all vertices in S`
      },
      {
        id: "planar-euler",
        title: "Planar Graphs & Euler's Formula",
        content: `PLANAR GRAPH: Can be drawn without edge crossings

EULER'S FORMULA (connected planar graphs):
  v − e + f = 2
  where v=vertices, e=edges, f=faces (including outer face)

K₅ (5 vertices, 10 edges) is NON-PLANAR
K₃,₃ (complete bipartite, 3+3) is NON-PLANAR
Kuratowski's Theorem: G is planar iff no subdivision of K₅ or K₃,₃

GRAPH COLORING:
Chromatic number χ(G): minimum colors needed
- Planar graphs: χ(G) ≤ 4 (Four Color Theorem)
- Complete graph Kₙ: χ(Kₙ) = n
- Bipartite graph: χ = 2`
      },
      {
        id: "trees",
        title: "Trees & Spanning Trees",
        content: `TREE: Connected graph with NO cycles
  Properties: n vertices → n−1 edges, unique path between any two vertices

ROOTED TREE: Root, Leaf, Parent, Children, Ancestor, Descendant, Siblings, Depth, Height

BINARY TREE: each node has at most 2 children
- Full BT: each node has 0 or 2 children
- Complete BT: all levels full except possibly last
- Perfect BT: all leaves at same level
- Max nodes with height h: 2^(h+1)−1

TREE TRAVERSAL:
- Inorder: Left→Root→Right
- Preorder: Root→Left→Right
- Postorder: Left→Right→Root

MINIMUM SPANNING TREE (MST):
- PRIM'S: Start with any vertex, greedily add minimum weight edge
- KRUSKAL'S: Sort edges by weight, add if no cycle forms

HUFFMAN CODING:
- Sort by frequency ascending
- Combine 2 minimum-frequency nodes repeatedly
- Left edge=0, Right edge=1`
      }
    ]
  }
];

export const TOTAL_WEIGHTAGE = TOPICS.reduce((sum, t) => sum + t.weightage, 0);
export const TOTAL_SUBTOPICS = TOPICS.reduce((sum, t) => sum + t.subtopics.length, 0);
