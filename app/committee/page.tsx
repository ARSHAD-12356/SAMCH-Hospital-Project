import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, BookOpen, Users, GraduationCap } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'
import { committees } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Committees',
  description:
    'Institutional committees at SAMCH Patna — Anti-Ragging, Curriculum, Gender Harassment and Medical Education Unit.',
}

const committeeIcons: Record<string, React.ElementType> = {
  'anti-ragging': Shield,
  curriculum: BookOpen,
  'gender-harassment': Users,
  meu: GraduationCap,
}

const committeeColors: Record<string, string> = {
  'anti-ragging': 'bg-primary/10 text-primary border-primary/20',
  curriculum: 'bg-primary/10 text-primary border-primary/20',
  'gender-harassment': 'bg-primary/10 text-primary border-primary/20',
  meu: 'bg-primary/10 text-primary border-primary/20',
}

export default function CommitteePage() {
  return (
    <>
      <PageHero
        eyebrow="Committees"
        title="Institutional committees at SAMCH"
        description="SAMCH operates several statutory and institutional committees to ensure a safe, equitable, well-governed and academically rigorous environment for all students and staff."
        crumbs={[{ label: 'Committee' }]}
      />

      <section className="container-px py-20 sm:py-24">
        <SectionHeading
          eyebrow="Our Committees"
          title="Governance &amp; oversight"
          description="Each committee fulfills a specific institutional function, operating in accordance with regulatory guidelines and institutional policies."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {committees.map((committee, i) => {
            const Icon = committeeIcons[committee.slug] || Shield
            const colorClass = committeeColors[committee.slug] || 'bg-secondary text-primary border-border'
            return (
              <Reveal key={committee.slug} delay={i * 80}>
                <Link
                  href={`/committee/${committee.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid size-12 place-items-center rounded-xl border ${colorClass}`}>
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <ArrowRight className="mt-1 size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-foreground group-hover:text-primary">
                    {committee.name}
                  </h3>
                  <p className="mt-3 text-sm/relaxed text-muted-foreground">{committee.intro}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {committee.purpose.slice(0, 2).map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View committee
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBand
        title="Questions about our committees?"
        description="Contact the institution through official channels for committee-related queries or grievances."
      />
    </>
  )
}
