import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Crumb = { label: string; href?: string }

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  crumbs?: Crumb[]
  className?: string
}) {
  return (
    <section className={cn('relative overflow-hidden bg-primary-deep text-primary-foreground', className)}>
      {/* decorative layers */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden
      />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-16 size-80 rounded-full bg-primary/40 blur-3xl" aria-hidden />

      <div className="container-px relative py-14 sm:py-20 animate-fade-up">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-white">
            <Home className="size-3.5" aria-hidden />
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="inline-flex items-center gap-1.5">
              <ChevronRight className="size-3.5 opacity-50" aria-hidden />
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            <span className="h-px w-6 bg-white/60" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-base/relaxed text-white/75">{description}</p>
        )}
      </div>
    </section>
  )
}
