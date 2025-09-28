import React from 'react';
import type { QuizResult } from '../types';
import AILogoIcon from './icons/AILogoIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import QuizIcon from './icons/QuizIcon';
import CheckSquareIcon from './icons/CheckSquareIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface DashboardProps {
  learnedTopics: Set<string>;
  quizHistory: QuizResult[];
  allTopicsCount: number;
  onStartQuiz: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  learnedTopics,
  quizHistory,
  allTopicsCount,
  onStartQuiz,
}) => {
  const progressPercentage = allTopicsCount > 0 ? (learnedTopics.size / allTopicsCount) * 100 : 0;

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <div className="w-full mb-12 md:mb-16">
          <AILogoIcon className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 opacity-80" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-teal)] pb-2">
            我的學習儀表板
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            追蹤您的學習進度，鞏固知識，高效備考 iPAS AI 證照！
          </p>
        </div>

        {/* Progress Section */}
        <div className="w-full p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] mb-12 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">學習進度</h2>
            <div className="w-full bg-[var(--color-bg-tertiary)] rounded-full h-4">
                <div 
                    className="bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text-secondary)]">
                已完成 {learnedTopics.size} / {allTopicsCount} 個單元 ({progressPercentage.toFixed(1)}%)
            </p>
        </div>

        {/* Recent Quizzes Section */}
        {quizHistory.length > 0 && (
          <div className="w-full p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] mb-12 shadow-lg">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">最近練習紀錄</h2>
            <ul className="space-y-3 text-left">
              {quizHistory.map((result, index) => (
                <li key={index} className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">{result.themeName}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">答對 {result.score} / {result.total} 題</p>
                  </div>
                  <p className="text-lg font-bold" style={{ color: `var(--color-accent-${result.score / result.total >= 0.8 ? 'green' : 'amber'})`}}>
                    {((result.score / result.total) * 100).toFixed(0)}%
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feature Cards Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="p-6 md:p-8 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-blue)]/20 mx-auto mb-5">
                <BookOpenIcon className="w-8 h-8 text-[var(--color-accent-blue)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">系統化學習</h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                從左側選單選擇單元，深入學習iPAS考綱的所有核心概念。
                </p>
            </div>
            
            <div 
                className="p-6 md:p-8 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={onStartQuiz}
                role="button"
                tabIndex={0}
            >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-amber)]/20 mx-auto mb-5">
                <CheckSquareIcon className="w-8 h-8 text-[var(--color-accent-amber)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">綜合測驗</h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                針對各主題進行全面的練習，鞏固您的知識體系，從容應對鑑定考試。
                </p>
            </div>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-[var(--color-text-secondary)] mb-4">
            從左側選單選擇一個主題，或點擊上方「綜合測驗」開啟您的學習之旅！
          </p>
          <ArrowLeftIcon className="w-10 h-10 text-[var(--color-accent)] animate-pulse md:hidden" />
          <div className="hidden md:flex items-center justify-center gap-4">
            <ArrowLeftIcon className="w-10 h-10 text-[var(--color-accent)] animate-pulse" />
            <span className="text-sm text-[var(--color-text-muted)]">（或按 <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">ESC</kbd> 鍵展開/收合選單）</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
