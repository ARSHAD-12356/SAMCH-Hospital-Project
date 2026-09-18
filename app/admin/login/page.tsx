'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { setAdminSession, isAuthenticated } from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      const contentType = res.headers.get('content-type')
      let data: { success?: boolean; message?: string; token?: string; admin?: any } = {}

      if (contentType && contentType.includes('application/json')) {
        data = await res.json()
      } else {
        throw new Error('Server returned an unexpected error response. Please ensure dev server is restarted.')
      }

      if (!res.ok || !data.success || !data.token) {
        throw new Error(data.message || 'Invalid email or password')
      }

      setSuccess(true)
      setAdminSession(data.token, data.admin)

      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#003B42] via-[#005F6B] to-[#0A4E58] p-4 sm:p-6 md:p-8">
      {/* Top Left Back Arrow to Home */}
      <Link
        href="/"
        className="group absolute top-5 left-5 sm:top-8 sm:left-8 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#005F6B] shadow-lg shadow-black/10"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        <span>Back to Website</span>
      </Link>

      {/* Decorative background blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-96 rounded-full bg-teal-300/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/40 border border-white/20">
          {/* Header Banner */}
          <div className="bg-[#005F6B] px-8 pt-8 pb-7 text-center text-white relative">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-white/10 shadow-inner border border-white/20 backdrop-blur-xs">
              <Shield className="size-7 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
              SAMCH Admin
            </h1>
            <p className="mt-1 text-xs text-white/80 font-medium tracking-wide">
              Shivam Ashoka Medical College &amp; Hospital
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-semibold text-white/95">
              <span>Internal Management Portal</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 animate-in fade-in duration-200">
                <p className="font-semibold mb-0.5">Authentication Failed</p>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-700 animate-in fade-in duration-200">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <span>Login successful! Redirecting to dashboard...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@samchpatna.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#005F6B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#005F6B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#005F6B] py-3 text-sm font-semibold text-white shadow-md shadow-[#005F6B]/25 hover:bg-[#004B54] focus:outline-none focus:ring-2 focus:ring-[#005F6B] focus:ring-offset-2 disabled:opacity-60 transition-all"
              >
                {loading ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
