'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Globe,
  Plus,
  Search,
  RefreshCw,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  CheckCircle,
  FileText,
  AlertCircle,
  Eye,
  Archive,
} from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { cn } from '@/lib/utils'

interface Blog {
  _id: string
  type: string
  category: string
  hindiTitle?: string
  englishTitle: string
  description: string
  image: string
  city?: string
  author?: string
  status: 'published' | 'draft' | 'inactive'
  tags?: string[]
  metaTitle?: string
  metaTag?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<Blog | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/blogs?admin=1&limit=100')
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load blogs')
      }
      setBlogs(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching blogs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete blog')
      }
      setBlogs((prev) => prev.filter((b) => b._id !== id))
      setShowDeleteModal(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const handleStatusToggle = async (id: string, newStatus: 'published' | 'draft' | 'inactive') => {
    setUpdatingStatusId(id)
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update status')
      }
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Status update failed')
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !query ||
      blog.englishTitle?.toLowerCase().includes(query) ||
      blog.hindiTitle?.toLowerCase().includes(query) ||
      blog.category?.toLowerCase().includes(query) ||
      blog.type?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === 'all' || blog.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Blog['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle size={11} /> Published
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            <FileText size={11} /> Draft
          </span>
        )
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-300">
            <Archive size={11} /> Inactive
          </span>
        )
      default:
        return null
    }
  }

  return (
    <AdminShell title="Blogs" breadcrumbs={[{ label: 'Blogs' }]}>
      <div className="space-y-6">
        {/* Header & Add Button */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Blog Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, edit, and publish blogs and articles for the SAMCH website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchBlogs}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-[#005F6B] disabled:opacity-50 transition-all"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-[#005F6B]' : ''} />
              <span>Refresh</span>
            </button>

            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#005F6B] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#004B54] transition-all"
            >
              <Plus size={16} />
              <span>Add New Blog</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Blogs' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' },
              { id: 'inactive', label: 'Inactive' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all',
                  statusFilter === tab.id
                    ? 'bg-[#005F6B] text-white shadow-xs'
                    : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, category, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20"
            />
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
            <p className="font-semibold">Error Loading Blogs</p>
            <p className="mt-0.5">{error}</p>
          </div>
        )}

        {/* ─── BLOGS LIST TABLE ──────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-10 animate-spin rounded-full border-4 border-[#005F6B]/20 border-t-[#005F6B]" />
              <p className="mt-3 text-xs font-medium text-slate-500">Loading blogs from database...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                <Globe size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Blogs Found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mb-4">
                {searchQuery
                  ? `No blogs match "${searchQuery}". Try clearing search filter.`
                  : 'Start by creating your first blog article for SAMCH.'}
              </p>
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#005F6B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#004B54] transition-colors"
              >
                <Plus size={15} />
                <span>Create New Blog</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200/80 bg-slate-50/80 text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3.5 pl-6 pr-3">Blog</th>
                    <th className="px-3 py-3.5">Category &amp; Type</th>
                    <th className="px-3 py-3.5">Author</th>
                    <th className="px-3 py-3.5">Status</th>
                    <th className="px-3 py-3.5">Created Date</th>
                    <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="transition-colors hover:bg-slate-50/60">
                      {/* Blog Image & Title */}
                      <td className="py-4 pl-6 pr-3 align-top max-w-sm">
                        <div className="flex items-start gap-3">
                          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                            {blog.image ? (
                              <Image
                                src={blog.image}
                                alt={blog.englishTitle}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <Globe size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                              {blog.englishTitle}
                            </h4>
                            {blog.hindiTitle && (
                              <p className="mt-0.5 text-xs text-slate-500 font-hindi">
                                {blog.hindiTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category & Type */}
                      <td className="px-3 py-4 align-top whitespace-nowrap">
                        <span className="inline-block rounded-md bg-[#005F6B]/10 px-2 py-0.5 text-xs font-semibold text-[#005F6B]">
                          {blog.category}
                        </span>
                        <div className="mt-1 text-[0.68rem] text-slate-500">{blog.type}</div>
                      </td>

                      {/* Author */}
                      <td className="px-3 py-4 align-top whitespace-nowrap text-slate-600">
                        <div className="flex items-center gap-1 font-medium">
                          <User size={12} className="text-slate-400 shrink-0" />
                          <span>{blog.author || 'SAMCH Editorial'}</span>
                        </div>
                        {blog.city && <div className="text-[0.68rem] text-slate-400">{blog.city}</div>}
                      </td>

                      {/* Status + Quick toggle */}
                      <td className="px-3 py-4 align-top whitespace-nowrap">
                        <div className="space-y-1.5">
                          <div>{getStatusBadge(blog.status)}</div>
                          <select
                            value={blog.status}
                            disabled={updatingStatusId === blog._id}
                            onChange={(e) =>
                              handleStatusToggle(
                                blog._id,
                                e.target.value as 'published' | 'draft' | 'inactive'
                              )
                            }
                            className="rounded border border-slate-200 bg-white py-0.5 px-2 text-[0.68rem] font-medium text-slate-700 shadow-2xs focus:border-[#005F6B] focus:outline-none"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </td>

                      {/* Created Date */}
                      <td className="px-3 py-4 align-top whitespace-nowrap text-slate-500 text-[0.75rem]">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-3 pr-6 text-right align-top whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blogs/${blog._id}/edit`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:border-[#005F6B] hover:text-[#005F6B] transition-colors"
                          >
                            <Edit size={13} />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setShowDeleteModal(blog)}
                            className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 shadow-2xs hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ─── DELETE CONFIRMATION MODAL ─────────────────────────────────────── */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100 p-6 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
                <Trash2 size={26} />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Delete Blog Post?</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-slate-900">
                  &ldquo;{showDeleteModal.englishTitle}&rdquo;
                </span>
                ? This will remove it from MongoDB and it will no longer be visible on the public website.
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deletingId === showDeleteModal._id}
                  onClick={() => handleDelete(showDeleteModal._id)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50 transition-colors"
                >
                  {deletingId === showDeleteModal._id ? (
                    <span>Deleting...</span>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      <span>Confirm Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
