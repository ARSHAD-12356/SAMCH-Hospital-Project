import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export type Stat = { value: string; label: string; hint?: string }

export function StatGrid({
  stats,
  className,
  variant = 'card',
  columns = 3,
  invert = false,
}: {
  stats: Stat[]
  className?: string
  variant?: 'card' | 'plain'
  columns?: 2 | 3 | 4 | 6
  invert?: boolean
}) {
  const cols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }

  return (
    <div className={cn('grid gap-4 sm:gap-5', cols[columns], className)}>
      {stats.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 70}
          className={cn(
            'flex flex-col items-start rounded-2xl p-5 sm:p-6',
            variant === 'card' && !invert && 'border border-border bg-card shadow-sm transition-shadow hover:shadow-md',
            variant === 'card' && invert && 'border border-white/12 bg-white/5 backdrop-blur',
          )}
        >
          <span className={cn('font-serif text-3xl font-semibold sm:text-4xl', invert ? 'text-white' : 'text-primary')}>
            {stat.value}
          </span>
          <span className={cn('mt-2 text-sm font-medium', invert ? 'text-white' : 'text-foreground')}>{stat.label}</span>
          {stat.hint && (
            <span className={cn('mt-0.5 text-xs', invert ? 'text-white/60' : 'text-muted-foreground')}>{stat.hint}</span>
          )}
        </Reveal>
      ))}
    </div>
  )
}
