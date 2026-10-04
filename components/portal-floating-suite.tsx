'use client'

import React, { useState, useEffect } from 'react'
import {
  PhoneCall,
  AlertTriangle,
  MessageCircle,
  Megaphone,
  X,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Flame,
  Zap,
  HeartPulse,
  Users,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

// Emergency Contacts Directory
const EMERGENCY_CONTACTS = [
  {
    title: 'राजकीय 108 एम्बुलेंस सेवा',
    sub: '24x7 निःशुल्क आपातकालीन जननी व ट्रॉमा सेवा',
    phone: '108',
    category: 'health',
    icon: HeartPulse,
    bg: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    title: 'पुलिस आपातकालीन नियंत्रण (इन्द्रगढ़ थाना)',
    sub: 'त्वरित पुलिस सहायता व गश्ती दल',
    phone: '112',
    category: 'police',
    icon: ShieldAlert,
    bg: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    title: 'राजस्थान संपर्क जन-सुनवाई',
    sub: 'मुख्यमंत्री हेल्पलाइन व महिला सुरक्षा',
    phone: '181',
    category: 'govt',
    icon: PhoneCall,
    bg: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  {
    title: 'विद्युत डिस्कॉम फाल्ट नियंत्रण (JVVNL)',
    sub: 'लाखेरी / इन्द्रगढ़ ग्रामीण सब-स्टेशन लाइनमैन',
    phone: '1912',
    category: 'power',
    icon: Zap,
    bg: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  },
  {
    title: 'ग्राम विकास अधिकारी (VDO)',
    sub: 'श्री सुरेश चंद मीना (गुढ़ा / मोती नगर पंचायत वृत्त)',
    phone: '+919829244321',
    category: 'panchayat',
    icon: Users,
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    title: 'प्राथमिक स्वास्थ्य प्रभारी चिकित्सक',
    sub: 'सामुदायिक स्वास्थ्य केंद्र (CHC डॉक्टर ऑन कॉल)',
    phone: '+919414012345',
    category: 'health',
    icon: HeartPulse,
    bg: 'bg-cyan-50 text-cyan-800 border-cyan-200'
  },
  {
    title: 'अग्निशामक दल (Fire Brigade)',
    sub: 'लाखेरी नगर पालिका फायर स्टेशन',
    phone: '101',
    category: 'fire',
    icon: Flame,
    bg: 'bg-orange-50 text-orange-800 border-orange-200'
  }
]

// Digital Munadi Announcements
const MUNADI_BULLETINS = [
  {
    id: 1,
    title: '🗳️ पंचायती चुनाव 2026 अधिसूचना व मतदान तिथि',
    text: 'ग्राम पंचायत गुढ़ा व मोती नगर वार्ड 7 के सभी मतदाताओं को सूचित किया जाता है कि आगामी पंचायत आम चुनाव 2026 में अपने मताधिकार का प्रयोग अवश्य करें। मतदान केंद्र राजकीय उच्च माध्यमिक विद्यालय गुढ़ा में स्थापित रहेगा।',
    date: 'नवीनतम'
  },
  {
    id: 2,
    title: '🌾 रबी फसल गिरदावरी व पीएम किसान ई-केवाईसी',
    text: 'समस्त किसान भाइयों को सूचित किया जाता है कि पीएम किसान 19वीं किस्त हेतु ई-केवाईसी और रबी फसल की गिरदावरी मोती नगर ई-मित्र केंद्र पर प्रातः 9 बजे से सायं 5 बजे तक निःशुल्क की जा रही है।',
    date: 'आज'
  },
  {
    id: 3,
    title: '💧 मोती अमृत सरोवर स्वच्छता श्रमदान महाअभियान',
    text: 'आगामी रविवार को प्रातः 8 बजे से ऐतिहासिक मोती बावड़ी व सरोवर परिसर में युवा मंडल व ग्राम बुजुर्गों द्वारा संयुक्त श्रमदान अभियान आयोजित होगा। सभी ग्रामवासी सादर आमंत्रित हैं।',
    date: 'आगामी रविवार'
  }
]

export function PortalFloatingSuite() {
  const [showSosModal, setShowSosModal] = useState(false)
  const [showWhatsAppMenu, setShowWhatsAppMenu] = useState(false)
  const [showMunadiBar, setShowMunadiBar] = useState(false)
  const [currentBulletinIdx, setCurrentBulletinIdx] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true)
    }
  }, [])

  const currentBulletin = MUNADI_BULLETINS[currentBulletinIdx]

  // Play Munadi voice via browser TTS
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentBulletin.text)
      utterance.lang = 'hi-IN'
      utterance.rate = 0.95
      utterance.pitch = 1.05

      // Select Hindi voice if available
      const voices = window.speechSynthesis.getVoices()
      const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.name.includes('Hindi'))
      if (hindiVoice) utterance.voice = hindiVoice

      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
    }
  }

  // Pre-filled WhatsApp Messenger
  const openWhatsApp = (msg: string) => {
    const phone = '919829244321' // Village VDO/Helpdesk
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setShowWhatsAppMenu(false)
  }

  return (
    <>
      {/* ================= FLOATING ACTION BUTTONS (BOTTOM RIGHT) ================= */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {/* 1. Digital Munadi Ticker / Toggle Button */}
        <button
          onClick={() => {
            setShowMunadiBar(!showMunadiBar)
            setShowWhatsAppMenu(false)
          }}
          className={`flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl shadow-lg border backdrop-blur-md transition-all duration-200 group ${
            showMunadiBar
              ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-300'
              : 'bg-slate-900/90 hover:bg-slate-900 text-white border-white/20'
          }`}
          title="डिजिटल मुनादी व ध्वनि संदेश"
        >
          <div className="relative">
            <Megaphone size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-xs font-bold font-hindi hidden md:inline">
            डिजिटल मुनादी
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/30 text-amber-200 font-bold hidden lg:inline">
            आवाज में सुनें
          </span>
        </button>

        {/* 2. WhatsApp Citizen Connect Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowWhatsAppMenu(!showWhatsAppMenu)
              setShowMunadiBar(false)
            }}
            className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            title="ग्राम व्हाट्सएप सहायता केंद्र"
            aria-label="WhatsApp Helpline"
          >
            <MessageCircle size={26} className="fill-current" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
            </span>
          </button>

          {/* WhatsApp Quick Menu Flyout */}
          {showWhatsAppMenu && (
            <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 animate-rise z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#25D366] flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 font-hindi leading-none">
                      मोती नगर नागरिक व्हाट्सएप
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-medium">● 24x7 ऑनलाइन सहायता</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowWhatsAppMenu(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-xs font-hindi">
                <button
                  onClick={() => openWhatsApp('नमस्ते! मुझे मोती नगर ई-मित्र व सरकारी सेवाओं की जानकारी चाहिए।')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-100 text-left transition flex items-center justify-between group"
                >
                  <span>🏛️ ई-मित्र व सेवा पूछताछ</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => openWhatsApp('नमस्ते! मुझे मेरे राशन कार्ड / प्रमाण पत्र आवेदन का स्टेटस जानना है।')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-100 text-left transition flex items-center justify-between group"
                >
                  <span>📜 प्रमाण पत्र व राशन स्टेटस</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => openWhatsApp('नमस्ते! मुझे मोती नगर में सड़क/बिजली/पानी की समस्या की शिकायत दर्ज करानी है।')}
                  className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-800 hover:text-rose-900 border border-slate-100 text-left transition flex items-center justify-between group"
                >
                  <span>⚠️ जनसमस्या / शिकायत दर्ज करें</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => openWhatsApp('नमस्ते! कृपया मुझे मोती नगर ग्राम आधिकारिक डिजिटल व्हाट्सएप ग्रुप में जोड़ें।')}
                  className="w-full p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send size={13} />
                  <span>व्हाट्सएप पर सीधी चैट शुरू करें</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Emergency SOS Red Speed Dial Button */}
        <button
          onClick={() => {
            setShowSosModal(true)
            setShowWhatsAppMenu(false)
            setShowMunadiBar(false)
          }}
          className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-red-400/40 animate-pulse hover:animate-none transition-all duration-300"
          title="आपातकालीन 24x7 SOS सहायता"
        >
          <AlertTriangle size={18} className="text-amber-300 animate-bounce" />
          <span className="font-hindi tracking-wide font-black">24x7 SOS</span>
        </button>
      </div>

      {/* ================= DIGITAL MUNADI FLOATING BAR ================= */}
      {showMunadiBar && (
        <div className="fixed bottom-24 sm:bottom-24 right-3 sm:right-6 max-w-sm sm:max-w-md w-[calc(100vw-24px)] bg-slate-950 text-white rounded-3xl p-4 shadow-2xl border border-amber-500/40 z-50 animate-rise">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                <Megaphone size={16} />
              </span>
              <div>
                <h4 className="text-xs font-bold font-hindi text-amber-300">
                  डिजिटल ग्राम मुनादी (आधिकारिक घोषणा)
                </h4>
                <span className="text-[10px] text-slate-400 font-hindi">
                  घोषणा संख्या {currentBulletinIdx + 1} / {MUNADI_BULLETINS.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {speechSupported && (
                <button
                  onClick={handleToggleSpeech}
                  className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    isSpeaking
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white/10 hover:bg-white/20 text-amber-300'
                  }`}
                  title={isSpeaking ? 'आवाज रोकें' : 'बोलकर सुनें'}
                >
                  {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  <span className="text-[10px] hidden sm:inline">
                    {isSpeaking ? 'रोकें' : 'सुनें'}
                  </span>
                </button>
              )}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                  }
                  setIsSpeaking(false)
                  setShowMunadiBar(false)
                }}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-white font-hindi">
                {currentBulletin.title}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[9px]">
                {currentBulletin.date}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-hindi leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/10">
              {currentBulletin.text}
            </p>

            {/* Audio Wave Indicator */}
            {isSpeaking && (
              <div className="flex items-center justify-center gap-1 py-1 text-amber-400 text-[10px] font-hindi font-medium">
                <span>मुनादी वाचन जारी है...</span>
                <span className="w-1 h-3 bg-amber-400 rounded-full animate-bounce" />
                <span className="w-1 h-4 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            {/* Carousel Switcher */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                  }
                  setIsSpeaking(false)
                  setCurrentBulletinIdx((prev) =>
                    prev === 0 ? MUNADI_BULLETINS.length - 1 : prev - 1
                  )
                }}
                className="text-[11px] text-slate-400 hover:text-white font-hindi"
              >
                &larr; पिछली घोषणा
              </button>
              <div className="flex gap-1">
                {MUNADI_BULLETINS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentBulletinIdx ? 'bg-amber-400 w-4' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                  }
                  setIsSpeaking(false)
                  setCurrentBulletinIdx((prev) =>
                    prev === MUNADI_BULLETINS.length - 1 ? 0 : prev + 1
                  )
                }}
                className="text-[11px] text-slate-400 hover:text-white font-hindi"
              >
                अगली घोषणा &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMERGENCY 24x7 SOS SPEED DIAL MODAL ================= */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-red-300 animate-rise space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <ShieldAlert size={22} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base font-hindi">
                    24x7 आपातकालीन जन-सहायता स्पीड डायल
                  </h3>
                  <p className="text-[11px] text-slate-500 font-hindi">
                    मोती नगर · ग्राम पंचायत गुढ़ा · तहसील इन्द्रगढ़ (बूंदी)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSosModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Warning Notice */}
            <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-800 font-hindi flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-600 shrink-0" />
              <span>
                आपातकाल में किसी भी नंबर पर क्लिक करके तुरंत सीधी कॉल मिलाएं। सभी हेल्पलाइन नंबर 24 घंटे सक्रिय हैं।
              </span>
            </div>

            {/* Contact Cards Grid */}
            <div className="space-y-2.5">
              {EMERGENCY_CONTACTS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.bg}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 font-hindi">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 font-hindi">
                          {item.sub}
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${item.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-mono font-extrabold text-xs flex items-center gap-1.5 transition shrink-0 shadow-sm"
                    >
                      <PhoneCall size={13} />
                      <span>{item.phone}</span>
                    </a>
                  </div>
                )
              })}
            </div>

            {/* Close Button */}
            <div className="pt-2">
              <button
                onClick={() => setShowSosModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition font-hindi"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
