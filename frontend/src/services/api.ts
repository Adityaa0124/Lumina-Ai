import axios from 'axios'
import type {
  AuthSignupResponse,
  AuthSigninResponse,
  ProfileResponse,
  ChatResponse,
  Chat,
} from '@/types'

export const TOKEN_KEY = 'ai_platform_token'
const API_URL = 'https://lumina-ai-1-intq.onrender.com'

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

let _suppressExpiry = false

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !_suppressExpiry) {
      localStorage.removeItem(TOKEN_KEY)
      window.dispatchEvent(new CustomEvent('auth:expired'))
    }
    return Promise.reject(error)
  },
)

export function suppressExpiryOnce(fn: () => Promise<unknown>) {
  _suppressExpiry = true
  return fn().finally(() => { _suppressExpiry = false })
}

export const authApi = {
  signup: (data: { username: string; email: string; password: string }) =>
    api.post<AuthSignupResponse>('/signup', data),

  signin: (data: { username: string; password: string }) =>
    api.post<AuthSigninResponse>('/signin', data),

  profile: () =>
    api.get<ProfileResponse>('/profile'),
}

export const chatApi = {
  send: (prompt: string) =>
    api.post<ChatResponse>('/chat', { prompt }),

  getHistory: () =>
    api.get<Chat[]>('/history'),

  getById: (id: string) =>
    api.get<Chat>(`/history/${id}`),

  rename: (id: string, prompt: string) =>
    api.patch<Chat>(`/history/${id}`, { prompt }),

  delete: (id: string) =>
    api.delete<{ message: string }>(`/history/${id}`),
}

export default api
