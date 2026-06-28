import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLogin } from './hooks/useLogin'
import { AuthLayout } from '@/layouts/AuthLayout'
import { cn } from '@/utils'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLogin()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
  } = form

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center w-10 h-10 rounded-[8px] bg-text-primary text-background">
          <Command className="w-5 h-5" />
        </Link>

        {/* Form Card */}
        <div className="w-full bg-surface-flat rounded-[12px] p-8 shadow-card relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
          
          <div className="text-center mb-8">
            <h1 className="text-[20px] font-semibold text-text-primary tracking-tight mb-2">
              Log in to Lumina
            </h1>
            <p className="text-[13px] text-text-secondary">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">

            {/* Username */}
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-text-primary">Username</label>
              <div className="relative">
                <input
                  {...register('username')}
                  type="text"
                  disabled={isLoading}
                  autoComplete="username"
                  className={cn(
                    'w-full px-3 py-2 bg-[#111111] border rounded-[6px] text-[14px] text-text-primary outline-none transition-colors duration-200',
                    'placeholder:text-text-muted focus:border-text-secondary',
                    errors.username ? 'border-[#E5484D]/50 focus:border-[#E5484D]' : 'border-border'
                  )}
                  placeholder="Enter your username"
                />
              </div>
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF6166] text-[12px] font-medium"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-medium text-text-primary">Password</label>
                <Link to="#" className="text-[12px] text-text-secondary hover:text-text-primary transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={cn(
                    'w-full pl-3 pr-10 py-2 bg-[#111111] border rounded-[6px] text-[14px] text-text-primary outline-none transition-colors duration-200',
                    'placeholder:text-text-muted focus:border-text-secondary',
                    errors.password ? 'border-[#E5484D]/50 focus:border-[#E5484D]' : 'border-border'
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF6166] text-[12px] font-medium"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#EDEDED] text-[#000000] hover:bg-[#FFFFFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 font-medium text-[14px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Log in
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[13px] text-text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
