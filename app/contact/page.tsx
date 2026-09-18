import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock, HeartPulse } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'
import { ContactForm } from '@/components/site/contact-form'
import { site } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Shivam Ashoka Medical College & Hospital (SAMCH), Patna — address, phone, email and enquiry form.',
}

const contactCards: { icon: typeof MapPin; title: string; lines: string[]; note?: string }[] = [
  {
    icon: MapPin,
    title: 'Address',
    lines: [site.addressPlaceholder, site.location],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: [site.phonePlaceholder, 'Office hours: Mon–Sat, 9 AM–5 PM'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [site.emailPlaceholder, 'General & admission enquiries'],
  },
  {
    icon: HeartPulse,
    title: 'Emergency',
    lines: ['24×7 Emergency Department', '+91 9031855502 / +91 9031855501'],
  },
]

const officeHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 1:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Emergency (Hospital)', hours: '24 × 7' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch with SAMCH"
        description="Whether you have questions about admissions, academic programs or hospital services — we're here to help. Reach out through any of the channels below."
        crumbs={[{ label: 'Contact' }]}
      />

      {/* Contact cards */}
      <section className="container-px py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <card.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{card.title}</h3>
                <div className="mt-2 space-y-1">
                  {card.lines.map((line, li) => (
                    <p key={li} className={li === 0 ? 'text-sm font-medium text-foreground' : 'text-xs text-muted-foreground'}>
                      {line}
                    </p>
                  ))}
                </div>
                {card.note && <p className="mt-3 text-[0.7rem] italic text-muted-foreground/70">{card.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-px grid items-start gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <SectionHeading
              eyebrow="Enquiry"
              title="Send us a message"
              description="Fill in the form and we'll get back to you as soon as possible."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Map placeholder + office hours */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
                <div className="relative h-64 w-full bg-secondary">
                  <iframe
                    title="SAMCH Campus Location Map"
                    src="https://maps.google.com/maps?q=Belchi,+Patna,+Bihar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="border-t border-border px-5 py-4">
                  <p className="text-sm font-semibold text-foreground">{site.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{site.addressPlaceholder}</p>
                </div>
              </div>
            </Reveal>

            {/* Office hours */}
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border bg-secondary px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" aria-hidden />
                    <h3 className="text-sm font-semibold text-secondary-foreground">Office Hours</h3>
                  </div>
                </div>
                <div>
                  {officeHours.map((row, i) => (
                    <div
                      key={row.day}
                      className={`flex items-center justify-between border-b border-border px-5 py-3.5 last:border-0 ${i % 2 === 1 ? 'bg-muted/30' : ''}`}
                    >
                      <span className="text-sm font-medium text-foreground">{row.day}</span>
                      <span className="text-sm text-muted-foreground">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer a quick chat?"
        description="Use our WhatsApp Enquire Now button for faster responses on admissions and general queries."
      />
    </>
  )
}
