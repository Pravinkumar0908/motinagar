'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Landmark,
  UsersRound,
  Building2,
  Calendar,
  Clock,
  Compass,
  Navigation,
  Share2,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  HeartHandshake,
  GraduationCap,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  Info,
  PhoneCall,
  Mail,
  FileText,
  Trees,
  Droplets,
  Sun,
  BookOpen,
  Bus,
  Car,
  Bike,
  X,
  ExternalLink,
  Printer,
  ChevronRight
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MandiWeatherWidget } from '@/components/mandi-weather-widget'

// Types & Constants
const GOOGLE_MAPS_SHORT_URL = 'https://maps.app.goo.gl/GM47mAhRpmHp5qYw6'
const GOOGLE_MAPS_FULL_URL = 'https://www.google.com/maps/place/Maha+Shop/@25.7985349,76.2135184,872m/data=!3m2!1e3!4b1!4m6!3m5!1s0x396e33bd7472e40f:0x12891acc89209609!8m2!3d25.7985349!4d76.2160933!16s%2Fg%2F11lv_15f6x?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D'
const GOOGLE_MAPS_EMBED_URL = 'https://maps.google.com/maps?q=25.7985349,76.2160933&hl=hi&z=16&output=embed'
const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=25.7985349,76.2160933'

interface Place {
  id: string
  title: string
  hindi: string
  category: 'Spiritual' | 'Heritage' | 'Governance' | 'Education' | 'Health' | 'Sports' | 'Agriculture' | 'Commercial'
  categoryHindi: string
  image: string
  badgeColor: string
  timing: string
  distance: string
  coords: string
  mapUrl?: string
  desc: string
  highlights: string[]
  contactPerson?: string
}

interface NearbyVillage {
  id: string
  name: string
  hindi: string
  distanceKm: number
  direction: string
  directionHindi: string
  roadType: string
  travelTime: string
  transport: string
  specialty: string
}

interface TimelineMilestone {
  year: string
  era: string
  title: string
  hindiTitle: string
  tag: string
  tagColor: string
  desc: string
  achievement: string
}

// 1. IMPORTANT PLACES DATA
const PLACES_DATA: Place[] = [
  {
    id: 'maha-shop',
    title: 'Maha Shop & Central Village Market Hub',
    hindi: 'महा शॉप एवं मोती नगर मुख्य व्यापारिक केंद्र',
    category: 'Commercial',
    categoryHindi: 'दुकानें व व्यापारिक केंद्र',
    image: '/images/village_life.jpg',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    timing: 'प्रातः 07:00 - रात्रि 09:30 (दैनिक)',
    distance: 'गाँव का मुख्य चौराहा (Central Landmark Point)',
    coords: '25.7985° N, 76.2161° E',
    mapUrl: GOOGLE_MAPS_SHORT_URL,
    desc: 'गूगल मैप्स पर अधिकृत रूप से सत्यापित मोती नगर का प्रमुख व्यापारिक केंद्र एवं लैंडमार्क। यहाँ दैनिक उपभोग की वस्तुएं, किराना, कृषि इनपुट एवं आवश्यक सेवाएं उपलब्ध हैं।',
    highlights: [
      '📍 गूगल मैप्स पर अधिकृत पिन: Maha Shop (25.798535, 76.216093)',
      'गाँव के केंद्रीय चौराहे पर प्रमुख मिलन व दिशा-निर्देश बिंदु',
      'स्थानीय ग्रामीणों व आगंतुकों के लिए सबसे सुलभ पहचान स्थल'
    ],
    contactPerson: 'महा शॉप संचालक'
  },
  {
    id: 'temple',
    title: 'Shri Radha Krishna & Ancient Shiv Mandir',
    hindi: 'प्राचीन श्री राधा-कृष्ण एवं शिव मंदिर',
    category: 'Spiritual',
    categoryHindi: 'धार्मिक व आध्यात्मिक',
    image: '/images/temple.jpg',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    timing: 'प्रातः 05:00 - दोपहर 12:00 | सायं 04:30 - रात्रि 09:00',
    distance: 'गांव के केंद्र में (चौक बाजार)',
    coords: '25.7988° N, 76.2163° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7988,76.2163',
    desc: 'संवत् 1902 (1845 ई.) में स्थापित यह ऐतिहासिक मंदिर गांव की आध्यात्मिक आत्मा है। सफेद संगमरमर की कलात्मक मूर्तियां, नक्काशीदार खंभे और विशाल सभा मंडप यहां की पहचान हैं।',
    highlights: [
      'वार्षिक फूलडोल व जन्माष्टमी पर 5,000+ श्रद्धालुओं का मेला',
      'मंदिर परिसर में दैनिक संध्या आरती व बाल संस्कार शाला',
      'विशाल गौशाला व प्रसाद वितरण कक्ष'
    ],
    contactPerson: 'महंत रामशरण दास जी (मुख्य पुजारी)'
  },
  {
    id: 'stepwell',
    title: 'Historic Moti Stepwell & Amrit Sarovar',
    hindi: 'ऐतिहासिक मोती बावड़ी एवं अमृत सरोवर',
    category: 'Heritage',
    categoryHindi: 'जल धरोहर व पर्यटन',
    image: '/images/natural_beauty.jpg',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    timing: 'सूर्योदय से सूर्यास्त (प्रातः 06:00 - सायं 07:00)',
    distance: '0.4 किमी (दक्षिण-पश्चिम)',
    coords: '25.7972° N, 76.2148° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7972,76.2148',
    desc: '300 वर्ष पूर्व बूंदी रियासत काल में निर्मित यह कलात्मक बावड़ी प्राचीन जल संरक्षण का अनुपम उदाहरण है। हाल ही में अमृत सरोवर योजना के तहत इसके चारों ओर सुंदर वॉकिंग पाथ और सोलर लाइटें लगाई गई हैं।',
    highlights: [
      'हाड़ौती वास्तुकला की 48 कलात्मक सीढ़ियां व झरोखे',
      'वर्षभर स्वच्छ प्राकृतिक भूमिगत जल स्रोत',
      'शाम के समय ग्रामीणों के लिए शांत सरोवर चौपाल व वॉक-वे'
    ],
    contactPerson: 'जल संरक्षण समिति, मोती नगर'
  },
  {
    id: 'panchayat',
    title: 'Gram Panchayat Gudha Secretariat & Moti Nagar Sub-Center',
    hindi: 'ग्राम पंचायत गुढ़ा सचिवालय एवं मोती नगर नागरिक केंद्र',
    category: 'Governance',
    categoryHindi: 'प्रशासनिक व सेवाएं',
    image: '/images/panchayat_bhawan.jpg',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    timing: 'सोमवार - शनिवार: प्रातः 09:30 - सायं 06:00',
    distance: 'गुढ़ा मुख्यालय: 6.5 किमी (मोती नगर में साप्ताहिक शिविर)',
    coords: '25.7982° N, 76.2158° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7982,76.2158',
    desc: 'मोती नगर प्रशासनिक रूप से ग्राम पंचायत गुढ़ा के अधीन आता है। मुख्य पंचायत सचिवालय गुढ़ा में स्थित है जहाँ 11 वार्डों का प्रशासनिक कार्य संचालित होता है। वर्तमान में चुनाव प्रक्रियाधीन होने से प्रशासक व VDO द्वारा कार्य संचालित हैं।',
    highlights: [
      'गुढ़ा पंचायत मुख्यालय 6.5 किमी दूरी पर स्थित',
      'मोती नगर में नियमित ई-मित्र व VDO शिविर व्यवस्था',
      'चुनाव परिणाम घोषित होते ही नवनिर्वाचित प्रतिनिधियों का विवरण अपडेट होगा'
    ],
    contactPerson: 'श्री सुरेश चंद मीना (ग्राम विकास अधिकारी - VDO: +91 98292 44321)'
  },
  {
    id: 'school',
    title: 'Govt. Senior Secondary Smart School',
    hindi: 'राजकीय उच्च माध्यमिक आदर्श विद्यालय व स्मार्ट लैब',
    category: 'Education',
    categoryHindi: 'शिक्षा व शोध',
    image: '/images/govt_school.jpg',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    timing: 'सोमवार - शनिवार: प्रातः 07:30 - दोपहर 01:30',
    distance: '0.6 किमी (उत्तर सीमा)',
    coords: '25.8005° N, 76.2170° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.8005,76.2170',
    desc: '800 से अधिक छात्र-छात्राओं वाला उत्कृष्ट विद्यालय जहाँ रोबोटिक्स लैब, कंप्यूटर सेंटर, सुसज्जित विज्ञान प्रयोगशाला और भव्य खेल मैदान है। बोर्ड परीक्षाओं में लगातार 98% से अधिक परिणाम।',
    highlights: [
      'डिजिटल स्मार्ट बोर्ड व 25 कंप्यूटरों वाली आईसीटी लैब',
      'निःशुल्क मिड-डे मील व आधुनिक आरओ पेयजल संयंत्र',
      'जिला स्तरीय एथलेटिक्स व खो-खो विजेता टीम'
    ],
    contactPerson: 'डॉ. अनीता शर्मा (प्रधानाचार्य)'
  },
  {
    id: 'hospital',
    title: 'Primary Health Sub-Center & Ayush Wellness Clinic',
    hindi: 'प्राथमिक स्वास्थ्य उप-केंद्र एवं आयुष आरोग्य केंद्र',
    category: 'Health',
    categoryHindi: 'स्वास्थ्य व चिकित्सा',
    image: '/images/hero.jpg',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    timing: 'आपातकालीन सेवा: 24 घंटे | ओपीडी: 09:00 AM - 04:00 PM',
    distance: '0.5 किमी (अस्पताल चौराहा)',
    coords: '25.7980° N, 76.2175° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7980,76.2175',
    desc: '24 घंटे संचालित मातृ एवं शिशु स्वास्थ्य केंद्र जहाँ प्रशिक्षित चिकित्सक, एएनएम, एम्बुलेंस और टेली-कंसल्टेशन की सुविधा उपलब्ध है। हर माह टीकाकरण और निःशुल्क दवा वितरण शिविर।',
    highlights: [
      '24x7 निःशुल्क आपातकालीन जननी एक्सप्रेस एम्बुलेंस',
      'मुख्यमंत्री निःशुल्क दवा व जांच योजना 100% उपलब्ध',
      'आयुष प्राकृतिक चिकित्सा व योग केंद्र'
    ],
    contactPerson: 'डॉ. रवि कांत वर्मा (चिकित्सा प्रभारी)'
  },
  {
    id: 'sports',
    title: 'Shaheed Bhagat Singh Rural Sports Complex',
    hindi: 'शहीद भगत सिंह ग्रामीण खेल संकुल व ओपन जिम',
    category: 'Sports',
    categoryHindi: 'खेल व युवा कल्याण',
    image: '/images/cultural_events.jpg',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    timing: 'प्रातः 05:00 - 09:00 | सायं 04:00 - 08:30',
    distance: '0.8 किमी (नहर के पास)',
    coords: '25.7965° N, 76.2185° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7965,76.2185',
    desc: 'युवाओं के शारीरिक विकास और सेना/पुलिस भर्ती की तैयारी के लिए निर्मित 400 मीटर रनिंग ट्रैक, वॉलीबॉल कोर्ट, कबड्डी मैट और ओपन-एयर आधुनिक जिम उपकरण।',
    highlights: [
      '400 मीटर सिंडर रनing ट्रैक व लॉन्ग जंप पिट',
      'महिलाओं व वरिष्ठ नागरिकों हेतु समर्पित वॉक-वे',
      'प्रतिवर्ष जिला स्तरीय ग्रामीण ओलम्पिक का मुख्य वेन्यू'
    ],
    contactPerson: 'खेल विकास समिति, मोती नगर'
  },
  {
    id: 'kisan-chaupal',
    title: 'Kisan Seva Kendra & Custom Hiring Center',
    hindi: 'किसान सेवा केंद्र एवं कस्टम हायरिंग कृषि यंत्र बैंक',
    category: 'Agriculture',
    categoryHindi: 'कृषि व किसान कल्याण',
    image: '/images/scheme_kisan.jpg',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    timing: 'प्रातः 09:00 - सायं 05:00',
    distance: '0.3 किमी (सहकारी समिति परिसर)',
    coords: '25.7995° N, 76.2140° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7995,76.2140',
    desc: 'किसानों को रियायती दर पर आधुनिक ट्रैक्टर, रोटावेटर, रीपर किराए पर उपलब्ध कराने वाला केंद्र। यहाँ सॉइल टेस्टिंग (मृदा परीक्षण) और उत्तम गुणवत्ता के प्रमाणित बीज मिलते हैं।',
    highlights: [
      'डिजिटल सॉइल हेल्थ कार्ड प्रिंटिंग सुविधा',
      'जैविक खाद, वर्मी कम्पोस्ट व ड्रिप सिंचाई मार्गदर्शन',
      'क्रय-विक्रय सहकारी समिति का न्यूनतम समर्थन मूल्य केंद्र'
    ],
    contactPerson: 'कृषि पर्यवेक्षक - मोती नगर वृत्त'
  },
  {
    id: 'sacred-banyan',
    title: 'Heritage Sacred Banyan Tree & Nyaya Chaupal',
    hindi: 'विरासत अमर वटवृक्ष एवं न्याय चौपाल चौक',
    category: 'Heritage',
    categoryHindi: 'सांस्कृतिक धरोहर',
    image: '/images/village_life.jpg',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    timing: 'खुला स्थल (24 घंटे)',
    distance: '0.1 किमी (ग्राम पंचायत के सामने)',
    coords: '25.7984° N, 76.2160° E',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=25.7984,76.2160',
    desc: '200 वर्ष से अधिक पुराना विशालकाय वटवृक्ष जिसकी घनी छांव में पीढ़ियों से ग्रामीण संवाद, पंचायती फैसले और लोकगीत आयोजित होते रहे हैं। यह सामाजिक समरसता का प्रतीक है।',
    highlights: [
      'लगभग 1 बीघा क्षेत्र में फैली छायादार शाखाएं',
      'पारम्परिक चबूतरा व रात्रि प्रकाश व्यवस्था',
      'गाँव के स्वतंत्रता सेनानियों का स्मृति शिलापट्ट'
    ],
    contactPerson: 'ग्राम बुजुर्ग परिषद'
  }
]

