import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Tailwind class merge ──────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Date formatting ──────────────────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ─── Text truncation ──────────────────────────────────────────────────────────
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

// ─── Extract title from prompt ────────────────────────────────────────────────
export function getConversationTitle(prompt: string): string {
  const cleaned = prompt.replace(/\n/g, ' ').trim()
  return truncateText(cleaned, 42)
}

// ─── API error message extractor ──────────────────────────────────────────────
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } }
    return axiosError.response?.data?.message || 'Something went wrong'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred'
}

// ─── Generate a local message ID ──────────────────────────────────────────────
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// ─── Group chats by time period ───────────────────────────────────────────────
export type TimeGroup = 'Today' | 'Yesterday' | 'This Week' | 'Earlier'

export function groupChatsByTime(chats: { createdAt: string }[]): Record<TimeGroup, number[]> {
  const now = new Date()
  const groups: Record<TimeGroup, number[]> = {
    Today: [],
    Yesterday: [],
    'This Week': [],
    Earlier: [],
  }

  chats.forEach((chat, i) => {
    const d = new Date(chat.createdAt)
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) groups.Today.push(i)
    else if (diffDays === 1) groups.Yesterday.push(i)
    else if (diffDays < 7) groups['This Week'].push(i)
    else groups.Earlier.push(i)
  })

  return groups
}

// ─── Copy to clipboard ────────────────────────────────────────────────────────
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// ─── Keyboard shortcut formatter ──────────────────────────────────────────────
export function isMac(): boolean {
  return navigator.platform.toLowerCase().includes('mac')
}
