'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FileCheck,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  User,
  Landmark,
  Award,
  Receipt,
  HeartHandshake,
  UsersRound,
  ShieldCheck,
  Send,
  X,
  Printer,
  QrCode,
  Calendar,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  Filter
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// Certificate Categories
const categories = ['सभी प्रमाण पत्र (All)', 'जन्म / मृत्यु (Vital)', 'राजस्व एवं भूमि (Revenue)', 'सामाजिक एवं जाति (Social)']

// Certificate List
const certificateList = [
  {
    id: 'birth-cert',
    category: 'जन्म / मृत्यु (Vital)',
    title: 'Birth Certificate',
    hindi: 'जन्म प्रमाण पत्र',
    icon: FileText,
    iconColor: 'text-[#1976D2]',
    bg: 'bg-[#e8f1fc]',
    border: 'border-[#cfe2fa]',
    time: '3 कार्य दिवस',
    fee: 'निःशुल्क (Free)',
    docs: ['अस्पताल से जन्म डिस्चार्ज कार्ड', 'माता-पिता का आधार कार्ड', 'जन आधार कार्ड', 'राशन कार्ड प्रति'],
    desc: 'नवजात शिशु का आधिकारिक जन्म पंजीकरण। विद्यालय प्रवेश, पासपोर्ट व नागरिक पहचान हेतु आवश्यक।',
  },
  {
    id: 'death-cert',
    category: 'जन्म / मृत्यु (Vital)',
    title: 'Death Certificate',
    hindi: 'मृत्यु प्रमाण पत्र',
    icon: User,
    iconColor: 'text-[#e11d48]',
    bg: 'bg-[#feecee]',
    border: 'border-[#fad3d9]',
    time: '3 कार्य दिवस',
    fee: 'निःशुल्क (Free)',
    docs: ['चिकित्सक / अस्पताल मृत्यु रिपोर्ट', 'मृतक का आधार कार्ड', 'आवेदक का पहचान पत्र', 'श्मशान / कब्रिस्तान पर्ची'],
    desc: 'मृत्यु का आधिकारिक पंजीकरण, उत्तराधिकार, बीमा दावा और बैंक खातों के निस्तारण हेतु आवश्यक।',
  },
  {
    id: 'residence-cert',
    category: 'राजस्व एवं भूमि (Revenue)',
    title: 'Residence / Bonafide Certificate',
    hindi: 'मूल निवास प्रमाण पत्र',
    icon: Landmark,
    iconColor: 'text-[#059669]',
    bg: 'bg-[#e2f7eb]',
    border: 'border-[#c2eed4]',
    time: '5 कार्य दिवस',
    fee: '₹0 (ई-मित्र शुल्क ₹50)',
    docs: ['जन आधार कार्ड', '10 वर्ष पुराना बिजली बिल या मतदाता पहचान पत्र', 'राशन कार्ड', 'दो राजपत्रित अधिकारियों के सत्यापन पत्र'],
    desc: 'राजस्थान राज्य व मोती नगर का स्थायी निवासी होने का वैधानिक प्रमाण पत्र। छात्रवृत्ति व सरकारी नौकरी हेतु अनिवार्य।',
  },
  {
    id: 'caste-cert',
    category: 'सामाजिक एवं जाति (Social)',
    title: 'Caste Certificate (SC/ST/OBC/EWS)',
    hindi: 'जाति प्रमाण पत्र',
    icon: Award,
    iconColor: 'text-[#7c3aed]',
    bg: 'bg-[#f1e8fc]',
    border: 'border-[#ded1f8]',
    time: '5-7 कार्य दिवस',
    fee: '₹0 (ई-मित्र शुल्क ₹50)',
    docs: ['पिता का जाति प्रमाण पत्र या पुराना राजस्व रिकॉर्ड', 'जन आधार / आधार कार्ड', 'शपथ पत्र', 'पटवारी जांच रिपोर्ट'],
    desc: 'आरक्षण लाभ, शैक्षणिक संस्थानों में प्रवेश और सरकारी भर्तियों में नियमानुसार लाभ प्राप्त करने हेतु।',
  },
  {
    id: 'income-cert',
    category: 'राजस्व एवं भूमि (Revenue)',
    title: 'Income Certificate',
    hindi: 'आय प्रमाण पत्र',
    icon: Receipt,
    iconColor: 'text-[#d97706]',
    bg: 'bg-[#fef4d8]',
    border: 'border-[#fae6b2]',
    time: '3 कार्य दिवस',
    fee: 'निःशुल्क (Free)',
    docs: ['प्रारूप ' + 'आई (I)', 'दो उत्तरदायी व्यक्तियों की गवाही', 'वेतन पर्ची / आय स्रोत शपथ पत्र', 'जन आधार कार्ड'],
    desc: 'छात्रवृत्ति, शुल्क मुक्ति, सरकारी सहायता व निःशुल्क चिकित्सा योजनाओं (चिरंजीवी आदि) हेतु वार्षिक आय प्रमाण।',
  },
  {
    id: 'jamabandi-cert',
    category: 'राजस्व एवं भूमि (Revenue)',
    title: 'Land Ownership / Jamabandi',
    hindi: 'जमाबंदी नकल / आबादी पट्टा',
    icon: Landmark,
    iconColor: 'text-[#0284c7]',
    bg: 'bg-[#e0f2fe]',
    border: 'border-[#bae6fd]',
    time: 'तत्काल / 1 कार्य दिवस',
    fee: '₹20 (राजस्व शुल्क)',
    docs: ['खसरा संख्या / खाता संख्या', 'खातेदार का नाम', 'आधार कार्ड'],
    desc: 'मोती नगर राजस्व सीमा में कृषि भूमि अथवा आवासीय भूखंड के स्वामित्व का आधिकारिक डिजिटल रिकॉर्ड।',
  },
  {
    id: 'character-cert',
    category: 'सामाजिक एवं जाति (Social)',
    title: 'Character Certificate',
    hindi: 'चरित्र प्रमाण पत्र',
    icon: ShieldCheck,
    iconColor: 'text-[#0d9488]',
    bg: 'bg-[#d8f5ef]',
    border: 'border-[#beede2]',
    time: '2 कार्य दिवस',
    fee: 'निःशुल्क (Free)',
    docs: ['आधार कार्ड', 'पुलिस सत्यापन प्रति (यदि लागू हो)', 'वार्ड पंच अनुशंसा'],
    desc: 'ग्राम पंचायत स्तर पर सरपंच एवं ग्राम विकास अधिकारी द्वारा जारी आधिकारिक चरित्र प्रमाण पत्र।',
  },
  {
    id: 'divyang-cert',
    category: 'सामाजिक एवं जाति (Social)',
    title: 'Disability / Divyang Certificate',
    hindi: 'दिव्यांगता प्रमाण पत्र',
    icon: HeartHandshake,
    iconColor: 'text-[#ea580c]',
    bg: 'bg-[#ffedd5]',
    border: 'border-[#fed7aa]',
    time: 'चिकित्सा बोर्ड शिविर अनुसार',
    fee: 'निःशुल्क (Free)',
    docs: ['मेडिकल बोर्ड द्वारा जारी 40%+ प्रमाण', 'यूडीआईडी कार्ड', 'पासपोर्ट फोटो', 'आधार कार्ड'],
    desc: 'दिव्यांग पेंशन, विशेष छात्रवृत्ति, रोडवेज पास और कृत्रिम अंग सहायता प्राप्त करने हेतु।',
  },
]

