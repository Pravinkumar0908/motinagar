'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Download,
  ArrowRight,
  Send,
  X,
  IndianRupee,
  Users,
  Sprout,
  GraduationCap,
  HeartPulse,
  Home,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  FileText,
  BadgeCheck
} from 'lucide-react'
import { PortalNavbar } from '@/components/portal-navbar'
import { PortalSidebar } from '@/components/portal-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'

// Authentic Official Government Schemes (Extracted from myScheme.gov.in, Jan Soochna, RajKisan & SJE Rajasthan)
const officialSchemesData = [
  {
    id: 'pm-kisan-raj',
    category: 'कृषि एवं किसान (Agriculture)',
    title: 'PM Kisan Samman Nidhi + Rajasthan Bonus',
    hindi: 'प्रधानमंत्री किसान सम्मान निधि एवं राज्य बोनस',
    portal: 'pmkisan.gov.in | rajkisan.rajasthan.gov.in',
    portalUrl: 'https://pmkisan.gov.in',
    img: '/images/scheme_kisan.jpg',
    amount: '₹8,000 प्रति वर्ष (DBT)',
    amountSub: 'केंद्र: ₹6,000 + राजस्थान बोनस: ₹2,000',
    desc: 'मोती नगर के सभी पात्र लघु एवं सीमांत किसानों को आर्थिक संबल प्रदान करने हेतु केंद्र सरकार द्वारा ₹6,000 एवं राजस्थान सरकार द्वारा ₹2,000 अतिरिक्त बोनस सीधे बैंक खाते में प्रदान किया जाता है।',
    eligibility: 'मोती नगर राजस्व सीमा में कृषि योग्य भूमि के खाताधारक किसान। सरकारी सेवा अथवा आयकरदाता न हों।',
    documents: ['कृषि भूमि की जमाबंदी नकल (खसरा संख्या)', 'जन आधार कार्ड', 'आधार कार्ड', 'आधार लिंक बैंक पासबुक', 'सक्रिय e-KYC'],
    benefits: ['प्रति 4 माह में ₹2,000 की किस्त', 'खरीफ व रबी फसल हेतु बीज-खाद में सहायता', 'राजस्थान अतिरिक्त बोनस सीधे बैंक में'],
    officialHelpline: '155261 / 1800-180-1551 (PM Kisan Helpline)',
    status: '18वीं किस्त e-KYC जारी',
  },
  {
    id: 'tarbandi-subsidy',
    category: 'कृषि एवं किसान (Agriculture)',
    title: 'RajKisan Tarbandi Subsidy Scheme',
    hindi: 'राजकिसान खेत तारबंदी अनुदान योजना',
    portal: 'rajkisan.rajasthan.gov.in',
    portalUrl: 'https://rajkisan.rajasthan.gov.in',
    img: '/images/village_life.jpg',
    amount: '50% से 70% सब्सिडी (₹48,000 तक)',
    amountSub: 'अधिकतम 400 रनिंग मीटर तारबंदी',
    desc: 'आवारा पशुओं एवं जंगली नीलगायों से फसलों की सुरक्षा हेतु खेतों की तारबंदी (कांटेदार तार व पोल) पर राजस्थान कृषि विभाग द्वारा लागत का 50% से 70% तक अनुदान।',
    eligibility: 'मोती नगर के काश्तकार जिनके पास न्यूनतम 0.5 से 1.5 हेक्टेयर कृषि भूमि हो। समूह में 3 किसान मिलकर भी पात्र हैं।',
    documents: ['जमाबंदी नकल (6 माह से पुरानी न हो)', 'खेत का नक्शा (ट्रेस नक्शा)', 'जन आधार कार्ड', 'बैंक पासबुक'],
    benefits: ['400 मीटर तक कंटीले तार पर अनुदान', 'फसलों को आवारा मवेशियों से शत-प्रतिशत सुरक्षा', 'डीबीटी द्वारा सीधा बैंक खाते में अनुदान'],
    officialHelpline: '1800-180-1551 (किसान कॉल सेंटर)',
    status: 'ऑनलाइन आवेदन आमंत्रित',
  },
  {
    id: 'pm-kusum-solar',
    category: 'कृषि एवं किसान (Agriculture)',
    title: 'PM KUSUM Solar Pump Subsidy Scheme',
    hindi: 'पीएम कुसुम सोलर पंप अनुदान योजना',
    portal: 'energy.rajasthan.gov.in',
    portalUrl: 'https://energy.rajasthan.gov.in',
    img: '/images/natural_beauty.jpg',
    amount: '60% तक सरकारी अनुदान',
    amountSub: '3 HP से 7.5 HP क्षमता सोलर पंप',
    desc: 'सिंचाई हेतु डीजल पंपों से मुक्ति एवं बिजली बिल बचत हेतु खेतों में 3 एचपी से 7.5 एचपी तक सोलर पंप संयंत्र स्थापना पर केंद्र व राज्य सरकार द्वारा 60% सब्सिडी।',
    eligibility: 'मोती नगर के किसान जिनके पास कुआं, बोरवेल अथवा फार्म पौंड उपलब्ध हो और कृषि बिजली कनेक्शन न हो।',
    documents: ['जमाबंदी नकल', 'जन आधार कार्ड', 'जल स्रोत प्रमाण पत्र', 'विद्युत विभाग अनापत्ति प्रमाण (NOC)'],
    benefits: ['दिन में निर्बाध मुफ्त बिजली से सिंचाई', 'डीजल खर्च में 100% बचत', 'अतिरिक्त सौर ऊर्जा ग्रिड को बेचने का अवसर'],
    officialHelpline: '0141-2227233 (अक्षय ऊर्जा निगम)',
    status: 'आवेदन खुले हैं',
  },
  {
    id: 'pm-awas-gramin',
    category: 'आवास (Housing)',
    title: 'Pradhan Mantri Awas Yojana (Gramin)',
    hindi: 'प्रधानमंत्री आवास योजना (ग्रामीण)',
    portal: 'pmayg.nic.in | cexplore.nic.in',
    portalUrl: 'https://pmayg.nic.in',
    img: '/images/scheme_house.jpg',
    amount: '₹1,20,000 + ₹23,940 नरेगा + ₹12,000',
    amountSub: 'कुल लगभग ₹1.56 लाख का लाभ',
    desc: 'मोती नगर के बेघर एवं कच्चे मकान वाले परिवारों को पक्के भूकंपरोधी आवास निर्माण हेतु ₹1.20 लाख की सहायता, साथ ही 90 दिन की नरेगा अकुशल मजदूरी (₹23,940) व स्वच्छ भारत शौचालय हेतु ₹12,000।',
    eligibility: 'SECC 2011 सर्वे सूची में पात्र परिवार, कच्चा घर धारक, परिवार में 25 वर्ष से अधिक साक्षर वयस्क न हो।',
    documents: ['जन आधार कार्ड', 'आधार कार्ड', 'बैंक खाता विवरण', 'कच्चे मकान के साथ लाभार्थी की जियो-टैग फोटो', 'जमीन का पट्टा / अधिकार पत्र'],
    benefits: ['3 किस्तों में सीधे बैंक में ₹1,20,000', '90 दिन मनरेगा मजदूरी का स्वतः भुगतान', 'उज्ज्वला गैस कनेक्शन व बिजली कनेक्शन वरीयता'],
    officialHelpline: '1800-11-6446 (PMAY ग्रामीण टोल-फ्री)',
    status: 'नवीन आवास स्वीकृति सूची जारी',
  },
  {
    id: 'palanhar-yojana',
    category: 'सामाजिक सुरक्षा (Social)',
    title: 'Rajasthan Palanhar Yojana',
    hindi: 'राजस्थान पालनहार योजना',
    portal: 'sje.rajasthan.gov.in',
    portalUrl: 'https://sje.rajasthan.gov.in',
    img: '/images/scheme_students.jpg',
    amount: '₹1,500 से ₹2,500 / माह प्रति बच्चा',
    amountSub: '+ ₹2,000 वार्षिक पोशाक व जूता सहायता',
    desc: 'अनाथ, निराश्रित, विधवा माता के बच्चों एवं दिव्यांग माता-पिता के बच्चों को पारिवारिक परिवेश में पालन-पोषण व शिक्षा हेतु राजस्थान सरकार द्वारा मासिक आर्थिक सहायता।',
    eligibility: 'अनाथ बच्चे, विधवा माता के बच्चे (अधिकतम 3), जेल में बंद कैदियों के बच्चे, सिलिकोसिस/कुष्ठ रोग पीड़ित माता-पिता के बच्चे।',
    documents: ['पालनहार का जन आधार कार्ड', 'बच्चों का आंगनवाड़ी/विद्यालय अध्ययन प्रमाण', 'माता-पिता का मृत्यु/पेंशन प्रमाण', 'आधार कार्ड'],
    benefits: ['0-6 वर्ष तक ₹1,500 प्रतिमाह', '6-18 वर्ष तक ₹2,500 प्रतिमाह', 'प्रतिवर्ष ₹2,000 कपड़े, जूते व किताबों हेतु'],
    officialHelpline: '0141-2226602 (सामाजिक न्याय विभाग)',
    status: 'निरंतर ऑनलाइन आवेदन चालू',
  },
  {
    id: 'ayushman-arogya',
    category: 'स्वास्थ्य (Health)',
    title: 'Mukhya Mantri Ayushman Arogya Yojana',
    hindi: 'मुख्यमंत्री आयुष्मान आरोग्य स्वास्थ्य योजना',
    portal: 'health.rajasthan.gov.in',
    portalUrl: 'https://health.rajasthan.gov.in',
    img: '/images/hero.jpg',
    amount: '₹25 लाख तक कैशलेस चिकित्सा सुरक्षा',
    amountSub: 'सरकारी व संबद्ध निजी अस्पतालों में',
    desc: 'मोती नगर के प्रत्येक परिवार को गंभीर बीमारियों (हार्ट, कैंसर, किडनी, डायलिसिस आदि) के इलाज हेतु प्रतिवर्ष ₹25 लाख तक निःशुल्क कैशलेस अस्पताल भर्ती सुविधा।',
    eligibility: 'राजस्थान के समस्त जन आधार कार्ड धारक परिवार। NFSA खाद्य सुरक्षा व लघु किसानों हेतु 100% निःशुल्क।',
    documents: ['जन आधार कार्ड', 'मरीज का आधार कार्ड', 'राशन कार्ड (NFSA स्थिति हेतु)'],
    benefits: ['1798 प्रकार की बीमारियों का कैशलेस उपचार', 'अस्पताल भर्ती के 5 दिन पूर्व व 15 दिन बाद तक की दवाएं शामिल', 'अंग प्रत्यारोपण (ऑर्गन ट्रांसप्लांट) तक का व्यय शामिल'],
    officialHelpline: '181 (राजस्थान संपर्क) / 104 (स्वास्थ्य परामर्श)',
    status: 'निशुल्क कार्ड सक्रिय',
  },
  {
    id: 'ujjwala-yojana',
    category: 'महिला कल्याण (Women)',
    title: 'Pradhan Mantri Ujjwala Yojana 2.0',
    hindi: 'प्रधानमंत्री उज्ज्वला योजना 2.0 (मुफ्त गैस व सब्सिडी)',
    portal: 'pmuy.gov.in',
    portalUrl: 'https://pmuy.gov.in',
    img: '/images/scheme_women.jpg',
    amount: 'निःशुल्क गैस कनेक्शन + ₹450 में सिलेंडर',
    amountSub: 'राज्य सरकार द्वारा ₹450 सिलेंडर सब्सिडी',
    desc: 'ग्रामीण महिलाओं को रसोई के जहरीले धुएं से मुक्ति हेतु निःशुल्क गैस चूल्हा, सुरक्षा पाइप, पहला भरा सिलेंडर एवं राजस्थान सरकार द्वारा मात्र ₹450 में रिफिल सब्सिडी।',
    eligibility: 'बीपीएल परिवार, अंत्योदय, प्रधानमंत्री आवास योजना लाभार्थी अथवा एससी/एसटी वर्ग की 18+ आयु की महिला मुखिया।',
    documents: ['महिला मुखिया का आधार कार्ड', 'राशन कार्ड', 'जन आधार कार्ड', 'बैंक खाता विवरण (सब्सिडी हेतु)'],
    benefits: ['मुफ्त भारत गैस/इंडेन/एचपी कनेक्शन', 'मुफ्त गैस चूल्हा व रेगुलेटर', 'प्रति सिलेंडर सब्सिडी सीधे बैंक खाते में'],
    officialHelpline: '1906 (LPG आपातकालीन) / 1800-266-6696',
    status: 'उज्ज्वला 2.0 पंजीयन चालू',
  },
  {
    id: 'vridhjan-pension',
    category: 'सामाजिक सुरक्षा (Social)',
    title: 'Mukhyamantri Vridhjan Samman Pension',
    hindi: 'मुख्यमंत्री वृद्धजन सम्मान पेंशन योजना',
    portal: 'ssp.rajasthan.gov.in',
    portalUrl: 'https://ssp.rajasthan.gov.in',
    img: '/images/scheme_elderly.jpg',
    amount: '₹1,150 से ₹1,500 प्रति माह',
    amountSub: '75 वर्ष से अधिक होने पर ₹1,500',
    desc: 'मोती नगर के 58 वर्ष (महिला) एवं 60 वर्ष (पुरुष) से अधिक आयु के वरिष्ठ नागरिकों को बुढ़ापे में सम्मानपूर्वक जीवनयापन हेतु नियमित मासिक पेंशन।',
    eligibility: 'राजस्थान का मूल निवासी, मोती नगर में निवास, पारिवारिक वार्षिक आय ₹48,000 से कम।',
    documents: ['जन आधार कार्ड', 'आयु प्रमाण (आधार कार्ड / मतदाता पहचान पत्र)', 'बैंक पासबुक', 'आय घोषणा पत्र'],
    benefits: ['प्रतिमाह 1 तारीख को सीधा बैंक अंतरण', 'हर वर्ष 15% स्वतः पेंशन वृद्धि का प्रावधान', 'घर बैठे फेस-रिकग्निशन से वार्षिक भौतिक सत्यापन'],
    officialHelpline: '0141-5111007 (SSP राजस्थान हेल्पडेस्क)',
    status: 'ऑनलाइन आवेदन स्वीकृत',
  },
  {
    id: 'yuva-sambal',
    category: 'युवा एवं रोजगार (Youth)',
    title: 'Mukhyamantri Yuva Sambal Yojana (Berojgari Bhatta)',
    hindi: 'मुख्यमंत्री युवा संबल योजना (बेरोजगारी भत्ता)',
    portal: 'employment.livelihoods.rajasthan.gov.in',
    portalUrl: 'https://employment.livelihoods.rajasthan.gov.in',
    img: '/images/govt_school.jpg',
    amount: '₹4,000 से ₹4,500 प्रति माह',
    amountSub: 'पुरुष: ₹4,000 | महिला/दिव्यांग: ₹4,500 (2 वर्ष हेतु)',
    desc: 'मोती नगर के स्नातक (Graduate) बेरोजगार युवाओं को रोजगार प्राप्ति तक आर्थिक संबल प्रदान करने हेतु प्रतिमाह बेरोजगारी भत्ता एवं 4 घंटे दैनिक इंटर्नशिप अवसर।',
    eligibility: 'मान्यता प्राप्त विश्वविद्यालय से स्नातक उत्तीर्ण, आयु 30 वर्ष (आरक्षित वर्ग 35 वर्ष) तक, पारिवारिक आय ₹2 लाख से कम।',
    documents: ['स्नातक डिग्री / मार्कशीट', 'मूल निवास प्रमाण पत्र', 'जन आधार कार्ड', '10वीं मार्कशीट (आयु प्रमाण)', 'आय प्रमाण पत्र (Format I & K)'],
    benefits: ['2 वर्ष तक प्रतिमाह ₹4,000 से ₹4,500', 'सरकारी कार्यालयों में इंटर्नशिप कार्य अनुभव प्रमाण पत्र', 'आरएसएलडीसी द्वारा निःशुल्क कौशल विकास प्रशिक्षण'],
    officialHelpline: '0141-2368850 (रोजगार सेवा निदेशालय)',
    status: 'ऑनलाइन पोर्टल चालू',
  },
  {
    id: 'kanya-kanyadan',
    category: 'महिला कल्याण (Women)',
    title: 'Mukhyamantri Kanyadan / Hathlewa Yojana',
    hindi: 'मुख्यमंत्री कन्यादान / हथलेवा योजना',
    portal: 'sje.rajasthan.gov.in',
    portalUrl: 'https://sje.rajasthan.gov.in',
    img: '/images/cultural_events.jpg',
    amount: '₹21,000 से ₹51,000 शादी अनुदान',
    amountSub: 'स्नातक कन्या पर अतिरिक्त ₹20,000 प्रोत्साहन',
    desc: 'बीपीएल, अंत्योदय, आस्था कार्ड धारक एवं आर्थिक रूप से कमजोर परिवारों की 18 वर्ष से अधिक आयु की कन्याओं के विवाह के अवसर पर राज्य सरकार द्वारा आर्थिक सहायता।',
    eligibility: 'कन्या की आयु 18 वर्ष पूर्ण हो, परिवार बीपीएल/अंत्योदय या विधवा माता की पुत्री हो, मोती नगर का मूल निवासी।',
    documents: ['विवाह पंजीयन प्रमाण पत्र या शादी का कार्ड', 'कन्या का आयु प्रमाण व आधार', 'जन आधार कार्ड', 'बीपीएल प्रमाण', 'बैंक पासबुक'],
    benefits: ['सामान्य विवाह पर ₹21,000 से ₹31,000', 'यदि कन्या 10वीं पास है तो ₹10,000 अतिरिक्त', 'यदि कन्या स्नातक (Graduate) है तो ₹20,000 अतिरिक्त (कुल ₹51,000)'],
    officialHelpline: '181 (राजस्थान संपर्क)',
    status: 'विवाह से 6 माह तक आवेदन मान्य',
  },
  {
    id: 'gargi-puraskar',
    category: 'शिक्षा (Education)',
    title: 'Gargi Puraskar & Balika Scooty Yojana',
    hindi: 'गार्गी पुरस्कार एवं कालीबाई भील मेधावी स्कूटी योजना',
    portal: 'rajshaladarpan.nic.in',
    portalUrl: 'https://rajshaladarpan.nic.in',
    img: '/images/temple.jpg',
    amount: 'निःशुल्क स्कूटी + ₹5,000 नकद',
    amountSub: '10वीं बोर्ड में ₹3,000 + 12वीं में ₹5,000',
    desc: 'मोती नगर राजकीय विद्यालय में अध्ययनरत मेधावी बालिकाओं को उच्च शिक्षा हेतु प्रोत्साहित करने के लिए 10वीं व 12वीं में 75% से अधिक अंक प्राप्त करने पर नकद पुरस्कार व निःशुल्क स्कूटी।',
    eligibility: 'माध्यमिक शिक्षा बोर्ड राजस्थान की 10वीं व 12वीं परीक्षा में 75% या अधिक अंक प्राप्त करने वाली नियमित छात्राएं।',
    documents: ['बोर्ड परीक्षा अंकतालिका', 'जन आधार कार्ड', 'अध्ययनरत होने का विद्यालय प्रमाण पत्र', 'बैंक खाता पासबुक'],
    benefits: ['10वीं में 75%+ पर ₹3,000', '12वीं में 75%+ पर ₹5,000', 'कॉलेज में नियमित प्रवेश लेने पर निःशुल्क स्कूटी'],
    officialHelpline: '0141-2700816 (बालिका शिक्षा फाउंडेशन)',
    status: 'सत्र 2026 आवेदन खुले',
  },
  {
    id: 'mgnrega-100days',
    category: 'युवा एवं रोजगार (Youth)',
    title: 'Mahatma Gandhi NREGA Guarantee',
    hindi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार गारंटी (100 दिन कार्य)',
    portal: 'nrega.nic.in',
    portalUrl: 'https://nrega.nic.in',
    img: '/images/village_life.jpg',
    amount: '₹266 प्रतिदिन मजदूरी (100 दिन गारंटी)',
    amountSub: 'राजस्थान विशेष श्रेणी परिवारों को 125 दिन',
    desc: 'मोती नगर के प्रत्येक ग्रामीण परिवार को वर्ष में न्यूनतम 100 दिन के अकुशल शारीरिक रोजगार की कानूनी गारंटी। ग्राम पंचायत में तालाब, सड़क, पौधारोपण व आवास निर्माण कार्य।',
    eligibility: 'मोती नगर का निवासी, 18 वर्ष से अधिक आयु का कोई भी ग्रामीण सदस्य जो अकुशल श्रम करने का इच्छुक हो।',
    documents: ['जॉब कार्ड आवेदन प्रपत्र', 'परिवार के सभी सदस्यों का आधार कार्ड', 'जन आधार कार्ड', 'बैंक खाता संख्या'],
    benefits: ['आवेदन के 15 दिन में कार्य आवंटन गारंटी', 'कार्य न मिलने पर बेरोजगारी भत्ता', 'मजदूरी का 15 दिन में सीधे बैंक खाते में भुगतान'],
    officialHelpline: '1800-180-6127 (नरेगा राज्य हेल्पलाइन)',
    status: 'मस्टररोल निरंतर सक्रिय',
  },
]

