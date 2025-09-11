"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award } from "lucide-react"

const educationData = [
  {
    type: "education",
    institution: "Addis Ababa University",
    degree: "Bachelor of Science in Software Engineering",
    period: "2019 - 2023",
    description:
      "Focused on software development, algorithms, and system design with hands-on projects in web and mobile development.",
  },
  {
    type: "education",
    institution: "Ethiopian Technical University",
    degree: "Diploma in Computer Science",
    period: "2017 - 2019",
    description: "Foundation in programming fundamentals, database management, and computer systems.",
  },
]

const certificationData = [
  {
    type: "certification",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    period: "2023",
    description: "Certified in developing and maintaining applications on AWS platform.",
  },
  {
    type: "certification",
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    period: "2023",
    description: "Professional certification in cloud architecture and development.",
  },
  {
    type: "certification",
    title: "React Developer Certification",
    issuer: "Meta",
    period: "2022",
    description: "Advanced certification in React development and modern JavaScript.",
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Education</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My academic background and professional certifications that shaped my expertise in software development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <GraduationCap className="w-8 h-8 text-black mr-3" />
              <h3 className="text-2xl font-bold text-black">Education</h3>
            </div>

            <div className="space-y-6">
              {educationData.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6 pb-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-black mb-2">{item.degree}</h4>
                    <p className="text-lg text-gray-700 mb-2">{item.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <Award className="w-8 h-8 text-black mr-3" />
              <h3 className="text-2xl font-bold text-black">Certifications</h3>
            </div>

            <div className="space-y-6">
              {certificationData.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6 pb-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-black mb-2">{item.title}</h4>
                    <p className="text-lg text-gray-700 mb-2">{item.issuer}</p>
                    <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
