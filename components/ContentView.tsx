import React from 'react';
import {
  generateAdvancedContentForSection,
  generatePracticeQuestions,
} from '../services/geminiService';
import { PREGENERATED_CONTENT } from '../data/pregeneratedContent';
import { PREGENERATED_PRACTICE } from '../data/pregeneratedPractice';
import type {
  Topic,
  LearningContent,
  PracticeQuestion,
  ContentViewMode,
  AdvancedSectionContent,
  ExamQuestion,
} from '../types';
import LoadingSpinner from './LoadingSpinner';
import BookIcon from './icons/BookIcon';
import QuizIcon from './icons/QuizIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import InfoIcon from './icons/InfoIcon';
import KeyIcon from './icons/KeyIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import ChecklistIcon from './icons/ChecklistIcon';
import SparkleIcon from './icons/SparkleIcon';
import BrainIcon from './icons/BrainIcon';
import GearsIcon from './icons/GearsIcon';
import QuestionIcon from './icons/QuestionIcon';
import RefreshIcon from './icons/RefreshIcon';
import AILogoIcon from './icons/AILogoIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import BookOpenIcon from './icons/BookOpenIcon';


interface ContentViewProps {
  selectedTopic: Topic | null;
}

// A new component to parse and render text with richer formatting
const RichContent: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  const renderStyledLine = (line: string) => {
    // Split the line by code/example patterns AND bold patterns
    const parts = line.split(/(「.*?」|{.*?}|`.*?`|\*\*.*?\*\*)/g).filter(Boolean);
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
        
        // Style for sub-headings like "定義與運作原理"
        if (!line.startsWith(' ') && !line.startsWith('•') && line.length < 30 && !line.includes('：')) {
          return <h4 key={index} className="text-xl font-semibold text-[var(--color-text-primary)] mt-8 mb-4">{line}</h4>;
        }
        
        // Style for list items like "• 斷詞 (Tokenization)：..."
        const listItemMatch = line.match(/^\s*•\s*(.*?)\s*：\s*(.*)/);
        if (listItemMatch) {
          const [, term, explanation] = listItemMatch;
          return (
            <div key={index} className="relative pl-8 my-5">
              <span className="absolute left-0 top-1 text-xl text-[var(--color-accent)]">•</span>
              <div>
                <span className="font-semibold text-[var(--color-text-primary)]">{renderStyledLine(term)}：</span>
                {renderStyledLine(explanation)}
              </div>
            </div>
          );
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
  const [isGeneratingMore, setIsGeneratingMore] = React.useState(false);
  const [generationError, setGenerationError] = React.useState<string | null>(null);
  
  // State for granular advanced content
  const [advancedContent, setAdvancedContent] = React.useState<Record<string, AdvancedSectionContent>>({});
  const [generatingFor, setGeneratingFor] = React.useState<string | null>(null);
  const [advancedError, setAdvancedError] = React.useState<string | null>(null);
  

  const loadInitialContent = React.useCallback((topic: Topic) => {
    setError(null);
    setAdvancedError(null);

    // Reset states
    setShowAnswers(false);
    setSelectedAnswers({});
    setPracticeQuestions(null);
    setAdvancedContent({});
    setGeneratingFor(null);
    
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
        setGenerationError(null);
        setError(null);
    }
  }, [mode, selectedTopic]);

  const handleGenerateForSection = async (sectionContext: string) => {
    if (selectedTopic && !generatingFor) {
        const currentTopicId = selectedTopic.id; // Capture topic context
        const currentTopicName = selectedTopic.name;

        setGeneratingFor(sectionContext);
        setAdvancedError(null);
        try {
            const newContent = await generateAdvancedContentForSection(currentTopicName, sectionContext);
            
            if (selectedTopic?.id === currentTopicId) {
              setAdvancedContent(prev => ({...prev, [sectionContext]: newContent}));
            }
        } catch(err) {
            if (selectedTopic?.id === currentTopicId) {
              setAdvancedError(err instanceof Error ? err.message : 'An unknown error occurred.');
            }
        } finally {
            if (selectedTopic?.id === currentTopicId) {
              setGeneratingFor(null);
            }
        }
    }
  };

  const handleSelectAnswer = (questionIndex: number, answer: string) => {
    if (showAnswers) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };
  
  const handleCheckOrReset = () => {
    if (showAnswers) {
      setShowAnswers(false);
      setSelectedAnswers({});
       if (practiceQuestions && selectedTopic) {
         // Reset to only pre-generated questions on "practice again"
        const pregenQuestions = PREGENERATED_PRACTICE[selectedTopic.id] || [];
        setPracticeQuestions(pregenQuestions);
      }
    } else {
      setShowAnswers(true);
    }
  };
  
  const handleGenerateMore = async () => {
    if (!selectedTopic || isGeneratingMore) return;
    setIsGeneratingMore(true);
    setGenerationError(null);
    try {
        const newQuestions = await generatePracticeQuestions(selectedTopic.name, 5);
        setPracticeQuestions(prev => [...(prev || []), ...newQuestions]);
    } catch (err) {
        setGenerationError(err instanceof Error ? err.message : '無法生成更多練習題，請稍後再試。');
    } finally {
        setIsGeneratingMore(false);
    }
  };
  
  const renderPracticeContent = () => {
    if (!practiceQuestions || practiceQuestions.length === 0) {
      return (
        <div className="text-center p-8 text-[var(--color-text-secondary)]">
          <p>此主題目前沒有內建練習題。</p>
          <p>您可以點擊下方按鈕，由 AI 為您生成。 </p>
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

          <div className="w-full border-t border-[var(--color-border-secondary)] my-4"></div>
          
          <h4 className="text-lg font-semibold text-[var(--color-text-secondary)]">想要更深入的練習？</h4>
          <button
            onClick={handleGenerateMore}
            disabled={isGeneratingMore}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-full font-semibold hover:bg-[var(--color-border-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingMore ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>AI 生成中...</span>
              </>
            ) : (
               <>
                <RefreshIcon className="w-5 h-5" />
                <span>AI 生成更多練習題</span>
               </>
            )}
          </button>
           {generationError && (
             <div className="mt-4 text-center p-3 bg-red-500/10 text-red-500 rounded-lg text-sm">
                <p>{generationError}</p>
            </div>
        )}
        </div>
      </div>
    );
  };
  
  const renderAdvancedContent = (context: string) => {
    if (generatingFor === context) {
      return <div className="py-4"><LoadingSpinner message="生成進階內容中..."/></div>
    }
    const content = advancedContent[context];
    if (content) {
      return (
        <div className="mt-8 p-6 md:p-8 rounded-xl bg-[var(--color-bg-tertiary)] space-y-10">
           {/* Section 1 */}
           <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-indigo)]/20 flex items-center justify-center">
                    <BrainIcon className="w-6 h-6 text-[var(--color-accent-indigo)]" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-[var(--color-accent-indigo)]">進階原理與最新發展</h4>
                    <p className="text-[var(--color-text-secondary)] mt-2 whitespace-pre-wrap" style={{ lineHeight: '1.9' }}>{content.advancedPrinciples}</p>
                </div>
           </div>
           {/* Section 2 */}
           <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-teal)]/20 flex items-center justify-center">
                    <BriefcaseIcon className="w-6 h-6 text-[var(--color-accent-teal)]" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-[var(--color-accent-teal)]">高階應用案例</h4>
                    <p className="text-[var(--color-text-secondary)] mt-2 whitespace-pre-wrap" style={{ lineHeight: '1.9' }}>{content.highLevelApplications}</p>
                </div>
           </div>
           {/* Section 3 */}
           <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-red)]/20 flex items-center justify-center">
                    <QuizIcon className="w-6 h-6 text-[var(--color-accent-red)]" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-[var(--color-accent-red)]">風險、限制與治理</h4>
                    <p className="text-[var(--color-text-secondary)] mt-2 whitespace-pre-wrap" style={{ lineHeight: '1.9' }}>{content.risksAndGovernance}</p>
                </div>
           </div>
           {/* Section 4 */}
           <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-amber)]/20 flex items-center justify-center">
                    <QuestionIcon className="w-6 h-6 text-[var(--color-accent-amber)]" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-[var(--color-accent-amber)]">延伸思考</h4>
                    <p className="text-[var(--color-text-secondary)] mt-2 whitespace-pre-wrap" style={{ lineHeight: '1.9' }}>{content.extendedThinking}</p>
                </div>
           </div>
           {/* Section 5 */}
           <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent-green)]/20 flex items-center justify-center">
                    <ChecklistIcon className="w-6 h-6 text-[var(--color-accent-green)]" />
                </div>
                <div className="w-full">
                    <h4 className="text-lg font-bold text-[var(--color-accent-green)]">考試模擬題</h4>
                    {content.examSimulation.map((q, i) => (
                        <div key={i} className="mt-6">
                            <p className="font-semibold text-[var(--color-text-primary)]">{i + 1}. {q.question}</p>
                            <ul className="mt-4 space-y-2 text-sm">
                                {q.options.map((option, j) => {
                                    const isCorrect = option === q.correctAnswer;
                                    return (
                                        <li key={j} className={`flex items-start p-2 rounded-md ${isCorrect ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-text-secondary)]'}`}>
                                            <span className="font-semibold mr-2">{isCorrect ? '✅' : '•'}</span>
                                            <span>{option}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
           </div>
        </div>
      )
    }
    return null;
  }

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
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-blue)]">{concept.title}</h3>
                    <button onClick={() => handleGenerateForSection(concept.title)} title={`為「${concept.title}」生成進階內容`} className="p-2 rounded-full hover:bg-[var(--color-bg-tertiary)] disabled:opacity-50 flex-shrink-0 ml-4" disabled={!!generatingFor}>
                        <SparkleIcon className="w-5 h-5 text-[var(--color-accent-indigo)]" />
                    </button>
                </div>
                <RichContent text={concept.explanation} />
                {renderAdvancedContent(concept.title)}
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
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-teal)]">{app.scenario}</h3>
                     <button onClick={() => handleGenerateForSection(app.scenario)} title={`為「${app.scenario}」生成進階內容`} className="p-2 rounded-full hover:bg-[var(--color-bg-tertiary)] disabled:opacity-50 flex-shrink-0 ml-4" disabled={!!generatingFor}>
                        <SparkleIcon className="w-5 h-5 text-[var(--color-accent-indigo)]" />
                    </button>
                </div>
                <RichContent text={app.description} />
                {renderAdvancedContent(app.scenario)}
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
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-accent-amber)]">{aid.title}</h3>
                    <button onClick={() => handleGenerateForSection(aid.title)} title={`為「${aid.title}」生成進階內容`} className="p-2 rounded-full hover:bg-[var(--color-accent-amber)]/20 disabled:opacity-50 flex-shrink-0 ml-4" disabled={!!generatingFor}>
                        <SparkleIcon className="w-5 h-5 text-[var(--color-accent-indigo)]" />
                    </button>
                  </div>
                  <RichContent text={aid.explanation} />
                  {renderAdvancedContent(aid.title)}
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
        
        {advancedError && (
            <div className="mt-8 text-center p-4 bg-red-500/10 text-red-500 rounded-lg">
                <p className="font-bold">生成進階內容時發生錯誤</p>
                <p className="my-1 text-sm">{advancedError}</p>
            </div>
        )}
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
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Hero Section */}
          <div className="mb-12 md:mb-16">
            <AILogoIcon className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 opacity-80" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent-indigo)] to-[var(--color-accent-teal)] pb-2">
              歡迎來到 CarbonPath iPAS AI 學習日誌
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              您的iPAS AI證照考試專屬智慧學習夥伴。我們提供系統化的考綱內容、海量練習題庫，以及由AI驅動的深度學習模組，助您高效備考，輕鬆取證。
            </p>
          </div>

          {/* Feature Cards Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            
            {/* Card 1: Learning */}
            <div className="p-6 md:p-8 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-blue)]/20 mx-auto mb-5">
                <BookOpenIcon className="w-8 h-8 text-[var(--color-accent-blue)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">系統化學習</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                涵蓋iPAS AI中級能力鑑定所有考綱，提供結構化的學習內容與記憶輔助，打下紮實的知識基礎。
              </p>
            </div>
            
            {/* Card 2: Practice */}
            <div className="p-6 md:p-8 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-green)]/20 mx-auto mb-5">
                <QuizIcon className="w-8 h-8 text-[var(--color-accent-green)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">海量題庫練習</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                每個主題內建超過10道練習題，透過實戰演練鞏固知識，並提供詳盡解析，掌握考試重點。
              </p>
            </div>

            {/* Card 3: AI Deep Dive */}
            <div className="p-6 md:p-8 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-secondary)] transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-indigo)]/20 mx-auto mb-5">
                <SparkleIcon className="w-8 h-8 text-[var(--color-accent-indigo)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">AI 深度剖析</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                針對關鍵概念，由AI生成進階原理、高階應用案例與素養模擬考題，深化您的專業理解。
              </p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-center">
             <p className="text-lg font-semibold text-[var(--color-text-secondary)] mb-4">
               準備好了嗎？從左側選單選擇一個主題，開啟您的學習之旅！
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