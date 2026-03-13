/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Editor pane — VS Code / GitHub Dark inspired
        editor: {
          bg:             '#0d1117', // deepest background, matches GitHub Dark
          surface:        '#161b22', // slightly lifted surface (toolbar, panels)
          border:         '#30363d', // subtle divider / border
          text:           '#e6edf3', // primary readable text
          placeholder:    '#484f58', // muted placeholder text
          'line-highlight': '#1c2128', // hovered / active line tint
        },

        // Accent — electric indigo-blue, readable against dark backgrounds
        accent: {
          primary: '#58a6ff', // GitHub blue — links, active states
          hover:   '#79c0ff', // lighter on hover
          muted:   '#1f6feb', // darker/muted variant (subtle highlights)
        },

        // Preview pane — dark reading surface, calm contrast
        preview: {
          bg:               '#0d1117', // same depth as editor bg for continuity
          text:             '#c9d1d9', // slightly softer than editor text
          heading:          '#e6edf3', // sharp heading color
          'code-bg':        '#161b22', // inline & block code background
          'blockquote-border': '#30363d', // left border on blockquotes
        },

        // Status bar / indicators
        status: {
          warning: '#f0883e', // amber-orange — character counter over limit
        },
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },

      typography: {
        DEFAULT: {
          css: {
            color: '#c9d1d9',
            maxWidth: 'none',
            a: {
              color: '#58a6ff',
              '&:hover': { color: '#79c0ff' },
              textDecoration: 'none',
            },
            h1: { color: '#e6edf3', fontWeight: '600' },
            h2: { color: '#e6edf3', fontWeight: '600' },
            h3: { color: '#e6edf3', fontWeight: '600' },
            h4: { color: '#e6edf3', fontWeight: '600' },
            h5: { color: '#e6edf3', fontWeight: '600' },
            h6: { color: '#e6edf3', fontWeight: '600' },
            strong: { color: '#e6edf3' },
            code: {
              color: '#e6edf3',
              backgroundColor: '#161b22',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            pre: {
              backgroundColor: '#161b22',
              color: '#c9d1d9',
              borderRadius: '0.5rem',
              padding: '1rem 1.25rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
            },
            blockquote: {
              color: '#8b949e',
              borderLeftColor: '#30363d',
              fontStyle: 'normal',
            },
            hr: { borderColor: '#30363d' },
            thead: {
              borderBottomColor: '#30363d',
            },
            'tbody tr': {
              borderBottomColor: '#21262d',
            },
            'thead th': { color: '#e6edf3' },
            'ul > li::marker': { color: '#484f58' },
            'ol > li::marker': { color: '#484f58' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
