import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-md"
      >
        {/* 404 number */}
        <div className="text-[120px] font-bold leading-none gradient-text select-none mb-4">
          404
        </div>

        <h1 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">
          Page not found
        </h1>
        <p className="text-text-muted text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-border-strong bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary text-sm font-medium transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
