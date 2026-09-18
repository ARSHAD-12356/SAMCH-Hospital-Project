'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BookOpen,
  Building2,
  FlaskConical,
  Layers,
  Monitor,
  Stethoscope,
  Users,
  Wifi,
} from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { infrastructure, infrastructureCategories } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, React.ElementType> = {
  Academic: BookOpen,
  Laboratories: FlaskConical,
  Hospital: Stethoscope,
  Campus: Building2,
}

const highlights = [
  { icon: Layers, title: 'Modern Campus', description: 'Purpose-built academic and clinical infrastructure on an integrated campus.' },
  { icon: Monitor, title: 'Smart Classrooms', description: 'Audio-visual equipped lecture halls and interactive teaching spaces.' },
  { icon: Wifi, title: 'Digital Resources', description: 'Connected learning environment supporting e-library and digital platforms.' },
  { icon: Users, title: 'Student Amenities', description: 'Hostels, sports facilities, cafeteria and welfare services.' },
]

export function InfrastructureExplorer() {
  const [active, setActive] = useState<string>('All')
  const allCategories = ['All', ...infrastructureCategories]

  const filtered =
    active === 'All' ? infrastructure : infrastructure.filter((item) => item.category === active)

  return (
    <>
      {/* Highlights */}
      <section className="container-px py-20 sm:py-24">
        <SectionHeading
          eyebrow="Overview"
          title="Built for excellence"
          description="Our infrastructure is designed to support every dimension of medical education — from lecture halls to simulation labs, operating theatres to student hostels."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm/relaxed text-muted-foreground">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Campus image */}
      <section className="container-px pb-8">
        <Reveal>
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
            <Image
              src="/Assets/SAMCH campus.png"
              alt="SAMCH Campus Aerial & Exterior View"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </Reveal>
      </section>

      {/* Facility explorer */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Facilities"
            title="Explore our facilities"
            description="Filter by category to explore academic, laboratory, hospital and campus facilities."
          />

          {/* Category filter */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Facility categories">
            {allCategories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                  active === cat
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                {cat !== 'All' && (() => {
                  const Icon = categoryIcons[cat]
                  return <Icon className="size-3.5" aria-hidden />
                })()}
                {cat}
              </button>
            ))}
          </div>

          {/* Facility cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => {
              const Icon = categoryIcons[item.category]
              return (
                <Reveal key={`${item.category}-${item.title}`} delay={i * 50}>
                  <div className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-secondary-foreground">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm/relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
