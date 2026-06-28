import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { chatApi } from '@/services/api'
import { getErrorMessage } from '@/utils'
import type { Chat } from '@/types'

export function useHistory() {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchHistory = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await chatApi.getHistory()
        const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setChats(sorted)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const addChat = useCallback((chat: Chat) => {
    setChats((prev) => [chat, ...prev])
  }, [])

  const removeChat = useCallback(
    async (id: string) => {
      setChats((prev) => prev.filter((c) => c._id !== id))
      try {
        await chatApi.delete(id)
        toast.success('Conversation deleted')
      } catch (err) {
        toast.error(getErrorMessage(err))
        fetchHistory()
      }
    },
    [fetchHistory],
  )

  const renameChat = useCallback(
    async (id: string, newPrompt: string) => {
        setChats((prev) =>
        prev.map((c) => (c._id === id ? { ...c, prompt: newPrompt } : c)),
      )
      try {
        await chatApi.rename(id, newPrompt)
      } catch (err) {
        toast.error(getErrorMessage(err))
        fetchHistory()
      }
    },
    [fetchHistory],
  )

  return { chats, isLoading, addChat, removeChat, renameChat, refetch: fetchHistory }
}
