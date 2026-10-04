'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeartHandshake,
  Search,
  CheckCircle2,
  Download,
  Users,
  Calendar,
  Send,
  X,
  IndianRupee,
  Clock
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

export default function PensionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [pensionPPO, setPensionPPO] = useState('RJ-PPO-2026-8819')
  const [pensionResult, setPensionResult] = useState<any>({
    ppo: 'RJ-PPO-2026-8819',
    beneficiary: 'रामेश्वर लाल (Rameshwar Lal)',
    scheme: 'मुख्यमंत्री वृद्धजन सम्मान पेंशन योजना',
    monthlyAmount: '₹1,150 / माह',
    bank: 'भारतीय स्टेट बैंक (SBI शाखा बूँदी)',
    account: 'XXXX-XXXX-4819',
    lastPayment: '01 Oct 2026 (सफलतापूर्वक जमा - UTR: 914028)',
    status: 'सक्रिय (Active & Verified)',
    yearlyVerification: 'वार्षिक बायोमेट्रिक सत्यापन पूर्ण (Valid till Nov 2026)',
  })
  const [applyModal, setApplyModal] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="pension"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/scheme_elderly.jpg" alt="Moti Nagar Pension" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Pension Schemes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Social Security Pension Portal (सामाजिक सुरक्षा पेंशन सेवा)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - वृद्धजन, विधवा एवं दिव्यांगजन सम्मान पेंशन योजना। मासिक किस्त स्थिति, पीपीओ नंबर खोज एवं वार्षिक भौतिक सत्यापन।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full font-semibold">
                👵 वरिष्ठ नागरिक सम्मान
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ हर माह 1 तारीख को सीधा खाता अंतरण
              </span>
            </div>
          </div>

          {/* Pension Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-teal-600" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  पेंशनर पीपीओ / आधार से भुगतान स्थिति जांचें (Pension Passbook & Status)
                </h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="PPO सं. दर्ज करें"
                  value={pensionPPO}
                  onChange={(e) => setPensionPPO(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-teal-500 font-mono w-48"
                />
                <button
                  onClick={() => alert('पेंशनर रिकॉर्ड अद्यतन है।')}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  जांचें
                </button>
              </div>
            </div>

            {pensionResult && (
              <div className="mt-4 p-5 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-teal-200/60 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500">लाभार्थी का नाम:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">{pensionResult.beneficiary}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                      {pensionResult.status}
                    </span>
                    <span className="px-3 py-1 bg-white text-slate-800 text-xs font-mono font-bold rounded-full border border-teal-200">
                      {pensionResult.ppo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-teal-100">
                    <div className="text-slate-400 font-medium">मासिक पेंशन राशि:</div>
                    <div className="font-extrabold text-emerald-800 text-sm mt-0.5">{pensionResult.monthlyAmount}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-teal-100">
                    <div className="text-slate-400 font-medium">बैंक एवं खाता संख्या:</div>
                    <div className="font-bold text-slate-800 mt-0.5">{pensionResult.bank}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{pensionResult.account}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-teal-100">
                    <div className="text-slate-400 font-medium">अंतिम भुगतान:</div>
                    <div className="font-bold text-slate-800 mt-0.5">{pensionResult.lastPayment}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-teal-100">
                    <div className="text-slate-400 font-medium">वार्षिक भौतिक सत्यापन:</div>
                    <div className="font-bold text-emerald-700 mt-0.5">{pensionResult.yearlyVerification}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3 Pension Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <HeartHandshake size={20} />
                </div>
                <h4 className="font-bold text-sm text-slate-900">वृद्धजन सम्मान पेंशन</h4>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  58 वर्ष से अधिक आयु की महिलाओं एवं 60 वर्ष से अधिक आयु के पुरुषों को प्रतिमाह ₹1,150 से ₹1,500 की नियमित पेंशन।
                </p>
              </div>
              <button
                onClick={() => { setApplyModal(true); setApplySuccess(false); }}
                className="mt-4 text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
              >
                <span>ऑनलाइन आवेदन करें</span>
                <Clock size={12} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <Users size={20} />
                </div>
                <h4 className="font-bold text-sm text-slate-900">एकल नारी (विधवा) पेंशन</h4>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  विधवा, तलाकशुदा एवं परित्यक्ता महिलाओं को आर्थिक संबल प्रदान करने हेतु प्रतिमाह ₹1,000 से ₹1,500 तक सहायता।
                </p>
              </div>
              <button
                onClick={() => { setApplyModal(true); setApplySuccess(false); }}
                className="mt-4 text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
              >
                <span>ऑनलाइन आवेदन करें</span>
                <Clock size={12} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <IndianRupee size={20} />
                </div>
                <h4 className="font-bold text-sm text-slate-900">विशेष योग्यजन (दिव्यांग) पेंशन</h4>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  40% अथवा अधिक दिव्यांगता वाले ग्रामीण नागरिकों को सम्मानपूर्वक जीवनयापन हेतु प्रतिमाह पेंशन एवं अतिरिक्त सहायता।
                </p>
              </div>
              <button
                onClick={() => { setApplyModal(true); setApplySuccess(false); }}
                className="mt-4 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>ऑनलाइन आवेदन करें</span>
                <Clock size={12} />
              </button>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Apply Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100 animate-rise">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">सामाजिक सुरक्षा पेंशन आवेदन</h3>
              <button onClick={() => setApplyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            {applySuccess ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-2" />
                <div className="font-bold text-emerald-950 font-hindi">पेंशन आवेदन सफलतापूर्वक दर्ज हुआ!</div>
                <div className="text-xs text-slate-500 mt-1">टोकन संख्या: MN-PPO-2026-3810</div>
                <button
                  onClick={() => setApplyModal(false)}
                  className="mt-4 bg-[#1976D2] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  ठीक है
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setApplySuccess(true); }} className="mt-3 space-y-3">
                <input required placeholder="आवेदक का नाम" defaultValue="Pravin Kumar" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none" />
                <input required placeholder="जन आधार संख्या" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none font-mono" />
                <input required type="tel" placeholder="मोबाइल नंबर" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none" />
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
