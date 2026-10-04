'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FolderOpen,
  Search,
  Download,
  FileText,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Filter
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

const documentsList = [
  { title: 'जन्म प्रमाण पत्र आवेदन प्रपत्र (Form 1)', category: 'नागरिक प्रमाण', format: 'PDF (2 पृष्ठ)', size: '240 KB', desc: 'नवजात शिशु के जन्म पंजीकरण हेतु आधिकारिक पंचायत आवेदन प्रारूप।' },
  { title: 'मृत्यु प्रमाण पत्र आवेदन प्रपत्र (Form 2)', category: 'नागरिक प्रमाण', format: 'PDF (2 पृष्ठ)', size: '210 KB', desc: 'मृत्यु पंजीकरण एवं मृत्यु प्रमाण पत्र हेतु आवश्यक प्रपत्र।' },
  { title: 'मूल निवास प्रमाण पत्र प्रारूप व शपथ पत्र', category: 'राजस्व एवं अधिवास', format: 'PDF (3 पृष्ठ)', size: '380 KB', desc: 'राजस्थान मूल निवास प्रमाण पत्र आवेदन फॉर्म एवं राजपत्रित गवाही प्रारूप।' },
  { title: 'जाति प्रमाण पत्र (SC/ST/OBC/EWS) प्रपत्र', category: 'सामाजिक सुरक्षा', format: 'PDF (4 पृष्ठ)', size: '420 KB', desc: 'जाति प्रमाण पत्र हेतु ऑफलाइन/ऑनलाइन आवेदन सह शपथ पत्र।' },
  { title: 'आय प्रमाण पत्र - प्रारूप आई (Format-I)', category: 'राजस्व एवं अधिवास', format: 'PDF (2 पृष्ठ)', size: '260 KB', desc: 'छात्रवृत्ति एवं सरकारी योजनाओं हेतु वार्षिक आय घोषणा पत्र।' },
  { title: 'ग्राम आबादी पट्टा 69-A आवेदन प्रपत्र', category: 'भूमि एवं आवास', format: 'PDF (3 पृष्ठ)', size: '350 KB', desc: 'प्रशासन गांवों के संग अभियान अंतर्गत आवासीय भूमि पट्टा आवेदन।' },
  { title: 'राशन कार्ड नया / संशोधन आवेदन फॉर्म', category: 'खाद्य सुरक्षा', format: 'PDF (2 पृष्ठ)', size: '290 KB', desc: 'राशन कार्ड में सदस्य जोड़ने, हटाने अथवा संशोधन हेतु फॉर्म।' },
  { title: 'मनरेगा नया जॉब कार्ड आवेदन प्रारूप', category: 'रोजगार', format: 'PDF (1 पृष्ठ)', size: '180 KB', desc: '100 दिन गारंटी रोजगार हेतु जॉब कार्ड पंजीयन आवेदन पत्र।' },
]

export default function DocumentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchDoc, setSearchDoc] = useState('')

  const filteredDocs = documentsList.filter(
    d => d.title.toLowerCase().includes(searchDoc.toLowerCase()) || d.desc.includes(searchDoc)
  )

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="documents"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Documents" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Documents & Forms</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Official Documents & Forms (आवेदन प्रपत्र एवं शपथ पत्र)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - समस्त सरकारी योजनाओं, प्रमाण पत्रों एवं राजस्व कार्यों के अधिकृत आवेदन फॉर्म एवं प्रारूप निःशुल्क डाउनलोड करें।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">
                📥 100% आधिकारिक पीडीएफ प्रारूप
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ ई-मित्र एवं पंचायत कार्यालय द्वारा मान्य
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="फॉर्म का नाम अथवा विषय खोजें..."
                value={searchDoc}
                onChange={(e) => setSearchDoc(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-hindi"
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h3>
                        <span className="text-[10px] text-slate-400 font-medium">{doc.category}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono rounded-md shrink-0">
                      {doc.size}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-hindi mt-2 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{doc.format}</span>
                  <button
                    onClick={() => alert(`${doc.title} डाउनलोड किया जा रहा है...`)}
                    className="bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download size={13} />
                    <span>डाउनलोड फॉर्म (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
