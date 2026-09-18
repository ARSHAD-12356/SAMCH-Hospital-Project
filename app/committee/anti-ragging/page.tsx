import type { Metadata } from 'next'
import { CommitteePageLayout } from '@/components/site/committee-layout'
import { committees } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Anti-Ragging Committee',
  description:
    'SAMCH Anti-Ragging Committee — zero-tolerance policy, composition and complaint procedure.',
}

const committee = committees.find((c) => c.slug === 'anti-ragging')!

const members = [
  { name: 'Dr. Tushar Tyagi', designation: 'Professor', department: 'General Medicine', role: 'Chairperson' },
  { name: 'Dr. Santosh Kumar', designation: 'Assistant Professor', department: 'Anaesthesia', role: 'Member Secretary' },
  { name: 'Dr. Radha Sharma', designation: 'Assistant Professor', department: 'Dermatology', role: 'Member' },
  { name: 'Dr. Pankaj Arora', designation: 'Assistant Professor', department: 'Anaesthesia', role: 'Member' },
  { name: 'Mr. Rajesh Sharma', designation: 'Administrative Officer', department: 'Administration', role: 'Member' },
  { name: 'Mr. Amit Kumar', designation: 'Warden, Boys Hostel', department: 'Hostel Administration', role: 'Member' },
  { name: 'Mrs. Sunita Verma', designation: 'Warden, Girls Hostel', department: 'Hostel Administration', role: 'Member' },
  { name: 'Rahul Anand', designation: 'Student Representative', department: 'MBBS Batch', role: 'Student Member' },
]

const infoRows = [
  { label: 'Committee Type', value: 'Statutory / Regulatory' },
  { label: 'Established Under', value: 'UGC Anti-Ragging Regulations / MCI/NMC Guidelines' },
  { label: 'Complaint Helpline', value: '+91 9031855501 / +91 9031855502' },
  { label: 'Email Helpline', value: 'antiragging@samchpatna.com' },
  { label: 'UGC Helpline', value: '1800-180-5522 (National Anti-Ragging Helpline)' },
  { label: 'Complaint Mode', value: 'Written / Online / Phone (Strictly Confidential)' },
  { label: 'Meeting Frequency', value: 'As required / minimum once per semester' },
]

const documents = [
  { label: 'Anti-Ragging Policy', note: 'Institutional anti-ragging guidelines and statutory code of conduct.' },
  { label: 'Complaint Form', note: 'Standard confidential grievance and complaint submission format.' },
  { label: 'UGC Regulations', note: 'National UGC Regulations on Curbing the Menace of Ragging (2009).' },
]

export default function AntiRaggingPage() {
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
