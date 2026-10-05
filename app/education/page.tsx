'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  GraduationCap,
  School,
  Baby,
  Trophy,
  Award,
  BookOpen,
  Calendar,
  FileText,
  MapPin,
  PhoneCall,
  ExternalLink,
  Search,
  CheckCircle2,
  Sparkles,
  Users,
  Download,
  Video,
  ChevronRight,
  Info,
  Clock,
  Layers,
  HeartHandshake,
  Milk,
  Utensils,
  Computer,
  Dumbbell,
  Library,
  Flame,
  ArrowRight,
  HelpCircle,
  Share2
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// --- DATA STRUCTURES ---

interface SchoolItem {
  id: string
  nameHindi: string
  nameEng: string
  category: 'Senior Secondary' | 'Primary' | 'English Medium'
  location: string
  mapUrl: string
  principalName: string
  principalPhone: string
  studentsCount: number
  teachersCount: number
  streams: string[]
  facilities: { icon: any; label: string }[]
  image: string
  codeNIC: string
  timing: string
  description: string
}

interface AnganwadiItem {
  id: string
  centerName: string
  workerName: string
  workerPhone: string
  helperName: string
  childrenCount: number
  mothersCount: number
  location: string
  timing: string
  services: string[]
  nutritionSchedule: string
}

interface ScholarshipItem {
  id: string
  title: string
  hindiTitle: string
  amount: string
  eligibility: string
  deadline: string
  portal: string
  portalUrl: string
  category: string
}

interface StudyResourceItem {
  id: string
  title: string
  classLevel: string
  medium: string
  subject: string
  type: 'Video' | 'PDF Book' | 'Model Paper'
  link: string
  provider: string
}

