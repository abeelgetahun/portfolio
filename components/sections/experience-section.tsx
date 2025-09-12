"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, GraduationCap, Award, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    type: "experience",
    title: "FULLSTACK ENGINEER",
    company: "SellerSuite",
    location: "Remote",
    period: "FEB, 2024 - PRESENT",
    description: [
      "Developing and Improving complex UI and functionality based on the modern web approach.",
      "Migrated of bootstrap mixins and codebase to tailwind based (shadcn).",
      "Developed an E2E test for most of core features of application.",
      "Assist other developers for fixing bugs and developing features.",
    ],
    skills: ["Next.js", "React", "Node.js", "PostgreSQL", "TypeScript"],
    link: "#",
  },
  {
    type: "experience",
    title: "PROJECT CONSULT & DEVELOPER",
    company: "Axiom",
    location: "Remote",
    period: "OCT, 2023 - PRESENT",
    description: ["Building & Consulting axiom integrated applications."],
    skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Mobile UI/UX"],
    link: "#",
  },
  {
    type: "experience",
    title: "LEAD FULLSTACK DEVELOPER",
    company: "ArezArmada",
    location: "Remote",
    period: "MAR, 2024 - APR, 2024",
    description: [
      "Led development of full-stack applications using modern frameworks.",
      "Collaborated with design and product teams to deliver user-centric solutions.",
    ],
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    link: "#",
  },
]

const education = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "Adama Science & Technology University",
    period: "2021 - 2025",
    status: "4th Year Student",
    gpa: "3.8/4.0",
    description: "Focused on software development, algorithms, data structures, and AI/ML technologies.",
  },
]

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-CP-2024-001",
    skills: ["Cloud Computing", "AWS Services", "Cloud Architecture"],
  },
  {
    title: "Google Data Analytics Certificate",
    issuer: "Google",
    date: "2023",
    credentialId: "GDA-2023-002",
    skills: ["Data Analysis", "SQL", "Tableau", "R Programming"],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "2023",
    credentialId: "META-FE-2023-003",
    skills: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
  },
]

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("experience")
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
    <section id="experience" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 mr-4">03</span>
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-mono text-gray-500 mx-4">CAREERS</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <h2
            className={`font-heading text-3xl md:text-4xl font-bold text-black transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Experience & Education
          </h2>
        </div>

        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-full p-1 inline-flex">
              {[
                { id: "experience", label: "Experience", icon: Briefcase },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "certifications", label: "Certifications", icon: Award },
              ].map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        {activeTab === "experience" && (
          <div className="space-y-12">
            {experiences.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 w-3 h-3 bg-green-500 rounded-full"></div>

                  {/* Timeline line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-1.5 top-3 w-px h-24 bg-gray-200"></div>
                  )}

                  {/* Content */}
                  <div className="ml-8">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-black">{item.title}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-base font-medium text-gray-700 mb-1">{item.company}</p>
                      <p className="text-sm text-gray-500">{item.period}</p>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      {item.description.map((desc, descIndex) => (
                        <p key={descIndex} className="text-gray-600 text-sm mb-2 leading-relaxed">
                          • {desc}
                        </p>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* View More Button */}
                    <button className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 transition-colors duration-200">
                      View More
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="max-w-2xl mx-auto">
            {education.map((edu, index) => (
              <Card
                key={index}
                className={`p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-2">{edu.degree}</h3>
                      <p className="text-green-600 font-medium mb-1">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">{edu.period}</p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium mb-2">
                      {edu.status}
                    </span>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium mb-2 ml-2">
                      GPA: {edu.gpa}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="w-8 h-8 text-green-500" />
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{cert.title}</h3>
                  <p className="text-green-600 font-medium mb-2">{cert.issuer}</p>
                  <p className="text-xs text-gray-500 mb-4">ID: {cert.credentialId}</p>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
