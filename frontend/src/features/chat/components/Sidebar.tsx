import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, MessageSquare, MoreHorizontal, Trash2, Edit2, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useDebounce } from '@/hooks/useDebounce'
import { getConversationTitle, cn } from '@/utils'
import type { Chat } from '@/types'

interface SidebarProps {
  chats: Chat[]
  isLoading: boolean
  activeChatId?: string
  onSelectChat: (chat: Chat) => void
  onNewChat: () => void
  onRenameChat: (id: string, newTitle: string) => Promise<void>
  onDeleteChat: (id: string) => Promise<void>
}

export function Sidebar({
  chats,
  isLoading,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
}: SidebarProps) {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  // Filter
  const filteredChats = useMemo(() => {
    if (!debouncedSearch) return chats
    const q = debouncedSearch.toLowerCase()
    return chats.filter((c) =>
      getConversationTitle(c.prompt).toLowerCase().includes(q)
    )
  }, [chats, debouncedSearch])

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] text-[#EDEDED]">
      {/* ─── Top Header ─── */}
      <div className="p-3 border-b border-[#27272A]/50">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-[6px] bg-[#111111] border border-[#27272A]/80 hover:bg-[#1A1A1A] hover:border-border transition-colors group shadow-sm"
        >
          <div className="w-5 h-5 rounded-[4px] bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 group-hover:bg-[#EDEDED] group-hover:text-[#000000] group-hover:border-[#EDEDED] transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="text-[13px] font-medium tracking-tight">New chat</span>
        </button>
      </div>

      {/* ─── Search ─── */}
      <div className="px-3 pt-4 pb-2">
        <div className="relative group">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525A] group-focus-within:text-[#EDEDED] transition-colors" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#000000] border border-[#27272A]/50 rounded-[6px] text-[13px] text-[#EDEDED] outline-none placeholder:text-[#52525A] focus:border-[#52525A] transition-colors"
          />
        </div>
      </div>

      {/* ─── Chat List ─── */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden px-2 pb-4">
        {isLoading ? (
          <div className="flex flex-col gap-1 px-1 py-2">
            {[...Array(5)].map((_, i) => (
              <div key={`skel-${i}`} className="h-8 rounded-[6px] skeleton opacity-50" />
            ))}
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="px-3 py-6 text-center">
            <p className="text-[12px] text-[#52525A]">
              {search ? 'No matches found.' : 'No conversations yet.'}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-[2px] mt-2"
          >
            <AnimatePresence initial={false}>
              {filteredChats.map((chat) => (
                <ConversationItem
                  key={chat._id || chat.tempId}
                  chat={chat}
                  isActive={chat._id === activeChatId || chat.tempId === activeChatId}
                  onSelect={() => onSelectChat(chat)}
                  onRename={(newTitle) => onRenameChat(chat._id!, newTitle)}
                  onDelete={() => onDeleteChat(chat._id!)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ─── User Footer ─── */}
      <div className="p-3 border-t border-[#27272A]/50 mt-auto">
        <Link
          to="/settings"
          className="flex items-center gap-2.5 p-2 rounded-[6px] hover:bg-[#111111] transition-colors text-[#8A8F98] hover:text-[#EDEDED]"
        >
          <div className="w-6 h-6 rounded flex items-center justify-center bg-[#222222] border border-[#333333] text-[10px] font-bold text-[#EDEDED] shadow-sm">
            {user?.userId?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="text-[13px] font-medium flex-1 truncate">
            Settings
          </span>
          <Settings className="w-3.5 h-3.5 opacity-50" />
        </Link>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Item Component
// ─────────────────────────────────────────────────────────────────────────────
interface ConversationItemProps {
  chat: Chat
  isActive: boolean
  onSelect: () => void
  onRename: (newTitle: string) => Promise<void>
  onDelete: () => Promise<void>
}

function ConversationItem({
  chat,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  
  const title = getConversationTitle(chat.prompt)
  const isOptimistic = !!chat.tempId

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditValue(title)
    setIsEditing(true)
    setMenuOpen(false)
  }

  const handleSaveEdit = async () => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== title && !isOptimistic) {
      await onRename(trimmed)
    }
    setIsEditing(false)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isOptimistic) {
      onDelete()
    }
    setMenuOpen(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {isEditing ? (
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-[#111111] border border-[#27272A]/80 shadow-sm mx-1">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit()
              if (e.key === 'Escape') setIsEditing(false)
            }}
            onBlur={handleSaveEdit}
            autoFocus
            className="flex-1 bg-transparent text-[13px] text-[#EDEDED] outline-none min-w-0"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={handleSaveEdit}
              className="p-1 rounded text-[#30A46C] hover:bg-[#30A46C]/10 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1 rounded text-[#8A8F98] hover:bg-[#222222] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={onSelect}
          className={cn(
            'flex items-center justify-between px-2.5 py-1.5 rounded-[6px] cursor-pointer text-[13px] transition-colors mx-1',
            isActive 
              ? 'bg-[#111111] text-[#EDEDED] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.5)]' 
              : 'text-[#8A8F98] hover:bg-[#111111]/50 hover:text-[#EDEDED]',
            isOptimistic && 'opacity-60 pointer-events-none'
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
            <span className="truncate">{title}</span>
          </div>

          {!isOptimistic && (
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(!menuOpen)
                }}
                className={cn(
                  'p-1 rounded text-[#8A8F98] hover:text-[#EDEDED] hover:bg-[#222222] transition-colors opacity-0 group-hover:opacity-100',
                  (isActive || menuOpen) && 'opacity-100'
                )}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen(false)
                    }}
                  />
                  <div className="absolute right-0 top-full mt-1 z-50 w-32 py-1 rounded-[8px] bg-[#111111] border border-[#27272A] shadow-dialog flex flex-col">
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[#EDEDED] hover:bg-[#1A1A1A] w-full text-left transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      Rename
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[#E5484D] hover:bg-[#E5484D]/10 w-full text-left transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
