'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Home,
  Info,
  MapPin,
  Landmark,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Newspaper,
  Mail,
  Search,
  User,
  X,
  Play,
  Calendar,
  Sun,
  Users,
  Building2,
  GraduationCap,
  HeartPulse,
  Leaf,
  UsersRound,
  FileText,
  IndianRupee,
  Map as MapIcon,
  MessageSquare,
  Volume2,
  Trophy,
  Star,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Send,
  PhoneCall,
  Clock,
  Compass,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react'
import { MandiWeatherWidget } from '@/components/mandi-weather-widget'
import { ApplicationTrackerModal } from '@/components/application-tracker-modal'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// Data for Quick Services
const quickServices = [
  {
    id: 'panchayat-info',
    title: 'Panchayat Information',
    hindi: 'पंचायत विवरण',
    icon: Landmark,
    bg: 'bg-[#e3f0fe]',
    border: 'border-[#c6e1fc]',
    hoverBg: 'hover:bg-[#d6e9fd]',
    iconColor: 'text-[#1976D2]',
    description: 'सरपंच, उपसरपंच, वार्ड पंचों की सूची, बैठक कार्यवाही और ग्राम सभा के आधिकारिक निर्णय।',
  },
  {
    id: 'citizen-services',
    title: 'Citizen Services',
    subtitle: '(जन्म, मृत्यु, निवास आदि)',
    hindi: 'नागरिक सेवाएं',
    icon: Users,
    bg: 'bg-[#fde7ed]',
    border: 'border-[#fbcbd6]',
    hoverBg: 'hover:bg-[#fbdde5]',
    iconColor: 'text-[#e11d48]',
    description: 'जन्म, मृत्यु, जाति, मूल निवास, आय प्रमाण पत्र और राशन कार्ड के लिए आवेदन व स्थिति जांच।',
  },
  {
    id: 'govt-schemes',
    title: 'Government Schemes',
    subtitle: '(प्रधानमंत्री/राज्य योजनाएं)',
    hindi: 'सरकारी योजनाएं',
    icon: FileText,
    bg: 'bg-[#daf5e7]',
    border: 'border-[#b8edd0]',
    hoverBg: 'hover:bg-[#cbf1dc]',
    iconColor: 'text-[#059669]',
    description: 'पीएम आवास योजना, किसान सम्मान निधि, चिरंजीवी स्वास्थ्य बीमा, वृद्धावस्था पेंशन आदि।',
  },
  {
    id: 'jobs',
    title: 'Job & Opportunities',
    subtitle: '(सरकारी/निजी रोजगार)',
    hindi: 'रोजगार एवं अवसर',
    icon: IndianRupee,
    bg: 'bg-[#fef2d3]',
    border: 'border-[#fde4a7]',
    hoverBg: 'hover:bg-[#fdebbd]',
    iconColor: 'text-[#d97706]',
    description: 'मनरेगा कार्य, ग्रामीण स्वरोजगार प्रशिक्षण, कौशल विकास केंद्र एवं स्थानीय नौकरियों की सूचना।',
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: '(Schools, Colleges)',
    hindi: 'शिक्षा एवं विद्यालय',
    icon: GraduationCap,
    bg: 'bg-[#ece5f9]',
    border: 'border-[#dbcdfa]',
    hoverBg: 'hover:bg-[#e4d9f7]',
    iconColor: 'text-[#7c3aed]',
    description: 'राजकीय उच्च माध्यमिक विद्यालय, प्राथमिक विद्यालय, छात्रवृत्ति योजनाएं और पुस्तकालय।',
  },
  {
    id: 'health',
    title: 'Health Services',
    subtitle: '(PHC, Hospitals)',
    hindi: 'स्वास्थ्य सेवाएं',
    icon: HeartPulse,
    bg: 'bg-[#fde4e4]',
    border: 'border-[#fcc7c7]',
    hoverBg: 'hover:bg-[#fcd5d5]',
    iconColor: 'text-[#dc2626]',
    description: 'प्राथमिक स्वास्थ्य केंद्र (PHC), 24x7 एम्बुलेंस सुविधा, टीकाकरण अभियान एवं मुफ्त दवा वितरण।',
  },
  {
    id: 'maps',
    title: 'Village Maps',
    subtitle: '(Location & Facilities)',
    hindi: 'गाँव का नक्शा',
    icon: MapIcon,
    bg: 'bg-[#d5f6ee]',
    border: 'border-[#b1eee0]',
    hoverBg: 'hover:bg-[#c4f2e7]',
    iconColor: 'text-[#0d9488]',
    description: 'मोती नगर का भौगोलिक नक्शा, सार्वजनिक स्थल, जल स्रोत, पंचायत भवन व स्कूल की दिशा।',
  },
  {
    id: 'grievance',
    title: 'Grievance / Suggestion',
    subtitle: '(शिकायत / सुझाव)',
    hindi: 'शिकायत व सुझाव',
    icon: MessageSquare,
    bg: 'bg-[#f2e7fe]',
    border: 'border-[#e3ccfc]',
    hoverBg: 'hover:bg-[#ebd9fd]',
    iconColor: 'text-[#9333ea]',
    description: 'गाँव के विकास के लिए अपने बहुमूल्य सुझाव दें या किसी समस्या की शिकायत सीधे दर्ज कराएं।',
  },
]

