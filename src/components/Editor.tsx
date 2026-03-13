import { useRef } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  FileCode,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Trash2,
} from 'lucide-react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

function Editor({ value, onChange }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Core helper: wraps selected text with prefix/suffix, or inserts
   * placeholder text if nothing is selected. Restores focus and
   * sets cursor position sensibly after the insertion.
   */
  function wrapSelection(
    prefix: string,
    suffix: string,
    placeholder: string,
  ) {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const replacement = selected.length > 0 ? selected : placeholder;
    const newValue =
      value.slice(0, start) + prefix + replacement + suffix + value.slice(end);

    onChange(newValue);

    // Restore focus and position cursor after the inserted text
    requestAnimationFrame(() => {
      ta.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = cursorStart + replacement.length;
      ta.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  /**
   * Insert text at the current cursor position, replacing any selection.
   * Used for block-level insertions (headings, lists, blockquotes) that
   * work on whole lines.
   */
  function insertAtCursor(text: string) {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newValue = value.slice(0, start) + text + value.slice(end);

    onChange(newValue);

    requestAnimationFrame(() => {
      ta.focus();
      const newCursor = start + text.length;
      ta.setSelectionRange(newCursor, newCursor);
    });
  }

  /**
   * Prefix-insert for block-level formatting: inserts prefix at the
   * beginning of each selected line. If nothing is selected, inserts
   * a placeholder line.
   */
  function prefixLines(linePrefix: string, placeholder: string) {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    if (start === end) {
      // No selection — insert a placeholder line
      insertAtCursor(linePrefix + placeholder + '\n');
      return;
    }

    const selected = value.slice(start, end);
    const prefixed = selected
      .split('\n')
      .map((line) => linePrefix + line)
      .join('\n');

    const newValue = value.slice(0, start) + prefixed + value.slice(end);
    onChange(newValue);

    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start, start + prefixed.length);
    });
  }

  // ── Toolbar action definitions ──────────────────────────────────────────

  const toolbarGroups: (ToolbarAction | 'divider')[][] = [
    // Inline formatting
    [
      {
        icon: <Bold size={15} />,
        label: 'Bold',
        action: () => wrapSelection('**', '**', 'bold text'),
      },
      {
        icon: <Italic size={15} />,
        label: 'Italic',
        action: () => wrapSelection('*', '*', 'italic text'),
      },
      {
        icon: <Strikethrough size={15} />,
        label: 'Strikethrough',
        action: () => wrapSelection('~~', '~~', 'strikethrough text'),
      },
    ],
    // Code
    [
      {
        icon: <Code size={15} />,
        label: 'Inline code',
        action: () => wrapSelection('`', '`', 'code'),
      },
      {
        icon: <FileCode size={15} />,
        label: 'Code block',
        action: () => wrapSelection('```\n', '\n```', 'code'),
      },
    ],
    // Links & media
    [
      {
        icon: <Link size={15} />,
        label: 'Link',
        action: () => wrapSelection('[', '](url)', 'link text'),
      },
      {
        icon: <Image size={15} />,
        label: 'Image',
        action: () => wrapSelection('![', '](url)', 'alt text'),
      },
    ],
    // Headings
    [
      {
        icon: <Heading1 size={15} />,
        label: 'Heading 1',
        action: () => prefixLines('# ', 'Heading 1'),
      },
      {
        icon: <Heading2 size={15} />,
        label: 'Heading 2',
        action: () => prefixLines('## ', 'Heading 2'),
      },
      {
        icon: <Heading3 size={15} />,
        label: 'Heading 3',
        action: () => prefixLines('### ', 'Heading 3'),
      },
    ],
    // Block formatting
    [
      {
        icon: <List size={15} />,
        label: 'Unordered list',
        action: () => prefixLines('- ', 'list item'),
      },
      {
        icon: <ListOrdered size={15} />,
        label: 'Ordered list',
        action: () => prefixLines('1. ', 'list item'),
      },
      {
        icon: <Quote size={15} />,
        label: 'Blockquote',
        action: () => prefixLines('> ', 'quoted text'),
      },
    ],
  ];

  const clearAction: ToolbarAction = {
    icon: <Trash2 size={15} />,
    label: 'Clear',
    action: () => {
      onChange('');
      requestAnimationFrame(() => textareaRef.current?.focus());
    },
  };

  // ── Tab key handler ─────────────────────────────────────────────────────

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const spaces = '  ';
      const newValue = value.slice(0, start) + spaces + value.slice(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + spaces.length, start + spaces.length);
      });
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Toolbar */}
      <div
        className="
          flex flex-wrap items-center gap-0.5 px-2 py-1.5
          bg-editor-surface border-b border-editor-border
          shrink-0
        "
      >
        {toolbarGroups.map((group, gi) => (
          <span key={gi} className="flex items-center">
            {gi > 0 && (
              <span
                className="w-px h-5 bg-editor-border mx-1.5 shrink-0"
                aria-hidden="true"
              />
            )}
            {group.map((item) => {
              if (item === 'divider') {
                return (
                  <span
                    key="divider"
                    className="w-px h-5 bg-editor-border mx-1.5 shrink-0"
                    aria-hidden="true"
                  />
                );
              }
              const { icon, label, action } = item as ToolbarAction;
              return (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  onClick={action}
                  className="
                    inline-flex items-center justify-center
                    w-7 h-7 rounded
                    text-editor-text/70
                    hover:text-accent-primary hover:bg-editor-line-highlight
                    active:bg-accent-muted/20
                    transition-colors duration-100
                    focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary
                  "
                >
                  {icon}
                </button>
              );
            })}
          </span>
        ))}

        {/* Spacer */}
        <span className="flex-1" />

        {/* Divider before Clear */}
        <span
          className="w-px h-5 bg-editor-border mx-1.5 shrink-0"
          aria-hidden="true"
        />

        {/* Clear button */}
        <button
          type="button"
          title={clearAction.label}
          aria-label={clearAction.label}
          onClick={clearAction.action}
          className="
            inline-flex items-center justify-center gap-1
            px-2 h-7 rounded text-xs font-medium
            text-editor-text/50
            hover:text-status-warning hover:bg-editor-line-highlight
            active:bg-status-warning/10
            transition-colors duration-100
            focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary
          "
        >
          {clearAction.icon}
          <span>Clear</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start writing markdown..."
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className="
          flex-1 w-full resize-none
          bg-editor-bg text-editor-text
          border-x border-editor-border
          font-mono text-sm leading-relaxed
          px-4 py-3
          placeholder:text-editor-placeholder
          focus:outline-none focus:shadow-[inset_0_0_0_1px_theme(colors.accent.muted)]
          transition-shadow duration-150
        "
        style={{ caretColor: 'var(--color-accent-primary)' }}
      />
    </div>
  );
}

export default Editor;
