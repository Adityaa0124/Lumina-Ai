import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSignup } from './hooks/useSignup'
import { AuthLayout } from '@/layouts/AuthLayout'
import { cn } from '@/utils'

const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const { form, onSubmit, isLoading } = useSignup()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    watch,
    formState: { errors },
  } = form

  const passwordValue = watch('password', '')

  // Linear-style minimalist password strength
  const getPasswordStrength = () => {
    if (!passwordValue) return 0
    let score = 0
    if (passwordValue.length >= 8) score++
    if (/[A-Z]/.test(passwordValue)) score++
    if (/[0-9]/.test(passwordValue)) score++
    if (/[^A-Za-z0-9]/.test(passwordValue)) score++
    return Math.min(3, score)
  }

  const strength = getPasswordStrength()

  return (
    <AuthLayout>
      <div className="flex flex-col items-center pb-12">
        <Link to="/" className="mb-8 flex items-center justify-center w-10 h-10 rounded-[8px] bg-text-primary text-background">
          <Command className="w-5 h-5" />
        </Link>

        <div className="w-full bg-surface-flat rounded-[12px] p-8 shadow-card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
          
          <div className="text-center mb-8">
            <h1 className="text-[20px] font-semibold text-text-primary tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-[13px] text-text-secondary">
              Join Wuup to start learning with AI.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">Username</label>
              <input
                {...register('username')}
                type="text"
                disabled={isLoading}
                className={cn(
                  'w-full px-3 py-2 bg-[#111111] border rounded-[6px] text-[14px] text-text-primary outline-none transition-colors duration-200',
                  'placeholder:text-text-muted focus:border-text-secondary',
                  errors.username ? 'border-[#E5484D]/50 focus:border-[#E5484D]' : 'border-border'
                )}
                placeholder="Choose a username"
              />
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF6166] text-[12px] font-medium mt-1"
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">Email</label>
              <input
                {...register('email')}
                type="email"
                disabled={isLoading}
                autoComplete="email"
                className={cn(
                  'w-full px-3 py-2 bg-[#111111] border rounded-[6px] text-[14px] text-text-primary outline-none transition-colors duration-200',
                  'placeholder:text-text-muted focus:border-text-secondary',
                  errors.email ? 'border-[#E5484D]/50 focus:border-[#E5484D]' : 'border-border'
                )}
                placeholder="name@example.com"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF6166] text-[12px] font-medium mt-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  autoComplete="new-password"
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

              {passwordValue.length > 0 && (
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3].map((lvl) => (
                    <div
                      key={lvl}
                      className={cn(
                        'h-1 flex-1 rounded-full transition-colors duration-300',
                        strength >= lvl ? 'bg-[#EDEDED]' : 'bg-[#333333]'
                      )}
                    />
                  ))}
                </div>
              )}
              
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF6166] text-[12px] font-medium mt-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-text-primary">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading}
                autoComplete="new-password"
                className={cn(
                  'w-full px-3 py-2 bg-[#111111] border rounded-[6px] text-[14px] text-text-primary outline-none transition-colors duration-200',
                  'placeholder:text-text-muted focus:border-text-secondary',
                  errors.confirmPassword ? 'border-[#E5484D]/50 focus:border-[#E5484D]' : 'border-border'
                )}
                placeholder="••••••••"
              />
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FF6166] text-[12px] font-medium mt-1"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-[#EDEDED] text-[#000000] hover:bg-[#FFFFFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 font-medium text-[14px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-[13px] text-text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-text-primary hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
