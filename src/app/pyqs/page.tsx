'use client';
import { motion } from 'framer-motion';
import { PYQS } from '@/data/pyqs';
import { TOPICS } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';
import { useState } from 'react';

export default function PYQsPage() {
  const progress = useProgress();
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [marksFilter, setMarksFilter] = useState<number | null>(null);

  const filtered = PYQS.filter(p => {
    if (yearFilter && p.year !== yearFilter) return false;
    if (sectionFilter && p.section !== sectionFilter) return false;
    if (topicFilter && p.topicId !== topicFilter) return false;
    if (marksFilter && p.marks !== marksFilter) return false;
    return true;
  });

  const getTopicName = (id: string) => TOPICS.find(t => t.id === id)?.title || id;
  const years = [...new Set(PYQS.map(p => p.year))];
  const sections = [...new Set(PYQS.map(p => p.section))];
  const marks = [...new Set(PYQS.map(p => p.marks))].sort();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2"><span className="gradient-text">Previous Year Questions</span></h1>
        <p className="text-[#64748b] mb-6">{PYQS.length} questions from 2022 & 2023 papers • {progress.solvedPyqs.length} solved</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex gap-1 items-center">
            <span className="text-xs text-[#64748b] mr-1">Year:</span>
            <button onClick={() => setYearFilter(null)} className={`px-3 py-1 rounded-lg text-xs ${!yearFilter ? 'bg-[#7c3aed]/20 text-[#7c3aed]' : 'text-[#64748b] bg-[#12121a]'}`}>All</button>
            {years.map(y => (
              <button key={y} onClick={() => setYearFilter(y)} className={`px-3 py-1 rounded-lg text-xs ${yearFilter === y ? 'bg-[#7c3aed]/20 text-[#7c3aed]' : 'text-[#64748b] bg-[#12121a]'}`}>{y}</button>
            ))}
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-xs text-[#64748b] mr-1">Section:</span>
            <button onClick={() => setSectionFilter(null)} className={`px-3 py-1 rounded-lg text-xs ${!sectionFilter ? 'bg-[#06b6d4]/20 text-[#06b6d4]' : 'text-[#64748b] bg-[#12121a]'}`}>All</button>
            {sections.map(s => (
              <button key={s} onClick={() => setSectionFilter(s)} className={`px-3 py-1 rounded-lg text-xs ${sectionFilter === s ? 'bg-[#06b6d4]/20 text-[#06b6d4]' : 'text-[#64748b] bg-[#12121a]'}`}>{s}</button>
            ))}
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-xs text-[#64748b] mr-1">Marks:</span>
            <button onClick={() => setMarksFilter(null)} className={`px-3 py-1 rounded-lg text-xs ${!marksFilter ? 'bg-[#10b981]/20 text-[#10b981]' : 'text-[#64748b] bg-[#12121a]'}`}>All</button>
            {marks.map(m => (
              <button key={m} onClick={() => setMarksFilter(m)} className={`px-3 py-1 rounded-lg text-xs ${marksFilter === m ? 'bg-[#10b981]/20 text-[#10b981]' : 'text-[#64748b] bg-[#12121a]'}`}>{m}m</button>
            ))}
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-xs text-[#64748b] mr-1">Topic:</span>
            <select value={topicFilter || ''} onChange={e => setTopicFilter(e.target.value || null)}
              className="px-3 py-1 rounded-lg text-xs text-[#64748b] bg-[#12121a] border border-white/10 outline-none">
              <option value="">All Topics</option>
              {TOPICS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
        </div>

        {/* PYQ Cards */}
        <div className="space-y-3">
          {filtered.map((pyq, i) => {
            const solved = progress.solvedPyqs.includes(pyq.id);
            return (
              <motion.div
                key={pyq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className={`p-4 rounded-xl bg-[#12121a] border transition-all ${solved ? 'border-[#10b981]/30' : 'border-white/5 hover:border-[#7c3aed]/20'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#7c3aed]/20 text-[#7c3aed] font-mono">{pyq.year}</span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#06b6d4]/20 text-[#06b6d4]">Sec {pyq.section}</span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#f59e0b]/20 text-[#f59e0b] font-mono">{pyq.marks}m</span>
                        <span className="text-[10px] text-[#64748b]">{getTopicName(pyq.topicId)}</span>
                      </div>
                      <p className="text-sm text-[#f1f5f9]/90 line-clamp-2">{pyq.question}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => progress.togglePyqSolved(pyq.id)}
                        className={`p-2 rounded-lg text-xs transition-all ${solved ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-white/5 text-[#64748b] hover:text-white'}`}
                        title={solved ? 'Mark unsolved' : 'Mark solved'}
                      >
                        {solved ? '✓' : '○'}
                      </button>
                      <Link href={`/pyqs/${pyq.id}`}
                        className="px-3 py-2 rounded-lg text-xs bg-[#7c3aed]/20 text-[#7c3aed] hover:bg-[#7c3aed]/30 transition-all whitespace-nowrap">
                        View Solution →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#64748b]">No PYQs match your filters.</div>
        )}
      </motion.div>
    </div>
  );
}
