'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPinned, Pause, Play } from 'lucide-react'

const slides = [
  { image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85', title: 'खुले खेत, खुला आसमान', meta: 'मोतिनगर की मिट्टी और मेहनत' },
  { image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85', title: 'हमारा गांव, हमारी पहचान', meta: 'साथ मिलकर आगे बढ़ता मोतिनगर' },
  { image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85', title: 'प्रकृति के बीच जीवन', meta: 'हर मौसम में अपनी अलग कहानी' },
]

export function VillageCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5200)
    return () => window.clearInterval(timer)
  }, [paused])

  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length)
  const slide = slides[active]

  return (
    <div className="group relative min-h-[350px] overflow-hidden rounded-[2rem_2rem_5rem_2rem] bg-[#b9ceb2] shadow-[0_24px_60px_rgba(36,91,69,.16)] sm:min-h-[410px] lg:min-h-[480px]">
      {slides.map((item, index) => <img key={item.image} src={item.image} alt={item.title} className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] ${index === active ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}`} />)}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,53,36,.03)_25%,rgba(20,49,32,.74)_100%)]" />
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#1f4f3b]/80 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm"><MapPinned size={14} /> मोतिनगर की झलकियां</div>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-7 sm:bottom-7"><div><p className="font-hindi text-lg font-bold sm:text-2xl">{slide.title}</p><p className="mt-1 font-hindi text-xs text-white/75 sm:text-sm">{slide.meta}</p></div><div className="flex shrink-0 gap-2 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100"><button aria-label="पिछली तस्वीर" onClick={() => move(-1)} className="rounded-full border border-white/25 bg-white/15 p-2.5 backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/30"><ChevronLeft size={18} /></button><button aria-label={paused ? 'चलाएं' : 'रोकें'} onClick={() => setPaused(!paused)} className="rounded-full border border-white/25 bg-white/15 p-2.5 backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/30">{paused ? <Play size={16} /> : <Pause size={16} />}</button><button aria-label="अगली तस्वीर" onClick={() => move(1)} className="rounded-full border border-white/25 bg-white/15 p-2.5 backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/30"><ChevronRight size={18} /></button></div></div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 transition-transform duration-500 group-hover:-translate-y-1 sm:bottom-3">{slides.map((item, index) => <button key={item.title} aria-label={`${index + 1}वीं तस्वीर`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? 'w-7 bg-white' : 'w-1.5 bg-white/50'}`} />)}</div>
    </div>
  )
}
