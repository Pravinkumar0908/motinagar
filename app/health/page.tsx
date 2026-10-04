'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeartPulse,
  Search,
  PhoneCall,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  AlertCircle
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

const healthCamps = [
  { title: 'निशुल्क नेत्र जांच एवं मोतियाबिंद ऑपरेशन शिविर', date: '12 अक्टूबर 2026', time: 'सुबह 09:00 से दोपहर 02:00', place: 'प्राथमिक स्वास्थ्य केंद्र (PHC) मोती नगर' },
  { title: 'मातृ एवं शिशु पोषण व नियमित टीकाकरण दिवस (MND)', date: 'प्रत्येक गुरुवार (Every Thursday)', time: 'सुबह 10:00 से 01:00', place: 'समस्त आंगनवाड़ी केंद्र 01 से 04' },
  { title: 'आयुर्वेदिक चिकित्सा एवं काढ़ा वितरण शिविर', date: '20 अक्टूबर 2026', time: 'सुबह 08:00 से 12:00', place: 'आयुर्वेदिक औषधालय मोती नगर' },
]

export default function HealthPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="health"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Health" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Health Services</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Health & Wellness Services (स्वास्थ्य एवं चिकित्सा केंद्र)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - प्राथमिक स्वास्थ्य केंद्र (PHC), 24 घंटे आपातकालीन एम्बुलेंस 108, निःशुल्क दवा वितरण, नियमित टीकाकरण एवं स्वास्थ्य शिविर।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full font-semibold">
                🏥 24x7 आपातकालीन चिकित्सा सुविधा
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ मुख्यमंत्री निःशुल्क दवा व जांच योजना
              </span>
            </div>
          </div>

          {/* Emergency Ambulance Card */}
          <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <PhoneCall size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg">आपातकालीन एम्बुलेंस सेवा: डायल 108</h3>
                <p className="text-xs text-white/85 font-hindi mt-0.5">मोती नगर क्षेत्र में 15 मिनट में उपलब्धता | 24 घंटे निःशुल्क</p>
              </div>
            </div>
            <a
              href="tel:108"
              className="bg-white text-rose-600 hover:bg-slate-100 font-extrabold px-6 py-2.5 rounded-full text-xs transition shadow-sm shrink-0"
            >
              तुरंत 108 पर कॉल करें
            </a>
          </div>

          {/* PHC Details & Doctor Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <HeartPulse size={18} className="text-rose-600" />
                <h3 className="text-sm font-extrabold text-slate-900">प्राथमिक स्वास्थ्य केंद्र (PHC) मोती नगर</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-hindi">
                <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">चिकित्सा अधिकारी प्रभारी:</span>
                  <span className="font-bold text-slate-900">डॉ. अनिता वर्मा (MBBS, DGO)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">ओपीडी समय (OPD Timings):</span>
                  <span className="font-bold text-slate-900">सुबह 08:00 से 02:00 (दैनिक)</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">उपलब्ध दवाइयां:</span>
                  <span className="font-bold text-emerald-700">750+ निःशुल्क आवश्यक दवाएं</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400">प्रसव कक्ष (Labor Room):</span>
                  <span className="font-bold text-slate-900">24 घंटे जननी सुरक्षा सुविधा</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">हेल्पलाइन: 98290-99005</span>
                <a
                  href="tel:9829099005"
                  className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl text-xs hover:bg-rose-700 transition"
                >
                  डॉक्टर से संपर्क करें
                </a>
              </div>
            </div>

            {/* Health Camps */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                <Calendar size={18} className="text-blue-600" />
                <h3 className="text-sm font-extrabold text-slate-900">आगामी स्वास्थ्य शिविर एवं टीकाकरण</h3>
              </div>

              <div className="space-y-2.5">
                {healthCamps.map((camp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="font-bold text-slate-900 font-hindi">{camp.title}</div>
                    <div className="text-[11px] text-blue-700 font-semibold mt-1">दिनांक: {camp.date} • {camp.time}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">स्थान: {camp.place}</div>
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
