"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Certificate = {
  title: string
  issuer?: string
  images: string[]
}

const certificates: Certificate[] = [
  {
    title: "Innobiz Recognition",
    issuer: "Innobiz",
    images: [
      "/certificate/innobiz/00.jpg",
      "/certificate/innobiz/01.jpg",
      "/certificate/innobiz/02.jpg",
      "/certificate/innobiz/1739710290096-min.jpg",
    ],
  },
  {
    title: "Udacity Android",
    issuer: "Udacity",
    images: ["/certificate/udacity-android.jpg"],
  },
  {
    title: "Jirtuu Recognition",
    issuer: "Jirtuu Software Labs",
    images: ["/certificate/recognition-jirtuu.jpg"],
  },
]

function AutoSlider({ images, alt, rotateMs = 3500 }: { images: string[]; alt: string; rotateMs?: number }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const hasMany = images.length > 1

  useEffect(() => {
    if (!hasMany || paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), rotateMs)
    return () => clearInterval(t)
  }, [images.length, rotateMs, paused, hasMany])

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* 4:3 aspect ratio wrapper using padding-top */}
      <div className="relative w-full pt-[75%]">
        {images.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={alt}
            fill
            className={`absolute inset-0 object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={i === 0}
          />
        ))}
      </div>
      {hasMany && (
        <div className="absolute bottom-3 right-3 flex gap-1">
          {images.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full ${i === idx ? "bg-black" : "bg-black/40"}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EducationSection() {
  return (
  <section id="milestone" className="pt-8 pb-24 bg-white scroll-mt-28">
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
                <div className="text-sm font-mono text-gray-500">Certificate</div>
                <h3 className="text-lg font-semibold text-black">{c.title}</h3>
                {c.issuer && <p className="text-sm text-gray-600">{c.issuer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
