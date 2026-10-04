import { BookOpen, HeartPulse, Landmark, Sprout, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type VillageService = {
  icon: LucideIcon
  title: string
  text: string
  tag: string
  tone: string
}

export const villageServices: VillageService[] = [
  { icon: Landmark, title: 'पंचायत और प्रमाण पत्र', text: 'जन्म, मृत्यु, निवास और आय प्रमाण पत्र की जानकारी', tag: 'लोकप्रिय', tone: 'bg-[#eaf1e8]' },
  { icon: Sprout, title: 'खेती और पशुपालन', text: 'फसल सलाह, मौसम, मंडी भाव और सरकारी सहायता', tag: 'किसानों के लिए', tone: 'bg-[#f3ead4]' },
  { icon: BookOpen, title: 'पढ़ाई और छात्रवृत्ति', text: 'स्कूल, कॉलेज, प्रतियोगी परीक्षा और छात्रवृत्ति', tag: 'बच्चों के लिए', tone: 'bg-[#e8edf5]' },
  { icon: Users, title: 'महिला और युवा मंच', text: 'स्वयं सहायता समूह, काम, प्रशिक्षण और अवसर', tag: 'साथ मिलकर', tone: 'bg-[#f5e6e8]' },
  { icon: HeartPulse, title: 'स्वास्थ्य और पोषण', text: 'स्वास्थ्य केंद्र, टीकाकरण, दवा और मातृ सहायता', tag: 'परिवार के लिए', tone: 'bg-[#f9e4df]' },
]

export const villageNotices = [
  { date: 'आज', title: 'ई-केवाईसी शिविर — पंचायत भवन', meta: 'सुबह 10:00 से दोपहर 2:00 बजे तक', urgent: true },
  { date: '22 नव.', title: 'आंगनवाड़ी में पोषण दिवस', meta: 'सभी माताओं और बच्चों के लिए', urgent: false },
  { date: '25 नव.', title: 'किसान बैठक — गेहूं की बुवाई', meta: 'चौपाल, शाम 4:00 बजे', urgent: false },
  { date: '28 नव.', title: 'ग्राम सभा — खुली बैठक', meta: 'पंचायत भवन, शाम 5:00 बजे', urgent: false },
]
