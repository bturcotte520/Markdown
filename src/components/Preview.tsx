import { useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configure marked with GFM and line breaks enabled
marked.setOptions({
  gfm: true,
  breaks: true,
});

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse markdown to HTML (synchronous with current marked config)
  const html = useMemo(() => {
    if (!content || !content.trim()) return '';
    return marked(content) as string;
  }, [content]);

  // Apply syntax highlighting to all <pre><code> blocks after render
  useEffect(() => {
    if (!containerRef.current) return;
    const codeBlocks = containerRef.current.querySelectorAll<HTMLElement>('pre code');
    codeBlocks.forEach((block) => {
      // Skip if already highlighted
      if (!block.dataset.highlighted) {
        hljs.highlightElement(block);
      }
    });
  }, [html]);

  const isEmpty = !content || !content.trim();

  return (
    <div className="flex flex-col h-full overflow-hidden bg-preview-bg">
      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-editor-placeholder text-sm select-none">
            Preview will appear here
          </p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className={[
            'flex-1 overflow-y-auto',
            'px-8 py-6',
            'prose prose-invert',
            'max-w-none',
            'text-preview-text',
          ].join(' ')}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
