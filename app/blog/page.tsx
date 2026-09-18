import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaBand } from '@/components/site/cta-band'
import { NewsList } from '@/components/site/news-list'
import { Reveal } from '@/components/site/reveal'

export const metadata: Metadata = {
  title: 'News, Notices & Events',
  description:
    'Latest news, notices, events and announcements from Shivam Ashoka Medical College & Hospital (SAMCH), Patna.',
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Notices"
        title="Latest news, notices &amp; events"
        description="Stay updated with the latest announcements, notices, events and news from SAMCH, Patna."
        crumbs={[{ label: 'News' }]}
      />

      <Reveal direction="up" duration={750}>
        <section className="container-px py-16 sm:py-20">
          <SectionHeading
            eyebrow="Updates"
            title="All updates"
            description="Filter by type — Notices, News, Events or Announcements from the institution."
          />
          <div className="mt-10">
            <NewsList />
          </div>
        </section>
      </Reveal>

      <Reveal direction="up" duration={750}>
        <CtaBand
          title="Want to stay informed?"
          description="Contact us or visit regularly for the latest updates from SAMCH."
        />
      </Reveal>
    </>
  )
}
