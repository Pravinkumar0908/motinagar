'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Landmark,
  Search,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Layers,
  Map as MapIcon
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

export default function PropertyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [khasraNumber, setKhasraNumber] = useState('248/1')
  const [searchResult, setSearchResult] = useState<any>({
    khasra: '248/1',
    khata: '104',
    owner: 'Pravin Kumar s/o Rameshwar Lal',
    area: '1.45 हेक्टेयर (5.8 बीघा)',
    type: 'सिंचित कृषि भूमि (Chahi Irrigated)',
    soilType: 'दोमट काली (Black Loam)',
    revenueRate: '₹42.50 वार्षिक लगान',
    patwarMandal: 'मोती नगर (पटवार वृत्त बूँदी)',
    mutation: 'नामांतरण स्वीकृत (Mutation Approved #914)',
  })

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="property"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/natural_beauty.jpg" alt="Moti Nagar Land" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Property & Land Info</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Property & Land Records (भूमि व राजस्व अभिलेख)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - जमाबंदी नकल, भू-नक्शा, खसरा विवरण, आबादी आवासीय पट्टा एवं नामांतरण स्थिति ऑनलाइन देखें।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">
                📍 अपना खाता / ई-धरती राजस्थान संबद्ध
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ डिजिटल प्रमाणित जमाबंदी नकल
              </span>
            </div>
          </div>

          {/* Search Record Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-[#1976D2]" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  खसरा / खाता संख्या द्वारा जमाबंदी खोजें (Search Land Record)
                </h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="खसरा सं. उदा. 248/1"
                  value={khasraNumber}
                  onChange={(e) => setKhasraNumber(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-mono w-44"
                />
                <button
                  onClick={() => {
                    setSearchResult({
                      khasra: khasraNumber,
                      khata: '104',
                      owner: 'Pravin Kumar s/o Rameshwar Lal',
                      area: '1.45 हेक्टेयर (5.8 बीघा)',
                      type: 'सिंचित कृषि भूमि (Chahi Irrigated)',
                      soilType: 'दोमट काली (Black Loam)',
                      revenueRate: '₹42.50 वार्षिक लगान',
                      patwarMandal: 'मोती नगर (पटवार वृत्त बूँदी)',
                      mutation: 'नामांतरण स्वीकृत (Mutation Approved #914)',
                    })
                  }}
                  className="bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  नकल देखें
                </button>
              </div>
            </div>

            {searchResult && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">काश्तकार / खातेदार का नाम:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">{searchResult.owner}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      खाता संख्या: {searchResult.khata}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full font-mono">
                      खसरा: {searchResult.khasra}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">कुल क्षेत्रफल:</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{searchResult.area}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">भूमि का प्रकार:</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{searchResult.type}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">मिट्टी का प्रकार:</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{searchResult.soilType}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-slate-400 font-medium">नामांतरण स्थिति:</div>
                    <div className="font-extrabold text-emerald-700 mt-0.5">{searchResult.mutation}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500 font-hindi">
                    पटवार मंडल: {searchResult.patwarMandal} | पटवारी संपर्क: 98290-77884
                  </span>
                  <button
                    onClick={() => alert('डिजिटल हस्ताक्षरित जमाबंदी नकल पीडीएफ डाउनलोड की जा रही है...')}
                    className="w-full sm:w-auto bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <Download size={14} />
                    <span>डिजिटल जमाबंदी नकल डाउनलोड करें (PDF)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3 Action Services: Patta, Mutation, Bhu-Naksha */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center mb-3">
                  <Landmark size={20} />
                </div>
                <h3 className="font-bold text-sm text-slate-900">प्रशासन गांवों के संग - आबादी पट्टा</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  मोती नगर आबादी भूमि में बने पुराने मकानों का ग्राम पंचायत द्वारा निःशुल्क 69-A आवासीय पट्टा आवेदन।
                </p>
              </div>
              <button
                onClick={() => alert('पट्टा आवेदन फॉर्म खोला जा रहा है।')}
                className="mt-4 text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
              >
                <span>पट्टा हेतु आवेदन करें</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FileText size={20} />
                </div>
                <h3 className="font-bold text-sm text-slate-900">नामांतरण पंजीकरण (Mutation)</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  भूमि क्रय-विक्रय, विरासत, वसीयत अथवा बंटवारे के उपरांत राजस्व अभिलेख में नाम दर्ज कराने का आवेदन।
                </p>
              </div>
              <button
                onClick={() => alert('नामांतरण स्थिति जांची जा रही है।')}
                className="mt-4 text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>नामांतरण ट्रैक करें</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <MapIcon size={20} />
                </div>
                <h3 className="font-bold text-sm text-slate-900">डिजिटल भू-नक्शा (Bhu-Naksha)</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  मोती नगर राजस्व सीमा के अंतर्गत अपने खेत/भूखंड का सेटेलाइट मैप एवं भू-अभिलेख सीमाओं का प्रिंट।
                </p>
              </div>
              <a
                href="https://bhunaksha.rajasthan.gov.in"
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
              >
                <span>भू-नक्शा पोर्टल खोलें</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
