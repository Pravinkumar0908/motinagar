import type { Metadata } from 'next'
import { DM_Sans, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { PortalFloatingSuite } from '@/components/portal-floating-suite'
import { PortalPreloader } from '@/components/portal-preloader'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-dm-sans' })
const noto = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600', '700', '800'], variable: '--font-noto-devanagari' })

export const metadata: Metadata = {
  title: 'Moti Nagar - Bundi, Rajasthan | Official Village Portal',
  description: 'Moti Nagar, Bundi, Rajasthan - संस्कृति, विकास और एकता का प्रतीक | ग्राम पंचायत आधिकारिक डिजिटल सेवा केंद्र',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#064e3b" />
      </head>
      <body className={`${dmSans.variable} ${noto.variable} font-sans bg-[#f6f8fb] text-[#1e293b] antialiased`}>
        <PortalPreloader />
        {children}
        <PortalFloatingSuite />
      </body>
    </html>
  )
}

