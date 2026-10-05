'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  Layers,
  FileCheck,
  Building2,
  AlertCircle,
  Landmark,
  Sprout,
  CreditCard,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  HeartPulse,
  UsersRound,
  Receipt,
  FolderOpen,
  Crosshair,
  Headphones,
  PhoneCall,
  X
} from 'lucide-react'

export interface SidebarNavItem {
  id: string
  label: string
  hindi: string
  icon: any
  href: string
}

export const ALL_SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', hindi: 'डैशबोर्ड', icon: LayoutDashboard, href: '/' },
  { id: 'my-village', label: 'My Village', hindi: 'हमारा गाँव', icon: MapPin, href: '/village' },
  { id: 'panchayat', label: 'Gram Panchayat Gudha', hindi: 'ग्राम पंचायत गुढ़ा', icon: Landmark, href: '/panchayat' },
  { id: 'farmer-hub', label: 'Farmer Hub', hindi: '🌾 किसान हब (कृषि व मंडी)', icon: Sprout, href: '/farmer-hub' },
  { id: 'services', label: 'Village Services', hindi: 'ग्राम सेवाएं', icon: Layers, href: '/services' },
  { id: 'certificates', label: 'Certificates', hindi: 'प्रमाण पत्र', icon: FileCheck, href: '/certificates' },
  { id: 'schemes', label: 'Government Schemes', hindi: 'सरकारी योजनाएं', icon: Building2, href: '/schemes' },
  { id: 'grievance', label: 'Grievance / Complaint', hindi: 'शिकायत / सुझाव', icon: AlertCircle, href: '/grievance' },
  { id: 'property', label: 'Property & Land Info', hindi: 'भूमि व संपत्ति', icon: Landmark, href: '/property' },
  { id: 'ration', label: 'Ration Card Services', hindi: 'राशन कार्ड सेवा', icon: CreditCard, href: '/ration' },
  { id: 'pension', label: 'Pension Schemes', hindi: 'पेंशन योजनाएं', icon: HeartHandshake, href: '/pension' },
  { id: 'jobs', label: 'Job & Opportunities', hindi: 'रोजगार व अवसर', icon: Briefcase, href: '/jobs' },
  { id: 'education', label: 'Education Services', hindi: 'शिक्षा सेवाएं', icon: GraduationCap, href: '/education' },
  { id: 'health', label: 'Health Services', hindi: 'स्वास्थ्य सेवाएं', icon: HeartPulse, href: '/health' },
  { id: 'birth-death', label: 'Birth & Death Registration', hindi: 'जन्म व मृत्यु पंजीयन', icon: UsersRound, href: '/certificates' },
  { id: 'tax', label: 'Tax & Utility Payments', hindi: 'कर व बिल भुगतान', icon: Receipt, href: '/tax' },
  { id: 'documents', label: 'Documents & Forms', hindi: 'दस्तावेज व फॉर्म', icon: FolderOpen, href: '/documents' },
  { id: 'tracking', label: 'Track Applications', hindi: 'आवेदन स्थिति जांचें', icon: Crosshair, href: '/certificates#track' },
]

interface PortalSidebarProps {
  activeId?: string
  onSelectNav?: (id: string) => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

export function PortalSidebar({
  activeId,
  onSelectNav,
  mobileOpen = false,
  onCloseMobile,
}: PortalSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col justify-between min-h-full p-3.5 pb-6">
      <div>
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 lg:hidden">
          <span className="text-xs font-bold text-white tracking-wider uppercase">Online Services Menu</span>
          <button
            onClick={onCloseMobile}
            className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Section Label: Online Services */}
        <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Online Services
        </div>

        {/* Complete All-Inclusive Sidebar Navigation Items */}
        <nav className="space-y-0.5">
          {ALL_SIDEBAR_NAV_ITEMS.map((item) => {
            const Icon = item.icon

            // Determine if item is active based on current path or explicit activeId
            const isActive = activeId
              ? activeId === item.id
              : pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onCloseMobile}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#1976D2] text-white shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Need Help Card & Bottom Artwork */}
      <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80">
        <div className="rounded-2xl bg-[#091527] border border-slate-700/60 p-3.5 text-center shadow-lg">
          <div className="w-10 h-10 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center mx-auto mb-2 border border-blue-500/30">
            <Headphones size={18} />
          </div>
          <div className="text-xs font-bold text-white">Need Help?</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Contact Gram Panchayat</div>
          <a
            href="tel:0747224400"
            className="mt-2.5 inline-block w-full py-2 bg-[#1976D2] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Call Now
          </a>
        </div>

        {/* Sandstone Temple Silhouette Artwork */}
        <div className="relative h-14 overflow-hidden rounded-xl bg-gradient-to-t from-amber-950/20 to-transparent flex items-end justify-center pb-1">
          <svg viewBox="0 0 160 48" className="w-28 h-10 text-amber-500/30" fill="currentColor">
            <path d="M80 6L84 14H76L80 6Z" />
            <path d="M72 20C72 16 75.5 13 80 13C84.5 13 88 16 88 20H72Z" />
            <rect x="73" y="20" width="2" height="18" rx="1" />
            <rect x="79" y="20" width="2" height="18" rx="1" />
            <rect x="85" y="20" width="2" height="18" rx="1" />
            <rect x="68" y="38" width="24" height="4" rx="1" />
            <circle cx="62" cy="40" r="5" fill="#15803D" opacity="0.6" />
            <circle cx="98" cy="40" r="5" fill="#15803D" opacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sticky Static Sidebar: Stays in place when main page content is scrolled! */}
      <aside className="w-64 shrink-0 bg-[#0c182d] text-white sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto hidden lg:block border-r border-slate-800/90 scrollbar-thin z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed top-0 bottom-0 left-0 w-72 bg-[#0c182d] text-white shadow-2xl z-50 overflow-y-auto scrollbar-thin">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
