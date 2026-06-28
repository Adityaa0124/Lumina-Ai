import { cn } from '@/utils'

interface AvatarProps {
  name?: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  isAI?: boolean
}

const sizes = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({ name, src, size = 'md', className, isAI = false }: AvatarProps) {
  if (isAI) {
    return (
      <div
        className={cn(
          'rounded-full flex items-center justify-center flex-shrink-0',
          'bg-gradient-to-br from-accent to-purple-600',
          sizes[size],
          className,
        )}
        aria-label="AI assistant"
      >
        <svg width="55%" height="55%" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z"
            fill="white"
          />
        </svg>
      </div>
    )
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User'}
        className={cn('rounded-full object-cover flex-shrink-0', sizes[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0 font-semibold',
        'bg-surface-elevated border border-border text-text-secondary',
        sizes[size],
        className,
      )}
      aria-label={name || 'User'}
    >
      {name ? getInitials(name) : 'U'}
    </div>
  )
}
