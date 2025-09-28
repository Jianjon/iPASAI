import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CURRICULUM_DATA } from '../constants';
import { PREGENERATED_PRACTICE } from '../data/pregeneratedPractice';
import type { PracticeQuestion } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import BrainIcon from './icons/BrainIcon';

interface QuizTheme {
  id: string;
  name: string;
  subjectName: string;
  questionCount: number;
}

interface QuizViewProps {
  onBack: () => void;
}

const getQuestionsForTheme = (themeId: string): PracticeQuestion[] => {
    const allQuestions = Object.entries(PREGENERATED_PRACTICE)
      .filter(([key]) => key.startsWith(themeId))
      .flatMap(([, qs]) => qs);
    // Shuffle all available questions once
    return allQuestions.sort(() => Math.random() - 0.5);
};


const QuizView: React.FC<QuizViewProps> = ({ onBack }) => {
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme | null>(null);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const quizSubjectsData = useMemo(() => {
    return CURRICULUM_DATA.map(subject => ({
      ...subject,
      themes: subject.themes.map(theme => ({
        ...theme,
        questionCount: getQuestionsForTheme(theme.id).length
      }))
    }));
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentQuestionIndex, showResults, selectedTheme]);

  const handleStartQuiz = (theme: QuizTheme, numQuestions: number) => {
    const allQuestions = getQuestionsForTheme(theme.id);
    const sampledQuestions = allQuestions.slice(0, numQuestions);
    
    setQuestions(sampledQuestions);
    setSelectedTheme(theme);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIncorrectQuestions([]);
  };
  
  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (selectedAnswers[questionIndex] !== undefined) return; // Lock answer after first selection
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleFinish = () => {
    const incorrect = questions.filter((q, i) => selectedAnswers[i] !== q.correctAnswer);
    setIncorrectQuestions(incorrect);
    setShowResults(true);
  };

  const handleRestart = () => {
      if (selectedTheme) {
        // Restart with the same number of questions
        handleStartQuiz(selectedTheme, questions.length);
      }
  };

  const handleBackToList = () => {
      setSelectedTheme(null);
      setQuestions([]);
  };

  if (!selectedTheme) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
          <ArrowLeftIcon className="w-5 h-5" />
          返回首頁
        </button>
        
        {quizSubjectsData.map(subject => (
            <div key={subject.id} className="mb-12">
                 <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--color-text-primary)] border-b-2 border-[var(--color-border-secondary)] pb-3">{subject.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subject.themes.map(theme => {
                    const quizTheme: QuizTheme = {
                        id: theme.id,
                        name: theme.name,
                        subjectName: subject.name,
                        questionCount: theme.questionCount
                    };
                    return (
                        <div key={theme.id} className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
                            <div>
                                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{subject.id === 'L3' ? theme.name : `${theme.id} ${theme.name}`}</h3>
                                <p className="text-sm font-semibold text-[var(--color-text-secondary)] mt-2">題庫總數: {theme.questionCount} 題</p>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => handleStartQuiz(quizTheme, 10)}
                                    disabled={theme.questionCount < 10}
                                    className="w-full px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-lg font-bold hover:bg-[var(--color-accent-hover)] transition-transform hover:scale-105 disabled:bg-[var(--color-bg-tertiary)] disabled:text-[var(--color-text-muted)] disabled:scale-100 disabled:cursor-not-allowed"
                                >
                                    練習 10 題
                                </button>
                                {theme.questionCount >= 20 && (
                                     <button
                                        onClick={() => handleStartQuiz(quizTheme, 20)}
                                        className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-transform hover:scale-105"
                                    >
                                        練習 20 題
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        ))}
      </div>
    );
  }

  if (showResults) {
    const correctAnswersCount = questions.length - incorrectQuestions.length;
    const accuracy = questions.length > 0 ? (correctAnswersCount / questions.length * 100).toFixed(1) : 0;
    const questionsToReview = incorrectQuestions;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8" ref={contentRef}>
            <div className="text-center mb-10 p-8 bg-[var(--color-bg-secondary)] rounded-2xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">測驗結果: {selectedTheme.name}</h2>
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-accent-blue)] my-4">{accuracy}%</p>
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)]">答對題數: {correctAnswersCount} / {questions.length}</p>
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={handleRestart} className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-full font-bold hover:bg-[var(--color-accent-hover)] transition-transform hover:scale-105">重新測驗</button>
                    <button onClick={handleBackToList} className="px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-full font-bold hover:bg-[var(--color-border-primary)] transition-colors">返回列表</button>
                </div>
            </div>
            
            {questionsToReview.length > 0 ? (
                <>
                    <h3 className="text-2xl font-bold text-center mb-8 border-b-2 border-[var(--color-border-primary)] pb-4">錯題列表</h3>
                    <div className="space-y-8">
                        {questionsToReview.map((q, i) => (
                            <div key={i} className="p-6 rounded-xl bg-[var(--color-bg-secondary)] animate-fade-in">
                                <p className="font-semibold text-base mb-4">{`錯題 ${i + 1}. ${q.question}`}</p>
                                <div className="mt-4 p-4 bg-[var(--color-bg-tertiary)] rounded-lg border-l-4 border-[var(--color-accent-blue)]">
                                    <p className="font-bold text-[var(--color-accent-blue)]">
                                        正確答案: {q.correctAnswer} - {q.options[q.correctAnswer]}
                                    </p>
                                    <p className="mt-2 text-sm" style={{ lineHeight: '1.8' }}>{q.explanation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center p-8 bg-[var(--color-bg-secondary)] rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-green-500">恭喜！全部答對！</h3>
                    <p className="mt-2 text-[var(--color-text-secondary)]">本次練習沒有錯題，繼續保持！</p>
                </div>
            )}
        </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrent = currentQuestionIndex in selectedAnswers;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col h-full" ref={contentRef}>
        <div className="flex-shrink-0">
            <button onClick={handleBackToList} className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4">
                ← 返回列表
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">{selectedTheme.name}</h2>
            <div className="mt-4 w-full bg-[var(--color-bg-tertiary)] rounded-full h-2.5">
                <div className="bg-[var(--color-accent)] h-2.5 rounded-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}></div>
            </div>
            <p className="text-right text-sm text-[var(--color-text-muted)] mt-2">第 {currentQuestionIndex + 1} / {questions.length} 題</p>
        </div>
        
        <div className="flex-grow flex flex-col justify-center py-6">
            {currentQuestion && (
                <div className="animate-fade-in" key={currentQuestionIndex}>
                    <p className="font-semibold text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed text-center min-h-[6rem]">
                        {currentQuestion.question}
                    </p>

                    <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
                        {Object.entries(currentQuestion.options).map(([key, value]) => {
                            const isSelected = selectedAnswers[currentQuestionIndex] === key;
                            const isCorrectAnswer = key === currentQuestion.correctAnswer;
                            
                            let answerClass = 'bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border-primary)]/50';

                            if (hasAnsweredCurrent) {
                                if (isCorrectAnswer) {
                                    answerClass = 'bg-[var(--color-accent-green)]/30 text-[var(--color-text-primary)] border-[var(--color-accent-green)] ring-2 ring-[var(--color-accent-green)]';
                                } else if (isSelected) {
                                    answerClass = 'bg-[var(--color-accent-red)]/30 text-[var(--color-text-primary)] border-[var(--color-accent-red)]';
                                } else {
                                    answerClass = 'bg-[var(--color-bg-secondary)] opacity-60';
                                }
                            }
                            
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleSelectAnswer(currentQuestionIndex, key)}
                                    disabled={hasAnsweredCurrent}
                                    className={`flex items-center p-4 rounded-lg text-left transition-all duration-200 border-2 border-transparent ${answerClass} ${!hasAnsweredCurrent ? 'cursor-pointer transform hover:scale-105' : 'cursor-default'}`}
                                >
                                    <span className="font-bold mr-3 py-1 px-2.5 bg-[var(--color-bg-tertiary)] rounded-md">{key}</span>
                                    <span className="flex-1">{value}</span>
                                </button>
                            );
                        })}
                    </div>

                    {hasAnsweredCurrent && (
                        <div className="mt-6 max-w-3xl mx-auto p-5 bg-[var(--color-bg-tertiary)] rounded-lg border-l-4 border-[var(--color-accent-blue)] animate-fade-in">
                            <p className="font-bold text-[var(--color-accent-blue)]">
                              {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? '答對了！' : '答錯了！'} 正確答案: {currentQuestion.correctAnswer}
                            </p>
                            <p className="mt-2 text-base" style={{ lineHeight: '1.8' }}>{currentQuestion.explanation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
        
        <div className="flex-shrink-0 flex justify-between items-center mt-4 pt-4 border-t border-[var(--color-border-primary)]">
            <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-full font-bold hover:bg-[var(--color-border-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                上一題
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={!hasAnsweredCurrent}
                    className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-full font-bold hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    下一題
                </button>
            ) : (
                <button
                    onClick={handleFinish}
                    disabled={!hasAnsweredCurrent}
                    className="px-6 py-2 bg-[var(--color-accent-green)] text-[var(--color-accent-text)] rounded-full font-bold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    完成練習
                </button>
            )}
        </div>
    </div>
  );
};

export default QuizView;