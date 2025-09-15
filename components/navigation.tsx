"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Careers", href: "#experience" },
  // { name: "Articles", href: "#", disabled: true }, // Commented out by request
  { name: "Education", href: "#education" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
  const sections = navItems.filter((item) => !item.disabled).map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string, disabled?: boolean) => {
    if (disabled) return

    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-6 py-3 backdrop-saturate-150">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.disabled)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed" // Disabled styling for articles
                      : activeSection === item.href.substring(1)
                        ? "text-white bg-black shadow-md"
                        : "text-black hover:text-white hover:bg-black/80"
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
            <span className="text-sm font-medium text-black">Menu</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:bg-black/10 p-2"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-4 backdrop-saturate-150">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.disabled)}
                  className={`block w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-300 ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : activeSection === item.href.substring(1)
                        ? "text-white bg-black"
                        : "text-black hover:text-white hover:bg-black/80"
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
    </>
  )
}
