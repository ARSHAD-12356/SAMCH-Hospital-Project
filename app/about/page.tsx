import type { Metadata } from 'next'
import Image from 'next/image'
import { Eye, Flag, HeartHandshake, Target } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { StatGrid } from '@/components/site/stat-grid'
import { FeatureCard } from '@/components/site/feature-card'
import { CtaBand } from '@/components/site/cta-band'
import { statistics, site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Shivam Ashoka Medical College & Hospital (SAMCH), Patna — our vision, mission, values and commitment to medical education and healthcare.',
}

const values = [
  { icon: HeartHandshake, title: 'Compassion', description: 'Care delivered with empathy, dignity and respect for every patient and learner.' },
  { icon: Target, title: 'Excellence', description: 'A relentless pursuit of quality in education, clinical practice and research.' },
  { icon: Flag, title: 'Integrity', description: 'Ethical conduct and professionalism at the heart of everything we do.' },
  { icon: Eye, title: 'Inclusivity', description: 'A safe, equitable and supportive environment for all.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Committed to medicine, education and community"
        description={`${site.name} (${site.shortName}) is an institution founded on the belief that great doctors are shaped by great learning environments.`}
        crumbs={[{ label: 'About' }]}
      />

      {/* Intro */}
      <section className="container-px py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
              <Image
                src="/Assets/04/Hospital Campus.webp"
                alt="SAMCH Hospital Campus"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A modern medical institution with a human touch"
              description="SAMCH brings together academics, clinical training and research within an integrated campus and teaching hospital. Our programs are designed to develop competent, confident and compassionate healthcare professionals prepared to serve diverse communities."
            />
            <p className="mt-5 text-pretty text-sm/relaxed text-muted-foreground">
              With advanced clinical facilities, experienced teaching faculty and high-tech laboratories,
              SAMCH is committed to establishing excellence in healthcare delivery and academic rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section id="vision" className="scroll-mt-24 bg-surface py-20 sm:py-24">
        <div className="container-px grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-3xl border border-border bg-card p-8 sm:p-10">
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Eye className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">Our Vision</h3>
            <p className="mt-3 text-pretty text-sm/relaxed text-muted-foreground">
              To be a leading medical institution recognised for excellence in education, patient care and
              research — nurturing healthcare professionals who serve society with skill and compassion.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col rounded-3xl border border-border bg-card p-8 sm:p-10">
            <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
              <Target className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-foreground">Our Mission</h3>
            <p className="mt-3 text-pretty text-sm/relaxed text-muted-foreground">
              To deliver quality, competency-based medical education; to provide accessible and compassionate
              healthcare; and to foster research, ethics and lifelong learning across our community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-px py-20 sm:py-24">
        <SectionHeading
          align="center"
          eyebrow="Our Values"
          title="The principles that guide us"
          description="A shared set of values that shapes our culture, our teaching and our care."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 70}>
              <FeatureCard {...value} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-deep py-20 text-primary-foreground sm:py-24">
        <div className="container-px">
          <SectionHeading
            invert
            align="center"
            eyebrow="At a Glance"
            title="SAMCH in numbers"
            description="Key institutional and hospital statistics reflecting our academic and clinical scale."
          />
          <div className="mt-14">
            <StatGrid stats={statistics} columns={6} invert />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
