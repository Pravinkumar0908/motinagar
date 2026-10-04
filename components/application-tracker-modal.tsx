'use client'

import React, { useState } from 'react'
import {
  Search,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertCircle,
  X,
  FileText,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react'

interface ApplicationRecord {
  token: string
  applicantName: string
  serviceName: string
  appliedDate: string
  status: 'Approved' | 'In Progress' | 'Under Scrutiny' | 'Pending Documents'
  currentStep: number // 1 to 4
  remarks: string
  officerInCharge: string
  expectedDate: string
}

const DEMO_APPLICATIONS: Record<string, ApplicationRecord> = {
  'MN-2026-9481': {
    token: 'MN-2026-9481',
    applicantName: 'रामचरण मीना',
    serviceName: 'मूल निवास प्रमाण पत्र (Bonafide Certificate)',
    appliedDate: '01.10.2026',
    status: 'Approved',
    currentStep: 4,
    remarks: 'डिजिटल हस्ताक्षर पूर्ण। प्रमाण पत्र ऑनलाइन डाउनलोड हेतु तैयार है।',
    officerInCharge: 'तहसीलदार कार्यालय इन्द्रगढ़ / VDO गुढ़ा',
    expectedDate: '03.10.2026'
  },
  'MN-2026-1024': {
    token: 'MN-2026-1024',
    applicantName: 'कमला देवी धाकड़',
    serviceName: 'राशन कार्ड परिवार सदस्य नाम जोड़ना (NFSA)',
    appliedDate: '02.10.2026',
    status: 'In Progress',
    currentStep: 2,
    remarks: 'पटवारी व VDO द्वारा स्थल सत्यापन रिपोर्ट प्रक्रियाधीन है।',
    officerInCharge: 'श्री सुरेश चंद मीना (ग्राम विकास अधिकारी)',
    expectedDate: '08.10.2026'
  },
  'MN-2026-8872': {
    token: 'MN-2026-8872',
    applicantName: 'बंशीलाल बैरवा',
    serviceName: 'मुख्यमंत्री वृद्धजन सम्मान पेंशन योजना',
    appliedDate: '03.10.2026',
    status: 'Under Scrutiny',
    currentStep: 1,
    remarks: 'आवेदन ऑनलाइन पोर्टल पर पंजीकृत, बैंक खाता सत्यापन जारी।',
    officerInCharge: 'विकास अधिकारी, पंचायत समिति लाखेरी',
    expectedDate: '12.10.2026'
  }
}

export function ApplicationTrackerModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [tokenInput, setTokenInput] = useState('MN-2026-9481')
  const [searchedRecord, setSearchedRecord] = useState<ApplicationRecord | null>(
    DEMO_APPLICATIONS['MN-2026-9481']
  )
  const [notFound, setNotFound] = useState(false)

  if (!isOpen) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanToken = tokenInput.trim().toUpperCase()
    if (DEMO_APPLICATIONS[cleanToken]) {
      setSearchedRecord(DEMO_APPLICATIONS[cleanToken])
      setNotFound(false)
    } else {
      // Mock generate result for custom tokens so user always sees working data
      setSearchedRecord({
        token: cleanToken || 'MN-2026-CUSTOM',
        applicantName: 'नागरिक आवेदक',
        serviceName: 'ई-मित्र डिजिटल सेवा आवेदन',
        appliedDate: '04.10.2026',
        status: 'In Progress',
        currentStep: 2,
        remarks: 'आवेदन प्राप्त हुआ है। मोती नगर सेवा केंद्र स्तर पर जांच प्रक्रियाधीन है।',
        officerInCharge: 'ग्राम विकास अधिकारी (गुढ़ा / मोतीनगर)',
        expectedDate: '09.10.2026'
      })
      setNotFound(false)
    }
  }

  const steps = [
    { step: 1, title: 'आवेदन पंजीकृत', desc: 'ई-मित्र केंद्र' },
    { step: 2, title: 'दस्तावेज सत्यापन', desc: 'VDO / पटवारी' },
    { step: 3, title: 'अधिकारी अनुमोदन', desc: 'तहसीलदार / बीडीओ' },
    { step: 4, title: 'डिजिटल प्रमाण पत्र', desc: 'डाउनलोड तैयार' }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-300 animate-rise space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1976D2] flex items-center justify-center">
              <FileCheck size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base font-hindi">
                ई-सेवा आवेदन स्थिति ट्रैकर (Live Status)
              </h3>
              <p className="text-[11px] text-slate-500 font-hindi">
                प्रमाण पत्र, राशन कार्ड, पेंशन व राजस्व टोकन ट्रैकिंग
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X size={20} />
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-700 uppercase font-hindi">
            टोकन / संदर्भ संख्या (Token Number):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="उदा. MN-2026-9481..."
              className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 font-mono text-xs outline-none transition uppercase font-bold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-[#1976D2] hover:bg-blue-600 text-white font-bold text-xs transition flex items-center gap-1.5 font-hindi shadow-sm shrink-0"
            >
              <Search size={14} />
              <span>ट्रैक करें</span>
            </button>
          </div>

          {/* Quick Demo Pill Selectors */}
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-hindi text-slate-500 overflow-x-auto">
            <span>उदा. टोकन:</span>
            <button
              type="button"
              onClick={() => {
                setTokenInput('MN-2026-9481')
                setSearchedRecord(DEMO_APPLICATIONS['MN-2026-9481'])
              }}
              className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-mono"
            >
              MN-2026-9481 (स्वीकृत)
            </button>
            <button
              type="button"
              onClick={() => {
                setTokenInput('MN-2026-1024')
                setSearchedRecord(DEMO_APPLICATIONS['MN-2026-1024'])
              }}
              className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 font-mono"
            >
              MN-2026-1024 (प्रगति में)
            </button>
          </div>
        </form>

        {/* Application Result Card */}
        {searchedRecord && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono font-bold">
                  {searchedRecord.token}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 font-hindi mt-1">
                  {searchedRecord.serviceName}
                </h4>
                <div className="text-xs text-slate-600 font-hindi mt-0.5">
                  आवेदक: <strong>{searchedRecord.applicantName}</strong> · आवेदन तिथि: {searchedRecord.appliedDate}
                </div>
              </div>

              <span
                className={`text-[11px] px-2.5 py-1 rounded-full font-bold font-hindi shrink-0 ${
                  searchedRecord.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : searchedRecord.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {searchedRecord.status === 'Approved' ? 'स्वीकृत व जारी ✅' : 'प्रक्रियाधीन ⏳'}
              </span>
            </div>

            {/* 4-Step Interactive Progress Bar */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-1 relative">
                {steps.map((st) => {
                  const isCompleted = searchedRecord.currentStep >= st.step
                  const isCurrent = searchedRecord.currentStep === st.step
                  return (
                    <div key={st.step} className="text-center space-y-1">
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 text-slate-500'
                        } ${isCurrent ? 'ring-2 ring-emerald-300 ring-offset-2' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 size={15} /> : st.step}
                      </div>
                      <div className="text-[10px] font-bold text-slate-800 font-hindi leading-tight">
                        {st.title}
                      </div>
                      <div className="text-[9px] text-slate-500 font-hindi">
                        {st.desc}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Remarks and Authority */}
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5 text-xs font-hindi">
              <div className="flex items-center gap-1.5 text-slate-700">
                <AlertCircle size={14} className="text-blue-600 shrink-0" />
                <span>स्थिति टिप्पणी: <strong>{searchedRecord.remarks}</strong></span>
              </div>
              <div className="text-[11px] text-slate-500">
                अधिकृत अधिकारी: {searchedRecord.officerInCharge}
              </div>
            </div>

            {/* If Approved, download button */}
            {searchedRecord.status === 'Approved' && (
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 font-hindi shadow-sm"
              >
                <Download size={14} />
                <span>डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें</span>
              </button>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition font-hindi"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  )
}