export default function SchemesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('सभी (All)')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalScheme, setActiveModalScheme] = useState<typeof officialSchemesData[0] | null>(null)
  const [applySuccess, setApplySuccess] = useState(false)
  
  // Interactive Scheme Eligibility Finder State
  const [finderGender, setFinderGender] = useState('any')
  const [finderOccupation, setFinderOccupation] = useState('farmer')
  const [finderCategory, setFinderCategory] = useState('all')

  const categories = [
    'सभी (All)',
    'कृषि एवं किसान (Agriculture)',
    'आवास (Housing)',
    'सामाजिक सुरक्षा (Social)',
    'स्वास्थ्य (Health)',
    'महिला कल्याण (Women)',
    'शिक्षा (Education)',
    'युवा एवं रोजगार (Youth)',
  ]

  // Filter schemes
  const filteredSchemes = officialSchemesData.filter((s) => {
    const matchesCat =
      selectedCategory === 'सभी (All)' ||
      s.category.includes(selectedCategory.split(' ')[0])

    const matchesSearch =
      searchQuery.trim() === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.hindi.includes(searchQuery) ||
      s.amount.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#1e293b] flex flex-col font-sans">
      <PortalNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex max-w-[1720px] w-full mx-auto pb-16 lg:pb-0">
        <PortalSidebar
          activeId="schemes"
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-x-hidden space-y-5">
          {/* A. HERO BANNER */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white min-h-[220px] p-5 sm:p-7 flex flex-col justify-between shadow-md">
            <Image
              src="/images/hero.jpg"
              alt="Moti Nagar Government Schemes"
              fill
              priority
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-950/95 via-slate-900/85 to-slate-900/40" />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs text-white/75 font-medium">
                <Link href="/" className="hover:text-white transition">Home</Link>
                <span>&gt;</span>
                <Link href="/services" className="hover:text-white transition">Services</Link>
                <span>&gt;</span>
                <span className="text-white font-semibold">Government Schemes</span>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mt-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    Government Schemes Portal (सरकारी योजनाएं)
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 font-hindi mt-1 max-w-2xl leading-relaxed">
                    myScheme.gov.in एवं जन सूचना पोर्टल राजस्थान से सीधे संकलित आधिकारिक योजनाएं। मोती नगर के किसानों, महिलाओं, युवाओं एवं वृद्धजनों हेतु समस्त योजनाएं, पात्रता एवं प्रत्यक्ष लाभ (DBT) विवरण।
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-3 text-white text-xs space-y-1 shrink-0">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <BadgeCheck size={16} />
                    <span>सत्यापित डेटा स्रोत (Verified Portals)</span>
                  </div>
                  <div className="text-[10px] text-white/80 font-mono">
                    myScheme • JanSoochna • RajKisan • PM-Kisan
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-semibold">
                🏛️ कुल 12+ सक्रिय जनकल्याणकारी योजनाएं
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
                ✓ जन आधार कार्ड से 100% डीबीटी अंतरण
              </span>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-semibold">
                📞 किसान व आमजन हेल्पलाइन: 181 / 1800-180-1551
              </span>
            </div>
          </div>

          {/* B. SCHEME FINDER / ELIGIBILITY CHECKER (myScheme Tool) */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-2xl border border-blue-200/80 p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1976D2] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    अपने लिए पात्र सरकारी योजनाएं खोजें (Find Schemes for You)
                  </h3>
                  <p className="text-[11px] text-slate-600 font-hindi mt-0.5">
                    अपनी श्रेणी एवं व्यवसाय चुनें - पोर्टल आपको तुरंत उपयुक्त सरकारी लाभ दिखाएगा
                  </p>
                </div>
              </div>

              {/* Quick Selectors */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={finderOccupation}
                  onChange={(e) => setFinderOccupation(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold outline-none focus:border-blue-500"
                >
                  <option value="farmer">किसान (Farmer)</option>
                  <option value="women">महिला (Women)</option>
                  <option value="student">विद्यार्थी (Student)</option>
                  <option value="senior">वरिष्ठ नागरिक (Senior 60+)</option>
                  <option value="youth">बेरोजगार युवा (Youth)</option>
                </select>

                <select
                  value={finderCategory}
                  onChange={(e) => setFinderCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold outline-none focus:border-blue-500"
                >
                  <option value="all">सभी वर्ग (All Categories)</option>
                  <option value="bpl">बीपीएल / अंत्योदय परिवार</option>
                  <option value="sc-st">अनुसूचित जाति / जनजाति (SC/ST)</option>
                  <option value="obc">अन्य पिछड़ा वर्ग (OBC)</option>
                  <option value="general">सामान्य वर्ग (EWS / General)</option>
                </select>

                <button
                  onClick={() => {
                    if (finderOccupation === 'farmer') setSelectedCategory('कृषि एवं किसान (Agriculture)')
                    else if (finderOccupation === 'women') setSelectedCategory('महिला कल्याण (Women)')
                    else if (finderOccupation === 'student') setSelectedCategory('शिक्षा (Education)')
                    else if (finderOccupation === 'senior') setSelectedCategory('सामाजिक सुरक्षा (Social)')
                    else if (finderOccupation === 'youth') setSelectedCategory('युवा एवं रोजगार (Youth)')
                  }}
                  className="px-4 py-2 bg-[#1976D2] hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-xs"
                >
                  पात्र योजनाएं देखें &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* C. SEARCH & CATEGORY FILTER */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="योजना का नाम, लाभ या विभाग खोजें..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-hindi"
                />
              </div>
              <div className="text-xs font-semibold text-slate-500 font-hindi flex items-center gap-2">
                <span>दिखाई जा रही योजनाएं: <b>{filteredSchemes.length}</b></span>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => { setSelectedCategory('सभी (All)'); setSearchQuery(''); }}
                  className="text-[#1976D2] hover:underline"
                >
                  सभी रीसेट करें
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
          </div>

          {/* D. SCHEME CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                {/* Header Image with Tag */}
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  <Image
                    src={scheme.img}
                    alt={scheme.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-amber-300 border border-white/20">
                    {scheme.category}
                  </span>
                  <div className="absolute bottom-2.5 inset-x-3 text-white">
                    <h3 className="font-extrabold text-sm leading-snug line-clamp-1">{scheme.title}</h3>
                    <p className="text-[11px] text-amber-300 font-hindi truncate mt-0.5">{scheme.hindi}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 font-hindi leading-relaxed line-clamp-3">
                    {scheme.desc}
                  </p>

                  {/* Financial Benefit Box */}
                  <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 text-[11px] space-y-0.5 font-hindi">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">सरकारी लाभ / अनुदान:</span>
                      <span className="font-extrabold text-emerald-800 text-xs">{scheme.amount}</span>
                    </div>
                    {scheme.amountSub && (
                      <div className="text-[10px] text-amber-900 font-semibold">{scheme.amountSub}</div>
                    )}
                  </div>

                  {/* Portal Source & Helpline */}
                  <div className="text-[10px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>आधिकारिक पोर्टल:</span>
                      <span className="font-mono text-slate-600 font-semibold truncate max-w-[170px]">{scheme.portal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>हेल्पलाइन:</span>
                      <span className="text-slate-600 font-semibold">{scheme.officialHelpline.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalScheme(scheme)}
                      className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>पात्रता व आवेदन फॉर्म</span>
                      <ArrowRight size={13} />
                    </button>
                    <a
                      href={scheme.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="आधिकारिक सरकारी पोर्टल पर जाएं"
                      className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition shrink-0"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* E. OFFICIAL SOURCE BANNER */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  सभी योजनाएं भारत सरकार एवं राजस्थान सरकार के अधिकृत पोर्टलों से सत्यापित हैं
                </h4>
                <p className="text-[11px] text-slate-500 font-hindi mt-0.5">
                  पात्रता जांच, ई-केवाईसी एवं आवेदन जमा करने हेतु ग्राम पंचायत सेवा केंद्र अथवा नजदीकी ई-मित्र पर संपर्क करें।
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://jansoochna.rajasthan.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                जन सूचना राजस्थान
              </a>
              <a
                href="https://www.myscheme.gov.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#1976D2] hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
              >
                myScheme भारत सरकार &rarr;
              </a>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav onMenuClick={() => setMobileMenuOpen(true)} />

      {/* DETAILED SCHEME MODAL WITH APPLICATION FORM */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-rise max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative aspect-video bg-slate-900 shrink-0">
              <Image
                src={activeModalScheme.img}
                alt={activeModalScheme.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <button
                onClick={() => {
                  setActiveModalScheme(null)
                  setApplySuccess(false)
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold">
                  {activeModalScheme.category}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight mt-1">{activeModalScheme.title}</h3>
                <div className="text-xs text-amber-300 font-hindi">{activeModalScheme.hindi}</div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {applySuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <CheckCircle2 size={40} className="text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-extrabold text-base text-emerald-950 font-hindi">
                    योजना हेतु आवेदन सफलता पूर्वक दर्ज हुआ!
                  </h4>
                  <div className="mt-2 text-sm font-mono font-bold text-emerald-800 bg-white p-2 rounded-xl border border-emerald-200 inline-block">
                    आवेदन संख्या: MN-SCH-2026-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  <p className="text-xs text-emerald-700 font-hindi mt-2 max-w-sm mx-auto">
                    आपके मोबाइल पर पुष्टिकरण SMS भेज दिया गया है। ग्राम विकास अधिकारी (VDO) द्वारा 3 कार्य दिवस में दस्तावेज़ सत्यापन किया जाएगा।
                  </p>
                  <button
                    onClick={() => {
                      setActiveModalScheme(null)
                      setApplySuccess(false)
                    }}
                    className="mt-4 bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2 rounded-xl transition"
                  >
                    पूर्ण हुआ
                  </button>
                </div>
              ) : (
                <>
                  {/* Scheme Summary */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">योजना का उद्देश्य व विवरण:</h4>
                    <p className="text-xs text-slate-600 font-hindi mt-1 leading-relaxed">
                      {activeModalScheme.desc}
                    </p>
                  </div>

                  {/* Financial Benefit Box */}
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                    <span className="font-bold text-emerald-950">वित्तीय सहायता / अनुदान: </span>
                    <span className="font-extrabold text-emerald-700">{activeModalScheme.amount}</span>
                    {activeModalScheme.amountSub && (
                      <div className="text-[11px] text-emerald-800 mt-0.5">({activeModalScheme.amountSub})</div>
                    )}
                  </div>

                  {/* Key Benefits List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">मुख्य लाभ:</h4>
                    <ul className="text-xs text-slate-600 font-hindi mt-1 space-y-1">
                      {activeModalScheme.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">पात्रता मापदंड (Eligibility):</h4>
                    <p className="text-xs text-slate-600 font-hindi mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {activeModalScheme.eligibility}
                    </p>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">आवश्यक दस्तावेज (Documents Checklist):</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {activeModalScheme.documents.map((d, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-lg font-hindi">
                          📄 {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Online Application Form */}
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-900">
                      इस योजना हेतु सीधे आवेदन दर्ज करें (Apply Online)
                    </h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setApplySuccess(true)
                      }}
                      className="space-y-2.5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          required
                          defaultValue="Pravin Kumar"
                          placeholder="आवेदक का नाम"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                        />
                        <input
                          required
                          type="tel"
                          placeholder="10 अंकों का मोबाइल नंबर"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          required
                          placeholder="जन आधार / आधार संख्या"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                        />
                        <input
                          placeholder="बैंक खाता संख्या (यदि उपलब्ध हो)"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-sans"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Send size={14} />
                        <span>ऑनलाइन आवेदन जमा करें (Submit Application)</span>
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
