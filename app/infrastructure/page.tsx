import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'
import { InfrastructureExplorer } from '@/components/site/infrastructure-explorer'

export const metadata: Metadata = {
  title: 'Infrastructure',
  description:
    'State-of-the-art academic, laboratory, hospital and campus facilities at SAMCH Patna supporting medical education and patient care.',
}

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title="A campus built for learning and healing"
        description="State-of-the-art academic, laboratory, hospital and campus facilities supporting medical education and patient care at SAMCH, Patna."
        crumbs={[{ label: 'Infrastructure' }]}
      />

      <InfrastructureExplorer />

      <CtaBand
        title="Want to know more about our campus?"
        description="Contact us to learn more about SAMCH's infrastructure, facilities and campus environment."
      />
    </>
  )
}
