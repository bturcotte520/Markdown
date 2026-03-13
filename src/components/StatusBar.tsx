interface StatusBarProps {
  content: string;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function countLines(text: string): number {
  if (!text) return 0;
  return text.split('\n').length;
}

export function StatusBar({ content }: StatusBarProps) {
  const words = countWords(content);
  const lines = countLines(content);
  const chars = content.length;
  const overLimit = chars > 1000;

  return (
    <footer
      className="flex items-center justify-between px-4 h-6 shrink-0
                 bg-editor-surface border-t border-editor-border
                 font-mono text-xs text-editor-placeholder"
    >
      {/* Left: word count */}
      <span>{words} {words === 1 ? 'word' : 'words'}</span>

      {/* Center: line count */}
      <span>{lines} {lines === 1 ? 'line' : 'lines'}</span>

      {/* Right: character count (warning color above 1000) */}
      <span
        className={overLimit ? 'text-status-warning font-medium' : ''}
        aria-live="polite"
      >
        {chars} {chars === 1 ? 'char' : 'chars'}
      </span>
    </footer>
  );
}

export default StatusBar;
