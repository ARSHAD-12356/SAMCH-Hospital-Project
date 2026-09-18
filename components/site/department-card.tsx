import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Department } from '@/lib/site-data'

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={`/departments#${department.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={department.image}
          alt={department.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-primary backdrop-blur">
          {department.group}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary">{department.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm/relaxed text-muted-foreground">{department.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          View Department
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
