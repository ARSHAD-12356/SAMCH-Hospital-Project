'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { departments, departmentGroups } from '@/lib/site-data'
import { DepartmentCard } from '@/components/site/department-card'
import { Reveal } from '@/components/site/reveal'

const filters = ['All', ...departmentGroups] as const

export function DepartmentExplorer() {
  const [active, setActive] = useState<(typeof filters)[number]>('All')

  const visible = active === 'All' ? departments : departments.filter((d) => d.group === active)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              active === filter
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            {filter}
            <span className="ml-2 text-xs opacity-70">
              {filter === 'All' ? departments.length : departments.filter((d) => d.group === filter).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((department, i) => (
          <Reveal key={department.slug} delay={(i % 4) * 60} id={department.slug} className="scroll-mt-28">
            <DepartmentCard department={department} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
