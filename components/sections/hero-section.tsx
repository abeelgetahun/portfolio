"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Profile Image */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/professional-headshot-of-abel-getahun--software-en.jpg"
                  alt="Abel Getahun"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-black rounded-2xl opacity-10 rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-300 rounded-xl opacity-20 -rotate-12"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-2 tracking-tight">
                Abel Getahun
              </h1>
              <div className="h-8 mb-4">
                <p className="text-lg lg:text-xl text-gray-600 font-medium">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 max-w-lg">
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                Hello! My name is Abel and I enjoy creating tech solutions to my daily problems. My interest in software
                development started back in 2013 when I accidentally stumbled upon a batch programming ebook in one of
                my harddrives — turns out there's so much you could do on a black & white terminal.
              </p>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg mt-4">
                Fast-forward to today, and I've had the privilege of working at multiple start ups, an event organizing
                company, a huge corporation, campus clubs and handled government projects. My main focus these days is
                building modern, minimal and powerful products and digital experiences at Dream Intelligence for the
                world to explore.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 mb-8">
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

            {/* CTA Button */}
            <div>
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 font-medium px-8 py-3 text-base rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
