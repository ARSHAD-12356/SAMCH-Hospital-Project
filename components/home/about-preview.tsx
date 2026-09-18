'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  UsersRound,
  BookOpen,
  ChartNoAxesCombined,
  HeartHandshake,
  Play,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: UsersRound,
    title: 'Expert Faculty',
    description: 'Experienced doctors and dedicated educators.',
  },
  {
    icon: BookOpen,
    title: 'Practical Training',
    description: 'Hands-on learning with modern labs and tools.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Advanced Learning',
    description: 'Up-to-date curriculum and global learning standards.',
  },
  {
    icon: HeartHandshake,
    title: 'Student Support',
    description: 'Focused guidance for academic and clinical growth.',
  },
]

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
      {/* Google font for the handwriting text */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@700&display=swap');
        .font-handwriting {
          font-family: 'Caveat', 'Dancing Script', cursive, sans-serif;
        }
      `}</style>

      {/* ═══ BACKGROUND DECORATIONS ════════════════════════════════ */}
      {/* Soft light teal/cyan flowing waves at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[180px] sm:h-[220px] lg:h-[260px] overflow-hidden"
      >
        <svg
          className="absolute bottom-0 left-0 w-full h-full object-cover min-w-[1000px] opacity-70"
          viewBox="0 0 1440 360"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 240 C 250 180, 500 320, 850 260 C 1150 210, 1350 290, 1550 270 L 1550 360 L -100 360 Z"
            fill="url(#wave-grad-1)"
          />
          <path
            d="M-100 280 C 300 220, 600 340, 950 290 C 1200 250, 1400 320, 1550 300 L 1550 360 L -100 360 Z"
            fill="url(#wave-grad-2)"
          />
          <path
            d="M-100 310 C 200 270, 700 350, 1100 310 C 1300 290, 1450 330, 1550 320 L 1550 360 L -100 360 Z"
            fill="url(#wave-grad-3)"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9EDF2" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#E2F5F8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C2EBF0" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B3E6EE" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#D4F0F4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A8DEE6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9BDCE6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#C6EEF4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#87D2DD" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle dot matrix grid on the bottom-right */}
        <div className="absolute right-4 sm:right-10 lg:right-16 bottom-6 sm:bottom-8 z-0 grid grid-cols-6 gap-2 opacity-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="size-1.5 rounded-full bg-[#005F6B]" />
          ))}
        </div>
      </div>

      {/* ═══ MAIN CONTENT CONTAINER ════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">

          {/* ─── LEFT COLUMN: Text, Features, Buttons (col-span-6 / ~50%) ─── */}
          <div className="flex flex-col lg:col-span-6 xl:col-span-6">
            {/* Eyebrow - Single line guaranteed, SAMCH kept at the end */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="h-[2px] w-7 sm:w-8 shrink-0 bg-[#005F6B]" />
              <span className="truncate whitespace-nowrap text-[11px] sm:text-[12px] lg:text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#005F6B]">
                ABOUT SHIVAM ASHOKA MEDICAL COLLEGE AND HOSPITAL | SAMCH
              </span>
            </div>

            {/* Main Heading - Scaled down to fit on screen cleanly */}
            <h2 className="mt-3 sm:mt-3.5 max-w-[620px] font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[37px] font-bold tracking-tight text-[#0a2540] leading-[1.12]">
              Advancing Healthcare
              <br />
              Through{' '}
              <span className="text-[#005F6B]">Education,</span>
              <br />
              <span className="text-[#005F6B]">Innovation &amp; Compassion</span>
            </h2>

            {/* Description - Compact & refined */}
            <p className="mt-3 sm:mt-3.5 max-w-[600px] text-[14px] sm:text-[14.5px] lg:text-[15px] leading-[1.5] text-[#334E68]">
              Shivam Ashoka Medical College &amp; Hospital (SAMCH) is dedicated to delivering
              quality healthcare while fostering excellence in medical education. With modern
              infrastructure, advanced clinical facilities, skilled faculty, and a patient–centred
              approach, we provide an environment where future healthcare professionals learn, grow,
              and serve with confidence. Our commitment is to improve lives through compassionate
              care, continuous learning, and medical innovation.
            </p>

            {/* 4 Feature Cards in 2x2 Grid - Compact horizontal cards */}
            <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
              {features.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-[14px] border border-[#005F6B]/15 bg-white p-2.5 sm:p-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-[#005F6B]/30 hover:shadow-sm"
                  >
                    {/* Pale-teal circular icon container */}
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#E7F5F6]">
                      <IconComponent className="size-5 text-[#005F6B]" strokeWidth={2} />
                    </div>

                    {/* Title & Description */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-[15px] sm:text-[15.5px] font-semibold leading-tight text-[#0a2540]">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] sm:text-[12.5px] leading-tight text-[#4A6275]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons - Compact & on same screen */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <Link
                href="/about"
                className="inline-flex h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#005F6B] px-6 text-[14px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#004852] hover:shadow-md"
              >
                <span>Explore About SAMCH</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#video"
                className="inline-flex h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#005F6B] bg-white px-5 sm:px-6 text-[14px] font-medium text-[#005F6B] shadow-sm transition-all duration-200 hover:bg-[#E7F5F6]/60"
              >
                <span className="grid size-4.5 place-items-center rounded-full bg-[#005F6B] text-white">
                  <Play className="size-2.5 fill-white ml-0.5" />
                </span>
                <span>Watch Our Story</span>
              </Link>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Hospital Building Visual (col-span-6 / ~50%) ─── */}
          <div className="relative flex flex-col items-center justify-center lg:col-span-6 xl:col-span-6">

            {/* "Healthcare for a Better Tomorrow" - Top Right decorative script text */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-8 sm:-top-9 right-2 sm:right-6 lg:right-4 z-20 -rotate-[8deg] text-right"
            >
              <span className="font-handwriting block text-xl sm:text-2xl lg:text-[30px] font-bold leading-[1.05] tracking-wide text-[#005F6B]">
                Healthcare
                <br />
                for a Better
                <br />
                Tomorrow
              </span>
            </div>

            {/* Relative Image Wrapper */}
            <div className="relative w-full max-w-[520px] lg:max-w-[580px]">

              {/* Decorative Teal Shape Behind Image (Offset bottom & right) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 z-0 h-[45%] w-[65%] rounded-[24px] sm:rounded-[32px] bg-[#005F6B]"
              />

              {/* Hospital Image Card */}
              <div className="relative z-10 aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden rounded-[22px] sm:rounded-[28px] lg:rounded-[30px] bg-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.1)]">
                <Image
                  src="/Assets/SAMCH campus 2.png"
                  alt="Shivam Ashoka Medical College and Hospital Campus"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 580px"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
