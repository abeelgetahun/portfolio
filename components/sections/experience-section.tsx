"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

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
    link: "https://jirtuu.com/",
  },
  {
    type: "experience",
    title: "FULLSTACK DEVELOPER",
    company: "Ethiotelecom",
    location: "Addis Ababa",
  period: "JUL - AUG 2025",
    description: [
      "Built and integrated full-stack features across web services and UI.",
      "Collaborated with team to deliver improvements within tight timelines.",
    ],
    skills: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"],
    link: "",
  },
]

// education and certifications removed to focus on careers only

export default function ExperienceSection() {
  

  return (
  <section id="experience" className="pt-12 pb-16 bg-white scroll-mt-28">
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
                        <span className="text-xl font-semibold text-black">{item.company}</span>
                        {item.link && item.link.trim() !== '' && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${item.company} website`}
                            title={`Open ${item.company}`}
                            className="inline-flex items-center text-gray-500 hover:text-black"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
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

                    {/* Removed View More as requested */}
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}
