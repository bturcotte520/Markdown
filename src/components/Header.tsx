import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Header({ darkMode, onToggleDark }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-4 h-12 shrink-0
                 bg-editor-surface border-b border-editor-border"
    >
      {/* Left: logo + title */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center justify-center
                     h-7 px-1.5 rounded
                     bg-accent-muted text-editor-text
                     font-mono text-sm font-bold leading-none select-none"
          aria-hidden="true"
        >
          M↓
        </span>
        <span className="text-editor-text font-semibold text-sm tracking-wide">
          Markdown Editor
        </span>
      </div>

      {/* Right: theme toggle */}
      <button
        onClick={onToggleDark}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="flex items-center justify-center
                   w-8 h-8 rounded
                   text-editor-text hover:text-accent-hover
                   hover:bg-editor-line-highlight
                   transition-colors duration-150
                   focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary"
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}

export default Header;
