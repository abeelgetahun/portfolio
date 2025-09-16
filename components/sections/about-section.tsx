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
  <section id="about-content" className="pt-16 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <SectionTitle className="mb-4">Highlights</SectionTitle>

          {/* Horizontal scroller */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div className="relative px-4 sm:px-6 lg:px-8 overflow-x-auto">
              {/* Edge fade */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />

              <div className="flex gap-4 snap-x snap-mandatory py-2">
                {/* Card 1 */}
                <div className="min-w-[260px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <div className="text-xs font-mono text-gray-500 mb-2">AREA</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Software Engineer</h3>
                  <p className="text-sm text-gray-600">
                    Building reliable, maintainable systems with a focus on clean architecture and developer
                    experience.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="min-w-[260px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <div className="text-xs font-mono text-gray-500 mb-2">AREA</div>
                  <h3 className="text-lg font-semibold text-black mb-2">AI & ML Enthusiast</h3>
                  <p className="text-sm text-gray-600">
                    Exploring applied ML for real products — from data to deployment, responsibly.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="min-w-[260px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <div className="text-xs font-mono text-gray-500 mb-2">AREA</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Mobile & Web Development</h3>
                  <p className="text-sm text-gray-600">
                    Crafting fast, accessible apps with modern stacks across web and mobile surfaces.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="min-w-[260px] snap-start bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white">
                  <div className="text-xs font-mono text-gray-500 mb-2">AREA</div>
                  <h3 className="text-lg font-semibold text-black mb-2">Competitive Programming</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    400+ problems solved across platforms. Sharpening algorithms, data structures, and speed.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://leetcode.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-black hover:underline"
                    >
                      <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" className="w-4 h-4" />
                      LeetCode
                    </a>
                    <a
                      href="https://codeforces.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-black hover:underline"
                    >
                      <img src="https://cdn.simpleicons.org/codeforces/1F8ACB" alt="Codeforces" className="w-4 h-4" />
                      Codeforces
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack ticker below to keep rhythm with design */}
          <MarqueeTechStack />
          {/* Anchor marker for external nav linking to start of projects */}
          <div id="projects" className="h-4" aria-hidden="true" />
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
    <div className="mt-10 mb-4" id="tech-stack">
      <SectionTitle className="mb-2">Tech Stack</SectionTitle>
      <div ref={wrapperRef} className="relative overflow-hidden h-16 marquee-fade" data-marquee-wrapper>
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
    <div className="flex items-center gap-3 px-4 py-3 whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
      <img src={tool.icon || '/placeholder.svg'} alt={hiddenLabel ? '' : tool.name} className="w-6 h-6" />
      <span className="text-sm font-medium text-gray-800">{tool.name}</span>
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
