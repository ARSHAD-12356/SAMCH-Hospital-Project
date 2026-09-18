'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Mail, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, site } from '@/lib/site-data'
import { EnquireButton } from './enquire-button'
import { MobileMenu } from './mobile-menu'
import { Logo } from './logo'

export function SiteHeader() {
  const [atTop, setAtTop] = useState(true)
  const [openItem, setOpenItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isTop = window.scrollY <= 15
          setAtTop((prev) => (prev !== isTop ? isTop : prev))
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenItem(null)
  }, [pathname])

  const isActive = (href?: string) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isVisible = atTop || openItem !== null

  // Do not render public header on admin portal pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ROW 1 — BRANDING / INSTITUTION BAR (Always Constant & Fixed at Top) */}
      <div className="relative z-20 w-full bg-primary text-white shadow-sm">
        <div className="container-px flex min-h-[60px] sm:min-h-[70px] items-center justify-between gap-3 sm:gap-4 lg:gap-8 py-2">
          {/* LEFT SIDE: Actual Logo + Institution Name */}
          <Logo />

          {/* RIGHT SIDE (Mobile & Tablet): Compact actions & Menu trigger so Row 1 remains fully functional when Row 2 hides */}
          <div className="flex items-center gap-2 xl:hidden shrink-0">
            <a
              href="tel:+919031855501"
              aria-label="Call SAMCH"
              className="flex size-8 xs:size-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Phone className="size-3.5 xs:size-4" aria-hidden />
            </a>
            <MobileMenu variant="inverted" />
          </div>

          {/* RIGHT SIDE (Desktop): Quick contact & badges */}
          <div className="ml-auto hidden items-center gap-4 text-[0.72rem] text-white/90 xl:flex shrink-0 pl-5 border-l border-white/20">
            <a
              href="tel:+919031855501"
              className="inline-flex items-center gap-1.5 opacity-95 transition-opacity hover:opacity-100"
            >
              <Phone className="size-3.5 text-white/80" aria-hidden />
              <span>+91 9031855501</span>
            </a>

            <a
              href="https://wa.me/919031855502"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 opacity-95 transition-opacity hover:opacity-100"
            >
              <MessageCircle className="size-3.5 text-emerald-300 fill-emerald-300/20" aria-hidden />
              <span>+91 9031855502</span>
            </a>

            <a
              href="mailto:hrsamchpatna@gmail.com"
              className="inline-flex items-center gap-1.5 opacity-95 transition-opacity hover:opacity-100"
            >
              <Mail className="size-3.5 text-white/80" aria-hidden />
              <span>hrsamchpatna@gmail.com</span>
            </a>

            <Link
              href="/admissions"
              className="rounded-full bg-white/20 px-3 py-1 font-medium text-white transition-colors hover:bg-white/30"
            >
              Admissions Open
            </Link>
          </div>
        </div>
      </div>

      {/* ROW 2 — MAIN NAVIGATION (Smooth Grid-Row Collapse on Scroll Down, Expand on Scroll Up) */}
      <div
        className={cn(
          'relative z-10 grid border-b border-border/70 bg-white text-foreground transition-[grid-template-rows,opacity] duration-300 ease-in-out',
          isVisible
            ? 'grid-rows-[1fr] opacity-100 shadow-md'
            : 'grid-rows-[0fr] opacity-0 border-b-0 pointer-events-none',
        )}
      >
        <div className={cn('min-h-0', isVisible ? 'overflow-visible' : 'overflow-hidden')}>
          <div className="container-px flex h-14 sm:h-15 lg:h-14 items-center justify-between gap-3 sm:gap-4 py-1.5">
            {/* Desktop Nav (No logo, no company name in this row) */}
            <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
              {navigation.map((item) => {
                const active = isActive(item.href) || item.children?.some((c) => isActive(c.href))
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      className={cn(
                        'relative rounded-lg px-3 py-2 text-[0.88rem] font-medium text-foreground/80 transition-colors hover:bg-secondary/60 hover:text-primary',
                        active && 'font-semibold text-primary',
                      )}
                    >
                      {item.label}
                      {active && <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary" />}
                    </Link>
                  )
                }
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenItem(item.label)}
                    onMouseLeave={() => setOpenItem(null)}
                  >
                    <button
                      type="button"
                      aria-expanded={openItem === item.label}
                      aria-haspopup="menu"
                      onClick={() => setOpenItem((v) => (v === item.label ? null : item.label))}
                      className={cn(
                        'relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.88rem] font-medium text-foreground/80 transition-colors hover:bg-secondary/60 hover:text-primary',
                        active && 'font-semibold text-primary',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn('size-3.5 transition-transform duration-200', openItem === item.label && 'rotate-180')}
                        aria-hidden
                      />
                      {active && <span className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary" />}
                    </button>

                    <div
                      role="menu"
                      className={cn(
                        'absolute left-0 top-full w-72 pt-2 transition-all duration-200',
                        openItem === item.label
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-1 opacity-0',
                      )}
                    >
                      <div className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-xl shadow-primary/5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                          >
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary transition-transform group-hover:scale-125" />
                            <span>
                              <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="mt-0.5 block text-xs text-muted-foreground">{child.description}</span>
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </nav>

            {/* Mobile / Tablet Left navigation trigger */}
            <div className="flex items-center gap-2 xl:hidden">
              <MobileMenu />
            </div>

            {/* RIGHT SIDE: Admin Login + Enquire Now CTA */}
            <div className="ml-auto flex items-center gap-1.5 xs:gap-2 sm:gap-3">
              <Link
                href="/admin/login"
                id="header-admin-login-cta"
                className="inline-flex h-8 xs:h-9 sm:h-10 items-center justify-center rounded-full border border-primary/40 bg-secondary/80 px-2 xs:px-3 sm:px-4 text-[0.68rem] xs:text-xs sm:text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary shadow-2xs whitespace-nowrap"
              >
                <span>Admin Login</span>
              </Link>

              <EnquireButton
                variant="primary"
                size="sm"
                className="h-8 xs:h-9 sm:h-10 px-2.5 xs:px-3.5 sm:px-4 shrink-0 whitespace-nowrap text-[0.68rem] xs:text-xs sm:text-sm font-semibold shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
