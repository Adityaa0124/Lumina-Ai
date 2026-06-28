import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChatLayout } from '@/layouts/ChatLayout'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { ChatInput } from './components/ChatInput'
import { PromptSuggestions } from './components/PromptSuggestions'
import { useChat } from './hooks/useChat'
import { useHistory } from './hooks/useHistory'
import type { Chat } from '@/types'

export default function ChatPage() {
  const { chats, isLoading: historyLoading, addChat, removeChat, renameChat } = useHistory()
  const {
    messages,
    isLoading: chatLoading,
    activeChatId,
    sendMessage,
    loadConversation,
    newChat,
  } = useChat()

  const handleSend = useCallback(
    (prompt: string) => {
      sendMessage(prompt, (newChatDoc: Chat) => {
        if (messages.length === 0 || !activeChatId) {
          addChat(newChatDoc)
        }
      })
    },
    [sendMessage, addChat, messages.length, activeChatId],
  )

  const handleSelectChat = useCallback(
    (chat: Chat) => {
      loadConversation(chat)
    },
    [loadConversation],
  )

  const handleNewChat = useCallback(() => {
    newChat()
  }, [newChat])

  return (
    <ChatLayout
      sidebar={
        <Sidebar
          chats={chats}
          isLoading={historyLoading}
          activeChatId={activeChatId || undefined}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onRenameChat={renameChat}
          onDeleteChat={removeChat}
        />
      }
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full overflow-hidden"
      >
        <ChatArea
          messages={messages}
          isTyping={chatLoading}
          onPromptSelect={handleSend}
          disabled={chatLoading}
        />
        <ChatInput
          onSend={handleSend}
          disabled={chatLoading}
          isTyping={chatLoading}
        />
      </motion.div>
    </ChatLayout>
  )
}
