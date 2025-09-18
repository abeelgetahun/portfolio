"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TechIconsRow } from "@/components/ui/tech-icon"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Lock } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from 'react'
import { createPortal } from "react-dom"

interface ProjectCardProps {
  title: string
  description: string
  image?: string // backward compat
  images?: string[]
  tech: string[]
  github: string
  demo: string
  icon: string
  index: number
  rotateIntervalMs?: number
}

export default function ProjectCard({
  title,
  description,
  image,
  images,
  tech,
  github,
  demo,
  icon,
  index,
  rotateIntervalMs = 3500,
}: ProjectCardProps) {
  // Guard alias: some stale builds referenced unqualified `useState`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useState = React.useState
  const mergedImages = images && images.length > 0 ? images : image ? [image] : ["/placeholder.svg"]
  const [current, setCurrent] = React.useState(0) // logical index 0..n-1
  const [paused, setPaused] = React.useState(false) // retained for compatibility, no longer used to stop auto-rotate
  const [inView, setInView] = React.useState(false)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const pushedStateRef = useRef(false)
  const [mounted, setMounted] = React.useState(false)
  const touchStartX = useRef<number | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const inlineTouchStartX = useRef<number | null>(null)
  const inlineLastWheelTs = useRef<number>(0)
  const n = mergedImages.length
  // Inline sliding track state: includes clones at both ends => indices 0..n+1
  const [inlineSlide, setInlineSlide] = React.useState(1)
  const [inlineTransition, setInlineTransition] = React.useState(true)
  // Lightbox sliding track state
  const [lightboxSlide, setLightboxSlide] = React.useState(1)
  const [lightboxTransition, setLightboxTransition] = React.useState(true)

  // Keep inline sliding index in sync when images or current change (e.g., dot click)
  useEffect(() => {
    setInlineSlide(Math.min(Math.max(1, current + 1), n > 0 ? n : 1))
  }, [current, n])

  // Auto-rotate inline when in view and not in lightbox
  useEffect(() => {
    if (n <= 1 || !inView || lightboxOpen) return
    const id = setInterval(() => {
      setInlineTransition(true)
      setInlineSlide((s) => s + 1)
    }, rotateIntervalMs)
    return () => clearInterval(id)
  }, [n, rotateIntervalMs, inView, lightboxOpen])

  // Observe visibility of the card to throttle auto-rotation when off-screen
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.5
        setInView(visible)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(el)
    return () => {
      observer.unobserve(el)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (lightboxOpen) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox()
        if (!mergedImages || mergedImages.length <= 1) return
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
      const onPop = () => {
        // If user hits browser back, close the lightbox
        if (lightboxOpen) {
          setLightboxOpen(false)
          setLightboxIndex(null)
          pushedStateRef.current = false
          document.body.style.overflow = ''
        }
      }
      window.addEventListener('keydown', onKey)
      window.addEventListener('popstate', onPop)
      document.body.style.overflow = 'hidden'
      // Push a history state so browser back closes modal
      if (!pushedStateRef.current) {
        window.history.pushState({ lightbox: true }, '')
        pushedStateRef.current = true
      }
      return () => {
        window.removeEventListener('keydown', onKey)
        window.removeEventListener('popstate', onPop)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index)
    setLightboxSlide(index + 1)
    setLightboxTransition(true)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxIndex(null)
    setLightboxSlide(1)
    setLightboxTransition(true)
    if (pushedStateRef.current) {
      // Go back one step to clear pushed state
      window.history.back()
      pushedStateRef.current = false
    }
  }

  const nextImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    setLightboxTransition(true)
    setLightboxSlide((s) => s + 1)
  }

  const prevImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    setLightboxTransition(true)
    setLightboxSlide((s) => s - 1)
  }

  return (
    <Card
      ref={cardRef}
      className={`group transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-gray-200/60 bg-transparent hover:bg-gray-50/80 shadow-none overflow-hidden`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => openLightboxAt(current)}
        onTouchStart={(e) => { inlineTouchStartX.current = e.changedTouches[0].clientX }}
        onTouchEnd={(e) => {
          if (inlineTouchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - inlineTouchStartX.current
          inlineTouchStartX.current = null
          if (Math.abs(dx) < 40) return
          if (dx < 0) { setInlineTransition(true); setInlineSlide((s) => s + 1) }
          else { setInlineTransition(true); setInlineSlide((s) => s - 1) }
        }}
        onWheel={(e) => {
          if (!mergedImages || mergedImages.length <= 1) return
          const now = Date.now()
          if (now - inlineLastWheelTs.current < 250) return
          const any = e as unknown as WheelEvent
          const dx = any.deltaX || 0
          if (Math.abs(dx) < 10) return
          inlineLastWheelTs.current = now
          if (dx > 0) { setInlineTransition(true); setInlineSlide((s) => s + 1) }
          else { setInlineTransition(true); setInlineSlide((s) => s - 1) }
        }}
      >
        <div
          className="h-full w-full flex"
          style={{ transform: `translateX(-${inlineSlide * 100}%)`, transition: inlineTransition ? 'transform 500ms ease-out' : 'none' }}
          onTransitionEnd={() => {
            if (n <= 1) return
            // Sync logical current and wrap using clones
            if (inlineSlide === 0) {
              setInlineTransition(false)
              setInlineSlide(n)
              setCurrent(n - 1)
              // Re-enable transition on next tick
              setTimeout(() => setInlineTransition(true), 0)
            } else if (inlineSlide === n + 1) {
              setInlineTransition(false)
              setInlineSlide(1)
              setCurrent(0)
              setTimeout(() => setInlineTransition(true), 0)
            } else {
              setCurrent(inlineSlide - 1)
            }
          }}
        >
          {/* Clone last at start */}
          {n > 0 && (
            <div className="relative min-w-full h-full">
              <Image src={mergedImages[n - 1]} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
          {/* Real slides */}
          {mergedImages.map((img, i) => (
            <div key={img + i} className="relative min-w-full h-full">
              <Image src={img} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          ))}
          {/* Clone first at end */}
          {n > 0 && (
            <div className="relative min-w-full h-full">
              <Image src={mergedImages[0]} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        {mergedImages.length > 1 && (
          <div className="absolute bottom-1.5 right-1.5 z-10">
            <div className="flex gap-0.5 rounded-full bg-black/30 px-1 py-0.5">
              {mergedImages.map((_, i) => (
                <span
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); setInlineTransition(true); setInlineSlide(i + 1); }}
                  className={`h-1 w-1 rounded-full bg-white/75 hover:bg-white cursor-pointer transition ${i === current ? 'ring-1 ring-white bg-white' : ''}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom gradient to improve overlay control contrast on bright images */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Removed top-left icon overlay as requested */}
      </div>

      <CardContent className="p-6">
        <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <TechIconsRow tech={tech} max={8} />
          </div>
          <div className="flex items-center space-x-3 ml-4 flex-shrink-0">
            {!(github && github !== "#" && github.trim() !== "") && !(demo && demo !== "#" && demo.trim() !== "") ? (
              <div className="inline-flex items-center text-sm text-gray-500">
                <Lock className="w-4 h-4 mr-1" />
                <span>Private</span>
              </div>
            ) : (
              <>
                {github && github !== "#" && github.trim() !== "" && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
                  >
                    <Github className="w-4 h-4 mr-1 group-hover/link:scale-110 transition-transform duration-200" />
                    <span>Code</span>
                  </a>
                )}
                {demo && demo !== "#" && demo.trim() !== "" && (
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
                  >
                    <ExternalLink className="w-4 h-4 mr-1 group-hover/link:translate-x-1 transition-transform duration-200" />
                    <span>Demo</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>

      {mounted && lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          <button
            aria-label="Close image"
            className="absolute top-4 right-4 rounded-full bg-black/55 hover:bg-black/65 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md"
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
          >
            <X className="w-6 h-6" />
          </button>
          {mergedImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/65 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md"
                onClick={(e) => { e.stopPropagation(); prevImage() }}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/55 hover:bg-black/65 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md"
                onClick={(e) => { e.stopPropagation(); nextImage() }}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
          <div
            className="relative z-0 max-w-[92vw] max-h-[88vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
              const any = e as unknown as WheelEvent
              const dx = any.deltaX || 0
              if (Math.abs(dx) < 10) return
              if (dx > 0) nextImage()
              else prevImage()
            }}
            onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].clientX }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const dx = e.changedTouches[0].clientX - touchStartX.current
              touchStartX.current = null
              if (Math.abs(dx) < 40) return
              if (dx < 0) nextImage()
              else prevImage()
            }}
          >
            <div
              className="flex items-center"
              style={{ transform: `translateX(-${lightboxSlide * 100}%)`, transition: lightboxTransition ? 'transform 450ms ease-out' : 'none' }}
              onTransitionEnd={() => {
                if (n <= 1) return
                if (lightboxIndex === null) return
                if (lightboxSlide === 0) {
                  setLightboxTransition(false)
                  setLightboxSlide(n)
                  setLightboxIndex(n - 1)
                  setTimeout(() => setLightboxTransition(true), 0)
                } else if (lightboxSlide === n + 1) {
                  setLightboxTransition(false)
                  setLightboxSlide(1)
                  setLightboxIndex(0)
                  setTimeout(() => setLightboxTransition(true), 0)
                } else {
                  setLightboxIndex(lightboxSlide - 1)
                }
              }}
            >
              {/* Clone last */}
              {n > 0 && (
                <div className="min-w-full flex items-center justify-center">
                  <img src={mergedImages[n - 1]} alt={title} className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl" />
                </div>
              )}
              {/* Real slides */}
              {mergedImages.map((img, i) => (
                <div key={img + i} className="min-w-full flex items-center justify-center">
                  <img src={img} alt={title} className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl" />
                </div>
              ))}
              {/* Clone first */}
              {n > 0 && (
                <div className="min-w-full flex items-center justify-center">
                  <img src={mergedImages[0]} alt={title} className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </Card>
  )
}
