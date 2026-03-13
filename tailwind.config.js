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
    },
  },
  plugins: [],
};