// 2. NEARBY VILLAGES DATA
const NEARBY_VILLAGES: NearbyVillage[] = [
  {
    id: 'gudha',
    name: 'Gudha (Gram Panchayat HQ)',
    hindi: 'गुढ़ा (ग्राम पंचायत मुख्यालय)',
    distanceKm: 6.5,
    direction: 'North-West',
    directionHindi: 'उत्तर-पश्चिम',
    roadType: 'डामर लिंक सड़क (सीधा संपर्क)',
    travelTime: '12 से 15 मिनट (बाइक/ऑटो)',
    transport: 'नियमित ग्रामीण ऑटो, बस व निजी वाहन',
    specialty: 'ग्राम पंचायत सचिवालय गुढ़ा, सहकारी बैंक, ई-मित्र लाउंज व राजस्व मुख्यालय'
  },
  {
    id: 'rampuriya',
    name: 'Rampuriya',
    hindi: 'रामपुरिया',
    distanceKm: 3.2,
    direction: 'North',
    directionHindi: 'उत्तर',
    roadType: 'डामर पक्की सड़क (PMGSY)',
    travelTime: '6 से 8 मिनट (बाइक/ऑटो)',
    transport: 'नियमित ग्रामीण ऑटो एवं निजी बसें',
    specialty: 'संयुक्त पशु चिकित्सालय एवं उन्नत दुग्ध संकलन केंद्र'
  },
  {
    id: 'keshavpura',
    name: 'Keshavpura',
    hindi: 'केशवपुरा',
    distanceKm: 4.8,
    direction: 'East',
    directionHindi: 'पूर्व',
    roadType: 'नहर लिंक पक्की सड़क',
    travelTime: '10 मिनट',
    transport: 'मिनी बस हर 45 मिनट में',
    specialty: 'साप्ताहिक किसान हाट, अनाज मंडी व गुड़ उद्योग'
  },
  {
    id: 'devpura',
    name: 'Devpura',
    hindi: 'देवपुरा',
    distanceKm: 5.5,
    direction: 'South-East',
    directionHindi: 'दक्षिण-पूर्व',
    roadType: 'डबल लेन जिला मार्ग',
    travelTime: '12 मिनट',
    transport: 'रोडवेज बस व शेयरिंग ऑटो',
    specialty: '33/11 KV विद्युत सब-स्टेशन एवं हायर सेकेंडरी कॉलेज'
  },
  {
    id: 'gopalpura',
    name: 'Gopalpura',
    hindi: 'गोपालपुरा',
    distanceKm: 6.1,
    direction: 'West',
    directionHindi: 'पश्चिम',
    roadType: 'स्टेट हाईवे SH-29 लिंक',
    travelTime: '12 से 15 मिनट',
    transport: 'हाईवे बस सेवा 24x7',
    specialty: 'एग्रो कोल्ड स्टोरेज व कृषि यंत्र मरम्मत वर्कशॉप'
  },
  {
    id: 'bundi-hq',
    name: 'Bundi District HQ',
    hindi: 'बूंदी जिला मुख्यालय',
    distanceKm: 18.0,
    direction: 'South-West',
    directionHindi: 'दक्षिण-पश्चिम',
    roadType: 'फोरलेन नेशनल हाईवे NH-52',
    travelTime: '25 से 30 मिनट',
    transport: 'प्रत्येक 20 मिनट पर एक्सप्रेस बस एवं ट्रेन सेवा',
    specialty: 'कलेक्ट्रेट, जिला अस्पताल, रेलवे स्टेशन व ऐतिहासिक तारागढ़ किला'
  }
]

