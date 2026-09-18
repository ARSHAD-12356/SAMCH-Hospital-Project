import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  invert = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  invert?: boolean
}) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]',
            invert ? 'text-white/80' : 'text-primary',
          )}
        >
          <span className={cn('h-px w-6', invert ? 'bg-white/40' : 'bg-primary')} />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'mt-3 text-3xl font-semibold sm:text-4xl',
          invert ? 'text-white' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-pretty text-base/relaxed', invert ? 'text-white/70' : 'text-muted-foreground')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
