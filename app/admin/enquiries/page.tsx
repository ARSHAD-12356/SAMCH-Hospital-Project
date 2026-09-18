'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'
import { cn } from '@/lib/utils'

interface Enquiry {
  _id: string
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'resolved'
  createdAt: string
  updatedAt: string
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const url = statusFilter !== 'all' ? `/api/enquiries?status=${statusFilter}` : '/api/enquiries'
      const res = await fetch(url)
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load enquiries')
      }
      setEnquiries(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching enquiries')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchEnquiries()
  }, [fetchEnquiries])

  const handleStatusChange = async (id: string, newStatus: 'new' | 'read' | 'resolved') => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update status')
      }

      // Optimistically update local state
      setEnquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      )
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null))
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Status update failed')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredEnquiries = enquiries.filter((item) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.phone?.toLowerCase().includes(query) ||
      item.subject?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query)
    )
  })

  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            <Clock size={11} /> New
          </span>
        )
      case 'read':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            <Eye size={11} /> Read
          </span>
        )
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle size={11} /> Resolved
          </span>
        )
      default:
        return null
    }
  }

  const countsByStatus = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    read: enquiries.filter((e) => e.status === 'read').length,
    resolved: enquiries.filter((e) => e.status === 'resolved').length,
  }

  return (
    <AdminShell title="Enquiries" breadcrumbs={[{ label: 'Enquiries' }]}>
      <div className="space-y-6">
        {/* Header Title & Refresh */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Public Enquiries
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage admission queries and contact submissions from the SAMCH website.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-[#005F6B] disabled:opacity-50 transition-all w-fit"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-[#005F6B]' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Status Filters & Search Bar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Enquiries' },
              { id: 'new', label: 'New' },
              { id: 'read', label: 'Read' },
              { id: 'resolved', label: 'Resolved' },
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
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20"
            />
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
            <p className="font-semibold">Error Loading Enquiries</p>
            <p className="mt-0.5">{error}</p>
          </div>
        )}

        {/* ─── ENQUIRIES TABLE / CARD CONTAINER ──────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="size-10 animate-spin rounded-full border-4 border-[#005F6B]/20 border-t-[#005F6B]" />
              <p className="mt-3 text-xs font-medium text-slate-500">Loading enquiries...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">No Enquiries Found</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {searchQuery
                  ? `No enquiries matched "${searchQuery}". Try clearing your search filter.`
                  : 'New enquiries submitted through the public website will appear here in real time.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="border-b border-slate-200/80 bg-slate-50/80 text-[0.7rem] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3.5 pl-6 pr-4">Applicant / Sender</th>
                    <th className="px-4 py-3.5">Contact Details</th>
                    <th className="px-4 py-3.5">Subject &amp; Message</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {filteredEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className={cn(
                        'transition-colors hover:bg-slate-50/60',
                        enquiry.status === 'new' && 'bg-amber-50/20'
                      )}
                    >
                      {/* Name */}
                      <td className="py-4 pl-6 pr-4 align-top">
                        <div className="font-semibold text-slate-900 text-sm">{enquiry.name}</div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-4 py-4 align-top space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Mail size={12} className="text-slate-400 shrink-0" />
                          <a href={`mailto:${enquiry.email}`} className="hover:text-[#005F6B] hover:underline">
                            {enquiry.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Phone size={12} className="text-slate-400 shrink-0" />
                          <a href={`tel:${enquiry.phone}`} className="hover:text-[#005F6B]">
                            {enquiry.phone}
                          </a>
                        </div>
                      </td>

                      {/* Subject & Message */}
                      <td className="px-4 py-4 align-top max-w-xs">
                        {enquiry.subject && (
                          <span className="mb-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-slate-600">
                            {enquiry.subject}
                          </span>
                        )}
                        <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed">
                          {enquiry.message}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 align-top whitespace-nowrap text-slate-500 text-[0.75rem]">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {new Date(enquiry.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[0.68rem] text-slate-400">
                          {new Date(enquiry.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <select
                            value={enquiry.status}
                            disabled={updatingId === enquiry._id}
                            onChange={(e) =>
                              handleStatusChange(
                                enquiry._id,
                                e.target.value as 'new' | 'read' | 'resolved'
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white py-1 px-2.5 text-xs font-medium text-slate-700 shadow-2xs focus:border-[#005F6B] focus:outline-none focus:ring-1 focus:ring-[#005F6B]"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          {getStatusBadge(enquiry.status)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pl-4 pr-6 text-right align-top whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enquiry)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#005F6B] shadow-2xs hover:bg-[#E5F4F6] transition-colors"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ─── ENQUIRY DETAIL MODAL ─────────────────────────────────────────── */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-150 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 bg-[#005F6B] px-6 py-4 text-white">
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={20} />
                  <h3 className="font-serif font-bold text-base">Enquiry Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-lg p-1 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Applicant Name
                    </span>
                    <p className="font-semibold text-slate-800 text-base mt-0.5">
                      {selectedEnquiry.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Date Submitted
                    </span>
                    <p className="font-medium text-slate-700 mt-0.5">
                      {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Email Address
                    </span>
                    <p className="text-slate-800 mt-0.5">
                      <a
                        href={`mailto:${selectedEnquiry.email}`}
                        className="text-[#005F6B] hover:underline"
                      >
                        {selectedEnquiry.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Phone Number
                    </span>
                    <p className="text-slate-800 mt-0.5">
                      <a href={`tel:${selectedEnquiry.phone}`} className="text-[#005F6B]">
                        {selectedEnquiry.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {selectedEnquiry.subject && (
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                      Subject / Topic
                    </span>
                    <p className="font-medium text-slate-800 mt-0.5">{selectedEnquiry.subject}</p>
                  </div>
                )}

                <div>
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">
                    Message Content
                  </span>
                  <div className="mt-1.5 rounded-2xl bg-slate-50 border border-slate-200/70 p-4 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                    {selectedEnquiry.message}
                  </div>
                </div>

                {/* Status Update Buttons */}
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Update Status:</span>
                    {(['new', 'read', 'resolved'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selectedEnquiry._id, st)}
                        className={cn(
                          'rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all',
                          selectedEnquiry.status === st
                            ? 'bg-[#005F6B] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
