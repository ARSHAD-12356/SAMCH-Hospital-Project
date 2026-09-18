'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  GraduationCap,
  Building2,
  Clock,
  Stethoscope,
  Syringe,
  BriefcaseMedical,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FacultyDoctor {
  id: string
  name: string
  department: string
  designation: string
  hospital: string
  experience: string
  iconType: 'stethoscope' | 'syringe' | 'medical-bag'
  image: string
}

export const facultyDoctors: FacultyDoctor[] = [
  {
    id: 'dr-ankita-ranjan',
    name: 'Dr. Ankita Ranjan',
    department: 'OBG',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '6+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Ankita-Ranjan.webp',
  },
  {
    id: 'dr-heera',
    name: 'Dr. Heera',
    department: 'Dental',
    designation: 'Associate Professor',
    hospital: 'SAMCH',
    experience: '10+ Years',
    iconType: 'medical-bag',
    image: '/assets/faculty/Dr-Heera.webp',
  },
  {
    id: 'dr-jitendra-kumar',
    name: 'Dr. Jitendra Kumar',
    department: 'Pharmacology',
    designation: 'Professor',
    hospital: 'SAMCH',
    experience: '14+ Years',
    iconType: 'syringe',
    image: '/assets/faculty/Dr-Jitendra-Kumar.webp',
  },
  {
    id: 'dr-md-mehtab-alam',
    name: 'Dr. Md Mehtab Alam',
    department: 'Medicine',
    designation: 'Senior Resident',
    hospital: 'SAMCH',
    experience: '4+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Md-Mehtab-Alam.webp',
  },
  {
    id: 'dr-pankaj-arora',
    name: 'Dr. Pankaj Arora',
    department: 'Anaesthesia',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '5+ Years',
    iconType: 'medical-bag',
    image: '/assets/faculty/Dr-Pankaj-Arora.webp',
  },
  {
    id: 'dr-pankaj-kumar-jha',
    name: 'Dr. Pankaj Kumar Jha',
    department: 'Pathology',
    designation: 'Senior Resident',
    hospital: 'SAMCH',
    experience: '4+ Years',
    iconType: 'syringe',
    image: '/assets/faculty/Dr-Pankaj-Kumar-Jha.webp',
  },
  {
    id: 'dr-pratyush-kumar',
    name: 'Dr. Pratyush Kumar',
    department: 'ENT',
    designation: 'Senior Resident',
    hospital: 'SAMCH',
    experience: '5+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Pratyush-Kumar.webp',
  },
  {
    id: 'dr-radha-sharma',
    name: 'Dr. Radha Sharma',
    department: 'Darma',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '7+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Radha-Sharma.webp',
  },
  {
    id: 'dr-santosh',
    name: 'Dr. Santosh',
    department: 'General Medicine',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '8+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Santosh.webp',
  },
  {
    id: 'dr-santosh-kumar',
    name: 'Dr. Santosh Kumar',
    department: 'Anaesthesia',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '6+ Years',
    iconType: 'syringe',
    image: '/assets/faculty/Dr-Santosh-Kumar.webp',
  },
  {
    id: 'dr-soni',
    name: 'Dr. Soni',
    department: 'OBG',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '6+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Soni.webp',
  },
  {
    id: 'dr-sunny-kumari',
    name: 'Dr. Sunny Kumari',
    department: 'Pathology',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '5+ Years',
    iconType: 'syringe',
    image: '/assets/faculty/Dr-Sunny-Kumari.png',
  },
  {
    id: 'dr-tanul-jain',
    name: 'Dr. Tanul jain',
    department: 'Psychiatry',
    designation: 'Senior Resident',
    hospital: 'SAMCH',
    experience: '4+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Tanul-jain.jpg',
  },
  {
    id: 'dr-tohfa-haque',
    name: 'Dr. Tohfa Haque',
    department: 'Pathology',
    designation: 'Senior Resident',
    hospital: 'SAMCH',
    experience: '4+ Years',
    iconType: 'syringe',
    image: '/assets/faculty/Dr-Tohfa-Haque.webp',
  },
  {
    id: 'dr-tushar-tyagi',
    name: 'Dr. Tushar Tyagi',
    department: 'General Medicine',
    designation: 'Assistant Professor',
    hospital: 'SAMCH',
    experience: '7+ Years',
    iconType: 'stethoscope',
    image: '/assets/faculty/Dr-Tushar-Tyagi.jpg',
  },
]

