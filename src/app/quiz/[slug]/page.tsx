'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZZES } from '@/data/quizzes';
import { TOPICS } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useState, useEffect, useCallback } from 'react';

const CONFETTI_PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  duration: 2 + ((i * 13) % 21) / 10,
  delay: ((i * 7) % 5) / 10,
  color: ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 5],
}));

export default function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const topic = TOPICS.find(t => t.slug === slug);
  const quiz = QUIZZES.find(q => q.topicId === topic?.id);
  if (!topic || !quiz) notFound();
  const progress = useProgress();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(30);
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null);
  const [confetti, setConfetti] = useState(false);

  const questions = quiz?.questions || [];
  const question = questions[currentQ];

  const handleAnswer = useCallback((optIndex: number) => {
    if (answered || !question) return;
    setSelected(optIndex);
    setAnswered(true);
    const isCorrect = optIndex === question.correct;
    setFlash(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => setFlash(null), 600);
  }, [answered, question]);

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(30);
    } else {
      setFinished(true);
      const pct = Math.round((score / questions.length) * 100);
      if (topic) progress.setQuizScore(topic.id, pct);
      if (pct > 70) setConfetti(true);
    }
  };

  // Timer
  useEffect(() => {
    if (finished || answered) return;
    if (timer <= 0) {
      setTimeout(() => handleAnswer(-1), 0);
      return;
    }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, finished, answered, handleAnswer]);

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Confetti */}
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {CONFETTI_PARTICLES.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: particle.left,
                  background: particle.color,
                }}
                initial={{ top: '-10%', rotate: 0, opacity: 1 }}
                animate={{ top: '110%', rotate: 720, opacity: 0 }}
                transition={{ duration: particle.duration, delay: particle.delay, ease: 'easeIn' }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{pct > 70 ? '🎉' : pct > 40 ? '💪' : '📚'}</div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Quiz Complete!</h2>
          <p className="text-[#64748b] mb-6">{topic.title}</p>

          <div className="inline-block p-8 rounded-2xl bg-[#12121a] border border-white/10 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-6xl font-bold mb-2"
              style={{ color: pct > 70 ? '#10b981' : pct > 40 ? '#f59e0b' : '#ef4444' }}
            >
              {pct}%
            </motion.div>
            <p className="text-[#64748b]">{score}/{questions.length} correct</p>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => { setCurrentQ(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setTimer(30); setConfetti(false); }}
              className="px-6 py-3 rounded-xl bg-[#7c3aed]/20 text-[#7c3aed] font-bold hover:bg-[#7c3aed]/30 transition-all">
              🔄 Retry Quiz
            </button>
            <Link href={`/topics/${slug}`}
              className="px-6 py-3 rounded-xl bg-[#06b6d4]/20 text-[#06b6d4] font-bold hover:bg-[#06b6d4]/30 transition-all">
              📚 Review Topic
            </Link>
            <Link href="/topics"
              className="px-6 py-3 rounded-xl bg-white/5 text-[#64748b] font-bold hover:text-white transition-all">
              ← All Topics
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8 relative">
      {/* Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed inset-0 z-40 pointer-events-none ${flash === 'correct' ? 'bg-[#10b981]/20' : 'bg-[#ef4444]/20'}`}
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold gradient-text">{topic.title} Quiz</h2>
            <p className="text-xs text-[#64748b]">Question {currentQ + 1} of {questions.length}</p>
          </div>
          {/* Timer Ring */}
          <div className="relative w-14 h-14">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#1e1e2e" strokeWidth="4" />
              <motion.circle
                cx="30" cy="30" r="24" fill="none"
                stroke={timer <= 10 ? '#ef4444' : timer <= 20 ? '#f59e0b' : '#7c3aed'}
                strokeWidth="4" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24}
                animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - timer / 30) }}
                transition={{ duration: 0.3 }}
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold font-mono ${timer <= 10 ? 'text-[#ef4444]' : 'text-[#f1f5f9]'}`}>
              {timer}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full"
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 mb-6">
              <p className="text-lg font-semibold">{question.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((opt, i) => {
                const isCorrect = i === question.correct;
                const isSelected = i === selected;
                let borderColor = 'border-white/5';
                let bg = 'bg-[#12121a]';

                if (answered) {
                  if (isCorrect) { borderColor = 'border-[#10b981]/50'; bg = 'bg-[#10b981]/10'; }
                  else if (isSelected && !isCorrect) { borderColor = 'border-[#ef4444]/50'; bg = 'bg-[#ef4444]/10'; }
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    animate={answered && isSelected && !isCorrect ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${borderColor} ${bg} ${!answered ? 'hover:border-[#7c3aed]/30 cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${answered && isCorrect ? 'bg-[#10b981] text-white' : answered && isSelected ? 'bg-[#ef4444] text-white' : 'bg-white/10 text-[#64748b]'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 mb-6"
                >
                  <p className="text-xs text-[#06b6d4] font-bold uppercase mb-1">Explanation</p>
                  <p className="text-sm text-[#f1f5f9]/80">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button */}
            {answered && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={nextQuestion}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold text-center hover:opacity-90 transition-opacity"
              >
                {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