// Data for News
const newsList = [
  {
    day: '04',
    month: 'Oct',
    title: 'ग्राम पंचायत की नई बैठक 10 अक्टूबर को आयोजित होगी',
    meta: 'Official Announcement',
    badge: 'New',
    badgeColor: 'bg-[#ef4444] text-white',
  },
  {
    day: '02',
    month: 'Oct',
    title: 'स्वच्छता अभियान - हमारा गाँव, स्वच्छ गाँव',
    meta: 'Village Development',
    badge: 'Event',
    badgeColor: 'bg-[#10b981] text-white',
  },
  {
    day: '28',
    month: 'Sep',
    title: 'प्रधानमंत्री आवास योजना की नई सूची जारी',
    meta: 'Government Scheme',
    badge: 'Scheme',
    badgeColor: 'bg-[#3b82f6] text-white',
  },
  {
    day: '25',
    month: 'Sep',
    title: 'गाँव में स्वास्थ्य शिविर का आयोजन',
    meta: 'Free Health Camp',
    badge: 'Health',
    badgeColor: 'bg-[#8b5cf6] text-white',
  },
]

// Data for Upcoming Events
const eventsList = [
  {
    day: '10',
    month: 'Oct',
    dayColor: 'text-[#ef4444]',
    title: 'ग्राम सभा बैठक',
    timeLocation: '11:00 AM - Panchayat Bhawan',
    badge: 'Official',
    badgeColor: 'bg-[#10b981] text-white',
  },
  {
    day: '15',
    month: 'Oct',
    dayColor: 'text-[#0d9488]',
    title: 'स्वच्छता अभियान',
    timeLocation: '08:00 AM - Village Area',
    badge: 'Social',
    badgeColor: 'bg-[#3b82f6] text-white',
  },
  {
    day: '02',
    month: 'Nov',
    dayColor: 'text-[#ef4444]',
    title: 'दीपावली सांस्कृतिक कार्यक्रम',
    timeLocation: '07:00 PM - Community Ground',
    badge: 'Cultural',
    badgeColor: 'bg-[#f59e0b] text-white',
  },
  {
    day: '14',
    month: 'Nov',
    dayColor: 'text-[#3b82f6]',
    title: 'बाल दिवस प्रतियोगिता',
    timeLocation: '10:00 AM - Government School',
    badge: 'Education',
    badgeColor: 'bg-[#8b5cf6] text-white',
  },
]

// Data for Photo Gallery
const galleryImages = [
  { id: 1, title: 'Our Temple', src: '/images/temple.jpg', desc: 'ऐतिहासिक प्राचीन नक्काशीदार मंदिर - मोती नगर' },
  { id: 2, title: 'Natural Beauty', src: '/images/natural_beauty.jpg', desc: 'अरावली पर्वत श्रृंखला एवं ऐतिहासिक किला' },
  { id: 3, title: 'Village Life', src: '/images/village_life.jpg', desc: 'लहलहाते खेत, हरियाली एवं ग्रामीण परिवेश' },
  { id: 4, title: 'Government School', src: '/images/govt_school.jpg', desc: 'राजकीय उच्च प्राथमिक एवं माध्यमिक विद्यालय' },
  { id: 5, title: 'Panchayat Bhawan', src: '/images/panchayat_bhawan.jpg', desc: 'ग्राम पंचायत कार्यालय भवन एवं डिजिटल सेवा केंद्र' },
  { id: 6, title: 'Cultural Events', src: '/images/cultural_events.jpg', desc: 'गाँव का पारंपरिक लोक उत्सव व दीपोत्सव समारोह' },
]

