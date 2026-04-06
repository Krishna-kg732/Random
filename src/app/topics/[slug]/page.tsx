'use client';
import { motion } from 'framer-motion';
import { TOPICS } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useState, useEffect } from 'react';

export default function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const topic = TOPICS.find(t => t.slug === slug);
  if (!topic) notFound();
  const progress = useProgress();
  const [activeSubtopic, setActiveSubtopic] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSubtopic(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    topic?.subtopics.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [topic]);

  const isComplete = progress.completedTopics.includes(topic.id);
  const topicIndex = TOPICS.findIndex(t => t.id === topic.id);
  const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null;
  const nextTopic = topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null;

  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;

      // Headers (ALL CAPS lines or lines ending with :)
      if (/^[A-Z][A-Z\s&,()\/\-]+:/.test(trimmed) || /^[A-Z][A-Z\s&]+$/.test(trimmed)) {
        return <h4 key={i} className="text-[#06b6d4] font-bold mt-4 mb-1 text-sm uppercase tracking-wide">{trimmed}</h4>;
      }

      // Numbered items
      if (/^\d+\./.test(trimmed)) {
        return <div key={i} className="ml-2 mb-1 text-sm leading-relaxed"><span className="text-[#7c3aed] font-bold">{trimmed.split('.')[0]}.</span>{trimmed.substring(trimmed.indexOf('.') + 1)}</div>;
      }

      // Bullet with dash
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        return <div key={i} className="ml-4 mb-1 text-sm leading-relaxed flex gap-2"><span className="text-[#7c3aed]">▸</span><span>{trimmed.substring(1).trim()}</span></div>;
      }

      // Step markers ①②③
      if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmed)) {
        return <div key={i} className="ml-2 mb-1 text-sm leading-relaxed font-medium text-[#f59e0b]">{trimmed}</div>;
      }

      // Example lines
      if (trimmed.toLowerCase().startsWith('example')) {
        return <div key={i} className="mt-3 mb-1 text-sm font-semibold text-[#f59e0b] border-l-2 border-[#f59e0b] pl-3">{trimmed}</div>;
      }

      // Truth tables / formulas (containing →, ∧, ∨ etc)
      if (/[→∧∨↔⊕¬~∀∃∈⊆∪∩]/.test(trimmed) && trimmed.length < 80) {
        return <div key={i} className="font-mono text-sm bg-[#06b6d4]/10 px-3 py-1 rounded my-1 text-[#06b6d4]">{trimmed}</div>;
      }

      return <p key={i} className="text-sm leading-relaxed mb-1 text-[#f1f5f9]/90">{trimmed}</p>;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-[#64748b] mb-6">
        <Link href="/topics" className="hover:text-[#7c3aed] transition-colors">Topics</Link>
        <span>/</span>
        <span className="text-[#f1f5f9]">{topic.title}</span>
      </motion.div>

      <div className="flex gap-8">
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            <h3 className="text-xs uppercase text-[#64748b] font-bold mb-3 tracking-wider">Subtopics</h3>
            {topic.subtopics.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className={`block px-3 py-2 rounded-lg text-xs transition-all ${activeSubtopic === s.id ? 'bg-[#7c3aed]/20 text-[#7c3aed] border-l-2 border-[#7c3aed]' : 'text-[#64748b] hover:text-white hover:bg-white/5'}`}>
                <div className="flex items-center gap-2">
                  {progress.completedSubtopics.includes(s.id) && <span className="text-[#10b981]">✓</span>}
                  {s.title}
                </div>
              </a>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold gradient-text">{topic.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-sm text-[#64748b]">
                  <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/20 text-[#7c3aed] text-xs font-mono">{topic.weightage} marks</span>
                  <span>{topic.subtopics.length} subtopics</span>
                  <span className={topic.priority === 'HIGH' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}>{topic.priority}</span>
                </div>
              </div>
            </div>

            {/* Subtopic Sections */}
            {topic.subtopics.map((subtopic, i) => (
              <motion.section
                key={subtopic.id}
                id={subtopic.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#f1f5f9] border-l-4 border-[#7c3aed] pl-3">{subtopic.title}</h3>
                  <button
                    onClick={() => progress.toggleSubtopicComplete(subtopic.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${progress.completedSubtopics.includes(subtopic.id) ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' : 'bg-white/5 text-[#64748b] border border-white/10 hover:border-[#7c3aed]/30'}`}
                  >
                    {progress.completedSubtopics.includes(subtopic.id) ? '✓ Done' : 'Mark done'}
                  </button>
                </div>
                <div className="p-5 rounded-xl bg-[#12121a] border border-white/5">
                  {renderContent(subtopic.content)}
                </div>
              </motion.section>
            ))}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => progress.toggleTopicComplete(topic.id)}
                className={`flex-1 py-3 rounded-xl font-bold text-center transition-all ${isComplete ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' : 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white'}`}
              >
                {isComplete ? '✓ Topic Completed' : '✓ Mark Topic as Complete'}
              </button>
              <Link href={`/quiz/${topic.slug}`}
                className="flex-1 py-3 rounded-xl font-bold text-center bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/30 hover:bg-[#06b6d4]/30 transition-all">
                📝 Take Quiz
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {prevTopic ? (
                <Link href={`/topics/${prevTopic.slug}`} className="text-sm text-[#64748b] hover:text-[#7c3aed] transition-colors">← {prevTopic.title}</Link>
              ) : <div />}
              {nextTopic ? (
                <Link href={`/topics/${nextTopic.slug}`} className="text-sm text-[#64748b] hover:text-[#7c3aed] transition-colors">{nextTopic.title} →</Link>
              ) : <div />}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
