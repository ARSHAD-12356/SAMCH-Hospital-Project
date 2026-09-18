import type { Metadata } from 'next'
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  HelpCircle,
  Info,
  PhoneCall,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'
import { InfoTable } from '@/components/site/info-table'
import { admissionPrograms, site } from '@/lib/site-data'
import { EnquireButton } from '@/components/site/enquire-button'

export const metadata: Metadata = {
  title: 'Admissions',
  description:
    'Admissions information for MBBS and postgraduate programs at Shivam Ashoka Medical College & Hospital (SAMCH), Patna.',
}

const steps = [
  { icon: Info, step: '01', title: 'Check Eligibility', description: 'Confirm NEET eligibility criteria, qualifying marks and domicile requirements as per regulatory norms.' },
  { icon: ClipboardList, step: '02', title: 'Counselling', description: 'Participate in the designated state/central counselling process for seat allotment.' },
  { icon: FileText, step: '03', title: 'Document Verification', description: 'Submit and verify all required original documents at the institution.' },
  { icon: BadgeCheck, step: '04', title: 'Fee Payment & Enrolment', description: 'Complete fee payment and formal enrolment to confirm your seat.' },
]

const eligibilityRows = [
  { label: 'Qualifying Examination', value: 'Class XII with Physics, Chemistry & Biology' },
  { label: 'Minimum Marks (General)', value: 'As per NMC/regulatory norms (Placeholder)' },
  { label: 'Minimum Marks (Reserved)', value: 'As per NMC/regulatory norms (Placeholder)' },
  { label: 'Admission Mode', value: 'NEET-UG / NEET-PG (as applicable)' },
  { label: 'Age Criteria', value: 'As per NMC guidelines' },
  { label: 'Nationality', value: 'Indian Nationals / NRI / OCI (as applicable)' },
]

const documentsRequired = [
  'NEET scorecard / rank letter',
  'Class X & XII mark sheets and certificates',
  'Date of Birth certificate',
  'Category / Caste certificate (if applicable)',
  'Domicile / Residency certificate (if applicable)',
  'Transfer certificate from previous institution',
  'Migration certificate (if applicable)',
  'Recent passport-size photographs',
  'ID proof (Aadhaar / Passport)',
  'NRI / OCI documents (if applicable)',
]

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Begin your journey in medicine at SAMCH"
        description="Admissions to MBBS and postgraduate programs at SAMCH are conducted through the national/state counselling process. Find all the information you need to prepare your application."
        crumbs={[{ label: 'Admissions' }]}
      />

      {/* Important notice */}
      <section className="container-px pt-12">
        <Reveal>
          <div className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm/relaxed text-foreground">
              <strong className="font-semibold">Important:</strong> This page presents placeholder information.
              Verified seats, fee structures, and counselling schedules will be published as per regulatory
              notifications. For any queries, please use the Enquire Now channel.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Programs */}
      <section className="container-px py-20 sm:py-24">
        <SectionHeading
          eyebrow="Programs"
          title="Programs offered"
          description="SAMCH offers undergraduate and postgraduate medical programs subject to regulatory approval and seat matrix notifications."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {admissionPrograms.map((prog, i) => (
            <Reveal key={prog.name} delay={i * 80}>
              <div className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground group-hover:text-primary">{prog.name}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-3.5 text-primary" aria-hidden />
                    Duration: {prog.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="size-3.5 text-primary" aria-hidden />
                    {prog.seats}
                  </div>
                </div>
                <p className="mt-4 text-sm/relaxed text-muted-foreground">{prog.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Admission Process"
            title="How to apply"
            description="Follow these key steps in the admission process for SAMCH programs."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative flex flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="font-serif text-5xl font-bold text-primary/10">{step.step}</span>
                  <span className="mt-2 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <step.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm/relaxed text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility table */}
      <Reveal direction="up" duration={750}>
        <section className="container-px py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Eligibility"
                title="Eligibility criteria"
                description="General eligibility guidelines — specific criteria are subject to NMC regulations and counselling authority notifications."
              />
              <div className="mt-8 overflow-x-auto">
                <InfoTable rows={eligibilityRows} caption="General Eligibility — Placeholder" />
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Documents"
                title="Documents required"
                description="Prepare the following documents for submission at the time of admission. This list is indicative; the institution will notify the final checklist."
              />
              <ul className="mt-8 space-y-3">
                {documentsRequired.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm/relaxed text-foreground">
                    <FileText className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Enquiry CTA */}
      <section className="container-px pb-16">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-secondary p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <PhoneCall className="size-6" aria-hidden />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">Have questions?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out via our Enquire Now channel for personalised guidance on admissions.
              </p>
            </div>
          </div>
          <EnquireButton size="lg" className="shrink-0" />
        </Reveal>
      </section>

      <Reveal direction="up" duration={750}>
        <CtaBand
          title="Ready to apply to SAMCH?"
          description="Contact us today to get the latest updates on admission schedules, eligibility and seat availability."
        />
      </Reveal>
    </>
  )
}
