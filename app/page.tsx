'use client';

import { useState, useMemo, ChangeEvent } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const defaultMarkdown = `# Welcome to Markdown Editor

Start typing in this left pane and see the rendered output on the right.

## Features

- **Live preview** - Changes appear instantly
- **Full Markdown support** - Headings, lists, code blocks, and more
- **Clean design** - Easy on the eyes

## Try it out!

### Code example:

\`\`\`javascript
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Links and Images:

[Visit GitHub](https://github.com)

---

> "The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie`;

export default function Home() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const charCount = markdown.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const htmlContent = useMemo(() => DOMPurify.sanitize(marked.parse(markdown) as string), [markdown]);

  return (
    <main>
      <header className="header">
        <span>Markdown Editor</span>
        <span className={`char-counter ${charCount > 1000 ? 'warning' : ''}`}>
          Characters: {charCount}
        </span>
      </header>
      <div className="container">
        <div className="pane editor-pane">
          <textarea
            id="markdown-input"
            className="markdown-input"
            value={markdown}
            onChange={handleChange}
            placeholder="Type your Markdown here..."
          />
        </div>
        <div className="pane preview-pane">
          <div
            id="preview"
            className="preview"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </main>
  );
}