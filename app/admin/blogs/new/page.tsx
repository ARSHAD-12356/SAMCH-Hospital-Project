'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  UploadCloud,
  X,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
} from 'lucide-react'
import { AdminShell } from '@/components/admin/admin-shell'

const BLOG_TYPES = [
  'General',
  'Health Tips',
  'Campus News',
  'Medical Research',
  'Academic Updates',
  'Hospital Highlights',
  'Event & Workshop',
]

const BLOG_CATEGORIES = [
  'Health Tips',
  'Campus News',
  'Research',
  'Academics',
  'Hospital Services',
  'Faculty & Clinical',
  'Admissions & Guidance',
]

export default function AddBlogPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form State
  const [formData, setFormData] = useState({
    type: 'Health Tips',
    category: 'Health Tips',
    hindiTitle: '',
    englishTitle: '',
    description: '',
    image: '',
    city: 'Patna',
    author: 'SAMCH Editorial',
    status: 'published' as 'published' | 'draft' | 'inactive',
    tags: '',
    metaTitle: '',
    metaTag: '',
    metaDescription: '',
  })

  // Upload & submission states
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle Image Upload to /api/upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError(null)

    try {
      const uploadData = new FormData()
      uploadData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload image')
      }

      setFormData((prev) => ({ ...prev, image: data.url }))
      setImagePreview(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }))
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Form formatting toolbar helper for description
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('blog-description') as HTMLTextAreaElement
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)
    const replacement = `${prefix}${selected || 'text'}${suffix}`
    const newText = text.substring(0, start) + replacement + text.substring(end)

    setFormData((prev) => ({ ...prev, description: newText }))
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 50)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!formData.type.trim()) {
      setError('Blog type is required.')
      return
    }
    if (!formData.category.trim()) {
      setError('Category is required.')
      return
    }
    if (!formData.englishTitle.trim()) {
      setError('English title is required.')
      return
    }
    if (!formData.description.trim()) {
      setError('Blog description / content is required.')
      return
    }
    if (!formData.image.trim()) {
      setError('Please upload a blog image.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        type: formData.type.trim(),
        category: formData.category.trim(),
        hindiTitle: formData.hindiTitle.trim(),
        englishTitle: formData.englishTitle.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        city: formData.city.trim(),
        author: formData.author.trim(),
        status: formData.status,
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        metaTitle: formData.metaTitle.trim(),
        metaTag: formData.metaTag.trim(),
        metaDescription: formData.metaDescription.trim(),
      }

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save blog')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/blogs')
      }, 800)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating blog post')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminShell title="Add Blog" breadcrumbs={[{ label: 'Blogs', href: '/admin/blogs' }, { label: 'Add Blog' }]}>
      <div className="space-y-6">
        {/* Top Header Row matching screenshot */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Add Blog
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create and publish a new article to the SAMCH medical website.
            </p>
          </div>

          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 rounded-xl bg-[#421B38] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#32142a] transition-colors w-fit"
          >
            <ArrowLeft size={15} />
            <span>Blog List</span>
          </Link>
        </div>

        {/* Notifications */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 animate-in fade-in">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to Save Blog</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-700 animate-in fade-in">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            <span>Blog created successfully! Redirecting to blog list...</span>
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Type & Category */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Type <span className="text-rose-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                >
                  <option value="">Select Type</option>
                  {BLOG_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                >
                  <option value="">Select Category</option>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Hindi Title */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Title (Hindi)
              </label>
              <input
                type="text"
                name="hindiTitle"
                value={formData.hindiTitle}
                onChange={handleInputChange}
                placeholder="Enter Hindi Title (optional)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
              />
            </div>

            {/* Row 3: English Title */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                English Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="englishTitle"
                value={formData.englishTitle}
                onChange={handleInputChange}
                required
                placeholder="Enter English Title"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
              />
            </div>

            {/* Row 4: Description / Blog Content with formatting toolbar */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Description / Blog Content <span className="text-rose-500">*</span>
              </label>

              {/* Formatting Toolbar */}
              <div className="flex flex-wrap items-center gap-1 rounded-t-xl border border-b-0 border-slate-200 bg-slate-100/80 px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  title="Bold"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <Bold size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  title="Italic"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <Italic size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('<u>', '</u>')}
                  title="Underline"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <Underline size={14} />
                </button>
                <span className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertFormatting('\n- ')}
                  title="Bullet List"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <List size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n1. ')}
                  title="Numbered List"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <ListOrdered size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('\n> ')}
                  title="Quote"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <Quote size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('`', '`')}
                  title="Code snippet"
                  className="rounded p-1.5 text-slate-600 hover:bg-white hover:text-slate-900"
                >
                  <Code size={14} />
                </button>
              </div>

              <textarea
                id="blog-description"
                name="description"
                rows={7}
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Write the full blog article content here..."
                className="w-full rounded-b-xl border border-slate-200 bg-slate-50/50 p-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all font-sans leading-relaxed resize-y"
              />
            </div>

            {/* Row 5: Image Upload */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Blog Image <span className="text-rose-500">*</span>
                </label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="blog-image-input"
                    />
                    <label
                      htmlFor="blog-image-input"
                      className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#005F6B] transition-colors"
                    >
                      <UploadCloud size={16} />
                      <span>{imagePreview ? 'Replace Image' : 'Choose File'}</span>
                    </label>

                    {uploadingImage && (
                      <div className="flex items-center gap-2 text-xs text-[#005F6B]">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    )}
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative mt-2 size-32 overflow-hidden rounded-2xl border-2 border-[#005F6B]/30 shadow-xs group">
                      <Image
                        src={imagePreview}
                        alt="Blog preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1.5 right-1.5 rounded-full bg-rose-600 p-1 text-white shadow-md hover:bg-rose-700 transition-colors"
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Or enter permanent image URL /uploads/..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Patna, Bihar"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                />
              </div>
            </div>

            {/* Row 6: Author & Status */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Pankaj Arora / SAMCH Editorial"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Status <span className="text-rose-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all font-semibold"
                >
                  <option value="published">Published (Visible on public website)</option>
                  <option value="draft">Draft (Work in progress, hidden publicly)</option>
                  <option value="inactive">Inactive (Disabled / Archived)</option>
                </select>
              </div>
            </div>

            {/* Row 7: Tags */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">
                Tags <span className="text-[0.68rem] font-normal text-slate-400">(comma separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Health, Cardiology, Medical Education, OPD"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none focus:ring-2 focus:ring-[#005F6B]/20 transition-all"
              />
            </div>

            {/* SEO Section */}
            <div className="border-t border-slate-200/80 pt-6 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                SEO &amp; Meta Information
              </h3>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Meta Title for search engines"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Meta Tag / Keywords</label>
                <input
                  type="text"
                  name="metaTag"
                  value={formData.metaTag}
                  onChange={handleInputChange}
                  placeholder="Enter Meta Tag / Keywords"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Meta Description</label>
                <textarea
                  name="metaDescription"
                  rows={3}
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  placeholder="Enter Meta Description summarizing the article"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#005F6B] focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[#421B38] px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-[#32142a] focus:outline-none focus:ring-2 focus:ring-[#005F6B] disabled:opacity-50 transition-all"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Saving Blog...</span>
                  </>
                ) : (
                  <span>Add / Publish Blog</span>
                )}
              </button>

              <Link
                href="/admin/blogs"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  )
}
