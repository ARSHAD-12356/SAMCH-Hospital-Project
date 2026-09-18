'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  BookOpen,
  Users,
  FileText,
  HeartPulse,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Initial Fallback Data ─────────────────────────────────────────────── */

const defaultBlogs = [
  {
    id: 'health-checkup',
    category: 'Health Tips',
    date: '12 Aug 2026',
    title: 'The Importance of Regular Health Check-ups',
    excerpt:
      'Regular health check-ups help in early detection and prevention of serious diseases. Know why...',
    image: '/assets/blog/health-checkup.jpg',
    href: '/blog',
  },
  {
    id: 'campus-news',
    category: 'Campus News',
    date: '05 Aug 2026',
    title: 'SAMCH Advances Medical Education with New Facilities',
    excerpt:
      'A look at the latest infrastructure and academic initiatives at SAMCH to enhance learning...',
    image: '/assets/blog/campus-news.jpg',
    href: '/blog',
  },
  {
    id: 'cardiac-research',
    category: 'Research',
    date: '28 Jul 2026',
    title: 'Latest Research in Cardiac Care',
    excerpt:
      'Exploring recent advancements in cardiac treatment and how they are improving patient outcomes...',
    image: '/assets/blog/cardiac-research.jpg',
    href: '/blog',
  },
]

interface PublicBlogItem {
  id: string
  category: string
  date: string
  title: string
  excerpt: string
  image: string
  href: string
}

const highlights = [
  {
    id: 'health-awareness',
    icon: BookOpen,
    title: 'Health Awareness',
    text: 'Reliable information for a healthier life',
  },
  {
    id: 'expert-opinions',
    icon: Users,
    title: 'Expert Opinions',
    text: 'Insights from our experienced faculty',
  },
  {
    id: 'latest-updates',
    icon: FileText,
    title: 'Latest Updates',
    text: 'Stay informed with campus news',
  },
  {
    id: 'better-tomorrow',
    icon: HeartPulse,
    title: 'Better Tomorrow',
    text: 'Knowledge for a healthier community',
  },
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export function BlogSection() {
  const [blogs, setBlogs] = useState<PublicBlogItem[]>(defaultBlogs)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    async function loadPublishedBlogs() {
      try {
        const res = await fetch('/api/blogs')
        const data = await res.json()
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: PublicBlogItem[] = data.data.map(
            (b: {
              _id: string
              category: string
              createdAt: string
              englishTitle: string
              description: string
              image: string
            }) => ({
              id: b._id,
              category: b.category || 'Health Tips',
              date: new Date(b.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }),
              title: b.englishTitle,
              excerpt:
                b.description?.length > 95
                  ? b.description.slice(0, 95) + '...'
                  : b.description || '',
              image: b.image || '/assets/blog/health-checkup.jpg',
              href: `/blog/${b._id}`,
            })
          )
          setBlogs(mapped)
        }
      } catch (err) {
        console.error('Failed to load published blogs from MongoDB:', err)
      }
    }
    loadPublishedBlogs()
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + blogs.length) % blogs.length)
  const next = () => setCurrent((c) => (c + 1) % blogs.length)

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full bg-[#A2DFF7]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-[#6BCBEB]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px] px-5 lg:px-8">

        {/* Header row */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#007B8A]" />
              <span className="text-sm font-semibold tracking-[0.18em] text-[#005F6B] uppercase">
                Our Blog
              </span>
            </div>

            <h2 className="font-serif text-4xl font-semibold leading-tight text-[#102A43] md:text-5xl">
              Insights{' '}
              <span className="text-[#007B8A]">&amp;</span>{' '}
              Stories
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              Explore the latest news, health tips, research updates and stories
              from SAMCH.
            </p>
          </div>

          <Link
            href="/blog"
            id="blog-view-all"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-[#6BCBEB]/70 px-7 py-3 text-sm font-semibold text-[#005F6B] transition-all duration-200 hover:bg-[#005F6B] hover:text-white hover:border-[#005F6B] shrink-0"
          >
            View All Blogs
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">

          {/* Prev arrow */}
          <button
            type="button"
            id="blog-prev"
            onClick={prev}
            aria-label="Previous blog"
            className="absolute -left-5 top-[45%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#005F6B] shadow-lg ring-1 ring-slate-100/80 transition-all duration-200 hover:bg-[#005F6B] hover:text-white lg:flex"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className={cn(
                  'group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_10px_36px_rgba(0,95,107,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_50px_rgba(0,95,107,0.15)]',
                  index === current ? 'block' : 'hidden md:block'
                )}
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#007B8A] px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                    {blog.category}
                  </span>

                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-md">
                    <CalendarDays size={13} className="text-[#007B8A]" />
                    {blog.date}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="min-h-[60px] text-xl font-bold leading-[1.35] text-[#102A43]">
                    {blog.title}
                  </h3>

                  <p className="mt-3 min-h-[52px] text-sm leading-6 text-slate-600">
                    {blog.excerpt}
                  </p>

                  <Link
                    href={blog.href}
                    className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#007B8A] transition-colors hover:text-[#005F6B]"
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Next arrow */}
          <button
            type="button"
            id="blog-next"
            onClick={next}
            aria-label="Next blog"
            className="absolute -right-5 top-[45%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#005F6B] shadow-lg ring-1 ring-slate-100/80 transition-all duration-200 hover:bg-[#005F6B] hover:text-white lg:flex"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {blogs.map((_, i) => (
            <button
              key={i}
              type="button"
              id={`blog-dot-${i}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to blog ${i + 1}`}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                current === i
                  ? 'w-7 bg-[#007B8A]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              )}
            />
          ))}
        </div>

        {/* Bottom info strip */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#A2DFF7]/50 bg-[#F8FCFD]">
          <div className="grid divide-y divide-[#D9EEF3] md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center gap-4 p-6',
                    i >= 2 ? 'md:border-t md:border-[#D9EEF3] lg:border-t-0' : ''
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F6F8] text-[#007B8A]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#102A43]">{item.title}</h4>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
