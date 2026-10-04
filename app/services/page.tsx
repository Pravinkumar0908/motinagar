'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Layers,
  Sparkles,
  Search,
  Sun,
  Calendar,
  Leaf,
  MapPin,
  Map as MapIcon,
  Navigation,
  ArrowRight,
  Award,
  Zap,
  Droplets,
  Lightbulb,
  CheckCircle,
  Wifi,
  Download,
  HelpCircle,
  MessageSquare,
  Trophy,
  X,
  Send,
  CheckCircle2,
  Users,
  FileText,
  User,
  Landmark,
  CreditCard,
  HeartHandshake,
  Receipt,
  Headphones,
  PhoneCall,
  Building2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  HeartPulse,
  FolderOpen
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar, ALL_SIDEBAR_NAV_ITEMS } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// Popular Services (10 Cards)
const popularServices = [
  {
    id: 'birth-cert',
    title: 'Birth Certificate',
    hindi: 'जन्म प्रमाण पत्र',
    actionText: 'Apply Online →',
    icon: FileText,
    iconColor: 'text-[#1976D2]',
    bg: 'bg-[#e8f1fc]',
    border: 'border-[#cfe2fa]',
    desc: 'नवजात शिशु का जन्म पंजीकरण एवं डिजिटल जन्म प्रमाण पत्र आवेदन।',
    category: 'certificate',
  },
  {
    id: 'death-cert',
    title: 'Death Certificate',
    hindi: 'मृत्यु प्रमाण पत्र',
    actionText: 'Apply Online →',
    icon: User,
    iconColor: 'text-[#e11d48]',
    bg: 'bg-[#feecee]',
    border: 'border-[#fad3d9]',
    desc: 'मृत्यु प्रमाण पत्र हेतु आवश्यक प्रपत्र व ऑनलाइन आवेदन।',
    category: 'certificate',
  },
  {
    id: 'residence-cert',
    title: 'Residence Certificate',
    hindi: 'निवास प्रमाण पत्र',
    actionText: 'Apply Online →',
    icon: Landmark,
    iconColor: 'text-[#059669]',
    bg: 'bg-[#e2f7eb]',
    border: 'border-[#c2eed4]',
    desc: 'मूल निवास प्रमाण पत्र (Bonafide Certificate) आवेदन प्रक्रिया।',
    category: 'certificate',
  },
  {
    id: 'caste-cert',
    title: 'Caste Certificate',
    hindi: 'जाति प्रमाण पत्र',
    actionText: 'Apply Online →',
    icon: Award,
    iconColor: 'text-[#7c3aed]',
    bg: 'bg-[#f1e8fc]',
    border: 'border-[#ded1f8]',
    desc: 'एससी, एसटी, ओबीसी, ईडब्ल्यूएस जाति प्रमाण पत्र सत्यापन व निर्गमन।',
    category: 'certificate',
  },
  {
    id: 'income-cert',
    title: 'Income Certificate',
    hindi: 'आय प्रमाण पत्र',
    actionText: 'Apply Online →',
    icon: Receipt,
    iconColor: 'text-[#d97706]',
    bg: 'bg-[#fef4d8]',
    border: 'border-[#fae6b2]',
    desc: 'छात्रवृत्ति व योजनाओं हेतु वार्षिक पारिवारिक आय प्रमाण पत्र।',
    category: 'certificate',
  },
  {
    id: 'ration-card',
    title: 'Ration Card Services',
    hindi: 'राशन कार्ड सेवा',
    actionText: 'Apply / Update →',
    icon: CreditCard,
    iconColor: 'text-[#e11d48]',
    bg: 'bg-[#feecef]',
    border: 'border-[#fad4da]',
    desc: 'नया राशन कार्ड, सदस्य जोड़ना / हटाना, उचित मूल्य दुकान आवंटन।',
    category: 'ration',
  },
  {
    id: 'pension-schemes',
    title: 'Pension Schemes',
    hindi: 'पेंशन सेवाएं',
    actionText: 'Apply Online →',
    icon: HeartHandshake,
    iconColor: 'text-[#0d9488]',
    bg: 'bg-[#d8f5ef]',
    border: 'border-[#beede2]',
    desc: 'वृद्धावस्था, विधवा, दिव्यांग पेंशन योजना ऑनलाइन आवेदन व स्टेटस।',
    category: 'pension',
  },
  {
    id: 'property-land',
    title: 'Property & Land Info',
    hindi: 'भूमि व संपत्ति जानकारी',
    actionText: 'View Details →',
    icon: MapPin,
    iconColor: 'text-[#0284c7]',
    bg: 'bg-[#e0f2fe]',
    border: 'border-[#bae6fd]',
    desc: 'जमाबंदी नकल, भू-नक्शा, नामांतरण और ग्राम आबादी पट्टा विवरण।',
    category: 'property',
  },
  {
    id: 'grievance-service',
    title: 'Grievance / Complaint',
    hindi: 'शिकायत / सुझाव',
    actionText: 'Register Now →',
    icon: MessageSquare,
    iconColor: 'text-[#9333ea]',
    bg: 'bg-[#f4e8ff]',
    border: 'border-[#e4ccfd]',
    desc: 'गाँव की समस्या (सड़क, नाली, बिजली, पानी) की ऑनलाइन शिकायत।',
    category: 'grievance',
  },
  {
    id: 'tax-utility',
    title: 'Tax & Utility Payment',
    hindi: 'कर व उपयोगिता भुगतान',
    actionText: 'Pay Online →',
    icon: Receipt,
    iconColor: 'text-[#ea580c]',
    bg: 'bg-[#ffedd5]',
    border: 'border-[#fed7aa]',
    desc: 'ग्राम पंचायत गृहकर, नल बिल, बिजली बिल का सीधा ऑनलाइन भुगतान।',
    category: 'tax',
  },
]

