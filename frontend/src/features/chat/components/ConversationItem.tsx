import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Pencil, Trash2, MoreHorizontal, Check, X,
} from 'lucide-react'
import { cn, getConversationTitle, formatDate } from '@/utils'
import type { Chat } from '@/types'

interface ConversationItemProps {
  chat: Chat
  isActive: boolean
  onClick: () => void
  onRename: (newTitle: string) => void
  onDelete: () => void
}

export function ConversationItem({
  chat,
  isActive,
  onClick,
  onRename,
  onDelete,
}: ConversationItemProps) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(getConversationTitle(chat.prompt))
  const [showMenu, setShowMenu] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const startRename = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setRenameValue(getConversationTitle(chat.prompt))
    setIsRenaming(true)
    setShowMenu(false)
    setTimeout(() => inputRef.current?.select(), 10)
  }, [chat.prompt])

  const commitRename = useCallback(() => {
    const trimmed = renameValue.trim()
    if (trimmed && trimmed !== getConversationTitle(chat.prompt)) {
      onRename(trimmed)
    }
    setIsRenaming(false)
  }, [renameValue, chat.prompt, onRename])

  const cancelRename = useCallback(() => {
    setRenameValue(getConversationTitle(chat.prompt))
    setIsRenaming(false)
  }, [chat.prompt])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') commitRename()
      if (e.key === 'Escape') cancelRename()
    },
    [commitRename, cancelRename],
  )

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setShowMenu(false)
      onDelete()
    },
    [onDelete],
  )

  return (
    <div
      className={cn(
        'sidebar-item group',
        isActive && 'active',
      )}
      onClick={isRenaming ? undefined : onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => !isRenaming && e.key === 'Enter' && onClick()}
      aria-current={isActive ? 'page' : undefined}
    >
      {isRenaming ? (
        /* Rename input mode */
        <div className="flex items-center gap-1 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitRename}
            autoFocus
            className="flex-1 min-w-0 bg-transparent text-sm text-text-primary outline-none border-b border-accent py-0.5"
            maxLength={80}
          />
          <button
            type="button"
            onClick={commitRename}
            className="p-0.5 text-success hover:text-green-300 flex-shrink-0"
            aria-label="Confirm rename"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={cancelRename}
            className="p-0.5 text-text-muted hover:text-text-secondary flex-shrink-0"
            aria-label="Cancel rename"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{getConversationTitle(chat.prompt)}</p>
            <p className="text-[10px] text-text-disabled mt-0.5">{formatDate(chat.createdAt)}</p>
          </div>

          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu((v) => !v)
              }}
              aria-label="More options"
              aria-haspopup="true"
              className={cn(
                'p-1 rounded-md text-text-disabled transition-all duration-150',
                'hover:text-text-secondary hover:bg-border',
                showMenu ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
              )}
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={(e) => { e.stopPropagation(); setShowMenu(false) }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full mt-1 z-50 min-w-[130px] rounded-xl border border-border bg-surface-elevated shadow-dialog py-1 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={startRename}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Rename
                    </button>
                    <div className="h-px bg-border mx-2 my-1" />
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-destructive hover:text-destructive-hover hover:bg-destructive-muted transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  )
}
