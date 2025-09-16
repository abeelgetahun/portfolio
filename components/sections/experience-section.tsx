"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    type: "experience",
    title: "MOBILE APP DEVELOPER INTERN",
    company: "Jirtuu Software Labs",
    location: "Remote",
  period: "JUN - AUG 2025",
    description: [
      "Contributed to mobile app features and UI flows.",
      "Implemented bug fixes and performance improvements during internship.",
    ],
    skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
    link: "#",
  },
  {
    type: "experience",
    title: "FULLSTACK DEVELOPER",
    company: "Ethiotelecom",
    location: "Addis Ababa",
  period: "JUN - AUG 2025",
    description: [
      "Built and integrated full-stack features across web services and UI.",
      "Collaborated with team to deliver improvements within tight timelines.",
    ],
    skills: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"],
    link: "#",
  },
]

// education and certifications removed to focus on careers only

export default function ExperienceSection() {
  

  return (
  <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strip only */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">03</span>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-mono text-gray-500 mx-4">CAREERS</span>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="space-y-12">
            {experiences.map((item, index) => (
              <div key={index}>
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-3 h-3 bg-gray-300 rounded-full"></div>

                  {/* Timeline line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-1.5 top-3 bottom-0 w-px bg-gray-200"></div>
                  )}

                  {/* Content */}
                  <div className="ml-8">
                    <div className="mb-4">
                      <p className="text-xs md:text-sm font-mono tracking-wider uppercase text-gray-500 mb-2">{item.period}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <a href={item.link || '#'} target="_blank" rel="noreferrer" className="text-xl font-semibold text-black hover:underline">
                          {item.company}
                        </a>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <h3 className="text-base md:text-lg font-mono font-semibold uppercase tracking-wider text-black">{item.title}</h3>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      {item.description.map((desc, descIndex) => (
                        <p key={descIndex} className="text-gray-600 text-sm mb-2 leading-relaxed">
                          • {desc}
                        </p>
                      ))}
                    </div>

                    {/* View More Button */}
                    <Button variant="ghost" className="mt-2 inline-flex items-center gap-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
                      View More <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}
