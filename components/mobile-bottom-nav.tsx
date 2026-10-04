'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  MapPin,
  Layers,
  FileCheck,
  Search,
  Menu,
  PhoneCall
} from 'lucide-react'

interface MobileBottomNavProps {
  onMenuClick?: () => void
}

export function MobileBottomNav({ onMenuClick }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', hindi: 'मुख्य', icon: Home, href: '/' },
    { label: 'Village', hindi: 'हमारा गाँव', icon: MapPin, href: '/village' },
    { label: 'Services', hindi: 'सेवाएं', icon: Layers, href: '/services' },
    { label: 'Certificates', hindi: 'प्रमाण पत्र', icon: FileCheck, href: '/certificates', badge: 'New' },
    { label: 'Help', hindi: 'हेल्पलाइन', icon: PhoneCall, href: 'tel:0747224400', isExternal: true },
  ]

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-1.5 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition text-slate-500 hover:text-[#1976D2]"
              >
                <div className="relative">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-bold font-hindi mt-0.5 leading-none">
                  {item.hindi}
                </span>
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-[#1976D2] font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1 -right-3 px-1 py-0.2 bg-[#ef4444] text-white text-[8px] font-extrabold rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-hindi mt-0.5 leading-none">
                {item.hindi}
              </span>
            </Link>
          )
        })}

        {/* Menu Drawer Button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-900 transition"
          >
            <Menu size={20} strokeWidth={2} />
            <span className="text-[10px] font-hindi mt-0.5 leading-none">
              मेन्यू
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
