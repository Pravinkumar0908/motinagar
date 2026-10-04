'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  GraduationCap,
  Search,
  BookOpen,
  Award,
  Users,
  Download,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

const villageSchools = [
  {
    name: 'राजकीय उच्च माध्यमिक विद्यालय, मोती नगर',
    type: 'Senior Secondary (1st to 12th)',
    principal: 'श्री रामेश्वर प्रसाद मीणा (प्रधानाचार्य)',
    phone: '98290-88411',
    streams: 'कला (Arts), विज्ञान (Science), कृषि (Agriculture)',
    students: 485,
    facilities: ['स्मार्ट क्लासरूम', 'कंप्यूटर लैब (ICT)', 'समृद्ध पुस्तकालय', 'खेल मैदान'],
    img: '/images/govt_school.jpg',
  },
  {
    name: 'राजकीय प्राथमिक विद्यालय, नया पुरा (वार्ड 05)',
    type: 'Primary School (1st to 5th)',
    principal: 'श्रीमती मंजू लता शर्मा (प्रधानाध्यापिका)',
    phone: '98290-66220',
    streams: 'प्राथमिक शिक्षा एवं मिड-डे मील',
    students: 112,
    facilities: ['शुद्ध पेयजल (RO)', 'पौष्टिक मध्याह्न भोजन', 'बाल वाटिका', 'मुफ्त पाठ्यपुस्तकें व यूनिफॉर्म'],
    img: '/images/hero.jpg',
  },
]

const scholarshipsList = [
  { name: 'मेधावी बालिका स्कूटी एवं प्रोत्साहन योजना', benefit: 'निःशुल्क स्कूटी + ₹10,000', eligibility: '12वीं में 75%+ अंक प्राप्त छात्राएं' },
  { name: 'गार्गी पुरस्कार योजना (द्वितीय किस्त)', benefit: '₹5,000 नकद पुरस्कार', eligibility: '10वीं बोर्ड में 75%+ अंक धारक बालिकाएं' },
  { name: 'मुख्यमंत्री सर्वजन उच्च शिक्षा छात्रवृत्ति', benefit: '₹5,000 वार्षिक', eligibility: 'पारिवारिक वार्षिक आय ₹2.5 लाख से कम' },
]

export default function EducationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="education"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/scheme_students.jpg" alt="Moti Nagar Education" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Education Services</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Education & Youth Learning Portal (शिक्षा एवं ज्ञान केंद्र)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - राजकीय विद्यालय, डिजिटल लाइब्रेरी, छात्रवृत्ति योजनाएं, परीक्षा परिणाम एवं बालिका शिक्षा प्रोत्साहन।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-semibold">
                📚 100% साक्षरता लक्ष्य
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ डिजिटल ICT लैब एवं मुफ्त पुस्तकें
              </span>
            </div>
          </div>

          {/* Village Schools */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <h2 className="text-base font-extrabold text-slate-900">मोती नगर के राजकीय विद्यालय (Schools)</h2>
              <span className="text-xs text-slate-500">2 विद्यालय संचालित</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {villageSchools.map((s, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="relative h-44 bg-slate-100">
                    <Image src={s.img} alt={s.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-extrabold text-sm leading-snug">{s.name}</h3>
                      <div className="text-xs text-amber-300 font-hindi">{s.type}</div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                    <div className="space-y-1 text-slate-600 font-hindi">
                      <div><b>प्रधानाचार्य:</b> {s.principal} (कॉल: {s.phone})</div>
                      <div><b>संकाय:</b> {s.streams}</div>
                      <div><b>नामांकित विद्यार्थी:</b> {s.students} छात्र-छात्राएं</div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-500 uppercase mb-1.5">उपलब्ध सुविधाएं:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.facilities.map((f, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-semibold rounded-md">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => alert('प्रवेश सत्र 2026-27 के ऑनलाइन फॉर्म विद्यालय कार्यालय में उपलब्ध हैं।')}
                        className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition text-center"
                      >
                        प्रवेश जानकारी (Admission)
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarships for Students */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Award size={18} className="text-amber-500" />
              <h3 className="text-sm font-extrabold text-slate-900">छात्रवृत्ति एवं पुरस्कार योजनाएं (Scholarships)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scholarshipsList.map((sc, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-slate-900 font-hindi">{sc.name}</div>
                    <div className="text-emerald-700 font-extrabold text-sm mt-1">{sc.benefit}</div>
                    <p className="text-[11px] text-slate-500 font-hindi mt-1">पात्रता: {sc.eligibility}</p>
                  </div>
                  <Link
                    href="/schemes"
                    className="mt-3 text-[#1976D2] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>आवेदन विवरण देखें</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
