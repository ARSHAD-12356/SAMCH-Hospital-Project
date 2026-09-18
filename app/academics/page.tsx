import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookMarked, GraduationCap, Layers, Library, NotebookPen, Presentation } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureCard } from '@/components/site/feature-card'
import { ImagePlaceholder } from '@/components/site/image-placeholder'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Academics',
  description:
    'Academic programs, curriculum, teaching-learning methods and library resources at SAMCH Patna.',
}

const phases = [
  { phase: 'Phase I', title: 'Pre-Clinical', description: 'Foundations in anatomy, physiology and biochemistry with early clinical exposure.' },
  { phase: 'Phase II', title: 'Para-Clinical', description: 'Pathology, pharmacology, microbiology, forensic medicine and community medicine.' },
  { phase: 'Phase III', title: 'Clinical', description: 'Comprehensive clinical postings across all major specialities.' },
  { phase: 'Internship', title: 'Rotatory Internship', description: 'Supervised, hands-on clinical practice across departments.' },
]

const highlights = [
  { icon: Layers, title: 'Integrated Curriculum', description: 'Competency-based, phase-wise integrated teaching aligned with regulatory norms.' },
  { icon: Presentation, title: 'Modern Teaching', description: 'Interactive lectures, small-group learning and case-based discussions.' },
  { icon: NotebookPen, title: 'Skills & Simulation', description: 'Structured clinical skills training in a dedicated simulation environment.' },
  { icon: BookMarked, title: 'Assessment', description: 'Continuous, formative and summative assessment with structured feedback.' },
]

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="A rigorous, learner-centred medical education"
        description="Our academic framework combines a competency-based curriculum with strong clinical exposure, modern pedagogy and robust learning resources."
        crumbs={[{ label: 'Academics' }]}
      />

      {/* Programs / phases */}
      <section className="container-px py-20 sm:py-24">
        <SectionHeading
          eyebrow="Program Structure"
          title="The MBBS journey at SAMCH"
          description="An overview of the phase-wise structure of undergraduate medical education. Detailed schedules will be published in the academic calendar."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => (
            <Reveal
              key={phase.phase}
              delay={i * 80}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{phase.phase}</span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{phase.title}</h3>
              <p className="mt-2 text-sm/relaxed text-muted-foreground">{phase.description}</p>
              <span className="mt-4 font-serif text-4xl font-semibold text-secondary-foreground/15">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Teaching & Learning"
            title="How we teach"
            description="A blend of proven and modern educational methods to build strong clinical reasoning."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <FeatureCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Library */}
      <section id="library" className="container-px scroll-mt-24 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Resources"
              title="Central Medical Library"
              description="A well-stocked library supporting study, reference and research with an extensive collection of textbooks, journals and digital resources."
            />
            <ul className="mt-8 space-y-3">
              {[
                'Extensive collection of medical textbooks & references',
                'National & international journals',
                'Digital library and e-resource access',
                'Quiet reading halls and discussion spaces',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm/relaxed text-foreground">
                  <Library className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/infrastructure"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Explore infrastructure
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
              <Image
                src="/Assets/central-medical-library.jpg"
                alt="SAMCH Central Medical Library"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Departments link band */}
      <section className="container-px pb-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-secondary p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-6" aria-hidden />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">Explore our departments</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pre-clinical, para-clinical and clinical departments.</p>
            </div>
          </div>
          <Link
            href="/departments"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            View departments
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  )
}
