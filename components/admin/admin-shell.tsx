'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquare,
  Globe,
  LogOut,
  Menu,
  X,
  Search,
  User,
  Home,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { getStoredUser, clearAdminSession, isAuthenticated, AdminUser } from '@/lib/admin-auth'
import { cn } from '@/lib/utils'

interface AdminShellProps {
  children: React.ReactNode
  title?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function AdminShell({ children, title, breadcrumbs }: AdminShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.replace('/admin/login')
      return
    }
    setUser(getStoredUser())
  }, [router])

  const handleLogout = () => {
    clearAdminSession()
    router.replace('/admin/login')
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/admin/dashboard',
    },
    {
      label: 'Enquiries',
      href: '/admin/enquiries',
      icon: MessageSquare,
      active: pathname.startsWith('/admin/enquiries'),
    },
    {
      label: 'Blogs',
      href: '/admin/blogs',
      icon: Globe,
      active: pathname.startsWith('/admin/blogs'),
    },
  ]

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FA]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-[#005F6B]/20 border-t-[#005F6B]" />
          <p className="text-sm font-medium text-slate-500">Loading admin portal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F0F4F6] text-slate-800 antialiased font-sans">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── SIDEBAR ────────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-200/80 shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 bg-white">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#005F6B] text-white shadow-sm font-serif font-bold text-lg">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#005F6B]">SAMCH</span>
              <span className="text-[0.7rem] font-medium text-slate-500">Dept Admin</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-6">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150',
                    item.active
                      ? 'bg-[#005F6B] text-white shadow-sm shadow-[#005F6B]/25'
                      : 'text-slate-600 hover:bg-[#E5F4F6] hover:text-[#005F6B]'
                  )}
                >
                  <Icon
                    size={19}
                    className={cn(
                      'shrink-0 transition-colors',
                      item.active ? 'text-white' : 'text-slate-500 group-hover:text-[#005F6B]'
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions: Logout Only */}
          <div className="pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut size={19} className="shrink-0 text-rose-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-[#421B38] text-white px-4 sm:px-6 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>
            <span className="hidden sm:inline-block font-serif text-base font-semibold tracking-wide text-white">
              SAMCH Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input (matching visual ref) */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-md border border-white/20 bg-white/10 py-1.5 pl-9 pr-4 text-xs text-white placeholder:text-white/60 focus:bg-white focus:text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#005F6B]"
              />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-white/15">
              <div className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white font-medium text-sm">
                <User size={18} />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">
                  {user?.name || 'SAMCH Admin'}
                </span>
                <span className="text-[0.65rem] text-white/70">
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Dept Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Subheader / Breadcrumbs */}
        <div className="bg-white border-b border-slate-200/70 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/admin/dashboard" className="flex items-center gap-1 hover:text-[#005F6B] transition-colors">
              <Home size={14} className="text-slate-400" />
              <span>Home</span>
            </Link>
            {breadcrumbs && breadcrumbs.length > 0 ? (
              breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight size={13} className="text-slate-300" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#005F6B] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800 font-semibold">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
                <ChevronRight size={13} className="text-slate-300" />
                <span className="text-slate-800 font-semibold">{title || 'Dashboard'}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full font-medium">
            <ShieldCheck size={13} />
            <span className="hidden sm:inline">Authenticated</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200/60 bg-white py-3.5 px-6 text-center text-xs text-slate-500">
          © Shivam Ashoka Medical College &amp; Hospital 2026
        </footer>
      </div>
    </div>
  )
}
