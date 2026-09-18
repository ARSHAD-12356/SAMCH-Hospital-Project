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
    sm: 'size-8 xs:size-9 sm:size-10',
    default: 'size-10 xs:size-12 sm:size-14 md:size-[3.75rem] lg:size-[4.15rem]',
    lg: 'size-14 xs:size-16 sm:size-20',
  }

  const titleSizes = {
    sm: 'text-[0.62rem] xs:text-[0.75rem] sm:text-sm font-bold',
    default: 'text-[0.6rem] xs:text-[0.82rem] sm:text-[1.02rem] md:text-[1.16rem] lg:text-[1.26rem] font-bold tracking-[0.02em] md:tracking-[0.03em] xl:tracking-[0.04em]',
    lg: 'text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-wide',
  }

  const subSizes = {
    sm: 'text-[0.42rem] xs:text-[0.52rem] sm:text-[0.64rem]',
    default: 'text-[0.44rem] xs:text-[0.58rem] sm:text-[0.7rem] md:text-[0.76rem] lg:text-[0.82rem] tracking-[0.04em] lg:tracking-[0.06em]',
    lg: 'text-[0.55rem] xs:text-[0.65rem] sm:text-[0.78rem]',
  }

  return (
    <Link
      href="/"
      className={cn('group inline-flex items-center gap-1.5 xs:gap-2.5 sm:gap-4 shrink-0 max-w-full', className)}
      aria-label="SAMCH — Home"
    >
      {/* Logo Emblem Icon */}
      <div
        className={cn(
          'relative flex shrink-0 self-center items-center justify-center overflow-hidden rounded-none p-1 shadow-md transition-transform duration-300 group-hover:scale-105',
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
            'font-serif leading-[1.18] transition-colors',
            titleSizes[size],
            invert ? 'text-slate-900' : 'text-white',
          )}
        >
          <span className="whitespace-normal xs:whitespace-nowrap">SHIVAM ASHOKA MEDICAL COLLEGE &amp;</span>{' '}
          <span className="whitespace-normal xs:whitespace-nowrap">HOSPITAL</span>
        </span>
        <span
          className={cn(
            'mt-0.5 font-semibold uppercase leading-tight transition-colors',
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




