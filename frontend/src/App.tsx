import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const LandingPage   = lazy(() => import('@/features/landing/LandingPage'))
const LoginPage     = lazy(() => import('@/features/auth/LoginPage'))
const SignupPage    = lazy(() => import('@/features/auth/SignupPage'))
const ChatPage      = lazy(() => import('@/features/chat/ChatPage'))
const SettingsPage  = lazy(() => import('@/features/settings/SettingsPage'))
const NotFoundPage  = lazy(() => import('@/pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" />
        <span className="text-xs text-text-muted font-medium tracking-wider uppercase">Loading</span>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <PageLoader />
  if (isAuthenticated) return <Navigate to="/chat" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#fafafa',
            fontSize: '13px',
          },
        }}
        richColors
      />

      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  )
}
