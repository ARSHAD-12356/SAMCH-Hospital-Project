import type { Metadata } from 'next'
import { AlertCircle, BookOpen, CheckCircle2, Info, XCircle } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Attendance',
  description:
    'Academic attendance information and guidelines for MBBS students at SAMCH Patna.',
}

const phases = ['Phase I', 'Phase II', 'Phase III']

const attendanceCriteria = [
  { type: 'Theory / Lectures', requirement: '≥ 75%', note: 'Minimum required to appear in university examinations' },
  { type: 'Practical / Clinicals', requirement: '≥ 80%', note: 'Minimum required as per NMC/regulatory norms' },
  { type: 'Internal Assessment', requirement: 'As notified', note: 'Subject to institutional and university norms' },
]

type AttendanceRecord = {
  subject: string
  total: number
  attended: number
  percentage: number
  type: 'Theory' | 'Practical'
}

const samplePhase1: AttendanceRecord[] = [
  { subject: 'Anatomy — Theory', total: 240, attended: 198, percentage: 82, type: 'Theory' },
  { subject: 'Anatomy — Practical', total: 120, attended: 102, percentage: 85, type: 'Practical' },
  { subject: 'Physiology — Theory', total: 200, attended: 156, percentage: 78, type: 'Theory' },
  { subject: 'Physiology — Practical', total: 100, attended: 74, percentage: 74, type: 'Practical' },
  { subject: 'Biochemistry — Theory', total: 160, attended: 124, percentage: 77, type: 'Theory' },
  { subject: 'Biochemistry — Practical', total: 80, attended: 66, percentage: 82, type: 'Practical' },
]

const samplePhase2: AttendanceRecord[] = [
  { subject: 'Pathology — Theory', total: 180, attended: 148, percentage: 82, type: 'Theory' },
  { subject: 'Pathology — Practical', total: 100, attended: 78, percentage: 78, type: 'Practical' },
  { subject: 'Microbiology — Theory', total: 160, attended: 120, percentage: 75, type: 'Theory' },
  { subject: 'Microbiology — Practical', total: 80, attended: 62, percentage: 77, type: 'Practical' },
  { subject: 'Pharmacology — Theory', total: 160, attended: 130, percentage: 81, type: 'Theory' },
  { subject: 'Pharmacology — Practical', total: 60, attended: 46, percentage: 76, type: 'Practical' },
  { subject: 'Forensic Medicine — Theory', total: 100, attended: 82, percentage: 82, type: 'Theory' },
  { subject: 'Community Medicine — Theory', total: 140, attended: 110, percentage: 78, type: 'Theory' },
]

const samplePhase3: AttendanceRecord[] = [
  { subject: 'General Medicine — Theory', total: 160, attended: 132, percentage: 82, type: 'Theory' },
  { subject: 'General Medicine — Clinical', total: 200, attended: 168, percentage: 84, type: 'Practical' },
  { subject: 'General Surgery — Theory', total: 140, attended: 108, percentage: 77, type: 'Theory' },
  { subject: 'General Surgery — Clinical', total: 180, attended: 152, percentage: 84, type: 'Practical' },
  { subject: 'Obstetrics & Gynaecology — Theory', total: 100, attended: 82, percentage: 82, type: 'Theory' },
  { subject: 'Paediatrics — Theory', total: 80, attended: 62, percentage: 77, type: 'Theory' },
]

const phaseData: Record<string, AttendanceRecord[]> = {
  'Phase I': samplePhase1,
  'Phase II': samplePhase2,
  'Phase III': samplePhase3,
}

function getStatus(record: AttendanceRecord) {
  const min = record.type === 'Practical' ? 80 : 75
  if (record.percentage >= min + 5) return 'safe'
  if (record.percentage >= min) return 'borderline'
  return 'shortage'
}