// Government Schemes Data
const governmentSchemes = [
  {
    id: 'pm-awas',
    title: 'PM Awas Yojana',
    hindi: 'प्रधानमंत्री आवास योजना',
    img: '/images/scheme_house.jpg',
    desc: 'ग्रामीण परिवारों को पक्के मकान निर्माण हेतु ₹1.20 लाख की आर्थिक सहायता।',
    eligibility: 'बीपीएल परिवार, कच्चा मकान धारक, जन आधार कार्ड धारक',
    benefit: '₹1,20,000 किस्तों में सीधे बैंक खाते में',
  },
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi',
    hindi: 'किसान सम्मान निधि',
    img: '/images/scheme_kisan.jpg',
    desc: 'किसानों को प्रतिवर्ष ₹6,000 की वित्तीय सहायता (3 किस्तों में ₹2000)।',
    eligibility: 'मोती नगर सीमा में कृषि भूमि धारक किसान परिवार',
    benefit: '₹6,000 प्रति वर्ष डीबीटी द्वारा',
  },
  {
    id: 'scholarships',
    title: 'Scholarship Schemes',
    hindi: 'छात्रवृत्ति योजनाएं',
    img: '/images/scheme_students.jpg',
    desc: 'मेधावी छात्र-छात्राओं एवं बालिकाओं हेतु राज्य व राष्ट्रीय छात्रवृत्ति।',
    eligibility: 'राजकीय विद्यालय में 10वीं/12वीं के नियमित विद्यार्थी',
    benefit: 'शिक्षण शुल्क प्रतिपूर्ति एवं ₹10,000 तक वार्षिक प्रोत्साहन',
  },
  {
    id: 'ujjwala',
    title: 'Ujjwala Yojana',
    hindi: 'उज्ज्वला योजना',
    img: '/images/scheme_women.jpg',
    desc: 'ग्रामीण महिलाओं को निःशुल्क एलपीजी गैस कनेक्शन व सब्सिडी सहायता।',
    eligibility: 'बीपीएल / अंत्योदय परिवार की महिला मुखिया',
    benefit: 'मुफ्त गैस चूल्हा, भरा हुआ सिलेंडर व ₹450 में रिफिल',
  },
  {
    id: 'pension-scheme',
    title: 'Pension Yojana',
    hindi: 'पेंशन योजना',
    img: '/images/scheme_elderly.jpg',
    desc: 'वरिष्ठ नागरिकों एवं निराश्रितों को प्रतिमाह नियमित सामाजिक सुरक्षा पेंशन।',
    eligibility: '58+ आयु (महिला), 60+ आयु (पुरुष), अल्प आय वर्ग',
    benefit: '₹1,150 से ₹1,500 प्रतिमाह सीधे पेंशन खाते में',
  },
]

