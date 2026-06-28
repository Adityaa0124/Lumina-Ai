export interface User {
  userId: string
  username?: string
  email?: string
}

export interface Chat {
  _id: string
  userId: string
  prompt: string
  response: string
  createdAt: string
  updatedAt: string
  tempId?: string
}

export interface AuthSignupResponse {
  id: string
  message: string
}

export interface AuthSigninResponse {
  message: string
  token: string
}

export interface ProfileResponse {
  message: string
  userId: string
}

export interface ChatResponse {
  message: string
  chat: Chat
}

export interface ApiError {
  message: string
  status?: number
}

export interface SignupFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface SigninFormData {
  username: string
  password: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  chatId?: string
}
