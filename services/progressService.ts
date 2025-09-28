import type { QuizResult } from '../types';

const LEARNED_TOPICS_KEY = 'ipas_learned_topics';
const QUIZ_HISTORY_KEY = 'ipas_quiz_history';

export const getLearnedTopics = (): Set<string> => {
  try {
    const data = localStorage.getItem(LEARNED_TOPICS_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch (e) {
    console.error("Failed to parse learned topics from localStorage", e);
    return new Set();
  }
};

export const markTopicAsLearned = (topicId: string): Set<string> => {
  const topics = getLearnedTopics();
  topics.add(topicId);
  try {
    localStorage.setItem(LEARNED_TOPICS_KEY, JSON.stringify(Array.from(topics)));
  } catch (e) {
    console.error("Failed to save learned topics to localStorage", e);
  }
  return topics;
};

export const getQuizHistory = (): QuizResult[] => {
  try {
    const data = localStorage.getItem(QUIZ_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse quiz history from localStorage", e);
    return [];
  }
};

export const saveQuizResult = (result: QuizResult): QuizResult[] => {
  const history = getQuizHistory();
  const newHistory = [result, ...history].slice(0, 5); // Keep last 5 results
  try {
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(newHistory));
  } catch (e) {
    console.error("Failed to save quiz history to localStorage", e);
  }
  return newHistory;
};
