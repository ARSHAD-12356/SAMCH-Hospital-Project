import Link from 'next/link'
import Image from 'next/image'
import { Ambulance, ArrowRight, BedDouble, Microscope, Syringe } from 'lucide-react'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'

const services = [
  { icon: Ambulance, title: '24×7 Emergency & Trauma', description: 'Round-the-clock emergency and critical care services.' },
  { icon: BedDouble, title: 'Inpatient & Outpatient Care', description: 'Comprehensive OPD and IPD across specialities.' },
  { icon: Syringe, title: 'Operation Theatres', description: 'Modular OT complex for a wide range of surgeries.' },
  { icon: Microscope, title: 'Diagnostics & Imaging', description: 'Laboratory, radiology and imaging under one roof.' },
]

export function HospitalPreview() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute -left-24 top-1/2 size-80 -translate-y-1/2 rounded-full bg-primary-deep blur-3xl" aria-hidden />
      <div className="container-px relative grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            invert
            eyebrow="Teaching Hospital"
            title="Where learning meets patient care"
            description="Our teaching hospital provides students with rich, real-world clinical exposure while delivering quality, compassionate healthcare to the community it serves."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal
                key={service.title}
                delay={i * 80}
                className="rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur transition-colors hover:bg-white/10"
              >
                <service.icon className="size-6 text-white" aria-hidden />
                <h3 className="mt-3 text-base font-semibold text-white">{service.title}</h3>
                <p className="mt-1.5 text-sm/relaxed text-white/70">{service.description}</p>
              </Reveal>
            ))}
          </div>
          <Link
            href="/hospital"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-white/95 shadow-md"
          >
            Explore the hospital
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <Reveal>
          <div className="grid gap-4">
            <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src="/assets/hospital/hospital-facade.jpg"
                alt="Hospital Facade - Shivam Ashoka Medical College and Hospital"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src="/assets/hospital/emergency.jpg"
                  alt="24x7 Emergency and Trauma Department"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src="/assets/hospital/operation-theatre.jpg"
                  alt="Modular Operation Theatre Complex"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
