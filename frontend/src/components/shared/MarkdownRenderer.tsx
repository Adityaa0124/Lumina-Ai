import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { CodeBlock } from './CodeBlock'
import { cn } from '@/utils'
import 'highlight.js/styles/github-dark.css'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('prose prose-invert prose-sm max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ className: codeClassName, children, ...props }) {
            const match = /language-(\w+)/.exec(codeClassName || '')
            const isBlock = match !== null || String(children).includes('\n')
            const codeString = String(children).replace(/\n$/, '')

            if (isBlock) {
              return (
                <CodeBlock
                  code={codeString}
                  language={match?.[1]}
                  className="my-4 not-prose"
                />
              )
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded-md bg-surface-elevated border border-border text-text-primary font-mono text-[0.85em]"
                {...props}
              >
                {children}
              </code>
            )
          },

          a({ children, href, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-hover underline underline-offset-2 hover:text-accent transition-colors"
                {...props}
              >
                {children}
              </a>
            )
          },

          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-accent pl-4 text-text-secondary italic">
                {children}
              </blockquote>
            )
          },

          table({ children }) {
            return (
              <div className="overflow-x-auto not-prose my-4">
                <table className="w-full text-sm border-collapse">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="text-left px-3 py-2 border border-border bg-surface-elevated text-text-primary font-semibold text-xs uppercase tracking-wider">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="px-3 py-2 border border-border text-text-secondary">
                {children}
              </td>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