export default function CertificatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('सभी प्रमाण पत्र (All)')
  const [searchCertQuery, setSearchCertQuery] = useState('')
  const [trackToken, setTrackToken] = useState('MN-CERT-2026-1042')
  const [trackedResult, setTrackedResult] = useState<any>({
    token: 'MN-CERT-2026-1042',
    name: 'Pravin Kumar (प्रवीण कुमार)',
    certType: 'मूल निवास प्रमाण पत्र (Bonafide Certificate)',
    applyDate: '01 Oct 2026',
    status: 'Ready',
    step: 4,
  })
  const [applyModalItem, setApplyModalItem] = useState<typeof certificateList[0] | null>(null)
  const [previewCertModal, setPreviewCertModal] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null)

  // Filtered Certificates
  const filteredCerts = certificateList.filter((cert) => {
    const matchesCategory =
      selectedCategory === 'सभी प्रमाण पत्र (All)' || cert.category === selectedCategory
    const matchesSearch =
      searchCertQuery.trim() === '' ||
      cert.title.toLowerCase().includes(searchCertQuery.toLowerCase()) ||
      cert.hindi.includes(searchCertQuery)
    return matchesCategory && matchesSearch
  })

  // Handle Track Status Form
  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackToken.trim()) return

    setTrackedResult({
      token: trackToken.toUpperCase(),
      name: 'Pravin Kumar (प्रवीण कुमार)',
      certType: 'मूल निवास प्रमाण पत्र (Bonafide Certificate)',
      applyDate: '01 Oct 2026',
      status: 'Ready',
      step: 4,
    })
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      {/* 1. TOP HEADER / NAVBAR */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      {/* 2. BODY LAYOUT: STATIC DESKTOP SIDEBAR + SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        {/* Persistent Sticky Sidebar */}
        <PortalSidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-6">
          {/* A. HERO BANNER: Citizen Certificates Portal */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[220px] p-5 sm:p-8 flex flex-col justify-between shadow-md">
            <Image
              src="/images/temple.jpg"
              alt="Moti Nagar Rajasthan Temple"
              fill
              priority
              className="object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/80 to-slate-900/40" />

            <div className="relative z-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Certificates</span>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    Citizen Certificates Portal
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-xl">
                    मोती नगर ग्राम पंचायत - डिजिटल हस्ताक्षर युक्त आधिकारिक प्रमाण पत्र सेवा केंद्र। जन्म, मृत्यु, निवास, जाति व आय प्रमाण पत्र हेतु आवेदन व स्थिति जांच।
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-white text-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div className="font-bold">100% Digital Verified</div>
                    <div className="text-[11px] text-white/75 font-hindi">ई-हस्ताक्षरित एवं तुरंत डाउनलोड योग्य</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="relative z-10 mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                <span>🏛️</span> ग्राम पंचायत: मोती नगर (बूँदी)
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                <span>⏱️</span> औसत निर्गमन समय: 3-5 कार्य दिवस
              </span>
              <span className="bg-white/15 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                <span>📞</span> हेल्पलाइन: 0747-224400
              </span>
            </div>
          </div>

          {/* B. TRACK APPLICATION STATUS (स्थिति जांचें) */}
          <div id="track" className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1976D2] flex items-center justify-center shrink-0">
                  <Search size={18} />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                    प्रमाण पत्र आवेदन स्थिति जांचें (Track Application Status)
                  </h2>
                  <p className="text-[11px] text-slate-500 font-hindi mt-0.5">
                    आवेदन टोकन संख्या (उदा. MN-CERT-2026-1042) अथवा पंजीकृत मोबाइल नंबर दर्ज करें
                  </p>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleTrackSubmit} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="text"
                  value={trackToken}
                  onChange={(e) => setTrackToken(e.target.value)}
                  placeholder="टोकन संख्या / मोबाइल दर्ज करें"
                  className="w-full md:w-64 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-medium"
                />
                <button
                  type="submit"
                  className="bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
                >
                  ट्रैक करें
                </button>
              </form>
            </div>

            {/* Stepper Status Display */}
            {trackedResult && (
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-900">{trackedResult.certType}</span>
                    <span className="text-xs text-slate-500 ml-2 font-mono">({trackedResult.token})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">आवेदक: {trackedResult.name}</span>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      जारी किया गया (Ready)
                    </span>
                  </div>
                </div>

                {/* 4 Steps Stepper */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  {/* Step 1 */}
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1.5 text-xs font-bold">
                      ✓
                    </div>
                    <div className="text-xs font-bold text-slate-800 font-hindi">1. आवेदन प्राप्त</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">01 Oct 2026</div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1.5 text-xs font-bold">
                      ✓
                    </div>
                    <div className="text-xs font-bold text-slate-800 font-hindi">2. दस्तावेज सत्यापन</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">02 Oct 2026</div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-1.5 text-xs font-bold">
                      ✓
                    </div>
                    <div className="text-xs font-bold text-slate-800 font-hindi">3. पटवारी / सचिव स्वीकृति</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">03 Oct 2026</div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-1.5 text-xs font-bold">
                      ✓
                    </div>
                    <div className="text-xs font-bold text-emerald-900 font-hindi">4. डिजिटल हस्ताक्षर पूर्ण</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">डाउनलोड हेतु तैयार</div>
                  </div>
                </div>

                {/* Download Certificate Action */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 font-hindi">
                    यह प्रमाण पत्र सूचना प्रौद्योगिकी अधिनियम 2000 के अंतर्गत डिजिटल रूप से सत्यापित है।
                  </div>
                  <button
                    onClick={() => setPreviewCertModal(true)}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Download size={15} />
                    <span>डिजिटल प्रमाण पत्र डाउनलोड करें (PDF)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* C. CERTIFICATES CATALOG */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-5">
            {/* Header + Search & Filter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck size={20} className="text-[#1976D2]" />
                <h2 className="text-base font-extrabold text-slate-900">
                  प्रमाण पत्र सेवाएं (Available Certificates)
                </h2>
              </div>

              {/* Search within certs */}
              <div className="relative w-full lg:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="प्रमाण पत्र का नाम खोजें..."
                  value={searchCertQuery}
                  onChange={(e) => setSearchCertQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-hindi"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#1976D2] text-white shadow-2xs font-bold'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Certificate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {filteredCerts.map((cert) => {
                const Icon = cert.icon
                return (
                  <div
                    key={cert.id}
                    className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Top colored badge */}
                    <div className={`${cert.bg} ${cert.border} border-b p-4 flex items-start gap-3`}>
                      <div className={`w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center ${cert.iconColor} shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon size={20} strokeWidth={2.4} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-slate-900 leading-snug truncate">
                          {cert.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-600 font-hindi mt-0.5">
                          {cert.hindi}
                        </p>
                      </div>
                    </div>

                    {/* Middle details */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 font-hindi leading-relaxed">
                        {cert.desc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                        <div className="flex justify-between text-slate-600">
                          <span className="text-slate-400 font-medium">समय सीमा:</span>
                          <span className="font-bold text-slate-800">{cert.time}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span className="text-slate-400 font-medium">शुल्क:</span>
                          <span className="font-bold text-emerald-700">{cert.fee}</span>
                        </div>
                        <div className="pt-1">
                          <div className="text-[10px] font-bold text-slate-700 uppercase">आवश्यक दस्तावेज:</div>
                          <div className="text-[10px] text-slate-500 font-hindi truncate mt-0.5">
                            {cert.docs.join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => setApplyModalItem(cert)}
                          className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <span>आवेदन करें</span>
                          <ArrowRight size={13} />
                        </button>
                        <button
                          onClick={() => setPreviewCertModal(true)}
                          title="प्रारूप देखें"
                          className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* D. IMPORTANT INSTRUCTIONS (नागरिकों हेतु महत्वपूर्ण निर्देश) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-800 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="text-xs text-amber-900 font-hindi space-y-1.5">
                <div className="font-extrabold text-sm text-amber-950">
                  प्रमाण पत्र बनवाने हेतु नागरिक सूचना (Citizen Guidelines)
                </div>
                <p>
                  1. सभी ऑनलाइन आवेदन जन आधार कार्ड एवं आधार कार्ड प्रमाणीकरण (OTP) द्वारा ही स्वीकार किए जाएंगे।
                </p>
                <p>
                  2. आवेदन करने के पश्चात आपको मोबाइल पर SMS द्वारा टोकन संख्या प्राप्त होगी, जिससे आप ऊपर दिए गए ट्रैकर से स्थिति देख सकते हैं।
                </p>
                <p>
                  3. यदि किसी दस्तावेज में त्रुटि पाई जाती है, तो ग्राम विकास अधिकारी (VDO) द्वारा पुनः अपलोड करने का विकल्प दिया जाएगा।
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 3. MOBILE APP BOTTOM NAVIGATION BAR */}
      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* ================= MODALS ================= */}

      {/* 1. Certificate Application Modal */}
      {applyModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-rise max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className={`${applyModalItem.bg} ${applyModalItem.border} border-b p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center ${applyModalItem.iconColor}`}>
                  <applyModalItem.icon size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{applyModalItem.title}</h3>
                  <p className="text-[11px] text-slate-600 font-hindi">{applyModalItem.hindi} हेतु ऑनलाइन आवेदन</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setApplyModalItem(null)
                  setApplicationSuccess(null)
                }}
                className="w-7 h-7 rounded-lg bg-white/80 hover:bg-white flex items-center justify-center text-slate-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="p-5 overflow-y-auto flex-1">
              {applicationSuccess ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 font-hindi">
                    आवेदन सफलतापूर्वक दर्ज हुआ!
                  </h4>
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl inline-block text-center">
                    <div className="text-[11px] text-slate-500 font-semibold uppercase">आपका आवेदन टोकन नंबर:</div>
                    <div className="text-lg font-mono font-extrabold text-[#1976D2] mt-0.5">
                      {applicationSuccess}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-hindi mt-3 max-w-xs mx-auto">
                    आपके मोबाइल नंबर पर पुष्टिकरण SMS भेज दिया गया है। आप इस टोकन संख्या से आवेदन स्थिति ट्रैक कर सकते हैं।
                  </p>
                  <button
                    onClick={() => {
                      setTrackToken(applicationSuccess)
                      setApplyModalItem(null)
                      setApplicationSuccess(null)
                      const el = document.getElementById('track')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="mt-5 bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition"
                  >
                    स्थिति ट्रैक करें
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const randomToken = `MN-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`
                    setApplicationSuccess(randomToken)
                  }}
                  className="space-y-3.5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">आवेदक का नाम</label>
                      <input required defaultValue="Pravin Kumar" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">पिता / पति का नाम</label>
                      <input required placeholder="पिता/पति का नाम" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोबाइल नंबर (OTP हेतु)</label>
                      <input required type="tel" placeholder="10 अंकों का मोबाइल नंबर" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">जन आधार / आधार संख्या</label>
                      <input required placeholder="12 अंकों का आधार या जन आधार" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोती नगर वार्ड संख्या</label>
                      <select className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white text-slate-800">
                        <option>वार्ड सं. 01</option>
                        <option>वार्ड सं. 02</option>
                        <option>वार्ड सं. 03</option>
                        <option defaultValue="वार्ड सं. 04">वार्ड सं. 04</option>
                        <option>वार्ड सं. 05</option>
                        <option>वार्ड सं. 06</option>
                        <option>वार्ड सं. 07</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">दस्तावेज अपलोड (PDF / Image)</label>
                      <input type="file" className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-blue-50 file:text-[#1976D2] hover:file:bg-blue-100" />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 font-hindi border border-slate-100">
                    <span className="font-bold text-slate-800">आवश्यक जांच:</span> मैं प्रमाणित करता/करती हूँ कि मेरे द्वारा दी गई समस्त जानकारी पूर्णतः सत्य है। असत्य पाए जाने पर मेरा आवेदन निरस्त किया जा सकता है।
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Send size={14} />
                    <span>आवेदन जमा करें (Submit Application)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Official Digital Certificate Preview & Print Modal */}
      {previewCertModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-rise max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-3.5 px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck size={18} className="text-emerald-400" />
                <span className="text-xs font-bold">डिजिटल प्रमाण पत्र पूर्वावलोकन (Digital Certificate Preview)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Printer size={13} />
                  <span>प्रिंट (Print)</span>
                </button>
                <button
                  onClick={() => setPreviewCertModal(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Certificate Paper Layout */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#fffdfa] border-8 border-double border-amber-900/30 m-4 rounded-xl shadow-inner font-serif text-slate-900">
              {/* Top Header of Certificate */}
              <div className="text-center border-b-2 border-amber-900/40 pb-4">
                <div className="text-xs font-bold tracking-widest uppercase text-slate-700 font-sans">
                  राजस्थान सरकार | GOVERNMENT OF RAJASTHAN
                </div>
                <div className="text-sm font-extrabold text-amber-950 font-sans mt-0.5">
                  कार्यालय ग्राम पंचायत मोती नगर, पंचायत समिति बूंदी (राज.)
                </div>
                <div className="mt-2 inline-block px-4 py-1 bg-amber-100/70 border border-amber-300 rounded-full text-sm font-bold text-amber-950">
                  मूल निवास प्रमाण पत्र (BONAFIDE RESIDENCE CERTIFICATE)
                </div>
              </div>

              {/* Certificate Metadata */}
              <div className="flex justify-between items-center text-xs mt-3 font-sans text-slate-600">
                <div>प्रमाण पत्र सं.: <b>MN/2026/CERT-1042</b></div>
                <div>दिनांक: <b>04/10/2026</b></div>
              </div>

              {/* Body Text */}
              <div className="mt-5 text-xs sm:text-sm leading-relaxed text-justify space-y-3 font-hindi">
                <p>
                  प्रमाणित किया जाता है कि श्री <b>प्रवीण कुमार (Pravin Kumar)</b> सुपुत्र श्री <b>रामेश्वर लाल</b>, निवासी वार्ड संख्या 04, ग्राम मोती नगर, तहसील व जिला बूँदी (राजस्थान) के स्थायी मूल निवासी हैं।
                </p>
                <p>
                  प्रार्थी का परिवार विगत कई वर्षों से इस ग्राम में निवास कर रहा है एवं ग्राम पंचायत रिकॉर्ड व पटवारी रिपोर्ट अनुसार इनका विवरण पूर्णतः सत्यापित है।
                </p>
              </div>

              {/* Bottom Verification & Signatures */}
              <div className="mt-8 pt-4 border-t border-slate-300 flex items-end justify-between text-xs font-sans">
                {/* QR Code & Digital Signature */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-slate-100 border border-slate-300 p-1 flex items-center justify-center">
                    <QrCode size={56} className="text-slate-800" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 size={13} />
                      <span>ई-हस्ताक्षरित (Digitally Signed)</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      VDO / Gram Vikas Adhikari<br />
                      Moti Nagar, Bundi
                    </div>
                  </div>
                </div>

                {/* Sarpanch Stamp */}
                <div className="text-center font-hindi">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-900/60 flex items-center justify-center text-[10px] text-blue-900 font-bold mx-auto mb-1">
                    ग्राम पंचायत<br />मोती नगर
                  </div>
                  <div className="font-bold text-xs">सरपंच / ग्राम विकास अधिकारी</div>
                  <div className="text-[10px] text-slate-500 font-sans">Gram Panchayat Moti Nagar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
