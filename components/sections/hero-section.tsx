"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Seeker | Software Creator"

  useEffect(() => {
    let index = 0
    setTypedText("")
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [fullText])

  const scrollToAbout = () => {
    document.getElementById("about-content")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // Make this the About anchor as requested
    <section
      id="about"
      className="bg-white pt-12 pb-16 scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-2 lg:gap-2 items-center">
          {/* Left side - Profile Image */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="w-60 h-60 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
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
          <div className="order-2 lg:order-2 text-left lg:-ml-20">
            {/* Removed decorative icon above the name as requested */}

            {/* Name and Title */}
            <div className="mb-4 lg:mb-6">
              {/* ABOUT label moved here above the name */}
              <div className="mt-5 mb-5 flex items-center justify-start w-full">
                <span className="text-xs font-mono text-gray-500 mr-3">01</span>
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs font-mono text-gray-500 ml-3 tracking-wide">ABOUT</span>
              </div>
              <h1 className="font-heading text-2xl lg:text-3xl xl:text-4xl font-semibold text-black mb-1 tracking-tight">
                Abel Getahun
              </h1>
              <div className="h-7 mb-3">
                <p className="text-sm lg:text-base text-gray-600 font-normal">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-7 max-w-lg">
              <p className="text-gray-700 leading-relaxed text-xs lg:text-sm">
              I’m Abel Getahun, a Software Engineering student who loves solving problems
               and turning ideas into practical solutions. Over the years, I’ve gained 
               experience working with projects and collaborations, 
               which has helped me grow both technically and creatively.
              </p>
              <p className="text-gray-700 leading-relaxed text-xs lg:text-sm mt-3.5">
              I’m passionate about building modern, minimal, 
              and impactful digital products. I enjoy exploring new technologies, 
              learning continuously, and creating software that makes life easier and more enjoyable for people.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-start space-x-4 mb-4">
              {/* GitHub */}
              <a
                href="https://github.com/abeelgetahun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 rounded transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black"
              >
                <Github className="w-5 h-5" />
              </a>
              {/* Telegram */}
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/abeeel-getahun/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 rounded transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              {/* Telegram */}
              <a
                href="https://t.me/Yene_enat1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-2 rounded transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black"
              >
                <Send className="w-5 h-5" />
              </a>
              {/* Email */}
              <a
                href="mailto:abelgetahun66@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="p-2 rounded transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black"
              >
                <Mail className="w-5 h-5" />
              </a>
              {/* X (Twitter) new logo */}
              <a
                href="https://x.com/abelgetahun_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X profile"
                className="p-2 rounded transition-transform duration-300 hover:scale-110 text-gray-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M18.244 2H21l-6.52 7.455L22 22h-6.186l-4.84-6.322L5.32 22H2.56l6.98-7.975L2 2h6.27l4.38 5.793L18.244 2zm-1.082 18h1.69L8.92 4H7.14l10.022 16z" />
                </svg>
              </a>
            </div>

            {/* CTA removed per request */}
          </div>
        </div>
      </div>
    </section>
  )
}
