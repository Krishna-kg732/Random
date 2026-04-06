'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TOPICS } from '@/data/syllabus';
import { PYQS } from '@/data/pyqs';

interface ProgressState {
  completedTopics: string[];
  completedSubtopics: string[];
  solvedPyqs: string[];
  quizScores: Record<string, number>;
}

interface ProgressContextType extends ProgressState {
  toggleTopicComplete: (topicId: string) => void;
  toggleSubtopicComplete: (subtopicId: string) => void;
  togglePyqSolved: (pyqId: string) => void;
  setQuizScore: (topicId: string, score: number) => void;
  resetProgress: () => void;
  getTopicStatus: (topicId: string) => 'not-started' | 'in-progress' | 'completed';
  getSyllabusPercentage: () => number;
  getWeightageCovered: () => number;
  getNextIncompleteTopic: () => string | null;
  getHighPriorityIncomplete: () => typeof TOPICS;
}

const defaultState: ProgressState = {
  completedTopics: [],
  completedSubtopics: [],
  solvedPyqs: [],
  quizScores: {},
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dm-study-progress');
      if (saved) setState(JSON.parse(saved));
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('dm-study-progress', JSON.stringify(state));
    }
  }, [state, mounted]);

  const toggleTopicComplete = useCallback((topicId: string) => {
    setState(prev => {
      const completed = prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId];
      return { ...prev, completedTopics: completed };
    });
  }, []);

  const toggleSubtopicComplete = useCallback((subtopicId: string) => {
    setState(prev => {
      const completed = prev.completedSubtopics.includes(subtopicId)
        ? prev.completedSubtopics.filter(id => id !== subtopicId)
        : [...prev.completedSubtopics, subtopicId];
      return { ...prev, completedSubtopics: completed };
    });
  }, []);

  const togglePyqSolved = useCallback((pyqId: string) => {
    setState(prev => {
      const solved = prev.solvedPyqs.includes(pyqId)
        ? prev.solvedPyqs.filter(id => id !== pyqId)
        : [...prev.solvedPyqs, pyqId];
      return { ...prev, solvedPyqs: solved };
    });
  }, []);

  const setQuizScore = useCallback((topicId: string, score: number) => {
    setState(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [topicId]: Math.max(prev.quizScores[topicId] || 0, score) }
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem('dm-study-progress');
  }, []);

  const getTopicStatus = useCallback((topicId: string): 'not-started' | 'in-progress' | 'completed' => {
    if (state.completedTopics.includes(topicId)) return 'completed';
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return 'not-started';
    const hasSubtopic = topic.subtopics.some(s => state.completedSubtopics.includes(s.id));
    return hasSubtopic ? 'in-progress' : 'not-started';
  }, [state.completedTopics, state.completedSubtopics]);

  const getSyllabusPercentage = useCallback(() => {
    const totalSubtopics = TOPICS.reduce((sum, t) => sum + t.subtopics.length, 0);
    if (totalSubtopics === 0) return 0;
    return Math.round((state.completedSubtopics.length / totalSubtopics) * 100);
  }, [state.completedSubtopics]);

  const getWeightageCovered = useCallback(() => {
    return TOPICS.filter(t => state.completedTopics.includes(t.id))
      .reduce((sum, t) => sum + t.weightage, 0);
  }, [state.completedTopics]);

  const getNextIncompleteTopic = useCallback(() => {
    const sorted = [...TOPICS].sort((a, b) => b.weightage - a.weightage);
    const next = sorted.find(t => !state.completedTopics.includes(t.id));
    return next?.slug || null;
  }, [state.completedTopics]);

  const getHighPriorityIncomplete = useCallback(() => {
    return TOPICS
      .filter(t => !state.completedTopics.includes(t.id))
      .sort((a, b) => b.weightage - a.weightage)
      .slice(0, 3);
  }, [state.completedTopics]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0f]" />;
  }

  return (
    <ProgressContext.Provider value={{
      ...state, toggleTopicComplete, toggleSubtopicComplete, togglePyqSolved,
      setQuizScore, resetProgress, getTopicStatus, getSyllabusPercentage,
      getWeightageCovered, getNextIncompleteTopic, getHighPriorityIncomplete,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
