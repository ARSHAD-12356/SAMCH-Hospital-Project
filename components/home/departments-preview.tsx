import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { DepartmentCard } from '@/components/site/department-card'
import { Reveal } from '@/components/site/reveal'
import { departments } from '@/lib/site-data'

export function DepartmentsPreview() {
  const featured = departments.slice(0, 8)
  return (
    <section className="container-px py-20 sm:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Academics"
          title="Departments & specialities"
          description="A comprehensive spread of pre-clinical, para-clinical and clinical departments supporting complete medical training."
        />
        <Reveal>
          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View all departments
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((department, i) => (
          <Reveal key={department.slug} delay={i * 60}>
            <DepartmentCard department={department} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
