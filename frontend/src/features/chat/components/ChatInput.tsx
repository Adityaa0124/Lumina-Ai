import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { ArrowUp, Square } from 'lucide-react'
import { cn } from '@/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  isTyping?: boolean
}

export function ChatInput({ onSend, disabled, isTyping }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 180)}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [input])

  // Auto-focus on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    if (input.trim() && !disabled && !isTyping) {
      onSend(input.trim())
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const canSubmit = input.trim().length > 0 && !disabled && !isTyping

  return (
    <div className="px-4 pb-5 pt-3 bg-[#000000]">
      <div className="max-w-3xl mx-auto">
        {/* Main input container */}
        <div
          className={cn(
            'relative rounded-[14px] border transition-all duration-200',
            'bg-[#0D0D0D]',
            input.length > 0
              ? 'border-[#333333] shadow-[0_0_0_1px_#333333]'
              : 'border-[#1E1E1E] hover:border-[#2A2A2A]',
          )}
        >
          {/* Top inner highlight */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[14px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Message Lumina…"
            className="w-full bg-transparent text-[14px] text-[#EDEDED] placeholder:text-[#3A3A3A] resize-none outline-none leading-[1.7] px-4 pt-3.5 pb-12 scrollbar-hidden max-h-[180px]"
            rows={1}
          />

          {/* Bottom toolbar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-3 pointer-events-none">
            <span className="text-[11px] text-[#3A3A3A] pointer-events-none select-none hidden sm:block">
              Shift + Enter for new line
            </span>

            {/* Send / Stop button */}
            <div className="pointer-events-auto ml-auto">
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.button
                    key="stop"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.12 }}
                    type="button"
                    className="w-7 h-7 rounded-[6px] bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center text-[#8A8F98] hover:bg-[#2A2A2A] hover:text-[#EDEDED] transition-colors"
                  >
                    <Square className="w-3 h-3 fill-current" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="send"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.12 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={cn(
                      'w-7 h-7 rounded-[6px] flex items-center justify-center transition-all duration-200',
                      canSubmit
                        ? 'bg-[#EDEDED] text-[#000000] hover:bg-[#FFFFFF] shadow-sm'
                        : 'bg-[#1A1A1A] text-[#3A3A3A] cursor-not-allowed'
                    )}
                  >
                    <ArrowUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <p className="text-center text-[11px] text-[#2A2A2A] mt-2.5 select-none">
          Lumina can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  )
}