// 3. VILLAGE TIMELINE MILESTONES
const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: '1784 ई.',
    era: 'रियासतकालीन स्थापना',
    title: 'Founding of Village & Moti Stepwell',
    hindiTitle: 'गाँव की ऐतिहासिक स्थापना व मोती बावड़ी निर्माण',
    tag: 'स्थापना युग',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
    desc: 'बूंदी के प्रतापी हाड़ा शासक राव राजा उम्मेद सिंह के शासनकाल में मोती नगर की पहली बस्ती बसी। प्राकृतिक मीठे पानी के झरनों के निकट मोती बावड़ी का निर्माण कराया गया।',
    achievement: 'सुरक्षित आवासीय बस्ती व बारामासी जल स्रोत की नींव'
  },
  {
    year: '1954',
    era: 'स्वतंत्र भारत में उदय',
    title: 'First Democratic Panchayat & Primary School',
    hindiTitle: 'प्रथम लोकतांत्रिक ग्राम पंचायत गठन व प्राथमिक विद्यालय',
    tag: 'पंचायती राज',
    tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
    desc: 'स्वतंत्रता के बाद राजस्थान पंचायती राज अधिनियम के तहत पहली निर्वाचित पंचायत का गठन हुआ। अमर वटवृक्ष के नीचे प्रथम प्राथमिक पाठशाला शुरू हुई।',
    achievement: 'लोकतांत्रिक व्यवस्था और प्राथमिक शिक्षा का शुभारंभ'
  },
  {
    year: '1978',
    era: 'हरित क्रांति का आगमन',
    title: 'Chambal Canal Water & Agro Revolution',
    hindiTitle: 'चंबल नहर आगमन एवं सिंचित कृषि क्रांति',
    tag: 'कृषि विस्तार',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    desc: 'चंबल दायीं मुख्य नहर से माइनर नहर का निर्माण होने से 85% से अधिक असिंचित भूमि सिंचित हुई। गेहूं, सरसों और बासमती धान की बंपर पैदावार शुरू हुई।',
    achievement: 'गाँव में समृद्धि और खाद्यान्न उत्पादन में 4 गुना वृद्धि'
  },
  {
    year: '1998',
    era: 'आधुनिक संपर्क क्रांति',
    title: 'Full Electrification & All-Weather Pucca Roads',
    hindiTitle: 'शत-प्रतिशत विद्युतीकरण एवं पक्की सड़क संपर्क',
    tag: 'बुनियादी ढांचा',
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    desc: 'गाँव के हर घर तक घरेलू बिजली कनेक्शन पहुंचे और प्रधानमंत्री ग्राम सड़क योजना से गाँव जिला मुख्यालय बूंदी से सीधा पक्की सड़क से जुड़ गया।',
    achievement: 'खेती हेतु 3-फेज कृषि बिजली व निरंतर आवागमन सुविधा'
  },
  {
    year: '2015',
    era: 'स्वच्छता व सम्मान',
    title: '100% ODF Status & Model Nirmal Gram Award',
    hindiTitle: 'शत-प्रतिशत ओडीएफ (ODF) एवं निर्मल ग्राम राज्य सम्मान',
    tag: 'स्वच्छता क्रांति',
    tagColor: 'bg-teal-100 text-teal-800 border-teal-300',
    desc: 'गाँव के प्रत्येक 900+ परिवारों में पक्के शौचालयों का निर्माण हुआ। ठोस व तरल कचरा प्रबंधन प्रणाली शुरू हुई और राज्य सरकार से आदर्श ग्राम का पुरस्कार मिला।',
    achievement: 'खुले में शौच मुक्त (ODF Plus) आदर्श गाँव'
  },
  {
    year: '2021',
    era: 'जल जीवन मिशन',
    title: 'Har Ghar Jal 100% Piped Tap Water',
    hindiTitle: 'हर घर नल से जल — 100% शुद्ध पेयजल आपूर्ति',
    tag: 'पेयजल सुरक्षा',
    tagColor: 'bg-sky-100 text-sky-800 border-sky-300',
    desc: 'जल जीवन मिशन के अंतर्गत गाँव के हर घर में मीटर युक्त शुद्ध पेयजल आपूर्ति शुरू की गई। 1 लाख लीटर क्षमता का उच्च जलाशय (ओवरहेड टैंक) स्थापित।',
    achievement: 'महिलाओं को सिर पर पानी ढोने से हमेशा के लिए मुक्ति'
  },
  {
    year: '2024',
    era: 'हरित ऊर्जा व स्मार्ट शिक्षा',
    title: 'Solar Self-Reliance & Smart Classes',
    hindiTitle: 'सौर ऊर्जा आत्मनिर्भरता व स्मार्ट डिजिटल कक्षाएं',
    tag: 'स्मार्ट गाँव',
    tagColor: 'bg-violet-100 text-violet-800 border-violet-300',
    desc: 'पंचायत भवन व स्कूल की छतों पर 25 KW के सोलर पैनल्स लगाए गए। स्कूल में रोबोटिक्स व कंप्यूटर लैब और गाँव की गलियों में 250+ सोलर स्ट्रीट लाइट्स लगीं।',
    achievement: 'हरित ऊर्जा से मासिक बिजली बिल शून्य एवं आधुनिक शिक्षा'
  },
  {
    year: '2026',
    era: 'डिजिटल राजस्थान युग',
    title: 'Official Moti Nagar Digital Citizen Portal',
    hindiTitle: 'मोती नगर आधिकारिक डिजिटल सेवा पोर्टल का लोकार्पण',
    tag: 'डिजिटल क्रांति',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
    desc: 'गाँव के हर नागरिक को घर बैठे जन्म, मृत्यु, निवास, पेंशन, कृषि और पट्टा प्रमाण पत्र प्राप्त करने के लिए पूर्णतः पारदर्शी वेब पोर्टल व मोबाइल सेवा का शुभारंभ।',
    achievement: 'राजस्थान का अग्रणी हाई-टेक डिजिटल ग्राम'
  }
]

