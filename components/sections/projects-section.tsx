"use client"

import { useState, useEffect, useRef } from "react"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    id: 1,
    title: "FARMUI",
    description:
      "Opensource Design system, UI component library and template solution based on tailwindcss and shadcn. A comprehensive toolkit for modern web development.",
    image: "/banking-analytics-dashboard-with-charts-and-graphs.jpg",
    tech: ["React", "Tailwind", "TypeScript", "Shadcn", "Next.js"],
    github: "https://github.com/abel/farmui",
    demo: "https://farmui.vercel.app",
    icon: "🌾",
  },
  {
    id: 2,
    title: "MEGAMESS",
    description:
      "Opensource privacy first file sharing and analytics tools for companies and enterprise users. Secure, fast, and reliable file management solution.",
    image: "/ner-visualization-with-highlighted-entities-in-tex.jpg",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TypeScript"],
    github: "https://github.com/abel/megamess",
    demo: "https://megamess.vercel.app",
    icon: "📊",
  },
  {
    id: 3,
    title: "CHACHA",
    description:
      "Opensource multi tenant web streaming platform supporting most used protocols. Real-time communication with advanced streaming capabilities.",
    image: "/insurance-analytics-dashboard-with-risk-metrics.jpg",
    tech: ["React", "WebRTC", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/abel/chacha",
    demo: "https://chacha.vercel.app",
    icon: "💬",
  },
  {
    id: 4,
    title: "MDJSONIFY",
    description:
      "An optimized - 3x Faster way of dumping your json compatible data from markdown data store. Perfect for static site generators.",
    image: "/modern-chat-app-interface-with-messages.jpg",
    tech: ["JavaScript", "Node.js", "Markdown", "JSON", "CLI"],
    github: "https://github.com/abel/mdjsonify",
    demo: "https://npmjs.com/package/mdjsonify",
    icon: "📝",
  },
]

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">05</span>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-mono text-gray-500 mx-4">PROJECTS</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              github={project.github}
              demo={project.demo}
              icon={project.icon}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
