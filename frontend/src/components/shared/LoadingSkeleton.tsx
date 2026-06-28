import { cn } from '@/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} />
}

export function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-3xl mx-auto w-full">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-64 rounded-2xl" />
      </div>

      <div className="flex gap-3">
        <Skeleton className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5" />
        <div className="flex-1 flex flex-col gap-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-full mt-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-1 px-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full rounded-lg" />
      ))}
    </div>
  )
}
