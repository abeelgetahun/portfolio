"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"

const articles = [
  {
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript for better maintainability and developer experience.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "React",
    link: "#",
  },
  {
    title: "Modern State Management in React: Beyond Redux",
    excerpt:
      "Exploring modern state management solutions including Zustand, Jotai, and React Query for different use cases.",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    category: "State Management",
    link: "#",
  },
  {
    title: "Optimizing Next.js Performance for Production",
    excerpt:
      "Best practices for optimizing Next.js applications including image optimization, code splitting, and caching strategies.",
    date: "Nov 10, 2024",
    readTime: "10 min read",
    category: "Next.js",
    link: "#",
  },
  {
    title: "Building Real-time Applications with WebSockets",
    excerpt:
      "A comprehensive guide to implementing real-time features using WebSockets, Socket.io, and modern web technologies.",
    date: "Oct 22, 2024",
    readTime: "15 min read",
    category: "WebSockets",
    link: "#",
  },
]

export default function ArticlesSection() {
  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Articles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharing knowledge and insights about modern web development, best practices, and emerging technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-black bg-gray-100 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-gray-700 transition-colors">
                {article.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
