'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/lib/site-data'
import { Logo } from './logo'
import { EnquireButton } from './enquire-button'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './brand-icons'

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Institution',
    links: [
      { label: 'About SAMCH', href: '/about' },
      { label: 'Academics', href: '/academics' },
      { label: 'Departments', href: '/departments' },
      { label: 'Hospital', href: '/hospital' },
      { label: 'Infrastructure', href: '/infrastructure' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Admissions', href: '/admissions' },
      { label: 'Attendance', href: '/attendance' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'News & Notices', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Committees',
    links: [
      { label: 'Anti-Ragging Committee', href: '/committee/anti-ragging' },
      { label: 'Curriculum Committee', href: '/committee/curriculum' },
      { label: 'Gender Harassment Committee', href: '/committee/gender-harassment' },
      { label: 'MEU', href: '/committee/meu' },
      // { label: 'Mandatory Disclosure', href: '/mandatory-disclosure' },
    ],
  },
]

const socials = [
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
]

export function SiteFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="mt-24 bg-primary-deep text-primary-foreground">
      {/* CTA band */}
      <div className="container-px">
        <div className="-mt-16 rounded-3xl border border-border bg-white px-6 py-10 text-foreground shadow-2xl sm:px-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Begin your journey in medicine with SAMCH</h2>
            <p className="mt-2 max-w-xl text-sm/relaxed text-muted-foreground">
              Reach out to our admissions team for programs, eligibility and campus information.
            </p>
          </div>
          <div className="mt-6 shrink-0 md:mt-0">
            <EnquireButton variant="primary" size="lg" label="Enquire Now" />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-px grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.75fr_1fr_1fr_1fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-5 max-w-sm text-sm/relaxed text-white/80">
            {site.name} ({site.shortName}) is committed to excellence in medical education, clinical training,
            research and compassionate patient care.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white" aria-hidden />
              {site.addressPlaceholder}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-white" aria-hidden />
              {site.phonePlaceholder}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-white" aria-hidden />
              {site.emailPlaceholder}
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-serif text-base font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <s.icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/50">{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
