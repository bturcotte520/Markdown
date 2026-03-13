import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import StatusBar from './components/StatusBar';

// ── Demo markdown ─────────────────────────────────────────────────────────────

const DEMO_MARKDOWN = `# Welcome to Markdown Editor

A **fast**, _lightweight_ markdown editor with live preview.

---

## Features

- Real-time preview as you type
- Syntax highlighted code blocks
- ~~No server required~~ **fully client-side**
- Dark / light mode toggle that persists across sessions

---

## Code Example

Inline code: \`const greeting = 'Hello, world!';\`

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('Markdown Editor'));
\`\`\`

---

## Table

| Feature        | Supported | Notes                  |
| -------------- | :-------: | ---------------------- |
| Headings       | ✅        | H1 – H6                |
| Bold / Italic  | ✅        | GFM                    |
| Tables         | ✅        | GFM extension          |
| Task lists     | ✅        | GFM extension          |
| Code blocks    | ✅        | Syntax highlighted     |

---

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

---

## Task List

- [x] Set up Vite + React + TypeScript scaffold
- [x] Design tokens and global styles
- [x] Editor component with toolbar
- [x] Preview component with syntax highlighting
- [x] Header and StatusBar components
- [x] Wire everything together in App.tsx
`;

// ── Dark mode initialiser (runs before first render) ─────────────────────────

function getInitialDarkMode(): boolean {
  try {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
  } catch {
    // localStorage not available
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
}

// ── App ───────────────────────────────────────────────────────────────────────

type ActiveTab = 'edit' | 'preview';

export default function App() {
  const [content, setContent] = useState<string>(DEMO_MARKDOWN);
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);
  const [activeTab, setActiveTab] = useState<ActiveTab>('edit');

  // Split-pane drag state
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const dragging = useRef(false);
  const splitContainerRef = useRef<HTMLDivElement>(null);

  // ── Dark mode side-effect ──────────────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('darkMode', String(darkMode));
    } catch {
      // ignore
    }
  }, [darkMode]);

  const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

  // ── Resizable split-pane handlers ─────────────────────────────────────────
  const handleDividerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragging.current = true;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },
    [],
  );

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.min(80, Math.max(20, (x / rect.width) * 100));
      setSplitPercent(pct);
    }

    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-editor-bg text-editor-text">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <Header darkMode={darkMode} onToggleDark={toggleDark} />

      {/* ── Mobile tab bar ─────────────────────────────────────────────── */}
      <div
        className="
          flex md:hidden shrink-0
          border-b border-editor-border
          bg-editor-surface
        "
      >
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={[
            'flex-1 py-2 text-sm font-medium transition-colors duration-150',
            'focus:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent-primary',
            activeTab === 'edit'
              ? 'text-accent-primary border-b-2 border-accent-primary -mb-px'
              : 'text-editor-placeholder hover:text-editor-text',
          ].join(' ')}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={[
            'flex-1 py-2 text-sm font-medium transition-colors duration-150',
            'focus:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent-primary',
            activeTab === 'preview'
              ? 'text-accent-primary border-b-2 border-accent-primary -mb-px'
              : 'text-editor-placeholder hover:text-editor-text',
          ].join(' ')}
        >
          Preview
        </button>
      </div>

      {/* ── Split pane area (desktop) / stacked panes (mobile) ──────────── */}

      {/* Desktop: flex row with drag handle */}
      <div
        ref={splitContainerRef}
        className="hidden md:flex flex-1 overflow-hidden"
      >
        {/* Editor pane */}
        <div
          className="flex flex-col overflow-hidden border-r border-editor-border"
          style={{ width: `${splitPercent}%` }}
        >
          <Editor value={content} onChange={setContent} />
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={handleDividerMouseDown}
          title="Drag to resize"
          className="
            w-1 shrink-0 cursor-col-resize
            bg-editor-border
            hover:bg-accent-muted
            active:bg-accent-primary
            transition-colors duration-100
            select-none
          "
          aria-hidden="true"
        />

        {/* Preview pane */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ width: `${100 - splitPercent}%` }}
        >
          <Preview content={content} />
        </div>
      </div>

      {/* Mobile: single active pane at ~50vh each, or full-height via tab */}
      <div className="flex md:hidden flex-1 overflow-hidden">
        {activeTab === 'edit' ? (
          <div className="flex flex-col w-full overflow-hidden">
            <Editor value={content} onChange={setContent} />
          </div>
        ) : (
          <div className="flex flex-col w-full overflow-hidden">
            <Preview content={content} />
          </div>
        )}
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────── */}
      <StatusBar content={content} />
    </div>
  );
}
