"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
  icon: string
  index: number
  isVisible: boolean
}

export default function ProjectCard({
  title,
  description,
  image,
  tech,
  github,
  demo,
  icon,
  index,
  isVisible,
}: ProjectCardProps) {
  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200 bg-white overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-lg">{icon}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tech.slice(0, 4).map((techItem) => (
            <span key={techItem} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
              {techItem}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-md">
              +{tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
            >
              <Github className="w-4 h-4 mr-1 group-hover/link:scale-110 transition-transform duration-200" />
              <span>Code</span>
            </a>

            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors duration-200 group/link"
            >
              <ExternalLink className="w-4 h-4 mr-1 group-hover/link:translate-x-1 transition-transform duration-200" />
              <span>Demo</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
