'use client';
import { motion } from 'framer-motion';
import { TOPICS } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';
import { useState } from 'react';

type Filter = 'ALL' | 'COMPLETED' | 'PENDING' | 'HIGH';

export default function TopicsPage() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const progress = useProgress();

  const filtered = TOPICS.filter(t => {
    const status = progress.getTopicStatus(t.id);
    if (filter === 'COMPLETED') return status === 'completed';
    if (filter === 'PENDING') return status !== 'completed';
    if (filter === 'HIGH') return t.priority === 'HIGH';
    return true;
  });

  const statusColor = (id: string) => {
    const s = progress.getTopicStatus(id);
    if (s === 'completed') return 'border-[#10b981]/40 bg-[#10b981]/5';
    if (s === 'in-progress') return 'border-[#f59e0b]/40 bg-[#f59e0b]/5';
    return 'border-white/5';
  };

  const statusDot = (id: string) => {
    const s = progress.getTopicStatus(id);
    if (s === 'completed') return 'bg-[#10b981]';
    if (s === 'in-progress') return 'bg-[#f59e0b]';
    return 'bg-[#64748b]';
  };

  const filters: { key: Filter; label: string }[] = [
    { key: 'ALL', label: 'All' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'HIGH', label: 'High Priority' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">
          <span className="gradient-text">Study Topics</span>
        </h1>
        <p className="text-[#64748b] mb-6">Master each topic to ace your exam. {TOPICS.length} topics, {TOPICS.reduce((s, t) => s + t.subtopics.length, 0)} subtopics total.</p>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === f.key ? 'bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/30' : 'text-[#64748b] hover:text-white bg-[#12121a] border border-white/5'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Topic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group"
            >
              <Link href={`/topics/${topic.slug}`}
                className={`block p-5 rounded-xl bg-[#12121a] border transition-all hover:glow-violet ${statusColor(topic.id)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${statusDot(topic.id)}`} />
                    <h3 className="font-semibold text-sm group-hover:text-[#7c3aed] transition-colors">{topic.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-mono ${topic.priority === 'HIGH' ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-[#f59e0b]/20 text-[#f59e0b]'}`}>
                    {topic.weightage}m
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#64748b]">
                  <span>{topic.subtopics.length} subtopics</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${topic.priority === 'HIGH' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>
                    {topic.priority}
                  </span>
                </div>
                {/* Subtopic completion bar */}
                <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(topic.subtopics.filter(s => progress.completedSubtopics.includes(s.id)).length / topic.subtopics.length) * 100}%`
                    }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                  />
                </div>

                {progress.getTopicStatus(topic.id) === 'completed' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 flex items-center gap-1 text-xs text-[#10b981]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                    Completed
                  </motion.div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#64748b]">
            <p className="text-lg">No topics match this filter.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
