import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Tag, User, MapPin } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/site/reveal'
import { news } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import mongoose from 'mongoose'

const categoryColors: Record<string, string> = {
  Notice: 'bg-primary/10 text-primary border-primary/20',
  News: 'bg-primary text-white border-transparent',
  Event: 'bg-secondary text-primary border-border',
  Announcement: 'bg-primary/5 text-primary border-primary/15',
  'Health Tips': 'bg-[#005F6B] text-white border-transparent',
  'Campus News': 'bg-[#007B8A] text-white border-transparent',
  Research: 'bg-[#102A43] text-white border-transparent',
}

interface DisplayBlog {
  id: string
  title: string
  excerpt: string
  content?: string
  image?: string
  category: string
  date: string
  author?: string
  city?: string
}

async function getBlogItem(id: string): Promise<DisplayBlog | null> {
  // 1. Check static data first
  const staticItem = news.find((n) => String(n.id) === id)
  if (staticItem) {
    return {
      id: String(staticItem.id),
      title: staticItem.title,
      excerpt: staticItem.excerpt,
      category: staticItem.category,
      date: staticItem.date,
    }
  }

  // 2. Check MongoDB
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      await connectDB()
      const dbBlog = await Blog.findById(id).lean()
      if (dbBlog && dbBlog.status === 'published') {
        return {
          id: String(dbBlog._id),
          title: dbBlog.englishTitle,
          excerpt:
            dbBlog.description.length > 150
              ? dbBlog.description.slice(0, 150) + '...'
              : dbBlog.description,
          content: dbBlog.description,
          image: dbBlog.image,
          category: dbBlog.category || 'Health Tips',
          date: new Date(dbBlog.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          author: dbBlog.author,
          city: dbBlog.city,
        }
      }
    } catch (e) {
      console.error('Error fetching blog from DB:', e)
    }
  }

  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = await getBlogItem(id)
  if (!item) return { title: 'Blog Not Found' }
  return {
    title: item.title,
    description: item.excerpt,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await getBlogItem(id)

  if (!item) notFound()

  const colorClass =
    categoryColors[item.category] ||
    'bg-secondary text-secondary-foreground border-border'

  return (
    <>
      <PageHero
        eyebrow={item.category}
        title={item.title}
        crumbs={[
          { label: 'News & Blog', href: '/blog' },
          {
            label:
              item.title.length > 40
                ? item.title.slice(0, 40) + '…'
                : item.title,
          },
        ]}
      />

      <section className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Back */}
          <Link
            href="/blog"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />
            Back to all blogs &amp; updates
          </Link>

          {/* Meta header */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider',
                  colorClass
                )}
              >
                <Tag className="size-3" aria-hidden />
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="size-4" aria-hidden />
                {item.date}
              </span>
              {item.author && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="size-4" aria-hidden />
                  {item.author}
                </span>
              )}
              {item.city && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" aria-hidden />
                  {item.city}
                </span>
              )}
            </div>
          </Reveal>

          {/* Feature Image if available */}
          {item.image && (
            <div className="relative mt-8 h-72 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-100 shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}

          {/* Body */}
          <Reveal className="prose prose-sm sm:prose-base mt-8 max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
            {item.content || item.excerpt}
          </Reveal>

          {/* Divider */}
          <hr className="my-12 border-border" />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
