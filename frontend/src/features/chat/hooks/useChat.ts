import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { chatApi } from '@/services/api'
import { getErrorMessage, generateId } from '@/utils'
import type { Message, Chat } from '@/types'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  // Load a past conversation
  const loadConversation = useCallback((chat: Chat) => {
    setActiveChatId(chat._id)
    setMessages([
      {
        id: `user-${chat._id}`,
        role: 'user',
        content: chat.prompt,
        timestamp: new Date(chat.createdAt),
        chatId: chat._id,
      },
      {
        id: `ai-${chat._id}`,
        role: 'assistant',
        content: chat.response,
        timestamp: new Date(chat.updatedAt),
        chatId: chat._id,
      },
    ])
  }, [])

  // Start a new chat (clear messages)
  const newChat = useCallback(() => {
    setMessages([])
    setActiveChatId(null)
  }, [])

  // Send a message
  const sendMessage = useCallback(
    async (prompt: string, onNewChat?: (chat: Chat) => void) => {
      if (!prompt.trim() || isLoading) return

      const userMsgId = generateId()
      const aiMsgId = generateId()

      // Optimistically add user message
      setMessages((prev) => [
        ...prev,
        {
          id: userMsgId,
          role: 'user',
          content: prompt.trim(),
          timestamp: new Date(),
        },
      ])

      setIsLoading(true)

      try {
        const res = await chatApi.send(prompt.trim())
        const chat = res.data.chat

        // Append the actual response
        setMessages((prev) => [
          ...prev.map((m) =>
            m.id === userMsgId ? { ...m, chatId: chat._id } : m,
          ),
          {
            id: aiMsgId,
            role: 'assistant',
            content: chat.response,
            timestamp: new Date(chat.updatedAt),
            chatId: chat._id,
          },
        ])

        setActiveChatId(chat._id)
        onNewChat?.(chat)
      } catch (err) {
        // Remove the user message on error
        setMessages((prev) => prev.filter((m) => m.id !== userMsgId))
        toast.error(getErrorMessage(err))
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading],
  )

  return { messages, isLoading, activeChatId, sendMessage, loadConversation, newChat }
}