export default function MotiNagarPortal() {
  const [activeNav, setActiveNav] = useState('Home')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<typeof quickServices[0] | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false)
  const [trackerModalOpen, setTrackerModalOpen] = useState(false)

  // Filtered services for search
  const filteredServices = searchQuery.trim()
    ? quickServices.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hindi.includes(searchQuery) ||
        (s.subtitle && s.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1e293b] flex flex-col font-sans pb-16 lg:pb-0">
      {/* 1. TOP HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          {/* Logo & Village Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            {/* Custom Golden Chhatri Temple Emblem */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/80 border border-amber-200/90 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
                {/* Temple Spire / Kalash */}
                <path d="M24 4L26 8H22L24 4Z" fill="#D97706" />
                <circle cx="24" cy="3.5" r="1.5" fill="#F59E0B" />
                {/* Chhatri Dome */}
                <path d="M16 16C16 11.5817 19.5817 8 24 8C28.4183 8 32 11.5817 32 16H16Z" fill="#B45309" />
                <path d="M18 16C18 12.6863 20.6863 10 24 10C27.3137 10 30 12.6863 30 16H18Z" fill="#D97706" />
                {/* Pillars */}
                <rect x="17" y="16" width="2" height="15" fill="#92400E" rx="0.5" />
                <rect x="23" y="16" width="2" height="15" fill="#B45309" rx="0.5" />
                <rect x="29" y="16" width="2" height="15" fill="#92400E" rx="0.5" />
                {/* Arch between pillars */}
                <path d="M19 20C19 18 23 18 23 20" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M25 20C25 18 29 18 29 20" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                {/* Base Plinth */}
                <rect x="13" y="31" width="22" height="4" fill="#78350F" rx="1" />
                <rect x="11" y="35" width="26" height="4" fill="#92400E" rx="1" />
                {/* Green Foliage Accents */}
                <circle cx="9" cy="34" r="5" fill="#15803D" opacity="0.85" />
                <circle cx="39" cy="34" r="5" fill="#15803D" opacity="0.85" />
                <circle cx="7" cy="37" r="4" fill="#166534" />
                <circle cx="41" cy="37" r="4" fill="#166534" />
              </svg>
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight leading-none font-sans">
                Moti Nagar
              </div>
              <div className="text-[11px] font-medium text-slate-500 tracking-wide mt-1 leading-none">
                Bundi, Rajasthan
              </div>
            </div>
          </Link>

          {/* Navigation Items (Center) */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            {[
              { name: 'Home', icon: Home, href: '#' },
              { name: 'About', icon: Info, href: '#about' },
              { name: 'Our Village', icon: MapPin, href: '#village' },
              { name: 'Panchayat', icon: Landmark, href: '#panchayat' },
              { name: 'Services', icon: Layers, href: '#services' },
              { name: 'Development', icon: Sparkles, href: '#development' },
              { name: 'Gallery', icon: ImageIcon, href: '#gallery' },
              { name: 'News', icon: Newspaper, href: '#news' },
              { name: 'Contact', icon: Mail, href: '#contact' },
            ].map((item) => {
              const Icon = item.icon
              const isActive = activeNav === item.name
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveNav(item.name)
                    if (item.name === 'Services') {
                      window.location.href = '/services'
                    } else if (item.name === 'Gallery') {
                      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
                    } else if (item.name === 'News') {
                      document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })
                    } else if (item.name === 'Our Village') {
                      window.location.href = '/village'
                    } else if (item.name === 'Panchayat') {
                      window.location.href = '/panchayat'
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1976D2] text-white shadow-sm'
                      : 'hover:text-[#1976D2] hover:bg-slate-100/70 text-slate-700'
                  }`}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.4 : 2} />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="खोजें / Search"
              className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1976D2] hover:border-blue-300 hover:bg-blue-50/50 transition-all"
            >
              <Search size={16} />
            </button>

            {/* Login / Register Button */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <User size={14} strokeWidth={2.4} />
              <span>Login / Register</span>
            </button>
          </div>
        </div>

        {/* Search Dropdown / Bar */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-white py-3 px-4 shadow-md transition-all">
            <div className="max-w-[1360px] mx-auto flex items-center gap-3">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="योजना, सेवा, प्रमाण पत्र या ग्राम पंचायत की जानकारी खोजें..."
                className="w-full text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400 font-hindi"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1"
              >
                बंद करें
              </button>
            </div>
            {/* Quick search suggestions */}
            {searchQuery && filteredServices.length > 0 && (
              <div className="max-w-[1360px] mx-auto mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                {filteredServices.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedService(item)
                      setSearchOpen(false)
                    }}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1.5"
                  >
                    <span>{item.title}</span>
                    <span className="text-blue-500 text-[11px]">({item.hindi})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* 2. HERO BANNER SECTION */}
      <section className="relative w-full overflow-hidden bg-slate-900 min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
        {/* Background Image: Panoramic Bundi Landscape with Chhatri */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Moti Nagar, Bundi, Rajasthan landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to make text crystal clear while keeping right-side temple visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f5f7fb] via-[#f5f7fb]/40 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl text-white">
            {/* Accent badge */}
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm tracking-wider uppercase font-hindi">
              <span className="w-8 h-[2px] bg-amber-400 inline-block rounded-full"></span>
              हमारा गाँव, हमारी पहचान
            </div>

            {/* Huge Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mt-3 font-sans drop-shadow-md">
              Moti Nagar
              <br />
              <span className="text-white/95">Bundi, Rajasthan</span>
            </h1>

            {/* Hindi Subtitle */}
            <p className="mt-3 text-base sm:text-lg font-medium text-white/90 font-hindi drop-shadow">
              संस्कृति, विकास और एकता का प्रतीक
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1976D2] hover:bg-[#1565C0] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Compass size={16} />
                <span>Explore Our Village</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Play size={10} className="ml-0.5 fill-white" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Right Weather & Date Card */}
          <div className="self-start lg:self-center shrink-0">
            <div className="w-[260px] rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 p-4 text-white shadow-2xl transition-transform hover:scale-[1.02]">
              {/* Weather Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Sun size={24} className="animate-spin-slow" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold leading-none tracking-tight">28°C</div>
                    <div className="text-[11px] font-semibold text-white/90 mt-0.5">Moti Nagar</div>
                    <div className="text-[10px] text-white/70">Clear Sky</div>
                  </div>
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="my-3 border-t border-white/15" />

              {/* Date */}
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <Calendar size={14} className="text-white/70" />
                <span>Mon, 04 Oct 2026</span>
              </div>

              {/* Subtle Divider */}
              <div className="my-3 border-t border-white/15" />

              {/* Quote */}
              <div className="text-xs text-amber-200/90 font-hindi leading-snug flex items-center justify-between">
                <span>&ldquo;सुनहरा कल, हमारे गाँव के साथ&rdquo;</span>
                <span className="text-sm">🍃</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY STATS FLOATING BAR */}
      <section className="relative z-20 max-w-[1320px] mx-auto px-4 w-full -mt-8 sm:-mt-10 mb-6">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {/* Stat 1: Total Population */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0">
              <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1976D2] flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">1,245</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Total Population</div>
                <div className="text-[11px] text-slate-400 font-medium">Census 2021</div>
              </div>
            </div>

            {/* Stat 2: Total Households */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:pl-5">
              <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <Building2 size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">312</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Total Households</div>
                <div className="text-[11px] text-slate-400 font-medium">Our Village</div>
              </div>
            </div>

            {/* Stat 3: Schools */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:pl-5">
              <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">2</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Schools</div>
                <div className="text-[11px] text-slate-400 font-medium">Education</div>
              </div>
            </div>

            {/* Stat 4: Health Center */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:pl-5">
              <div className="w-11 h-11 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <HeartPulse size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">1</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Health Center</div>
                <div className="text-[11px] text-slate-400 font-medium">Healthcare</div>
              </div>
            </div>

            {/* Stat 5: Clean & Green */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:pl-5">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Leaf size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">100%</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Clean & Green</div>
                <div className="text-[11px] text-slate-400 font-medium">Our Goal</div>
              </div>
            </div>

            {/* Stat 6: Active Gram Panchayat */}
            <div className="flex items-center gap-3.5 pt-2 sm:pt-0 lg:pl-5">
              <div className="w-11 h-11 rounded-full bg-indigo-50 text-[#1976D2] flex items-center justify-center shrink-0">
                <UsersRound size={22} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-none">Active</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">Gram Panchayat</div>
                <div className="text-[11px] text-slate-400 font-medium">Working for You</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUICK SERVICES SECTION */}
      <section id="services" className="max-w-[1320px] mx-auto px-4 py-5 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-lg leading-none mt-0.5">⚡</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                Quick Services
              </h2>
              <p className="text-xs text-slate-500 font-hindi mt-1">
                Gaon se judi sabhi jaruri jaankari aur sevaayein ek hi jagah
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTrackerModalOpen(true)}
              className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition font-hindi shadow-2xs"
            >
              <span>📋 आवेदन स्टेटस ट्रैक करें</span>
            </button>
            <Link
              href="/services"
              className="text-xs font-bold text-[#1976D2] hover:text-blue-800 flex items-center gap-1 transition"
            >
              <span>View All Services</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 8 Pastel Service Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickServices.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`${service.bg} ${service.border} border rounded-2xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md group min-h-[140px]`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center ${service.iconColor} shadow-2xs group-hover:scale-110 transition-transform mb-2.5`}>
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                  {service.title}
                </div>
                {service.subtitle && (
                  <div className="text-[10px] text-slate-500 font-hindi mt-1 line-clamp-1">
                    {service.subtitle}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* 4.5 LIVE MANDI BHAV & WEATHER ADVISORY */}
      <section className="max-w-[1320px] mx-auto px-4 py-4 w-full">
        <MandiWeatherWidget />
      </section>

      {/* 5. MIDDLE 3-COLUMN SECTION (Latest News, Our Village, Upcoming Events) */}
      <section id="news" className="max-w-[1320px] mx-auto px-4 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMN 1: Latest News & Updates */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">📢</span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Latest News & Updates
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(quickServices[0])}
                  className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-0.5"
                >
                  View All &rarr;
                </button>
              </div>

              {/* News List */}
              <div className="divide-y divide-slate-100 mt-1">
                {newsList.map((news, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl px-1.5 transition">
                    {/* Date Badge */}
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-slate-900 leading-none">{news.day}</span>
                      <span className="text-[10px] font-semibold text-slate-400 leading-none mt-1 uppercase">{news.month}</span>
                    </div>

                    {/* News Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 font-hindi leading-snug line-clamp-2 group-hover:text-[#1976D2] transition-colors">
                        {news.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-medium mt-1">
                        {news.meta}
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${news.badgeColor}`}>
                      {news.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 2: Our Village */}
          <div id="our-village" className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-lg">🍃</span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Our Village
                  </h3>
                </div>
                <Link
                  href="/village"
                  className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-0.5"
                >
                  विस्तृत प्रोफाइल &rarr;
                </Link>
              </div>

              {/* Video Preview Card */}
              <div
                onClick={() => setVideoModalOpen(true)}
                className="relative mt-3 rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer group shadow-sm"
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Our Village Bundi Rajasthan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />

                {/* Circular Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 border border-white/40 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#1976D2] transition-all duration-300 shadow-lg">
                    <Play size={18} className="ml-1 fill-white" />
                  </div>
                </div>
              </div>

              {/* Hindi Description */}
              <p className="mt-3 text-xs text-slate-600 font-hindi leading-relaxed">
                मोती नगर, बूँदी जिले का एक सुंदर और ऐतिहासिक गाँव है, जो अपनी संस्कृति, वीरता, प्राकृतिक सौंदर्य और एकजुटता के लिए जाना जाता है।
              </p>

              {/* 4 Feature Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-semibold">
                  <span>🌸</span>
                  <span>Rich Culture</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                  <span>🍃</span>
                  <span>Beautiful Nature</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-semibold">
                  <span>🏛️</span>
                  <span>Historical Importance</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-semibold">
                  <span>❤️</span>
                  <span>United Community</span>
                </div>
              </div>

              {/* High-Impact CTA to dedicated Village Profile */}
              <Link
                href="/village"
                className="mt-4 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition duration-200"
              >
                <span>🏠 मेरा गाँव प्रोफाइल खोलें (My Village)</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* COLUMN 3: Upcoming Events */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-rose-500 text-lg">📅</span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Upcoming Events
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(quickServices[0])}
                  className="text-xs font-bold text-[#1976D2] hover:underline flex items-center gap-0.5"
                >
                  View All &rarr;
                </button>
              </div>

              {/* Events List */}
              <div className="divide-y divide-slate-100 mt-1">
                {eventsList.map((event, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-3 group cursor-pointer hover:bg-slate-50/60 rounded-xl px-1.5 transition">
                    {/* Date Badge */}
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                      <span className={`text-sm font-extrabold ${event.dayColor} leading-none`}>
                        {event.day}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 leading-none mt-1 uppercase">
                        {event.month}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 font-hindi leading-snug group-hover:text-[#1976D2] transition-colors">
                        {event.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-medium mt-1">
                        {event.timeLocation}
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${event.badgeColor}`}>
                      {event.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY SECTION */}
      <section id="gallery" className="max-w-[1320px] mx-auto px-4 py-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#1976D2] text-xl">📷</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              Photo Gallery
            </h2>
          </div>
          <button
            onClick={() => setActivePhotoIndex(0)}
            className="text-xs font-bold text-[#1976D2] hover:text-blue-800 flex items-center gap-1 transition"
          >
            <span>View Gallery</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 6 Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Title Overlay at bottom */}
              <div className="absolute inset-x-2 bottom-2 text-white flex items-center gap-1.5 text-xs font-bold drop-shadow">
                <ImageIcon size={13} className="shrink-0 text-white/80" />
                <span className="truncate">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM BANNER / FOOTER HIGHLIGHTS */}
      <footer className="mt-auto relative bg-[#091524] text-white overflow-hidden border-t border-slate-800">
        {/* Warm golden twilight mountain glow in the background */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-amber-500/20 via-orange-500/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* 4 Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full lg:w-auto">
              {/* Highlight 1: Progressive Village */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Progressive Village</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Development Focus</div>
                </div>
              </div>

              {/* Highlight 2: United Community */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">United Community</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Strong Social Bond</div>
                </div>
              </div>

              {/* Highlight 3: Clean & Green */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Leaf size={20} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Clean & Green</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Eco-Friendly Village</div>
                </div>
              </div>

              {/* Highlight 4: Bright Future */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Star size={20} />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">Bright Future</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">For Next Generation</div>
                </div>
              </div>
            </div>

            {/* Right Quote Box with Gold Border */}
            <div className="w-full lg:w-auto shrink-0">
              <div className="rounded-xl border border-amber-400/50 bg-black/40 backdrop-blur-md px-5 py-3.5 flex items-center gap-3 shadow-lg">
                <span className="text-amber-400 text-2xl font-serif leading-none shrink-0">&ldquo;</span>
                <div className="text-xs sm:text-sm font-semibold font-hindi text-white tracking-wide">
                  मिलकर बनाएंगे और भी बेहतर मोती नगर
                </div>
                <span className="text-amber-400 text-2xl font-serif leading-none shrink-0">&rdquo;</span>
              </div>
            </div>
          </div>

          {/* Subfooter credits */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div>
              &copy; {new Date().getFullYear()} ग्राम पंचायत गुढ़ा (राजस्व ग्राम: मोतीनगर), तहसील इन्द्रगढ़, पंचायत समिति लाखेरी, जिला बूँदी (राजस्थान)। सर्वाधिकार सुरक्षित।
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setSelectedService(quickServices[0])} className="hover:text-white transition">पंचायत संरचना</button>
              <button onClick={() => setSelectedService(quickServices[2])} className="hover:text-white transition">योजनाएं</button>
              <button onClick={() => setSelectedService(quickServices[7])} className="hover:text-white transition">शिकायत निवारण</button>
              <button onClick={() => setLoginModalOpen(true)} className="hover:text-white transition">अधिकारी लॉगिन</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODALS & POPUPS ================= */}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-rise">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Play size={16} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-sm">मोती नगर दर्शन | Village Documentary & Tour</span>
              </div>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Preview */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="Village Tour Preview"
                fill
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

              <div className="relative z-10 text-center text-white px-6">
                <div className="w-16 h-16 rounded-full bg-[#1976D2] border-2 border-white flex items-center justify-center mx-auto mb-4 shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
                <h3 className="text-xl font-bold font-hindi">हमारा गौरवशाली मोती नगर</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 font-hindi">
                  बूँदी जिले के ऐतिहासिक गौरव, प्राकृतिक छटा, लोक संस्कृति और आधुनिक विकास की 5 मिनट की विशेष डॉक्यूमेंट्री।
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span className="font-hindi">अवधि: 05:42 मिनट | 4K Ultra HD</span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-rise">
            <div className={`${selectedService.bg} ${selectedService.border} border-b p-5 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${selectedService.iconColor} shadow-xs`}>
                  <selectedService.icon size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 font-hindi mt-0.5">
                    {selectedService.hindi}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedService(null)
                  setGrievanceSubmitted(false)
                }}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-slate-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs sm:text-sm text-slate-700 font-hindi leading-relaxed">
                {selectedService.description}
              </p>

              {/* If Grievance Service */}
              {selectedService.id === 'grievance' ? (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  {grievanceSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                      <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-2" />
                      <div className="text-sm font-bold text-emerald-900 font-hindi">आपकी शिकायत / सुझाव प्राप्त हुआ!</div>
                      <div className="text-xs text-emerald-700 mt-1">संदर्भ संख्या: MN-2026-9481 | ग्राम सचिव 48 घंटे में समाधान करेंगे।</div>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setGrievanceSubmitted(true)
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">आपका नाम</label>
                        <input required placeholder="पूरा नाम दर्ज करें" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोबाइल नंबर</label>
                        <input required type="tel" placeholder="10 अंकों का मोबाइल नंबर" className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">शिकायत अथवा सुझाव</label>
                        <textarea required rows={3} placeholder="यहाँ अपना विवरण लिखें..." className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500" />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                      >
                        <Send size={14} />
                        <span>सुझाव / शिकायत दर्ज करें</span>
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  <div className="text-xs font-bold text-slate-800">उपलब्ध सुविधाएं:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-hindi">
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>ऑनलाइन आवेदन सुविधा</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>दस्तावेज़ सत्यापन केंद्र</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>ई-मित्र / सीएससी सुविधा</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>हेल्पलाइन एवं मार्गदर्शन</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <PhoneCall size={13} className="text-[#1976D2]" />
                      <span>सहायता नंबर: 0747-224400</span>
                    </div>
                    <button
                      onClick={() => alert('आपके अनुरोध को दर्ज कर लिया गया है। ग्राम सचिव से संपर्क किया जा रहा है।')}
                      className="bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-xs"
                    >
                      आवेदन करें &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            {/* Close button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-1 text-xs font-semibold"
            >
              <span>बंद करें</span>
              <X size={20} />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-2xl">
              <Image
                src={galleryImages[activePhotoIndex].src}
                alt={galleryImages[activePhotoIndex].title}
                fill
                className="object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePhotoIndex((activePhotoIndex - 1 + galleryImages.length) % galleryImages.length)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePhotoIndex((activePhotoIndex + 1) % galleryImages.length)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20"
              >
                <ChevronRightIcon size={20} />
              </button>
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white">
              <h4 className="text-base font-bold">{galleryImages[activePhotoIndex].title}</h4>
              <p className="text-xs text-slate-300 font-hindi mt-1">
                {galleryImages[activePhotoIndex].desc}
              </p>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {activePhotoIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login / Register Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-rise">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1976D2] flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">पोर्टल लॉगिन / पंजीयन</h3>
                  <p className="text-[11px] text-slate-500">Moti Nagar Citizen Portal</p>
                </div>
              </div>
              <button onClick={() => setLoginModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('OTP भेजा गया है! कृपया अपने मोबाइल पर आया 6 अंकों का कोड दर्ज करें।')
                setLoginModalOpen(false)
              }}
              className="mt-4 space-y-3.5"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">मोबाइल नंबर अथवा जन आधार</label>
                <input
                  required
                  type="text"
                  placeholder="उदा. 98290XXXXX / जन आधार संख्या"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">उपयोगकर्ता प्रकार</label>
                <select className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none bg-white text-slate-700">
                  <option>गाँव के नागरिक (Resident)</option>
                  <option>पंचायत प्रतिनिधि (Sarpanch / Ward Member)</option>
                  <option>ग्राम विकास अधिकारी (VDO / Secretary)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl shadow-sm transition mt-2"
              >
                OTP प्राप्त करें (Login with OTP)
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500">
              सुरक्षित डिजिटल राजस्थान एवं ग्राम स्वराज पहल
            </div>
          </div>
        </div>
      )}

      {/* Application Status Tracker Modal */}
      <ApplicationTrackerModal
        isOpen={trackerModalOpen}
        onClose={() => setTrackerModalOpen(false)}
      />

      {/* Mobile App Bottom Nav Bar */}
      <MobileBottomNav />
    </div>
  )
}
