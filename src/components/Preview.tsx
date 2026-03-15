import { useMemo } from 'react'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
  })
)

marked.setOptions({
  breaks: true,
  gfm: true,
})

interface PreviewProps {
  value: string
}

export default function Preview({ value }: PreviewProps) {
  const html = useMemo(() => marked(value) as string, [value])

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'var(--bg-surface)' }}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
