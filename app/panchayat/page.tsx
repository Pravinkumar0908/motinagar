'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Landmark,
  MapPin,
  UsersRound,
  ShieldCheck,
  Calendar,
  Clock,
  Navigation,
  ExternalLink,
  PhoneCall,
  Vote,
  Compass,
  ArrowRight,
  Car,
  Bus,
  Search,
  Building2,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Send,
  UserCheck,
  ChevronRight,
  CheckCircle2,
  FileText,
  X,
  Award,
  Camera,
  User,
  Timer,
  Flame
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { VoterSearchTool } from '@/components/voter-search-tool'

// Official 7 Wards Data (Source: राज्य निर्वाचन आयोग / मतदाता सूची पुनरीक्षण 2026)
export interface OfficialWard {
  wardNo: number
  village: string
  villageHindi: string
  boundaries: string
  boothNo: string
  boothName: string
  maleVoters: number
  femaleVoters: number
  thirdGender: number
  totalVoters: number
  isMotiNagar?: boolean
}

const OFFICIAL_WARDS_2026: OfficialWard[] = [
  {
    wardNo: 1,
    village: 'Gudha',
    villageHindi: 'गुढ़ा',
    boundaries: 'बैरवा बस्ती का मोहल्ला व पुरानी पंचायत तक – गुढ़ा',
    boothNo: 'बूथ 6',
    boothName: '6 – राजमावि गुढ़ा, कमरा नं. 8',
    maleVoters: 155,
    femaleVoters: 145,
    thirdGender: 0,
    totalVoters: 300,
    isMotiNagar: false,
  },
  {
    wardNo: 2,
    village: 'Gudha',
    villageHindi: 'गुढ़ा',
    boundaries: 'गुढ़ा धाकड़ मोहल्ला व कीरो की ढाणी, भूरा जी का चापरा, गुर्जर बस्ती',
    boothNo: 'बूथ 6',
    boothName: '6 – राजमावि गुढ़ा, कमरा नं. 8',
    maleVoters: 146,
    femaleVoters: 125,
    thirdGender: 0,
    totalVoters: 271,
    isMotiNagar: false,
  },
  {
    wardNo: 3,
    village: 'Sherganj',
    villageHindi: 'शेरगंज',
    boundaries: 'शेरगंज – मीणा बस्ती',
    boothNo: 'बूथ 9',
    boothName: '9 – राजमावि गुढ़ा, कमरा नं. 15',
    maleVoters: 204,
    femaleVoters: 188,
    thirdGender: 0,
    totalVoters: 392,
    isMotiNagar: false,
  },
  {
    wardNo: 4,
    village: 'Balapura',
    villageHindi: 'बालापुरा',
    boundaries: 'बालापुरा बैरवा बस्ती, खेरारी मोहल्ला, राजपूत बस्ती, खेरारी मोहल्ला',
    boothNo: 'बूथ 7',
    boothName: '7 – राजमावि गुढ़ा, कमरा नं. 11',
    maleVoters: 180,
    femaleVoters: 181,
    thirdGender: 0,
    totalVoters: 361,
    isMotiNagar: false,
  },
  {
    wardNo: 5,
    village: 'Chak Khedli',
    villageHindi: 'चक खेड़ली',
    boundaries: 'चक खेड़ली – बैरवा बस्ती, हिम्मतपुरा',
    boothNo: 'बूथ 8',
    boothName: '8 – राजमावि गुढ़ा, कमरा नं. 14',
    maleVoters: 222,
    femaleVoters: 198,
    thirdGender: 0,
    totalVoters: 420,
    isMotiNagar: false,
  },
  {
    wardNo: 6,
    village: 'Chak Khedli',
    villageHindi: 'चक खेड़ली',
    boundaries: 'चक खेड़ली – मोग्या बस्ती, बाड़ोला बस्ती, भारजा बस्ती',
    boothNo: 'बूथ 8',
    boothName: '8 – राजमावि गुढ़ा, कमरा नं. 14',
    maleVoters: 159,
    femaleVoters: 154,
    thirdGender: 0,
    totalVoters: 313,
    isMotiNagar: false,
  },
  {
    wardNo: 7,
    village: 'Moti Nagar',
    villageHindi: 'मोटीनगर',
    boundaries: 'मोटीनगर – बैरवा बस्ती',
    boothNo: 'बूथ 7',
    boothName: '7 – राजमावि गुढ़ा, कमरा नं. 11',
    maleVoters: 164,
    femaleVoters: 125,
    thirdGender: 0,
    totalVoters: 289,
    isMotiNagar: true,
  },
]

