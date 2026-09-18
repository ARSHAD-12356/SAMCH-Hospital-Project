import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NewsItem } from '@/lib/site-data'

const categoryStyles: Record<NewsItem['category'], string> = {
  Notice: 'bg-primary/10 text-primary',
  News: 'bg-primary/15 text-primary',
  Event: 'bg-accent text-accent-foreground',
  Announcement: 'bg-secondary text-secondary-foreground',
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider',
            categoryStyles[item.category],
          )}
        >
          {item.category}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden />
          {item.date}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm/relaxed text-muted-foreground">{item.excerpt}</p>
      <Link
        href="/blog"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
      >
        Read more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  )
}
