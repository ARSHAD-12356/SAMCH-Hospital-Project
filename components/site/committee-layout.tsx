import Link from 'next/link'
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { InfoTable, type InfoRow } from '@/components/site/info-table'
import { CtaBand } from '@/components/site/cta-band'

export type CommitteeMember = {
  name: string
  designation: string
  department: string
  role: string
}

export type CommitteePageProps = {
  name: string
  eyebrow: string
  intro: string
  purpose: string[]
  members: CommitteeMember[]
  infoRows?: InfoRow[]
  documents?: { label: string; note: string }[]
}

export function CommitteePageLayout({
  name,
  eyebrow,
  intro,
  purpose,
  members,
  infoRows,
  documents,
}: CommitteePageProps) {

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={name}
        description={intro}
        crumbs={[
          { label: 'Committee', href: '/committee' },
          { label: name },
        ]}
      />

      {/* Back link */}
      <div className="container-px pt-8">
        <Link
          href="/committee"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
          All Committees
        </Link>
      </div>

      {/* Purpose / Key Functions */}
      <section className="container-px py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Key Functions"
              title="Role &amp; responsibilities"
              description="The committee operates in accordance with institutional policies and regulatory guidelines."
            />
            <ul className="mt-8 space-y-4">
              {purpose.map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="flex items-start gap-3 text-sm/relaxed text-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Info rows if any */}
          {infoRows && infoRows.length > 0 && (
            <Reveal>
              <div className="overflow-x-auto">
                <InfoTable rows={infoRows} caption="Committee Information" />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Members */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-px">
          <SectionHeading
            align="center"
            eyebrow="Composition"
            title="Committee members"
            description="Appointed faculty members and administrative representatives for this committee."
          />
          <div className="mt-10 overflow-x-auto">
            <div className="min-w-[540px] overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border bg-secondary px-5 py-3.5">
                <div className="grid grid-cols-4 gap-4 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
                  <span>Name</span>
                  <span>Designation</span>
                  <span>Department</span>
                  <span>Role</span>
                </div>
              </div>
              <div>
                {members.map((m, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 gap-4 border-b border-border px-5 py-4 last:border-0 ${i % 2 === 1 ? 'bg-muted/40' : ''}`}
                  >
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                    <span className="text-sm text-muted-foreground">{m.designation}</span>
                    <span className="text-sm text-muted-foreground">{m.department}</span>
                    <span className="text-sm font-medium text-primary">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents / Links */}
      {documents && documents.length > 0 && (
        <section className="container-px py-16 sm:py-20">
          <SectionHeading
            eyebrow="Documents"
            title="Relevant documents &amp; links"
            description="Official documents, policies and resources related to this committee."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md hover:shadow-primary/5">
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
      )}

      <CtaBand
        title="Questions or concerns?"
        description="Reach out to the institution through the official communication channels for committee-related queries."
      />
    </>
  )
}