// Administrative In-charge Posts (Details: To Be Decided / Coming Soon)
const ADMIN_POSTS_COMING_SOON = [
  {
    role: 'कार्यवाहक प्रशासक / बीडीओ',
    englishRole: 'In-charge Administrator / BDO',
    department: 'पंचायत समिति लाखेरी (तहसील इन्द्रगढ़)',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'सोमवार - शुक्रवार: 10:00 AM - 05:00 PM',
    responsibility: 'नीतिगत निर्णय, विकास बजट अनुमोदन एवं चुनाव पूर्व प्रशासनिक व्यवस्था का संचालन।'
  },
  {
    role: 'ग्राम विकास अधिकारी (VDO / सचिव)',
    englishRole: 'Gram Vikas Adhikari (Panchayat Secretary)',
    department: 'ग्राम पंचायत गुढ़ा (प्रभार: मोटीनगर, चक खेड़ली, शेरगंज, बालापुरा)',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'दैनिक: 09:30 AM - 06:00 PM (मंगलवार व शुक्रवार मोटीनगर शिविर)',
    responsibility: 'जन्म-मृत्यु पंजीयन, पट्टा आवेदन, नरेगा मस्टररोल, प्रशासनिक स्वीकृति एवं नागरिक सेवाएं।'
  },
  {
    role: 'हल्का पटवारी (राजस्व)',
    englishRole: 'Halka Patwari (Revenue)',
    department: 'राजस्व मंडल - गुढ़ा व मोटीनगर वृत्त (तहसील इन्द्रगढ़)',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'सोमवार व गुरुवार: राजस्व शिविर',
    responsibility: 'नामांतरण, जमाबंदी नकल, खसरा मिलान, सीमांकन एवं प्राकृतिक आपदा नुकसान सर्वे।'
  },
  {
    role: 'कनिष्ठ सहायक / लिपिक (LDC)',
    englishRole: 'Junior Assistant / Clerk',
    department: 'पंचायत सचिवालय गुढ़ा',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'दैनिक कार्यालय समय',
    responsibility: 'दस्तावेज डिस्पैच, पेंशन सत्यापन, राशन कार्ड जांच एवं पंचायती रिकॉर्ड रख-रखाव।'
  },
  {
    role: 'कनिष्ठ तकनीकी सहायक (JTA - नरेगा)',
    englishRole: 'Junior Technical Assistant (MNREGA)',
    department: 'ग्रामीण विकास प्रकोष्ठ लाखेरी',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'फील्ड निरीक्षण व तकनीकी माप',
    responsibility: 'सीसी सड़क, नाली, खेत तलाई, ग्रेवल सड़क एवं खेल मैदान निर्माण कार्यों का तकनीकी माप।'
  },
  {
    role: 'बूथ लेवल अधिकारी (BLO - निर्वाचन कार्य)',
    englishRole: 'Booth Level Officer (Election 2026)',
    department: 'भारत निर्वाचन आयोग / 185-केशोरायपाटन विधानसभा',
    status: 'विवरण प्रतीक्षित (Coming Soon)',
    holderName: 'नाम प्रतीक्षित (To Be Decided)',
    phone: 'आधिकारिक नंबर शीघ्र (Coming Soon)',
    timing: 'मतदाता सूची कार्य दिवस',
    responsibility: 'मतदाता सूची 2026 अद्यतनीकरण, वोटर कार्ड वितरण एवं पोलिंग बूथ संख्या 6, 7, 8, 9 व्यवस्था।'
  }
]

// Elected Panchayat Posts (Awaiting 2026 Election Results)
const ELECTED_POSTS_COMING_SOON = [
  {
    role: 'सरपंच (Sarpanch)',
    englishRole: 'Head of Gram Panchayat',
    village: 'समस्त 7 वार्ड (गुढ़ा, मोटीनगर, चक खेड़ली, शेरगंज, बालापुरा)',
    status: 'चुनाव 2026 परिणाम प्रतीक्षित',
    holderName: 'परिणाम उपरांत घोषित (To Be Decided)',
    note: 'राज्य निर्वाचन आयोग द्वारा चुनाव परिणाम घोषित होते ही नवनिर्वाचित सरपंच का नाम, फोटो व संपर्क नंबर यहाँ लाइव अपडेट होगा।'
  },
  {
    role: 'उप-सरपंच (Up-Sarpanch)',
    englishRole: 'Deputy Sarpanch',
    village: 'वार्ड पंचों द्वारा निर्वाचित',
    status: 'चुनाव 2026 परिणाम प्रतीक्षित',
    holderName: 'परिणाम उपरांत घोषित (To Be Decided)',
    note: 'वार्ड पंचों की पहली बैठक में उप-सरपंच का चुनाव संपन्न होने के उपरांत विवरण यहाँ प्रदर्शित होगा।'
  },
  {
    role: 'वार्ड पंच – वार्ड 7 (मोटीनगर)',
    englishRole: 'Ward Panch – Ward 7 (Moti Nagar)',
    village: 'मोटीनगर – बैरवा बस्ती (289 मतदाता)',
    status: 'चुनाव 2026 परिणाम प्रतीक्षित',
    holderName: 'परिणाम उपरांत घोषित (To Be Decided)',
    note: 'मोटीनगर (वार्ड 7) के नागरिकों का स्थानीय प्रतिनिधि। मतदान केंद्र 7 (राजमावि गुढ़ा कमरा 11) से निर्वाचन।'
  }
]

// 4-Phase Panch & Sarpanch Election Schedule 2026 (बैलेट पेपर से)
const ELECTION_SCHEDULE_DATA = [
  {
    phase: 'प्रथम चरण (Phase 1)',
    phaseHindi: 'प्रथम चरण',
    notificationDate: '08.10.2026',
    notificationIso: '2026-10-08T10:00:00',
    nominationDate: '24.10.2026',
    nominationTime: 'सुबह 11 से दोपहर 3 बजे',
    votingDate: '25.10.2026',
    votingDay: 'रविवार (Sunday)',
    votingIso: '2026-10-25T08:00:00',
    upSarpanchDate: '26.10.2026',
    badge: 'अधिसूचना 4 दिन बाद',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    isPrimary: true,
  },
  {
    phase: 'द्वितीय चरण (Phase 2)',
    phaseHindi: 'द्वितीय चरण',
    notificationDate: '13.10.2026',
    notificationIso: '2026-10-13T10:00:00',
    nominationDate: '30.10.2026',
    nominationTime: 'सुबह 11 से दोपहर 3 बजे',
    votingDate: '31.10.2026',
    votingDay: 'शनिवार (Saturday)',
    votingIso: '2026-10-31T08:00:00',
    upSarpanchDate: '01.11.2026',
    badge: 'द्वितीय चरण',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    isPrimary: false,
  },
  {
    phase: 'तृतीय चरण (Phase 3)',
    phaseHindi: 'तृतीय चरण',
    notificationDate: '19.10.2026',
    notificationIso: '2026-10-19T10:00:00',
    nominationDate: '05.11.2026',
    nominationTime: 'सुबह 11 से दोपहर 3 बजे',
    votingDate: '06.11.2026',
    votingDay: 'शुक्रवार (Friday)',
    votingIso: '2026-11-06T08:00:00',
    upSarpanchDate: '07.11.2026',
    badge: 'तृतीय चरण',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    isPrimary: false,
  },
  {
    phase: 'चतुर्थ चरण (Phase 4)',
    phaseHindi: 'चतुर्थ चरण',
    notificationDate: '31.10.2026',
    notificationIso: '2026-10-31T10:00:00',
    nominationDate: '15.11.2026',
    nominationTime: 'सुबह 11 से दोपहर 3 बजे',
    votingDate: '16.11.2026',
    votingDay: 'सोमवार (Monday)',
    votingIso: '2026-11-16T08:00:00',
    upSarpanchDate: '17.11.2026',
    badge: 'चतुर्थ चरण',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    isPrimary: false,
  },
]

