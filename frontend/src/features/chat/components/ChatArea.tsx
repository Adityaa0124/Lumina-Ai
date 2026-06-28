import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, Sparkles } from 'lucide-react'
import { MessageBubble } from './MessageBubble'
import { PromptSuggestions } from './PromptSuggestions'
import type { Message } from '@/types'

interface ChatAreaProps {
  messages: Message[]
  isTyping: boolean
  onPromptSelect: (prompt: string) => void
  disabled?: boolean
}

export function ChatArea({ messages, isTyping, onPromptSelect, disabled }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const isEmpty = messages.length === 0

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hidden bg-[#000000] relative">
      {isEmpty ? (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#222222] to-[#111111] border border-[#2A2A2A] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                <Command className="w-6 h-6 text-[#EDEDED]" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-[#EDEDED]/5 blur-xl -z-10 scale-150" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[26px] font-semibold text-[#EDEDED] tracking-tight mb-3"
            >
              How can I help you today?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[14px] text-[#52525A] mb-10 max-w-sm leading-relaxed"
            >
              Ask anything. I'll give you clear, structured answers.
            </motion.p>

            <PromptSuggestions onSelect={onPromptSelect} disabled={disabled} />
          </motion.div>
        </div>
      ) : (
        <div className="py-10 px-4 md:px-6 max-w-3xl mx-auto flex flex-col gap-10 pb-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-[26px] h-[26px] rounded-[6px] bg-[#EDEDED] flex items-center justify-center shadow-sm">
                    <Command className="w-3.5 h-3.5 text-[#000000]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-[11px] font-medium text-[#52525A] tracking-wide uppercase">Lumina</span>
                  </div>
                  <div className="flex items-center gap-1.5 h-6">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1 h-1 rounded-full bg-[#52525A] animate-typing-dot"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
