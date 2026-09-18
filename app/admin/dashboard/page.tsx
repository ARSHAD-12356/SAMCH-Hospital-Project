'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Globe, ArrowRight, RefreshCw, Plus, Eye, Clock, CheckCircle } from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'

interface DashboardCounts {
  totalEnquiries: number
  newEnquiries: number
  publishedBlogs: number
  totalBlogs: number
  draftBlogs: number
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<DashboardCounts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchCounts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/dashboard/counts')
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load dashboard data')
      }
      setCounts(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching counts')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <AdminShell title="Dashboard" breadcrumbs={[{ label: 'Dashboard' }]}>
      <div className="space-y-8">
        {/* Welcome & Refresh Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Real-time metrics from SAMCH MongoDB database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchCounts(true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-[#005F6B] disabled:opacity-50 transition-all"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin text-[#005F6B]' : ''} />
              <span>{refreshing ? 'Syncing...' : 'Refresh Data'}</span>
            </button>

            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#005F6B] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#004B54] transition-all"
            >
              <Plus size={15} />
              <span>Add New Blog</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
            <p className="font-semibold">Unable to fetch dashboard statistics</p>
            <p className="mt-0.5">{error}</p>
          </div>
        )}

        {/* ─── EXACTLY TWO MAIN SUMMARY CARDS ─────────────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* CARD 1: Total Enquiries */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#005F6B]/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Contact &amp; Admissions
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {loading ? (
                      <span className="inline-block h-9 w-16 animate-pulse rounded bg-slate-200" />
                    ) : (
                      counts?.totalEnquiries ?? 0
                    )}
                  </h2>
                  <span className="text-base font-medium text-slate-600">Total Enquiries</span>
                </div>
              </div>

              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                <MessageSquare className="size-7" />
              </div>
            </div>

            {/* Sub-stat badge */}
            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-semibold text-amber-700 border border-amber-200/50">
                <Clock size={11} />
                {counts?.newEnquiries ?? 0} New
              </span>
              <span>awaiting admin review</span>
            </div>

            {/* View All Link */}
            <div className="mt-4 pt-2">
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors group-hover:translate-x-0.5"
              >
                <span>View All</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* CARD 2: Total Blogs */}
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#005F6B]/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Articles &amp; News
                </p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {loading ? (
                      <span className="inline-block h-9 w-16 animate-pulse rounded bg-slate-200" />
                    ) : (
                      counts?.totalBlogs ?? 0
                    )}
                  </h2>
                  <span className="text-base font-medium text-slate-600">Total Blogs</span>
                </div>
              </div>

              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-[#005F6B] border border-teal-100 group-hover:scale-105 transition-transform">
                <Globe className="size-7" />
              </div>
            </div>

            {/* Sub-stat badge */}
            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 border border-emerald-200/50">
                <CheckCircle size={11} />
                {counts?.publishedBlogs ?? 0} Published
              </span>
              <span>• {counts?.draftBlogs ?? 0} Drafts</span>
            </div>

            {/* View All Link */}
            <div className="mt-4 pt-2">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005F6B] hover:text-[#004B54] transition-colors group-hover:translate-x-0.5"
              >
                <span>View All</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ─── QUICK NAVIGATION TILES ───────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Management Actions</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-[#005F6B]/30 hover:bg-[#EAF6F8] transition-all"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#005F6B] text-white">
                <Plus size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Create New Blog Post</p>
                <p className="text-[0.7rem] text-slate-500">Publish articles or campus news</p>
              </div>
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-rose-200 hover:bg-rose-50/50 transition-all"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-rose-600 text-white">
                <MessageSquare size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Review Inquiries</p>
                <p className="text-[0.7rem] text-slate-500">View and update enquiry status</p>
              </div>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 hover:border-teal-200 hover:bg-teal-50/50 transition-all sm:col-span-2 lg:col-span-1"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-teal-700 text-white">
                <Eye size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Manage Blog Posts</p>
                <p className="text-[0.7rem] text-slate-500">Edit, activate, or remove blogs</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
