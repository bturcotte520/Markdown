import React from 'react'

interface StatusBarProps {
  lineCount: number
  cursorLine: number
  cursorCol: number
  wordCount: number
}

const StatusBar: React.FC<StatusBarProps> = ({
  lineCount,
  cursorLine,
  cursorCol,
  wordCount,
}) => {
  const readingMinutes = Math.max(1, Math.round(wordCount / 200))

  return (
    <div
      style={{
        height: '28px',
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
        fontSize: '12px',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '12px',
        paddingRight: '12px',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#6366f1',
            flexShrink: 0,
          }}
        />
        <span>Markdown</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>{lineCount} lines</span>
      </div>

      {/* Center section */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <span>
          Ln {cursorLine}, Col {cursorCol}
        </span>
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>~{readingMinutes} min read</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>UTF-8</span>
      </div>
    </div>
  )
}

export default StatusBar
