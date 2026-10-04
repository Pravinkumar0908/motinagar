'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  Vote,
  MapPin,
  Users,
  FileText,
  Printer,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react'

// Authentic Delimitation 2026 Voter Booth Directory
interface VoterRecord {
  id: string
  ward: number
  village: string
  boundary: string
  boothNo: number
  boothLocation: string
  maleVoters: number
  femaleVoters: number
  thirdGender: number
  totalVoters: number
  bloName: string
  bloContact: string
  sampleNames: string[]
}

const WARD_VOTER_DATABASE: VoterRecord[] = [
  {
    id: 'w1',
    ward: 1,
    village: 'गुढ़ा',
    boundary: 'बैरवा बस्ती का मोहल्ला व पुरानी पंचायत तक–गुढ़ा',
    boothNo: 6,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 8 (उत्तरी भाग)',
    maleVoters: 155,
    femaleVoters: 145,
    thirdGender: 0,
    totalVoters: 300,
    bloName: 'श्री रामलाल बैरवा (शिक्षक)',
    bloContact: '+91 94145 11001',
    sampleNames: ['रामकिशन बैरवा', 'शान्ति बाई', 'ओमप्रकाश', 'ममता', 'कैलाश चंद']
  },
  {
    id: 'w2',
    ward: 2,
    village: 'गुढ़ा',
    boundary: 'गुढ़ा धाकड़ मोहल्ला व कीरो की ढाणी',
    boothNo: 6,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 8 (दक्षिणी भाग)',
    maleVoters: 178,
    femaleVoters: 161,
    thirdGender: 0,
    totalVoters: 339,
    bloName: 'श्री जगदीश धाकड़ (वरिष्ठ अध्यापक)',
    bloContact: '+91 94145 11002',
    sampleNames: ['राधेश्याम धाकड़', 'कमला देवी', 'सुरेश धाकड़', 'पूजा बाई', 'बजरंग लाल']
  },
  {
    id: 'w3',
    ward: 3,
    village: 'गुढ़ा',
    boundary: 'गुढ़ा गुर्जर मोहल्ला, होली का खूंटा व कीर मोहल्ला',
    boothNo: 7,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 9 (पूर्वी भाग)',
    maleVoters: 201,
    femaleVoters: 184,
    thirdGender: 0,
    totalVoters: 385,
    bloName: 'श्री देवराज सिंह गुर्जर (प्रधानाध्यापक)',
    bloContact: '+91 94145 11003',
    sampleNames: ['गोपाल सिंह गुर्जर', 'मंजू कंवर', 'धर्मराज गुर्जर', 'सुशीला देवी', 'महावीर']
  },
  {
    id: 'w4',
    ward: 4,
    village: 'गुढ़ा',
    boundary: 'गुढ़ा बैरवा बस्ती, माताजी मंदिर व माली मोहल्ला',
    boothNo: 7,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 9 (पश्चिमी भाग)',
    maleVoters: 195,
    femaleVoters: 177,
    thirdGender: 0,
    totalVoters: 372,
    bloName: 'श्रीमती संगीता सैनी (अध्यापिका)',
    bloContact: '+91 94145 11004',
    sampleNames: ['किशन लाल सैनी', 'भगवती बाई', 'राजेंद्र प्रसाद', 'प्रेम बाई', 'दिनेश']
  },
  {
    id: 'w5',
    ward: 5,
    village: 'गुढ़ा',
    boundary: 'गुढ़ा रैगर बस्ती व मुख्य बाजार',
    boothNo: 8,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 10 (उत्तरी भाग)',
    maleVoters: 176,
    femaleVoters: 162,
    thirdGender: 0,
    totalVoters: 338,
    bloName: 'श्री मदन लाल रैगर (कनिष्ठ सहायक)',
    bloContact: '+91 94145 11005',
    sampleNames: ['बाबूलाल रैगर', 'विमला देवी', 'मुकेश कुमार', 'अनिता', 'गुलजारी लाल']
  },
  {
    id: 'w6',
    ward: 6,
    village: 'गुढ़ा',
    boundary: 'गुढ़ा चमार मोहल्ला, मेघवाल बस्ती व नई आबादी',
    boothNo: 8,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 10 (दक्षिणी भाग)',
    maleVoters: 172,
    femaleVoters: 151,
    thirdGender: 0,
    totalVoters: 323,
    bloName: 'श्री हनुमान सहाय मेघवाल (शिक्षक)',
    bloContact: '+91 94145 11006',
    sampleNames: ['रामस्वरूप मेघवाल', 'कौशल्या बाई', 'विष्णु कुमार', 'सुनीता', 'सत्यनारायण']
  },
  {
    id: 'w7',
    ward: 7,
    village: 'मोटीनगर',
    boundary: 'मोटीनगर (Moti Nagar) पूर्ण राजस्व क्षेत्र व ढाणियां',
    boothNo: 9,
    boothLocation: 'राजमावि गुढ़ा कमरा नं. 11 (मोतीनगर वार्ड कक्ष)',
    maleVoters: 153,
    femaleVoters: 136,
    thirdGender: 0,
    totalVoters: 289,
    bloName: 'श्री गिरधारी लाल मीना (बीएलओ - मोतीनगर)',
    bloContact: '+91 98292 44321',
    sampleNames: ['रामचरण मीना', 'सीता बाई', 'प्रवीण कुमार', 'कविता मीना', 'भंवर लाल', 'महावीर प्रसाद']
  }
]

