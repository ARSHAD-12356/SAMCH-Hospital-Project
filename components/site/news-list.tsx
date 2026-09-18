'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { news } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'

const categories = ['All', 'Notice', 'News', 'Event', 'Announcement'] as const
type Category = (typeof categories)[number]

const categoryColors: Record<string, string> = {
  Notice: 'bg-primary/10 text-primary border-primary/20',
  News: 'bg-primary text-white border-transparent',
  Event: 'bg-secondary text-primary border-border',
  Announcement: 'bg-primary/5 text-primary border-primary/15',
}

export function NewsList() {
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All' ? news : news.filter((n) => n.category === active)

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="News categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat as Category)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all',
              active === cat
                ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {filtered.map((item, i) => {
          const colorClass = categoryColors[item.category] || 'bg-secondary text-secondary-foreground border-border'
          return (
            <Reveal key={item.id} delay={i * 50}>
              <Link
                href={`/blog/${item.id}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:flex-row sm:items-start"
              >
                {/* Left accent */}
                <div className="hidden h-full w-1 shrink-0 rounded-full bg-primary/20 group-hover:bg-primary sm:block" aria-hidden />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider', colorClass)}>
                      <Tag className="size-3" aria-hidden />
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" aria-hidden />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm/relaxed text-muted-foreground">{item.excerpt}</p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">
          No items in this category yet.
        </div>
      )}
    </>
  )
}
