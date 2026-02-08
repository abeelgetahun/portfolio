"use client"

import { useState, useEffect, useRef } from "react"
import ProjectCard from "@/components/project-card"

// Projects dataset updated per user content and order
const projects = [
  // 1. Chewata
  {
    id: 1,
    title: "Chewata",
    description:
      "A modern Flutter chat app with real-time messaging, presence, receipts, privacy controls, and random connections.",
    images: [
      "/projects/chewata/000.jpg",
      "/projects/chewata/001.jpg",
      "/projects/chewata/002.jpg",
      "/projects/chewata/003.jpg",
      "/projects/chewata/004.jpg",
      "/projects/chewata/005.jpg",
    ],
    tech: ["Flutter", "Firebase"],
    github: "https://github.com/abeelgetahun/chewata-ChatApp",
    demo: "https://github.com/abeelgetahun/chewata-ChatApp/releases/tag/chewata",
    icon: "💬",
  },
  // 2. OpenRooms
  {
    id: 2,
    title: "HotelScout",
    description:
      "A mobile app to explore hotels in Ethiopia with location filters, detailed info, and a clean browsing experience.",
    images: ["/projects/openrooms/00.jpg"],
    // tech: ["Flutter", "Supabase"],
    tech: ["Flutter"],
    github: "",
    demo: "",
    icon: "🏨",
  },
  // 3. Bingo
  {
    id: 3,
    title: "Bingo",
    description:
      "A mobile app that lets users enjoy multiple bingo game types with a fun, interactive, and easy-to-use experience.",
    images: ["/projects/bingo/00.jpg"],
    tech: ["Flutter"],
    github: "",
    demo: "",
    icon: "🎲",
  },
  // 4. YeneShop
  {
    id: 4,
    title: "YeneShop",
    description:
      "A feature-rich Android app for managing and selling items with sales tracking, reports, and modular design",
    images: [
      "/projects/yeneshop/00.png",
      "/projects/yeneshop/01.png",
      "/projects/yeneshop/02.png",
      "/projects/yeneshop/03.png",
      "/projects/yeneshop/04.png",
      "/projects/yeneshop/05.png",
    ],
    tech: ["Android", "Java", "XML", "SQLite"],
    github: "https://github.com/abeelgetahun/Yene-shop",
    demo: "https://github.com/abeelgetahun/Yene-shop/releases/tag/Yene_shop",
    icon: "🛍️",
  },
  // 5. TeleStock
  {
    id: 5,
    title: "TeleStock",
    description:
      "Web app for automated warehouse management with role-based access and powerful analytics.",
    images: [
      "/projects/telestock/00.jpg",
      "/projects/telestock/01.jpg",
      "/projects/telestock/02.jpg",
      "/projects/telestock/03.jpg",
      "/projects/telestock/04.jpg",
      "/projects/telestock/05.jpg",
    ],
    tech: ["Next.js", "Neon", "Postgres"],
    github: "https://github.com/abeelgetahun/Tele-WMS",
    demo: "https://tele-stock.vercel.app/",
    icon: "📦",
  },
  // 6. Ethiopian Bank Review Analysis
  {
    id: 6,
    title: "Ethiopian Bank Review Analysis",
    description:
      "Analyzes Ethiopian banking app reviews to deliver reliable sentiment and theme insights for product, risk, customer teams.",
    images: ["/projects/bank-review/00.png"],
    tech: ["Pandas", "Scikit-learn", "NLTK"],
    github: "https://github.com/abeelgetahun/Ethiopian-banks-review-analysis",
    demo: "",
    icon: "🏦",
  },
  // 7. Amharic E-commerce NER
  {
    id: 7,
    title: "Amharic E-commerce NER",
    description:
      "Centralized Amharic e-commerce platform using NER and LLMs to extract product, price, and vendor insights.",
    images: ["/projects/e-commerce-ner/00.png"],
    tech: ["Teletone", "PyTorch", "Pandas"],
    github: "https://github.com/abeelgetahun/Amharic-E-commerce-NER",
    demo: "",
    icon: "🛒",
  },
  // 8. Insurance Risk Analytics
  {
    id: 8,
    title: "Insurance Risk Analytics",
    description:
      "Predictive modeling of insurance claims for premium optimization using ML and SHAP insights.",
    images: ["/projects/insurance-risk-analysis/00.png"],
    tech: ["Pandas", "DVC", "Scikit-learn"],
    github: "https://github.com/abeelgetahun/End-to-End-Insurance-Risk-Analytics-Predictive-Modeling",
    demo: "",
    icon: "📊",
  },
  // 9. Much more
  {
    id: 9,
    title: "Much more",
    description:
      "You can find more about my projects on my GitHub repo.",
    // Use GitHub profile preview as image; fallback to public placeholder if blocked
    images: [
      "https://github.com/abeelgetahun.png",
    ],
    tech: ["Python", "C++", "Jupyter", "Java"],
    github: "https://github.com/abeelgetahun",
    demo: "",
    icon: "🔗",
    cardHref: "https://github.com/abeelgetahun",
    suppressLinks: true,
    githubProfileUsername: "abeelgetahun",
  },
]

export default function ProjectsSection() {
  

  return (
  <section id="projects" className="pt-12 pb-16 bg-white scroll-mt-28">
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
              cardHref={(project as any).cardHref}
              suppressLinks={(project as any).suppressLinks}
              githubProfileUsername={(project as any).githubProfileUsername}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
