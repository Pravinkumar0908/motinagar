import type { Metadata } from 'next'
import { DM_Sans, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-dm-sans' })
const noto = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '500', '600', '700', '800'], variable: '--font-noto-devanagari' })

export const metadata: Metadata = {
  title: 'Moti Nagar - Bundi, Rajasthan | Official Village Portal',
  description: 'Moti Nagar, Bundi, Rajasthan - संस्कृति, विकास और एकता का प्रतीक | ग्राम पंचायत आधिकारिक डिजिटल सेवा केंद्र',
}

import { PortalFloatingSuite } from '@/components/portal-floating-suite'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body className={`${dmSans.variable} ${noto.variable} font-sans bg-[#f6f8fb] text-[#1e293b] antialiased`}>
        {children}
        <PortalFloatingSuite />
      </body>
    </html>
  )
}
