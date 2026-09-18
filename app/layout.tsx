import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Lora } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { EnquireFloating } from '@/components/site/enquire-floating'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'SAMCH Patna | Shivam Ashoka Medical College & Hospital',
    template: '%s | SAMCH Patna',
  },
  description:
    'Shivam Ashoka Medical College & Hospital (SAMCH), Patna — an institution dedicated to medical education, clinical training, research and compassionate healthcare.',
  keywords: [
    'SAMCH',
    'Shivam Ashoka Medical College',
    'Medical College Patna',
    'MBBS Bihar',
    'Teaching Hospital Patna',
  ],
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#005F6B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <EnquireFloating />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
