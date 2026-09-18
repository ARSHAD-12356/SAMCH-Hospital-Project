import type { Metadata } from 'next'
import { CommitteePageLayout } from '@/components/site/committee-layout'
import { committees } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Curriculum Committee',
  description:
    'SAMCH Curriculum Committee — competency-based medical education oversight, planning and quality assurance.',
}

const committee = committees.find((c) => c.slug === 'curriculum')!

const members = [
  { name: 'Dr. Jitendra Kumar', designation: 'Professor & HOD', department: 'Pharmacology', role: 'Chairperson' },
  { name: 'Dr. Tushar Tyagi', designation: 'Professor', department: 'General Medicine', role: 'Member Secretary' },
  { name: 'Dr. Santosh', designation: 'Assistant Professor', department: 'General Medicine', role: 'Member' },
  { name: 'Dr. Sunny Kumari', designation: 'Assistant Professor', department: 'Pathology', role: 'Member' },
  { name: 'Dr. Pankaj Kumar Jha', designation: 'Senior Resident', department: 'Pathology', role: 'Member' },
  { name: 'Dr. Pratyush Kumar', designation: 'Senior Resident', department: 'ENT', role: 'Member' },
  { name: 'Dr. Md Mehtab Alam', designation: 'Senior Resident', department: 'General Medicine', role: 'Member' },
]

const infoRows = [
  { label: 'Committee Type', value: 'Academic / Institutional' },
  { label: 'Curriculum Framework', value: 'Competency-Based Medical Education (CBME) — NMC' },
  { label: 'Meeting Frequency', value: 'Minimum once per semester / as required' },
  { label: 'Reporting To', value: 'Academic Council / Principal' },
  { label: 'Scope', value: 'All MBBS phases and postgraduate programs' },
]

const documents = [
  { label: 'Academic Calendar', note: 'Annual academic session schedule and phase-wise curriculum timetable.' },
  { label: 'Curriculum Framework', note: 'Competency-Based Medical Education (CBME) curriculum guide.' },
  { label: 'Assessment Policy', note: 'Internal assessment, formative evaluation and examination guidelines.' },
]

export default function CurriculumPage() {
  return (
    <CommitteePageLayout
      name={committee.name}
      eyebrow="Committee"
      intro={committee.intro}
      purpose={committee.purpose}
      members={members}
      infoRows={infoRows}
      documents={documents}
    />
  )
}
