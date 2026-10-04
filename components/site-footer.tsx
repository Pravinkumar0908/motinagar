import Link from 'next/link'
import { Home } from 'lucide-react'

export function SiteFooter() {
  return <footer className="bg-[#243b2f] text-[#d7e2d5]"><div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10"><div><Link href="/" className="flex items-center gap-2 text-white"><Home size={19} /><span className="font-hindi font-bold">मोतिनगर</span></Link><p className="mt-3 font-hindi text-xs text-[#a3b6a5]">अपना गांव, अपनी आवाज़।</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#b3c3b3]"><Link href="/about">हमारे बारे में</Link><Link href="/help">सुझाव दें</Link><Link href="/help">संपर्क करें</Link><Link href="/">गोपनीयता</Link></div><p className="text-[11px] text-[#8ba18d]">© 2024 मोतिनगर ग्राम पंचायत</p></div></footer>
}
