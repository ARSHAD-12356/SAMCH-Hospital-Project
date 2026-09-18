import { cn } from '@/lib/utils'
import { whatsappHref } from '@/lib/site-data'
import { MessageCircle } from 'lucide-react'

type EnquireButtonProps = {
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'primary' | 'white' | 'outline' | 'gold'
  withIcon?: boolean
  label?: string
}

/**
 * Enquire Now CTA.
 * Currently links to WhatsApp via the configurable number in lib/site-data.
 * The href is centralised so it can be swapped or extended later.
 */
export function EnquireButton({
  className,
  size = 'default',
  variant = 'primary',
  withIcon = true,
  label = 'Enquire Now',
}: EnquireButtonProps) {
  const base =
    'group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full font-medium tracking-wide transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-primary/30 active:translate-y-px'

  const variants = {
    primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-deep hover:shadow-md',
    white: 'bg-white text-primary shadow-sm hover:bg-white/95 hover:shadow-md',
    gold: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-deep hover:shadow-md',
    outline: 'border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20',
  }

  const sizes = {
    sm: 'h-9 px-3.5 sm:px-4 text-xs sm:text-[0.82rem]',
    default: 'h-10 sm:h-11 px-5 sm:px-6 text-xs sm:text-sm',
    lg: 'h-12 sm:h-13 px-6 sm:px-8 text-sm sm:text-base',
  }

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {withIcon && <MessageCircle className="size-4 transition-transform group-hover:scale-110" aria-hidden />}
      {label}
    </a>
  )
}
