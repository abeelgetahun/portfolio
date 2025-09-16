"use client"

import { useState, useEffect, useRef } from "react"
import ProjectCard from "@/components/project-card"

// Updated dataset referencing actual images in public/projects/*
const projects = [
  {
    id: 1,
    title: "Bingo",
    description:
      "Interactive Bingo game platform featuring real-time number draws, responsive UI, and optimized asset loading for casual play.",
    images: ["/projects/bingo/00.jpg"],
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
    icon: "🎲",
  },
  {
    id: 2,
    title: "TeleStock",
    description:
      "Telecommunications inventory & asset tracking dashboard with visual insights and multi-step workflows for operations teams.",
    images: [
      "/projects/telestock/00.jpg",
      "/projects/telestock/01.jpg",
      "/projects/telestock/02.jpg",
      "/projects/telestock/03.jpg",
      "/projects/telestock/04.jpg",
      "/projects/telestock/05.jpg",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Charts"],
    github: "#",
    demo: "#",
    icon: "📈",
  },
  {
    id: 3,
    title: "Chewata Arcade",
    description:
      "Collection of casual arcade-style mini games with animated transitions, sprite assets, and performance tuned rendering.",
    images: [
      "/projects/chewata/000.jpg",
      "/projects/chewata/001.jpg",
      "/projects/chewata/002.jpg",
      "/projects/chewata/003.jpg",
      "/projects/chewata/004.jpg",
      "/projects/chewata/005.jpg",
    ],
    tech: ["React", "Canvas", "TypeScript"],
    github: "#",
    demo: "#",
    icon: "👾",
  },
  {
    id: 4,
    title: "YeneShop",
    description:
      "Modern e-commerce experience with product browsing, cart flow, and adaptive image handling for faster browsing.",
    images: [
      "/projects/yeneshop/00.png",
      "/projects/yeneshop/01.png",
      "/projects/yeneshop/02.png",
      "/projects/yeneshop/03.png",
      "/projects/yeneshop/04.png",
      "/projects/yeneshop/05.png",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Commerce"],
    github: "#",
    demo: "#",
    icon: "�",
  },
  {
    id: 5,
    title: "Bank Review Analyzer",
    description:
      "Bank customer review analysis interface highlighting sentiment and categorization for operational insights.",
    images: ["/projects/bank-review/00.png"],
    tech: ["Next.js", "NLP", "TypeScript"],
    github: "#",
    demo: "#",
    icon: "🏦",
  },
  {
    id: 6,
    title: "Insurance Risk Analysis",
    description:
      "Dashboard for modeling insurance risk scenarios with layered visual analytics and KPIs.",
    images: ["/projects/insurance-risk-analysis/00.png"],
    tech: ["React", "Analytics", "TypeScript"],
    github: "#",
    demo: "#",
    icon: "�️",
  },
  {
    id: 7,
    title: "OpenRooms",
    description:
      "Room listing and availability explorer with simplified booking flow and responsive image galleries.",
    images: ["/projects/openrooms/00.jpg"],
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
    icon: "🏨",
  },
  {
    id: 8,
    title: "NER Visualizer",
    description:
      "Named entity recognition visualization tool highlighting extracted entities with contextual coloring.",
    images: ["/projects/e-commerce-ner/00.png"],
    tech: ["NLP", "Visualization", "TypeScript"],
    github: "#",
    demo: "#",
    icon: "�",
  },
]

export default function ProjectsSection() {
  

  return (
  <section id="projects" className="pt-0 pb-16 bg-white scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">02</span>
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
              images={(project as any).images}
              tech={project.tech}
              github={project.github}
              demo={project.demo}
              icon={project.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