// Ongoing Panchayat Projects
const PANCHAYAT_PROJECTS = [
  { title: 'मोटीनगर मुख्य बस्ती सीसी सड़क व पक्की नाली निर्माण', village: 'मोटीनगर (वार्ड 7)', cost: '₹18.50 लाख', status: 'प्रगति पर (In Progress)', fund: '15वां वित्त आयोग' },
  { title: 'गुढ़ा से मोटीनगर संपर्क डामर सड़क चौड़ीकरण एवं सुदृढ़ीकरण', village: 'गुढ़ा ➔ मोटीनगर', cost: '₹34.00 लाख', status: 'निविदा स्वीकृत (Approved)', fund: 'प्रधानमंत्री ग्राम सड़क योजना (PMGSY)' },
  { title: 'मोटीनगर अमृत सरोवर जीर्णोद्धार एवं सोलर हाईमास्ट लाइट', village: 'मोटीनगर', cost: '₹12.20 लाख', status: 'लगभग पूर्ण (90%)', fund: 'अमृत सरोवर योजना' },
  { title: 'गुढ़ा पंचायत सचिवालय में नवीन ई-लाइब्रेरी व नागरिक लाउंज', village: 'गुढ़ा मुख्यालय', cost: '₹8.80 लाख', status: 'स्वीकृत', fund: 'राज्य वित्त आयोग (SFC)' },
]

