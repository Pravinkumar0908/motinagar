import { ArrowRight, Bell } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SectionHeading } from '@/components/section-heading'
import { villageNotices } from '@/lib/site-data'

export default function NoticesPage() {
  return <main className="min-h-screen bg-[#f7f5ed] text-ink"><SiteHeader /><section className="mx-auto max-w-[900px] px-5 pb-20 pt-12 lg:pt-20"><SectionHeading eyebrow="सूचना केंद्र" title="गांव की खबर, सीधे आप तक" description="शिविर, बैठक, स्वास्थ्य दिवस और खेती से जुड़ी नई सूचनाएं यहां मिलेंगी।" /><div className="mt-12 space-y-3">{villageNotices.map(({ date, title, meta, urgent }) => <article key={title} className="flex items-center gap-4 rounded-2xl border border-[#dce5d8] bg-white p-4 sm:p-5"><div className="w-16 shrink-0 text-center"><div className={`text-xs font-bold ${urgent ? 'text-terracotta' : 'text-leaf'}`}>{date}</div><div className="mx-auto mt-2 h-1 w-5 rounded-full bg-[#d7e2d2]" /></div><div className="flex-1 border-l border-[#e2e8df] pl-4"><h2 className="font-hindi text-sm font-bold text-[#384b3d] sm:text-base">{title}</h2><p className="mt-1 font-hindi text-xs text-[#839085]">{meta}</p></div><ArrowRight size={17} className="text-[#a0afa1]" /></article>)}</div><div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#eaf0e5] p-5 font-hindi text-sm text-[#526557]"><Bell size={19} className="text-terracotta" /> नई सूचना जोड़ने के लिए पंचायत कार्यालय से संपर्क करें।</div></section><SiteFooter /></main>
}
