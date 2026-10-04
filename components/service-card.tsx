import { ArrowRight } from 'lucide-react'
import type { VillageService } from '@/lib/site-data'

export function ServiceCard({ service }: { service: VillageService }) {
  const Icon = service.icon
  return <article className="group rounded-2xl border border-[#e1e6de] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#b7ccb0] hover:shadow-xl"><div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${service.tone} text-leaf`}><Icon size={23} /></div><span className="rounded-full bg-[#f1f4ee] px-2.5 py-1 text-[10px] font-bold text-[#6a796d]">{service.tag}</span><h2 className="mt-4 font-hindi text-base font-bold text-[#2e4034]">{service.title}</h2><p className="mt-2 font-hindi text-sm leading-6 text-[#7d897e]">{service.text}</p><button className="mt-5 flex items-center gap-1 text-xs font-bold text-leaf">विस्तार से देखें <ArrowRight size={14} className="transition group-hover:translate-x-1" /></button></article>
}
