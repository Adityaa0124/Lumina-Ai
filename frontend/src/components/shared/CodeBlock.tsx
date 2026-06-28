import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn, copyToClipboard } from '@/utils'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={cn('relative group rounded-xl overflow-hidden border border-border', className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-elevated border-b border-border">
        <span className="text-xs font-mono text-text-muted font-medium tracking-wide">
          {language || 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
            'transition-all duration-200',
            copied
              ? 'text-success bg-success-muted'
              : 'text-text-muted hover:text-text-primary hover:bg-surface-hover',
          )}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto code-scroll bg-background p-4">
        <pre className="text-sm leading-relaxed">
          <code className={language ? `language-${language}` : ''}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
