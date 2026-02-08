"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

type Certificate = {
  title: string
  issuer?: string
  images: string[]
  verifyUrl?: string
}

const certificates: Certificate[] = [
  // 1) Udacity
  {
    title: "Android Developer",
    issuer: "Udacity",
    images: ["/certificate/udacity-android.jpg"],
    verifyUrl: "https://www.udacity.com/certificate/e/7a5ff9d4-c924-11ef-aee7-bb82e2d16235",
  },
  // 2) 10 academy
  {
    title: "ML Engineering",
    issuer: "10 Academy",
    images: ["/certificate/10_academy/certificate.jpg"],
  },
  // // 3) Jirtuu
  // {
  //   title: "Recognition",
  //   issuer: "Jirtuu Software Labs",
  //   images: ["/certificate/recognition-jirtuu.jpg"],
  // },
  // 3) Innobiz
  {
    title: "Early stage startup traning",
    issuer: "Innobiz-k",
    images: [
      "/certificate/innobiz/00.jpg",
      // "/certificate/innobiz/01.jpg",
      // "/certificate/innobiz/1739710290096-min.jpg",
    ],
  },
]

function AutoSlider({ images, alt, rotateMs = 3500 }: { images: string[]; alt: string; rotateMs?: number }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [imgs, setImgs] = useState<string[]>(() => images.filter(Boolean))
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const hasMany = imgs.length > 1

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setInView(entry.intersectionRatio >= 0.5)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Keep internal list in sync if prop changes
  useEffect(() => {
    setImgs(images.filter(Boolean))
    setIdx(0)
  }, [images])

  useEffect(() => {
    if (!hasMany || paused || !inView) return
    const t = setInterval(() => setIdx((i) => (i + 1) % imgs.length), rotateMs)
    return () => clearInterval(t)
  }, [imgs.length, rotateMs, paused, hasMany, inView])

  const handleImageError = (badIndex: number) => {
    setImgs((prev) => {
      const next = prev.filter((_, i) => i !== badIndex)
      if (next.length === 0) {
        setIdx(0)
        return next
      }
      setIdx((i) => Math.min(i, next.length - 1))
      return next
    })
  }

  return (
    <div
      ref={wrapperRef}
      className="group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 4:3 aspect ratio wrapper using padding-top */}
      <div className="relative w-full pt-[75%]">
        {imgs.length > 0 ? (
          imgs.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={alt}
              fill
              className={`absolute inset-0 object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={i === 0}
              onError={() => handleImageError(i)}
            />
          ))
        ) : (
          <Image
            src="/window.svg"
            alt="Image unavailable"
            fill
            className="absolute inset-0 object-contain p-6 opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        )}
      </div>
      {hasMany && imgs.length > 0 && (
        <div className="absolute bottom-3 right-3 flex gap-1">
          {imgs.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-black" : "bg-black/40"}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EducationSection() {
  return (
  <section id="milestone" className="pt-12 pb-16 bg-white scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strip: 04 | MILESTONE */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">04</span>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-mono text-gray-500 mx-4">MILESTONE</span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((c) => (
            <div key={c.title} className="flex flex-col">
              <AutoSlider images={c.images} alt={c.title} />
              <div className="mt-3">
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <h3 className="text-lg font-semibold text-black truncate">{c.title}</h3>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Verify certificate"
                      aria-label={`Verify ${c.title}`}
                      className="inline-flex items-center text-gray-500 hover:text-black transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {c.issuer && <p className="text-sm text-gray-600">{c.issuer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
