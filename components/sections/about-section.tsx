"use client"

import { useEffect, useRef, useState } from "react"
import SectionTitle from "@/components/ui/section-title"

const tools = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Apache Maven", icon: "https://cdn.simpleicons.org/apachemaven/C71A36" },
]

export default function AboutSection() {
  return (
  <section id="about-content" className="pt-12 pb-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <SectionTitle className="mb-2 text-lg md:text-xl font-semibold">Highlights</SectionTitle>

          {/* Horizontal scroller */}
          <div className="relative">
            <div
              className="px-3 sm:px-5 md:px-8 overflow-x-auto no-scrollbar group"
              id="highlights-scroll"
              onMouseEnter={(e) => {
                const ind = (e.currentTarget.querySelector('[data-hi-ind]') as HTMLElement)
                if (ind) ind.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                const ind = (e.currentTarget.querySelector('[data-hi-ind]') as HTMLElement)
                if (ind) ind.style.opacity = '0'
              }}
              onScroll={(e) => {
                const ind = (e.currentTarget.querySelector('[data-hi-ind]') as HTMLElement)
                if (!ind) return
                ind.style.opacity = '1'
                window.clearTimeout((ind as any)._t)
                ;(ind as any)._t = window.setTimeout(() => {
                  ind.style.opacity = '0'
                }, 900)
              }}
            >
              <div className="flex gap-3 snap-x snap-mandatory py-1.5">
                {/* Card 1 */}
                <div className="min-w-[240px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <h3 className="text-sm font-medium text-black mb-1.5">Software Engineer</h3>
                  <p className="text-xs text-gray-600">Building reliable, maintainable systems with a focus on clean architecture and developer experience.</p>
                </div>

                {/* Card 2 */}
                <div className="min-w-[240px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <h3 className="text-sm font-medium text-black mb-1.5">AI & ML Enthusiast</h3>
                  <p className="text-xs text-gray-600">Exploring applied ML for real products — from data to deployment, responsibly.</p>
                </div>

                {/* Card 3 */}
                <div className="min-w-[240px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <h3 className="text-sm font-medium text-black mb-1.5">Mobile & Web Development</h3>
                  <p className="text-xs text-gray-600">Crafting fast, accessible apps with modern stacks across web and mobile surfaces.</p>
                </div>

                {/* Card 4 - Competitive Programming */}
                <div className="min-w-[240px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <h3 className="text-sm font-medium text-black mb-1.5">Competitive Programming</h3>
                  <p className="text-xs text-gray-600 mb-2.5">400+ problems solved across platforms. Sharpening algorithms, data structures, and speed.</p>
                  <div className="flex items-center gap-2.5">
                    <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-50" aria-label="LeetCode">
                      <span
                        className="icon-bg-shimmer"
                        style={{ width: '1rem', height: '1rem', ['--icon-url' as any]: 'url("https://cdn.simpleicons.org/leetcode/FFA116")' }}
                        aria-hidden="true"
                      />
                    </a>
                    <a href="https://codeforces.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-50" aria-label="Codeforces">
                      <span
                        className="icon-bg-shimmer"
                        style={{ width: '1rem', height: '1rem', ['--icon-url' as any]: 'url("https://cdn.simpleicons.org/codeforces/1F8ACB")' }}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Auto-hide scroll hint line */}
              <div data-hi-ind style={{ opacity: 0, transition: 'opacity 200ms ease' }} className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* Fixed fog overlays and arrows anchored to wrapper */}
            <div className="hidden sm:block pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('highlights-scroll')
                if (!el) return
                el.scrollBy({ left: -320, behavior: 'smooth' })
              }}
              aria-label="Scroll left"
              className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 border border-gray-200 shadow hover:bg-white"
            >
              <span className="text-lg leading-none">‹</span>
            </button>
            <div className="hidden sm:block pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('highlights-scroll')
                if (!el) return
                el.scrollBy({ left: 320, behavior: 'smooth' })
              }}
              aria-label="Scroll right"
              className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 border border-gray-200 shadow hover:bg-white"
            >
              <span className="text-lg leading-none">›</span>
            </button>
          </div>

          {/* Tech Stack ticker below to keep rhythm with design */}
          <MarqueeTechStack />
        </div>
      </div>
    </section>
  )
}

function MarqueeTechStack() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const firstRef = useRef<HTMLDivElement | null>(null)
  const [distance, setDistance] = useState<number>(0)

  useEffect(() => {
    const calc = () => {
      if (!firstRef.current) return
      const w = firstRef.current.getBoundingClientRect().width
      setDistance(w)
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (firstRef.current) ro.observe(firstRef.current)
    window.addEventListener('resize', calc)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', calc)
    }
  }, [])

  const style: React.CSSProperties = {
    ['--marquee-distance' as any]: distance ? `${distance}px` : '0px',
    ['--marquee-duration' as any]: '55s',
  }

  return (
    <div className="mt-12 mb-5" id="tech-stack">
  <SectionTitle className="mb-4 text-lg md:text-xl font-semibold">Tech Stack</SectionTitle>
  <div ref={wrapperRef} className="relative overflow-hidden h-14 marquee-fade" data-marquee-wrapper>
        <div className="marquee-dual relative flex" style={style}>
          <div ref={firstRef} className="flex shrink-0" aria-label="Technology stack scrolling list">
            {tools.map((tool, i) => (
              <MarqueeItem key={i} tool={tool} />
            ))}
          </div>
          {/* duplicate copy */}
          <div className="flex shrink-0" aria-hidden="true">
            {tools.map((tool, i) => (
              <MarqueeItem key={`dup-${i}`} tool={tool} hiddenLabel />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeItem({ tool, hiddenLabel }: { tool: { name: string; icon?: string }; hiddenLabel?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
      <img src={tool.icon || '/placeholder.svg'} alt={hiddenLabel ? '' : tool.name} className="w-5 h-5" />
      <span className="text-xs font-medium text-gray-800">{tool.name}</span>
    </div>
  )
}

// Feature detection for mask-image (client-side only). Adds fallback class if unsupported.
if (typeof window !== 'undefined') {
  try {
    const supportsMask = CSS?.supports?.('mask-image', 'linear-gradient(to right, black, white)')
    if (!supportsMask) {
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-marquee-wrapper]').forEach((el) => {
          el.classList.add('supports-no-mask')
        })
      })
    }
  } catch {/* ignore */}
}