export default function VillageProfilePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'demographics' | 'places' | 'map' | 'nearby' | 'timeline'>('overview')
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('All')
  const [modalPlace, setModalPlace] = useState<Place | null>(null)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeMapPin, setActiveMapPin] = useState<string>('maha-shop')
  const [mapViewMode, setMapViewMode] = useState<'google-live' | 'cadastral' | 'satellite' | 'hotspots'>('google-live')
  const [copiedMapLink, setCopiedMapLink] = useState(false)
  const [factsheetModalOpen, setFactsheetModalOpen] = useState(false)
  const [demographicsSubTab, setDemographicsSubTab] = useState<'population' | 'land' | 'literacy' | 'facilities'>('population')

  // Filter places
  const filteredPlaces = selectedPlaceCategory === 'All'
    ? PLACES_DATA
    : PLACES_DATA.filter((p) => p.category === selectedPlaceCategory)

  // Selected pin place
  const currentPinPlace = PLACES_DATA.find((p) => p.id === activeMapPin) || PLACES_DATA[0]

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('मोती नगर ग्राम प्रोफाइल लिंक कॉपी हो गया है! इसे व्हाट्सएप या सोशल मीडिया पर साझा करें।')
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* 1. TOP HEADER / NAVBAR */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      {/* 2. BODY LAYOUT: STATIC DESKTOP SIDEBAR + SCROLLABLE MAIN CONTENT */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        {/* Persistent Sticky Sidebar */}
        <PortalSidebar
          activeId="my-village"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-6">
          {/* ================= SECTION 1: HERO PROFILE BANNER ================= */}
          <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[360px] lg:min-h-[400px] shadow-xl border border-slate-800 flex flex-col justify-between p-5 sm:p-8 lg:p-10">
            {/* Background Image with Dynamic Artistic Overlays */}
            <Image
              src="/images/hero.jpg"
              alt="Moti Nagar Bundi Rajasthan Village Panorama"
              fill
              priority
              className="object-cover object-center opacity-65 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />

            {/* Breadcrumb + Status Top Line */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-white/80 font-medium">
                <Link href="/" className="hover:text-white transition flex items-center gap-1">
                  <span>होम</span>
                </Link>
                <span>&gt;</span>
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  <span>🏠 मेरा गाँव (My Village)</span>
                </span>
                <span>&gt;</span>
                <span className="text-white font-bold">मोती नगर प्रोफाइल</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  आदर्श डिजिटल ग्राम पंचायत
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-[11px] font-mono">
                  पिन: 323001
                </span>
              </div>
            </div>

            {/* Hero Main Content */}
            <div className="relative z-10 my-4 lg:my-6 max-w-4xl">
              {/* Crest Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 backdrop-blur-md mb-3">
                <span className="text-base">⚜️</span>
                <span className="text-xs sm:text-sm font-bold text-amber-200 tracking-wide font-hindi">
                  ग्राम पंचायत गुढ़ा · राजस्व ग्राम मोटीनगर · तहसील इन्द्रगढ़ · पंचायत समिति लाखेरी (विधानसभा: 185 – केशोरायपाटन, बूँदी)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-hindi leading-tight drop-shadow-md">
                हमारा गौरवशाली गाँव <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">मोती नगर</span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-200 font-hindi max-w-2xl leading-relaxed drop-shadow-xs">
                हाड़ौती के ऐतिहासिक वैभव, प्राकृतिक हरियाली, समृद्ध कृषि और सामाजिक समरसता की पावन धरा। 300 वर्षों की गौरवमयी विरासत से लेकर आधुनिक डिजिटल स्मार्ट गाँव तक का प्रेरक सफर।
              </p>

              {/* Audio Welcome Player & Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {/* Audio simulation button */}
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-900'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX size={16} />
                      <span>स्वागत धुन बंद करें</span>
                      <span className="flex items-center gap-0.5 ml-1">
                        <span className="w-1 h-3 bg-slate-950 rounded-full animate-bounce" />
                        <span className="w-1 h-4 bg-slate-950 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-2 bg-slate-950 rounded-full animate-bounce [animation-delay:0.3s]" />
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={16} className="text-amber-400" />
                      <span>गाँव का स्वागत संदेश सुनें</span>
                    </>
                  )}
                </button>

                {/* Open Factsheet Modal */}
                <button
                  onClick={() => setFactsheetModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#1976D2] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Download size={15} />
                  <span>विलेज फैक्टशीट (PDF)</span>
                </button>

                {/* Share Link */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 backdrop-blur-md transition-colors"
                >
                  <Share2 size={15} />
                  <span className="hidden sm:inline">शेयर प्रोफाइल</span>
                </button>

                {/* Election 2026 Schedule & Countdown Link */}
                <Link
                  href="/panchayat"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs transition-all shadow-md font-hindi"
                >
                  <span>🗳️ चुनाव 2026 कार्यक्रम व काउंटडाउन</span>
                  <ArrowRight size={13} />
                </Link>

                {/* Live Google Maps */}
                <a
                  href={GOOGLE_MAPS_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold backdrop-blur-md transition-colors shadow-sm"
                >
                  <Navigation size={14} />
                  <span>गूगल मैप नेविगेशन (Live Map)</span>
                  <ExternalLink size={12} className="opacity-75" />
                </a>
              </div>
            </div>

            {/* Bottom Quick Metric Pills Bar */}
            <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">कुल जनसंख्या</div>
                <div className="text-base sm:text-lg font-extrabold text-amber-300">4,850+</div>
                <div className="text-[10px] text-emerald-400 font-medium">920+ परिवार</div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">कुल क्षेत्रफल</div>
                <div className="text-base sm:text-lg font-extrabold text-white">1,420 हे.</div>
                <div className="text-[10px] text-amber-300 font-medium">3,508 एकड़</div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">साक्षरता दर</div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-400">84.6%</div>
                <div className="text-[10px] text-white/80 font-medium">राज्य से +18%</div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">लिंगानुपात</div>
                <div className="text-base sm:text-lg font-extrabold text-rose-300">925 / 1000</div>
                <div className="text-[10px] text-rose-200 font-medium">बाल अनुपात: 940</div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">नल जल कवरेज</div>
                <div className="text-base sm:text-lg font-extrabold text-cyan-300">98%</div>
                <div className="text-[10px] text-cyan-200 font-medium">हर घर जल प्रमाणित</div>
              </div>

              <div className="bg-black/30 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <div className="text-[10px] text-white/70 font-hindi">स्थापना वर्ष</div>
                <div className="text-base sm:text-lg font-extrabold text-amber-200">1784 ई.</div>
                <div className="text-[10px] text-white/80 font-medium">हाड़ा रियासत काल</div>
              </div>
            </div>
          </section>

          {/* ================= STICKY QUICK-JUMP SECTION NAVIGATION TABS ================= */}
          <div className="sticky top-[58px] z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-1.5 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'परिचय', english: 'Overview', icon: Landmark },
              { id: 'history', label: 'इतिहास व गाथा', english: 'History', icon: BookOpen },
              { id: 'demographics', label: 'जनसांख्यिकी व आंकड़े', english: 'Census Stats', icon: UsersRound },
              { id: 'places', label: 'प्रमुख दर्शनीय स्थल', english: 'Key Places', icon: Compass },
              { id: 'map', label: 'इंटरएक्टिव ग्राम नक्शा', english: 'Village Map', icon: MapPin },
              { id: 'nearby', label: 'निकटवर्ती गाँव', english: 'Nearby', icon: Bus },
              { id: 'timeline', label: 'विकास यात्रा', english: 'Timeline', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any)
                    const el = document.getElementById(`section-${tab.id}`)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                  <span className="font-hindi">{tab.label}</span>
                  <span className="text-[10px] opacity-75 font-normal hidden md:inline">({tab.english})</span>
                </button>
              )
            })}
          </div>

          {/* ================= SECTION 2: VILLAGE INTRODUCTION & ESSENCE ================= */}
          <section id="section-overview" className="scroll-mt-28 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left 2 Cols: Inspiring Introduction Narrative */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      🏛️
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-hindi">
                      मोती नगर — एक दृष्टि में
                    </h2>
                  </div>

                  <p className="text-sm text-slate-600 font-hindi leading-relaxed mt-3">
                    राजस्थान के हाड़ौती अंचल में बूँदी जिले की हरी-भरी वादियों और चंबल कछार के निकट स्थित <strong className="text-slate-900">मोती नगर</strong> केवल एक गाँव नहीं, बल्कि परंपरा और आधुनिकता के संगम का सजीव उदाहरण है। उपजाऊ कृषि भूमि, सदियों पुरानी जल संरक्षण बावड़ी और आपसी भाईचारे की मिसाल यह गाँव अपनी आत्मनिर्भरता के लिए जाना जाता है।
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70">
                      <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 font-hindi">
                        <span>🌾</span> प्रमुख आजीविका एवं फसलें
                      </div>
                      <p className="text-xs text-amber-800 font-hindi mt-1 leading-relaxed">
                        उत्कृष्ट बासमती धान, गेहूं, सरसों, लहसुन और सोयाबीन। 90% से अधिक खेती चंबल नहर और नलकूपों से सिंचित।
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/70">
                      <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 font-hindi">
                        <span>🍃</span> पर्यावरण एवं स्वच्छता
                      </div>
                      <p className="text-xs text-emerald-800 font-hindi mt-1 leading-relaxed">
                        100% ओडीएफ प्लस ग्राम। सौर ऊर्जा स्ट्रीट लाइट्स, अमृत सरोवर झील पार्क और सघन वृक्षारोपण अभियान।
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/70">
                      <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 font-hindi">
                        <span>💻</span> ई-गवर्नेंस एवं सेवा केंद्र
                      </div>
                      <p className="text-xs text-blue-800 font-hindi mt-1 leading-relaxed">
                        डिजिटल ग्राम पंचायत, वाई-फाई चौपाल, ऑनलाइन टोकन व्यवस्था और घर-घर प्रमाण पत्र वितरण की पहल।
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/70">
                      <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5 font-hindi">
                        <span>🤝</span> सामाजिक समरसता
                      </div>
                      <p className="text-xs text-purple-800 font-hindi mt-1 leading-relaxed">
                        32 महिला स्वयं सहायता समूह (SHG), सक्रिय युवा खेल मंडल और ऐतिहासिक न्याय चौपाल परंपरा।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Geographic & Administrative Coordinate Bar */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                      <Compass size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-2">
                        <span>भौगोलिक स्थिति (GIS Coordinates)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Google Maps Verified</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono flex items-center gap-2 mt-0.5">
                        <span>25° 47' 54.7" N, 76° 12' 57.9" E (25.7985° N, 76.2161° E)</span>
                        <a
                          href={GOOGLE_MAPS_SHORT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-300 hover:text-amber-200 underline text-xs font-sans inline-flex items-center gap-1"
                        >
                          <span>नक्शा खोलें</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">राजस्व कोड (LGD Code)</div>
                      <div className="text-xs font-mono font-bold text-amber-300">098421 (Bundi)</div>
                    </div>
                    <a
                      href={GOOGLE_MAPS_SHORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 font-hindi"
                    >
                      <Navigation size={12} />
                      <span>मैप देखें</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Col: Sarpanch Message & Village Leadership */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                    <div className="flex items-center gap-2">
                      <Landmark size={18} className="text-amber-800" />
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider font-hindi">
                        सम्बद्ध ग्राम पंचायत: गुढ़ा (मुख्यालय)
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-bold font-hindi">
                      दूरी: 6.5 किमी
                    </span>
                  </div>

                  {/* Election Status Notice */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-amber-100/90 border border-amber-300 font-hindi">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                      <span>🗳️</span>
                      <span>पंचायती राज चुनाव: प्रक्रियाधीन / आगामी</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      वर्तमान में पंचायत चुनाव लंबित होने के कारण कार्यवाहक प्रशासक एवं VDO द्वारा संचालन किया जा रहा है। <strong>चुनाव परिणाम आते ही निर्वाचित सरपंच का विवरण यहाँ तुरंत लाइव अपडेट कर दिया जाएगा।</strong>
                    </p>
                  </div>

                  {/* Administrative Officer Card Placeholder */}
                  <div className="mt-3 flex items-center gap-3 bg-white p-3 rounded-2xl border border-amber-200/70 shadow-2xs">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-dashed border-amber-300 text-amber-600 flex flex-col items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      <span className="text-base leading-none">📷</span>
                      <span className="text-[8px] font-hindi text-slate-500 mt-0.5">तस्वीर शीघ्र</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 font-hindi">कार्यवाहक प्रशासक / सचिवीय दल</div>
                      <div className="text-xs text-amber-800 font-semibold font-hindi">नाम प्रतीक्षित (To Be Decided)</div>
                      <div className="text-[11px] text-slate-500 font-hindi">सम्पर्क: विभागीय सत्यापन उपरांत अपडेट (Coming Soon)</div>
                    </div>
                  </div>

                  {/* Administrative Team List Placeholders */}
                  <div className="mt-3 space-y-1.5 text-xs font-hindi">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-amber-100">
                      <span className="text-slate-700">ग्राम विकास अधिकारी (VDO)</span>
                      <span className="font-semibold text-slate-500">नाम प्रतीक्षित (To Be Decided)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-amber-100">
                      <span className="text-slate-700">हल्का पटवारी (राजस्व)</span>
                      <span className="font-semibold text-slate-500">नाम प्रतीक्षित (To Be Decided)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-amber-100">
                      <span className="text-slate-700">मोती नगर बीएलओ (मतदाता कार्य)</span>
                      <span className="font-semibold text-slate-500">नाम प्रतीक्षित (To Be Decided)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-hindi">
                  <span className="text-[11px]">पंचायत भवन: मुख्य ग्राम गुढ़ा</span>
                  <Link href="/panchayat" className="font-bold hover:underline flex items-center gap-0.5 text-[#1976D2]">
                    पंचायत गुढ़ा सम्पूर्ण विवरण &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 3: HISTORY & HERITAGE (इतिहास एवं गौरवमयी गाथा) ================= */}
          <section id="section-history" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                    <BookOpen size={14} />
                    <span>इतिहास एवं गौरवमयी धरोहर</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    मोती नगर का सदियों पुराना गौरवशाली इतिहास
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    बूंदी रियासत काल से लेकर स्वतंत्रता संग्राम और आधुनिक भारत में गाँव की स्वर्णिम यात्रा
                  </p>
                </div>

                <div className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium">
                  दस्तावेजी शोध: बूँदी गजेटियर एवं पंचायती अभिलेख
                </div>
              </div>

              {/* 4 Thematic History Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                {/* Card 1: Naming & Origin */}
                <article className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 border border-amber-200/80 relative overflow-hidden group hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-lg mb-3">
                    💧
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-hindi">
                    नामकरण की रोचक कथा: "मोती नगर" कैसे पड़ा नाम?
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                    लोकश्रुति और रियासती अभिलेखों के अनुसार, 18वीं शताब्दी के उत्तरार्ध में यहाँ प्राकृतिक मीठे पानी के ऐसे शुद्ध जलस्रोत थे, जिनका जल मोतियों की भांति चमकता था। जब बूंदी के तत्कालीन नरेश राव राजा उम्मेद सिंह शिकार के दौरान इस क्षेत्र से गुजरे, तो इस निर्मल जल से तृप्त होकर उन्होंने इस बस्ती को 'मोती नगर' नाम दिया और यहाँ मोती बावड़ी के निर्माण का शाही फरमान जारी किया।
                  </p>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs font-semibold text-amber-900 font-hindi">
                    <span>✨</span> मुख्य बिंदु: 1784 ई. में शाही फरमान द्वारा मोती बावड़ी का निर्माण
                  </div>
                </article>

                {/* Card 2: Ancient Stepwell & Banyan Tree */}
                <article className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-50/70 to-blue-50/40 border border-cyan-200/80 relative overflow-hidden group hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-800 flex items-center justify-center font-bold text-lg mb-3">
                    🏛️
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-hindi">
                    300 वर्ष पुरानी धरोहरें: मोती बावड़ी और अमर वटवृक्ष
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                    गाँव में स्थित 48 सीढ़ियों वाली 'मोती बावड़ी' हाड़ौती की पाषाण शिल्प कला का बेजोड़ नमूना है। इसके साथ ही पंचायत चौक पर स्थित 200 से अधिक वर्ष पुराना 'अमर वटवृक्ष' सदियों से पंचायती न्याय, लोक संवाद और सांस्कृतिक आयोजनों का साक्षी रहा है। जहाँ आज भी गांव के बुजुर्ग और युवा मिलकर सार्वजनिक निर्णय लेते हैं।
                  </p>
                  <div className="mt-4 pt-3 border-t border-cyan-200/60 flex items-center gap-2 text-xs font-semibold text-cyan-900 font-hindi">
                    <span>🌿</span> मुख्य बिंदु: प्राचीन जल संरक्षण विरासत आज भी जीवित व संरक्षित
                  </div>
                </article>

                {/* Card 3: Freedom Struggle & Valor */}
                <article className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50/70 to-red-50/40 border border-rose-200/80 relative overflow-hidden group hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-800 flex items-center justify-center font-bold text-lg mb-3">
                    🇮🇳
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-hindi">
                    देश सेवा और स्वतंत्रता आंदोलन में योगदान
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                    1942 के भारत छोड़ो आंदोलन और बूंदी प्रजामंडल में मोती नगर के देशभक्त युवाओं ने सक्रिय भूमिका निभाई। आज भी गाँव के 45 से अधिक जांबाज भारतीय सेना, सीमा सुरक्षा बल (BSF) और राजस्थान पुलिस में देश की सीमाओं की रक्षा कर रहे हैं। गाँव में शहीद भगत सिंह खेल संकुल युवाओं की देशभक्ति का जीवंत केंद्र है।
                  </p>
                  <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center gap-2 text-xs font-semibold text-rose-900 font-hindi">
                    <span>🎖️</span> मुख्य बिंदु: वीर प्रसूता भूमि — हर तीसरे परिवार से रक्षा सेवाओं में भागीदारी
                  </div>
                </article>

                {/* Card 4: Modern Transformation */}
                <article className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/80 relative overflow-hidden group hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-800 flex items-center justify-center font-bold text-lg mb-3">
                    🚀
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-hindi">
                    आधुनिक युग: कृषि क्रांति से डिजिटल स्मार्ट विलेज
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                    1978 में चंबल नहर से जुड़ाव के बाद गाँव ने पारंपरिक सूखी खेती से निकलकर उन्नत कृषि में नया मुकाम हासिल किया। 2015 में 100% ओडीएफ, 2021 में हर घर नल और 2026 में सम्पूर्ण डिजिटल ग्राम पंचायत बनकर मोती नगर पूरे राजस्थान में एक रोल-मॉडल बन चुका है।
                  </p>
                  <div className="mt-4 pt-3 border-t border-emerald-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-900 font-hindi">
                    <span>🏆</span> मुख्य बिंदु: राज्य स्तरीय आदर्श ग्राम व ई-गवर्नेंस पुरस्कार विजेता
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* ================= SECTION 4: DEMOGRAPHICS & CENSUS METRICS ================= */}
          <section id="section-demographics" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
                    <UsersRound size={14} />
                    <span>आधिकारिक जनगणना व सांख्यिकी</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    जनसांख्यिकी एवं महत्वपूर्ण आंकड़े (Census & Demographics)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    ग्राम पंचायत मोती नगर का अद्यतन जनगणना सर्वेक्षण (Census Survey Records)
                  </p>
                </div>

                {/* Sub Tab Filter */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  {[
                    { id: 'population', label: 'जनसंख्या व लिंगानुपात' },
                    { id: 'land', label: 'क्षेत्रफल व भूमि' },
                    { id: 'literacy', label: 'साक्षरता व शिक्षा' },
                    { id: 'facilities', label: 'परिवार व सुविधाएं' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setDemographicsSubTab(st.id as any)}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        demographicsSubTab === st.id
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5 Core Metrics Cards: Requested by User */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Population */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-blue-600 mb-2">
                    <span className="text-xs font-bold uppercase font-hindi">कुल जनसंख्या</span>
                    <UsersRound size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4,850+</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 font-hindi">
                    <div className="flex justify-between">
                      <span>पुरुष:</span> <strong className="text-blue-700">2,520 (52%)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>महिला:</span> <strong className="text-rose-600">2,330 (48%)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>बालक-बालिका (0-6):</span> <strong>580</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Households */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-emerald-600 mb-2">
                    <span className="text-xs font-bold uppercase font-hindi">कुल परिवार (Households)</span>
                    <Building2 size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">920</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 font-hindi">
                    <div className="flex justify-between">
                      <span>पक्के मकान:</span> <strong className="text-emerald-700">865 (94%)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>औसत परिवार आकार:</span> <strong>5.2 सदस्य</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>जन आधार नामांकित:</span> <strong className="text-emerald-600">100%</strong>
                    </div>
                  </div>
                </div>

                {/* 3. Total Area */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-white border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-amber-700 mb-2">
                    <span className="text-xs font-bold uppercase font-hindi">कुल क्षेत्रफल (Area)</span>
                    <Trees size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,420 हे.</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 font-hindi">
                    <div className="flex justify-between">
                      <span>एकड़ में:</span> <strong className="text-amber-800">3,508 एकड़</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>वर्ग किलोमीटर:</span> <strong>14.2 sq km</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>सिंचित कृषि भूमि:</span> <strong className="text-emerald-700">1,080 हे.</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Literacy Rate */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-purple-600 mb-2">
                    <span className="text-xs font-bold uppercase font-hindi">साक्षरता दर (Literacy)</span>
                    <GraduationCap size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">84.6%</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 font-hindi">
                    <div className="flex justify-between">
                      <span>पुरुष साक्षरता:</span> <strong className="text-blue-700">91.2%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>महिला साक्षरता:</span> <strong className="text-purple-700">77.8%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>राज्य औसत (66.1%):</span> <strong className="text-emerald-600">+18.5% उच्च</strong>
                    </div>
                  </div>
                </div>

                {/* 5. Gender Ratio */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-rose-50 to-white border border-rose-200/80 shadow-2xs">
                  <div className="flex items-center justify-between text-rose-600 mb-2">
                    <span className="text-xs font-bold uppercase font-hindi">लिंगानुपात (Sex Ratio)</span>
                    <HeartHandshake size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">925</div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 font-hindi">
                    <div className="flex justify-between">
                      <span>प्रति 1000 पुरुष:</span> <strong className="text-rose-700">925 महिलाएं</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>बाल लिंगानुपात (0-6):</span> <strong className="text-rose-600">940 / 1000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>बेटी बचाओ पहल:</span> <strong className="text-emerald-600">सक्रिय</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* SubTab Detailed Breakdowns */}
              {demographicsSubTab === 'population' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 font-hindi flex items-center gap-2">
                    <span>👥</span> आयु वर्ग के आधार पर जनसंख्या वितरण (Age-Group Distribution)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">0 से 14 वर्ष (बच्चे)</div>
                      <div className="text-lg font-bold text-slate-900 mt-1">1,120 (23%)</div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: '23%' }} />
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">15 से 35 वर्ष (युवा शक्ति)</div>
                      <div className="text-lg font-bold text-slate-900 mt-1">1,890 (39%)</div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '39%' }} />
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">36 से 59 वर्ष (कार्यशील)</div>
                      <div className="text-lg font-bold text-slate-900 mt-1">1,340 (28%)</div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">60+ वर्ष (वरिष्ठ नागरिक)</div>
                      <div className="text-lg font-bold text-slate-900 mt-1">500 (10%)</div>
                      <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '10%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {demographicsSubTab === 'land' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 font-hindi flex items-center gap-2">
                    <span>🌾</span> भूमि उपयोग एवं राजस्व रिकॉर्ड (Land Use Distribution - 1,420 Hectares)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">सिंचित कृषि भूमि (नहर/नलकूप)</div>
                      <div className="text-lg font-bold text-emerald-700 mt-1">1,080 हे. (76%)</div>
                      <div className="text-[11px] text-slate-500 mt-1">धान, गेहूं, सरसों व लहसुन</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">आवासीय एवं आबादी क्षेत्र</div>
                      <div className="text-lg font-bold text-blue-700 mt-1">180 हे. (13%)</div>
                      <div className="text-[11px] text-slate-500 mt-1">मकान, गलियां, पंचायत व बाजार</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">गौचर एवं चरागाह भूमि</div>
                      <div className="text-lg font-bold text-amber-700 mt-1">120 हे. (8.5%)</div>
                      <div className="text-[11px] text-slate-500 mt-1">पशुधन हेतु संरक्षित हरित पट्टी</div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">जल निकाय एवं नहर मार्ग</div>
                      <div className="text-lg font-bold text-cyan-700 mt-1">40 हे. (2.5%)</div>
                      <div className="text-[11px] text-slate-500 mt-1">अमृत सरोवर, बावड़ी, माइनर नहर</div>
                    </div>
                  </div>
                </div>
              )}

              {demographicsSubTab === 'literacy' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 font-hindi flex items-center gap-2">
                    <span>📚</span> शैक्षणिक उपलब्धियां एवं साक्षरता की तुलना
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-800">मोती नगर साक्षरता दर</div>
                      <div className="text-3xl font-extrabold text-emerald-600 mt-1">84.6%</div>
                      <p className="text-xs text-slate-500 mt-1">बालिका शिक्षा प्रोत्साहन योजना के चलते शत-प्रतिशत स्कूल नामांकन।</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-800">बूँदी जिला ग्रामीण औसत</div>
                      <div className="text-3xl font-extrabold text-slate-600 mt-1">61.5%</div>
                      <p className="text-xs text-slate-500 mt-1">मोती नगर जिला औसत से 23.1% बेहतर स्थिति में है।</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <div className="text-xs font-bold text-slate-800">उच्च शिक्षा व तकनीकी डिग्री</div>
                      <div className="text-3xl font-extrabold text-blue-600 mt-1">340+</div>
                      <p className="text-xs text-slate-500 mt-1">युवा स्नातक, इंजीनियरिंग, नर्सिंग व बीएड धारक हैं।</p>
                    </div>
                  </div>
                </div>
              )}

              {demographicsSubTab === 'facilities' && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 font-hindi flex items-center gap-2">
                    <span>⚡</span> 920 परिवारों में बुनियादी सुविधाओं की स्थिति
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">विद्युतीकरण</div>
                      <div className="text-lg font-bold text-emerald-600 mt-1">100%</div>
                      <div className="text-[10px] text-slate-400">हर घर मीटर</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">नल से जल</div>
                      <div className="text-lg font-bold text-cyan-600 mt-1">98%</div>
                      <div className="text-[10px] text-slate-400">जल जीवन मिशन</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">शौचालय युक्त</div>
                      <div className="text-lg font-bold text-emerald-600 mt-1">100%</div>
                      <div className="text-[10px] text-slate-400">ओडीएफ प्लस</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">एलपीजी गैस</div>
                      <div className="text-lg font-bold text-amber-600 mt-1">96%</div>
                      <div className="text-[10px] text-slate-400">उज्ज्वला योजना</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">बैंक खाता</div>
                      <div className="text-lg font-bold text-blue-600 mt-1">100%</div>
                      <div className="text-[10px] text-slate-400">जनधन योजना</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-hindi">स्मार्टफोन / नेट</div>
                      <div className="text-lg font-bold text-purple-600 mt-1">88%</div>
                      <div className="text-[10px] text-slate-400">डिजिटल साक्षर</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ================= SECTION 5: IMPORTANT PLACES (प्रमुख दर्शनीय स्थल) ================= */}
          <section id="section-places" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Header + Category Tabs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                    <Compass size={14} />
                    <span>गांव के गौरव केंद्र</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    प्रमुख स्थल एवं दर्शनीय केंद्र (Important Places)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    मोती नगर के ऐतिहासिक, आध्यात्मिक, शैक्षणिक व सामुदायिक केंद्र
                  </p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'All', label: 'सभी स्थल (9)' },
                    { id: 'Commercial', label: 'व्यापार व लैंडमार्क (1)' },
                    { id: 'Spiritual', label: 'धार्मिक (1)' },
                    { id: 'Heritage', label: 'धरोहर व बावड़ी (2)' },
                    { id: 'Governance', label: 'प्रशासनिक (1)' },
                    { id: 'Education', label: 'शिक्षा (1)' },
                    { id: 'Health', label: 'स्वास्थ्य (1)' },
                    { id: 'Sports', label: 'खेल (1)' },
                    { id: 'Agriculture', label: 'कृषि (1)' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedPlaceCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedPlaceCategory === cat.id
                          ? 'bg-[#1976D2] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Places Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredPlaces.map((place) => (
                  <article
                    key={place.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Preview with badge */}
                      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                        <Image
                          src={place.image}
                          alt={place.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${place.badgeColor} backdrop-blur-md`}>
                          {place.categoryHindi}
                        </span>
                        <div className="absolute bottom-2 left-2.5 right-2.5 text-white flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-1 font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                            <MapPin size={11} className="text-amber-400" />
                            {place.distance}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-slate-900 font-hindi leading-snug line-clamp-2">
                          {place.hindi}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {place.title}
                        </p>

                        <p className="mt-2.5 text-xs text-slate-600 font-hindi line-clamp-3 leading-relaxed">
                          {place.desc}
                        </p>

                        <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5 font-hindi">
                          <Clock size={12} className="text-[#1976D2] shrink-0" />
                          <span className="truncate">{place.timing}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-4 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => setModalPlace(place)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1 font-hindi"
                      >
                        <span>विवरण देखें</span>
                        <ChevronRight size={14} />
                      </button>

                      <a
                        href={place.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.coords)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="दिशा देखें"
                        title="गूगल मैप्स पर दिशा देखें"
                        className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition border border-emerald-200 shrink-0"
                      >
                        <Navigation size={14} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 6: INTERACTIVE VILLAGE MAP (इंटरएक्टिव ग्राम मानचित्र) ================= */}
          <section id="section-map" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                    <MapPin size={14} />
                    <span>सत्यापित भू-स्थानिक एवं लाइव गूगल मानचित्र</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    इंटरएक्टिव ग्राम मानचित्र (Moti Nagar Cadastral & Live Maps)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    गाँव के प्रमुख स्थलों, मुख्य बाजार (Maha Shop), वार्डों व उपग्रह क्षेत्र का सजीव दृश्य
                  </p>
                </div>

                {/* View Mode Switcher */}
                <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setMapViewMode('google-live')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      mapViewMode === 'google-live'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                    <span>🔴 सजीव गूगल मैप्स</span>
                  </button>
                  <button
                    onClick={() => setMapViewMode('cadastral')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mapViewMode === 'cadastral'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🗺️ डिजिटल नक्शा
                  </button>
                  <button
                    onClick={() => setMapViewMode('satellite')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mapViewMode === 'satellite'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🛰️ उपग्रह दृश्य
                  </button>
                  <button
                    onClick={() => setMapViewMode('hotspots')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      mapViewMode === 'hotspots'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📍 हॉटस्पॉट पिन
                  </button>
                </div>
              </div>

              {/* Verified Google Maps Top Location Card */}
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-emerald-700/50 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
                      <MapPin size={24} className="text-emerald-400 animate-bounce" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-base sm:text-lg text-white font-hindi">
                          सत्यापित गूगल मैप्स लोकेशन: महा शॉप / मोती नगर
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-bold">
                          GPS Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-hindi mt-0.5">
                        निर्देशांक: <strong className="text-white font-mono">25.798535° N, 76.216093° E</strong> · तहसील इन्द्रगढ़, पंचायत समिति लाखेरी (बूंदी, राजस्थान)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={GOOGLE_MAPS_SHORT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm font-hindi"
                    >
                      <Navigation size={14} />
                      <span>गूगल मैप्स ऐप में खोलें</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={GOOGLE_MAPS_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm font-hindi"
                    >
                      <Navigation size={14} />
                      <span>दिशा / रास्ता प्राप्त करें</span>
                    </a>

                    <button
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(GOOGLE_MAPS_SHORT_URL)
                          setCopiedMapLink(true)
                          setTimeout(() => setCopiedMapLink(false), 2500)
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/20 flex items-center gap-1.5 font-hindi"
                    >
                      {copiedMapLink ? (
                        <>
                          <CheckCircle2 size={14} className="text-emerald-400" />
                          <span className="text-emerald-300">लिंक कॉपी हुआ!</span>
                        </>
                      ) : (
                        <>
                          <Share2 size={14} />
                          <span>लोकेशन लिंक कॉपी करें</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Map Layout: Visual Interactive Map Area + Pin Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Visual SVG Map Canvas OR Live Google Map (2 Columns) */}
                <div className={`lg:col-span-2 relative min-h-[380px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-slate-200 transition-colors ${
                  mapViewMode === 'satellite' ? 'bg-[#0f172a]' : 'bg-[#e2e8f0]'
                }`}>
                  {mapViewMode === 'google-live' ? (
                    <div className="w-full h-full min-h-[440px] sm:min-h-[480px] flex flex-col relative bg-slate-100">
                      <iframe
                        title="Moti Nagar Google Maps Live View"
                        src={GOOGLE_MAPS_EMBED_URL}
                        className="w-full h-full min-h-[420px] sm:min-h-[460px] border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="p-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-hindi text-slate-300">सत्यापित पिन: <strong>Maha Shop, Moti Nagar (25.7985° N, 76.2161° E)</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={GOOGLE_MAPS_DIRECTIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                          >
                            <Navigation size={12} />
                            <span>रास्ता देखें (Directions)</span>
                          </a>
                          <a
                            href={GOOGLE_MAPS_FULL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-300 hover:underline flex items-center gap-1 font-bold"
                          >
                            <span>बड़ी स्क्रीन पर खोलें</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Stylized Vector SVG Map Graphics */}
                      <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
                        {/* Background Field Contours */}
                        <rect width="800" height="500" fill={mapViewMode === 'satellite' ? '#142217' : '#ecfdf5'} />

                        {/* Agricultural Zones (Farmlands) */}
                        <path
                          d="M 50 50 Q 200 40 350 80 T 600 60 L 750 150 L 700 450 L 100 450 Z"
                          fill={mapViewMode === 'satellite' ? '#16351d' : '#dcfce7'}
                          opacity={mapViewMode === 'satellite' ? '0.7' : '0.9'}
                          stroke={mapViewMode === 'satellite' ? '#22543d' : '#bbf7d0'}
                          strokeWidth="2"
                        />

                        {/* Chambal Minor Canal (River Blue Ribbon) */}
                        <path
                          d="M 0 180 C 150 160 300 240 450 200 C 600 160 700 230 800 210"
                          fill="none"
                          stroke={mapViewMode === 'satellite' ? '#38bdf8' : '#0284c7'}
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <text x="680" y="200" fill={mapViewMode === 'satellite' ? '#7dd3fc' : '#0369a1'} fontSize="11" fontWeight="bold">
                          चंबल माइनर नहर 🌊
                        </text>

                        {/* Main Paved Roads (PMGSY & State Link) */}
                        <path
                          d="M 400 0 L 400 500"
                          stroke={mapViewMode === 'satellite' ? '#cbd5e1' : '#f87171'}
                          strokeWidth="7"
                          strokeDasharray={mapViewMode === 'cadastral' ? '12,4' : 'none'}
                        />
                        <path
                          d="M 0 320 Q 300 300 500 350 T 800 310"
                          stroke={mapViewMode === 'satellite' ? '#cbd5e1' : '#fb923c'}
                          strokeWidth="6"
                        />
                        <text x="415" y="40" fill={mapViewMode === 'satellite' ? '#f8fafc' : '#b91c1c'} fontSize="11" fontWeight="bold">
                          गुढ़ा - लाखेरी मुख्य मार्ग 🛣️
                        </text>

                        {/* Abadi (Residential Village Settlement Core) */}
                        <ellipse
                          cx="400"
                          cy="280"
                          rx="160"
                          ry="110"
                          fill={mapViewMode === 'satellite' ? '#334155' : '#fed7aa'}
                          opacity="0.85"
                          stroke={mapViewMode === 'satellite' ? '#64748b' : '#f97316'}
                          strokeWidth="2"
                          strokeDasharray="6,4"
                        />
                        <text x="330" y="300" fill={mapViewMode === 'satellite' ? '#e2e8f0' : '#9a3412'} fontSize="13" fontWeight="bold">
                          मोती नगर आबादी बस्ती 🏡
                        </text>

                        {/* Amrit Sarovar Lake Reservoir */}
                        <circle
                          cx="240"
                          cy="360"
                          r="40"
                          fill={mapViewMode === 'satellite' ? '#0284c7' : '#38bdf8'}
                          stroke="#0369a1"
                          strokeWidth="3"
                        />
                        <text x="180" y="420" fill={mapViewMode === 'satellite' ? '#e0f2fe' : '#075985'} fontSize="10" fontWeight="bold">
                          मोती बावड़ी व सरोवर
                        </text>

                        {/* Interactive Pins */}
                        {[
                          { id: 'maha-shop', x: 400, y: 260, icon: '🏪', label: 'महा शॉप (Google Pin)' },
                          { id: 'temple', x: 430, y: 220, icon: '🛕', label: 'प्राचीन मंदिर' },
                          { id: 'stepwell', x: 240, y: 360, icon: '💧', label: 'मोती बावड़ी' },
                          { id: 'panchayat', x: 380, y: 230, icon: '🏛️', label: 'ग्राम पंचायत' },
                          { id: 'school', x: 480, y: 150, icon: '🏫', label: 'स्मार्ट स्कूल' },
                          { id: 'hospital', x: 340, y: 340, icon: '🏥', label: 'आरोग्य केंद्र' },
                          { id: 'sports', x: 550, y: 380, icon: '⚽', label: 'खेल संकुल' },
                          { id: 'kisan-chaupal', x: 270, y: 220, icon: '🌾', label: 'किसान चौपाल' },
                          { id: 'sacred-banyan', x: 400, y: 215, icon: '🌳', label: 'अमर वटवृक्ष' }
                        ].map((pin) => {
                          const isSelected = activeMapPin === pin.id
                          return (
                            <g
                              key={pin.id}
                              onClick={() => setActiveMapPin(pin.id)}
                              className="cursor-pointer transition-transform hover:scale-125"
                            >
                              {isSelected && (
                                <circle
                                  cx={pin.x}
                                  cy={pin.y}
                                  r="26"
                                  fill="#f59e0b"
                                  opacity="0.35"
                                  className="animate-ping"
                                />
                              )}
                              <circle
                                cx={pin.x}
                                cy={pin.y}
                                r={isSelected ? '18' : '14'}
                                fill={isSelected ? '#1976D2' : '#ffffff'}
                                stroke={isSelected ? '#ffffff' : '#0f172a'}
                                strokeWidth="2.5"
                                className="shadow-md drop-shadow"
                              />
                              <text
                                x={pin.x}
                                y={pin.y + 5}
                                fontSize={isSelected ? '12' : '10'}
                                textAnchor="middle"
                              >
                                {pin.icon}
                              </text>
                              <rect
                                x={pin.x - 38}
                                y={pin.y - 28}
                                width="76"
                                height="16"
                                rx="4"
                                fill="#0f172a"
                                opacity={isSelected ? '0.95' : '0.75'}
                              />
                              <text
                                x={pin.x}
                                y={pin.y - 17}
                                fontSize="8.5"
                                fill="#ffffff"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                {pin.label}
                              </text>
                            </g>
                          )
                        })}
                      </svg>

                      {/* Compass Rose on Map */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-200 text-center shadow-sm">
                        <Compass size={24} className="text-[#1976D2] mx-auto animate-spin [animation-duration:15s]" />
                        <span className="text-[10px] font-bold block text-slate-800">N (उत्तर)</span>
                      </div>

                      {/* Map Legend Bar */}
                      <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md rounded-xl p-2 border border-slate-200 text-[10px] flex flex-wrap items-center justify-around gap-2 text-slate-700 font-hindi">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-emerald-300 border border-emerald-500 inline-block" />
                          कृषि भूमि
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-amber-300 border border-amber-500 inline-block" />
                          आबादी क्षेत्र
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-1.5 bg-blue-500 inline-block" />
                          चंबल माइनर नहर
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-1.5 bg-red-400 inline-block" />
                          डामर मुख्य सड़क
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column: Selected Pin Landmark Inspector */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">चयनित स्थल विवरण</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#1976D2] font-bold font-mono">
                        {currentPinPlace.coords}
                      </span>
                    </div>

                    <div className="mt-4 relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                      <Image
                        src={currentPinPlace.image}
                        alt={currentPinPlace.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-white font-bold text-xs font-hindi">
                        {currentPinPlace.hindi}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="text-xs font-bold text-slate-900 font-hindi">
                        {currentPinPlace.title}
                      </div>
                      <p className="text-xs text-slate-600 font-hindi leading-relaxed">
                        {currentPinPlace.desc}
                      </p>

                      <div className="pt-2 text-xs space-y-1 font-hindi text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#1976D2] shrink-0" />
                          <span>स्थान: {currentPinPlace.distance}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#1976D2] shrink-0" />
                          <span>समय: {currentPinPlace.timing}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2">
                    <button
                      onClick={() => setModalPlace(currentPinPlace)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition font-hindi"
                    >
                      पूर्ण परिचय देखें
                    </button>
                    <a
                      href={currentPinPlace.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentPinPlace.coords)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center shadow-xs"
                      title="Google Maps पर खोलें"
                    >
                      <Navigation size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION: LIVE MANDI BHAV & WEATHER ADVISORY ================= */}
          <section id="section-mandi" className="scroll-mt-28">
            <MandiWeatherWidget />
          </section>

          {/* ================= SECTION 7: NEARBY VILLAGES (निकटवर्ती ग्राम व संपर्क तंत्र) ================= */}
          <section id="section-nearby" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold mb-2">
                    <Bus size={14} />
                    <span>क्षेत्रीय संपर्क व परिवहन तंत्र</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    निकटवर्ती गाँव एवं संपर्क संजाल (Nearby Villages Network)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    मोती नगर से जुड़े सीमावर्ती ग्राम, दूरी, सड़क मार्ग एवं साझा जन-सुविधाएं
                  </p>
                </div>

                <div className="text-xs px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                  🚍 नियमित सार्वजनिक परिवहन उपलब्ध
                </div>
              </div>

              {/* Surrounding Villages Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {NEARBY_VILLAGES.map((v) => (
                  <article
                    key={v.id}
                    className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Name & Distance Tag */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 font-hindi">
                            {v.hindi}
                          </h3>
                          <span className="text-xs text-slate-500 font-medium">{v.name}</span>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs font-mono border border-indigo-200">
                            {v.distanceKm} KM
                          </span>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-hindi">
                            दिशा: {v.directionHindi} ({v.direction})
                          </div>
                        </div>
                      </div>

                      {/* Connectivity Specs */}
                      <div className="mt-4 space-y-2 text-xs font-hindi text-slate-600">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                          <Car size={14} className="text-[#1976D2] shrink-0" />
                          <span><strong>सड़क:</strong> {v.roadType}</span>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                          <Clock size={14} className="text-amber-600 shrink-0" />
                          <span><strong>समय:</strong> {v.travelTime}</span>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-100">
                          <Bus size={14} className="text-emerald-600 shrink-0" />
                          <span><strong>साधन:</strong> {v.transport}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-700 font-hindi bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
                        <strong className="text-indigo-900">विशिष्टता / साझा केंद्र:</strong> {v.specialty}
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/Moti+Nagar,+Bundi,+Rajasthan/${encodeURIComponent(v.name + ', Rajasthan')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 font-hindi"
                    >
                      <Navigation size={13} />
                      <span>मार्ग निर्देश (Get Directions)</span>
                      <ExternalLink size={12} className="opacity-75" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 8: VILLAGE TIMELINE (ऐतिहासिक विकास यात्रा) ================= */}
          <section id="section-timeline" className="scroll-mt-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-900 text-xs font-bold mb-2">
                    <TrendingUp size={14} />
                    <span>ऐतिहासिक विकास यात्रा एवं मील के पत्थर</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
                    मोती नगर कालक्रम (Village Evolution Timeline: 1784 - 2026)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
                    गाँव की स्थापना से लेकर आधुनिक डिजिटल क्रांति तक के ऐतिहासिक मील के पत्थर
                  </p>
                </div>

                <div className="text-xs px-3.5 py-1.5 rounded-xl bg-violet-50 text-violet-800 font-semibold border border-violet-200">
                  240+ वर्षों की गौरवगाथा
                </div>
              </div>

              {/* Vertical Chronological Timeline */}
              <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 via-blue-500 to-emerald-500">
                {TIMELINE_DATA.map((milestone, idx) => (
                  <div key={milestone.year} className="relative group">
                    {/* Glowing Bullet Node */}
                    <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-4 border-[#1976D2] group-hover:scale-110 group-hover:border-amber-500 transition shadow-sm flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </div>

                    {/* Timeline Milestone Card */}
                    <article className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl font-extrabold text-[#1976D2] font-mono">
                            {milestone.year}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${milestone.tagColor} font-hindi`}>
                            {milestone.tag}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-semibold font-hindi">
                          {milestone.era}
                        </span>
                      </div>

                      <h3 className="mt-2 text-base font-bold text-slate-900 font-hindi">
                        {milestone.hindiTitle}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {milestone.title}
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                        {milestone.desc}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-emerald-800 font-hindi font-semibold">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                        <span>उपलब्धि: {milestone.achievement}</span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 9: CULTURAL TRADITIONS & FESTIVALS ================= */}
          <section className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-hindi">
                  लोक संस्कृति एवं उत्सव
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-hindi mt-1">
                  मोती नगर की सांस्कृतिक विरासत व लोक पर्व
                </h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white text-amber-800 font-bold border border-amber-200">
                हाड़ौती की पावन परंपरा
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-2xs">
                <div className="text-2xl mb-2">🏮</div>
                <h3 className="font-bold text-sm text-slate-900 font-hindi">कजली तीज महोत्सव</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  बूँदी जिले का विश्वप्रसिद्ध कजली तीज मेला मोती नगर में पारम्परिक रूप से धूमधाम से मनाया जाता है। सजी-धजी झांकियां व लोक नृत्य आकर्षण का केंद्र होते हैं।
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-2xs">
                <div className="text-2xl mb-2">🌸</div>
                <h3 className="font-bold text-sm text-slate-900 font-hindi">गणगौर एवं फूलडोल मेला</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  चैत्र मास में राधा-कृष्ण मंदिर में वार्षिक फूलडोल उत्सव और गणगौर पूजन पर पूरा गाँव एक सूत्र में बंधकर लोकगीतों की धुन पर आनंदित होता है।
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-200/70 shadow-2xs">
                <div className="text-2xl mb-2">🍲</div>
                <h3 className="font-bold text-sm text-slate-900 font-hindi">पारम्परिक खान-पान व आतिथ्य</h3>
                <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                  दाल-बाटी-चूरमा, बाजरे का सोगरा, लहसुन की चटनी और ताजा मावा पेड़ा। गाँव का अतिथि-सत्कार हाड़ौती की सादगी और प्रेम का प्रतीक है।
                </p>
              </div>
            </div>
          </section>

          {/* ================= SECTION 10: COMMUNITY CONTRIBUTION CTA ================= */}
          <section className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
                <span>🤝</span>
                <span>गाँव की धरोहर में सहयोग करें</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-hindi">
                क्या आपके पास मोती नगर की पुरानी तस्वीरें या ऐतिहासिक तथ्य हैं?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                ग्राम पंचायत डिजिटल आर्काइव में अपने पूर्वजों की ऐतिहासिक यादें, लोककथाएं या गाँव के विकास हेतु सुझाव दर्ज करें।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                href="/grievance"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#1976D2] hover:bg-blue-600 text-white font-bold text-xs text-center transition shadow-sm font-hindi"
              >
                सुझाव व तथ्य भेजें &rarr;
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs text-center border border-white/20 transition font-hindi"
              >
                नागरिक सेवाएं देखें
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* ================= MODAL 1: PLACE DETAILS MODAL ================= */}
      {modalPlace && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-rise max-h-[90vh] flex flex-col">
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 shrink-0">
              <Image
                src={modalPlace.image}
                alt={modalPlace.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                onClick={() => setModalPlace(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${modalPlace.badgeColor} backdrop-blur-md mb-1.5`}>
                  {modalPlace.categoryHindi}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-hindi leading-tight">
                  {modalPlace.hindi}
                </h3>
                <p className="text-xs text-white/80 mt-0.5">{modalPlace.title}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200 font-hindi">
                <div>
                  <span className="text-slate-500 block text-[11px]">दूरी (केंद्र से):</span>
                  <strong className="text-slate-900">{modalPlace.distance}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">समय सारिणी:</span>
                  <strong className="text-slate-900">{modalPlace.timing}</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 font-hindi">
                  विस्तृत विवरण एवं इतिहास:
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-hindi leading-relaxed">
                  {modalPlace.desc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 font-hindi">
                  मुख्य विशेषताएं:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 font-hindi">
                  {modalPlace.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {modalPlace.contactPerson && (
                <div className="text-xs p-3 rounded-xl bg-amber-50 border border-amber-200 font-hindi text-amber-900 flex items-center justify-between">
                  <span>प्रभारी / संपर्क सूत्र: <strong>{modalPlace.contactPerson}</strong></span>
                  <span className="text-[11px] text-amber-700">ग्राम पंचायत अधिकृत</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                {modalPlace.coords}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setModalPlace(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold font-hindi transition"
                >
                  बंद करें
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(modalPlace.coords)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-hindi transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Navigation size={14} />
                  <span>गूगल मैप पर दिशा देखें</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: FACTSHEET DOWNLOAD MODAL ================= */}
      {factsheetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-rise space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-[#1976D2]" />
                <h3 className="font-extrabold text-slate-900 text-base font-hindi">
                  मोती नगर आधिकारिक ग्राम फैक्टशीट 2026
                </h3>
              </div>
              <button onClick={() => setFactsheetModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs font-hindi text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>गाँव का नाम:</span> <strong>मोती नगर (Moti Nagar)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>ग्राम पंचायत:</span> <strong>गुढ़ा (वार्ड संख्या 7 – मोटीनगर)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>तहसील व ब्लॉक:</span> <strong>इन्द्रगढ़ / लाखेरी (विधानसभा: 185-केशोरायपाटन)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>जिला व राज्य:</span> <strong>बूँदी, राजस्थान (मतदाता: 289 | बूथ 7)</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200">
                <span>गूगल मैप्स लोकेशन (GPS):</span>
                <a
                  href={GOOGLE_MAPS_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-mono font-bold hover:underline flex items-center gap-1"
                >
                  <span>25.7985° N, 76.2161° E</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>कुल जनसंख्या:</span> <strong>4,850+</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>कुल परिवार:</span> <strong>920</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>साक्षरता दर:</span> <strong>84.6%</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>कुल क्षेत्रफल:</span> <strong>1,420 हेक्टेयर (3,508 एकड़)</strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  window.print()
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition font-hindi"
              >
                <Printer size={15} />
                <span>प्रिंट / PDF सेव करें</span>
              </button>
              <button
                onClick={() => setFactsheetModalOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition font-hindi"
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
