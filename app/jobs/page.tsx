'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Briefcase,
  Search,
  CheckCircle2,
  Calendar,
  Users,
  Download,
  IndianRupee,
  Building,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

const mgnregaWorks = [
  { name: 'तालाब गहरीकरण एवं पाल निर्माण', location: 'मोती नगर नया तालाब (खसरा 118)', workers: 45, dailyWage: '₹266 / दिन', status: 'कार्य प्रगति पर' },
  { name: 'ग्रेवल सड़क निर्माण (चौपाल से स्कूल मार्ग)', location: 'वार्ड सं. 03 एवं 04', workers: 32, dailyWage: '₹266 / दिन', status: 'मस्टररोल जारी' },
  { name: 'पौधारोपण एवं मेड़बंदी कार्य', location: 'चरागाह भूमि मोती नगर', workers: 28, dailyWage: '₹266 / दिन', status: 'स्वीकृत' },
]

const rsetiTrainings = [
  { title: 'सोलर पैनल स्थापना एवं अनुरक्षण', duration: '30 दिन', stipend: 'निःशुल्क + आवास', org: 'RSETI बूँदी' },
  { title: 'डेयरी फार्मिंग एवं पशुपालन प्रबंधन', duration: '15 दिन', stipend: 'प्रमाण पत्र युक्त', org: 'कृषि विज्ञान केंद्र' },
  { title: 'महिला सिलाई एवं बुटीक प्रशिक्षण', duration: '45 दिन', stipend: 'मुफ्त किट', org: 'आजीविका मिशन (SRLM)' },
  { title: 'मोबाइल रिपेयरिंग एवं हार्डवेयर', duration: '30 दिन', stipend: 'रोजगार मेला संबद्ध', org: 'कौशल विकास केंद्र' },
]

export default function JobsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [jobCardNumber, setJobCardNumber] = useState('RJ-08-004-012/104')
  const [jobResult, setJobResult] = useState<any>({
    number: 'RJ-08-004-012/104',
    headName: 'प्रवीण कुमार (Pravin Kumar)',
    daysWorked: '68 / 100 दिन पूर्ण',
    wageDue: '₹0.00 (समस्त भुगतान बैंक खाते में अंतरित)',
    currentMusterRoll: 'MR-9418 (तालाब गहरीकरण कार्य)',
  })

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="jobs"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Employment" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Job & Opportunities</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Employment & Livelihood Hub (रोजगार एवं स्वरोजगार केंद्र)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - महात्मा गांधी नरेगा कार्य, मस्टररोल स्थिति, कौशल विकास प्रशिक्षण (RSETI) एवं स्थानीय रोजगार अवसर।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
                ⚒️ मनरेगा 100 दिन रोजगार गारंटी
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ प्रतिदिन मजदूरी ₹266
              </span>
            </div>
          </div>

          {/* MGNREGA Job Card Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-amber-600" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  जॉब कार्ड विवरण व मस्टररोल हाजिरी जांचें (Track MGNREGA Job Card)
                </h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="जॉब कार्ड सं. दर्ज करें"
                  value={jobCardNumber}
                  onChange={(e) => setJobCardNumber(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-amber-500 font-mono w-48"
                />
                <button
                  onClick={() => alert('जॉब कार्ड विवरण अद्यतन है।')}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  खोजें
                </button>
              </div>
            </div>

            {jobResult && (
              <div className="mt-4 p-5 rounded-2xl bg-amber-50/40 border border-amber-200/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500">श्रमिक का नाम:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">{jobResult.headName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full font-mono">
                      {jobResult.number}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <div className="text-slate-400 font-medium">कार्य दिवस (चालू वित्तीय वर्ष):</div>
                    <div className="font-extrabold text-emerald-800 text-sm mt-0.5">{jobResult.daysWorked}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <div className="text-slate-400 font-medium">बकाया मजदूरी स्थिति:</div>
                    <div className="font-bold text-slate-800 mt-0.5">{jobResult.wageDue}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-100">
                    <div className="text-slate-400 font-medium">वर्तमान कार्य स्थल / मस्टररोल:</div>
                    <div className="font-bold text-slate-800 mt-0.5">{jobResult.currentMusterRoll}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current Works + Skill Trainings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Works in village */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>मोती नगर में चालू नरेगा कार्य</span>
                <span className="text-xs text-emerald-700 font-bold">मजदूरी: ₹266/दिन</span>
              </div>
              <div className="space-y-2.5">
                {mgnregaWorks.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-900 font-hindi">{w.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{w.location} • {w.workers} श्रमिक</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Trainings */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>युवा कौशल प्रशिक्षण केंद्र (RSETI)</span>
                <span className="text-xs text-blue-700 font-bold">निःशुल्क प्रशिक्षण</span>
              </div>
              <div className="space-y-2.5">
                {rsetiTrainings.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-blue-950 font-hindi">{t.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{t.duration} • {t.org}</div>
                    </div>
                    <button
                      onClick={() => alert('प्रशिक्षण पंजीकरण दर्ज हुआ।')}
                      className="px-3 py-1 bg-[#1976D2] hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition"
                    >
                      आवेदन करें
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
