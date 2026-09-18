import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaBand } from '@/components/site/cta-band'
import { GalleryGrid } from '@/components/site/gallery-grid'
import { Reveal } from '@/components/site/reveal'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo gallery of SAMCH Patna — campus, college, hospital, events, infrastructure and student life.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life at SAMCH — in pictures"
        description="A glimpse into campus life, events, infrastructure and the vibrant academic community at Shivam Ashoka Medical College & Hospital, Patna."
        crumbs={[{ label: 'Gallery' }]}
      />

      <Reveal direction="up" duration={750}>
        <section className="container-px py-16 sm:py-20">
          <SectionHeading
            align="center"
            eyebrow="Photo Gallery"
            title="Explore our gallery"
            description="Browse by category — campus, college, hospital, events, infrastructure and student life. Click any photo to view it in full screen."
          />

          <GalleryGrid />
        </section>
      </Reveal>

      <Reveal direction="up" duration={750}>
        <CtaBand
          title="Want to experience SAMCH in person?"
          description="Contact us to schedule a campus visit or to know more about life at SAMCH."
        />
      </Reveal>
    </>
  )
}
