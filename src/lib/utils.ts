export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const DEADLINE = new Date('2026-04-07T07:30:00+05:30');

export function getTimeRemaining(deadline: Date): { total: number; days: number; hours: number; minutes: number; seconds: number; passed: boolean } {
  const total = deadline.getTime() - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    passed: false,
  };
}

export const MOTIVATIONAL_QUOTES = [
  "The only way to learn mathematics is to do mathematics. — Paul Halmos",
  "Pure mathematics is the world's best game. — Richard Feynman",
  "Mathematics is not about numbers, equations, or algorithms: it is about understanding. — William Thurston",
  "Do not worry about your difficulties in mathematics. I can assure you mine are still greater. — Einstein",
  "The essence of mathematics lies in its freedom. — Georg Cantor",
  "In mathematics, there are no shortcuts. Every step matters. ⚡",
  "You don't have to be great to start, but you have to start to be great.",
  "Discrete math mastered = exam conquered. You've got this! 🔥",
  "Every proof you understand is a weapon in your exam arsenal.",
  "The countdown is real. Your preparation should be too. 💪",
  "One topic at a time. One step at a time. Victory is near.",
  "Understand the concept, don't just memorize. That's the KIIT way.",
];

export const MATH_SYMBOLS = ['∀', '∃', '∧', '∨', '→', '↔', '∈', '⊆', '∪', '∩', '¬', '⊕', '≡', '∅', '⊂', 'Σ', '∴', '∎'];
