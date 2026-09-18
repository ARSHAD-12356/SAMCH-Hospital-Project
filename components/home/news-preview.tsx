import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { NewsCard } from '@/components/site/news-card'
import { Reveal } from '@/components/site/reveal'
import { news } from '@/lib/site-data'

export function NewsPreview() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="container-px">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Stay Updated"
            title="News, notices & events"
            description="Latest announcements, academic notices and institutional happenings at SAMCH."
          />
          <Reveal>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View all updates
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
