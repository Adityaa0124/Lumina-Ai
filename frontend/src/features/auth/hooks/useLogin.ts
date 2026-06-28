import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { authApi } from '@/services/api'
import { getErrorMessage } from '@/utils'
import type { SigninFormData } from '@/types'

const signinSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (data: SigninFormData) => {
    setIsLoading(true)
    try {
      const res = await authApi.signin(data)
      await login(res.data.token)
      toast.success('Welcome back!')
      navigate('/chat', { replace: true })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isLoading }
}