export default function ServicesHubPage() {
  const [activeNavId, setActiveNavId] = useState('services')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedServiceModal, setSelectedServiceModal] = useState<typeof popularServices[0] | null>(null)
  const [selectedSchemeModal, setSelectedSchemeModal] = useState<typeof governmentSchemes[0] | null>(null)
  const [appliedSuccess, setAppliedSuccess] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)

  // Handle Sidebar Navigation
  const handleSelectNav = (id: string) => {
    setActiveNavId(id)

    if (id === 'dashboard') {
      window.location.href = '/'
    } else if (id === 'certificates' || id === 'birth-death' || id === 'tracking') {
      window.location.href = '/certificates'
    } else if (id === 'schemes') {
      const el = document.getElementById('schemes-section')
      el?.scrollIntoView({ behavior: 'smooth' })
    } else if (id === 'grievance') {
      setSelectedServiceModal(popularServices.find(s => s.id === 'grievance-service') || null)
    } else if (id === 'property') {
      setSelectedServiceModal(popularServices.find(s => s.id === 'property-land') || null)
    } else if (id === 'ration') {
      setSelectedServiceModal(popularServices.find(s => s.id === 'ration-card') || null)
    } else if (id === 'pension') {
      setSelectedServiceModal(popularServices.find(s => s.id === 'pension-schemes') || null)
    } else if (id === 'tax') {
      setSelectedServiceModal(popularServices.find(s => s.id === 'tax-utility') || null)
    } else if (id === 'jobs') {
      setSelectedServiceModal({
        id: 'jobs-modal',
        title: 'Job & Opportunities',
        hindi: 'रोजगार व अवसर',
        actionText: 'Apply Now →',
        icon: Briefcase,
        iconColor: 'text-[#d97706]',
        bg: 'bg-[#fef2d3]',
        border: 'border-[#fde4a7]',
        desc: 'मनरेगा रोजगार, कौशल विकास केंद्र, ग्रामीण स्वरोजगार प्रशिक्षण संस्थान (RSETI) एवं स्थानीय रिक्तियों की जानकारी।',
        category: 'jobs',
      })
    } else if (id === 'education') {
      setSelectedServiceModal({
        id: 'education-modal',
        title: 'Education Services',
        hindi: 'शिक्षा सेवाएं',
        actionText: 'View Details →',
        icon: GraduationCap,
        iconColor: 'text-[#7c3aed]',
        bg: 'bg-[#ece5f9]',
        border: 'border-[#dbcdfa]',
        desc: 'राजकीय उच्च माध्यमिक विद्यालय मोती नगर, डिजिटल लाइब्रेरी, छात्रवृत्ति आवेदन एवं बालिका शिक्षा प्रोत्साहन।',
        category: 'education',
      })
    } else if (id === 'health') {
      setSelectedServiceModal({
        id: 'health-modal',
        title: 'Health Services',
        hindi: 'स्वास्थ्य सेवाएं',
        actionText: 'Contact PHC →',
        icon: HeartPulse,
        iconColor: 'text-[#dc2626]',
        bg: 'bg-[#fde4e4]',
        border: 'border-[#fcc7c7]',
        desc: 'प्राथमिक स्वास्थ्य केंद्र (PHC), 24 घंटे आपातकालीन एम्बुलेंस 108, नियमित टीकाकरण, जननी सुरक्षा व मुख्यमंत्री चिरंजीवी स्वास्थ्य लाभ।',
        category: 'health',
      })
    } else if (id === 'documents') {
      window.location.href = '/certificates'
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const filteredServices = searchQuery.trim()
    ? popularServices.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hindi.includes(searchQuery)
      )
    : popularServices

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      {/* 1. TOP NAVBAR */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      {/* 2. BODY LAYOUT: STATIC DESKTOP SIDEBAR + INDEPENDENT SCROLLING MAIN CONTENT */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        {/* Upgraded Sticky Static Sidebar */}
        <PortalSidebar
          activeId={activeNavId}
          onSelectNav={handleSelectNav}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* MAIN SCROLLABLE SERVICES HUB CONTENT */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* A. HERO BANNER: Village Services Hub */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[220px] sm:min-h-[250px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image
              src="/images/hero.jpg"
              alt="Moti Nagar Bundi Landscape"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />

            {/* Top row */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                  <Link href="/" className="hover:text-white transition">Home</Link>
                  <span>&gt;</span>
                  <span className="text-white font-semibold">Services</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-1">
                  Village Services Hub
                </h1>
                <p className="text-xs sm:text-sm text-white/85 font-medium mt-1 max-w-xl">
                  All important services, schemes and information for Moti Nagar at one place
                </p>
              </div>

              {/* Quote & Weather Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-stretch lg:self-auto">
                <div className="hidden xl:block bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-xs text-amber-200 font-hindi max-w-xs leading-relaxed shadow-lg">
                  &ldquo;सेवा, विकास और जनसहभागिता से बनेगा सक्षम मोती नगर&rdquo;
                </div>

                <div className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white shadow-xl min-w-[200px]">
                  <div className="flex items-center gap-2.5">
                    <Sun size={22} className="text-amber-400" />
                    <div>
                      <div className="text-xl font-extrabold leading-none">28°C</div>
                      <div className="text-[10px] text-white/80">Clear Sky</div>
                    </div>
                  </div>
                  <div className="my-2 border-t border-white/15" />
                  <div className="text-[11px] text-white/90 flex items-center gap-1.5">
                    <MapPin size={12} className="text-white/70" />
                    <span>Moti Nagar, Bundi</span>
                  </div>
                  <div className="text-[11px] text-white/90 flex items-center gap-1.5 mt-1">
                    <Calendar size={12} className="text-white/70" />
                    <span>Mon, 04 Oct 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Search Bar */}
            <div className="relative z-10 mt-6 max-w-2xl">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search services, schemes, certificates, information..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-28 py-3 bg-white text-slate-800 text-xs sm:text-sm rounded-full shadow-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium placeholder-slate-400"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('popular-services-grid')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#1976D2] hover:bg-blue-600 text-white text-xs font-bold px-5 rounded-full flex items-center justify-center transition shadow-xs"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* B. SECTION: POPULAR SERVICES (Left) + VILLAGE MAP & FACILITIES (Right) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* POPULAR SERVICES */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white">
                      <Layers size={13} />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Popular Services</h2>
                  </div>
                  <Link
                    href="/certificates"
                    className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
                  >
                    <span>View All Services</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                {/* 10 Services Grid */}
                <div id="popular-services-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                  {filteredServices.map((service) => {
                    const Icon = service.icon
                    return (
                      <div
                        key={service.id}
                        onClick={() => {
                          if (service.category === 'certificate') {
                            window.location.href = '/certificates'
                          } else {
                            setSelectedServiceModal(service)
                          }
                        }}
                        className={`${service.bg} ${service.border} border rounded-2xl p-3.5 flex flex-col items-center justify-between text-center cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group min-h-[145px]`}
                      >
                        <div className={`w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center ${service.iconColor} group-hover:scale-110 transition-transform mb-2`}>
                          <Icon size={18} strokeWidth={2.4} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-snug">
                            {service.title}
                          </div>
                          <div className="text-[10px] text-slate-500 font-hindi mt-0.5">
                            {service.hindi}
                          </div>
                        </div>
                        <div className="mt-2 text-[10px] font-bold text-[#1976D2] group-hover:underline flex items-center gap-0.5">
                          <span>{service.actionText}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* VILLAGE MAP & FACILITIES */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapIcon size={18} className="text-[#1976D2]" />
                    <h2 className="text-base font-extrabold text-slate-900">Village Map & Facilities</h2>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/GM47mAhRpmHp5qYw6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
                  >
                    <span>View Full Map</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mt-4 items-center">
                  <div className="sm:col-span-5 space-y-2 text-xs">
                    {[
                      { name: 'Gram Panchayat', color: 'bg-blue-600' },
                      { name: 'School', color: 'bg-emerald-500' },
                      { name: 'Anganwadi', color: 'bg-orange-500' },
                      { name: 'Health Center', color: 'bg-rose-500' },
                      { name: 'Temple', color: 'bg-amber-500' },
                      { name: 'Water Tank', color: 'bg-cyan-500' },
                      { name: 'Playground', color: 'bg-purple-500' },
                      { name: 'Main Road', color: 'bg-slate-700' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-2 text-slate-700">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                        <span className="text-[11px] font-semibold">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sm:col-span-7 relative h-52 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
                    <Image
                      src="/images/natural_beauty.jpg"
                      alt="Village Map Moti Nagar"
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-950/40" />

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 rounded-xl px-2.5 py-1.5 shadow-lg border border-slate-200 text-center pointer-events-none">
                      <div className="text-[11px] font-extrabold text-slate-900 leading-none">Moti Nagar</div>
                      <div className="text-[9px] text-slate-500 font-medium">Bundi, Rajasthan (25.7985° N, 76.2161° E)</div>
                    </div>

                    <div className="absolute top-5 left-8 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md animate-bounce">
                      🏛️
                    </div>
                    <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      🏥
                    </div>
                    <div className="absolute top-8 right-6 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      🏫
                    </div>
                    <div className="absolute bottom-6 right-10 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      🛕
                    </div>

                    <div className="absolute right-2 top-2 flex flex-col gap-1 z-10">
                      <button
                        onClick={() => setMapZoom(prev => Math.min(prev + 0.2, 2))}
                        className="w-6 h-6 rounded bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs text-xs font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setMapZoom(prev => Math.max(prev - 0.2, 0.8))}
                        className="w-6 h-6 rounded bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs text-xs font-bold"
                      >
                        -
                      </button>
                    </div>

                    <a
                      href="https://maps.app.goo.gl/GM47mAhRpmHp5qYw6"
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2 inset-x-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white py-1.5 px-3 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition border border-white/20"
                    >
                      <Navigation size={11} />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* C. SECTION: GOVERNMENT SCHEMES + LATEST ANNOUNCEMENTS */}
          <div id="schemes-section" className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* GOVERNMENT SCHEMES */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-white">
                      <Building2 size={13} />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Government Schemes</h2>
                  </div>
                  <button
                    onClick={() => setSelectedSchemeModal(governmentSchemes[0])}
                    className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
                  >
                    <span>View All Schemes</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-4">
                  {governmentSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      onClick={() => setSelectedSchemeModal(scheme)}
                      className="group rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <Image
                          src={scheme.img}
                          alt={scheme.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 20vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-3 text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                            {scheme.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-hindi mt-0.5 line-clamp-1">
                            {scheme.hindi}
                          </p>
                        </div>

                        <button className="mt-2.5 text-[10px] font-bold text-[#1976D2] group-hover:underline flex items-center justify-center gap-1">
                          <span>Know More</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LATEST ANNOUNCEMENTS */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 text-base">📢</span>
                    <h2 className="text-base font-extrabold text-slate-900">Latest Announcements</h2>
                  </div>
                  <Link
                    href="/#news"
                    className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100 mt-1">
                  {[
                    { day: '04', month: 'Oct', title: 'ग्राम सभा की बैठक 10 अक्टूबर को आयोजित होगी', meta: 'Official Announcement', badge: 'New', badgeColor: 'bg-[#ef4444] text-white' },
                    { day: '02', month: 'Oct', title: 'स्वच्छता अभियान - हमारा गाँव, स्वच्छ गाँव', meta: 'Village Development', badge: 'Event', badgeColor: 'bg-[#10b981] text-white' },
                    { day: '28', month: 'Sep', title: 'प्रधानमंत्री आवास योजना की नई सूची जारी', meta: 'Government Scheme', badge: 'Scheme', badgeColor: 'bg-[#3b82f6] text-white' },
                    { day: '25', month: 'Sep', title: 'गाँव में स्वास्थ्य शिविर का आयोजन', meta: 'Free Health Camp', badge: 'Health', badgeColor: 'bg-[#8b5cf6] text-white' },
                  ].map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-start gap-2.5 group cursor-pointer hover:bg-slate-50 rounded-xl px-1 transition">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-extrabold text-slate-900 leading-none">{item.day}</span>
                        <span className="text-[9px] font-semibold text-slate-400 uppercase mt-0.5">{item.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 font-hindi leading-snug line-clamp-2 group-hover:text-[#1976D2] transition">
                          {item.title}
                        </h4>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                          {item.meta}
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* D. SECTION: DEVELOPMENT PROGRESS + QUICK LINKS */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {/* DEVELOPMENT PROGRESS */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white">
                      <Sparkles size={13} />
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900">Development Progress</h2>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold font-hindi">विकास लक्ष्य 2026-27</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                  {[
                    { label: 'Roads', value: '85%', sub: '12 / 14 km', percent: 85, color: 'bg-emerald-500', icon: Navigation },
                    { label: 'Electricity', value: '100%', sub: 'Full Coverage', percent: 100, color: 'bg-amber-500', icon: Zap },
                    { label: 'Water Supply', value: '90%', sub: '18 / 20 Areas', percent: 90, color: 'bg-blue-500', icon: Droplets },
                    { label: 'Street Lights', value: '75%', sub: '150 / 200', percent: 75, color: 'bg-amber-400', icon: Lightbulb },
                    { label: 'Toilet Coverage', value: '100%', sub: 'Swachh Bharat', percent: 100, color: 'bg-emerald-600', icon: CheckCircle },
                    { label: 'Wi-Fi / Internet', value: '60%', sub: '3 / 5 Areas', percent: 60, color: 'bg-blue-600', icon: Wifi },
                  ].map((m) => {
                    const Icon = m.icon
                    return (
                      <div key={m.label} className="bg-slate-50 border border-slate-100 rounded-2xl p-3 flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className="text-slate-600" />
                          <div className="text-xs font-bold text-slate-800">{m.label}</div>
                        </div>
                        <div className="mt-3">
                          <div className="text-lg font-extrabold text-slate-900">{m.value}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{m.sub}</div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
                            <div className={`h-full ${m.color}`} style={{ width: `${m.percent}%` }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[#1976D2] text-base">🔗</span>
                    <h2 className="text-base font-extrabold text-slate-900">Quick Links</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                  {[
                    { title: 'Download Forms', hindi: 'सभी आवश्यक फॉर्म', icon: Download, color: 'text-amber-600 bg-amber-50', action: () => { window.location.href = '/certificates' } },
                    { title: 'Important Documents', hindi: 'महत्वपूर्ण दस्तावेज', icon: FileText, color: 'text-blue-600 bg-blue-50', action: () => { window.location.href = '/certificates' } },
                    { title: 'Contact Officials', hindi: 'अधिकारी संपर्क', icon: Users, color: 'text-emerald-600 bg-emerald-50', action: () => { handleSelectNav('grievance') } },
                    { title: 'Village Gallery', hindi: 'ग्राम की झलक', icon: MapPin, color: 'text-sky-600 bg-sky-50', action: () => { window.location.href = '/#gallery' } },
                    { title: 'FAQs', hindi: 'अक्सर पूछे जाने वाले प्रश्न', icon: HelpCircle, color: 'text-indigo-600 bg-indigo-50', action: () => { alert('ग्राम पोर्टल सहायता: किसी भी प्रश्न हेतु 0747-224400 पर कॉल करें।') } },
                    { title: 'Help & Support', hindi: 'सहायता केंद्र', icon: Headphones, color: 'text-purple-600 bg-purple-50', action: () => { handleSelectNav('grievance') } },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.title}
                        onClick={item.action}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100 transition-all text-left flex items-start gap-2.5 group"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#1976D2] truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-hindi mt-0.5 truncate">
                            {item.hindi}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 3. MOBILE APP BOTTOM NAVIGATION BAR */}
      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* ================= MODALS ================= */}

      {/* Service Application / Info Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-rise">
            <div className={`${selectedServiceModal.bg} ${selectedServiceModal.border} border-b p-5 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${selectedServiceModal.iconColor} shadow-xs`}>
                  <selectedServiceModal.icon size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                    {selectedServiceModal.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 font-hindi mt-0.5">
                    {selectedServiceModal.hindi}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedServiceModal(null)
                  setAppliedSuccess(false)
                }}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-slate-700 font-hindi leading-relaxed">
                {selectedServiceModal.desc}
              </p>

              {appliedSuccess ? (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-emerald-900 font-hindi">आवेदन सफलता पूर्वक प्राप्त हुआ!</div>
                  <div className="text-xs text-emerald-700 mt-1">आवेदन टोकन संख्या: MN-SRV-2026-8812</div>
                  <div className="text-[11px] text-slate-500 mt-2 font-hindi">ग्राम पंचायत सेवा केंद्र 2 कार्य दिवस में सत्यापन करेगा।</div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAppliedSuccess(true)
                  }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">आवेदक का नाम</label>
                    <input required defaultValue="Pravin Kumar" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोबाइल नंबर / आधार संख्या</label>
                    <input required placeholder="10 अंकों का मोबाइल नंबर" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">पता / वार्ड संख्या</label>
                    <input required placeholder="मोती नगर वार्ड सं." className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans" />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>ऑनलाइन आवेदन जमा करें (Submit Application)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scheme Modal */}
      {selectedSchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-rise">
            <div className="relative aspect-video bg-slate-900">
              <Image src={selectedSchemeModal.img} alt={selectedSchemeModal.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
              <button
                onClick={() => setSelectedSchemeModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <h3 className="font-extrabold text-lg leading-tight">{selectedSchemeModal.title}</h3>
                <div className="text-xs text-amber-300 font-hindi">{selectedSchemeModal.hindi}</div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-xs sm:text-sm text-slate-700 font-hindi leading-relaxed">
                {selectedSchemeModal.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-800">पात्रता एवं लाभ:</div>
                <ul className="text-xs text-slate-600 font-hindi space-y-1 list-disc list-inside">
                  <li>मोती नगर ग्राम पंचायत का मूल निवासी होना अनिवार्य है।</li>
                  <li>जन आधार कार्ड एवं बैंक खाता संख्या लिंक होना आवश्यक।</li>
                  <li>आवेदन फॉर्म ई-मित्र अथवा पंचायत कार्यालय में जमा कराया जा सकता है।</li>
                </ul>
              </div>

              <button
                onClick={() => {
                  setSelectedSchemeModal(null)
                  setSelectedServiceModal(popularServices[0])
                }}
                className="mt-4 w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>इस योजना के लिए आवेदन करें</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
