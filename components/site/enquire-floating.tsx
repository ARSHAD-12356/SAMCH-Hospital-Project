'use client'

import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { whatsappHref, site } from '@/lib/site-data'

/**
 * Floating Enquire Action Button:
 * Circle icon button in rest state that smoothly expands to a long "Enquire Now" pill on hover.
 */
export function EnquireFloating() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-12 sm:h-14 min-w-12 sm:min-w-14 items-center justify-center rounded-full bg-[#005F6B] text-white shadow-xl shadow-[#005F6B]/40 transition-all duration-300 ease-out hover:bg-[#00434C] hover:shadow-2xl hover:shadow-[#005F6B]/60 hover:px-5 sm:hover:px-6 active:scale-95 border border-white/20"
    >
      <MessageCircle className="size-5 sm:size-6 shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden />
      
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide opacity-0 transition-all duration-300 ease-out group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2.5">
        Enquire Now
      </span>

      <span className="sr-only">Contact {site.shortName} on WhatsApp</span>
    </a>
  )
}

