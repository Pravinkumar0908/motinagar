'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CreditCard,
  Search,
  Users,
  CheckCircle2,
  Download,
  ArrowRight,
  ShoppingBag,
  Store,
  PhoneCall,
  Send,
  X
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

export default function RationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rationNumber, setRationNumber] = useState('0747-9812-4011')
  const [rationData, setRationData] = useState<any>({
    number: '0747-9812-4011',
    cardType: 'NFSA / AAY (खाद्य सुरक्षा पात्र)',
    headName: 'प्रवीण कुमार (Pravin Kumar)',
    dealerName: 'श्री रामप्रसाद नागर (उचित मूल्य दुकान सं. 14)',
    dealerPhone: '98290-44551',
    familyCount: 4,
    members: [
      { name: 'प्रवीण कुमार', relation: 'मुखिया (Self)', age: 34, aadharStatus: 'लिंक है' },
      { name: 'श्रीमती सीमा देवी', relation: 'पत्नी (Wife)', age: 31, aadharStatus: 'लिंक है' },
      { name: 'राहुल कुमार', relation: 'पुत्र (Son)', age: 10, aadharStatus: 'लिंक है' },
      { name: 'अंजलि कुमारी', relation: 'पुत्री (Daughter)', age: 7, aadharStatus: 'लिंक है' },
    ],
    monthlyQuota: '20 किग्रा गेहूं (निःशुल्क) + 1 किग्रा चीनी (₹18) + 1 लीटर केरोसिन',
    lastTaken: '24 Sep 2026 (बायोमेट्रिक प्रमाणीकरण पूर्ण)',
  })
  const [actionModal, setActionModal] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="ration"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Ration Services" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Ration Card Services</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Ration Card & Food Security (खाद्य सुरक्षा व राशन कार्ड सेवा)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - राष्ट्रीय खाद्य सुरक्षा योजना (NFSA), राशन कोटा विवरण, नया राशन कार्ड आवेदन, परिवार सदस्य जोड़ना/हटाना एवं डीलर जानकारी।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full font-semibold">
                🌾 NFSA निःशुल्क गेहूं योजना
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ बायोमेट्रिक ई-पॉस (e-PoS) समर्थित
              </span>
            </div>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-rose-600" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  राशन कार्ड विवरण एवं मासिक आवंटन स्थिति (Check Ration Details)
                </h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="राशन कार्ड सं. दर्ज करें"
                  value={rationNumber}
                  onChange={(e) => setRationNumber(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-rose-500 font-mono w-48"
                />
                <button
                  onClick={() => {
                    alert('राशन कार्ड डेटा अद्यतन है।')
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  खोजें
                </button>
              </div>
            </div>

            {rationData && (
              <div className="mt-4 p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-rose-200/60 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500">मुखिया का नाम:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">{rationData.headName}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                      {rationData.cardType}
                    </span>
                    <span className="px-3 py-1 bg-white text-slate-800 text-xs font-mono font-bold rounded-full border border-rose-200">
                      {rationData.number}
                    </span>
                  </div>
                </div>

                {/* Family Members Table */}
                <div>
                  <div className="text-xs font-bold text-slate-800 mb-2">राशन कार्ड में दर्ज परिवार के सदस्य:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                    {rationData.members.map((m: any, i: number) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-rose-100 text-xs">
                        <div className="font-bold text-slate-900 font-hindi">{m.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{m.relation} • {m.age} वर्ष</div>
                        <div className="mt-1.5 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          <span>आधार {m.aadharStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quota & Dealer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-rose-100">
                    <div className="text-slate-400 font-medium">मासिक राशन कोटा:</div>
                    <div className="font-extrabold text-emerald-800 mt-0.5">{rationData.monthlyQuota}</div>
                    <div className="text-[10px] text-slate-500 mt-1">अंतिम वितरण: {rationData.lastTaken}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-100 flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 font-medium">उचित मूल्य दुकान (FPS Dealer):</div>
                      <div className="font-extrabold text-slate-800 mt-0.5">{rationData.dealerName}</div>
                      <div className="text-[10px] text-slate-500 mt-1">स्थान: मोती नगर मुख्य बाजार</div>
                    </div>
                    <a
                      href={`tel:${rationData.dealerPhone}`}
                      className="px-3 py-1.5 bg-rose-100 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
                    >
                      <PhoneCall size={12} />
                      <span>डीलर कॉल</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => { setActionModal('सदस्य जोड़ें (Add Member)'); setActionSuccess(false); }}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Users size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900">परिवार सदस्य जोड़ें (Add Member)</h4>
              <p className="text-xs text-slate-500 font-hindi mt-1">नवविवाहिता अथवा नवजात शिशु का नाम राशन कार्ड में ऑनलाइन जोड़ें।</p>
            </button>

            <button
              onClick={() => { setActionModal('नया राशन कार्ड (New Card)'); setActionSuccess(false); }}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <CreditCard size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900">नया राशन कार्ड आवेदन</h4>
              <p className="text-xs text-slate-500 font-hindi mt-1">विभाजित परिवार अथवा नए परिवार हेतु पृथक राशन कार्ड आवेदन।</p>
            </button>

            <button
              onClick={() => { setActionModal('ई-राशन कार्ड डाउनलोड'); setActionSuccess(false); }}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Download size={20} />
              </div>
              <h4 className="font-bold text-sm text-slate-900">डिजिटल ई-राशन कार्ड डाउनलोड</h4>
              <p className="text-xs text-slate-500 font-hindi mt-1">खाद्य विभाग द्वारा अधिकृत क्यूआर कोड युक्त ई-राशन कार्ड तुरंत प्राप्त करें।</p>
            </button>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100 animate-rise">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">{actionModal}</h3>
              <button onClick={() => setActionModal(null)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            {actionSuccess ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-emerald-950 font-hindi">अनुरोध सफलता पूर्वक दर्ज हुआ!</div>
                <div className="text-xs text-slate-500 mt-1">टोकन संख्या: MN-RTN-2026-9021</div>
                <button
                  onClick={() => setActionModal(null)}
                  className="mt-4 bg-[#1976D2] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  ठीक है
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setActionSuccess(true); }} className="mt-3 space-y-3">
                <input required placeholder="आवेदक का नाम" defaultValue="Pravin Kumar" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none" />
                <input required placeholder="राशन कार्ड संख्या" defaultValue="0747-9812-4011" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono" />
                <input required placeholder="सदस्य का नाम / विवरण" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none font-hindi" />
                <button type="submit" className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs">
                  आवेदन जमा करें &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
