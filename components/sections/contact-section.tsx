"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Briefcase, Send, Github, Linkedin } from "lucide-react"

export default function ContactSection() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)

    // You would typically send the form data to your backend here
    console.log("Form submitted:", formData)
  }

  return (
  <section id="contact" ref={sectionRef} className="py-20 contact-gradient relative overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 border border-gray-600 rotate-45 animate-float opacity-20"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 border border-gray-500 rotate-12 animate-float opacity-30"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 border border-gray-400 rotate-45 animate-float opacity-25"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            {"Let's Build Something Amazing Together"}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-gray-600">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-200">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-200">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-200">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-200">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-white resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-300">abelgetahun66@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-300">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-gray-300">Adama, Ethiopia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-300">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Available for</h3>
                  <p className="text-gray-300">Freelance • Full-time • Collaboration</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-600">
              <h3 className="font-semibold text-white mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/abeelgetahun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abeeel-getahun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://t.me/Yene_enat1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <Send className="w-6 h-6" />
                </a>
                <a
                  href="mailto:abelgetahun66@gmail.com"
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <h3 className="font-heading text-xl font-bold text-white mb-2">Ready to start a project?</h3>
              <p className="text-gray-300 text-sm mb-4">
                {"I'm"} always excited to work on innovative projects and collaborate with talented teams.
              </p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent"
                asChild
              >
                <a href="mailto:abelgetahun66@gmail.com">{"Let's"} Talk</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