const statusConfig = {
  safe: { label: 'Eligible', color: 'text-primary bg-primary/10 border-primary/20', icon: CheckCircle2 },
  borderline: { label: 'Borderline', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertCircle },
  shortage: { label: 'Shortage', color: 'text-destructive bg-destructive/10 border-destructive/20', icon: XCircle },
}

export default function AttendancePage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="Attendance — academic guidelines"
        description="Academic attendance information and phase-wise subject data for MBBS students at SAMCH. Minimum attendance requirements must be met to appear in examinations."
        crumbs={[{ label: 'Academics', href: '/academics' }, { label: 'Attendance' }]}
      />

      {/* Important note */}
      <section className="container-px pt-12">
        <Reveal>
          <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5">
            <Info className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden />
            <p className="text-sm/relaxed text-blue-900">
              <strong className="font-semibold">Frontend Display Only:</strong> This page shows representative sample attendance data for UI demonstration purposes. 
              Actual student attendance records will be integrated through the institutional attendance management system. 
              For official attendance records, please contact the Academic Section.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Criteria */}
      <section className="container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="NMC Guidelines"
          title="Attendance criteria"
          description="Minimum attendance requirements as per National Medical Commission (NMC) norms. Students must meet these criteria to be eligible to appear in university examinations."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {attendanceCriteria.map((item, i) => (
            <Reveal key={item.type} delay={i * 80}>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.type}</h3>
                <p className="mt-1 font-serif text-4xl font-bold text-primary">{item.requirement}</p>
                <p className="mt-3 text-sm/relaxed text-muted-foreground">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Phase-wise attendance table */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Subject-wise Data"
            title="Attendance records (Sample)"
            description="Indicative phase-wise attendance data for demonstration. Actual data will be populated by the attendance management system."
          />

          {/* Phase tabs are static for SSR — we'll render all phases with JS-free tabs */}
          <div className="mt-12 space-y-12">
            {phases.map((phase) => {
              const records = phaseData[phase] || []
              return (
                <Reveal key={phase}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between border-b border-border bg-secondary px-5 py-3.5">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground">
                        {phase} — Subject Attendance
                      </h3>
                      <span className="text-xs text-muted-foreground">Sample data — Academic year placeholder</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Subject</th>
                            <th className="px-5 py-3 text-center font-semibold text-foreground">Total</th>
                            <th className="px-5 py-3 text-center font-semibold text-foreground">Attended</th>
                            <th className="px-5 py-3 text-center font-semibold text-foreground">Percentage</th>
                            <th className="px-5 py-3 text-center font-semibold text-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records.map((record, i) => {
                            const status = getStatus(record)
                            const config = statusConfig[status]
                            const StatusIcon = config.icon
                            return (
                              <tr key={record.subject} className={cn('border-b border-border last:border-0', i % 2 === 1 && 'bg-muted/20')}>
                                <td className="px-5 py-3.5 font-medium text-foreground">{record.subject}</td>
                                <td className="px-5 py-3.5 text-center text-muted-foreground">{record.total}</td>
                                <td className="px-5 py-3.5 text-center text-muted-foreground">{record.attended}</td>
                                <td className="px-5 py-3.5 text-center">
                                  <span className={cn('font-semibold', status === 'safe' ? 'text-primary' : status === 'borderline' ? 'text-amber-600' : 'text-destructive')}>
                                    {record.percentage}%
                                  </span>
                                </td>
                                <td className="px-5 py-3.5 text-center">
                                  <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold', config.color)}>
                                    <StatusIcon className="size-3" aria-hidden />
                                    {config.label}
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {Object.entries(statusConfig).map(([key, val]) => {
              const Icon = val.icon
              return (
                <span key={key} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold', val.color)}>
                    <Icon className="size-3" aria-hidden />
                    {val.label}
                  </span>
                  {key === 'safe' && '— Above minimum'}
                  {key === 'borderline' && '— At minimum (within 5%)'}
                  {key === 'shortage' && '— Below minimum'}
                </span>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
