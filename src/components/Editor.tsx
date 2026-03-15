import { useRef } from 'react'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

type WrapSpec = {
  before: string
  after: string
  placeholder: string
}

type InsertSpec = {
  text: string
}

type ToolbarAction = WrapSpec | InsertSpec

function isWrap(action: ToolbarAction): action is WrapSpec {
  return 'before' in action
}

interface ToolbarButton {
  label: string
  title: string
  action: ToolbarAction
}

interface ToolbarDivider {
  divider: true
}

type ToolbarItem = ToolbarButton | ToolbarDivider

function isDivider(item: ToolbarItem): item is ToolbarDivider {
  return 'divider' in item
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  // Text formatting
  { label: 'B',   title: 'Bold',        action: { before: '**', after: '**', placeholder: 'bold text' } },
  { label: 'I',   title: 'Italic',      action: { before: '*',  after: '*',  placeholder: 'italic text' } },
  { label: '`',   title: 'Inline code', action: { before: '`',  after: '`',  placeholder: 'code' } },
  { label: '</>', title: 'Code block',  action: { before: '```\n', after: '\n```', placeholder: 'code here' } },
  { divider: true },
  // Headings
  { label: 'H1', title: 'Heading 1', action: { text: '# Heading 1\n' } },
  { label: 'H2', title: 'Heading 2', action: { text: '## Heading 2\n' } },
  { divider: true },
  // Media
  {
    label: '🔗',
    title: 'Link',
    action: { before: '[', after: '](url)', placeholder: 'link text' },
  },
  {
    label: '🖼',
    title: 'Image',
    action: { before: '![', after: '](url)', placeholder: 'alt text' },
  },
  { divider: true },
  // Lists
  { label: '1.', title: 'Ordered list',   action: { text: '1. List item\n' } },
  { label: '•',  title: 'Unordered list', action: { text: '- List item\n' } },
  { label: '❝',  title: 'Blockquote',     action: { before: '> ', after: '', placeholder: 'quoted text' } },
  { label: '—',  title: 'Horizontal rule', action: { text: '\n---\n' } },
]

export default function Editor({ value, onChange }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function applyAction(item: ToolbarButton) {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = value.slice(start, end)

    let newValue: string
    let newCursorStart: number
    let newCursorEnd: number

    if (isWrap(item.action)) {
      const { before, after, placeholder } = item.action
      const inner = selected.length > 0 ? selected : placeholder
      newValue = value.slice(0, start) + before + inner + after + value.slice(end)
      newCursorStart = start + before.length
      newCursorEnd = newCursorStart + inner.length
    } else {
      const { text } = item.action
      newValue = value.slice(0, start) + text + value.slice(end)
      newCursorStart = start + text.length
      newCursorEnd = newCursorStart
    }

    onChange(newValue)

    // Restore focus and selection after React re-render
    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorStart, newCursorEnd)
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const spaces = '  '
      const newValue = value.slice(0, start) + spaces + value.slice(end)
      onChange(newValue)
      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + spaces.length, start + spaces.length)
      })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '4px 8px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        {TOOLBAR_ITEMS.map((item, idx) => {
          if (isDivider(item)) {
            return (
              <div
                key={`divider-${idx}`}
                style={{
                  width: '1px',
                  height: '18px',
                  background: 'var(--border)',
                  margin: '0 4px',
                  flexShrink: 0,
                }}
              />
            )
          }
          return (
            <button
              key={item.title}
              title={item.title}
              onMouseDown={(e) => {
                // Prevent textarea from losing focus
                e.preventDefault()
                applyAction(item)
              }}
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: item.label === '</>' ? '10px' : item.label.length > 1 ? '11px' : '13px',
                fontWeight: item.label === 'B' ? '700' : item.label === 'I' ? '400' : '500',
                fontStyle: item.label === 'I' ? 'italic' : 'normal',
                fontFamily: item.label === '`' || item.label === '</>' ? 'monospace' : 'inherit',
                flexShrink: 0,
                transition: 'background 0.1s, color 0.1s',
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'var(--bg-surface)'
                el.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.color = 'var(--text-muted)'
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start writing markdown..."
        spellCheck={false}
        style={{
          flex: 1,
          resize: 'none',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
          fontSize: '14px',
          lineHeight: '1.7',
          padding: '20px 24px',
          border: 'none',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      />
    </div>
  )
}
