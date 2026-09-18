'use client'

import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  Building2,
  HeartPulse,
  GraduationCap,
  FlaskConical,
  Users,
  Bed,
  MessageCircle,
  Play,
} from 'lucide-react'

const features = [
  { icon: GraduationCap, title: 'Competency based',     subtitle: 'medical curriculum' },
  { icon: Building2,     title: 'Modern laboratories',  subtitle: '& simulation facilities' },
  { icon: Users,         title: 'Fully-fledged',        subtitle: 'teaching hospital' },
  { icon: HeartPulse,    title: 'Focus on research &',  subtitle: 'community health' },
]

const stats = [
  { value: '1000+',  label: 'Students',         icon: BookOpen },
  { value: '150+',   label: 'Faculty Members',  icon: Users },
  { value: '850+',   label: 'Hospital Beds',    icon: Bed },
  { value: '20+',    label: 'Departments',      icon: Building2 },
  { value: 'Modern', label: 'Labs & Research',  icon: FlaskConical },
  { value: 'Better', label: 'Community Health', icon: HeartPulse },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* ═══ TWO-COLUMN HERO ═══════════════════════════════════════
          Left  45% — solid white content panel
          Right 55% — building image, sharp and clear, no overlay
      ══════════════════════════════════════════════════════════ */}
      <div className="relative flex flex-col lg:flex-row lg:min-h-[640px]">

        {/* LEFT PANEL */}
        <div
          className="relative z-10 flex flex-col justify-center bg-white
                     px-4 py-8 xs:px-6 xs:py-12 sm:px-10 lg:w-[45%] lg:flex-shrink-0 lg:py-14
                     lg:pl-16 lg:pr-10 animate-fade-up"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 xs:gap-3">
            <span className="h-px w-5 xs:w-7 bg-[#005F6B]" />
            <span className="text-[0.62rem] xs:text-[0.68rem] font-semibold uppercase tracking-[0.24em] xs:tracking-[0.28em] text-[#005F6B]">
              Welcome to SAMCH
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mt-3.5 xs:mt-4 max-w-[560px] font-serif font-semibold leading-[1.1]
                       tracking-[-0.025em] text-slate-800
                       text-[1.75rem] xs:text-[2.1rem] sm:text-[2.6rem] lg:text-[3.0rem] xl:text-[3.25rem]"
          >
            An institution built for{' '}
            <span className="text-[#005F6B]">excellence in medicine</span>
          </h1>

          {/* Description */}
          <p className="mt-4 xs:mt-5 max-w-[530px] text-[13.5px] xs:text-[15px] leading-[1.65] xs:leading-[1.7] text-slate-600 lg:text-[15.5px]">
            Shivam Ashoka Medical College &amp; Hospital is dedicated to nurturing skilled,
            ethical and compassionate healthcare professionals. Our integrated academic and
            clinical environment prepares students to serve society with confidence and care.
          </p>

          {/* Feature grid 2×2 */}
          <div className="mt-5 xs:mt-6 grid max-w-[530px] grid-cols-1 gap-x-6 gap-y-3.5 xs:gap-y-4 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="flex items-center gap-2.5 xs:gap-3">
                  <div
                    className="flex h-9 w-9 xs:h-10 xs:w-10 shrink-0 items-center justify-center
                                rounded-full bg-[#005F6B]/10 text-[#005F6B]"
                  >
                    <Icon size={18} strokeWidth={1.8} className="xs:size-5" />
                  </div>
                  <div className="text-[12.5px] xs:text-[13.5px] leading-[1.38] text-slate-700">
                    <div className="font-medium">{f.title}</div>
                    <div className="text-slate-500">{f.subtitle}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA buttons */}
          <div className="mt-6 xs:mt-7 flex flex-wrap gap-2.5 xs:gap-3">
            <a
              href="#about"
              className="inline-flex shrink-0 items-center gap-1.5 xs:gap-2 whitespace-nowrap rounded-full
                         bg-[#005F6B] px-4 py-2.5 xs:px-5 xs:py-[11px] text-xs xs:text-[13.5px] font-semibold text-white
                         transition hover:bg-[#004c56]"
            >
              Learn More About SAMCH
              <ArrowRight size={14} className="xs:size-[15px]" />
            </a>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 xs:gap-2 whitespace-nowrap rounded-full
                         border border-[#005F6B] bg-white px-4 py-2.5 xs:px-5 xs:py-[11px] text-xs xs:text-[13.5px]
                         font-semibold text-[#005F6B] transition hover:bg-[#005F6B]/5"
            >
              <Play size={12} fill="currentColor" className="xs:size-[13px]" />
              Watch Video
            </button>
          </div>
        </div>

        {/* RIGHT PANEL — building image, desktop */}
        <div className="relative hidden lg:block lg:flex-1 animate-fade-scale">

          {/* THE IMAGE — 100% sharp, no overlay on the image itself */}
          <Image
            src="/Assets/SAMCH campus.png"
            alt="Shivam Ashoka Medical College and Hospital Campus"
            fill
            priority
            className="object-cover object-center"
            sizes="55vw"
          />

          {/* Left edge soft blend (white→transparent, 10% width only).
              This blends the white left panel into the image seamlessly
              WITHOUT touching the image opacity/brightness itself. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[12%]"
            style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
          />

          {/* Bottom fade for stats card overlap — subtle, ~25% height */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]"
            style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.6), transparent)' }}
          />

          {/* Healthcare decorative text — upper-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-7 top-7 z-10 rotate-[-5deg] text-right text-[#005F6B]"
          >
            <div className="font-serif text-[1.05rem] italic leading-snug opacity-80">
              Healthcare
              <br />
              for a Better
              <br />
              Tomorrow
            </div>
            <div className="mt-0.5 text-lg opacity-50">〰〰</div>
          </div>

          {/* 24×7 badge — upper area of image */}
          <div
            className="absolute right-6 top-24 z-10 rounded-2xl bg-[#005F6B]
                       px-5 py-3 text-white shadow-lg"
          >
            <div className="font-serif text-xl font-bold leading-none">24×7</div>
            <div className="mt-0.5 text-[11px] text-white/80">Emergency Care</div>
          </div>
        </div>

        {/* Mobile building image — below content, full-width, sharp */}
        <div className="relative block h-[220px] w-full overflow-hidden sm:h-[280px] lg:hidden animate-fade-scale">
          <Image
            src="/Assets/SAMCH campus.png"
            alt="Shivam Ashoka Medical College and Hospital Campus"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ═══ TEAL WAVE CURVE — bottom-left, sits behind stats card ═══ */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-0 z-10 hidden h-20 w-[44%]
                   overflow-hidden lg:block"
      >
        <div className="absolute -bottom-14 -left-4 h-36 w-[115%] rounded-[50%] bg-[#005F6B]" />
      </div>

      {/* ═══ STATISTICS CARD — overlaps hero/wave bottom ═══════════ */}
      <div
        className="relative z-20 mx-auto -mt-1 w-[calc(100%-16px)] max-w-[1280px]
                   pb-4 sm:w-[calc(100%-40px)] lg:-mt-10 lg:pb-8 animate-fade-up"
        style={{ animationDelay: '150ms' }}
      >
        <div
          className="grid overflow-hidden rounded-[18px] border border-slate-200
                     bg-white shadow-[0_10px_36px_rgba(0,95,107,0.12)]
                     grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`flex items-center gap-2.5 xs:gap-3 px-3 py-3 xs:px-4 xs:py-4 lg:px-5 ${
                  index % 2 === 1 ? 'border-l border-slate-100' : ''
                } ${index >= 2 ? 'border-t border-slate-100 sm:border-t-0' : ''}`}
              >
                <div
                  className="flex h-8 w-8 xs:h-10 xs:w-10 shrink-0 items-center justify-center
                              rounded-full bg-[#005F6B]/10 text-[#005F6B]"
                >
                  <Icon size={16} strokeWidth={1.8} className="xs:size-[18px]" />
                </div>
                <div>
                  <div className="text-[0.95rem] xs:text-[1.1rem] font-bold leading-none text-slate-800">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] xs:text-[11px] text-slate-500">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

