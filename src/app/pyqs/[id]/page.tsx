'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { PYQS } from '@/data/pyqs';
import { TOPICS } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useState } from 'react';

export default function PYQSolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pyq = PYQS.find(p => p.id === id);
  if (!pyq) notFound();
  const progress = useProgress();
  const [revealedSteps, setRevealedSteps] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const topic = TOPICS.find(t => t.id === pyq.topicId);
  const pyqIndex = PYQS.findIndex(p => p.id === id);
  const prevPyq = pyqIndex > 0 ? PYQS[pyqIndex - 1] : null;
  const nextPyq = pyqIndex < PYQS.length - 1 ? PYQS[pyqIndex + 1] : null;
  const solved = progress.solvedPyqs.includes(pyq.id);

  const revealStep = (step: number) => {
    if (!revealedSteps.includes(step)) {
      setRevealedSteps(prev => [...prev, step]);
    }
  };

  const revealAll = () => {
    setShowAll(true);
    setRevealedSteps(pyq.solution.steps.map(s => s.step));
  };

  const isRevealed = (step: number) => showAll || revealedSteps.includes(step);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748b] mb-6">
          <Link href="/pyqs" className="hover:text-[#7c3aed] transition-colors">PYQs</Link>
          <span>/</span>
          <span className="text-[#f1f5f9]">{pyq.id.toUpperCase()}</span>
        </div>

        {/* Question Card */}
        <div className="p-6 rounded-2xl bg-[#12121a] border border-[#7c3aed]/20 glow-violet mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs rounded-full bg-[#7c3aed]/20 text-[#7c3aed] font-mono">{pyq.year}</span>
            <span className="px-3 py-1 text-xs rounded-full bg-[#06b6d4]/20 text-[#06b6d4]">Section {pyq.section}</span>
            <span className="px-3 py-1 text-xs rounded-full bg-[#f59e0b]/20 text-[#f59e0b] font-mono">{pyq.marks} marks</span>
            {topic && (
              <Link href={`/topics/${topic.slug}`} className="px-3 py-1 text-xs rounded-full bg-white/5 text-[#64748b] hover:text-[#7c3aed] transition-colors">
                📚 {topic.title}
              </Link>
            )}
          </div>
          <h2 className="text-lg font-semibold text-[#f1f5f9]">{pyq.question}</h2>
        </div>

        {/* Solution Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold gradient-text">Step-by-Step Solution</h3>
            <button onClick={revealAll} className="px-4 py-1.5 rounded-lg text-xs bg-[#7c3aed]/20 text-[#7c3aed] hover:bg-[#7c3aed]/30 transition-all">
              Reveal All Steps
            </button>
          </div>

          <div className="space-y-3">
            {pyq.solution.steps.map((step, i) => {
              const revealed = isRevealed(step.step);
              const isAnswer = step.isAnswer;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`rounded-xl border overflow-hidden transition-all ${isAnswer && revealed ? 'border-[#10b981]/40 glow-success' : 'border-white/5'}`}>
                    <button
                      onClick={() => revealStep(step.step)}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-all ${revealed ? 'bg-[#12121a]' : 'bg-[#12121a] hover:bg-white/5'}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${isAnswer && revealed ? 'bg-[#10b981] text-white' : revealed ? 'bg-[#7c3aed] text-white' : 'bg-white/10 text-[#64748b]'}`}>
                        {step.step}
                      </span>
                      <span className={`font-medium text-sm ${revealed ? 'text-[#f1f5f9]' : 'text-[#64748b]'}`}>
                        {step.title}
                      </span>
                      {!revealed && (
                        <span className="ml-auto text-xs text-[#64748b]">Click to reveal →</span>
                      )}
                    </button>

                    <AnimatePresence>
                      {revealed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                          <div className={`px-4 pb-4 pt-0 ml-10 ${isAnswer ? 'text-[#10b981]' : 'text-[#f1f5f9]/80'}`}>
                            {isAnswer && (
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="inline-block px-3 py-1 text-xs rounded-full bg-[#10b981]/20 text-[#10b981] font-bold mb-2"
                              >
                                ✓ FINAL ANSWER
                              </motion.div>
                            )}
                            <div className={`text-sm whitespace-pre-wrap font-mono ${isAnswer ? 'p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20' : ''}`}>
                              {step.content}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Concept Used */}
        <div className="p-4 rounded-xl bg-[#06b6d4]/10 border border-[#06b6d4]/20 mb-8">
          <div className="text-xs text-[#06b6d4] font-bold uppercase tracking-wider mb-1">Key Concept Used</div>
          <p className="text-sm text-[#f1f5f9]/80">{pyq.solution.conceptUsed}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => progress.togglePyqSolved(pyq.id)}
            className={`flex-1 py-3 rounded-xl font-bold text-center transition-all ${solved ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' : 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white'}`}
          >
            {solved ? '✓ Marked as Solved' : 'Mark as Solved'}
          </button>
          {topic && (
            <Link href={`/topics/${topic.slug}`}
              className="flex-1 py-3 rounded-xl font-bold text-center bg-[#12121a] border border-white/10 text-[#64748b] hover:text-white hover:border-[#7c3aed]/30 transition-all">
              📚 Study Related Topic
            </Link>
          )}
        </div>

        {/* Prev/Next Navigation */}
        <div className="flex justify-between">
          {prevPyq ? (
            <Link href={`/pyqs/${prevPyq.id}`} className="text-sm text-[#64748b] hover:text-[#7c3aed] transition-colors">← Previous PYQ</Link>
          ) : <div />}
          {nextPyq ? (
            <Link href={`/pyqs/${nextPyq.id}`} className="text-sm text-[#64748b] hover:text-[#7c3aed] transition-colors">Next PYQ →</Link>
          ) : <div />}
        </div>
      </motion.div>
    </div>
  );
}
