"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Brain, Smartphone, Trophy, Puzzle } from "lucide-react"

const expertiseCards = [
  {
    title: "Software Engineer",
    icon: Code,
    description: "Building scalable solutions with modern technologies",
    details:
      "Experienced in full-stack development using Next.js, React, Node.js, and various databases. Focus on clean code, performance optimization, and user experience.",
  },
  {
    title: "AI & ML Enthusiast",
    icon: Brain,
    description: "Applying machine learning to solve real-world problems",
    details:
      "Specialized in NLP, data analysis, and predictive modeling using Python, TensorFlow, scikit-learn, and various ML frameworks.",
  },
  {
    title: "Mobile & Web Developer",
    icon: Smartphone,
    description: "Creating seamless cross-platform experiences",
    details:
      "Expert in Flutter for mobile development and modern web technologies for responsive, user-friendly applications.",
  },
  {
    title: "Competitive Programmer",
    icon: Trophy,
    description: "500+ problems solved across platforms",
    details:
      "Active on LeetCode, Codeforces, and HackerRank. Strong foundation in algorithms, data structures, and problem-solving.",
  },
  {
    title: "Problem Solver",
    icon: Puzzle,
    description: "Turning complex challenges into elegant solutions",
    details:
      "Analytical mindset with ability to break down complex problems, design efficient solutions, and implement them effectively.",
  },
]

export default function ExpertiseSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % expertiseCards.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % expertiseCards.length)
      setIsAutoScrolling(false)
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + expertiseCards.length) % expertiseCards.length)
      setIsAutoScrolling(false)
    }
  }

  return (
  <section id="expertise" ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-black mb-6">
            What I Do
          </h2>
        </div>

        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {expertiseCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="max-w-2xl mx-auto h-80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-8 h-full flex flex-col justify-center text-center">
                      <div className="mb-6">
                        <IconComponent className="w-16 h-16 mx-auto text-black mb-4" />
                        <h3 className="font-heading text-2xl font-bold text-black mb-3">{card.title}</h3>
                        <p className="text-gray-600 font-medium mb-4">{card.description}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 flex-grow">{card.details}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {expertiseCards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoScrolling(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-black" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
