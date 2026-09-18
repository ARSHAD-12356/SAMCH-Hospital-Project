import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { DepartmentExplorer } from '@/components/departments/department-explorer'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Departments',
  description:
    'Explore the pre-clinical, para-clinical and clinical departments at SAMCH Patna.',
}

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Departments & specialities"
        description="A comprehensive range of departments spanning the full medical curriculum — from foundational sciences to advanced clinical care."
        crumbs={[{ label: 'Departments' }]}
      />

      <Reveal direction="up" duration={750}>
        <section className="container-px py-20 sm:py-24">
          <SectionHeading
            eyebrow="Explore"
            title="Find a department"
            description="Filter by category to explore pre-clinical, para-clinical and clinical departments. Detailed faculty and facility information will be added per department."
          />
          <div className="mt-12">
            <DepartmentExplorer />
          </div>
        </section>
      </Reveal>

      <Reveal direction="up" duration={750}>
        <CtaBand />
      </Reveal>
    </>
  )
}
