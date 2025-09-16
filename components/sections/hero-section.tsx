"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Send, MapPin } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Believer | Creative Developer"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about-content")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // Make this the About anchor as requested
    <section
      id="about"
      className="min-h-screen bg-white flex items-center justify-center pt-0 pb-8 scroll-mt-36"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          {/* Left side - Profile Image */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="w-80 h-80 lg:w-96 lg:h-96">
              <Image
                src="/profile/profile-1.png"
                alt="Abel Getahun"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Removed decorative icon above the name as requested */}

            {/* Name and Title */}
            <div className="mb-4 lg:mb-6">
              {/* ABOUT label moved here above the name */}
              <div className="mt-5 mb-5 flex items-center justify-center lg:justify-start w-full">
                <span className="text-xs font-mono text-gray-500 mr-3">01</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs font-mono text-gray-500 ml-3 tracking-wide">ABOUT</span>
              </div>
              <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-semibold text-black mb-1 tracking-tight">
                Abel Getahun
              </h1>
              <div className="h-7 mb-3">
                <p className="text-base lg:text-lg text-gray-600 font-normal">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-7 max-w-lg">
              <p className="text-gray-700 leading-relaxed text-[0.95rem] lg:text-base">
                Hello! My name is Abel and I enjoy creating tech solutions to my daily problems. My interest in software
                development started back in 2013 when I accidentally stumbled upon a batch programming ebook in one of
                my harddrives — turns out there's so much you could do on a black & white terminal.
              </p>
              <p className="text-gray-700 leading-relaxed text-[0.95rem] lg:text-base mt-3.5">
                Fast-forward to today, and I've had the privilege of working at multiple start ups, an event organizing
                company, a huge corporation, campus clubs and handled government projects. My main focus these days is
                building modern, minimal and powerful products and digital experiences at Dream Intelligence for the
                world to explore.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-4">
              <a
                href="https://github.com/abelgetahun"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="https://linkedin.com/in/abelgetahun"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Linkedin className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="mailto:abel@example.com"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="mailto:abel@example.com"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <MapPin className="w-5 h-5 text-gray-700" />
              </a>
            </div>

            {/* CTA removed per request */}
          </div>
        </div>
      </div>
    </section>
  )
}
