'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Info,
  MapPin,
  Landmark,
  Layers,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Sprout,
  Palmtree,
  Image as ImageIcon,
  Mail,
  Search,
  Bell,
  User,
  X,
  Menu,
  FileCheck
} from 'lucide-react'

interface PortalNavbarProps {
  onMobileMenuToggle?: () => void
}

export function PortalNavbar({ onMobileMenuToggle }: PortalNavbarProps) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const navLinks = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Our Village', icon: MapPin, href: '/village' },
    { name: 'Panchayat', icon: Landmark, href: '/panchayat' },
    { name: 'Services', icon: Layers, href: '/services' },
    { name: 'Certificates', icon: FileCheck, href: '/certificates' },
    { name: 'Development', icon: Sparkles, href: '/services#development' },
    { name: 'Education', icon: GraduationCap, href: '/services#education' },
    { name: 'Health', icon: HeartPulse, href: '/services#health' },
    { name: 'Gallery', icon: ImageIcon, href: '/#gallery' },
    { name: 'Contact', icon: Mail, href: '/#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center gap-2">
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              aria-label="Toggle Navigation"
              className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
            >
              <Menu size={19} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/90 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 48 48" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                <path d="M24 4L26 8H22L24 4Z" fill="#D97706" />
                <circle cx="24" cy="3.5" r="1.5" fill="#F59E0B" />
                <path d="M16 16C16 11.5817 19.5817 8 24 8C28.4183 8 32 11.5817 32 16H16Z" fill="#B45309" />
                <path d="M18 16C18 12.6863 20.6863 10 24 10C27.3137 10 30 12.6863 30 16H18Z" fill="#D97706" />
                <rect x="17" y="16" width="2" height="15" fill="#92400E" rx="0.5" />
                <rect x="23" y="16" width="2" height="15" fill="#B45309" rx="0.5" />
                <rect x="29" y="16" width="2" height="15" fill="#92400E" rx="0.5" />
                <rect x="13" y="31" width="22" height="4" fill="#78350F" rx="1" />
                <rect x="11" y="35" width="26" height="4" fill="#92400E" rx="1" />
                <circle cx="9" cy="34" r="5" fill="#15803D" opacity="0.85" />
                <circle cx="39" cy="34" r="5" fill="#15803D" opacity="0.85" />
              </svg>
            </div>
            <div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight leading-none">
                Moti Nagar
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide mt-0.5 leading-none">
                Bundi, Rajasthan
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden 2xl:flex items-center gap-1 text-xs font-semibold text-slate-600">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === pathname ||
              (item.href === '/services' && pathname.startsWith('/services')) ||
              (item.href === '/certificates' && pathname.startsWith('/certificates'))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1976D2] text-white shadow-xs font-bold'
                    : 'hover:text-[#1976D2] hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon size={14} strokeWidth={isActive ? 2.4 : 2} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Input Box */}
          <div className="relative hidden md:block w-40 lg:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200/70 focus:bg-white rounded-full border border-slate-200 outline-none focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Search Toggle for Mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <Search size={15} />
          </button>

          {/* Notification Bell with Badge 3 */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            >
              <Bell size={16} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-11 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-rise">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">सूचनाएं (Notifications)</span>
                  <button onClick={() => setNotificationOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <Link href="/services" onClick={() => setNotificationOpen(false)} className="block p-2 bg-blue-50 hover:bg-blue-100/70 rounded-xl transition">
                    <div className="font-bold text-blue-900">ग्राम सभा बैठक</div>
                    <div className="text-[11px] text-blue-700 mt-0.5">10 अक्टूबर सुबह 11:00 बजे पंचायत भवन में।</div>
                  </Link>
                  <Link href="/certificates" onClick={() => setNotificationOpen(false)} className="block p-2 bg-emerald-50 hover:bg-emerald-100/70 rounded-xl transition">
                    <div className="font-bold text-emerald-900">डिजिटल प्रमाण पत्र तैयार</div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">आपका मूल निवास प्रमाण पत्र जारी हो गया है।</div>
                  </Link>
                  <Link href="/services" onClick={() => setNotificationOpen(false)} className="block p-2 bg-amber-50 hover:bg-amber-100/70 rounded-xl transition">
                    <div className="font-bold text-amber-900">पीएम आवास योजना नई सूची</div>
                    <div className="text-[11px] text-amber-700 mt-0.5">पात्र लाभार्थियों की संशोधित सूची देखें।</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile: Pravin Kumar / Villager */}
          <button
            onClick={() => setLoginModalOpen(true)}
            className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 hover:opacity-90 transition text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1976D2] to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              PK
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 leading-none">Pravin Kumar</div>
              <div className="text-[10px] text-slate-400 font-medium leading-none mt-1">Villager</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {searchOpen && (
        <div className="p-3 border-t border-slate-200 bg-white md:hidden">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="सेवा, प्रमाण पत्र अथवा योजना खोजें..."
              className="w-full text-xs bg-slate-100 py-1.5 px-3 rounded-full outline-none font-hindi"
            />
            <button onClick={() => setSearchOpen(false)} className="text-xs text-slate-500 font-semibold px-1">
              बंद
            </button>
          </div>
        </div>
      )}

      {/* Login / Profile Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 animate-rise">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1976D2] flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Pravin Kumar</h3>
                  <p className="text-[10px] text-slate-500">Moti Nagar, Ward No. 04</p>
                </div>
              </div>
              <button onClick={() => setLoginModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 flex justify-between">
                <span className="text-slate-500">जन आधार सं.:</span>
                <span className="font-bold">4891-XXXX-0921</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex justify-between">
                <span className="text-slate-500">आवेदन स्थिति:</span>
                <span className="font-bold text-emerald-600">2 स्वीकृत, 1 विचाराधीन</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex justify-between">
                <span className="text-slate-500">पंजीकृत मोबाइल:</span>
                <span className="font-bold">98290-XXXXX</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <Link
                href="/certificates"
                onClick={() => setLoginModalOpen(false)}
                className="flex-1 bg-[#1976D2] hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-xl text-center transition"
              >
                मेरे प्रमाण पत्र
              </Link>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
