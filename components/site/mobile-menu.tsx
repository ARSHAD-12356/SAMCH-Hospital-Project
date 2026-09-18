'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Menu, X, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, site, whatsappHref } from '@/lib/site-data'
import { EnquireButton } from './enquire-button'
import { Logo } from './logo'

export function MobileMenu({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'inverted'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent background scrolling and handle Escape key when drawer is open
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={cn('xl:hidden', className)}>
      {/* Trigger Button in Navigation Bar */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className={cn(
          'flex h-8 xs:h-9 sm:h-10 items-center gap-1 xs:gap-1.5 rounded-lg px-2 xs:px-2.5 sm:px-3 transition-all active:scale-95',
          variant === 'inverted'
            ? 'border border-white/30 bg-white/15 text-white hover:bg-white/25 shadow-xs'
            : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-primary',
        )}
      >
        <Menu className="size-4 xs:size-5" aria-hidden />
        <span className="text-[11px] xs:text-xs font-semibold">Menu</span>
      </button>

      {/* Render Drawer into document.body to avoid stacking context & navbar overlap */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop Overlay */}
            <div
              onClick={() => setOpen(false)}
              className={cn(
                'fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs transition-opacity duration-300',
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
              )}
              aria-hidden
            />

            {/* Side Navigation Drawer */}
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Mobile site navigation"
              className={cn(
                'fixed inset-y-0 right-0 z-[9999] flex w-[88%] xs:w-[85%] max-w-[380px] flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                open ? 'translate-x-0' : 'translate-x-full',
              )}
            >
              {/* TOP BAR: Logo + Clear Visible Close (X) Button */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-3.5 py-3 xs:px-5 xs:py-4">
                <Logo invert size="sm" className="max-w-[70%]" />

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex size-8 xs:size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
                >
                  <X className="size-4 xs:size-5 stroke-[2.5]" aria-hidden />
                </button>
              </div>

              {/* NAVIGATION LINKS */}
              <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto px-3 xs:px-4 py-3 xs:py-4 space-y-1">
                {navigation.map((item) => {
                  if (!item.children) {
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.label}
                        href={item.href!}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2.5 xs:px-3.5 xs:py-3 text-sm xs:text-[0.95rem] font-medium transition-colors',
                          active
                            ? 'bg-primary/10 font-bold text-primary'
                            : 'text-slate-800 hover:bg-slate-100 hover:text-primary',
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  }

                  const isOpen = expanded === item.label
                  const hasActiveChild = item.children.some((c) => pathname === c.href)

                  return (
                    <div key={item.label} className="border-b border-slate-100 last:border-0 pb-1">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className={cn(
                          'flex w-full items-center justify-between rounded-xl px-3 py-2.5 xs:px-3.5 xs:py-3 text-sm xs:text-[0.95rem] font-medium transition-colors',
                          hasActiveChild ? 'font-semibold text-primary' : 'text-slate-800 hover:bg-slate-100',
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'size-4 text-slate-400 transition-transform duration-200',
                            isOpen && 'rotate-180 text-primary',
                          )}
                          aria-hidden
                        />
                      </button>

                      <div
                        className={cn(
                          'grid overflow-hidden transition-all duration-300',
                          isOpen ? 'grid-rows-[1fr] pb-2' : 'grid-rows-[0fr]',
                        )}
                      >
                        <div className="min-h-0 space-y-1 pl-2">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                  'flex items-center gap-2 rounded-lg py-2 pl-4 pr-2 text-xs xs:text-sm transition-colors',
                                  isChildActive
                                    ? 'bg-primary/10 font-semibold text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary',
                                )}
                              >
                                <span className={cn('size-1.5 rounded-full', isChildActive ? 'bg-primary' : 'bg-slate-300')} />
                                <span>{child.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </nav>

              {/* BOTTOM ACTIONS: CTAs & Contact Details */}
              <div className="border-t border-slate-200 bg-slate-50/70 p-3.5 xs:p-5 space-y-2">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 xs:h-11 w-full items-center justify-center gap-2 rounded-full bg-[#005F6B] text-xs xs:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#00434C] active:scale-95"
                >
                  <MessageCircle className="size-4" />
                  <span>Enquire Now (WhatsApp)</span>
                </a>

                <Link
                  href="/admin/login"
                  onClick={() => setOpen(false)}
                  className="flex h-10 xs:h-11 w-full items-center justify-center rounded-full border border-primary/30 bg-white text-xs xs:text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white shadow-2xs active:scale-95"
                >
                  Admin Login
                </Link>

                <div className="mt-2 pt-1.5 text-center text-[11px] xs:text-xs text-slate-500">
                  <p className="font-medium text-slate-700">{site.location}</p>
                  <p className="mt-0.5">{site.phonePlaceholder}</p>
                </div>
              </div>
            </aside>
          </>,
          document.body,
        )}
    </div>
  )
}