function SpecialtyBadgeIcon({ type }: { type: FacultyDoctor['iconType'] }) {
  switch (type) {
    case 'syringe':
      return <Syringe className="size-4.5 stroke-[2] text-primary" />
    case 'medical-bag':
      return <BriefcaseMedical className="size-4.5 stroke-[2] text-primary" />
    case 'stethoscope':
    default:
      return <Stethoscope className="size-4.5 stroke-[2] text-primary" />
  }
}

export function FacultySection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  const scrollToPage = (pageIndex: number) => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const scrollWidth = container.scrollWidth - container.clientWidth
    if (scrollWidth <= 0) return
    const target = (pageIndex / 3) * scrollWidth
    container.scrollTo({ left: target, behavior: 'smooth' })
    setActiveDot(pageIndex)
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    window.requestAnimationFrame(() => {
      const container = scrollRef.current
      if (!container) return
      const scrollWidth = container.scrollWidth - container.clientWidth
      if (scrollWidth <= 0) return
      const progress = container.scrollLeft / scrollWidth
      const page = Math.min(Math.max(Math.round(progress * 3), 0), 3)
      setActiveDot((prev) => (prev !== page ? page : prev))
    })
  }

  const prevSlide = () => {
    scrollToPage((activeDot - 1 + 4) % 4)
  }

  const nextSlide = () => {
    scrollToPage((activeDot + 1) % 4)
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white">
      {/* Background Ambience & Pattern Accents */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-emerald-100/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-teal-100/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-12 right-6 hidden md:block opacity-[0.25]"
        aria-hidden
      >
        <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
          <pattern
            id="faculty-dots-pattern"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" className="fill-primary" />
          </pattern>
          <rect width="120" height="120" fill="url(#faculty-dots-pattern)" />
        </svg>
      </div>

      <div className="container-px">
        {/* Top Header Row matching reference */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px w-6 bg-slate-400" />
              MEET OUR FACULTY
            </div>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our <span className="text-primary">World-Class</span> Specialists
            </h2>
            <p className="mt-4 text-base/relaxed text-muted-foreground">
              Experienced educators, dedicated clinicians and compassionate mentors
              committed to shaping the next generation of healthcare professionals.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-deep hover:shadow-md active:scale-95"
            >
              <Calendar className="size-4" />
              <span>Book Appointment</span>
              <ArrowRight className="size-4" />
            </Link>

            {/* Floating stats card matching reference */}
            <div className="flex items-center gap-5 rounded-2xl border border-border/80 bg-card/90 px-5 py-3 shadow-xs backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-primary">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="text-base font-bold leading-tight text-slate-900">100+</p>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    Expert Faculty Members
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-border/80" />

              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-primary">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <p className="text-base font-bold leading-tight text-primary">
                    Excellence
                  </p>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    In Education & Care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel / Navigation Container */}
        <div className="relative mt-12 sm:mt-14">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous faculty"
            className="absolute -left-3 sm:-left-5 top-[48%] -translate-y-1/2 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-slate-200/80 hover:bg-slate-50 hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <ChevronLeft className="size-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next faculty"
            className="absolute -right-3 sm:-right-5 top-[48%] -translate-y-1/2 z-20 flex size-11 sm:size-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md border border-slate-200/80 hover:bg-slate-50 hover:text-primary transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <ChevronRight className="size-5 stroke-[2.5]" />
          </button>

          {/* Carousel Track: shows 4 cards on desktop, 2 on tablet, 1 on mobile */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {facultyDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="w-[82vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg">
                  {/* Doctor Photo */}
                  <div className="relative aspect-[4/3.3] w-full overflow-hidden rounded-t-3xl bg-slate-100">
                    {/* Floating specialty icon badge */}
                    <div className="absolute top-3.5 right-3.5 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-xs border border-primary/10 backdrop-blur-xs">
                      <SpecialtyBadgeIcon type={doctor.iconType} />
                    </div>

                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) calc(50vw - 24px), calc(25vw - 24px)"
                    />
                  </div>

                  {/* Card Content Format: Name, Department, Designation */}
                  <div className="flex flex-1 flex-col p-5 bg-white rounded-b-3xl">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 line-clamp-1">
                      {doctor.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {doctor.department}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {doctor.designation}
                    </p>

                    {/* Bottom strip: Hospital and Experience */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Building2 className="size-3.5 text-slate-400" />
                        <span>{doctor.hospital}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-slate-400" />
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Pagination indicator dots matching reference */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {[0, 1, 2, 3].map((dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => scrollToPage(dotIdx)}
                aria-label={`Go to slide page ${dotIdx + 1}`}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                  activeDot === dotIdx
                    ? 'w-7 bg-primary'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
