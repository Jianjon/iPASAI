import React, { useMemo } from 'react';
import type { Subject, Topic } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface TopicNavigationProps {
  subjects: Subject[];
  selectedTopic: Topic;
  onSelectTopic: (topic: Topic) => void;
}

const TopicNavigation: React.FC<TopicNavigationProps> = ({
  subjects,
  selectedTopic,
  onSelectTopic,
}) => {
  const { prevTopic, nextTopic } = useMemo(() => {
    const allTopics: Topic[] = subjects.flatMap(subject =>
      subject.themes.flatMap(theme => theme.topics)
    );

    const currentIndex = allTopics.findIndex(
      topic => topic.id === selectedTopic.id
    );

    const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const next =
      currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

    return { prevTopic: prev, nextTopic: next };
  }, [subjects, selectedTopic]);

  return (
    <nav className="flex justify-between items-center border-t-2 border-[var(--color-border-secondary)] pt-8 mt-8">
      {prevTopic ? (
        <button
          onClick={() => onSelectTopic(prevTopic)}
          className="flex items-center gap-3 text-left p-3 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors w-1/2"
        >
          <ArrowLeftIcon className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">上一單元</p>
            <p className="font-semibold text-[var(--color-text-primary)]">{`${prevTopic.id} ${prevTopic.name}`}</p>
          </div>
        </button>
      ) : (
        <div className="w-1/2"></div>
      )}

      {nextTopic ? (
        <button
          onClick={() => onSelectTopic(nextTopic)}
          className="flex items-center justify-end gap-3 text-right p-3 rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors w-1/2"
        >
          <div className="flex-grow">
            <p className="text-xs text-[var(--color-text-muted)]">下一單元</p>
            <p className="font-semibold text-[var(--color-text-primary)]">{`${nextTopic.id} ${nextTopic.name}`}</p>
          </div>
          <ArrowRightIcon className="w-6 h-6 text-[var(--color-accent)] flex-shrink-0" />
        </button>
      ) : (
        <div className="w-1/2"></div>
      )}
    </nav>
  );
};

export default TopicNavigation;
