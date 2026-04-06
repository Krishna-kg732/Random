'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { TOPICS, TOTAL_WEIGHTAGE } from '@/data/syllabus';
import { PYQS } from '@/data/pyqs';
import { useProgress } from '@/context/ProgressContext';
import { useState } from 'react';

export default function ProgressPage() {
  const progress = useProgress();
  const [showResetModal, setShowResetModal] = useState(false);

  const syllabusPercent = progress.getSyllabusPercentage();
  const weightageCovered = progress.getWeightageCovered();
  const totalSubtopics = TOPICS.reduce((s, t) => s + t.subtopics.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold"><span className="gradient-text">Progress Tracker</span></h1>
            <p className="text-[#64748b] text-sm mt-1">Track your preparation. Every subtopic matters.</p>
          </div>
          <button onClick={() => setShowResetModal(true)}
            className="px-4 py-2 rounded-lg text-xs bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 hover:bg-[#ef4444]/20 transition-all">
            Reset Progress
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Syllabus', value: `${syllabusPercent}%`, sub: `${progress.completedSubtopics.length}/${totalSubtopics} subtopics`, color: '#7c3aed' },
            { label: 'Topics Done', value: `${progress.completedTopics.length}/${TOPICS.length}`, sub: 'topics completed', color: '#06b6d4' },
            { label: 'PYQs Solved', value: `${progress.solvedPyqs.length}/${PYQS.length}`, sub: 'questions solved', color: '#f59e0b' },
            { label: 'Est. Marks', value: `${weightageCovered}/${TOTAL_WEIGHTAGE}`, sub: 'marks coverage', color: '#10b981' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-[#12121a] border border-white/5 text-center">
              <div className="text-2xl font-bold" style={{ color: card.color }}>{card.value}</div>
              <div className="text-xs text-[#64748b] mt-1">{card.label}</div>
              <div className="text-[10px] text-[#64748b]/60 mt-0.5">{card.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart - Weightage Coverage per Topic */}
        <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 mb-8">
          <h3 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-4">Weightage Coverage by Topic</h3>
          <div className="space-y-3">
            {TOPICS.map((topic, i) => {
              const isCompleted = progress.completedTopics.includes(topic.id);
              const subtopicsDone = topic.subtopics.filter(s => progress.completedSubtopics.includes(s.id)).length;
              const pct = (subtopicsDone / topic.subtopics.length) * 100;
              return (
                <div key={topic.id} className="flex items-center gap-3">
                  <div className="w-32 md:w-48 text-xs text-[#64748b] truncate flex-shrink-0">{topic.title}</div>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/70">
                      {Math.round(pct)}%
                    </span>
                  </div>
                  <div className="w-12 text-xs text-right font-mono" style={{ color: isCompleted ? '#10b981' : '#64748b' }}>
                    {topic.weightage}m
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 flex flex-col items-center">
            <h3 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-4 self-start">Overall Completion</h3>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#1e1e2e" strokeWidth="30" />
              <motion.circle
                cx="100" cy="100" r="80" fill="none" stroke="#7c3aed" strokeWidth="30" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 80}
                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - syllabusPercent / 100) }}
                transition={{ duration: 2, ease: 'easeOut' }}
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="95" textAnchor="middle" className="text-3xl font-bold" fill="#f1f5f9">{syllabusPercent}%</text>
              <text x="100" y="115" textAnchor="middle" className="text-xs" fill="#64748b">complete</text>
            </svg>
          </div>

          {/* Heatmap Grid */}
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5">
            <h3 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-4">Subtopic Heatmap</h3>
            <div className="space-y-3">
              {TOPICS.map(topic => (
                <div key={topic.id}>
                  <div className="text-[10px] text-[#64748b] mb-1 truncate">{topic.title}</div>
                  <div className="flex flex-wrap gap-1">
                    {topic.subtopics.map(sub => {
                      const done = progress.completedSubtopics.includes(sub.id);
                      return (
                        <motion.div
                          key={sub.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: Math.random() * 0.5 }}
                          className={`w-5 h-5 rounded-sm cursor-pointer transition-colors ${done ? 'bg-[#10b981]' : 'bg-white/10 hover:bg-white/20'}`}
                          title={`${sub.title} — ${done ? 'Done' : 'Pending'}`}
                          onClick={() => progress.toggleSubtopicComplete(sub.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 text-[10px] text-[#64748b]">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-white/10" /> Pending</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#10b981]" /> Done</div>
            </div>
          </div>
        </div>

        {/* Quiz Scores */}
        {Object.keys(progress.quizScores).length > 0 && (
          <div className="p-6 rounded-2xl bg-[#12121a] border border-white/5 mb-8">
            <h3 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-4">Quiz Best Scores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(progress.quizScores).map(([topicId, score]) => {
                const t = TOPICS.find(t => t.id === topicId);
                return (
                  <div key={topicId} className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="text-xl font-bold" style={{ color: score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444' }}>{score}%</div>
                    <div className="text-[10px] text-[#64748b] truncate">{t?.title || topicId}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Estimated marks */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#7c3aed]/10 to-[#06b6d4]/10 border border-[#7c3aed]/20">
          <h3 className="text-sm font-bold text-[#64748b] uppercase tracking-wider mb-2">Estimated Exam Score</h3>
          <p className="text-sm text-[#64748b] mb-3">Based on completed topics only:</p>
          <div className="text-4xl font-bold gradient-text">{weightageCovered} / {TOTAL_WEIGHTAGE} marks</div>
          <p className="text-xs text-[#64748b] mt-2">Complete more topics to increase your estimated score!</p>
        </div>
      </motion.div>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#12121a] border border-[#ef4444]/30 rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-[#ef4444] mb-2">⚠️ Reset All Progress?</h3>
              <p className="text-sm text-[#64748b] mb-6">This will clear all completed topics, solved PYQs, and quiz scores. This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowResetModal(false)}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-[#64748b] hover:text-white transition-colors">Cancel</button>
                <button onClick={() => { progress.resetProgress(); setShowResetModal(false); }}
                  className="flex-1 py-2 rounded-lg bg-[#ef4444] text-white font-bold hover:bg-[#ef4444]/80 transition-colors">Reset</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
