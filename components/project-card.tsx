"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  const pushedStateRef = useRef(false)
  const [mounted, setMounted] = React.useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (mergedImages.length <= 1 || paused) return
    const id = setInterval(() => {
      setCurrent((c: number) => (c + 1) % mergedImages.length)
    }, rotateIntervalMs)
    return () => clearInterval(id)
  }, [mergedImages.length, rotateIntervalMs, paused])

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
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxIndex(null)
    if (pushedStateRef.current) {
      // Go back one step to clear pushed state
      window.history.back()
      pushedStateRef.current = false
    }
  }

  const nextImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    setLightboxIndex((i) => i === null ? 0 : (i + 1) % mergedImages.length)
  }

  const prevImage = () => {
    if (!mergedImages || mergedImages.length <= 1 || lightboxIndex === null) return
    setLightboxIndex((i) => i === null ? 0 : (i - 1 + mergedImages.length) % mergedImages.length)
  }

  return (
    <Card
      className={`group transition-all duration-500 transform hover:-translate-y-2 border border-transparent hover:border-gray-200/60 bg-transparent hover:bg-gray-50/80 shadow-none overflow-hidden`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => openLightboxAt(current)}
      >
        {mergedImages.map((img, i) => (
          <Image
            key={img + i}
            src={img}
            alt={title}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            } ${i === current ? 'group-hover:scale-105' : ''}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        {mergedImages.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1 z-10">
            {mergedImages.map((_, i) => (
              <span
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`h-2 w-2 rounded-full bg-white/50 hover:bg-white cursor-pointer transition ${i === current ? 'ring-2 ring-white bg-white' : ''}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-lg">{icon}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech.slice(0, 4).map((techItem) => (
            <span key={techItem} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
              {techItem}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-md">
              +{tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
            >
              <Github className="w-4 h-4 mr-1 group-hover/link:scale-110 transition-transform duration-200" />
              <span>Code</span>
            </a>

            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
            >
              <ExternalLink className="w-4 h-4 mr-1 group-hover/link:translate-x-1 transition-transform duration-200" />
              <span>Demo</span>
            </a>
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
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 backdrop-blur-md border border-white/20"
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
          >
            <X className="w-6 h-6" />
          </button>
          {mergedImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 backdrop-blur-md border border-white/20"
                onClick={(e) => { e.stopPropagation(); prevImage() }}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-2 backdrop-blur-md border border-white/20"
                onClick={(e) => { e.stopPropagation(); nextImage() }}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
          <div
            className="relative max-w-[92vw] max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
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
            {lightboxIndex !== null && (
              <img
                src={mergedImages[lightboxIndex]}
                alt={title}
                className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </Card>
  )
}
