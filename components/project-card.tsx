"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TechIconsRow } from "@/components/ui/tech-icon"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Lock, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Spinner } from "@/components/ui/spinner"

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  images?: string[]
  tech: string[]
  github: string
  demo: string
  icon: string
  index: number
  rotateIntervalMs?: number
  cardHref?: string
  suppressLinks?: boolean
  githubProfileUsername?: string
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
  cardHref,
  suppressLinks = false,
  githubProfileUsername,
}: ProjectCardProps) {
  const mergedImages = images && images.length > 0 ? images : image ? [image] : ["/placeholder.svg"]
  const n = mergedImages.length
  const isGithubProfile = Boolean(githubProfileUsername)

  const [current, setCurrent] = React.useState(0)
  const [inView, setInView] = React.useState(false)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const pushedStateRef = useRef(false)

  const cardRef = useRef<HTMLDivElement | null>(null)
  const inlineTouchStartX = useRef<number | null>(null)
  const inlineLastWheelTs = useRef<number>(0)
  const modalTouchStartX = useRef<number | null>(null)

  const [inlineSlide, setInlineSlide] = React.useState(1)
  const [inlineTransition, setInlineTransition] = React.useState(true)
  const [lightboxSlide, setLightboxSlide] = React.useState(1)
  const [lightboxTransition, setLightboxTransition] = React.useState(true)
  const [inlineLoaded, setInlineLoaded] = React.useState<Record<string, boolean>>({})
  const [lightboxLoaded, setLightboxLoaded] = React.useState<Record<string, boolean>>({})

  const markInlineLoaded = React.useCallback((src?: string | null) => {
    if (!src) return
    setInlineLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  const markLightboxLoaded = React.useCallback((src?: string | null) => {
    if (!src) return
    setLightboxLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  const isInlineLoaded = React.useCallback(
    (src?: string | null) => {
      if (!src) return true
      return Boolean(inlineLoaded[src])
    },
    [inlineLoaded]
  )

  const isLightboxLoaded = React.useCallback(
    (src?: string | null) => {
      if (!src) return true
      return Boolean(lightboxLoaded[src])
    },
    [lightboxLoaded]
  )

  const activeLightboxSource = lightboxIndex !== null ? mergedImages[lightboxIndex] : null
  const showLightboxSpinner = lightboxOpen && !isLightboxLoaded(activeLightboxSource)
  const inlineActiveIndex = React.useMemo(() => {
    if (n === 0) return 0
    if (inlineSlide === 0) return Math.max(0, n - 1)
    if (inlineSlide === n + 1) return 0
    const idx = inlineSlide - 1
    if (idx < 0) return 0
    if (idx >= n) return n - 1
    return idx
  }, [inlineSlide, n])
  const activeInlineSource = isGithubProfile ? null : mergedImages[inlineActiveIndex]
  const showInlineShimmer = !isGithubProfile && !isInlineLoaded(activeInlineSource)

  // Observe visibility for auto-rotate
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
      observer.disconnect()
    }
  }, [])

  useEffect(() => setMounted(true), [])

  // Sync inlineSlide when dots change current
  useEffect(() => {
    if (isGithubProfile) return
    setInlineSlide(Math.min(Math.max(1, current + 1), n > 0 ? n : 1))
  }, [current, n, isGithubProfile])

  // Auto-rotate inline
  useEffect(() => {
    if (isGithubProfile) return
    if (n <= 1 || !inView || lightboxOpen) return
    const id = setInterval(() => {
      setInlineTransition(true)
      setInlineSlide((s) => s + 1)
    }, rotateIntervalMs)
    return () => clearInterval(id)
  }, [n, inView, lightboxOpen, rotateIntervalMs, isGithubProfile])

  // Modal events
  useEffect(() => {
    if (!lightboxOpen) {
      document.body.style.overflow = ""
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (!mergedImages || mergedImages.length <= 1) return
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    const onPop = () => {
      if (lightboxOpen) closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("popstate", onPop)
    document.body.style.overflow = "hidden"
    if (!pushedStateRef.current) {
      window.history.pushState({ lightbox: true }, "")
      pushedStateRef.current = true
    }
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("popstate", onPop)
    }
  }, [lightboxOpen, mergedImages])

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
      window.history.back()
      pushedStateRef.current = false
    }
  }

  const nextImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    const base = lightboxIndex ?? 0
    const target = (base + 1) % mergedImages.length
    setLightboxIndex(target)
    setLightboxTransition(true)
    setLightboxSlide((s) => s + 1)
  }
  const prevImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    const base = lightboxIndex ?? 0
    const target = (base - 1 + mergedImages.length) % mergedImages.length
    setLightboxIndex(target)
    setLightboxTransition(true)
    setLightboxSlide((s) => s - 1)
  }

  return (
    <Card
      ref={cardRef}
      className="group transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-gray-200/60 bg-transparent hover:bg-gray-50/80 shadow-none overflow-hidden"
      onClick={(e) => {
        if (!cardHref) return
        const target = e.target as HTMLElement
        if (target.closest("button, a, [role=button], input, textarea")) return
        window.open(cardHref, "_blank", "noopener,noreferrer")
      }}
    >
  <div className="px-0 py-3 sm:p-4 md:p-6">
        {/* Image / Header area */}
        <div
          className="relative h-48 overflow-hidden cursor-pointer rounded-t-xl"
          onClick={(e) => {
            if (cardHref) {
              e.stopPropagation()
              window.open(cardHref, "_blank", "noopener,noreferrer")
              return
            }
            openLightboxAt(current)
          }}
        >
        {isGithubProfile ? (
          <>
            <div className="absolute inset-0 bg-black/15" />
            <GithubProfileHeader username={githubProfileUsername as string} />
          </>
        ) : (
          <>
            <div
              className="h-full w-full flex"
              style={{ transform: `translateX(-${inlineSlide * 100}%)`, transition: inlineTransition ? "transform 500ms ease-out" : "none" }}
              onTransitionEnd={() => {
                if (n <= 1) return
                if (inlineSlide === 0) {
                  setInlineTransition(false)
                  setInlineSlide(n)
                  setCurrent(n - 1)
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
              {/* Clone last */}
              {n > 0 && (
                <div className="relative min-w-full h-full">
                  <Image
                    src={mergedImages[n - 1]}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-300 ${isInlineLoaded(mergedImages[n - 1]) ? "opacity-100" : "opacity-0"}`}
                    onLoadingComplete={() => markInlineLoaded(mergedImages[n - 1])}
                    onError={() => markInlineLoaded(mergedImages[n - 1])}
                  />
                </div>
              )}
              {/* Real slides */}
              {mergedImages.map((img, i) => (
                <div key={img + i} className="relative min-w-full h-full">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-300 ${isInlineLoaded(img) ? "opacity-100" : "opacity-0"}`}
                    onLoadingComplete={() => markInlineLoaded(img)}
                    onError={() => markInlineLoaded(img)}
                    priority={i === 0}
                  />
                </div>
              ))}
              {/* Clone first */}
              {n > 0 && (
                <div className="relative min-w-full h-full">
                  <Image
                    src={mergedImages[0]}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-300 ${isInlineLoaded(mergedImages[0]) ? "opacity-100" : "opacity-0"}`}
                    onLoadingComplete={() => markInlineLoaded(mergedImages[0])}
                    onError={() => markInlineLoaded(mergedImages[0])}
                  />
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none z-10" />
            {!isGithubProfile && (
              <div
                className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${showInlineShimmer ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-t-xl shimmer-surface" />
              </div>
            )}
            {mergedImages.length > 1 && (
              <div className="absolute bottom-1.5 right-1.5 z-10">
                <div className="flex gap-0.5 rounded-full bg-black/30 px-1 py-0.5">
                  {mergedImages.map((_, i) => (
                    <span
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrent(i); setInlineTransition(true); setInlineSlide(i + 1) }}
                      className={`h-1 w-1 rounded-full bg-white/75 hover:bg-white cursor-pointer transition ${i === current ? "ring-1 ring-white bg-white" : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
          </>
        )}
        </div>

        <CardContent className="p-0 mt-4 md:mt-6">
        <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <TechIconsRow tech={tech} max={8} />
          </div>
          {!suppressLinks && (
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-1 group-hover/link:translate-x-1 transition-transform duration-200" />
                      <span>Demo</span>
                    </a>
                  )}
                </>
              )}
            </div>
          )}
          {suppressLinks && cardHref && (
            <div className="flex items-center ml-4 flex-shrink-0">
              <a
                href={cardHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open link"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Open link"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </CardContent>
      </div>

      {mounted && lightboxOpen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={closeLightbox} aria-modal="true" role="dialog">
          <button
            aria-label="Close image"
            className="absolute top-4 right-4 rounded-full bg-black/55 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md transition-colors hover:bg-black/65 hover:border-white/30 hover:ring-2 hover:ring-white/40 active:bg-gray-500"
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
          >
            <X className="w-6 h-6" />
          </button>
          {mergedImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/55 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md transition-colors hover:bg-black/65 hover:border-white/30 hover:ring-2 hover:ring-white/40 active:bg-gray-500"
                onClick={(e) => { e.stopPropagation(); prevImage() }}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/55 text-white p-2 backdrop-blur-md border border-white/20 z-10 shadow-md transition-colors hover:bg-black/65 hover:border-white/30 hover:ring-2 hover:ring-white/40 active:bg-gray-500"
                onClick={(e) => { e.stopPropagation(); nextImage() }}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
          <div className="relative z-0 max-w-[92vw] max-h-[88vh] overflow-hidden" onWheel={(e) => {
            if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
            const any = e as unknown as WheelEvent
            const dx = any.deltaX || 0
            if (Math.abs(dx) < 10) return
            if (dx > 0) nextImage(); else prevImage()
          }} onTouchStart={(e) => { modalTouchStartX.current = e.changedTouches[0].clientX }} onTouchEnd={(e) => {
            if (modalTouchStartX.current === null) return
            const dx = e.changedTouches[0].clientX - modalTouchStartX.current
            modalTouchStartX.current = null
            if (Math.abs(dx) < 40) return
            if (dx < 0) nextImage(); else prevImage()
          }}>
            {showLightboxSpinner && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
                <Spinner className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              </div>
            )}
            <div className="flex items-center" style={{ transform: `translateX(-${lightboxSlide * 100}%)`, transition: lightboxTransition ? "transform 450ms ease-out" : "none" }} onTransitionEnd={() => {
              if (n <= 1) return
              if (lightboxIndex === null) return
              if (lightboxSlide === 0) { setLightboxTransition(false); setLightboxSlide(n); setLightboxIndex(n - 1); setTimeout(() => setLightboxTransition(true), 0) }
              else if (lightboxSlide === n + 1) { setLightboxTransition(false); setLightboxSlide(1); setLightboxIndex(0); setTimeout(() => setLightboxTransition(true), 0) }
              else { setLightboxIndex(lightboxSlide - 1) }
            }}>
              {n > 0 && (
                <div className="min-w-full flex items-center justify-center">
                  <img
                    src={mergedImages[n - 1]}
                    alt={title}
                    className={`max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${isLightboxLoaded(mergedImages[n - 1]) ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                    onClick={(e) => e.stopPropagation()}
                    onLoad={() => markLightboxLoaded(mergedImages[n - 1])}
                    onError={() => markLightboxLoaded(mergedImages[n - 1])}
                  />
                </div>
              )}
              {mergedImages.map((img, i) => (
                <div key={img + i} className="min-w-full flex items-center justify-center">
                  <img
                    src={img}
                    alt={title}
                    className={`max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${isLightboxLoaded(img) ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                    onClick={(e) => e.stopPropagation()}
                    onLoad={() => markLightboxLoaded(img)}
                    onError={() => markLightboxLoaded(img)}
                  />
                </div>
              ))}
              {n > 0 && (
                <div className="min-w-full flex items-center justify-center">
                  <img
                    src={mergedImages[0]}
                    alt={title}
                    className={`max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${isLightboxLoaded(mergedImages[0]) ? "opacity-100" : "opacity-0"}`}
                    loading="lazy"
                    onClick={(e) => e.stopPropagation()}
                    onLoad={() => markLightboxLoaded(mergedImages[0])}
                    onError={() => markLightboxLoaded(mergedImages[0])}
                  />
                </div>
              )}
            </div>
          </div>
        </div>, document.body)
      }
    </Card>
  )
}

function GithubProfileHeader({ username }: { username: string }) {
  const [data, setData] = React.useState<null | { name: string | null; login: string; bio: string | null; avatar_url: string }>(null)
  const [err, setErr] = React.useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((j) => { if (!cancelled) setData({ name: j.name, login: j.login, bio: j.bio, avatar_url: j.avatar_url }) })
      .catch((e) => { if (!cancelled) setErr(String(e)) })
    return () => { cancelled = true }
  }, [username])

  return (
    <div className="absolute inset-0 flex items-center gap-4 px-4 bg-gradient-to-r from-black/30 to-black/10 text-white">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow">
        {data?.avatar_url ? (
          <Image src={data.avatar_url} alt={data?.login ?? username} fill sizes="64px" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
      </div>
      <div className="min-w-0">
        <div className="font-semibold truncate">{data?.name ?? username}</div>
        <div className="text-xs text-white/80 truncate">@{data?.login ?? username}</div>
        {data?.bio && <div className="text-[11px] text-white/80 line-clamp-2 mt-1 max-w-[70vw]">{data.bio}</div>}
        {err && <div className="text-[11px] text-red-200">{err}</div>}
      </div>
    </div>
  )
}
