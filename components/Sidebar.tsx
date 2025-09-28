import React, { useState } from 'react';
import type { Subject, Topic } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ChevronsLeftIcon from './icons/ChevronsLeftIcon';
import ChevronsRightIcon from './icons/ChevronsRightIcon';
import CheckSquareIcon from './icons/CheckSquareIcon';

interface SidebarProps {
  subjects: Subject[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  isCollapsed: boolean;
  width: number;
  onToggle: () => void;
  onMouseDownResize: (e: React.MouseEvent) => void;
  isMobile: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onStartQuiz: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  subjects,
  selectedTopic,
  onSelectTopic,
  isCollapsed,
  width,
  onToggle,
  onMouseDownResize,
  isMobile,
  onClose,
  onGoHome,
  onStartQuiz,
}) => {
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());
  const [openThemes, setOpenThemes] = useState<Set<string>>(new Set());

  const toggleSubject = (subjectId: string) => {
    setOpenSubjects(prev => {
      const next = new Set(prev);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.add(subjectId);
      }
      return next;
    });
  };

  const toggleTheme = (themeId: string) => {
    setOpenThemes(prev => {
      const next = new Set(prev);
      if (next.has(themeId)) {
        next.delete(themeId);
      } else {
        next.add(themeId);
      }
      return next;
    });
  };

  if (isCollapsed && !isMobile) {
    return (
      <aside
        className="h-screen flex-shrink-0 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)] flex items-start justify-center pt-6 transition-all duration-300 ease-in-out"
        style={{ width: '56px' }}
        aria-label="Sidebar collapsed"
      >
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-[var(--color-bg-tertiary)]"
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          <ChevronsRightIcon className="w-6 h-6 text-[var(--color-text-secondary)]" />
        </button>
      </aside>
    );
  }

  const sidebarWidth = isMobile ? '300px' : `${width}px`;
  const isOverlay = isMobile;

  return (
    <aside
      className={`h-screen bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)] flex flex-col transition-transform duration-300 ease-in-out
      ${isOverlay ? 'fixed top-0 left-0 z-40' : 'relative flex-shrink-0'}
      ${isCollapsed && isOverlay ? '-translate-x-full' : 'translate-x-0'}`}
      style={{ width: sidebarWidth, minWidth: sidebarWidth }}
      aria-label="Sidebar"
    >
      <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onGoHome} className="text-left group">
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] whitespace-nowrap group-hover:text-[var(--color-accent)] transition-colors">
              iPAS AI 學習日誌
            </h1>
          </button>
          <button
            onClick={isMobile ? onClose : onToggle}
            className="p-1 rounded-md hover:bg-[var(--color-bg-tertiary)]"
            title={isMobile ? "Close menu" : "Collapse sidebar"}
            aria-label={isMobile ? "Close menu" : "Collapse sidebar"}
          >
            <ChevronsLeftIcon className="w-6 h-6 text-[var(--color-text-secondary)]" />
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-3 pb-3 border-b border-[var(--color-border-primary)]">
              <button
                onClick={onStartQuiz}
                className="w-full flex items-center text-left p-2 rounded-md hover:bg-[var(--color-bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <CheckSquareIcon className="w-5 h-5 mr-3 text-[var(--color-accent-amber)] flex-shrink-0" />
                <span className="font-semibold text-lg">綜合刷題練習</span>
              </button>
            </li>
            {subjects.map(subject => (
              <li key={subject.id} className="mb-2">
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-[var(--color-bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  aria-expanded={openSubjects.has(subject.id)}
                >
                  <span className="font-semibold text-lg">{subject.name}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${
                      openSubjects.has(subject.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSubjects.has(subject.id) && (
                  <ul className="pl-4 mt-1 border-l-2 border-[var(--color-border-primary)]">
                    {subject.themes.map(theme => (
                      <li key={theme.id} className="my-1">
                        <button
                          onClick={() => toggleTheme(theme.id)}
                          className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-[var(--color-bg-tertiary)] focus:outline-none"
                           aria-expanded={openThemes.has(theme.id)}
                        >
                          <span className="font-medium text-[var(--color-text-secondary)]">
                            {subject.id === 'L3' ? theme.name : `${theme.id} ${theme.name}`}
                          </span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform ${
                              openThemes.has(theme.id) ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openThemes.has(theme.id) && (
                          <ul className="pl-4 mt-1 border-l-2 border-[var(--color-text-muted)]">
                            {theme.topics.map(topic => (
                              <li key={topic.id}>
                                <button
                                  onClick={() => onSelectTopic(topic)}
                                  className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                                    selectedTopic?.id === topic.id
                                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] font-bold'
                                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                                  }`}
                                >
                                  {subject.id === 'L3' ? topic.name : `${topic.id} ${topic.name}`}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {!isMobile && (
        <div
          onMouseDown={onMouseDownResize}
          className="absolute top-0 right-0 h-full w-1.5 cursor-col-resize select-none touch-none group"
          aria-label="Resize sidebar"
          role="separator"
        >
          <div className="w-full h-full transition-colors group-hover:bg-[var(--color-accent)]/20"></div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;