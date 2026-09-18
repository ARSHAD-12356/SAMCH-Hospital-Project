import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

const campusLifeCards = [
  {
    id: 'campus',
    label: 'CAMPUS',
    image: '/assets/campus-life/01-campus.png',
  },
  {
    id: 'convocation',
    label: 'CONVOCATION',
    image: '/assets/campus-life/02-convocation.png',
  },
  {
    id: 'laboratory',
    label: 'LABORATORY',
    image: '/assets/campus-life/03-laboratory.png',
  },
  {
    id: 'library',
    label: 'LIBRARY',
    image: '/assets/campus-life/04-library.png',
  },
  {
    id: 'sports-meet',
    label: 'SPORTS MEET',
    image: '/assets/campus-life/05-sports-meet.png',
  },
  {
    id: 'white-coat-ceremony',
    label: 'WHITE COAT CEREMONY',
    image: '/assets/campus-life/06-white-coat-ceremony.png',
  },
  {
    id: 'seminar',
    label: 'SEMINAR',
    image: '/assets/campus-life/07-seminar.png',
  },
  {
    id: 'community-camp',
    label: 'COMMUNITY CAMP',
    image: '/assets/campus-life/08-community-camp.png',
  },
]

export function GalleryPreview() {
  return (
    <section className="container-px py-20 sm:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Campus Life"
          title="A glimpse into SAMCH"
          description="Moments from academics, clinical training, events and everyday life across our campus."
        />
        <Reveal>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Open gallery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <Reveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {campusLifeCards.map((card) => (
          <div
            key={card.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="bg-card py-3 px-2 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
