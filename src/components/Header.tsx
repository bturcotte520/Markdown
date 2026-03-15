interface HeaderProps {
  wordCount: number
  charCount: number
  onExport: () => void
  isDark: boolean
  onToggleTheme: () => void
}

export default function Header({
  wordCount,
  charCount,
  onExport,
  isDark,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header
      style={{
        height: '52px',
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0,
      }}
    >
      {/* Left: logo + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Pen/edit SVG icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span
          style={{
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '15px',
            letterSpacing: '-0.01em',
          }}
        >
          Markdown Editor
        </span>
      </div>

      {/* Right: controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Word/char count pill */}
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: '9999px',
            padding: '3px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          {wordCount} words · {charCount} chars
        </span>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'var(--bg-surface)'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--text-primary)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--text-muted)'
          }}
        >
          {isDark ? (
            /* Sun icon (shown in dark mode — click to go light) */
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon icon (shown in light mode — click to go dark) */
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Export button */}
        <button
          onClick={onExport}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'var(--accent-hover)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'var(--accent)'
          }}
        >
          {/* Download SVG icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export .md
        </button>
      </div>
    </header>
  )
}