export default function EducationHubPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'schools' | 'anganwadi' | 'scholarships' | 'exams' | 'resources' | 'gallery'>('schools')
  const [selectedSchool, setSelectedSchool] = useState<SchoolItem | null>(null)
  const [searchScholarship, setSearchScholarship] = useState('')

  // 1. SCHOOLS IN MOTI NAGAR & GUDHA PANCHAYAT
  const SCHOOLS_DATA: SchoolItem[] = [
    {
      id: 'gudha-sr-sec',
      nameHindi: 'राजकीय उच्च माध्यमिक विद्यालय, गुढ़ा (मुख्य संकुल केंद्र)',
      nameEng: 'Govt. Senior Secondary School, Gudha (PEEO Hub)',
      category: 'Senior Secondary',
      location: 'गुढ़ा बस स्टैंड के पास (वार्ड नं. 03), मोती नगर से 6.5 किमी',
      mapUrl: 'https://maps.app.goo.gl/GM47mAhRpmHp5qYw6',
      principalName: 'श्री रामेश्वर प्रसाद मीणा (प्रधानाचार्य व पीईईओ)',
      principalPhone: '+91 98290-88411',
      studentsCount: 548,
      teachersCount: 18,
      streams: ['कला संकाय (Arts)', 'विज्ञान संकाय (Science - Bio/Math)', 'कृषि विज्ञान (Agriculture)'],
      facilities: [
        { icon: Computer, label: 'आईसीटी स्मार्ट कंप्यूटर लैब (20 कंप्यूटर्स)' },
        { icon: Library, label: 'समृद्ध पुस्तकालय (3,500+ पुस्तकें)' },
        { icon: Dumbbell, label: 'खेल मैदान (खो-खो, कबड्डी, वॉलीबॉल)' },
        { icon: Utensils, label: 'स्वच्छ मिड-डे मील डाइनिंग हॉल' },
        { icon: Milk, label: 'मुख्यमंत्री बाल गोपाल निःशुल्क दूध योजना' },
        { icon: Sparkles, label: 'आरएस-सीआईटी एवं वोकेशनल लैब' },
      ],
      image: '/images/govt_school.jpg',
      codeNIC: 'शाला दर्पण कोड: 213008',
      timing: 'प्रातः 09:30 से सायं 03:40 (शीतकालीन) / 07:30 से 01:00 (ग्रीष्मकालीन)',
      description: 'गुढ़ा व मोती नगर क्षेत्र का सर्वोच्च माध्यमिक व उच्च माध्यमिक शिक्षा केंद्र। यहाँ विज्ञान, कला व कृषि तीनों संकायों में योग्य व्याख्याताओं द्वारा शिक्षण एवं निःशुल्क प्रतियोगी परीक्षा तैयारी करवाई जाती है।'
    },
    {
      id: 'moti-nagar-primary',
      nameHindi: 'राजकीय प्राथमिक विद्यालय, मोती नगर (वार्ड नं. 07)',
      nameEng: 'Govt. Primary School, Moti Nagar',
      category: 'Primary',
      location: 'मोती नगर मुख्य गाँव, महा शॉप व माताजी मंदिर के निकट',
      mapUrl: 'https://maps.app.goo.gl/GM47mAhRpmHp5qYw6',
      principalName: 'श्रीमती मंजू लता शर्मा (प्रधानाध्यापिका)',
      principalPhone: '+91 94145-66220',
      studentsCount: 114,
      teachersCount: 4,
      streams: ['कक्षा 1 से 5 (प्राथमिक शिक्षा)', 'बाल वाटिका (Pre-Primary)'],
      facilities: [
        { icon: Milk, label: 'दैनिक बाल गोपाल गर्म दूध वितरण' },
        { icon: Utensils, label: 'स्वच्छ गरम मिड-डे मील भोजन' },
        { icon: BookOpen, label: '100% निःशुल्क पाठ्यपुस्तकें व कार्यपुस्तिकाएं' },
        { icon: Sparkles, label: 'RO शुद्ध शीतल पेयजल संयंत्र' },
      ],
      image: '/images/hero.jpg',
      codeNIC: 'शाला दर्पण कोड: 214589',
      timing: 'प्रातः 10:00 से सायं 04:00 (शीतकालीन)',
      description: 'मोती नगर के नौनिहालों के लिए गाँव में ही सुगम, सुरक्षित एवं गुणवत्तापूर्ण बुनियादी शिक्षा। बाल वाटिका के माध्यम से खेल-खेल में प्रारंभिक अधिगम।'
    },
    {
      id: 'mggs-lakheri',
      nameHindi: 'महात्मा गांधी राजकीय अंग्रेजी माध्यम विद्यालय, लाखेरी (समीपवर्ती)',
      nameEng: 'Mahatma Gandhi Govt. School (English Medium), Lakheri',
      category: 'English Medium',
      location: 'लाखेरी शहर (दूरी 9.5 किमी), सुलभ बस व ऑटो कनेक्टिविटी',
      mapUrl: 'https://maps.app.goo.gl/GM47mAhRpmHp5qYw6',
      principalName: 'श्री दिनेश कुमार गुप्ता (प्रधानाचार्य)',
      principalPhone: '+91 7438-261300',
      studentsCount: 420,
      teachersCount: 16,
      streams: ['Class 1 to 12 (Complete English Medium - CBSE Pattern)'],
      facilities: [
        { icon: Computer, label: 'डिजिटल इंटरएक्टिव फ्लैट पैनल (IFP)' },
        { icon: Library, label: 'इंग्लिश लिटरेचर लाइब्रेरी' },
        { icon: Sparkles, label: 'कम्युनिकेशन एवं स्पोकन इंग्लिश क्लब' },
      ],
      image: '/images/cultural_events.jpg',
      codeNIC: 'शाला दर्पण कोड: 212904',
      timing: 'प्रातः 08:30 से सायं 02:30',
      description: 'इंग्लिश मीडियम शिक्षा चाहने वाले गाँव के प्रतिभावान विद्यार्थियों के लिए निःशुल्क मॉडल स्कूल। लॉटरी द्वारा पारदर्शी प्रवेश प्रक्रिया।'
    }
  ]

  // 2. ANGANWADI CENTERS
  const ANGANWADI_DATA: AnganwadiItem[] = [
    {
      id: 'anganwadi-1',
      centerName: 'आंगनवाड़ी केंद्र 01 (मोती नगर - माताजी मंदिर परिसर)',
      workerName: 'श्रीमती शांति बाई मेघवाल (कार्यकर्ता)',
      workerPhone: '+91 96492-33104',
      helperName: 'श्रीमती कौशल्या बाई (सहायिका)',
      childrenCount: 38,
      mothersCount: 14,
      location: 'मोती नगर वार्ड 07, आंगनवाड़ी भवन',
      timing: 'प्रातः 09:00 से दोपहर 01:00 बजे तक',
      services: ['0-6 वर्ष बच्चों का पोषण व वजन निगरानी', 'गर्भवती व धात्री माताओं को टीएचआर (Take Home Ration)', 'नियमित टीकाकरण दिवस (MND)', 'पूर्व-प्राथमिक शाला पूर्व शिक्षा'],
      nutritionSchedule: 'दैनिक गर्म पोषाहार (दलिया, खिचड़ी, मीठा पुलाव) + साप्ताहिक ड्राई राशन पैकेट'
    },
    {
      id: 'anganwadi-2',
      centerName: 'आंगनवाड़ी केंद्र 02 (गुढ़ा - बैरवा बस्ती व धाकड़ मोहल्ला)',
      workerName: 'श्रीमती सुशीला नागर (कार्यकर्ता)',
      workerPhone: '+91 98284-55912',
      helperName: 'श्रीमती गीता बाई (सहायिका)',
      childrenCount: 46,
      mothersCount: 19,
      location: 'गुढ़ा वार्ड 01, पुरानी पंचायत भवन के निकट',
      timing: 'प्रातः 09:00 से दोपहर 01:00 बजे तक',
      services: ['शिशु स्वास्थ्य जांच', 'आयरन व फोलिक एसिड गोलियों का वितरण', 'कुपोषण निवारण परामर्श', 'किशोरी बालिका स्वास्थ्य मार्गदर्शन'],
      nutritionSchedule: 'सोमवार व गुरुवार विशेष पौष्टिक पूरक पोषाहार'
    }
  ]

  // 3. SCHOLARSHIPS 2026
  const SCHOLARSHIPS_DATA: ScholarshipItem[] = [
    {
      id: 'gargi',
      title: 'Gargi Puraskar Yojana',
      hindiTitle: 'गार्गी पुरस्कार योजना (कक्षा 10वीं बोर्ड)',
      amount: '₹5,000 नकद + प्रशस्ति पत्र (बसंत पंचमी पर)',
      eligibility: 'माध्यमिक शिक्षा बोर्ड (RBSE) 10वीं में 75% या अधिक अंक प्राप्त करने वाली बालिकाएं।',
      deadline: 'सत्र 2025-26 आवेदन चालू',
      portal: 'शाला दर्पण बालिका शिक्षा पोर्टल',
      portalUrl: 'https://rajshaladarpan.nic.in',
      category: 'बालिका प्रोत्साहन'
    },
    {
      id: 'scooty',
      title: 'Kalibai Bheel Medhavi Chhatra Scooty Yojana',
      hindiTitle: 'कालीबाई भील मेधावी छात्रा स्कूटी योजना (12वीं उत्तीर्ण)',
      amount: 'निःशुल्क स्कूटी + 1 वर्ष का थर्ड पार्टी बीमा + 2 लीटर पेट्रोल व हेलमेट',
      eligibility: '12वीं बोर्ड में कला/विज्ञान/कृषि में 65%+ (SC/ST) व 75%+ (सामान्य/ओबीसी) अंक प्राप्त छात्राएं।',
      deadline: 'वार्षिक लॉटरी व कॉलेज प्रवेश उपरांत',
      portal: 'राजस्थान उच्च शिक्षा छात्रवृत्ति पोर्टल',
      portalUrl: 'https://hte.rajasthan.gov.in',
      category: 'मेधावी छात्रा'
    },
    {
      id: 'post-matric',
      title: 'Post-Matric Scholarship (SJE)',
      hindiTitle: 'उत्तर मैट्रिक छात्रवृत्ति (11वीं, 12वीं, कॉलेज व आईटीआई)',
      amount: '100% शिक्षण शुल्क पुनर्भरण + अनुरक्षण भत्ता (₹4,000 से ₹15,000 वार्षिक)',
      eligibility: 'SC, ST, OBC (BPL), EWS, MBC एवं दिव्यांग विद्यार्थी। पारिवारिक वार्षिक आय ₹2.5 लाख से कम।',
      deadline: 'सत्र 2025-26 ऑनलाइन पंजीयन',
      portal: 'सामाजिक न्याय एवं अधिकारिता विभाग (SSO)',
      portalUrl: 'https://sso.rajasthan.gov.in',
      category: 'फीस पुनर्भरण'
    },
    {
      id: 'anuprati',
      title: 'Mukhyamantri Anuprati Coaching Yojana',
      hindiTitle: 'मुख्यमंत्री अनुप्रति कोचिंग योजना (निःशुल्क प्रतियोगी तैयारी)',
      amount: 'कोटा/जयपुर के प्रतिष्ठित कोचिंग संस्थानों में फ्री कोचिंग + आवास हेतु ₹40,000/वर्ष',
      eligibility: 'NEET, JEE, UPSC, RAS, REET, कांस्टेबल, पटवार तैयारी हेतु 10वीं/12वीं मेरिट आधार पर।',
      deadline: 'पोर्टल पर चरणबद्ध विज्ञप्ति',
      portal: 'राज एसएसओ (SSO Portal)',
      portalUrl: 'https://sso.rajasthan.gov.in',
      category: 'प्रतियोगी कोचिंग'
    },
    {
      id: 'nmms',
      title: 'National Means-cum-Merit Scholarship (NMMS)',
      hindiTitle: 'राष्ट्रीय साधन सह-मेधा छात्रवृत्ति परीक्षा (कक्षा 8वीं छात्र)',
      amount: '₹12,000 प्रति वर्ष (कक्षा 9वीं से 12वीं तक कुल ₹48,000)',
      eligibility: 'राजकीय विद्यालय में कक्षा 8वीं अध्ययनरत विद्यार्थी (NMMS लिखित परीक्षा उत्तीर्ण)।',
      deadline: 'अक्टूबर-नवंबर परीक्षा पंजीकरण',
      portal: 'शाला दर्पण NMMS पोर्टल',
      portalUrl: 'https://rajshaladarpan.nic.in',
      category: 'मेरिट छात्रवृत्ति'
    }
  ]

  // 4. STUDY RESOURCES
  const STUDY_RESOURCES_DATA: StudyResourceItem[] = [
    {
      id: 'mg-12-agri',
      title: 'मिशन ज्ञान ई-कक्षा: 12वीं कृषि विज्ञान (Agriculture) सम्पूर्ण वीडियो लैक्चर्स',
      classLevel: 'कक्षा 12वीं',
      medium: 'हिंदी माध्यम',
      subject: 'कृषि विज्ञान / शस्य विज्ञान',
      type: 'Video',
      link: 'https://www.youtube.com/@MissionGyanEkaksha',
      provider: 'मिशन ज्ञान राजस्थान सरकार'
    },
    {
      id: 'mg-10-all',
      title: 'कक्षा 10वीं बोर्ड परीक्षा 2026: गणित, विज्ञान व संस्कृत वीडियो क्रैश कोर्स',
      classLevel: 'कक्षा 10वीं',
      medium: 'हिंदी माध्यम',
      subject: 'गणित व विज्ञान',
      type: 'Video',
      link: 'https://www.youtube.com/@MissionGyanEkaksha',
      provider: 'ई-कक्षा राजस्थान'
    },
    {
      id: 'rbse-books',
      title: 'राजस्थान राज्य पाठ्यपुस्तक मंडल: कक्षा 1 से 12 की आधिकारिक ई-बुक्स (PDF)',
      classLevel: 'कक्षा 1 से 12वीं',
      medium: 'हिंदी / इंग्लिश',
      subject: 'सभी विषय',
      type: 'PDF Book',
      link: 'https://rajeduboard.rajasthan.gov.in',
      provider: 'RBSE अजमेर'
    },
    {
      id: 'model-papers',
      title: 'बोर्ड परीक्षा 2026: 10वीं व 12वीं के मॉडल टेस्ट पेपर्स एवं ब्लू-प्रिंट',
      classLevel: '10वीं व 12वीं',
      medium: 'हिंदी माध्यम',
      subject: 'मॉडल पेपर्स हल सहित',
      type: 'Model Paper',
      link: 'https://rajeduboard.rajasthan.gov.in',
      provider: 'माध्यमिक शिक्षा बोर्ड राजस्थान'
    }
  ]

  const filteredScholarships = SCHOLARSHIPS_DATA.filter(s =>
    s.hindiTitle.toLowerCase().includes(searchScholarship.toLowerCase()) ||
    s.title.toLowerCase().includes(searchScholarship.toLowerCase()) ||
    s.category.toLowerCase().includes(searchScholarship.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 bg-[#0f172a] min-h-[calc(100vh-65px)]">
          <PortalSidebar activeId="education" />
        </aside>

        {/* Mobile Slide-over Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-80 max-w-[85%] bg-[#0f172a] h-full shadow-2xl z-10">
              <PortalSidebar
                activeId="education"
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* MAIN EDUCATION HUB CONTENT */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 space-y-6">

          {/* 1. HERO BANNER: Royal Education Hub Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-500/30">
            {/* Background decorative elements */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none hidden md:block">
              <GraduationCap size={300} />
            </div>

            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                <GraduationCap size={16} className="text-amber-400" />
                <span>शिक्षा एवं कौशल संवर्धन केंद्र • ग्राम पंचायत गुढ़ा व मोती नगर</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                🎓 शिक्षा हब (Education Hub)
                <span className="block text-lg sm:text-2xl font-medium text-blue-200 mt-1">
                  विद्यालय, आंगनवाड़ी, छात्रवृत्तियां, परीक्षा सूचनाएं, रिजल्ट व ई-अध्ययन सामग्री
                </span>
              </h1>

              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-3xl">
                मोती नगर व गुढ़ा क्षेत्र के विद्यार्थियों, शिक्षकों एवं अभिभावकों के लिए एकीकृत डिजिटल मंच। यहाँ राजकीय विद्यालयों, आंगनवाड़ी केंद्रों, गार्गी व स्कूटी छात्रवृत्तियों, बोर्ड परीक्षा टाइम-टेबल, रिजल्ट व मिशन ज्ञान ई-कक्षा की प्रामाणिक जानकारी उपलब्ध है।
              </p>

              {/* Quick Stat Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-blue-950/60 backdrop-blur-md rounded-2xl p-3 border border-blue-400/25">
                  <div className="text-[11px] text-blue-200">कुल नामांकित छात्र-छात्राएं</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">660+ <span className="text-[11px] font-normal text-blue-100">विद्यार्थी</span></div>
                </div>
                <div className="bg-blue-950/60 backdrop-blur-md rounded-2xl p-3 border border-blue-400/25">
                  <div className="text-[11px] text-blue-200">राजकीय विद्यालय</div>
                  <div className="text-base sm:text-lg font-bold text-white">03 <span className="text-[11px] font-normal text-blue-200">प्रावि, उमावि व एमजीजीएस</span></div>
                </div>
                <div className="bg-blue-950/60 backdrop-blur-md rounded-2xl p-3 border border-blue-400/25">
                  <div className="text-[11px] text-blue-200">सक्रिय आंगनवाड़ी केंद्र</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">02 केंद्र <span className="text-[11px] font-normal text-blue-200">मोती नगर व गुढ़ा</span></div>
                </div>
                <div className="bg-blue-950/60 backdrop-blur-md rounded-2xl p-3 border border-blue-400/25">
                  <div className="text-[11px] text-blue-200">बाल गोपाल दूध वितरण</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-300">100% दैनिक <span className="text-[11px] font-normal text-blue-200">सप्ताह में 6 दिन</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION TABS (Interactive 6 Modules) */}
          <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {[
                { id: 'schools', label: '🏫 विद्यालय (Schools)', icon: School },
                { id: 'anganwadi', label: '👶 आंगनवाड़ी केंद्र (Anganwadi)', icon: Baby },
                { id: 'scholarships', label: '🎓 छात्रवृत्तियां (Scholarships)', icon: Award },
                { id: 'exams', label: '📢 परीक्षा व रिजल्ट (Exams & Results)', icon: Calendar },
                { id: 'resources', label: '📚 अध्ययन सामग्री (Study Resources)', icon: BookOpen },
                { id: 'gallery', label: '📸 स्कूल फोटो गैलरी (Campus Life)', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-800 text-white shadow-md shadow-blue-800/25 scale-[1.02]'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-amber-300' : 'text-slate-500'} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. TAB CONTENT SECTIONS */}

          {/* TAB 1: SCHOOLS (विद्यालय संपूर्ण विवरण) */}
          {activeTab === 'schools' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {SCHOOLS_DATA.map((school) => (
                  <div
                    key={school.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header with Badge */}
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={school.image}
                          alt={school.nameHindi}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-900/90 text-white text-[11px] font-bold shadow-md">
                          {school.category}
                        </span>
                        <span className="absolute bottom-3 left-3 text-xs text-white/90 font-mono">
                          {school.codeNIC}
                        </span>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-800 transition">
                            {school.nameHindi}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{school.nameEng}</p>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <MapPin size={15} className="text-rose-600 shrink-0 mt-0.5" />
                          <span>{school.location}</span>
                        </div>

                        {/* Key Specs: Students & Teachers */}
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-2.5">
                            <span className="text-[10px] text-blue-700 font-medium block">कुल विद्यार्थी</span>
                            <span className="text-base font-extrabold text-blue-950">{school.studentsCount} छात्र</span>
                          </div>
                          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5">
                            <span className="text-[10px] text-emerald-700 font-medium block">अध्यापक दल</span>
                            <span className="text-base font-extrabold text-emerald-950">{school.teachersCount} शिक्षक</span>
                          </div>
                        </div>

                        {/* Streams Offered */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">उपलब्ध संकाय / कक्षाएं:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {school.streams.map((str, idx) => (
                              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                                {str}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Facilities Checklist */}
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">प्रमुख सुविधाएं (Facilities):</span>
                          <ul className="space-y-1 text-xs text-slate-600">
                            {school.facilities.slice(0, 4).map((fac, idx) => {
                              const FacIcon = fac.icon
                              return (
                                <li key={idx} className="flex items-center gap-2">
                                  <FacIcon size={14} className="text-blue-600 shrink-0" />
                                  <span>{fac.label}</span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions: Contact & Map */}
                    <div className="p-5 pt-0 border-t border-slate-100 mt-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-600 pt-3">
                        <span className="font-semibold text-slate-800">{school.principalName}</span>
                        <a
                          href={`tel:${school.principalPhone.replace(/[^0-9]/g, '')}`}
                          className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"
                        >
                          <PhoneCall size={13} /> {school.principalPhone}
                        </a>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <a
                          href={school.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition flex items-center justify-center gap-1"
                        >
                          <MapPin size={13} className="text-rose-600" /> मैप देखें
                        </a>
                        <button
                          onClick={() => setSelectedSchool(school)}
                          className="py-2 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
                        >
                          पूरा विवरण ➔
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* School Detail Modal */}
              {selectedSchool && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                          {selectedSchool.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                          {selectedSchool.nameHindi}
                        </h3>
                        <p className="text-xs text-slate-500">{selectedSchool.nameEng}</p>
                      </div>
                      <button
                        onClick={() => setSelectedSchool(null)}
                        className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
                      <Image src={selectedSchool.image} alt={selectedSchool.nameHindi} fill className="object-cover" />
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {selectedSchool.description}
                    </p>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <p><strong>प्रधानाचार्य / संस्था प्रधान:</strong> {selectedSchool.principalName} ({selectedSchool.principalPhone})</p>
                      <p><strong>समय:</strong> {selectedSchool.timing}</p>
                      <p><strong>शाला दर्पण कोड:</strong> {selectedSchool.codeNIC}</p>
                      <p><strong>स्थान:</strong> {selectedSchool.location}</p>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 mb-2">सभी सुविधाएं (Complete Facilities):</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {selectedSchool.facilities.map((f, i) => {
                          const IconComp = f.icon
                          return (
                            <div key={i} className="flex items-center gap-2 p-2 bg-blue-50/60 rounded-xl border border-blue-100">
                              <IconComp size={15} className="text-blue-700 shrink-0" />
                              <span className="font-medium text-slate-800">{f.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                      <a
                        href={selectedSchool.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5"
                      >
                        <MapPin size={14} className="text-rose-600" /> गूगल मैप पर देखें
                      </a>
                      <button
                        onClick={() => setSelectedSchool(null)}
                        className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs"
                      >
                        बंद करें (Close)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ANGANWADI CENTERS (आंगनवाड़ी केंद्र) */}
          {activeTab === 'anganwadi' && (
            <div className="space-y-6">
              <div className="bg-pink-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-pink-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-400/40 text-pink-200 text-xs font-semibold mb-2">
                    <Baby size={15} />
                    <span>महिला एवं बाल विकास विभाग (WCD Rajasthan)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black">👶 आंगनवाड़ी सेवाएं (Moti Nagar & Gudha Centers)</h2>
                  <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-2xl">
                    0 से 6 वर्ष के नन्हे बच्चों का प्रारंभिक विकास, वजन-निगरानी, पोषाहार, तथा गर्भवती व धात्री माताओं को स्वास्थ्य सुरक्षा।
                  </p>
                </div>
                <div className="bg-pink-950/80 border border-pink-500/40 rounded-2xl p-4 text-center shrink-0">
                  <span className="text-[11px] text-pink-300 block">कुल पंजीकृत बच्चे व माताएं</span>
                  <span className="text-2xl font-black text-white">117 लाभार्थी</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ANGANWADI_DATA.map((center) => (
                  <div
                    key={center.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 hover:border-pink-300 hover:shadow-md transition space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="px-2.5 py-1 rounded-full bg-pink-50 text-pink-800 text-[11px] font-bold border border-pink-200">
                            सक्रिय केंद्र
                          </span>
                          <h3 className="text-lg font-black text-slate-900 mt-1.5">{center.centerName}</h3>
                          <p className="text-xs text-slate-500">{center.location}</p>
                        </div>
                      </div>

                      {/* Staff Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">आंगनवाड़ी कार्यकर्ता</span>
                          <span className="font-extrabold text-slate-800">{center.workerName}</span>
                          <a
                            href={`tel:${center.workerPhone.replace(/[^0-9]/g, '')}`}
                            className="block font-bold text-pink-700 hover:underline mt-0.5 flex items-center gap-1"
                          >
                            <PhoneCall size={11} /> {center.workerPhone}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-bold uppercase">आंगनवाड़ी सहायिका</span>
                          <span className="font-extrabold text-slate-800">{center.helperName}</span>
                          <span className="text-slate-500 block text-[10px]">पोषाहार व केंद्र संचालन</span>
                        </div>
                      </div>

                      {/* Beneficiaries Count */}
                      <div className="grid grid-cols-2 gap-3 text-center text-xs">
                        <div className="bg-pink-50/70 border border-pink-100 rounded-xl p-3">
                          <span className="text-[10px] text-pink-700 font-bold block">पंजीकृत नौनिहाल</span>
                          <span className="text-lg font-black text-pink-950">{center.childrenCount} बच्चे</span>
                        </div>
                        <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3">
                          <span className="text-[10px] text-amber-700 font-bold block">गर्भवती व धात्री माताएं</span>
                          <span className="text-lg font-black text-amber-950">{center.mothersCount} माताएं</span>
                        </div>
                      </div>

                      {/* Services List */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">प्रदत्त सेवाएं:</span>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {center.services.map((s, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-pink-600 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Nutrition schedule */}
                      <div className="p-3 bg-pink-50/60 rounded-xl border border-pink-200 text-xs text-pink-950">
                        🍲 <strong>पोषाहार वितरण:</strong> {center.nutritionSchedule}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>समय: <strong>{center.timing}</strong></span>
                      <span className="text-pink-700 font-bold">निःशुल्क सरकारी सेवा</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SCHOLARSHIPS 2026 (छात्रवृत्ति योजनाएं) */}
          {activeTab === 'scholarships' && (
            <div className="space-y-6">
              {/* Search & Filter Header */}
              <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">🎓 राजस्थान छात्रवृत्ति एवं प्रोत्साहन योजनाएं 2026</h2>
                  <p className="text-xs text-slate-500 mt-0.5">गार्गी, स्कूटी, उत्तर मैट्रिक व अनुप्रति कोचिंग छात्रवृत्ति</p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchScholarship}
                    onChange={(e) => setSearchScholarship(e.target.value)}
                    placeholder="छात्रवृत्ति खोजें (जैसे: गार्गी, स्कूटी)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Scholarship Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredScholarships.map((sch) => (
                  <div
                    key={sch.id}
                    className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-[11px]">
                          {sch.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{sch.deadline}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        {sch.hindiTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3">{sch.title}</p>

                      {/* Benefit Highlight */}
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-3">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">छात्रवृत्ति राशि / लाभ</span>
                        <span className="text-sm sm:text-base font-black text-amber-950">{sch.amount}</span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1.5 mb-4">
                        <p><strong>पात्रता नियम:</strong> {sch.eligibility}</p>
                        <p><strong>आवेदन पोर्टल:</strong> {sch.portal}</p>
                      </div>
                    </div>

                    <a
                      href={sch.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm text-center transition flex items-center justify-center gap-1.5"
                    >
                      पोर्टल पर ऑनलाइन आवेदन करें <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXAM NOTICES & RESULTS (बोर्ड परीक्षा सूचना व रिजल्ट) */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Board Exam Time Table */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <Calendar size={20} className="text-blue-700" />
                      माध्यमिक शिक्षा बोर्ड परीक्षा 2026 कार्यक्रम (RBSE)
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600">
                    राजकीय उच्च माध्यमिक विद्यालय गुढ़ा परीक्षा केंद्र पर पंजीकृत 10वीं व 12वीं के परीक्षार्थियों हेतु समय-सारणी:
                  </p>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs">
                      <div className="flex items-center justify-between font-bold text-blue-950 mb-1">
                        <span>कक्षा 12वीं बोर्ड परीक्षाएं</span>
                        <span className="text-blue-700">मार्च 2026</span>
                      </div>
                      <p className="text-slate-600">समय: प्रातः 08:30 से 11:45 बजे (कला, विज्ञान एवं कृषि संकाय)</p>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs">
                      <div className="flex items-center justify-between font-bold text-emerald-950 mb-1">
                        <span>कक्षा 10वीं बोर्ड परीक्षाएं</span>
                        <span className="text-emerald-700">मार्च - अप्रैल 2026</span>
                      </div>
                      <p className="text-slate-600">अनिवार्य विषय: हिंदी, अंग्रेजी, विज्ञान, गणित, सामाजिक विज्ञान, संस्कृत</p>
                    </div>

                    <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-xs">
                      <div className="flex items-center justify-between font-bold text-amber-950 mb-1">
                        <span>कक्षा 5वीं व 8वीं बोर्ड (DIET Bundi)</span>
                        <span className="text-amber-700">अप्रैल 2026</span>
                      </div>
                      <p className="text-slate-600">प्राथमिक शिक्षा अधिगम स्तर मूल्यांकन (ग्रेडिंग पद्धति आधारित)</p>
                    </div>
                  </div>

                  <a
                    href="https://rajeduboard.rajasthan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 pt-2"
                  >
                    आधिकारिक टाइम-टेबल PDF डाउनलोड करें ➔
                  </a>
                </div>

                {/* Direct Results Checker Portal */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                        <Trophy size={20} className="text-amber-500" />
                        बोर्ड परीक्षा परिणाम (Direct Results Link)
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 mt-3">
                      अजमेर बोर्ड एवं शाला दर्पण पोर्टल द्वारा परिणाम घोषित होते ही विद्यार्थी अपने रोल नंबर दर्ज कर सीधे मार्कशीट देख सकते हैं।
                    </p>

                    <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="text-xs font-bold text-slate-700">आधिकारिक रिजल्ट पोर्टल्स:</div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        <li className="flex items-center justify-between">
                          <span>1. RBSE 10th / 12th Results</span>
                          <a href="https://rajresults.nic.in" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">
                            rajresults.nic.in ➔
                          </a>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>2. कक्षा 5वीं व 8वीं रिजल्ट (शाला दर्पण)</span>
                          <a href="https://rajshaladarpan.nic.in" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">
                            Shala Darpan ➔
                          </a>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>3. राजस्थान स्टेट ओपन स्कूल (RSOS)</span>
                          <a href="https://rsosapp.rajasthan.gov.in" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">
                            rsos.rajasthan.gov.in ➔
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <a
                    href="https://rajresults.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm text-center transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    रिजल्ट पोर्टल खोलें (Check Result) <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STUDY RESOURCES (ई-कक्षा व अध्ययन सामग्री) */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">📚 निःशुल्क अध्ययन सामग्री व ई-कक्षा (E-Kaksha Rajasthan)</h2>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
                    मिशन ज्ञान एवं राजस्थान शिक्षा विभाग द्वारा कक्षा 1 से 12वीं के सभी विषयों के उच्च गुणवत्ता वाले वीडियो लैक्चर्स व NCERT पुस्तकें।
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@MissionGyanEkaksha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition shrink-0 inline-flex items-center gap-1.5"
                >
                  ई-कक्षा यूट्यूब चैनल खोलें <Video size={15} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STUDY_RESOURCES_DATA.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                          {res.classLevel}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {res.type}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 mb-2">
                        {res.title}
                      </h3>

                      <div className="text-xs text-slate-600 space-y-1 mb-4">
                        <p><strong>विषय:</strong> {res.subject} ({res.medium})</p>
                        <p><strong>प्रदाता:</strong> {res.provider}</p>
                      </div>
                    </div>

                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs text-center transition flex items-center justify-center gap-1"
                    >
                      {res.type === 'Video' ? 'वीडियो देखें' : 'डाउनलोड करें'} <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CAMPUS LIFE & PHOTOS (स्कूल फोटो गैलरी) */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-500" />
                  विद्यालय जीवन एवं गतिविधियां (Campus Life & Activities)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { img: '/images/govt_school.jpg', title: 'राजकीय उच्च माध्यमिक विद्यालय गुढ़ा मुख्य भवन', desc: 'हरित परिसर व सुसज्जित कक्षा कक्ष' },
                    { img: '/images/cultural_events.jpg', title: 'गणतंत्र दिवस व वार्षिक सांस्कृतिक उत्सव', desc: 'गाँव के बच्चों द्वारा प्रस्तुत देशभक्ति कार्यक्रम' },
                    { img: '/images/scheme_students.jpg', title: 'विद्यार्थी समूह व कंप्यूटर साक्षरता', desc: 'डिजिटल राजस्थान अभियान के तहत कंप्यूटर लैब' },
                    { img: '/images/hero.jpg', title: 'प्राथमिक विद्यालय मोती नगर खेल प्रांगण', desc: 'नो-बैग डे (शनिवार) पर खेलकूद व योग सत्र' },
                    { img: '/images/temple.jpg', title: 'सरस्वती वंदना एवं प्रातःकालीन सभा', desc: 'नैतिक शिक्षा व दैनिक प्रार्थना सभा' },
                    { img: '/images/natural_beauty.jpg', title: 'वृक्षारोपण एवं पर्यावरण क्लब', desc: 'पर्यावरण संरक्षण हेतु विद्यार्थियों द्वारा पौधरोपण' },
                  ].map((item, idx) => (
                    <div key={idx} className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <div className="relative h-52 w-full">
                        <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                          <p className="text-[11px] text-slate-300 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. IMPORTANT EDUCATION PORTAL LINKS (Always Accessible) */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <ExternalLink size={18} className="text-blue-700" />
              महत्वपूर्ण शिक्षा वेब लिंक (Official Educational Portals)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <a
                href="https://rajshaladarpan.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition font-bold text-slate-800 hover:text-blue-900 flex items-center justify-between"
              >
                <span>शाला दर्पण पोर्टल</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>

              <a
                href="https://rajeduboard.rajasthan.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition font-bold text-slate-800 hover:text-blue-900 flex items-center justify-between"
              >
                <span>RBSE अजमेर बोर्ड</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>

              <a
                href="https://hte.rajasthan.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition font-bold text-slate-800 hover:text-blue-900 flex items-center justify-between"
              >
                <span>उच्च शिक्षा छात्रवृत्ति</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>

              <a
                href="https://rajpsp.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl transition font-bold text-slate-800 hover:text-blue-900 flex items-center justify-between"
              >
                <span>RTE 25% फ्री एडमिशन</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            </div>
          </div>

        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
