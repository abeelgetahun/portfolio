"use client"

import { useEffect, useRef, useState } from "react"

const tools = [
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
]

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">01</span>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-mono text-gray-500 mx-4">ABOUT</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <h2
            className={`font-heading text-3xl md:text-4xl font-bold text-black transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            About Me
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-8 text-center">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-black mb-4">Abel Getahun</h1>
              <p className="text-xl text-black font-medium mb-6">Software Engineering Student | AI/ML Enthusiast</p>
            </div>

            <div className="prose prose-lg text-gray-700 leading-relaxed max-w-none text-center">
              <p className="mb-6 text-base">
                I'm a passionate <span className="font-semibold text-black">Software Engineering student</span> at Adama
                Science & Technology University, currently in my 4th year. My journey in technology is driven by an
                insatiable curiosity to solve complex problems and create innovative solutions.
              </p>
              <p className="mb-6 text-base">
                With expertise spanning{" "}
                <span className="font-semibold text-black">AI/ML, mobile development, and web technologies</span>, I've
                successfully completed multiple internships and built projects that make a real impact.
              </p>
              <p className="mb-8 text-base">
                As a <span className="font-semibold text-black">competitive programmer</span> with 500+ problems solved,
                I bring strong analytical thinking and problem-solving skills to every project.
              </p>

              {/* Quote */}
              <div className="border-l-4 border-black pl-6 py-4 bg-gray-50 rounded-r-lg">
                <p className="text-lg font-medium text-gray-900 italic">
                  "Turning complex challenges into elegant solutions"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold text-black mb-8 text-center">Tools & Technologies</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-8">
              {/* First set of tools */}
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3 whitespace-nowrap"
                >
                  <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="w-6 h-6" />
                  <span className="text-sm font-medium text-gray-800">{tool.name}</span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {tools.map((tool, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex items-center space-x-3 bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-3 whitespace-nowrap"
                >
                  <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="w-6 h-6" />
                  <span className="text-sm font-medium text-gray-800">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
