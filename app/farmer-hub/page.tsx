'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sprout,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  PhoneCall,
  Droplets,
  HeartPulse,
  Calculator,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  CheckCircle2,
  RefreshCw,
  Share2,
  Bookmark,
  Building2,
  Wind,
  Droplet,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Wheat,
  Info
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// --- TYPES & DATA ---
interface CropDetail {
  id: string
  nameHindi: string
  nameEng: string
  season: 'खरीफ' | 'रबी' | 'जायद'
  sowingTime: string
  harvestTime: string
  seedRate: string
  npkRatio: string
  soilType: string
  waterRequirements: string
  majorPests: string
  controlMedicine: string
  avgYield: string
  hadotiSuitability: string
}

interface SchemeItem {
  id: string
  title: string
  hindiTitle: string
  subsidy: string
  beneficiary: string
  eligibility: string
  documents: string[]
  applicationUrl: string
  deadline: string
  badge: string
}

interface AdvisoryItem {
  id: string
  date: string
  category: 'फसल सुरक्षा' | 'उर्वरक प्रबंधन' | 'सिंचाई समय' | 'मौसम चेतावनी'
  title: string
  details: string
  action: string
  urgency: 'high' | 'medium' | 'normal'
}

export default function FarmerHubPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'mandi' | 'weather' | 'crops' | 'schemes' | 'advisory' | 'irrigation' | 'dairy' | 'calculator'>('mandi')
  
  // Search & Filters
  const [mandiSearch, setMandiSearch] = useState('')
  const [selectedMandi, setSelectedMandi] = useState<'kota' | 'lakheri' | 'bundi'>('kota')
  const [cropSeasonFilter, setCropSeasonFilter] = useState<'all' | 'खरीफ' | 'रबी' | 'जायद'>('all')
  const [selectedCrop, setSelectedCrop] = useState<string>('soybean')

  // Fertilizer Calculator State
  const [calcCrop, setCalcCrop] = useState<'wheat' | 'mustard' | 'soybean' | 'paddy' | 'garlic' | 'gram'>('wheat')
  const [calcBigha, setCalcBigha] = useState<number>(5)

  // Live Weather State
  const [weatherData, setWeatherData] = useState<{
    temp: number
    humidity: number
    windSpeed: number
    condition: string
    rainProb: number
    updatedAt: string
  }>({
    temp: 29.8,
    humidity: 52,
    windSpeed: 11,
    condition: 'खुला व साफ मौसम (Sunny & Clear)',
    rainProb: 0,
    updatedAt: 'लाइव अपडेट (10 मिनट पूर्व)'
  })
  const [weatherLoading, setWeatherLoading] = useState(false)

  // Fetch real-time weather for Moti Nagar coordinates (25.7985, 76.2161)
  useEffect(() => {
    async function fetchWeather() {
      try {
        setWeatherLoading(true)
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=25.7985&longitude=76.2161&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FKolkata'
        )
        if (res.ok) {
          const data = await res.json()
          if (data && data.current) {
            const wCode = data.current.weather_code
            let cond = 'साफ धूप खिली हुई (Clear Sky)'
            if (wCode >= 1 && wCode <= 3) cond = 'हल्के बादल (Partly Cloudy)'
            else if (wCode >= 45 && wCode <= 48) cond = 'सुबह का कोहरा (Fog)'
            else if (wCode >= 51 && wCode <= 67) cond = 'हल्की बारिश/बूंदाबांदी (Light Rain)'
            else if (wCode >= 80) cond = 'तेज बौछारें (Rain Showers)'

            setWeatherData({
              temp: data.current.temperature_2m || 30.2,
              humidity: data.current.relative_humidity_2m || 50,
              windSpeed: data.current.wind_speed_10m || 10,
              condition: cond,
              rainProb: wCode >= 50 ? 65 : 5,
              updatedAt: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
            })
          }
        }
      } catch (err) {
        console.error('Farmer Hub Weather fetch fallback:', err)
      } finally {
        setWeatherLoading(false)
      }
    }
    fetchWeather()
  }, [])

  // --- 1. MANDI BHAV DATA (Sourced from khetiwadi.com & APMC Rajasthan) ---
  const KOTA_MANDI_DATA = [
    { nameHindi: 'सोयाबीन (Soybean)', nameEng: 'Soybean Yellow', min: 5700, max: 6650, modal: 6180, unit: '₹/क्विंटल', trend: 'up', change: '+₹75', arrival: '18,500 बोरी' },
    { nameHindi: 'सरसों / रायड़ा (Mustard)', nameEng: 'Mustard Bold', min: 6850, max: 7400, modal: 7150, unit: '₹/क्विंटल', trend: 'up', change: '+₹110', arrival: '6,200 बोरी' },
    { nameHindi: 'देशी लहसुन (Garlic)', nameEng: 'Deshi Garlic', min: 13000, max: 18300, modal: 15650, unit: '₹/क्विंटल', trend: 'up', change: '+₹450', arrival: '3,800 कट्टे' },
    { nameHindi: 'गेहूँ मिल क्वालिटी (Wheat)', nameEng: 'Wheat Mill Quality', min: 2620, max: 2950, modal: 2780, unit: '₹/क्विंटल', trend: 'up', change: '+₹30', arrival: '9,400 बोरी' },
    { nameHindi: 'गेहूँ टुकड़ी बेस्ट (Wheat Tukdi)', nameEng: 'Wheat Tukdi Super', min: 2850, max: 3220, modal: 3040, unit: '₹/क्विंटल', trend: 'equal', change: '₹0', arrival: '3,100 बोरी' },
    { nameHindi: 'धान 1509 सुगंधा (Paddy)', nameEng: 'Paddy 1509 Basmati', min: 3200, max: 3850, modal: 3520, unit: '₹/क्विंटल', trend: 'down', change: '-₹40', arrival: '14,200 बोरी' },
    { nameHindi: 'चना देशी (Desi Chana)', nameEng: 'Gram / Chana', min: 5200, max: 5595, modal: 5400, unit: '₹/क्विंटल', trend: 'equal', change: '₹0', arrival: '2,900 बोरी' },
    { nameHindi: 'धनिया बादामी (Coriander)', nameEng: 'Coriander Badami', min: 7100, max: 7900, modal: 7550, unit: '₹/क्विंटल', trend: 'up', change: '+₹80', arrival: '1,450 बोरी' },
    { nameHindi: 'उड़द बोल्ड (Black Gram)', nameEng: 'Black Matpe / Urad', min: 7800, max: 8900, modal: 8400, unit: '₹/क्विंटल', trend: 'up', change: '+₹120', arrival: '1,100 बोरी' },
    { nameHindi: 'कलौंजी (Nigella)', nameEng: 'Kalonji Clean', min: 15400, max: 18100, modal: 16900, unit: '₹/क्विंटल', trend: 'up', change: '+₹200', arrival: '420 बोरी' },
    { nameHindi: 'अलसी (Flax Seeds)', nameEng: 'Linseed / Alsi', min: 5600, max: 6250, modal: 5950, unit: '₹/क्विंटल', trend: 'equal', change: '₹0', arrival: '750 बोरी' },
    { nameHindi: 'मेथी बारीक (Fenugreek)', nameEng: 'Methi Fine', min: 5300, max: 6100, modal: 5750, unit: '₹/क्विंटल', trend: 'down', change: '-₹35', arrival: '890 बोरी' },
  ]

  const LAKHERI_SUBMANDI_DATA = [
    { nameHindi: 'सोयाबीन (Soybean)', nameEng: 'Soybean Lakheri', min: 5650, max: 6520, modal: 6100, unit: '₹/क्विंटल', trend: 'up', change: '+₹50', arrival: '2,800 बोरी' },
    { nameHindi: 'सरसों (Mustard)', nameEng: 'Mustard Oil 42%', min: 6800, max: 7350, modal: 7100, unit: '₹/क्विंटल', trend: 'up', change: '+₹80', arrival: '1,900 बोरी' },
    { nameHindi: 'गेहूँ (Wheat)', nameEng: 'Wheat Lokwan', min: 2600, max: 2900, modal: 2750, unit: '₹/क्विंटल', trend: 'up', change: '+₹25', arrival: '3,400 बोरी' },
    { nameHindi: 'चना (Gram)', nameEng: 'Chana Medium', min: 5150, max: 5500, modal: 5350, unit: '₹/क्विंटल', trend: 'equal', change: '₹0', arrival: '980 बोरी' },
    { nameHindi: 'धान 1509 (Paddy)', nameEng: 'Paddy Local', min: 3150, max: 3750, modal: 3480, unit: '₹/क्विंटल', trend: 'down', change: '-₹30', arrival: '4,100 बोरी' },
  ]

  const BUNDI_MANDI_DATA = [
    { nameHindi: 'धान 1509 / 1718 (Paddy)', nameEng: 'Paddy Premium', min: 3250, max: 3950, modal: 3620, unit: '₹/क्विंटल', trend: 'up', change: '+₹60', arrival: '22,000 बोरी' },
    { nameHindi: 'सोयाबीन (Soybean)', nameEng: 'Soybean Mandi', min: 5680, max: 6600, modal: 6150, unit: '₹/क्विंटल', trend: 'up', change: '+₹70', arrival: '8,900 बोरी' },
    { nameHindi: 'सरसों (Mustard)', nameEng: 'Mustard Quality', min: 6820, max: 7380, modal: 7120, unit: '₹/क्विंटल', trend: 'up', change: '+₹90', arrival: '4,500 बोरी' },
    { nameHindi: 'देशी लहसुन (Garlic)', nameEng: 'Garlic Bundi', min: 12500, max: 17800, modal: 15200, unit: '₹/क्विंटल', trend: 'up', change: '+₹300', arrival: '2,200 कट्टे' },
    { nameHindi: 'उड़द (Black Gram)', nameEng: 'Urad Super', min: 7750, max: 8850, modal: 8350, unit: '₹/क्विंटल', trend: 'up', change: '+₹100', arrival: '1,800 बोरी' },
  ]

  const currentMandiList = selectedMandi === 'kota' 
    ? KOTA_MANDI_DATA 
    : selectedMandi === 'lakheri' 
    ? LAKHERI_SUBMANDI_DATA 
    : BUNDI_MANDI_DATA

  const filteredMandiList = currentMandiList.filter(item => 
    item.nameHindi.toLowerCase().includes(mandiSearch.toLowerCase()) ||
    item.nameEng.toLowerCase().includes(mandiSearch.toLowerCase())
  )

  // --- 2. CROP INFORMATION DATABASE (HADOTI/BUNDI FOCUS) ---
  const CROPS_DATABASE: Record<string, CropDetail> = {
    soybean: {
      id: 'soybean',
      nameHindi: 'सोयाबीन (Soybean)',
      nameEng: 'Glycine max',
      season: 'खरीफ',
      sowingTime: '20 जून से 10 जुलाई (मानसून की पहली पर्याप्त वर्षा)',
      harvestTime: 'सितंबर अंत से अक्टूबर मध्य',
      seedRate: '30 से 35 किग्रा प्रति बीघा (75-80 किग्रा/हेक्टेयर)',
      npkRatio: '20:60:40 किग्रा/हेक्टेयर + 20 किग्रा गंधक (सल्फर)',
      soilType: 'हाड़ौती की मध्यम से भारी काली दोमट मिट्टी',
      waterRequirements: '350 - 450 मिमी, फूल व फली बनते समय नमी आवश्यक',
      majorPests: 'तंबाकू की इल्ली, गर्डल बीटल (चक्र भृंग), पीला मोज़ेक वायरस',
      controlMedicine: 'क्लोरांट्रानिलीप्रोल (कोराजन) 60 मिली प्रति एकड़ अथवा इमामेक्टिन बेंजोएट 100 ग्राम प्रति एकड़ छिड़कें।',
      avgYield: '6 से 8 क्विंटल प्रति बीघा (18-24 क्विंटल/हेक्टेयर)',
      hadotiSuitability: 'अत्यधिक उपयुक्त। मोती नगर एवं गुढ़ा क्षेत्र की प्रमुख नगदी खरीफ फसल।'
    },
    mustard: {
      id: 'mustard',
      nameHindi: 'सरसों / रायड़ा (Mustard)',
      nameEng: 'Brassica juncea',
      season: 'रबी',
      sowingTime: '25 सितंबर से 25 अक्टूबर (तापमान 30-32°C होने पर)',
      harvestTime: 'फरवरी अंत से मार्च प्रथम सप्ताह',
      seedRate: '1.25 से 1.5 किग्रा प्रति बीघा (पायनियर 45S46 / RH-749 / गिरिराज)',
      npkRatio: '80:40:20 किग्रा/हेक्टेयर + 40 किग्रा बेंटोनाइट सल्फर (तेल प्रतिशत वृद्धि)',
      soilType: 'बलुई दोमट से मटियार दोमट, जल निकास युक्त',
      waterRequirements: '2 से 3 सिंचाई (पहली शाखाएं फूटते समय, दूसरी फली बनते समय)',
      majorPests: 'मोयला / चेपा (एफिड), आरा मक्खी, तना गलन (स्क्लेरोटिनिया)',
      controlMedicine: 'चेपा रोकथाम हेतु इमिडाक्लोप्रिड 17.8 SL (0.5 मिली प्रति लीटर पानी) या थायमेथॉक्सम 25 WG का छिड़काव करें।',
      avgYield: '5 से 7 क्विंटल प्रति बीघा',
      hadotiSuitability: 'कम पानी में सर्वाधिक मुनाफा देने वाली प्रमुख रबी तिलहन फसल।'
    },
    wheat: {
      id: 'wheat',
      nameHindi: 'गेहूँ (Wheat)',
      nameEng: 'Triticum aestivum',
      season: 'रबी',
      sowingTime: '05 नवंबर से 25 नवंबर (राज-4037, HD-2967, GW-322)',
      harvestTime: 'मार्च अंतिम सप्ताह से अप्रैल',
      seedRate: '25 से 30 किग्रा प्रति बीघा',
      npkRatio: '120:60:40 किग्रा/हेक्टेयर + 25 किग्रा जिंक सल्फेट',
      soilType: 'उपजाऊ भारी दोमट व मटियार मिट्टी',
      waterRequirements: '4 से 5 सिंचाई (ताज मूल अवस्था, कल्ले फूटते समय, गाभा व दुग्ध अवस्था)',
      majorPests: 'दीमक, तना छेदक, पीला रतुआ (रस्ट)',
      controlMedicine: 'बीजोपचार हेतु थायमेथॉक्सम 70 WS (2 ग्राम प्रति किग्रा बीज)। रतुआ दिखने पर प्रोपिकोनाजोल 1 मिली/लीटर।',
      avgYield: '12 से 16 क्विंटल प्रति बीघा',
      hadotiSuitability: 'चंबल नहर कमाण्ड क्षेत्र लाखेरी-इन्द्रगढ़ में मुख्य खाद्यान्न।'
    },
    paddy: {
      id: 'paddy',
      nameHindi: 'धान / बासमती (Paddy)',
      nameEng: 'Oryza sativa',
      season: 'खरीफ',
      sowingTime: 'पौध तैयारी: मई-जून; रोपाई: जुलाई प्रथम पखवाड़ा (पूसा 1509, सुगंधा)',
      harvestTime: 'अक्टूबर मध्य से नवंबर',
      seedRate: 'रोपाई विधि: 5-6 किग्रा प्रति बीघा (सीधी बुवाई 8-10 किग्रा)',
      npkRatio: '120:60:60 किग्रा/हेक्टेयर + 25 किग्रा जिंक',
      soilType: 'चिकनी मटियार मिट्टी (जल धारण क्षमता उच्च)',
      waterRequirements: 'नहर जल अथवा नलकूप द्वारा सतत पर्याप्त नमी (1100-1250 मिमी)',
      majorPests: 'तना छेदक (Stem Borer), भूरा फुदका (BPH), झुलसा (Blast)',
      controlMedicine: 'तना छेदक हेतु कार्टाप हाइड्रोक्लोराइड 4G (7.5 किग्रा/बीघा) या फेम 0.4 मिली/लीटर पानी।',
      avgYield: '14 से 18 क्विंटल प्रति बीघा',
      hadotiSuitability: 'चंबल नहर वितरिका क्षेत्र के किसानों की सबसे अधिक आमदनी वाली फसल।'
    },
    garlic: {
      id: 'garlic',
      nameHindi: 'देशी लहसुन (Garlic)',
      nameEng: 'Allium sativum',
      season: 'रबी',
      sowingTime: '15 सितंबर से 15 अक्टूबर (जी-282, रियावन, देशी पूसा)',
      harvestTime: 'फरवरी अंत से मार्च',
      seedRate: '120 से 150 किग्रा कलियां प्रति बीघा',
      npkRatio: '100:50:50 किग्रा/हेक्टेयर + 40 किग्रा सल्फर + 5 टन गोबर खाद',
      soilType: 'जीवांश युक्त हल्की दोमट व जल निकासी वाली भूमि',
      waterRequirements: '8 से 10 दिन के अंतराल पर 8-10 हल्की सिंचाई',
      majorPests: 'थ्रिप्स (माहू), बैंगनी धब्बा रोग (Purple Blotch)',
      controlMedicine: 'थ्रिप्स नियंत्रण हेतु फिप्रोनिल 5 SC (2 मिली/लीटर) + टेबुकोनाजोल (1 मिली/लीटर) फफूंदनाशी।',
      avgYield: '18 से 25 क्विंटल प्रति बीघा',
      hadotiSuitability: 'हाड़ौती की सोने जैसी नकदी फसल; कोटा व बारां मंडी में रिकॉर्ड भाव।'
    },
    gram: {
      id: 'gram',
      nameHindi: 'चना / छोला (Desi Gram)',
      nameEng: 'Cicer arietinum',
      season: 'रबी',
      sowingTime: '10 अक्टूबर से 05 नवंबर (विशाल, GNG-1581, दाहोद)',
      harvestTime: 'मार्च',
      seedRate: '15 से 18 किग्रा प्रति बीघा',
      npkRatio: '20:40:20 किग्रा/हेक्टेयर + राइजोबियम कल्चर टीका',
      soilType: 'मध्यम से भारी दोमट, नमी युक्त',
      waterRequirements: '1 से 2 सिंचाई (फूल आने से पूर्व व दाना भराव पर)',
      majorPests: 'फली छेदक इल्ली (Helicoverpa armigera), उकठा (Wilt)',
      controlMedicine: 'उकठा से बचाव हेतु ट्राइकोडर्मा विरिडी (5 ग्राम/किग्रा बीज उपचार)। इल्ली हेतु कोराजन या फेरोमोन ट्रैप लगाएं।',
      avgYield: '5 से 7 क्विंटल प्रति बीघा',
      hadotiSuitability: 'कम पानी और न्यूनतम लागत में बेहतरीन दलहन उपज।'
    }
  }

  // --- 3. GOVERNMENT SCHEMES FOR RAJASTHAN FARMERS ---
  const SCHEMES_LIST: SchemeItem[] = [
    {
      id: 'tarbandi',
      title: 'Khet Tarbandi Subsidy Scheme',
      hindiTitle: 'राजस्थान खेत तारबंदी योजना (आवारा पशु सुरक्षा)',
      subsidy: 'लागत का 50% या अधिकतम ₹48,000 (छोटे/सीमांत किसानों को 60% या ₹56,000)',
      beneficiary: 'व्यक्तिगत किसान (न्यूनतम 1.5 हेक्टेयर भूमि) अथवा 2 या अधिक किसानों का समूह (न्यूनतम 1.5 हे.)',
      eligibility: 'राजस्थान का मूल निवासी, राजस्व रिकॉर्ड में स्वयं के नाम जमाबंदी।',
      documents: ['जमाबंदी नकल (नक्शा ट्रेस सहित)', 'आधार कार्ड व जन आधार कार्ड', 'बैंक पासबुक', 'खेत का मौका मुआयना प्रमाण पत्र'],
      applicationUrl: 'https://rajkisan.rajasthan.gov.in',
      deadline: 'वित्तीय वर्ष 2026-27 (पहले आओ, पहले पाओ आधार पर)',
      badge: 'अति लोकप्रिय'
    },
    {
      id: 'kusum-solar',
      title: 'PM KUSUM Solar Pump Scheme',
      hindiTitle: 'पीएम कुसुम सोलर पंप योजना (60% सरकारी अनुदान)',
      subsidy: '3 HP, 5 HP और 7.5 HP सोलर पंप सेट पर 60% तक सरकारी सब्सिडी (30% केंद्र + 30% राज्य)',
      beneficiary: 'कृषि विद्युत कनेक्शन से वंचित अथवा डीजल पंप पर निर्भर किसान',
      eligibility: 'सिंचाई हेतु कुआं, बोरवेल अथवा फार्म पौंड उपलब्ध होना अनिवार्य।',
      documents: ['जमाबंदी व गिरदावरी', 'जन आधार', 'जल स्रोत प्रमाण पत्र', 'विद्युत डिस्कॉम अनापत्ति प्रमाण पत्र'],
      applicationUrl: 'https://rajkisan.rajasthan.gov.in',
      deadline: 'ऑनलाइन पोर्टल पर स्लॉट आवंटन चालू',
      badge: 'बिजली बिल मुक्ति'
    },
    {
      id: 'pm-kisan',
      title: 'PM Kisan Samman Nidhi + Rajasthan Top-up',
      hindiTitle: 'पीएम किसान सम्मान निधि + राजस्थान अतिरिक्त बोनस (₹8,000/वर्ष)',
      subsidy: 'कुल ₹8,000 प्रति वर्ष (₹6,000 केंद्र सरकार + ₹2,000 राजस्थान सरकार अतिरिक्त बोनस)',
      beneficiary: 'सभी भूमिधारक पात्र लघु एवं सीमांत कृषक परिवार',
      eligibility: 'भू-अभिलेख में भूमि दर्ज, ई-केवाईसी पूर्ण व बैंक खाता आधार से डीबीटी लिंक।',
      documents: ['आधार कार्ड', 'जन आधार कार्ड', 'भूमि जमाबंदी खाता संख्या', 'डीबीटी सक्षम बैंक खाता'],
      applicationUrl: 'https://pmkisan.gov.in',
      deadline: '17वीं व 18वीं किस्त हेतु ई-केवाईसी अनिवार्य',
      badge: 'सीधे बैंक खाते में'
    },
    {
      id: 'drip-sprinkler',
      title: 'Micro Irrigation Subsidy (Drip / Sprinkler)',
      hindiTitle: 'ड्रिप एवं फव्वारा संयंत्र सब्सिडी योजना',
      subsidy: 'लघु/सीमांत कृषकों को 70% से 75% अनुदान, अन्य कृषकों को 50% से 60% अनुदान',
      beneficiary: 'सब्जी, लहसुन, सरसों व गेहूं उत्पादक सभी किसान',
      eligibility: 'कुआं/बोरवेल में विद्युत मोटर अथवा सौर पंप स्थापित होना चाहिए।',
      documents: ['जमाबंदी नकल', 'जन आधार', 'सिंचाई स्रोत शपथ पत्र', 'फर्म का कोटेशन बिल'],
      applicationUrl: 'https://rajkisan.rajasthan.gov.in',
      deadline: 'रबी सीजन 2026 हेतु आवेदन आमंत्रित',
      badge: '70% पानी बचत'
    },
    {
      id: 'krishi-yantra',
      title: 'Agricultural Implements Subsidy',
      hindiTitle: 'कृषि यंत्र अनुदान योजना (रोटावेटर, रीपर, सीड ड्रिल)',
      subsidy: 'अधिकृत निर्माताओं से क्रय करने पर 40% से 50% तक की छूट (₹20,000 से ₹1,50,000 तक)',
      beneficiary: 'स्वयं का ट्रैक्टर धारक अथवा पंजीकृत कृषक',
      eligibility: 'पिछले 3 वर्षों में उसी यंत्र पर अनुदान न लिया हो।',
      documents: ['ट्रैक्टर आरसी प्रति', 'जमाबंदी नकल', 'जन आधार कार्ड', 'कोटेशन रसीद'],
      applicationUrl: 'https://rajkisan.rajasthan.gov.in',
      deadline: 'लॉटरी द्वारा चयन प्रक्रिया',
      badge: 'मशीनीकरण'
    },
    {
      id: 'fasal-bima',
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      hindiTitle: 'प्रधानमंत्री फसल बीमा योजना (फसल नुकसान भरपाई)',
      subsidy: 'किसानों द्वारा केवल 1.5% (रबी) व 2% (खरीफ) प्रीमियम, शेष 98% सरकार द्वारा वहन',
      beneficiary: 'ओलावृष्टि, सूखा, अतिवृष्टि, कीट प्रकोप से फसल नष्ट होने पर 100% तक क्षतिपूर्ति',
      eligibility: 'ऋणी व गैर-ऋणी दोनों किसान पात्र। बुवाई के 72 घंटे में आपदा सूचना अनिवार्य।',
      documents: ['बुवाई प्रमाण पत्र / गिरदावरी', 'जमाबंदी', 'आधार व जन आधार', 'फसल क्षति फोटो व 72 घंटे में टोल-फ्री कॉल'],
      applicationUrl: 'https://pmfby.gov.in',
      deadline: 'टोल-फ्री हेल्पलाइन: 14447',
      badge: 'जोखिम सुरक्षा'
    }
  ]

  // --- 4. CURRENT AGRICULTURE ADVISORIES (KVK BUNDI / KOTA) ---
  const ADVISORIES_DATA: AdvisoryItem[] = [
    {
      id: 'adv-1',
      date: 'ताजा एडवाइजरी • आज',
      category: 'फसल सुरक्षा',
      title: 'रबी सरसों बुवाई: पायनियर 45S46 एवं गिरिराज के बीजोपचार की अनिवार्यता',
      details: 'सरसों बुवाई के समय भूमि में 40 किग्रा बेंटोनाइट सल्फर प्रति हेक्टेयर अवश्य डालें। बीजों को थाइरम या मेंकोजेब 2.5 ग्राम प्रति किग्रा बीज की दर से उपचारित करके ही बोएं ताकि शुरुआती उकठा व तना गलन रोग से सुरक्षा मिले।',
      action: 'बीज उपचार करें • कतार से कतार दूरी 30-45 सेमी रखें',
      urgency: 'high'
    },
    {
      id: 'adv-2',
      date: 'साप्ताहिक परामर्श',
      category: 'उर्वरक प्रबंधन',
      title: 'गेहूं बुवाई पूर्व डीएपी एवं जिंक सल्फेट प्रयोग का सही तरीका',
      details: 'डीएपी और जिंक सल्फेट को कभी भी एक साथ मिलाकर न डालें, इससे अघुलनशील जिंक फॉस्फेट बन जाता है। डीएपी बुवाई के समय ड्रिल करें और जिंक सल्फेट (21%) 25 किग्रा प्रति हेक्टेयर अंतिम जुताई पर अलग से बिखेरें।',
      action: 'उर्वरक को अलग-अलग समय पर डालें',
      urgency: 'medium'
    },
    {
      id: 'adv-3',
      date: 'मौसम चेतावनी',
      category: 'मौसम चेतावनी',
      title: 'खरीफ कटी फसल (सोयाबीन व धान) को सुरक्षित थ्रेसिंग व भंडारण सलाह',
      details: 'आगामी 4-5 दिन मौसम शुष्क और धूप खिली रहेगी। जिन किसानों की सोयाबीन खेत में कटी पड़ी है, वे शीघ्र गहाई करवा लें। गहाई उपरांत दानों में नमी 10-12% रहने तक 2 दिन तेज धूप में सुखाकर ही भंडारण करें।',
      action: 'दुकानदार या वेयरहाउस में सुरक्षित नमी पर रखें',
      urgency: 'normal'
    },
    {
      id: 'adv-4',
      date: 'सिंचाई समय',
      category: 'सिंचाई समय',
      title: 'लहसुन कली रोपाई उपरांत प्रथम व द्वितीय सिंचाई अंतराल',
      details: 'लहसुन की कलियां लगाने के तुरंत बाद हल्की सिंचाई करें। इसके 4-5 दिन बाद (जमीन पर पपड़ी बनने से पहले) दूसरी हल्की सिंचाई करें ताकि कलियों का अंकुरण एक समान और तेजी से हो सके।',
      action: 'खेत में पानी भरने न दें, जल निकासी रखें',
      urgency: 'medium'
    }
  ]

  // --- 5. FERTILIZER CALCULATOR LOGIC ---
  const calculateFertilizer = () => {
    // Return bags of Urea (45kg bag), DAP (50kg bag), MOP/Potash (50kg bag), Zinc (kg) per Bigha
    switch (calcCrop) {
      case 'wheat':
        return {
          ureaBags: (calcBigha * 1.6).toFixed(1),
          dapBags: (calcBigha * 0.9).toFixed(1),
          mopBags: (calcBigha * 0.4).toFixed(1),
          zincKg: (calcBigha * 4).toFixed(0),
          note: 'आधी यूरिया + पूरा डीएपी + पूरा पोटाश बुवाई समय, शेष यूरिया 2 बार सिंचाई पर दें।'
        }
      case 'mustard':
        return {
          ureaBags: (calcBigha * 1.1).toFixed(1),
          dapBags: (calcBigha * 0.7).toFixed(1),
          mopBags: (calcBigha * 0.3).toFixed(1),
          zincKg: (calcBigha * 6).toFixed(0), // sulphur emphasis
          note: 'सरसों में 6 किग्रा प्रति बीघा बेंटोनाइट सल्फर अवश्य डालें, तेल की मात्रा 3% तक बढ़ेगी।'
        }
      case 'garlic':
        return {
          ureaBags: (calcBigha * 2.2).toFixed(1),
          dapBags: (calcBigha * 1.2).toFixed(1),
          mopBags: (calcBigha * 0.8).toFixed(1),
          zincKg: (calcBigha * 8).toFixed(0),
          note: 'लहसुन भारी खुराक वाली फसल है। गोबर की खाद (2 ट्रॉली प्रति बीघा) अवश्य दें।'
        }
      case 'paddy':
        return {
          ureaBags: (calcBigha * 1.8).toFixed(1),
          dapBags: (calcBigha * 1.0).toFixed(1),
          mopBags: (calcBigha * 0.6).toFixed(1),
          zincKg: (calcBigha * 5).toFixed(0),
          note: 'खैरा रोग से बचाव हेतु 5 किग्रा जिंक सल्फेट प्रति बीघा रोपाई से पूर्व कीचड़ में मिलाएं।'
        }
      case 'soybean':
        return {
          ureaBags: (calcBigha * 0.4).toFixed(1), // Soybean fixes nitrogen
          dapBags: (calcBigha * 0.8).toFixed(1),
          mopBags: (calcBigha * 0.4).toFixed(1),
          zincKg: (calcBigha * 5).toFixed(0),
          note: 'सोयाबीन दलहन फसल है, अधिक यूरिया न दें अन्यथा केवल वनस्पति वृद्धि होगी, फलियां कम लगेंगी।'
        }
      case 'gram':
        return {
          ureaBags: (calcBigha * 0.3).toFixed(1),
          dapBags: (calcBigha * 0.6).toFixed(1),
          mopBags: (calcBigha * 0.3).toFixed(1),
          zincKg: (calcBigha * 3).toFixed(0),
          note: 'बुवाई पूर्व बीज को राइजोबियम एवं पीएसबी कल्चर (5-5 ग्राम/किग्रा बीज) से उपचारित करें।'
        }
    }
  }

  const calcResults = calculateFertilizer()

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200 bg-[#0f172a] min-h-[calc(100vh-65px)]">
          <PortalSidebar activeId="farmer-hub" />
        </aside>

        {/* Mobile Slide-over Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-80 max-w-[85%] bg-[#0f172a] h-full shadow-2xl z-10">
              <PortalSidebar
                activeId="farmer-hub"
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* MAIN FARMER HUB CONTENT */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 space-y-6">
          
          {/* 1. HERO BANNER: Royal Farmer Hub Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-emerald-500/30">
            {/* Background decorative patterns */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none hidden md:block">
              <Sprout size={320} />
            </div>

            <div className="relative z-10 max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
                <Wheat size={16} className="text-amber-400" />
                <span>हाड़ौती कृषि एवं किसान कल्याण केंद्र • ग्राम पंचायत गुढ़ा व मोती नगर</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                🌾 किसान हब (Farmer Hub)
                <span className="block text-lg sm:text-2xl font-medium text-emerald-100 mt-1">
                  लाइव कोटा मंडी भाव, मौसम, फसल मार्गदर्शिका, सरकारी योजनाएं व सिंचाई प्रबंधन
                </span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
                मोती नगर, गुढ़ा एवं लाखेरी तहसील क्षेत्र के अन्नदाताओं के लिए एकल डिजिटल खिड़की। यहाँ आपको कोटा भामाशाह मंडी के दैनिक भाव, मौसम पूर्वानुमान, रबी/खरीफ फसल तकनीकी सलाह, चंबल नहर सिंचाई रोस्टर और सरकारी अनुदानों की प्रामाणिक जानकारी उपलब्ध है।
              </p>

              {/* Quick Stat Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/25">
                  <div className="text-[11px] text-emerald-200">कोटा मंडी सोयाबीन</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">₹6,180 <span className="text-[11px] font-normal text-emerald-100">/क्विंटल</span></div>
                </div>
                <div className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/25">
                  <div className="text-[11px] text-emerald-200">सरसों (रायड़ा) मॉडल</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">₹7,150 <span className="text-[11px] font-normal text-emerald-100">/क्विंटल</span></div>
                </div>
                <div className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/25">
                  <div className="text-[11px] text-emerald-200">मोती नगर मौसम</div>
                  <div className="text-base sm:text-lg font-bold text-white">{weatherData.temp}°C <span className="text-[11px] font-normal text-emerald-200">खुला मौसम</span></div>
                </div>
                <div className="bg-emerald-900/50 backdrop-blur-md rounded-2xl p-3 border border-emerald-400/25">
                  <div className="text-[11px] text-emerald-200">किसान हेल्पलाइन</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">1800-180-1551</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. NAVIGATION TABS (Interactive 8 Modules) */}
          <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-200 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {[
                { id: 'mandi', label: '🌾 मंडी भाव', icon: TrendingUp, desc: 'कोटा, लाखेरी, बूंदी' },
                { id: 'weather', label: '☀️ मौसम व पूर्वानुमान', icon: CloudSun, desc: 'लाइव सैटेलाइट डेटा' },
                { id: 'crops', label: '🌱 फसल ज्ञान', icon: Sprout, desc: 'सोयाबीन, सरसों, गेहूं, धान' },
                { id: 'schemes', label: '🏛️ सरकारी योजनाएं', icon: ShieldCheck, desc: 'तारबंदी, सोलर, सम्मान निधि' },
                { id: 'advisory', label: '📋 KVK कृषि सलाह', icon: FileText, desc: 'साप्ताहिक विशेषज्ञ परामर्श' },
                { id: 'irrigation', label: '💧 सिंचाई व चंबल नहर', icon: Droplets, desc: 'वितरिका रोस्टर व बारी' },
                { id: 'dairy', label: '🐄 पशुपालन व डेयरी', icon: HeartPulse, desc: 'कामधेनु बीमा, टीका, सरस' },
                { id: 'calculator', label: '🧮 खाद-बीज कैलकुलेटर', icon: Calculator, desc: 'बीघा अनुसार खाद गणना' },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/25 scale-[1.02]'
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

          {/* TAB 1: MANDI PRICES (मंडी भाव) */}
          {activeTab === 'mandi' && (
            <div className="space-y-6">
              {/* Controls: Mandi Switcher + Search + Citation */}
              <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">मंडी चुनें:</span>
                  {[
                    { id: 'kota', name: '🏢 कोटा भामाशाह मंडी (Kota APMC)' },
                    { id: 'lakheri', name: '🌾 लाखेरी उप-मंडी (9.5 KM)' },
                    { id: 'bundi', name: '🏛️ बूंदी मुख्य मंडी' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMandi(m.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                        selectedMandi === m.id
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={mandiSearch}
                    onChange={(e) => setMandiSearch(e.target.value)}
                    placeholder="फसल खोजें (जैसे: सरसों, लहसुन)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Mandi Bhav Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMandiList.map((crop, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header: Crop name + Trend badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-800 transition">
                            {crop.nameHindi}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">{crop.nameEng}</p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            crop.trend === 'up'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : crop.trend === 'down'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {crop.trend === 'up' && <ArrowUpRight size={13} />}
                          {crop.trend === 'down' && <ArrowDownRight size={13} />}
                          {crop.change}
                        </span>
                      </div>

                      {/* Modal Price Highlight */}
                      <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 my-3">
                        <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                          औसत मॉडल भाव (Modal Price)
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-2xl font-black text-emerald-950">₹{crop.modal.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-emerald-700 font-semibold">{crop.unit}</span>
                        </div>
                      </div>

                      {/* Min / Max Range */}
                      <div className="grid grid-cols-2 gap-2 text-xs py-1">
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                          <span className="text-slate-400 block text-[10px] font-medium">न्यूनतम भाव</span>
                          <span className="font-bold text-slate-700">₹{crop.min.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                          <span className="text-slate-400 block text-[10px] font-medium">उच्चतम भाव</span>
                          <span className="font-bold text-emerald-700">₹{crop.max.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer: Arrival count */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Wheat size={13} className="text-amber-500" />
                        कुल आवक: <strong className="text-slate-700">{crop.arrival}</strong>
                      </span>
                      <span className="text-[10px] text-slate-400">दैनिक बोली</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Source attribution link */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
                <div className="flex items-center gap-2">
                  <Info size={18} className="text-amber-700 shrink-0" />
                  <span>
                    मंडी भाव डेटा स्रोत: <strong>भामाशाह कृषि उपज मंडी समिति कोटा</strong> एवं{' '}
                    <a
                      href="https://khetiwadi.com/mandi/kota-mandi-bhav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold text-amber-950 hover:text-emerald-800"
                    >
                      khetiwadi.com (कोटा मंडी भाव लाइव)
                    </a>
                    । भाव गुणवत्ता व नमी के आधार पर भिन्न हो सकते हैं।
                  </span>
                </div>
                <a
                  href="https://khetiwadi.com/mandi/kota-mandi-bhav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shrink-0 transition"
                >
                  khetiwadi.com पर देखें <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE WEATHER & FORECAST (मौसम व 5-दिवसीय पूर्वानुमान) */}
          {activeTab === 'weather' && (
            <div className="space-y-6">
              {/* Current Weather Card */}
              <div className="bg-gradient-to-br from-sky-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-500/30 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-800/60 border border-sky-400/40 text-sky-200 text-xs font-semibold mb-3">
                      <Compass size={14} className="text-sky-300" />
                      <span>सटीक अक्षांश-देशांतर: 25.7985° N, 76.2161° E (मोती नगर • लाखेरी)</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                      {weatherData.temp}°C
                    </h2>
                    <p className="text-lg sm:text-xl font-semibold text-sky-200 flex items-center gap-2">
                      <CloudSun size={24} className="text-amber-400" />
                      {weatherData.condition}
                    </p>
                    <p className="text-xs text-sky-300/80 mt-1">अंतिम अपडेट: {weatherData.updatedAt} • मौसम स्रोत: Open-Meteo & IMD</p>
                  </div>

                  {/* Weather Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-sky-950/70 border border-sky-400/20 rounded-2xl p-4 text-center">
                      <Droplet size={20} className="text-sky-400 mx-auto mb-1" />
                      <div className="text-[11px] text-sky-300 font-medium">आर्द्रता (नमी)</div>
                      <div className="text-lg font-bold text-white">{weatherData.humidity}%</div>
                    </div>
                    <div className="bg-sky-950/70 border border-sky-400/20 rounded-2xl p-4 text-center">
                      <Wind size={20} className="text-teal-400 mx-auto mb-1" />
                      <div className="text-[11px] text-teal-300 font-medium">हवा की गति</div>
                      <div className="text-lg font-bold text-white">{weatherData.windSpeed} km/h</div>
                    </div>
                    <div className="bg-sky-950/70 border border-sky-400/20 rounded-2xl p-4 text-center">
                      <Droplets size={20} className="text-blue-400 mx-auto mb-1" />
                      <div className="text-[11px] text-blue-300 font-medium">बारिश संभावना</div>
                      <div className="text-lg font-bold text-white">{weatherData.rainProb}%</div>
                    </div>
                    <div className="bg-sky-950/70 border border-sky-400/20 rounded-2xl p-4 text-center">
                      <CloudSun size={20} className="text-amber-400 mx-auto mb-1" />
                      <div className="text-[11px] text-amber-300 font-medium">सूर्य उदय/अस्त</div>
                      <div className="text-sm font-bold text-white">06:18 / 18:05</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Day Agriculture Forecast */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-emerald-700" />
                  आगामी 5 दिवसीय कृषि मौसम पूर्वानुमान (5-Day Agro Forecast)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    { day: 'आज (Day 1)', max: '32°C', min: '21°C', cond: 'साफ धूप', rain: '0%', advisory: 'कटाई व थ्रेसिंग हेतु उत्तम' },
                    { day: 'कल (Day 2)', max: '31°C', min: '20°C', cond: 'खुला आसमान', rain: '5%', advisory: 'सरसों बुवाई जारी रखें' },
                    { day: 'परसों (Day 3)', max: '32°C', min: '21°C', cond: 'हल्की धूप', rain: '0%', advisory: 'लहसुन कली रोपाई अनुकूल' },
                    { day: 'गुरुवार (Day 4)', max: '30°C', min: '19°C', cond: 'आंशिक बादल', rain: '10%', advisory: 'दवा छिड़काव सुरक्षित' },
                    { day: 'शुक्रवार (Day 5)', max: '31°C', min: '19°C', cond: 'साफ मौसम', rain: '0%', advisory: 'खेत जुताई व पलेवा करें' },
                  ].map((f, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-700 block mb-1">{f.day}</span>
                        <CloudSun size={28} className="text-amber-500 mx-auto my-2" />
                        <div className="text-base font-black text-slate-900">{f.max} <span className="text-xs font-normal text-slate-500">/ {f.min}</span></div>
                        <div className="text-xs font-semibold text-emerald-800 mt-1">{f.cond}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                        {f.advisory}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CROP INFORMATION (फसल संपूर्ण ज्ञान) */}
          {activeTab === 'crops' && (
            <div className="space-y-6">
              {/* Crop Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2 bg-white rounded-2xl p-3 shadow-xs border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">फसल चुनें:</span>
                {[
                  { id: 'soybean', label: 'सोयाबीन (Soybean)' },
                  { id: 'mustard', label: 'सरसों/रायड़ा (Mustard)' },
                  { id: 'wheat', label: 'गेहूँ (Wheat)' },
                  { id: 'paddy', label: 'धान/बासमती (Paddy)' },
                  { id: 'garlic', label: 'देशी लहसुन (Garlic)' },
                  { id: 'gram', label: 'चना देशी (Gram)' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrop(c.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      selectedCrop === c.id
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Selected Crop Deep-Dive Guide */}
              {CROPS_DATABASE[selectedCrop] && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                        सीजन: {CROPS_DATABASE[selectedCrop].season} फसल
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {CROPS_DATABASE[selectedCrop].nameHindi}
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">वैज्ञानिक नाम: {CROPS_DATABASE[selectedCrop].nameEng}</p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center sm:text-right">
                      <span className="text-[11px] text-emerald-800 font-semibold block">अनुमानित औसत पैदावार</span>
                      <span className="text-lg sm:text-xl font-black text-emerald-950">{CROPS_DATABASE[selectedCrop].avgYield}</span>
                    </div>
                  </div>

                  {/* 6-box Parameter Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">📅 बुवाई का उपयुक्त समय</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].sowingTime}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">⚖️ अनुशंसित बीज दर</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].seedRate}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">🧪 खाद एवं उर्वरक अनुपात</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].npkRatio}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">🏞️ उपयुक्त मिट्टी</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].soilType}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">💧 पानी व सिंचाई आवश्यकता</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].waterRequirements}</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">🌾 कटाई व गहाई समय</span>
                      <p className="text-sm font-bold text-slate-800">{CROPS_DATABASE[selectedCrop].harvestTime}</p>
                    </div>
                  </div>

                  {/* Pest & Disease Management Alert Box */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
                      <AlertTriangle size={18} className="text-amber-700 shrink-0" />
                      प्रमुख कीट, रोग एवं रासायनिक रोकथाम उपाय
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <p><strong>नुकसान पहुँचाने वाले मुख्य कीट:</strong> {CROPS_DATABASE[selectedCrop].majorPests}</p>
                      <p className="mt-1"><strong>अनुशंसित कीटनाशी व छिड़काव मात्रा:</strong> {CROPS_DATABASE[selectedCrop].controlMedicine}</p>
                    </div>
                  </div>

                  {/* Hadoti Regional Note */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium">
                    📌 <strong>मोती नगर / लाखेरी क्षेत्र विशेष टिप्पणी:</strong> {CROPS_DATABASE[selectedCrop].hadotiSuitability}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GOVERNMENT SCHEMES (किसान सरकारी योजनाएं) */}
          {activeTab === 'schemes' && (
            <div className="space-y-6">
              <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-md border border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">🏛️ राजस्थान किसान योजनाएं 2026 (Agriculture Subsidies)</h2>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                    खेत तारबंदी, सोलर पंप, कृषि यंत्र और सम्मान निधि हेतु सीधे राज किसान साथी पोर्टल पर आवेदन करें।
                  </p>
                </div>
                <a
                  href="https://rajkisan.rajasthan.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition shrink-0 inline-flex items-center gap-1.5"
                >
                  राज किसान पोर्टल खोलें <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCHEMES_LIST.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 hover:border-emerald-300 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                          {scheme.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{scheme.deadline}</span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                        {scheme.hindiTitle}
                      </h3>
                      <p className="text-xs text-slate-400 mb-3">{scheme.title}</p>

                      {/* Subsidy Highlight */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-3">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">सब्सिडी / अनुदान राशि</span>
                        <span className="text-sm sm:text-base font-extrabold text-emerald-950">{scheme.subsidy}</span>
                      </div>

                      <div className="space-y-2 text-xs text-slate-600 mb-4">
                        <p><strong>पात्रता:</strong> {scheme.eligibility}</p>
                        <p><strong>आवश्यक दस्तावेज:</strong> {scheme.documents.join(', ')}</p>
                      </div>
                    </div>

                    <a
                      href={scheme.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm text-center transition flex items-center justify-center gap-1.5"
                    >
                      ऑनलाइन आवेदन करें <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AGRICULTURE ADVISORIES (साप्ताहिक KVK कृषि सलाह) */}
          {activeTab === 'advisory' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      📋 कृषि विज्ञान केंद्र (KVK) बूंदी एवं कृषि विश्वविद्यालय कोटा सलाह
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">साप्ताहिक मौसम आधारित समसामयिक कृषि परामर्श बुलेटिन</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                    सत्र: रबी 2026-27
                  </span>
                </div>

                <div className="space-y-4">
                  {ADVISORIES_DATA.map((adv) => (
                    <div
                      key={adv.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 transition"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {adv.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{adv.date}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 mb-2">
                        {adv.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                        {adv.details}
                      </p>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold">
                        <CheckCircle2 size={13} />
                        कार्रवाई: {adv.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: IRRIGATION & CANAL INFO (सिंचाई व चंबल नहर वितरिका) */}
          {activeTab === 'irrigation' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Droplets size={24} className="text-blue-600" />
                    चंबल दांयी मुख्य नहर (RMC) लाखेरी वितरिका सिंचाई प्रबंधन
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    मोती नगर, गुढ़ा व लाखेरी तहसील क्षेत्र में नहरी जल वितरण, जल रोस्टर व बारी प्रबंधन
                  </p>
                </div>

                {/* Canal Status Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-blue-700 block mb-1">नहर का नाम</span>
                    <h3 className="text-lg font-black text-blue-950">चंबल दांयी मुख्य नहर</h3>
                    <p className="text-xs text-blue-800 mt-1">वितरिका: लाखेरी - इन्द्रगढ़ माइनर</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-emerald-700 block mb-1">वर्तमान जल स्थिति</span>
                    <h3 className="text-lg font-black text-emerald-950">रोस्टर अनुसार जल प्रवाह</h3>
                    <p className="text-xs text-emerald-800 mt-1">रबी पलेवा व सिंचाई हेतु उपलब्ध</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-amber-700 block mb-1">नहर नियंत्रण कक्ष</span>
                    <h3 className="text-lg font-black text-amber-950">+91 7438-261222</h3>
                    <p className="text-xs text-amber-800 mt-1">जल संसाधन विभाग लाखेरी उपखण्ड</p>
                  </div>
                </div>

                {/* Water Rotation Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="p-3 font-bold">चरण / बारी</th>
                        <th className="p-3 font-bold">माइनर वितरिका</th>
                        <th className="p-3 font-bold">लाभान्वित क्षेत्र</th>
                        <th className="p-3 font-bold">जल प्रवाह अवधि</th>
                        <th className="p-3 font-bold">स्थिति</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">प्रथम चक्र (पलेवा)</td>
                        <td className="p-3">लाखेरी माइनर 1 से 6</td>
                        <td className="p-3">मोती नगर, गुढ़ा, बलवन</td>
                        <td className="p-3">15 दिन सतत प्रवाह</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">सक्रिय</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">द्वितीय चक्र (कोर सिंचाई)</td>
                        <td className="p-3">इन्द्रगढ़ हेड रेगुलेटर</td>
                        <td className="p-3">गुढ़ा व टेल क्षेत्र के खेत</td>
                        <td className="p-3">12 दिन चक्र</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">आगामी</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">तृतीय चक्र (दाना भराव)</td>
                        <td className="p-3">आरएमसी टेल वितरिका</td>
                        <td className="p-3">गेहूँ एवं सरसों क्षेत्र</td>
                        <td className="p-3">10 दिन चक्र</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">प्रस्तावित</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Farm Pond Subsidy Scheme Note */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                      खेत तलाई (Farm Pond) एवं प्लास्टिक लाइनिंग अनुदान
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      वर्षा जल संरक्षण हेतु खेत में तलाई खुदवाने पर ₹1,05,000 (कच्ची तलाई) अथवा ₹1,35,000 (प्लास्टिक शीट सहित) तक सरकारी अनुदान उपलब्ध है।
                    </p>
                  </div>
                  <a
                    href="https://rajkisan.rajasthan.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shrink-0 transition"
                  >
                    फार्म पॉन्ड आवेदन ➔
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ANIMAL HUSBANDRY & DAIRY (पशुपालन व डेयरी विकास) */}
          {activeTab === 'dairy' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <HeartPulse size={24} className="text-rose-600" />
                    पशुपालन, डेयरी विकास एवं पशु आरोग्य केंद्र
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    मोती नगर व ग्राम पंचायत गुढ़ा के पशुपालक भाइयों के लिए कामधेनु बीमा, टीकाकरण व सरस डेयरी सेवाएं
                  </p>
                </div>

                {/* 3 Main Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-rose-800 block mb-1">मुख्यमंत्री कामधेनु बीमा योजना</span>
                    <h3 className="text-xl font-black text-rose-950">₹40,000 प्रति गाय/भैंस</h3>
                    <p className="text-xs text-rose-900 mt-1.5">
                      प्रति परिवार 2 दुधारू पशुओं का निःशुल्क बीमा। अकाल मृत्यु होने पर सीधे बैंक खाते में आर्थिक सहायता।
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-emerald-800 block mb-1">पशुधन निःशुल्क दवा योजना</span>
                    <h3 className="text-xl font-black text-emerald-950">138 दवाइयां बिल्कुल फ्री</h3>
                    <p className="text-xs text-emerald-900 mt-1.5">
                      राजकीय पशु चिकित्सालय गुढ़ा व लाखेरी में पेट के कीड़े की दवा, एंटीबायोटिक, कैल्शियम व मिनरल मिक्सचर मुफ्त उपलब्ध।
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                    <span className="text-xs font-bold text-blue-800 block mb-1">सरस दुग्ध संग्रहण केंद्र</span>
                    <h3 className="text-xl font-black text-blue-950">FAT / SNF आधारित दरें</h3>
                    <p className="text-xs text-blue-900 mt-1.5">
                      गाय का दूध: ₹42-₹48/लीटर; भैंस का दूध: ₹60-₹75/लीटर। मुख्यमंत्री दुग्ध संबल योजना के तहत ₹5/लीटर अतिरिक्त बोनस!
                    </p>
                  </div>
                </div>

                {/* Vaccination Calendar */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-700" />
                    पशु टीकाकरण वार्षिक कैलेंडर (Vaccination Schedule)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div className="bg-white rounded-xl p-3.5 border border-slate-200">
                      <span className="text-xs font-bold text-emerald-800 block mb-1">FMD (खुरपका-मुंहपका)</span>
                      <p className="text-slate-600">टीकाकरण समय: <strong>सितंबर-अक्टूबर</strong> एवं <strong>मार्च-अप्रैल</strong> (वर्ष में 2 बार निःशुल्क)।</p>
                    </div>

                    <div className="bg-white rounded-xl p-3.5 border border-slate-200">
                      <span className="text-xs font-bold text-emerald-800 block mb-1">HS / BQ (गलघोंटू व लंगड़ा बुखार)</span>
                      <p className="text-slate-600">टीकाकरण समय: <strong>मई-जून</strong> (मानसून प्रारंभ होने से ठीक पूर्व)।</p>
                    </div>

                    <div className="bg-white rounded-xl p-3.5 border border-slate-200">
                      <span className="text-xs font-bold text-emerald-800 block mb-1">Lumpy Skin Disease (लंपी)</span>
                      <p className="text-slate-600">गोट पॉक्स वैक्सीन (Goat Pox) द्वारा वार्षिक सुरक्षा टीका।</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Veterinary Contacts */}
                <div className="bg-emerald-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-base text-amber-300">नजदीकी पशु चिकित्सालय संपर्क (Emergency Vet Helpline)</h4>
                    <p className="text-xs text-emerald-100 mt-1">
                      राजकीय प्रथम श्रेणी पशु चिकित्सालय लाखेरी: <strong>+91 7438-261102</strong> • पशु औषधालय गुढ़ा: <strong>+91 94148 55432</strong>
                    </p>
                  </div>
                  <a
                    href="tel:1962"
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition shrink-0 inline-flex items-center gap-2"
                  >
                    <PhoneCall size={14} /> 1962 पशु एम्बुलेंस डायल करें
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: FERTILIZER CALCULATOR (खाद व बीज कैलकुलेटर) */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <Calculator size={24} className="text-emerald-700" />
                    बीघा अनुसार रासायनिक खाद एवं बीज कैलकुलेटर
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    अपनी फसल चुनें और जमीन (बीघा) दर्ज करें, सिस्टम तुरंत यूरिया, डीएपी, पोटाश व जिंक की सटीक बोरियां बता देगा।
                  </p>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                      फसल का चयन करें:
                    </label>
                    <select
                      value={calcCrop}
                      onChange={(e) => setCalcCrop(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option value="wheat">गेहूँ (Wheat)</option>
                      <option value="mustard">सरसों / रायड़ा (Mustard)</option>
                      <option value="garlic">देशी लहसुन (Garlic)</option>
                      <option value="paddy">धान / बासमती (Paddy)</option>
                      <option value="soybean">सोयाबीन (Soybean)</option>
                      <option value="gram">चना देशी (Gram)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                      जमीन का क्षेत्रफल (बीघा में):
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={calcBigha}
                      onChange={(e) => setCalcBigha(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Results Card */}
                <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                    कुल {calcBigha} बीघा भूमि हेतु संस्तुत मात्रा
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center">
                      <span className="text-xs text-emerald-200 block mb-1 font-medium">यूरिया (45 kg बोरी)</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-300">{calcResults.ureaBags}</span>
                      <span className="text-xs text-emerald-300 block mt-0.5">बोरी</span>
                    </div>

                    <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center">
                      <span className="text-xs text-emerald-200 block mb-1 font-medium">डीएपी (50 kg बोरी)</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-300">{calcResults.dapBags}</span>
                      <span className="text-xs text-emerald-300 block mt-0.5">बोरी</span>
                    </div>

                    <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center">
                      <span className="text-xs text-emerald-200 block mb-1 font-medium">पोटाश (MOP)</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-300">{calcResults.mopBags}</span>
                      <span className="text-xs text-emerald-300 block mt-0.5">बोरी</span>
                    </div>

                    <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center">
                      <span className="text-xs text-emerald-200 block mb-1 font-medium">जिंक / सल्फर</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-300">{calcResults.zincKg}</span>
                      <span className="text-xs text-emerald-300 block mt-0.5">किग्रा</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950 rounded-2xl border border-emerald-700/60 text-xs sm:text-sm text-emerald-100">
                    💡 <strong>कृषि वैज्ञानिक सलाह:</strong> {calcResults.note}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. EMERGENCY KISAN HELPLINES & LOCAL CONTACTS (Always Visible at Bottom) */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <PhoneCall size={20} className="text-emerald-700" />
                  आपातकालीन किसान हेल्पलाइन व स्थानीय संपर्क (Direct Kisan Helplines)
                </h3>
                <p className="text-xs text-slate-500">किसी भी समस्या अथवा तकनीकी सलाह हेतु सीधे संपर्क करें</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href="tel:18001801551"
                className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 hover:bg-emerald-100 transition flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">किसान कॉल सेंटर (भारत सरकार)</span>
                  <span className="text-sm font-extrabold text-slate-900">1800-180-1551</span>
                  <span className="text-[10px] text-slate-500 block">टोल-फ्री • 24x7 निःशुल्क</span>
                </div>
              </a>

              <a
                href="tel:1912"
                className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 hover:bg-amber-100 transition flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase block">कृषि बिजली फॉल्ट (JVVNL)</span>
                  <span className="text-sm font-extrabold text-slate-900">1912</span>
                  <span className="text-[10px] text-slate-500 block">लाखेरी विद्युत सब-डिवीजन</span>
                </div>
              </a>

              <a
                href="tel:14447"
                className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 hover:bg-sky-100 transition flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-sky-800 uppercase block">फसल बीमा दावा (PMFBY)</span>
                  <span className="text-sm font-extrabold text-slate-900">14447</span>
                  <span className="text-[10px] text-slate-500 block">72 घंटे में नुकसान दर्ज करें</span>
                </div>
              </a>

              <a
                href="tel:1962"
                className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 hover:bg-rose-100 transition flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <HeartPulse size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-800 uppercase block">मोबाइल पशु एम्बुलेंस सेवा</span>
                  <span className="text-sm font-extrabold text-slate-900">1962</span>
                  <span className="text-[10px] text-slate-500 block">पशु चिकित्सक घर पर सेवा</span>
                </div>
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
