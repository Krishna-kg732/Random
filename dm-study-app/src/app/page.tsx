'use client';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useProgress } from '@/context/ProgressContext';
import { TOPICS } from '@/data/syllabus';
import { PYQS } from '@/data/pyqs';
import { MATH_SYMBOLS, MOTIVATIONAL_QUOTES, DEADLINE } from '@/lib/utils';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const start = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value, duration]);
  return <>{display}</>;
}

function ProgressRing({ percentage }: { percentage: number }) {
  const r = 70, c = 2 * Math.PI * r;
  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#1e1e2e" strokeWidth="10" />
        <motion.circle
          cx="80" cy="80" r={r} fill="none" stroke="url(#grad)" strokeWidth="10" strokeLinecap="round"
          initial={{ strokeDasharray: c, strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * percentage) / 100 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold gradient-text"><AnimatedNumber value={percentage} /></span>
        <span className="text-xs text-[#64748b]">% covered</span>
      </div>
    </div>
  );
}

function FloatingSymbols() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {MATH_SYMBOLS.slice(0, 12).map((symbol, i) => (
        <motion.span
          key={i}
          className="absolute text-[#7c3aed]/10 text-2xl font-mono select-none"
          style={{ left: `${(i * 8.3) % 100}%`, bottom: `-20px` }}
          animate={{ y: [0, -800], opacity: [0.1, 0.25, 0.1], rotate: [0, 20, -10, 0] }}
          transition={{ duration: 12 + i * 2, repeat: Infinity, delay: i * 1.5, ease: 'linear' }}
        >
          {symbol}
        </motion.span>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const time = useCountdown();
  const progress = useProgress();
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const syllabusPercent = progress.getSyllabusPercentage();
  const weightageCovered = progress.getWeightageCovered();
  const totalWeightage = TOPICS.reduce((s, t) => s + t.weightage, 0);
  const nextTopic = progress.getNextIncompleteTopic();
  const focusTopics = progress.getHighPriorityIncomplete();

  const stats = [
    { label: 'Topics Completed', value: progress.completedTopics.length, total: TOPICS.length, color: '#7c3aed', icon: '📚' },
    { label: 'PYQs Solved', value: progress.solvedPyqs.length, total: PYQS.length, color: '#06b6d4', icon: '📝' },
    { label: 'Marks Coverage', value: weightageCovered, total: totalWeightage, color: '#10b981', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingSymbols />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Discrete Mathematics</span>
            <span className="text-[#64748b] text-lg md:text-xl block mt-1">MA 2013 — KIIT University</span>
          </h1>

          {time.passed ? (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="mt-6 inline-block px-8 py-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50"
            >
              <span className="text-4xl md:text-6xl font-bold text-red-400">🔥 EXAM TIME! 🔥</span>
            </motion.div>
          ) : (
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mt-6 inline-block px-6 py-4 rounded-2xl bg-[#12121a] border border-[#7c3aed]/30 glow-violet"
            >
              <div className="text-xs text-[#64748b] mb-2 uppercase tracking-wider">Time Remaining Until Exam</div>
              <div className="flex items-center gap-2 md:gap-4 justify-center">
                {time.days > 0 && (
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-[#7c3aed] font-mono">{time.days}</div>
                    <div className="text-[10px] text-[#64748b] uppercase">Days</div>
                  </div>
                )}
                {time.days > 0 && <span className="text-2xl text-[#64748b]">:</span>}
                {[
                  { v: time.hours, l: 'Hours' },
                  { v: time.minutes, l: 'Min' },
                  { v: time.seconds, l: 'Sec' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-4">
                    <div className="text-center">
                      <motion.div
                        key={item.v}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl md:text-5xl font-bold text-[#f1f5f9] font-mono"
                      >
                        {String(item.v).padStart(2, '0')}
                      </motion.div>
                      <div className="text-[10px] text-[#64748b] uppercase">{item.l}</div>
                    </div>
                    {i < 2 && <span className="text-2xl text-[#64748b] animate-pulse">:</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Progress Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#12121a] border border-[#7c3aed]/10"
          >
            <ProgressRing percentage={syllabusPercent} />
            <p className="mt-3 text-sm text-[#64748b]">Syllabus Coverage</p>
          </motion.div>

          {/* Stats + Actions */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-xl bg-[#12121a] border border-white/5 text-center"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <div className="text-2xl md:text-3xl font-bold mt-2" style={{ color: stat.color }}>
                    <AnimatedNumber value={stat.value} />
                    <span className="text-sm text-[#64748b]">/{stat.total}</span>
                  </div>
                  <div className="text-xs text-[#64748b] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Continue Studying */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {nextTopic ? (
                <Link href={`/topics/${nextTopic}`}
                  className="block w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-center font-bold text-lg hover:opacity-90 transition-opacity">
                  ⚡ Continue Studying
                </Link>
              ) : (
                <div className="py-4 rounded-xl bg-[#10b981]/20 border border-[#10b981]/30 text-center text-[#10b981] font-bold text-lg">
                  🎉 All Topics Completed!
                </div>
              )}
            </motion.div>

            {/* Quote */}
            <motion.div
              key={quoteIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-xl bg-[#12121a] border border-[#7c3aed]/10 text-center"
            >
              <p className="text-sm text-[#64748b] italic">"{MOTIVATIONAL_QUOTES[quoteIdx]}"</p>
            </motion.div>
          </div>
        </div>

        {/* Today's Focus */}
        {focusTopics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🎯</span> Today&apos;s Focus
              <span className="text-xs text-[#64748b] font-normal ml-2">Highest weightage incomplete topics</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {focusTopics.map((topic, i) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Link href={`/topics/${topic.slug}`}
                    className="block p-4 rounded-xl bg-[#12121a] border border-white/5 hover:border-[#7c3aed]/30 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold group-hover:text-[#7c3aed] transition-colors">{topic.title}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-[#f59e0b]/20 text-[#f59e0b] font-mono">{topic.weightage}m</span>
                    </div>
                    <div className="text-xs text-[#64748b]">{topic.subtopics.length} subtopics • {topic.priority} priority</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
