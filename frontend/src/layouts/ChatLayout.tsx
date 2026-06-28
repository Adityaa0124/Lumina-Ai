import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface ChatLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export function ChatLayout({ children, sidebar }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden text-text-primary selection:bg-[#222222] selection:text-[#FFFFFF]">
      <aside className="hidden md:flex w-[260px] flex-shrink-0 border-r border-[#27272A]/80 bg-[#0A0A0A] flex-col">
        {sidebar}
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-[#000000]/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-[#27272A] bg-[#0A0A0A] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-end p-2 border-b border-[#27272A]/50">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-[6px] text-text-muted hover:text-text-primary hover:bg-[#1A1A1A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden flex flex-col">
                {sidebar}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col relative min-w-0 bg-[#000000] overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-3 border-b border-[#27272A]/50 bg-[#0A0A0A]">
          <span className="text-[13px] font-medium text-text-primary">Lumina</span>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-[6px] text-text-muted hover:text-text-primary hover:bg-[#1A1A1A] transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
        
        {children}
      </main>
    </div>
  )
}
