'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Receipt,
  Search,
  CheckCircle2,
  Download,
  IndianRupee,
  Zap,
  Droplets,
  Building,
  CreditCard,
  Send,
  X
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

export default function TaxPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [consumerNumber, setConsumerNumber] = useState('MN-TAX-2026-401')
  const [billResult, setBillResult] = useState<any>({
    consumerNo: 'MN-TAX-2026-401',
    name: 'Pravin Kumar (प्रवीण कुमार)',
    houseNo: 'मकान संख्या 42, वार्ड सं. 04',
    taxYear: '2026-2027',
    houseTax: '₹250.00',
    waterCharge: '₹120.00',
    sanitationFee: '₹80.00',
    totalDue: '₹450.00',
    dueDate: '31 Oct 2026',
    status: 'बकाया (Due)',
  })
  const [paymentDone, setPaymentDone] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="tax"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Tax" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Tax & Utility Payments</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Tax & Utility Payment Portal (कर एवं जल-विद्युत बिल भुगतान)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - गृहकर, पेयजल नल बिल, स्वच्छता शुल्क का ऑनलाइन भुगतान एवं डिजिटल रसीद तुरंत डाउनलोड करें।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
                💳 यूपीआई (UPI), डेबिट कार्ड व नेट बैंकिंग समर्थित
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ डिजिटल रसीद तुरंत जनरेट
              </span>
            </div>
          </div>

          {/* Bill Search */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt size={18} className="text-orange-600" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  ग्राम पंचायत कर बिल खोजें एवं भुगतान करें (Search Tax Bill)
                </h2>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="उपभोक्ता सं. उदा. MN-TAX-2026-401"
                  value={consumerNumber}
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-orange-500 font-mono w-52"
                />
                <button
                  onClick={() => alert('उपभोक्ता बिल खोजा गया।')}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  बिल देखें
                </button>
              </div>
            </div>

            {billResult && (
              <div className="mt-4 p-5 rounded-2xl bg-orange-50/40 border border-orange-200/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-200 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-500">उपभोक्ता का नाम:</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">{billResult.name}</h3>
                    <div className="text-xs text-slate-500">{billResult.houseNo}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      paymentDone ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {paymentDone ? 'भुगतान पूर्ण (Paid)' : billResult.status}
                    </span>
                    <span className="px-3 py-1 bg-white text-slate-800 text-xs font-mono font-bold rounded-full border border-orange-200">
                      {billResult.consumerNo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-orange-100">
                    <div className="text-slate-400 font-medium">गृहकर (House Tax):</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{billResult.houseTax}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-orange-100">
                    <div className="text-slate-400 font-medium">जल आपूर्ति शुल्क (Water):</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{billResult.waterCharge}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-orange-100">
                    <div className="text-slate-400 font-medium">सफाई शुल्क (Sanitation):</div>
                    <div className="font-extrabold text-slate-800 mt-0.5">{billResult.sanitationFee}</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-orange-200 bg-amber-50">
                    <div className="text-slate-500 font-bold">कुल देय राशि:</div>
                    <div className="font-extrabold text-rose-700 text-base mt-0.5">
                      {paymentDone ? '₹0.00' : billResult.totalDue}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500">
                    अंतिम देय तिथि: <b>{billResult.dueDate}</b> (बिना विलंब शुल्क)
                  </span>

                  {paymentDone ? (
                    <button
                      onClick={() => alert('डिजिटल भुगतान रसीद पीडीएफ डाउनलोड हो रही है...')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Download size={14} />
                      <span>डिजिटल रसीद डाउनलोड करें (PDF)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPaymentDone(true)
                        alert('भुगतान सफलतापूर्वक संपन्न हुआ! संदर्भ संख्या: TXN-MN-918290')
                      }}
                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition"
                    >
                      <CreditCard size={14} />
                      <span>ऑनलाइन भुगतान करें (Pay Now)</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
