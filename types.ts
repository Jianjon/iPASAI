
export interface Topic {
  id: string;
  name: string;
}

export interface Theme {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  themes: Theme[];
}

export interface PracticeQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface LearningContent {
  introduction: string;
  keyConcepts: {
    title: string;
    explanation: string;
  }[];
  applications: {
    scenario: string;
    description: string;
  }[];
  memoryAids: {
    title: string;
    explanation: string;
  }[];
  summary: string;
}

export interface ExamQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AdvancedSectionContent {
  advancedPrinciples: string;
  highLevelApplications: string;

  risksAndGovernance: string;
  extendedThinking: string;
  examSimulation: ExamQuestion[];
}

// FIX: Add missing QuizResult interface. This type is used for quiz history.
export interface QuizResult {
  themeName: string;
  score: number;
  total: number;
}

export type ContentViewMode = 'learn' | 'practice';
export type AppTheme = 'dark' | 'light' | 'book';