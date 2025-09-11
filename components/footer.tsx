"use client"

import { ArrowUpRight } from "lucide-react"

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Articles", href: "#articles" },
  { name: "Careers", href: "#experience" },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-sm text-gray-500">
            <span>© 2025 Abel Getahun</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
            <span className="ml-2">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
