'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export function PortalPreloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(12)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [routeProgress, setRouteProgress] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  const QUOTES = [
    '🌾 समृद्ध गाँव • आत्मनिर्भर पंचायत • डिजिटल सशक्तिकरण',
    '🚜 कोटा भामाशाह मंडी भाव एवं रियल-टाइम कृषि मौसम',
    '🗳️ ग्राम पंचायत गुढ़ा 2026 परिसीमन व मतदाता केंद्र',
    '🚨 24x7 आपातकालीन सहायता व ई-मित्र डिजिटल सेवाएं',
  ]

  // Track page transitions for sleek top progress bar
  useEffect(() => {
    setIsNavigating(true)
    setRouteProgress(35)
    const t1 = setTimeout(() => setRouteProgress(75), 120)
    const t2 = setTimeout(() => {
      setRouteProgress(100)
      setTimeout(() => {
        setIsNavigating(false)
        setRouteProgress(0)
      }, 250)
    }, 300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  // Initial Entrance Preloader
  useEffect(() => {
    // Only run if not already shown in current session to prevent excessive re-runs
    const hasSeenSplash = sessionStorage.getItem('motinagar_splash_seen')

    // If user has already visited in this session, show a very fast 400ms micro-splash
    const totalDuration = hasSeenSplash ? 500 : 1600
    const intervalTime = totalDuration / 20

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const step = Math.floor(Math.random() * 8) + 5
        return Math.min(100, prev + step)
      })
    }, intervalTime)

    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length)
    }, totalDuration / 3)

    const timer = setTimeout(() => {
      setProgress(100)
      setFadeOut(true)
      sessionStorage.setItem('motinagar_splash_seen', 'true')
      setTimeout(() => {
        setLoading(false)
      }, 550)
    }, totalDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(quoteInterval)
      clearTimeout(timer)
    }
  }, [])

  const handleSkip = () => {
    setFadeOut(true)
    setTimeout(() => setLoading(false), 200)
    sessionStorage.setItem('motinagar_splash_seen', 'true')
  }

  return (
    <>
      {/* 1. Ultra-Sleek Top Navigation Route Progress Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[99999] pointer-events-none bg-slate-900/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 transition-all duration-200 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            style={{ width: `${routeProgress}%` }}
          />
        </div>
      )}

      {/* 2. Full-Screen Royal Village Preloader Splash */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#031e17] text-white select-none transition-all duration-700 ease-out overflow-hidden ${
            fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Ambient Glowing Background Blobs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Central Logo & Rings Composition */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer Slow Rotating Dashed Ring */}
            <div
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-amber-400/40 animate-spin"
              style={{ animationDuration: '14s' }}
            />

            {/* Inner Fast Reverse Rotating Emerald Ring */}
            <div
              className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-emerald-400/30 border-t-amber-400/80 animate-spin"
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            />

            {/* Radiant Glowing Center Disc */}
            <div className="relative w-24 h-24 sm:w-30 sm:h-30 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-2.5 shadow-[0_0_50px_rgba(16,185,129,0.35)] border border-amber-400/50 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              {/* Flaticon Style Vector Emblem */}
              <div className="relative w-full h-full">
                <img
                  src="/favicon.svg"
                  alt="Moti Nagar Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(251,191,36,0.6)] animate-pulse"
                />
              </div>

              {/* Sparkle badge on corner */}
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md animate-bounce">
                <Sparkles size={13} className="text-slate-950 fill-amber-300" />
              </div>
            </div>
          </div>

          {/* Portal Title & Subtitle */}
          <div className="text-center px-4 max-w-md mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              डिजिटल ग्राम पोर्टल लोड हो रहा है
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1.5">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300 bg-clip-text text-transparent">
                मोती नगर
              </span>{' '}
              <span className="text-white">ग्राम कनेक्ट</span>
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/75 font-medium mb-6">
              ग्राम पंचायत गुढ़ा • तहसील इन्द्रगढ़ (बूंदी, राजस्थान)
            </p>

            {/* Sleek Golden Progress Bar */}
            <div className="w-64 sm:w-80 mx-auto">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300/90 mb-1.5 px-0.5">
                <span className="flex items-center gap-1 font-sans text-emerald-200/80 text-[11px]">
                  प्रणाली प्रारंभ...
                </span>
                <span className="font-bold">{progress}%</span>
              </div>

              <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-emerald-500/30 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-300 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Rotating Micro-Quotes */}
            <div className="h-8 mt-5 flex items-center justify-center">
              <p className="text-xs sm:text-[13px] text-emerald-300/80 font-normal transition-opacity duration-300 line-clamp-1 italic">
                {QUOTES[quoteIndex]}
              </p>
            </div>
          </div>

          {/* Skip Button at bottom */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 text-xs text-slate-400/70 hover:text-white px-3 py-1 rounded-md bg-slate-900/40 hover:bg-slate-900/80 border border-slate-700/40 transition"
          >
            स्किप करें (Skip) ➔
          </button>
        </div>
      )}
    </>
  )
}
