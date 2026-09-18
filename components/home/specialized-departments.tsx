import Link from 'next/link'
import {
  Stethoscope,
  Scissors,
  Bone,
  Baby,
  PersonStanding,
  Ear,
  Eye,
  Hand,
  Syringe,
} from 'lucide-react'

const departments = [
  {
    icon: Stethoscope,
    name: 'General Medicine',
    desc: 'Complete medical care',
    href: '/departments/general-medicine',
  },
  {
    icon: Scissors,
    name: 'General Surgery',
    desc: 'Advanced surgical procedures',
    href: '/departments/general-surgery',
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    desc: 'Bone and joint care',
    href: '/departments/orthopaedics',
  },
  {
    icon: Baby,
    name: 'Paediatrics',
    desc: 'Child healthcare services',
    href: '/departments/paediatrics',
  },
  {
    icon: PersonStanding,
    name: 'Gynaecology',
    desc: "Women's healthcare support",
    href: '/departments/obstetrics-gynaecology',
  },
  {
    icon: Ear,
    name: 'ENT Department',
    desc: 'Ear nose throat care',
    href: '/departments/ent',
  },
  {
    icon: Eye,
    name: 'Ophthalmology',
    desc: 'Advanced eye treatment',
    href: '/departments/ophthalmology',
  },
  {
    icon: Hand,
    name: 'Dermatology',
    desc: 'Skin and hair care',
    href: '/departments/dermatology',
  },
  {
    icon: Syringe,
    name: 'Anaesthesiology',
    desc: 'Safe anesthesia support',
    href: '/departments/anaesthesiology',
  },
]

export function SpecializedDepartments() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #2563eb 100%)' }}
    >
      {/* ── Section header ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
            Specialized Departments
          </p>
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-[2.6rem]">
            Our Clinical Excellence
          </h2>
          {/* Blue underline bar */}
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-300/60" />
        </div>

        {/* ── Department cards grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => {
            const Icon = dept.icon
            return (
              <div
                key={dept.name}
                className="group relative overflow-hidden rounded-2xl p-6 transition-transform
                           duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                {/* EXPLORE ribbon — top-right diagonal */}
                <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 overflow-hidden">
                  <span
                    className="absolute right-[-24px] top-[18px] w-[110px] rotate-45 bg-white/90
                               py-0.5 text-center text-[0.55rem] font-bold uppercase tracking-widest
                               text-blue-900 shadow-sm"
                  >
                    Explore
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl
                             text-white transition-colors group-hover:bg-white/25"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <Icon size={28} strokeWidth={1.7} />
                </div>

                {/* Name */}
                <h3 className="mb-1.5 text-[1.05rem] font-bold text-white">{dept.name}</h3>

                {/* Description */}
                <p className="mb-5 text-sm text-blue-100/80">{dept.desc}</p>

                {/* View Details button */}
                <Link
                  href={dept.href}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/40
                             px-4 py-1.5 text-xs font-semibold text-white transition
                             hover:bg-white hover:text-blue-900"
                >
                  View Details
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
