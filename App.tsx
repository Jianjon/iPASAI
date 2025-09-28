import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ContentView from './components/ContentView';
import Footer from './components/Footer';
import ThemeSwitcher from './components/ThemeSwitcher';
import MenuIcon from './components/icons/MenuIcon';
import { CURRICULUM_DATA } from './constants';
import type { Topic, AppTheme } from './types';
import TopicNavigation from './components/TopicNavigation';
import QuizView from './components/QuizView';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [theme, setTheme] = useState<AppTheme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as AppTheme) || 'dark';
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);

  const isResizing = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsQuizMode(false);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };
  
  const handleGoHome = () => {
    setSelectedTopic(null);
    setIsQuizMode(false);
     if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  const handleStartQuiz = () => {
    setSelectedTopic(null);
    setIsQuizMode(true);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [selectedTopic, isQuizMode]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isMobile) {
        setIsSidebarCollapsed(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile]);

  const handleMouseDownResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMoveResize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = e.clientX;
    if (newWidth < 280) newWidth = 280;
    if (newWidth > 600) newWidth = 600;
    setSidebarWidth(newWidth);
  }, []);

  const handleMouseUpResize = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveResize);
    window.addEventListener('mouseup', handleMouseUpResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveResize);
      window.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [handleMouseMoveResize, handleMouseUpResize]);

  return (
    <div className="flex h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
      <Sidebar
        subjects={CURRICULUM_DATA}
        selectedTopic={selectedTopic}
        onSelectTopic={handleSelectTopic}
        isCollapsed={isMobile ? !isMobileSidebarOpen : isSidebarCollapsed}
        width={sidebarWidth}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onMouseDownResize={handleMouseDownResize}
        isMobile={isMobile}
        onClose={() => setIsMobileSidebarOpen(false)}
        onGoHome={handleGoHome}
        onStartQuiz={handleStartQuiz}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm z-20">
          {isMobile && (
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-[var(--color-bg-tertiary)]"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          )}
          <div className={`font-bold text-lg ${isMobile ? 'absolute left-1/2 -translate-x-1/2' : ''}`}>
            {isQuizMode ? '綜合刷題練習' : selectedTopic ? `${selectedTopic.id}` : 'iPAS AI 學習日誌'}
          </div>
          <div className={!isMobile ? 'ml-auto' : ''}>
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
          {isQuizMode ? (
            <QuizView onBack={handleGoHome} />
          ) : (
            <ContentView selectedTopic={selectedTopic} />
          )}

          {!isQuizMode && selectedTopic && (
             <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-8">
              <TopicNavigation
                subjects={CURRICULUM_DATA}
                selectedTopic={selectedTopic}
                onSelectTopic={handleSelectTopic}
              />
            </div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;