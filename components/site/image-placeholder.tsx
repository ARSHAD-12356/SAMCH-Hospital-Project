import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

type Ratio = 'square' | 'video' | 'portrait' | 'wide' | 'photo'

const ratioMap: Record<Ratio, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/7]',
  photo: 'aspect-[4/3]',
}

/**
 * Image container with a fixed aspect ratio.
 * Renders a labelled placeholder now; drop the real SAMCH asset in later by
 * replacing this with <img> / <Image> using the same wrapper classes.
 */
export function ImagePlaceholder({
  ratio = 'photo',
  label,
  className,
}: {
  ratio?: Ratio
  label?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-muted',
        ratioMap[ratio],
        className,
      )}
      role="img"
      aria-label={label ? `Image placeholder: ${label}` : 'Image placeholder'}
    >
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="size-7 text-primary/40" aria-hidden />
        {label && (
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  )
}
