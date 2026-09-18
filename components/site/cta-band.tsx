import { EnquireButton } from './enquire-button'
import { Reveal } from './reveal'

export function CtaBand({
  title = 'Have questions about admissions or courses?',
  description = 'Our team is ready to guide you through programs, eligibility and the enrolment process at SAMCH.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="container-px py-16 sm:py-20">
      <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-14">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-primary-deep blur-3xl" aria-hidden />
        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-pretty text-white/75">{description}</p>
          </div>
          <EnquireButton size="lg" variant="white" className="shrink-0" />
        </div>
      </Reveal>
    </section>
  )
}
