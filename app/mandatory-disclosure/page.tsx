import type { Metadata } from 'next'
import { FileText, Info } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { InfoTable } from '@/components/site/info-table'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Mandatory Disclosure',
  description:
    'Official mandatory disclosure for Shivam Ashoka Medical College & Hospital (SAMCH), Patna — institutional, academic, hospital and faculty information as required by regulatory authorities.',
}

const institutionRows = [
  { label: 'Name of the Institution', value: site.name },
  { label: 'Short Name', value: site.shortName },
  { label: 'Location', value: site.location },
  { label: 'Address', value: site.addressPlaceholder },
  { label: 'Phone', value: site.phonePlaceholder },
  { label: 'Email', value: site.emailPlaceholder },
  { label: 'Website', value: site.domain },
  { label: 'Type of Institution', value: 'Private Medical College' },
  { label: 'Established', value: 'Placeholder — Year to be updated' },
]

const approvalRows = [
  { label: 'NMC Recognition Status', value: 'Placeholder — to be updated with verified information' },
  { label: 'Recognition Letter / Permit No.', value: 'Placeholder' },
  { label: 'University Affiliation', value: 'Placeholder — to be updated' },
  { label: 'MCI / NMC Approval Year', value: 'Placeholder' },
  { label: 'Last Inspection Year', value: 'Placeholder' },
  { label: 'Next Renewal Due', value: 'Placeholder' },
]

const mbbsRows = [
  { label: 'Program', value: 'Bachelor of Medicine & Bachelor of Surgery (MBBS)' },
  { label: 'Duration', value: '4.5 years + 1 year Rotatory Internship' },
  { label: 'Annual Intake (MBBS)', value: 'XXX seats (Placeholder)' },
  { label: 'Admission Mode', value: 'NEET-UG counselling through state / central authority' },
  { label: 'Postgraduate Programs', value: 'MD / MS (as applicable) — Placeholder' },
  { label: 'PG Intake', value: 'XX seats (Placeholder)' },
]

const hospitalRows = [
  { label: 'Hospital Name', value: `${site.name} — Teaching Hospital` },
  { label: 'Total Bed Strength', value: 'XXX beds (Placeholder)' },
  { label: 'OPD Capacity', value: 'Placeholder' },
  { label: 'Emergency Services', value: '24×7 Emergency & Trauma Care' },
  { label: 'Operation Theatres', value: 'XX OTs (Placeholder)' },
  { label: 'ICU / Critical Care Units', value: 'ICU, ICCU, NICU, PICU (Placeholder capacity)' },
  { label: 'Radiology & Imaging', value: 'X-ray, USG, CT scan (Placeholder)' },
  { label: 'Blood Bank', value: 'Available (Placeholder)' },
]

const facultyRows = [
  { label: 'Total Faculty', value: 'XXX (Placeholder)' },
  { label: 'Professors', value: 'XX (Placeholder)' },
  { label: 'Associate Professors', value: 'XX (Placeholder)' },
  { label: 'Assistant Professors', value: 'XX (Placeholder)' },
  { label: 'Tutors / Demonstrators', value: 'XX (Placeholder)' },
  { label: 'Non-Teaching Clinical Staff', value: 'XXX (Placeholder)' },
]

const infraRows = [
  { label: 'Total Campus Area', value: 'Placeholder — to be updated' },
  { label: 'Lecture Halls', value: 'XX (Placeholder)' },
  { label: 'Tutorial Rooms', value: 'XX (Placeholder)' },
  { label: 'Laboratories', value: 'Pre-clinical, Para-clinical & Skills Lab (Placeholder)' },
  { label: 'Central Library (Area)', value: 'Placeholder' },
  { label: 'Library Books', value: 'XXXX+ volumes (Placeholder)' },
  { label: 'Student Hostel (Boys)', value: 'Available — XXX seats (Placeholder)' },
  { label: 'Student Hostel (Girls)', value: 'Available — XXX seats (Placeholder)' },
]

const documents = [
  { label: 'NMC Approval Letter', note: 'Placeholder — to be uploaded' },
  { label: 'University Affiliation Certificate', note: 'Placeholder — to be uploaded' },
  { label: 'Registration Certificate', note: 'Placeholder — to be uploaded' },
  { label: 'Anti-Ragging Affidavit', note: 'Placeholder — to be uploaded' },
  { label: 'Fee Fixation Order', note: 'Placeholder — to be uploaded' },
  { label: 'Inspection Report', note: 'Placeholder — to be uploaded' },
]

export default function MandatoryDisclosurePage() {
  return (
    <>
      <PageHero
        eyebrow="Official Disclosure"
        title="Mandatory Disclosure"
        description="Institutional information as required under regulatory norms — National Medical Commission (NMC), Ministry of Health & Family Welfare and affiliated university."
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Mandatory Disclosure' }]}
      />

      <section className="container-px pt-12">
        <Reveal>
          <div className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm/relaxed text-foreground">
              <strong className="font-semibold">Note:</strong> The information presented on this page is
              indicative and uses placeholder values. Verified and official details will be published as per
              regulatory requirements. For official documentation, please contact the institution directly.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="container-px space-y-16 py-20">
        {/* Institutional Details */}
        <section>
          <SectionHeading
            eyebrow="Section 1"
            title="Institutional information"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={institutionRows} caption="General Institutional Details" />
          </div>
        </section>

        {/* Recognition & Approval */}
        <section>
          <SectionHeading
            eyebrow="Section 2"
            title="Recognition &amp; approvals"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={approvalRows} caption="NMC / Regulatory Approvals" />
          </div>
        </section>

        {/* Academic Programs */}
        <section>
          <SectionHeading
            eyebrow="Section 3"
            title="Academic programs"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={mbbsRows} caption="Programs & Intake" />
          </div>
        </section>

        {/* Hospital Information */}
        <section>
          <SectionHeading
            eyebrow="Section 4"
            title="Hospital information"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={hospitalRows} caption="Teaching Hospital Details" />
          </div>
        </section>

        {/* Faculty */}
        <section>
          <SectionHeading
            eyebrow="Section 5"
            title="Faculty information"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={facultyRows} caption="Faculty Strength (Indicative)" />
          </div>
        </section>

        {/* Infrastructure */}
        <section>
          <SectionHeading
            eyebrow="Section 6"
            title="Infrastructure"
          />
          <div className="mt-8 overflow-x-auto">
            <InfoTable rows={infraRows} caption="Physical Infrastructure" />
          </div>
        </section>

        {/* Documents */}
        <section>
          <SectionHeading
            eyebrow="Section 7"
            title="Important documents"
            description="Official documents and certificates. Files will be published as per regulatory requirements."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                    <FileText className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{doc.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
