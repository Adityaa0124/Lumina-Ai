import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Command, Copy, Check } from 'lucide-react'
import { cn } from '@/utils'
import type { Message } from '@/types'
import { useState } from 'react'

interface MessageBubbleProps {
  message: Message
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-[4px] text-[#52525A] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-all duration-150"
      title="Copy message"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-[#30A46C]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('group flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      {isUser ? (
        <div className="relative flex items-start gap-2 max-w-[78%]">
          <div className="px-4 py-3 rounded-[10px] rounded-tr-[3px] bg-[#141414] border border-[#2A2A2A] text-[14px] leading-[1.7] text-[#E8E8E8] select-text">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                code: ({ className, children }) => {
                  const isBlock = /language-(\w+)/.exec(className || '')
                  return !isBlock ? (
                    <code className="bg-[#1E1E1E] text-[#C9C9C9] px-1.5 py-0.5 rounded-[4px] text-[13px] font-mono border border-[#2A2A2A]">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-[#0D0D0D] p-3 rounded-[6px] border border-[#2A2A2A] overflow-x-auto my-2 text-[13px] font-mono text-[#C9C9C9] code-scroll">
                      <code className={className}>{children}</code>
                    </pre>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          <div className="self-start pt-1.5 flex-shrink-0">
            <CopyButton text={message.content} />
          </div>
        </div>
      ) : (
        <div className="flex gap-3 w-full max-w-[92%]">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-[26px] h-[26px] rounded-[6px] bg-[#EDEDED] flex items-center justify-center shadow-sm">
              <Command className="w-3.5 h-3.5 text-[#000000]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#52525A] tracking-wide uppercase">Lumina</span>
              <CopyButton text={message.content} />
            </div>
            <div className="text-[14px] leading-[1.8] text-[#C4C4C4] select-text">
              <ReactMarkdown
                components={{
                  code: ({ className, children }) => {
                    const isBlock = /language-(\w+)/.exec(className || '')
                    return !isBlock ? (
                      <code className="bg-[#161616] text-[#C9C9C9] px-1.5 py-0.5 rounded-[4px] text-[13px] font-mono border border-[#2A2A2A] mx-0.5">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-[8px] overflow-hidden my-4 shadow-sm">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E1E1E]">
                          <span className="text-[11px] text-[#52525A] font-mono">{className?.replace('language-', '') || 'code'}</span>
                        </div>
                        <div className="p-4 overflow-x-auto code-scroll">
                          <code className={cn('text-[13px] font-mono text-[#C9C9C9]', className)}>{children}</code>
                        </div>
                      </pre>
                    )
                  },
                  h1: ({ children }) => <h1 className="text-[18px] font-semibold text-[#EDEDED] mt-5 mb-3 tracking-tight">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-[16px] font-semibold text-[#EDEDED] mt-4 mb-2 tracking-tight">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-[14px] font-semibold text-[#EDEDED] mt-3 mb-1.5 tracking-tight">{children}</h3>,
                  ul: ({ children }) => <ul className="list-none pl-0 mb-4 space-y-1.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 marker:text-[#52525A]">{children}</ol>,
                  li: ({ children }) => (
                    <li className="flex gap-2 text-[#C4C4C4]">
                      <span className="mt-[0.45rem] w-1 h-1 rounded-full bg-[#52525A] flex-shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  p: ({ children }) => <p className="mb-4 last:mb-0 text-[#C4C4C4] leading-[1.8]">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-[#EDEDED]">{children}</strong>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-[#2A2A2A] pl-4 my-4 text-[#8A8F98] italic">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#EDEDED] underline decoration-[#2A2A2A] hover:decoration-[#52525A] underline-offset-4 transition-all">
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="border-0 border-t border-[#1E1E1E] my-6" />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
