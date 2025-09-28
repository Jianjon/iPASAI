import React from 'react';
import { PREGENERATED_CONTENT } from '../data/pregeneratedContent';
import { PREGENERATED_PRACTICE } from '../data/pregeneratedPractice';
import type {
  Topic,
  LearningContent,
  PracticeQuestion,
  ContentViewMode,
} from '../types';
import BookIcon from './icons/BookIcon';
import QuizIcon from './icons/QuizIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import InfoIcon from './icons/InfoIcon';
import KeyIcon from './icons/KeyIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import ChecklistIcon from './icons/ChecklistIcon';
import AILogoIcon from './icons/AILogoIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import SparkleIcon from './icons/SparkleIcon';


interface ContentViewProps {
  selectedTopic: Topic | null;
}

// A new component to parse and render text with richer formatting
const RichContent: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  const renderStyledLine = (line: string) => {
    // Split the line by code/example patterns AND bold/italic patterns
    const parts = line.split(/(「.*?」|{.*?}|`.*?`|\*\*\*.*?\*\*\*|\*\*.*?\*\*)/g).filter(Boolean);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('「') || part.startsWith('{') || part.startsWith('`')) {
            return (
              <code key={i} className="bg-[var(--color-bg-tertiary)] text-[var(--color-accent-amber)] rounded px-2 py-1 text-sm font-mono mx-1">
                {part.replace(/[`「」]/g, '')}
              </code>
            );
          }
           if (part.startsWith('***') && part.endsWith('***')) {
            return (
              <strong key={i} className="font-semibold italic text-[var(--color-text-primary)]">
                {part.slice(3, -3)}
              </strong>
            );
          }
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-[var(--color-text-primary)]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="text-[var(--color-text-secondary)]" style={{ lineHeight: '2.0' }}>
      {lines.map((line, index) => {
        // Preserve empty lines for spacing between paragraphs
        if (line.trim() === '') {
            return <div key={index} className="h-5" />;
        }
        
        // Handle **【中級補充與深化】**
        if (line.trim() === '**【中級補充與深化】**') {
          return (
            <div key={index} className="my-10 p-6 rounded-xl bg-[var(--color-bg-secondary)] shadow-lg border-l-4 border-[var(--color-accent-indigo)] animate-fade-in">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-accent-indigo)] flex items-center">
                <SparkleIcon className="w-6 h-6 mr-3 flex-shrink-0"/>
                中級補充與深化
              </h3>
            </div>
          );
        }

        // Handle ***sub-heading***
        const subHeadingMatch = line.match(/^\s*\*\*\*(.*?)\*\*\*/);
        if (subHeadingMatch) {
          return (
            <h4 key={index} className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] mt-8 mb-4 border-b border-[var(--color-border-secondary)] pb-2">
              {subHeadingMatch[1].trim()}
            </h4>
          );
        }
        
        // Style for list items like "• ..." or "* ..."
        const listItemMatch = line.match(/^\s*([•*])\s*(.*)/);
        if (listItemMatch) {
          const [, bullet, content] = listItemMatch;
          const colonIndex = content.indexOf('：');
          
          if (colonIndex !== -1) {
            const term = content.substring(0, colonIndex);
            const explanation = content.substring(colonIndex + 1);
            return (
              <div key={index} className="relative pl-8 my-5">
                <span className="absolute left-0 top-1 text-xl text-[var(--color-accent)]">{bullet}</span>
                <div>
                  <span className="font-semibold text-[var(--color-text-primary)]">{renderStyledLine(term)}：</span>
                  {renderStyledLine(explanation)}
                </div>
              </div>
            );
          }
          
          // Simple list item without a term:explanation structure
          return (
             <div key={index} className="relative pl-8 my-5">
              <span className="absolute left-0 top-1 text-xl text-[var(--color-accent)]">{bullet}</span>
              <div>{renderStyledLine(content)}</div>
            </div>
          );
        }
        
        // Style for sub-headings like "定義與運作原理"
        if (!line.startsWith(' ') && !line.startsWith('•') && !line.startsWith('*') && !line.startsWith('**') && line.length < 30 && !line.includes('：')) {
          return <h4 key={index} className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">{line}</h4>;
        }
        
        // Regular paragraph text
        return <p key={index} className="mb-4">{renderStyledLine(line)}</p>;
      })}
    </div>
  );
};

const ContentView: React.FC<ContentViewProps> = ({ selectedTopic }) => {
  const [mode, setMode] = React.useState<ContentViewMode>('learn');
  const [learningContent, setLearningContent] = React.useState<LearningContent | null>(null);
  const [practiceQuestions, setPracticeQuestions] = React.useState<PracticeQuestion[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // State for practice mode
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = React.useState(false);
  
  const loadInitialContent = React.useCallback((topic: Topic) => {
    setError(null);

    // Reset states
    setShowAnswers(false);
    setSelectedAnswers({});
    setPracticeQuestions(null);
    
    const content = PREGENERATED_CONTENT[topic.id] || null;
    setLearningContent(content);
    
    if (!content) {
        setError(`找不到主題 ${topic.name} 的內容。`);
    }

  }, []);

  React.useEffect(() => {
    if (selectedTopic) {
      loadInitialContent(selectedTopic);
    } else {
      setLearningContent(null);
      setPracticeQuestions(null);
      setError(null);
    }
  }, [selectedTopic, loadInitialContent]);

  React.useEffect(() => {
    if (mode === 'practice' && selectedTopic) {
        const pregenQuestions = PREGENERATED_PRACTICE[selectedTopic.id] || [];
        setPracticeQuestions(pregenQuestions);
        setShowAnswers(false);
        setSelectedAnswers({});
        setError(null);
    }
  }, [mode, selectedTopic]);

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (showAnswers) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const handleCheckOrReset = () => {
    if (showAnswers) {
      setShowAnswers(false);
      setSelectedAnswers({});
       if (selectedTopic) {
        const pregenQuestions = PREGENERATED_PRACTICE[selectedTopic.id] || [];
        setPracticeQuestions(pregenQuestions);
      }
    } else {
      setShowAnswers(true);
    }
  };
  
  const renderPracticeContent = () => {
    if (!practiceQuestions || practiceQuestions.length === 0) {
      return (
        <div className="text-center p-8 text-[var(--color-text-secondary)]">
          <p>此主題目前沒有內建練習題。</p>
        </div>
      );
    }

    return (
      <div className="space-y-10 max-w-4xl mx-auto">
        {practiceQuestions.map((q, i) => (
          <div key={i} className="p-6 md:p-10 rounded-xl bg-[var(--color-bg-secondary)] shadow-lg">
            <p className="font-semibold text-base md:text-lg mb-6">{i + 1}. {q.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(q.options).map(([key, value]) => {
                const isSelected = selectedAnswers[i] === key;
                let answerClass = 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-hover)] hover:shadow-md';
                if (showAnswers) {
                  if (key === q.correctAnswer) {
                    answerClass = 'bg-[var(--color-accent-green)]/30 text-[var(--color-text-primary)] border-[var(--color-accent-green)]';
                  } else if (isSelected && key !== q.correctAnswer) {
                    answerClass = 'bg-[var(--color-accent-red)]/30 text-[var(--color-text-primary)] border-[var(--color-accent-red)]';
                  }
                } else if (isSelected) {
                   answerClass = 'bg-[var(--color-accent)] text-[var(--color-accent-text)] ring-2 ring-offset-2 ring-offset-[var(--color-bg-secondary)] ring-[var(--color-accent)]';
                }
                
                return (
                  <button
                    key={key}
                    onClick={() => handleSelectAnswer(i, key)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border-2 border-transparent ${answerClass}`}
                    disabled={showAnswers}
                  >
                    <span className="font-bold mr-2">{key}:</span> {value}
                  </button>
                );
              })}
            </div>
            {showAnswers && (
              <div className="mt-8 p-6 md:p-8 bg-[var(--color-bg-tertiary)] rounded-lg border-l-4 border-[var(--color-accent-blue)]">
                <p className="font-bold text-[var(--color-accent-blue)]">
                  正確答案: {q.correctAnswer}
                </p>
                <p className="mt-2 text-base" style={{ lineHeight: '1.8' }}>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
        <div className="flex flex-col items-center justify-center pt-8 mt-12 gap-6">
          <button
            onClick={handleCheckOrReset}
            className="px-8 py-3 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-full font-bold hover:bg-[var(--color-accent-hover)] transition-transform hover:scale-105 text-base md:text-lg shadow-lg"
          >
            {showAnswers ? '重新練習' : '檢查答案'}
          </button>
        </div>
      </div>
    );
  };
  
  const renderLearningContent = () => {
    if (error) return renderError(loadInitialContent.bind(null, selectedTopic!));
    if (!learningContent) return null;

    return (
      <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--color-text-primary)]" style={{'--tw-prose-bullets-color': 'var(--color-accent)' } as React.CSSProperties}>
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[var(--color-accent)] pb-4 mb-8 flex items-center text-[var(--color-text-primary)]">
            <InfoIcon className="w-8 h-8 mr-4 text-[var(--color-accent)]"/>
            簡介
          </h2>
          <RichContent text={learningContent.introduction} />
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[var(--color-accent)] pb-4 mb-8 flex items-center text-[var(--color-text-primary)]">
            <KeyIcon className="w-8 h-8 mr-4 text-[var(--color-accent)]" />
            關鍵概念
          </h2>
          <div className="space-y-12">
            {learningContent.keyConcepts.map((concept, index) => (
              <div key={index} className="p-6 md:p-10 rounded-xl bg-[var(--color-bg-secondary)] shadow-lg">
                <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-blue)] mb-4">{concept.title}</h3>
                <RichContent text={concept.explanation} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[var(--color-accent)] pb-4 mb-8 flex items-center text-[var(--color-text-primary)]">
            <BriefcaseIcon className="w-8 h-8 mr-4 text-[var(--color-accent)]" />
            實際應用
          </h2>
           <div className="space-y-12">
            {learningContent.applications.map((app, index) => (
              <div key={index} className="p-6 md:p-10 rounded-xl bg-[var(--color-bg-secondary)] shadow-lg">
                 <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-teal)] mb-4">{app.scenario}</h3>
                <RichContent text={app.description} />
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[var(--color-accent-amber)] pb-4 mb-8 flex items-center text-[var(--color-text-primary)]">
              <LightbulbIcon className="w-8 h-8 mr-4 text-[var(--color-accent-amber)]" />
              記憶輔助
            </h2>
            <div className="space-y-10">
              {learningContent.memoryAids.map((aid, index) => (
                <div key={index} className="p-6 md:p-10 rounded-xl bg-[var(--color-accent-amber)]/10 border border-[var(--color-accent-amber)]/30 shadow-lg">
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-amber)] mb-4">{aid.title}</h3>
                  <RichContent text={aid.explanation} />
                </div>
              ))}
            </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold border-b-4 border-[var(--color-accent)] pb-4 mb-8 flex items-center text-[var(--color-text-primary)]">
            <ChecklistIcon className="w-8 h-8 mr-4 text-[var(--color-accent)]" />
            總結
          </h2>
          <RichContent text={learningContent.summary} />
        </section>
      </div>
    );
  };
  
  const renderError = (retryAction: () => void) => (
     <div className="text-center p-8 bg-red-500/10 text-red-500 rounded-lg">
        <p className="font-bold">發生錯誤</p>
        <p className="my-2">{error}</p>
        <button onClick={retryAction} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            重試
        </button>
    </div>
  )

  if (!selectedTopic) {
    return (
        <div className="flex-1 p-4 md:p-8 lg:p-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="max-w-3xl">
                <AILogoIcon className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 opacity-80" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-teal)] pb-2">
                    歡迎來到 iPAS AI 學習日誌
                </h1>
                <p className="mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)]">
                    這是一款專為 iPAS AI 規劃管理師認證考試設計的學習輔助工具。
                </p>
                <p className="mt-2 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)]">
                    從左側選單選擇一個主題開始學習，或點擊「綜合刷題練習」來測試您的知識。
                </p>
                <div className="mt-10 flex flex-col items-center">
                    <ArrowLeftIcon className="w-10 h-10 text-[var(--color-accent)] animate-pulse md:hidden" />
                    <div className="hidden md:flex items-center justify-center gap-4">
                        <ArrowLeftIcon className="w-10 h-10 text-[var(--color-accent)] animate-pulse" />
                        <span className="text-sm text-[var(--color-text-muted)]">（或按 <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">ESC</kbd> 鍵展開/收合選單）</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  return (
    <main className="flex-1 p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">{selectedTopic.id}</h2>
                <h3 className="text-lg md:text-xl text-[var(--color-text-secondary)]">{selectedTopic.name}</h3>
            </div>

            <div className="flex items-center self-start md:self-center">
                <div className="flex items-center p-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)]">
                    <button onClick={() => setMode('learn')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'learn' ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow' : 'hover:bg-[var(--color-bg-tertiary)]'}`}>
                        <BookIcon className="w-5 h-5" />
                        學習模式
                    </button>
                    <button onClick={() => setMode('practice')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'practice' ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow' : 'hover:bg-[var(--color-bg-tertiary)]'}`}>
                        <QuizIcon className="w-5 h-5" />
                        練習模式
                    </button>
                </div>
            </div>
        </div>
        
        <div className="mt-8">
            {mode === 'learn' && renderLearningContent()}
            {mode === 'practice' && renderPracticeContent()}
        </div>
      </div>
    </main>
  );
};

export default ContentView;