import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  invert?: boolean
  size?: 'sm' | 'default' | 'lg'
}

/**
 * SAMCH official logo + institution name header and footer branding.
 */
export function Logo({ className, invert = false, size = 'default' }: LogoProps) {
  const iconSizes = {
    sm: 'size-7 xs:size-9',
    default: 'size-8 xs:size-10 sm:size-11',
    lg: 'size-12 xs:size-14 sm:size-16',
  }

  const titleSizes = {
    sm: 'text-[0.58rem] xs:text-[0.68rem] sm:text-sm font-bold',
    default: 'text-[0.56rem] xs:text-[0.72rem] sm:text-sm md:text-base font-bold',
    lg: 'text-xs xs:text-[0.95rem] sm:text-base md:text-lg font-bold',
  }

  const subSizes = {
    sm: 'text-[0.42rem] xs:text-[0.48rem] sm:text-[0.6rem]',
    default: 'text-[0.42rem] xs:text-[0.5rem] sm:text-[0.62rem]',
    lg: 'text-[0.5rem] xs:text-[0.58rem] sm:text-[0.7rem]',
  }

  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-2 xs:gap-3 sm:gap-4 shrink-0 max-w-full', className)}
      aria-label="SAMCH — Home"
    >
      {/* Logo Emblem Icon */}
      <div
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl p-1.5 shadow-md transition-transform duration-300 group-hover:scale-105',
          iconSizes[size],
          invert ? 'bg-primary/10 border border-primary/20' : 'bg-white border border-white/20',
        )}
      >
        <Image
          src="/assets/samch-logo.jpeg"
          alt="SAMCH Official Logo"
          width={180}
          height={180}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {/* Brand Text Block */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={cn(
            'font-serif leading-[1.2] tracking-[0.015em] transition-colors',
            titleSizes[size],
            invert ? 'text-slate-900' : 'text-white',
          )}
        >
          <span className="whitespace-nowrap">SHIVAM ASHOKA MEDICAL COLLEGE &amp;</span>{' '}
          <span className="whitespace-nowrap">HOSPITAL</span>
        </span>
        <span
          className={cn(
            'mt-0.5 font-semibold uppercase tracking-wider transition-colors',
            subSizes[size],
            invert ? 'text-slate-600' : 'text-white/85',
          )}
        >
          Belchi, Patna Bihar · Medical Education &amp; Hospital
        </span>
      </div>
    </Link>
  )
}