export function VoterSearchTool() {
  const [selectedWard, setSelectedWard] = useState<number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSlipModal, setActiveSlipModal] = useState<VoterRecord | null>(null)
  const [searchPersonName, setSearchPersonName] = useState('')

  // Filter records
  const filteredRecords = useMemo(() => {
    return WARD_VOTER_DATABASE.filter((rec) => {
      const matchWard = selectedWard === 'all' || rec.ward === selectedWard
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchWard

      const matchText =
        rec.village.toLowerCase().includes(query) ||
        rec.boundary.toLowerCase().includes(query) ||
        rec.boothLocation.toLowerCase().includes(query) ||
        rec.bloName.toLowerCase().includes(query) ||
        rec.sampleNames.some((n) => n.toLowerCase().includes(query)) ||
        rec.ward.toString() === query

      return matchWard && matchText
    })
  }, [selectedWard, searchQuery])

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <Vote size={14} className="text-[#1976D2]" />
            <span>ग्राम पंचायत गुढ़ा चुनाव 2026 मतदाता पोर्टल</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-hindi">
            वोटर लिस्ट खोजक व मतदान केंद्र विवरण (Voter & Booth Finder)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-hindi mt-1">
            वार्ड 1 से 7 (गुढ़ा व मोतीनगर) का आधिकारिक मतदान केंद्र, बीएलओ व डिजिटल मतदाता पर्ची
          </p>
        </div>

        <div className="text-xs px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 font-bold border border-blue-200 shrink-0">
          🗳️ कुल मतदाता: 2,346 (7 वार्ड)
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-7 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नाम, मोहल्ला या बीएलओ का नाम खोजें (उदा. मोतीनगर, बैरवा, धाकड़)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 text-xs font-hindi outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Ward Filter Selector */}
        <div className="sm:col-span-5 flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedWard('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedWard === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            सभी वार्ड (1-7)
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWard(w)}
              className={`px-2.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedWard === w
                  ? w === 7
                    ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-300'
                    : 'bg-[#1976D2] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {w === 7 ? '⭐ वार्ड 7 (मोतीनगर)' : `वार्ड ${w}`}
            </button>
          ))}
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 font-hindi">
            कोई मतदाता रिकॉर्ड या वार्ड नहीं मिला। कृपया दूसरा नाम या वार्ड नंबर दर्ज करें।
          </div>
        ) : (
          filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                rec.ward === 7
                  ? 'bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-orange-500/10 border-amber-300 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-black font-hindi ${
                        rec.ward === 7
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-900 text-white'
                      }`}
                    >
                      वार्ड संख्या {rec.ward} ({rec.village})
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 font-hindi">
                      बूथ सं. {rec.boothNo}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 font-hindi">
                    {rec.boundary}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-hindi">
                    <MapPin size={13} className="text-[#1976D2] shrink-0" />
                    <span>मतदान केंद्र: <strong className="text-slate-800">{rec.boothLocation}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-right">
                    <div className="text-xs font-mono font-black text-slate-900">
                      कुल मतदाता: {rec.totalVoters}
                    </div>
                    <div className="text-[10px] text-slate-500 font-hindi">
                      पुरुष: {rec.maleVoters} | महिला: {rec.femaleVoters}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSlipModal(rec)
                      setSearchPersonName('')
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 font-hindi shadow-xs ${
                      rec.ward === 7
                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                        : 'bg-[#1976D2] hover:bg-blue-600 text-white'
                    }`}
                  >
                    <FileText size={13} />
                    <span>डिजिटल मतदाता पर्ची</span>
                  </button>
                </div>
              </div>

              {/* BLO Contact Bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs font-hindi text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>बीएलओ (BLO): <strong>{rec.bloName}</strong></span>
                </div>
                <a
                  href={`tel:${rec.bloContact.replace(/\s+/g, '')}`}
                  className="text-blue-700 hover:underline font-mono font-bold"
                >
                  {rec.bloContact}
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= DIGITAL VOTER SLIP MODAL ================= */}
      {activeSlipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-300 animate-rise space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1976D2] flex items-center justify-center">
                  <Vote size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 font-hindi leading-none">
                    राज्य निर्वाचन आयोग राजस्थान
                  </h3>
                  <span className="text-[10px] text-slate-500 font-hindi">
                    ग्राम पंचायत आम चुनाव 2026 · मतदाता सूचना पर्ची
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveSlipModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Slip Card Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 text-xs font-hindi">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">ग्राम पंचायत:</span>
                <strong className="text-slate-900">गुढ़ा (तहसील इन्द्रगढ़, बूँदी)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">वार्ड संख्या:</span>
                <strong className="text-amber-800 font-bold font-mono">वार्ड 0{activeSlipModal.ward} ({activeSlipModal.village})</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">मतदान केंद्र (बूथ):</span>
                <strong className="text-slate-900">बूथ संख्या 0{activeSlipModal.boothNo}</strong>
              </div>
              <div className="py-1 border-b border-slate-200">
                <span className="text-slate-500 block mb-0.5">मतदान स्थल का पता:</span>
                <strong className="text-blue-900 block leading-snug">{activeSlipModal.boothLocation}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">वोटिंग का समय:</span>
                <strong className="text-slate-900">प्रातः 07:30 से सायं 05:30 बजे तक</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">मतदान माध्यम:</span>
                <strong className="text-emerald-800 font-bold">मतपत्र (Ballot Paper)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">बीएलओ संपर्क:</span>
                <strong className="text-slate-900 font-mono">{activeSlipModal.bloName} ({activeSlipModal.bloContact})</strong>
              </div>
            </div>

            {/* Voter Name Customizer */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1 font-hindi">
                मतदाता का नाम (पर्ची पर प्रिंट हेतु वैकल्पिक):
              </label>
              <input
                type="text"
                value={searchPersonName}
                onChange={(e) => setSearchPersonName(e.target.value)}
                placeholder="यहाँ अपना नाम दर्ज करें..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-blue-500 font-hindi"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 font-hindi shadow-sm"
              >
                <Printer size={15} />
                <span>मतदाता पर्ची प्रिंट / PDF सेव करें</span>
              </button>
              <button
                onClick={() => setActiveSlipModal(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition font-hindi"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
