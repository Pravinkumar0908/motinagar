'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PortalPreloader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [routeProgress, setRouteProgress] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  // Clean top navigation route loader
  useEffect(() => {
    setIsNavigating(true)
    setRouteProgress(40)
    const t1 = setTimeout(() => setRouteProgress(80), 100)
    const t2 = setTimeout(() => {
      setRouteProgress(100)
      setTimeout(() => {
        setIsNavigating(false)
        setRouteProgress(0)
      }, 180)
    }, 250)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  // Simple, fast initial loading screen (~650ms)
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true)
    }, 600)

    const timer2 = setTimeout(() => {
      setLoading(false)
    }, 850)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <>
      {/* 1. Subtle, Minimal Top Route Progress Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none bg-slate-100">
          <div
            className="h-full bg-emerald-600 transition-all duration-200 ease-out"
            style={{ width: `${routeProgress}%` }}
          />
        </div>
      )}

      {/* 2. Completely Simple, Minimal & Clean Preloader */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white text-slate-800 transition-opacity duration-300 ease-out ${
            fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center gap-4 text-center px-4">
            {/* Minimal Logo with clean subtle spinner */}
            <div className="relative flex items-center justify-center w-16 h-16">
              {/* Clean thin spinner */}
              <div className="absolute inset-0 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
              {/* Emblem */}
              <img
                src="/favicon.svg"
                alt="Moti Nagar Logo"
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* Simple Clean Title */}
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                मोती नगर ग्राम कनेक्ट
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ग्राम पंचायत गुढ़ा (बूंदी) • लोड हो रहा है...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