export default function PanchayatPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<string>('All')
  const [activeWardModal, setActiveWardModal] = useState<OfficialWard | null>(null)
  const [notifySubscribed, setNotifySubscribed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [countdownTarget, setCountdownTarget] = useState<'notif1' | 'vote1' | 'vote2' | 'vote3' | 'vote4'>('notif1')

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 30,
  })

  useEffect(() => {
    const targetMap: Record<string, string> = {
      notif1: '2026-10-08T10:00:00',
      vote1: '2026-10-25T08:00:00',
      vote2: '2026-10-31T08:00:00',
      vote3: '2026-11-06T08:00:00',
      vote4: '2026-11-16T08:00:00',
    }

    const calculateTime = () => {
      const targetTime = new Date(targetMap[countdownTarget] || '2026-10-08T10:00:00').getTime()
      const now = new Date().getTime()
      const diff = targetTime - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        const seconds = Math.floor((diff / 1000) % 60)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [countdownTarget])

  // Filtered Wards
  const filteredWards = OFFICIAL_WARDS_2026.filter((ward) => {
    const matchesVillage = selectedVillageFilter === 'All' || ward.villageHindi === selectedVillageFilter
    const matchesSearch =
      searchQuery === '' ||
      ward.boundaries.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ward.villageHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ward.boothName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `वार्ड ${ward.wardNo}`.includes(searchQuery)
    return matchesVillage && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* 1. TOP HEADER / NAVBAR */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      {/* 2. BODY LAYOUT: STATIC DESKTOP SIDEBAR + SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        {/* Persistent Sticky Sidebar */}
        <PortalSidebar
          activeId="panchayat"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-6">
          {/* ================= HERO BANNER: GRAM PANCHAYAT GUDHA ================= */}
          <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[350px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl border border-slate-800">
            <Image
              src="/images/panchayat_bhawan.jpg"
              alt="Gram Panchayat Gudha Bhawan Bundi Rajasthan"
              fill
              priority
              className="object-cover object-center opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />

            {/* Breadcrumb + Distance Notice Top */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-white/80 font-medium">
                <Link href="/" className="hover:text-white transition">होम</Link>
                <span>&gt;</span>
                <Link href="/village" className="hover:text-white transition">मेरा गाँव</Link>
                <span>&gt;</span>
                <span className="text-amber-300 font-bold">ग्राम पंचायत गुढ़ा</span>
              </div>

              {/* Crucial Geographical Distance Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold backdrop-blur-md">
                <MapPin size={13} className="text-amber-400" />
                <span>पंचायत मुख्यालय: गुढ़ा (मोटीनगर से 6.5 किमी दूर)</span>
              </div>
            </div>

            {/* Main Header Content */}
            <div className="relative z-10 my-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold mb-3 backdrop-blur-md font-hindi">
                <Landmark size={15} />
                <span>पंचायती राज संस्था · बूँदी जिला परिषद · राजस्थान</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-hindi tracking-tight leading-tight">
                ग्राम पंचायत <span className="text-amber-300">गुढ़ा</span>
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-300 font-hindi font-medium">
                तहसील: <strong className="text-white">इन्द्रगढ़</strong> · पंचायत समिति: <strong className="text-white">लाखेरी</strong> · विधानसभा: <strong className="text-white">185 – केशोरायपाटन</strong> · जिला: <strong className="text-white">बूँदी</strong>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-hindi">
                सम्बद्ध गाँव: <strong>गुढ़ा</strong> (मुख्यालय), <strong>मोटीनगर</strong>, <strong>चक खेड़ली</strong>, <strong>शेरगंज</strong>, <strong>बालापुरा</strong>
              </p>

              {/* Crucial Election Disclaimer Box */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-500/15 border border-amber-400/50 backdrop-blur-md text-amber-100 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Vote size={20} />
                </div>
                <div className="text-xs sm:text-sm font-hindi leading-relaxed">
                  <div className="font-bold text-amber-200 flex items-center gap-2 text-sm sm:text-base">
                    <span>🗳️ निर्वाचन स्थिति 2026: चुनाव प्रक्रियाधीन / आगामी</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-mono">Status: Awaiting Results</span>
                  </div>
                  <p className="mt-1 text-slate-200 text-xs">
                    वर्तमान में पंचायत का कार्यकाल पूरा होने के कारण <strong>प्रशासक / कार्यवाहक समिति एवं ग्राम विकास अधिकारी (VDO)</strong> द्वारा प्रशासनिक दायित्व संभाले जा रहे हैं। जैसे ही राज्य निर्वाचन आयोग द्वारा चुनाव परिणाम घोषित होंगे, निर्वाचित सरपंच, उप-सरपंच एवं सभी वार्ड पंचों का पूरा विवरण यहाँ तुरंत लाइव अपडेट (Live Update) कर दिया जाएगा।
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Ribbon (Official Final Data) */}
            <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">कुल वार्ड</div>
                <div className="text-base sm:text-lg font-extrabold text-amber-300">7 वार्ड</div>
                <div className="text-[10px] text-slate-300">वार्ड 1 से 7</div>
              </div>

              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">कुल मतदाता</div>
                <div className="text-base sm:text-lg font-extrabold text-white">2,346</div>
                <div className="text-[10px] text-emerald-400 font-mono">अंतिम: 25-02-2026</div>
              </div>

              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">पुरुष मतदाता</div>
                <div className="text-base sm:text-lg font-extrabold text-blue-300">1,230</div>
                <div className="text-[10px] text-slate-300">52.4% पुरुष</div>
              </div>

              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">महिला मतदाता</div>
                <div className="text-base sm:text-lg font-extrabold text-rose-300">1,116</div>
                <div className="text-[10px] text-slate-300">47.6% महिला</div>
              </div>

              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">मोटीनगर वार्ड</div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-300">वार्ड नं. 7</div>
                <div className="text-[10px] text-amber-300 font-mono">289 मतदाता</div>
              </div>

              <div className="bg-black/35 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">मुख्यालय दूरी</div>
                <div className="text-base sm:text-lg font-extrabold text-cyan-300">6.5 किमी</div>
                <div className="text-[10px] text-slate-300">मोटीनगर ➔ गुढ़ा</div>
              </div>
            </div>
          </section>

          {/* ================= SECTION: ELECTION PROGRAM 2026 & LIVE COUNTDOWN ================= */}
          <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            {/* Header + Ballot Paper Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 font-hindi border border-amber-400/40">
                  <Flame size={14} className="text-amber-400" />
                  <span>राज्य निर्वाचन आयोग राजस्थान आधिकारिक घोषणा</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-hindi tracking-tight">
                  पंच एवं सरपंच चुनाव कार्यक्रम 2026 <span className="text-amber-300 text-lg sm:text-xl font-bold">(बैलेट पेपर से)</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi mt-1">
                  ग्राम पंचायत गुढ़ा (समस्त 7 वार्ड) — मतदान पद्धति: मतपत्र एवं मतपेटी (Ballot Box)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-emerald-300 border border-emerald-400/30 text-xs font-bold font-hindi flex items-center gap-1.5 backdrop-blur-md">
                  <Vote size={15} />
                  <span>बैलेट पेपर मतदान</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-amber-300 border border-amber-400/30 text-xs font-bold font-hindi flex items-center gap-1.5 backdrop-blur-md">
                  <Timer size={15} />
                  <span>लाइव उल्टी गिनती</span>
                </span>
              </div>
            </div>

            {/* LIVE COUNTDOWN TIMER CARD */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs sm:text-sm font-bold font-hindi text-amber-300">
                    {countdownTarget === 'notif1' && '📢 प्रथम चरण चुनाव अधिसूचना जारी होने में शेष समय:'}
                    {countdownTarget === 'vote1' && '🗳️ प्रथम चरण मतदान (25.10.2026) में शेष समय:'}
                    {countdownTarget === 'vote2' && '🗳️ द्वितीय चरण मतदान (31.10.2026) में शेष समय:'}
                    {countdownTarget === 'vote3' && '🗳️ तृतीय चरण मतदान (06.11.2026) में शेष समय:'}
                    {countdownTarget === 'vote4' && '🗳️ चतुर्थ चरण मतदान (16.11.2026) में शेष समय:'}
                  </span>
                </div>

                {/* Target Switcher */}
                <div className="flex flex-wrap items-center gap-1 text-[11px] font-bold">
                  <button
                    onClick={() => setCountdownTarget('notif1')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      countdownTarget === 'notif1' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    अधिसूचना (08 Oct)
                  </button>
                  <button
                    onClick={() => setCountdownTarget('vote1')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      countdownTarget === 'vote1' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    चरण 1 (25 Oct)
                  </button>
                  <button
                    onClick={() => setCountdownTarget('vote2')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      countdownTarget === 'vote2' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    चरण 2 (31 Oct)
                  </button>
                  <button
                    onClick={() => setCountdownTarget('vote3')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      countdownTarget === 'vote3' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    चरण 3 (06 Nov)
                  </button>
                  <button
                    onClick={() => setCountdownTarget('vote4')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      countdownTarget === 'vote4' ? 'bg-amber-400 text-slate-950 font-black' : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    चरण 4 (16 Nov)
                  </button>
                </div>
              </div>

              {/* Digital Countdown Digits */}
              <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center max-w-2xl mx-auto">
                {/* Days */}
                <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-inner">
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-amber-300 tracking-tight">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest font-hindi mt-1">
                    दिन (Days)
                  </div>
                </div>

                {/* Hours */}
                <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-inner">
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest font-hindi mt-1">
                    घंटे (Hours)
                  </div>
                </div>

                {/* Minutes */}
                <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-inner">
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest font-hindi mt-1">
                    मिनट (Minutes)
                  </div>
                </div>

                {/* Seconds */}
                <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-500/5 border border-amber-400/30 shadow-inner">
                  <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-emerald-400 tracking-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest font-hindi mt-1">
                    सेकंड (Seconds)
                  </div>
                </div>
              </div>
            </div>

            {/* 4-PHASE DETAILED SCHEDULE TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-white/15">
              <table className="w-full text-left text-xs font-hindi">
                <thead className="bg-white/10 text-amber-300 uppercase text-[11px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">चरण (Phase)</th>
                    <th className="py-3 px-4">अधिसूचना (Notification)</th>
                    <th className="py-3 px-4">नामांकन, जांच व प्रतीक आवंटन</th>
                    <th className="py-3 px-4">मतदान व मतगणना तिथि</th>
                    <th className="py-3 px-4">उपसरपंच चुनाव</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-200">
                  {ELECTION_SCHEDULE_DATA.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-white/5 transition-colors ${
                        item.isPrimary ? 'bg-amber-500/10 font-bold' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span>{item.phase}</span>
                          {item.isPrimary && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black">
                              NEXT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-200 whitespace-nowrap">
                        {item.notificationDate}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-white">{item.nominationDate}</div>
                        <div className="text-[11px] text-slate-400">{item.nominationTime}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-emerald-300">{item.votingDate}</div>
                        <div className="text-[11px] text-slate-300">{item.votingDay}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-300 whitespace-nowrap">
                        {item.upSarpanchDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BALLOT PAPER GUIDELINES RIBBON */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-hindi">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="text-lg">🗳️</span>
                <div>
                  <strong className="text-white block">मतदान का समय:</strong>
                  <span className="text-slate-300 text-[11px]">प्रातः 08:00 बजे से सायं 05:00 बजे तक</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="text-lg">📊</span>
                <div>
                  <strong className="text-white block">मतगणना (Counting):</strong>
                  <span className="text-slate-300 text-[11px]">मतदान समाप्ति के तुरंत पश्चात मतदान केंद्र पर ही</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <span className="text-lg">👑</span>
                <div>
                  <strong className="text-white block">उपसरपंच का निर्वाचन:</strong>
                  <span className="text-slate-300 text-[11px]">निर्वाचित वार्ड पंचों द्वारा अगले दिन प्रातः 10:00 बजे</span>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION: OFFICIAL 2026 ELECTION WARD-WISE DATA ================= */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2 font-hindi">
                  <Vote size={14} />
                  <span>आधिकारिक चुनाव डेटा 2026</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                  ग्राम पंचायत गुढ़ा — वार्डवार चुनाव एवं मतदाता विवरण 2026
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                  गहन पुनरीक्षण 2026 (अर्हता दिनांक: 01-01-2026 | अंतिम प्रकाशन: 25-02-2026)
                </p>
              </div>

              {/* Administrative Meta Tag */}
              <div className="flex flex-col items-end text-xs font-hindi">
                <span className="text-slate-500">विधानसभा क्षेत्र: <strong className="text-slate-900">185 – केशोरायपाटन</strong></span>
                <span className="text-slate-500">पंचायत समिति: <strong className="text-slate-900">लाखेरी (तहसील इन्द्रगढ़)</strong></span>
                <span className="text-slate-500">जिला परिषद निर्वाचन क्षेत्र: <strong className="text-slate-900">14</strong></span>
              </div>
            </div>

            {/* 4 Big Highlight Stat Cards Requested By User */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200/90 shadow-2xs text-center">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider font-hindi">
                  🏘️ कुल वार्ड
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 font-mono">
                  7
                </div>
                <div className="text-[11px] text-slate-500 font-hindi mt-0.5">
                  वार्ड 1 से 7 तक
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200/90 shadow-2xs text-center">
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider font-hindi">
                  🗳️ कुल मतदाता
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#1976D2] mt-1 font-mono">
                  2,346
                </div>
                <div className="text-[11px] text-slate-500 font-hindi mt-0.5">
                  100% फोटो पहचान पत्र
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/90 shadow-2xs text-center">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-hindi">
                  👨 पुरुष मतदाता
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 mt-1 font-mono">
                  1,230
                </div>
                <div className="text-[11px] text-slate-500 font-hindi mt-0.5">
                  52.4% पुरुष भागीदारी
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-200/90 shadow-2xs text-center">
                <div className="text-xs font-bold text-rose-800 uppercase tracking-wider font-hindi">
                  👩 महिला मतदाता
                </div>
                <div className="text-3xl sm:text-4xl font-black text-rose-700 mt-1 font-mono">
                  1,116
                </div>
                <div className="text-[11px] text-slate-500 font-hindi mt-0.5">
                  47.6% महिला भागीदारी (तृतीय लिंग: 0)
                </div>
              </div>
            </div>

            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              {/* Village Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                {[
                  { id: 'All', label: 'सभी वार्ड (7)' },
                  { id: 'मोटीनगर', label: '⭐ मोटीनगर (वार्ड 7)' },
                  { id: 'गुढ़ा', label: 'गुढ़ा (वार्ड 1-2)' },
                  { id: 'चक खेड़ली', label: 'चक खेड़ली (वार्ड 5-6)' },
                  { id: 'शेरगंज', label: 'शेरगंज (वार्ड 3)' },
                  { id: 'बालापुरा', label: 'बालापुरा (वार्ड 4)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedVillageFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl transition-all ${
                      selectedVillageFilter === f.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="मोहल्ला, बस्ती, बूथ खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 bg-slate-50"
                />
              </div>
            </div>

            {/* Wards 1-7 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWards.map((ward) => {
                const isMotiNagar = ward.isMotiNagar
                return (
                  <article
                    key={ward.wardNo}
                    onClick={() => setActiveWardModal(ward)}
                    className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                      isMotiNagar
                        ? 'bg-gradient-to-br from-amber-50/90 to-orange-50/60 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                        : 'bg-gradient-to-br from-white to-slate-50/80 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-xl text-white shadow-2xs ${
                            isMotiNagar ? 'bg-amber-600' : 'bg-slate-900'
                          }`}>
                            वार्ड {ward.wardNo}
                          </span>
                          <span className="font-hindi font-bold text-sm text-slate-900">
                            {ward.villageHindi}
                          </span>
                        </div>

                        {isMotiNagar ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px] font-hindi animate-pulse">
                            ⭐ हमारा गाँव
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            {ward.boothNo}
                          </span>
                        )}
                      </div>

                      {/* Total Voters Metric */}
                      <div className="mt-4 flex items-baseline justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500 font-hindi">कुल मतदाता</div>
                          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                            {ward.totalVoters}
                          </div>
                        </div>

                        {/* Gender Split */}
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100 text-center">
                            <span className="block text-[9px] text-slate-400 font-hindi">पुरुष</span>
                            <strong>{ward.maleVoters}</strong>
                          </div>
                          <div className="bg-rose-50 text-rose-700 px-2 py-1 rounded-lg border border-rose-100 text-center">
                            <span className="block text-[9px] text-slate-400 font-hindi">महिला</span>
                            <strong>{ward.femaleVoters}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Boundary Details */}
                      <div className="mt-3 p-3 rounded-xl bg-slate-100/80 border border-slate-200/70 text-xs font-hindi">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mb-0.5">
                          📍 परिसीमन सीमा क्षेत्र:
                        </div>
                        <p className="text-slate-800 font-medium leading-relaxed">
                          {ward.boundaries}
                        </p>
                      </div>

                      {/* Polling Booth */}
                      <div className="mt-3 text-xs font-hindi text-slate-600 flex items-start gap-1.5">
                        <Building2 size={14} className="text-[#1976D2] mt-0.5 shrink-0" />
                        <div>
                          <span className="text-slate-500 text-[11px] block">मतदान केंद्र (Polling Station):</span>
                          <strong className="text-slate-900 font-semibold">{ward.boothName}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status / Click for detail */}
                    <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-amber-800 font-hindi font-medium flex items-center gap-1">
                        <span>⏳</span>
                        <span>चुनाव परिणाम आते ही नाम अपडेट होगा</span>
                      </span>
                      <span className="text-[#1976D2] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>विस्तार</span>
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Official Source Footnote */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-hindi flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <span>
                  <strong>आधिकारिक स्रोत:</strong> राज्य निर्वाचन आयोग राजस्थान · ग्राम पंचायत गुढ़ा मतदाता सूची 2026 (अंतिम प्रकाशन: 25 फरवरी 2026)
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                कुल मतदाता: 2,346 | पुरुष: 1,230 | महिला: 1,116 | तृतीय लिंग: 0
              </span>
            </div>
          </section>

          {/* ================= SECTION: INTERACTIVE 2026 VOTER SEARCH & BOOTH FINDER ================= */}
          <section id="voter-search" className="scroll-mt-28">
            <VoterSearchTool />
          </section>

          {/* ================= SECTION: DISTANCE & COMMUTE GUIDE (6.5 KM) ================= */}
          <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-800 shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold">
                  <MapPin size={14} className="text-amber-400" />
                  <span>दूरी एवं आवागमन सुविधा (Distance & Route Guide)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-hindi">
                  मोतीनगर (वार्ड 7) से गुढ़ा पंचायत भवन: 6.5 किमी (12 मिनट)
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 font-hindi leading-relaxed">
                  क्योंकि पंचायत भवन व सभी 4 मतदान केंद्र मुख्यालय <strong className="text-white">गुढ़ा</strong> (राजमावि गुढ़ा) में स्थित हैं, इसलिए मोतीनगर के 289 मतदाताओं व नागरिकों के लिए विशेष सुविधाएं उपलब्ध हैं:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-hindi">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <strong className="text-amber-300 block mb-1">🏡 मोतीनगर में स्थानीय सेवा केंद्र:</strong>
                    मोतीनगर ई-मित्र केंद्र पर प्रत्येक <strong>मंगलवार व शुक्रवार</strong> को VDO व पटवारी उपस्थित रहते हैं, जिससे ग्रामीणों को छोटी सेवाओं हेतु गुढ़ा नहीं जाना पड़ता।
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <strong className="text-emerald-300 block mb-1">🚌 आवागमन साधन:</strong>
                    मोतीनगर से गुढ़ा हेतु पक्की डामर सड़क है। नियमित शेयरिंग ऑटो, निजी वाहन व ग्रामीण बस सेवा हर 30 मिनट पर उपलब्ध है।
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="https://www.google.com/maps/dir/25.7985349,76.2160933/Gudha,+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center gap-2 shadow-sm font-hindi"
                >
                  <Navigation size={15} />
                  <span>गूगल मैप्स पर गुढ़ा का रास्ता देखें (6.5 किमी)</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="https://maps.app.goo.gl/GM47mAhRpmHp5qYw6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center gap-2 shadow-sm font-hindi"
                >
                  <MapPin size={15} />
                  <span>मोतीनगर (वार्ड 7) लाइव मैप पर देखें</span>
                  <ExternalLink size={13} />
                </a>

                <Link
                  href="/village#section-map"
                  className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs text-center border border-white/20 transition flex items-center justify-center gap-1.5 font-hindi"
                >
                  <span>मोतीनगर संपूर्ण प्रोफाइल व नक्शा देखें</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* ================= SECTION: PANCHAYAT POSTS & ADMINISTRATIVE IN-CHARGES ================= */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2 font-hindi">
                  <ShieldCheck size={14} />
                  <span>पंचायत पद एवं प्रबंधन</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                  पंचायत प्रशासनिक अधिकारी एवं जनप्रतिनिधि पद
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                  चुनाव लंबित होने के कारण सभी पदों के आधिकारिक नाम, तस्वीर व संपर्क सत्यापन उपरांत शीघ्र अपडेट किए जाएंगे
                </p>
              </div>

              <div className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold font-hindi">
                स्थिति: विवरण प्रतीक्षित (To Be Decided)
              </div>
            </div>

            {/* PART 1: ADMINISTRATIVE OFFICIAL POSTS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900 font-hindi">
                  प्रशासनिक प्रबंधन पद (Administrative In-charge Posts)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ADMIN_POSTS_COMING_SOON.map((post, i) => (
                  <article
                    key={i}
                    className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Photo Placeholder + Badge */}
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        {/* Photo Frame Placeholder */}
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 flex flex-col items-center justify-center shrink-0 group-hover:border-blue-400 transition-colors">
                            <Camera size={18} className="text-slate-400" />
                            <span className="text-[9px] font-hindi text-slate-500 mt-0.5 leading-none">तस्वीर शीघ्र</span>
                          </div>

                          <div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200 font-hindi">
                              कमिंग सून
                            </span>
                            <div className="text-[11px] text-slate-400 font-hindi mt-1">
                              पद क्रमांक {i + 1}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post Title */}
                      <div className="mt-3">
                        <h4 className="font-extrabold text-base text-slate-900 font-hindi leading-snug">
                          {post.role}
                        </h4>
                        <div className="text-[11px] font-semibold text-[#1976D2] font-mono mt-0.5">
                          {post.englishRole}
                        </div>
                        <div className="text-[11px] text-slate-500 font-hindi mt-0.5">
                          {post.department}
                        </div>
                      </div>

                      {/* Holder Name: To Be Decided */}
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs font-hindi">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">पदाधिकारी नाम:</span>
                        <strong className="text-amber-900 font-bold block mt-0.5">
                          {post.holderName}
                        </strong>
                      </div>

                      {/* Responsibilities */}
                      <p className="mt-2.5 text-xs text-slate-600 font-hindi leading-relaxed bg-slate-100/60 p-2.5 rounded-xl">
                        {post.responsibility}
                      </p>

                      <div className="mt-2.5 text-[11px] text-slate-500 font-hindi flex items-center gap-1.5">
                        <Clock size={12} className="text-amber-600 shrink-0" />
                        <span>{post.timing}</span>
                      </div>
                    </div>

                    {/* Bottom Contact / Notice */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold text-center font-hindi flex items-center justify-center gap-1.5">
                        <PhoneCall size={12} className="opacity-50" />
                        <span>{post.phone}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* PART 2: ELECTED PANCHAYAT REPRESENTATIVE POSTS (Awaiting Results) */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900 font-hindi">
                  निर्वाचित जनप्रतिनिधि पद (Elected Representative Posts — Awaiting 2026 Results)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {ELECTED_POSTS_COMING_SOON.map((ep, idx) => (
                  <article
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/60 to-white border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Photo Placeholder Frame */}
                      <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-dashed border-amber-400 text-amber-600 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                          <User size={20} className="text-amber-500" />
                          <span className="text-[8.5px] font-hindi text-slate-600 mt-0.5 leading-none">तस्वीर शीघ्र</span>
                        </div>

                        <div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold border border-amber-300 font-hindi">
                            {ep.status}
                          </span>
                          <div className="text-[11px] text-slate-500 font-hindi mt-1">
                            {ep.village}
                          </div>
                        </div>
                      </div>

                      <h4 className="mt-3 font-extrabold text-base text-slate-900 font-hindi">
                        {ep.role}
                      </h4>
                      <div className="text-[11px] font-semibold text-amber-800 font-mono">
                        {ep.englishRole}
                      </div>

                      {/* Name To Be Decided */}
                      <div className="mt-3 p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-hindi">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">निर्वाचित प्रतिनिधि:</span>
                        <strong className="text-slate-900 font-bold block mt-0.5">
                          {ep.holderName}
                        </strong>
                      </div>

                      <p className="mt-2 text-xs text-slate-600 font-hindi leading-relaxed">
                        {ep.note}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-100">
                      <div className="w-full py-2 px-3 rounded-xl bg-amber-100/70 text-amber-900 text-xs font-bold text-center font-hindi">
                        ⏳ चुनाव परिणाम उपरांत लाइव अद्यतन (Live Update)
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION: ONGOING & APPROVED PANCHAYAT PROJECTS ================= */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2 font-hindi">
                  <TrendingUp size={14} />
                  <span>पंचायत विकास कार्य एवं स्वीकृत बजट</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                  ग्राम पंचायत गुढ़ा एवं मोतीनगर के मुख्य विकास कार्य
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                  15वें वित्त आयोग एवं राज्य वित्त आयोग के तहत स्वीकृत कार्य
                </p>
              </div>

              <div className="text-xs px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold border border-teal-200">
                कुल स्वीकृत बजट: ₹73.50 लाख
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PANCHAYAT_PROJECTS.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-600 font-hindi bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        📍 {p.village}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {p.cost}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 font-hindi">
                      {p.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-hindi">
                    <span className="text-slate-500">मद: <strong>{p.fund}</strong></span>
                    <span className="font-bold text-blue-700">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SECTION: GRAM SABHA CALENDAR & ELECTION RESULT ALERTS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Gram Sabha Schedule */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-[#1976D2]" />
                  <h3 className="font-extrabold text-base text-slate-900 font-hindi">
                    वार्षिक ग्राम सभा बैठक कैलेंडर (Gram Sabha Meetings)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-hindi leading-relaxed">
                  पंचायती राज अधिनियम के तहत प्रत्येक वर्ष 4 अनिवार्य ग्राम सभाएं आयोजित होती हैं जिनमें मोतीनगर व गुढ़ा के सभी वयस्क मतदाता भाग ले सकते हैं:
                </p>

                <div className="mt-4 space-y-2.5 text-xs font-hindi">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">26 जनवरी — गणतंत्र दिवस ग्राम सभा</strong>
                      <span className="text-slate-500 text-[11px]">वार्षिक बजट एवं मनरेगा कार्य योजना अनुमोदन</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अनिवार्य</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">01 मई — मजदूर दिवस ग्राम सभा</strong>
                      <span className="text-slate-500 text-[11px]">श्रमिक कल्याण, पेंशन एवं पेयजल समीक्षा</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अनिवार्य</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">15 अगस्त — स्वतंत्रता दिवस ग्राम सभा</strong>
                      <span className="text-slate-500 text-[11px]">विकास कार्यों का सामाजिक अंकेक्षण (Social Audit)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अनिवार्य</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block">02 अक्टूबर — गांधी जयंती स्वच्छता सभा</strong>
                      <span className="text-slate-500 text-[11px]">स्वच्छता मिशन, ओडीएफ स्थायित्व व ग्राम स्वच्छता</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अनिवार्य</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 font-hindi">
                * बैठक स्थान: मुख्य पंचायत सचिवालय गुढ़ा अथवा पूर्व सूचना अनुसार मोतीनगर राजकीय विद्यालय।
              </div>
            </div>

            {/* Live Election Alert Subscription Form */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-3xl p-6 sm:p-7 border border-amber-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Vote size={18} className="text-amber-700" />
                  <h3 className="font-extrabold text-base text-slate-900 font-hindi">
                    चुनाव परिणाम लाइव अपडेट सूचना प्राप्त करें
                  </h3>
                </div>
                <p className="text-xs text-slate-600 font-hindi leading-relaxed">
                  जैसे ही ग्राम पंचायत गुढ़ा के चुनाव संपन्न होंगे और राज्य निर्वाचन आयोग परिणाम घोषित करेगा, हम आपको व्हाट्सएप अथवा एसएमएस पर नए सरपंच व वार्ड पंचों की सूची भेज देंगे।
                </p>

                {notifySubscribed ? (
                  <div className="mt-5 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-center text-emerald-900 font-hindi">
                    <CheckCircle2 size={28} className="text-emerald-600 mx-auto mb-2" />
                    <strong className="block text-sm">धन्यवाद! आपका मोबाइल नंबर पंजीकृत हो गया है।</strong>
                    <span className="text-xs text-emerald-700">चुनाव परिणाम आते ही आपको तुरंत सूचना प्राप्त होगी।</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setNotifySubscribed(true)
                    }}
                    className="mt-5 space-y-3 font-hindi"
                  >
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        नागरिक का नाम
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="उदा. रामप्रसाद गुर्जर"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        मोबाइल नंबर (WhatsApp)
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="10 अंकों का मोबाइल नंबर"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                        आपका गाँव
                      </label>
                      <select className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white outline-none">
                        <option>मोतीनगर (Ward 7)</option>
                        <option>गुढ़ा (Ward 1-2)</option>
                        <option>चक खेड़ली (Ward 5-6)</option>
                        <option>शेरगंज (Ward 3)</option>
                        <option>बालापुरा (Ward 4)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <Send size={14} />
                      <span>चुनाव परिणाम अलर्ट सक्रिय करें (Notify Me)</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 font-hindi border-t border-amber-200">
                नोट: राज्य निर्वाचन आयोग राजस्थान की निष्पक्ष एवं पारदर्शी चुनाव प्रक्रिया के अधीन।
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ================= MODAL: WARD DETAIL QUICK VIEW ================= */}
      {activeWardModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-rise space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-xl text-white ${
                  activeWardModal.isMotiNagar ? 'bg-amber-600' : 'bg-slate-900'
                }`}>
                  वार्ड {activeWardModal.wardNo}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base font-hindi">
                  {activeWardModal.villageHindi} ({activeWardModal.village})
                </h3>
              </div>
              <button
                onClick={() => setActiveWardModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-3 font-hindi text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">कुल मतदाता</span>
                  <strong className="text-lg font-mono text-slate-900">{activeWardModal.totalVoters}</strong>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-600 block">पुरुष</span>
                  <strong className="text-lg font-mono text-blue-800">{activeWardModal.maleVoters}</strong>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                  <span className="text-[10px] text-rose-600 block">महिला</span>
                  <strong className="text-lg font-mono text-rose-800">{activeWardModal.femaleVoters}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold">📍 परिसीमन सीमा क्षेत्र:</span>
                <p className="text-slate-800 font-semibold mt-1 leading-relaxed">
                  {activeWardModal.boundaries}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-bold">🗳️ मतदान केंद्र (Polling Station):</span>
                <p className="text-[#1976D2] font-bold mt-1">
                  {activeWardModal.boothName}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-center">
                <span className="font-bold block">वार्ड पंच प्रतिनिधि: परिणाम लंबित</span>
                <span className="text-[11px] text-amber-800">
                  जैसे ही 2026 चुनाव परिणाम घोषित होंगे, निर्वाचित प्रतिनिधि का नाम व फोन नंबर यहाँ लाइव दिखेगा।
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveWardModal(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition font-hindi"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile App Bottom Nav Bar */}
      <MobileBottomNav />
    </div>
  )
}
