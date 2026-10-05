import type { Metadata } from 'next'
import './globals.css'
import { PortalFloatingSuite } from '@/components/portal-floating-suite'
import { PortalPreloader } from '@/components/portal-preloader'

export const metadata: Metadata = {
  title: 'Moti Nagar - Bundi, Rajasthan | Official Village Portal',
  description: 'Moti Nagar, Bundi, Rajasthan - संस्कृति, विकास और एकता का प्रतीक | ग्राम पंचायत आधिकारिक डिजिटल सेवा केंद्र',
  icons: {
    icon: '/favicon.svg',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#f6f8fb] text-[#1e293b] antialiased">
        <PortalPreloader />
        {children}
        <PortalFloatingSuite />
      </body>
    </html>
  )
}

