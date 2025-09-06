import React from 'react';
import type { AppTheme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface ThemeSwitcherProps {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const themes: { name: AppTheme; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: 'light', icon: SunIcon },
  { name: 'dark', icon: MoonIcon },
  { name: 'book', icon: BookOpenIcon },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  return (
    <div className="flex items-center p-1 rounded-full bg-[var(--color-bg-tertiary)]">
      {themes.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)] focus:ring-[var(--color-accent)] ${
            theme === name ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
          }`}
          aria-label={`Switch to ${name} theme`}
          title={`Switch to ${name} theme`}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
