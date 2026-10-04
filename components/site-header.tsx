import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export function SiteHeader() {
  return (
    <>
      <div className="border-b border-[#dfe4d8] bg-[#eef3e9] px-5 py-2 text-center text-xs font-medium text-[#486150]">मोतिनगर ग्राम पंचायत डिजिटल सेवा केंद्र</div>
      <header className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-leaf text-white"><Home size={22} /></span>
          <span><span className="block font-hindi text-lg font-bold leading-tight">मोतिनगर</span><span className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#7b887d]">मेरा गांव · मेरी पहचान</span></span>
        </Link>
        <nav className="hidden gap-7 text-sm font-semibold text-[#506057] md:flex"><Link href="/">मुखपृष्ठ</Link><Link href="/about">गांव के बारे में</Link><Link href="/services">सेवाएं</Link><Link href="/help">सहायता</Link></nav>
        <Link aria-label="खोजें" href="/help" className="rounded-full p-3 text-[#4c5b51] hover:bg-white"><Search size={19} /></Link>
      </header>
    </>
  )
}
