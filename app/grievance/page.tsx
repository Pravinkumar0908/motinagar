'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertCircle,
  Search,
  CheckCircle2,
  PhoneCall,
  Send,
  X,
  Clock,
  ShieldAlert,
  Headphones,
  UserCheck,
  Building,
  HelpCircle,
  MapPin
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

const emergencyContacts = [
  { name: 'आपातकालीन एम्बुलेंस (Ambulance)', number: '108', badge: '24x7 निःशुल्क', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'पुलिस सहायता (Police)', number: '112', badge: 'तत्काल सहायता', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'महिला हेल्पलाइन (Women Help)', number: '1090', badge: 'सुरक्षा प्रकोष्ठ', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'बिजली शिकायत (Discom Jaipur)', number: '1912', badge: 'विद्युत फॉल्ट', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'ग्राम पंचायत कार्यालय (Panchayat)', number: '0747-224400', badge: 'कार्यालय समय', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'जलदाय विभाग (PHED Water)', number: '181', badge: 'पेयजल समस्या', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
]

const panchayatTeam = [
  { name: 'श्रीमती सुशीला देवी', role: 'सरपंच (Sarpanch)', phone: '98290-11221', area: 'ग्राम पंचायत मोती नगर' },
  { name: 'श्री जगदीश प्रसाद शर्मा', role: 'ग्राम विकास अधिकारी (VDO)', phone: '98290-33442', area: 'पंचायत समिति बूँदी' },
  { name: 'श्री महावीर गुर्जर', role: 'उपसरपंच (Up-Sarpanch)', phone: '98290-55663', area: 'वार्ड सं. 02' },
  { name: 'श्री रामचरण मीणा', role: 'पटवारी (Patwari - Revenue)', phone: '98290-77884', area: 'पटवार मंडल मोती नगर' },
  { name: 'डॉ. अनिता वर्मा', role: 'चिकित्सा प्रभारी (Doctor Incharge)', phone: '98290-99005', area: 'प्राथमिक स्वास्थ्य केंद्र (PHC)' },
  { name: 'श्री सत्यनारायण नागर', role: 'कनिष्ठ तकनीकी सहायक (JTA)', phone: '98290-22110', area: 'मनरेगा एवं निर्माण कार्य' },
]

export default function GrievancePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [grievanceToken, setGrievanceToken] = useState('MN-GRV-2026-1022')
  const [trackedStatus, setTrackedStatus] = useState<any>({
    token: 'MN-GRV-2026-1022',
    applicant: 'Pravin Kumar',
    category: 'स्ट्रीट लाइट खराबी (Street Light)',
    date: '02 Oct 2026',
    status: 'कार्यवाही प्रगति पर (In Progress)',
    step: 2,
    officer: 'श्री महावीर गुर्जर (वार्ड सं. 02)',
  })
  const [submittedToken, setSubmittedToken] = useState<string | null>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (!grievanceToken.trim()) return
    setTrackedStatus({
      token: grievanceToken.toUpperCase(),
      applicant: 'Pravin Kumar',
      category: 'सड़क व नाली मरम्मत (Road & Drain)',
      date: '02 Oct 2026',
      status: 'कार्यवाही प्रगति पर (In Progress)',
      step: 2,
      officer: 'ग्राम विकास अधिकारी (VDO)',
    })
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="grievance"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[200px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image src="/images/hero.jpg" alt="Moti Nagar Grievance" fill priority className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Grievance / Complaint</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1">
                Grievance & Support Portal (शिकायत निवारण व मदद)
              </h1>
              <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                मोती नगर ग्राम पंचायत - ग्रामीण समस्याओं (सड़क, पानी, बिजली, सफाई) का 48 घंटे में समाधान। शिकायत दर्ज करें व ऑनलाइन ट्रैक करें।
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full font-semibold">
                🛡️ 48 घंटे में समाधान गारंटी
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">
                📞 पंचायत हेल्पलाइन: 0747-224400
              </span>
            </div>
          </div>

          {/* Grievance Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search size={18} className="text-[#1976D2]" />
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  शिकायत स्थिति जांचें (Track Grievance Status)
                </h2>
              </div>

              <form onSubmit={handleTrack} className="flex gap-2">
                <input
                  type="text"
                  placeholder="टोकन सं. उदा. MN-GRV-2026-1022"
                  value={grievanceToken}
                  onChange={(e) => setGrievanceToken(e.target.value)}
                  className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-mono w-56"
                />
                <button
                  type="submit"
                  className="bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  ट्रैक करें
                </button>
              </form>
            </div>

            {trackedStatus && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pb-2 border-b border-slate-200 gap-1">
                  <div>
                    <span className="font-bold text-slate-900">{trackedStatus.category}</span>
                    <span className="font-mono text-slate-500 ml-2">({trackedStatus.token})</span>
                  </div>
                  <div className="text-emerald-700 font-bold">{trackedStatus.status}</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white border border-emerald-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center mx-auto mb-1">✓</div>
                    <div className="font-bold text-slate-800">1. शिकायत दर्ज</div>
                    <div className="text-[10px] text-slate-400">02 Oct 2026</div>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mx-auto mb-1">2</div>
                    <div className="font-bold text-blue-900">2. अधिकारी को प्रेषित</div>
                    <div className="text-[10px] text-blue-600">प्रक्रियाधीन</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 opacity-60">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center mx-auto mb-1">3</div>
                    <div className="font-bold text-slate-700">3. स्थलीय जांच</div>
                    <div className="text-[10px] text-slate-400">आगामी</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 opacity-60">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center mx-auto mb-1">4</div>
                    <div className="font-bold text-slate-700">4. समस्या निस्तारित</div>
                    <div className="text-[10px] text-slate-400">अंतिम चरण</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form + Team Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3.5 border-b border-slate-100">
                <AlertCircle size={20} className="text-purple-600" />
                <h2 className="text-base font-extrabold text-slate-900">नई शिकायत दर्ज करें (Lodge Grievance)</h2>
              </div>

              {submittedToken ? (
                <div className="mt-5 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <CheckCircle2 size={36} className="text-emerald-600 mx-auto mb-2" />
                  <div className="text-base font-bold text-emerald-950 font-hindi">शिकायत सफलतापूर्वक दर्ज हुई!</div>
                  <div className="mt-2 text-sm font-mono font-bold text-emerald-800">टोकन: {submittedToken}</div>
                  <p className="text-xs text-emerald-700 font-hindi mt-1 max-w-sm mx-auto">
                    ग्राम विकास अधिकारी व सरपंच को सूचित कर दिया गया है। 48 घंटे में समाधान सुनिश्चित किया जाएगा।
                  </p>
                  <button
                    onClick={() => setSubmittedToken(null)}
                    className="mt-4 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  >
                    नई शिकायत दर्ज करें
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const t = `MN-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`
                    setSubmittedToken(t)
                  }}
                  className="mt-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">आवेदक का नाम</label>
                      <input required defaultValue="Pravin Kumar" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोबाइल नंबर</label>
                      <input required type="tel" placeholder="10 अंकों का मोबाइल नंबर" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">समस्या की श्रेणी</label>
                      <select className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white text-slate-800">
                        <option>सड़क एवं नाली मरम्मत (Road & Drain)</option>
                        <option>पेयजल आपूर्ति समस्या (Drinking Water)</option>
                        <option>स्ट्रीट लाइट खराबी (Street Lights)</option>
                        <option>सफाई एवं कचरा प्रबंधन (Cleanliness)</option>
                        <option>राशन एवं खाद्य सुरक्षा (Ration / PDS)</option>
                        <option>अन्य समस्या (Others)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">वार्ड संख्या / मोहल्ला</label>
                      <input required placeholder="उदा. वार्ड सं. 04, मुख्य चौक" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">समस्या का विस्तृत विवरण</label>
                    <textarea required rows={3} placeholder="यहाँ अपनी समस्या विस्तार से लिखें..." className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-hindi" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">फोटो अपलोड (वैकल्पिक)</label>
                    <input type="file" className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-[#1976D2]" />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Send size={14} />
                    <span>शिकायत दर्ज करें (Submit Grievance)</span>
                  </button>
                </form>
              )}
            </div>

            {/* Emergency & Officials */}
            <div className="lg:col-span-5 space-y-4">
              {/* Emergency Contacts */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
                <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <ShieldAlert size={15} className="text-rose-600" />
                  <span>आपातकालीन सहायता नंबर (Emergency Numbers)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2.5">
                  {emergencyContacts.map((c) => (
                    <a
                      key={c.name}
                      href={`tel:${c.number}`}
                      className={`p-2 rounded-xl border ${c.color} flex flex-col justify-between hover:scale-102 transition`}
                    >
                      <div className="text-[10px] font-bold leading-tight line-clamp-1">{c.name}</div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-extrabold">{c.number}</span>
                        <PhoneCall size={12} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Panchayat Officials */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
                <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <UserCheck size={15} className="text-emerald-600" />
                  <span>ग्राम पंचायत अधिकारी संपर्क</span>
                </div>
                <div className="divide-y divide-slate-100 mt-1">
                  {panchayatTeam.map((m) => (
                    <div key={m.name} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900 font-hindi">{m.name}</div>
                        <div className="text-[10px] text-slate-500">{m.role} • {m.area}</div>
                      </div>
                      <a
                        href={`tel:${m.phone}`}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                      >
                        <PhoneCall size={11} />
                        <span>कॉल</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />
    </div>
  )
}
