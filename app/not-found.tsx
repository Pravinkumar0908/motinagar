import Link from 'next/link'

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f5ed] px-5 text-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-terracotta">404</p><h1 className="mt-3 font-hindi text-3xl font-extrabold text-[#293a30]">यह पन्ना नहीं मिला</h1><p className="mt-3 font-hindi text-sm text-[#7d897e]">शायद पता बदल गया है।</p><Link href="/" className="mt-7 inline-flex rounded-full bg-leaf px-5 py-3 text-sm font-bold text-white">मुखपृष्ठ पर जाएं</Link></div></main>
}
