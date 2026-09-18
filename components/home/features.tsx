import { BookOpen, FlaskConical, HeartPulse, Microscope, Users, Building2 } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { FeatureCard } from '@/components/site/feature-card'
import { Reveal } from '@/components/site/reveal'

const features = [
  { icon: BookOpen, title: 'Quality Education', description: 'A structured, competency-based curriculum delivered by experienced faculty across all phases of study.' },
  { icon: HeartPulse, title: 'Clinical Excellence', description: 'Extensive hands-on training in a busy teaching hospital with diverse patient exposure.' },
  { icon: FlaskConical, title: 'Modern Laboratories', description: 'Well-equipped pre-clinical and para-clinical labs supporting practical learning.' },
  { icon: Microscope, title: 'Research Culture', description: 'Encouraging scientific enquiry, publications and evidence-based practice.' },
  { icon: Users, title: 'Student Support', description: 'Mentorship, counselling and a safe, inclusive campus for holistic growth.' },
  { icon: Building2, title: 'Modern Campus', description: 'Purpose-built infrastructure spanning academics, hospital and residential facilities.' },
]

export function Features() {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <div className="container-px">
        <SectionHeading
          align="center"
          eyebrow="Why SAMCH"
          title="A foundation for a successful medical career"
          description="Everything a future physician needs — rigorous academics, real clinical practice and a supportive environment — under one institution."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 70}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
