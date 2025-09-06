import { LearningContent, PracticeQuestion } from '../types';

const PRACTICE_QUESTIONS_PREFIX = 'ipas-practice-';

function getCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error reading from cache for key "${key}":`, error);
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const item = JSON.stringify(data);
    localStorage.setItem(key, item);
  } catch (error) {
    console.error(`Error writing to cache for key "${key}":`, error);
  }
}

function clearCache(key: string): void {
  localStorage.removeItem(key);
}

// Specific functions for practice questions
export const getCachedPracticeQuestions = (topicId: string): PracticeQuestion[] | null => {
  return getCache<PracticeQuestion[]>(`${PRACTICE_QUESTIONS_PREFIX}${topicId}`);
};

export const setCachedPracticeQuestions = (topicId: string, questions: PracticeQuestion[]): void => {
  setCache(`${PRACTICE_QUESTIONS_PREFIX}${topicId}`, questions);
};