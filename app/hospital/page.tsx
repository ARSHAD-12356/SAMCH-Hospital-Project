import type { Metadata } from 'next'
import Image from 'next/image'
import { Activity, Ambulance, BedDouble, HeartPulse, Microscope, Stethoscope, Syringe, TestTubes } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureCard } from '@/components/site/feature-card'
import { Reveal } from '@/components/site/reveal'
import { StatGrid } from '@/components/site/stat-grid'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Hospital',
  description:
    'The SAMCH teaching hospital provides comprehensive clinical services, 24×7 emergency care and hands-on training for medical students.',
}

const services = [
  { icon: Stethoscope, title: 'Outpatient Services (OPD)', description: 'Consultation across all major specialities and super-specialities.' },
  { icon: BedDouble, title: 'Inpatient Services (IPD)', description: 'Well-equipped wards with quality nursing and clinical care.' },
  { icon: Syringe, title: 'Operation Theatres', description: 'Modular OT complex supporting a wide spectrum of surgeries.' },
  { icon: Activity, title: 'Critical & Intensive Care', description: 'ICU, ICCU, NICU and PICU with continuous monitoring.' },
  { icon: TestTubes, title: 'Laboratory Services', description: 'Comprehensive diagnostic laboratory support.' },
  { icon: Microscope, title: 'Radiology & Imaging', description: 'Advanced imaging including X-ray, ultrasound and CT.' },
]

const hospitalStats = [
  { value: '650+', label: 'Beds' },
  { value: '25+', label: 'Specialities' },
  { value: '24×7', label: 'Emergency' },
  { value: '20+', label: 'OT & ICU Units' },
]

export default function HospitalPage() {
  return (
    <>
      <PageHero
        eyebrow="Teaching Hospital"
        title="Comprehensive care, real clinical learning"
        description="Our teaching hospital serves the community with quality healthcare while offering students rich, hands-on clinical exposure across specialities."
        crumbs={[{ label: 'Hospital' }]}
      />

      {/* Intro + stats */}
      <section className="container-px py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
              <Image
                src="/assets/04/hospital.webp"
                alt="SAMCH Hospital Building"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Overview"
              title="A hospital that heals and teaches"
              description="The SAMCH hospital is central to our academic mission — a place where compassionate patient care, cutting-edge clinical services and medical education come together."
            />
            <div className="mt-8">
              <StatGrid stats={hospitalStats} columns={4} />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-surface py-20 sm:py-24">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Clinical Services"
            title="Services & facilities"
            description="A broad range of clinical services supporting patient care and medical training."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 60}>
                <FeatureCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section id="emergency" className="scroll-mt-24 py-20 sm:py-24">
        <div className="container-px">
          <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  <Ambulance className="size-4" aria-hidden />
                  Emergency & Trauma
                </span>
                <h2 className="mt-5 font-serif text-3xl font-semibold text-white">24×7 emergency and trauma care</h2>
                <p className="mt-4 text-pretty text-white/75">
                  A round-the-clock emergency department equipped to handle medical, surgical and trauma
                  emergencies, supported by critical care units and rapid diagnostics.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: HeartPulse, label: 'Critical Care' },
                  { icon: Ambulance, label: 'Ambulance Services' },
                  { icon: Activity, label: 'Trauma Unit' },
                  { icon: TestTubes, label: '24×7 Diagnostics' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur">
                    <item.icon className="size-6 text-white" aria-hidden />
                    <p className="mt-3 text-sm font-medium text-white">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Need care or more information?" description="Reach out to learn more about our hospital services and facilities." />
    </>
  )
}
