import type { Metadata } from 'next'
import { CommitteePageLayout } from '@/components/site/committee-layout'
import { committees } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Medical Education Unit (MEU)',
  description:
    'SAMCH Medical Education Unit — faculty development, innovative teaching-learning, curriculum support and educational quality.',
}

const committee = committees.find((c) => c.slug === 'meu')!

const members = [
  { name: 'Dr. Jitendra Kumar', designation: 'Professor', department: 'Pharmacology', role: 'Director / Head, MEU' },
  { name: 'Dr. Tushar Tyagi', designation: 'Professor', department: 'General Medicine', role: 'Co-ordinator' },
  { name: 'Dr. Radha Sharma', designation: 'Assistant Professor', department: 'Dermatology', role: 'Member' },
  { name: 'Dr. Heera', designation: 'Associate Professor', department: 'Dental', role: 'Member' },
  { name: 'Dr. Md Mehtab Alam', designation: 'Senior Resident', department: 'General Medicine', role: 'Member' },
  { name: 'Dr. Tohfa Haque', designation: 'Senior Resident', department: 'Pathology', role: 'Member' },
]

const infoRows = [
  { label: 'Unit Type', value: 'Academic Quality & Faculty Development' },
  { label: 'Mandate', value: 'NMC / MCI — Mandatory for Medical Colleges' },
  { label: 'Focus Areas', value: 'Faculty development, curriculum implementation, assessment, educational research' },
  { label: 'Key Programs', value: 'Basic Course in Medical Education (BCME), Advance Course, Curriculum workshops' },
  { label: 'Meeting Frequency', value: 'Monthly / as required' },
]

const documents = [
  { label: 'Faculty Development Calendar', note: 'Annual FDP schedule, BCME and curriculum workshops calendar.' },
  { label: 'CBME Implementation Guide', note: 'Competency-based curriculum implementation handbook.' },
  { label: 'MEU Annual Report', note: 'Annual activity and academic review report of the Medical Education Unit.' },
]

export default function MeuPage() {
  return (
    <CommitteePageLayout
      name={committee.name}
      eyebrow="Medical Education Unit"
      intro={committee.intro}
      purpose={committee.purpose}
      members={members}
      infoRows={infoRows}
      documents={documents}
    />
  )
}
