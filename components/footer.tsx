"use client"

import * as Popover from "@radix-ui/react-popover"
import { ArrowUpRight, Mail, Send, Linkedin } from "lucide-react"

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Careers", href: "#experience" },
  { name: "Milestone", href: "#milestone" },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-transparent border-t border-gray-200/40 py-8">
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

          {/* Copyright + Contact */}
          <div className="flex items-center text-sm text-gray-500">
            <span>© 2025 Abel Getahun</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
            <span className="ml-2">All rights reserved.</span>

            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  aria-label="Contact me"
                  className="ml-4 px-3 py-2 rounded-full bg-black text-white text-sm font-medium shadow hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/30 whitespace-nowrap"
                >
                  Contact me
                </button>
              </Popover.Trigger>
              <Popover.Content sideOffset={10} align="end" className="z-[10000] rounded-2xl border border-gray-200 bg-white shadow-xl p-2 w-56">
                <div className="flex flex-col">
                  <a
                    href="mailto:abelgetahun66@gmail.com"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 text-sm text-gray-800"
                  >
                    <Mail className="w-4 h-4" /> Gmail
                  </a>
                  <a
                    href="https://t.me/yeneenat_1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 text-sm text-gray-800"
                  >
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abelgetahun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 text-sm text-gray-800"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      </div>
    </footer>
  )
}
