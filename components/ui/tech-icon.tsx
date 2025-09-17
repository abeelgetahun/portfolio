"use client"

import React from "react"

type TechIconProps = {
  name: string
  size?: number
  className?: string
}

// Prefer modern colored icons from Devicon; fallback to Simple Icons
type Source = "devicon" | "simpleicons" | "local"
type IconMap = Record<string, { source: Source; slug: string; variant?: string }>

const iconMap: IconMap = {
  // Web / JS
  "react": { source: "devicon", slug: "react/react-original" },
  "next": { source: "devicon", slug: "nextjs/nextjs-original" },
  "next.js": { source: "devicon", slug: "nextjs/nextjs-original" },
  "nextjs": { source: "devicon", slug: "nextjs/nextjs-original" },
  "tailwind": { source: "devicon", slug: "tailwindcss/tailwindcss-plain" },

  // Mobile
  "flutter": { source: "devicon", slug: "flutter/flutter-original" },
  "android": { source: "devicon", slug: "android/android-original" },

  // Backends / DB
  // Prefer local assets when available
  "firebase": { source: "local", slug: "/logo/firebase.png" },
  "supabase": { source: "devicon", slug: "supabase/supabase-original" },
  "postgres": { source: "devicon", slug: "postgresql/postgresql-original" },
  "postgresql": { source: "devicon", slug: "postgresql/postgresql-original" },
  "postgress": { source: "devicon", slug: "postgresql/postgresql-original" },
  "neon": { source: "local", slug: "/logo/neon.svg" },
  "neon db": { source: "local", slug: "/logo/neon.svg" },
  "neondb": { source: "local", slug: "/logo/neon.svg" },
  "neondatabase": { source: "local", slug: "/logo/neon.svg" },
  "sqlite": { source: "devicon", slug: "sqlite/sqlite-original" },

  // Languages
  "java": { source: "devicon", slug: "java/java-original" },
  "typescript": { source: "devicon", slug: "typescript/typescript-original" },
  "python": { source: "devicon", slug: "python/python-original" },

  // Data / ML
  "pandas": { source: "devicon", slug: "pandas/pandas-original" },
  "scikit-learn": { source: "devicon", slug: "scikitlearn/scikitlearn-original" },
  "scikitlearn": { source: "devicon", slug: "scikitlearn/scikitlearn-original" },
  "nltk": { source: "devicon", slug: "python/python-original" }, // fallback to Python
  "pytorch": { source: "devicon", slug: "pytorch/pytorch-original" },
  "pythorch": { source: "devicon", slug: "pytorch/pytorch-original" },
  "dvc": { source: "simpleicons", slug: "dvc" },
}

function normalize(name: string) {
  return name.trim().toLowerCase()
}

function deviconUrl(slug: string) {
  // slug e.g., "java/java-original" -> icons/java/java-original.svg
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}.svg`
}

function simpleIconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}`
}

export function TechIcon({ name, size = 18, className = "" }: TechIconProps) {
  const key = normalize(name)
  const def = iconMap[key]

  // Build candidate URLs (with fallbacks for Simple Icons slugs/CDNs)
  const candidates: string[] = []
  if (def) {
    if (def.source === "local") {
      candidates.push(def.slug)
    } else if (def.source === "devicon") {
      candidates.push(deviconUrl(def.slug))
    } else if (def.source === "simpleicons") {
      let slugs = [def.slug]
      if (key.includes("neon")) {
        slugs = ["neondatabase", "neon"]
      }
      for (const s of slugs) {
        candidates.push(simpleIconUrl(s))
        candidates.push(`https://cdn.jsdelivr.net/npm/simple-icons/icons/${s}.svg`)
      }
    }
  }

  const [idx, setIdx] = React.useState(0)
  const src = candidates[idx] ?? null

  if (!src) {
    return (
      <span
        title={name}
        className={`inline-flex items-center justify-center rounded-md bg-gray-100 text-gray-700 text-[10px] font-semibold w-6 h-6 ${className}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      title={name}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}

export function TechIconsRow({ tech, max = 8 }: { tech: string[]; max?: number }) {
  const items = tech.slice(0, max)
  return (
    <div className="flex items-center flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="inline-flex items-center justify-center bg-gray-50 rounded-md px-1.5 py-1">
          <TechIcon name={t} />
        </span>
      ))}
      {tech.length > items.length && (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-md">
          +{tech.length - items.length}
        </span>
      )}
    </div>
  )
}

export default TechIcon
