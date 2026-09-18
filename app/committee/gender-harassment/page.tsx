import type { Metadata } from 'next'
import { CommitteePageLayout } from '@/components/site/committee-layout'
import { committees } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Gender Harassment Committee',
  description:
    'SAMCH Gender Harassment Committee — prevention, awareness and redressal of gender-based harassment on campus.',
}

const committee = committees.find((c) => c.slug === 'gender-harassment')!

const members = [
  { name: 'Dr. Ankita Ranjan', designation: 'Assistant Professor', department: 'Obstetrics & Gynaecology', role: 'Presiding Officer' },
  { name: 'Dr. Soni', designation: 'Assistant Professor', department: 'Obstetrics & Gynaecology', role: 'Member Secretary' },
  { name: 'Dr. Tanul Jain', designation: 'Senior Resident', department: 'Psychiatry', role: 'Member' },
  { name: 'Dr. Tohfa Haque', designation: 'Senior Resident', department: 'Pathology', role: 'Member' },
  { name: 'Mrs. Priya Verma', designation: 'Administrative Officer', department: 'Administration', role: 'Member' },
  { name: 'Adv. Meenakshi Sinha', designation: 'External Expert', department: 'Legal / Social NGO', role: 'External Member' },
  { name: 'Ananya Singh', designation: 'Student Representative', department: 'MBBS Batch', role: 'Student Member' },
]

const infoRows = [
  { label: 'Committee Type', value: 'Statutory (as per POSH Act & UGC Guidelines)' },
  { label: 'Established Under', value: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013' },
  { label: 'Complaint Mode', value: 'Written / Oral — Confidential. Contact Member Secretary.' },
  { label: 'Confidentiality', value: 'All proceedings are strictly confidential' },
  { label: 'Meeting Frequency', value: 'As required / at least once per semester' },
]

const documents = [
  { label: 'Gender Harassment Policy', note: 'Institutional POSH policy and campus safety code of conduct.' },
  { label: 'Complaint Procedure', note: 'Confidential grievance redressal process and inquiry steps.' },
  { label: 'POSH Act Reference', note: 'The Sexual Harassment of Women at Workplace Act, 2013 statutory norms.' },
]

export default function GenderHarassmentPage() {
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
