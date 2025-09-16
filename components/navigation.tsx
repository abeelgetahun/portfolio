"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

type NavItem = { name: string; href: string; disabled?: boolean }

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Careers", href: "#experience" },
  // { name: "Articles", href: "#", disabled: true }, // Commented out by request
  { name: "Milestone", href: "#milestone" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const activeRef = useRef(activeSection)
  // Lock active highlight briefly after click to avoid flicker while smooth scrolling
  const [lockActive, setLockActive] = useState<string | null>(null)
  const lockRef = useRef<string | null>(null)
  const lockTimer = useRef<number | null>(null)

  useEffect(() => {
    activeRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    lockRef.current = lockActive
  }, [lockActive])

  useEffect(() => {
    const groupKeys = navItems.filter((i) => !i.disabled).map((i) => i.href.substring(1))
    const groupMap: Record<string, string[]> = {
      about: ["about", "about-content"],
      projects: ["projects"],
      experience: ["experience"],
      milestone: ["milestone"],
    }
    // Ensure all groups exist, even if not predefined
    groupKeys.forEach((k) => {
      if (!groupMap[k]) groupMap[k] = [k]
    })

    // Unique list of observed element IDs
    const observedIds = Array.from(new Set(groupKeys.flatMap((k) => groupMap[k])))
  // Track visible ratios via IntersectionObserver
  const ratios = new Map<string, number>()

    const computeAndSetActive = () => {
      // If we're in a click-initiated smooth scroll, keep the clicked item highlighted
      if (lockRef.current) return
      const vh = window.innerHeight
      const targetY = vh * 0.4
      let bestGroup: string | null = null
      let bestRatio = -1
      let bestCenterDist = Number.POSITIVE_INFINITY

      groupKeys.forEach((groupKey) => {
        const ids = groupMap[groupKey]
        // For each group, pick the id with the highest ratio; tie-break by center distance
        let groupBestRatio = -1
        let groupBestCenterDist = Number.POSITIVE_INFINITY

        ids.forEach((id) => {
          const el = document.getElementById(id)
          if (!el) return
          const r = ratios.get(id) ?? 0
          const rect = el.getBoundingClientRect()
          const centerDist = Math.abs((rect.top + rect.height / 2) - targetY)
          if (r > groupBestRatio || (r === groupBestRatio && centerDist < groupBestCenterDist)) {
            groupBestRatio = r
            groupBestCenterDist = centerDist
          }
        })

        if (
          groupBestRatio > bestRatio ||
          (groupBestRatio === bestRatio && groupBestCenterDist < bestCenterDist)
        ) {
          bestRatio = groupBestRatio
          bestCenterDist = groupBestCenterDist
          bestGroup = groupKey
        }
      })

      if (bestGroup && bestGroup !== activeRef.current) {
        setActiveSection(bestGroup)
        activeRef.current = bestGroup
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id
          ratios.set(id, entry.intersectionRatio || 0)
        })
        computeAndSetActive()
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    )

    const observedSet = new Set<string>()
    const tryObserveMissing = () => {
      observedIds.forEach((id) => {
        if (observedSet.has(id)) return
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
          observedSet.add(id)
        }
      })
    }

    // Initial attempt and a next-frame retry
    tryObserveMissing()
    requestAnimationFrame(tryObserveMissing)

    // MutationObserver to catch late-mounted sections
    const mo = new MutationObserver(() => {
      const before = observedSet.size
      tryObserveMissing()
      if (observedSet.size === observedIds.length) {
        mo.disconnect()
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Seed initial ratios and compute initial active
    observedIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const visibleY = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))
      const ratio = visibleY / Math.max(1, rect.height)
      ratios.set(id, ratio)
    })
    computeAndSetActive()

    return () => {
      mo.disconnect()
      observer.disconnect()
    }
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const scrollToSection = (href: string, disabled?: boolean) => {
    if (disabled) return

    const element = document.getElementById(href.substring(1))
    if (element) {
      // Highlight immediately, then lock updates briefly to avoid observer overriding
      const target = href.substring(1)
      setActiveSection(target)
      setLockActive(target)
      if (lockTimer.current) {
        clearTimeout(lockTimer.current)
      }
      lockTimer.current = window.setTimeout(() => {
        setLockActive(null)
        lockTimer.current = null
      }, 800)
      element.scrollIntoView({ behavior: "smooth", block: 'start', inline: 'nearest' })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-xl px-4 py-2 backdrop-saturate-150">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.disabled)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed" // Disabled styling for articles
                      : activeSection === item.href.substring(1)
                        ? "text-amber-500"
                        : "text-black hover:text-amber-600"
                  }`}
                  disabled={item.disabled}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between">
            <span className="text-xs font-medium text-black">Menu</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:bg-black/10 p-1.5"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-3 backdrop-saturate-150">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.disabled)}
                  className={`block w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors duration-200 ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : activeSection === item.href.substring(1)
                        ? "text-amber-500"
                        : "text-black hover:text-amber-600"
                  }`}
                  disabled={item.disabled}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Click-outside backdrop for mobile: closes menu when tapping outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/0"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
