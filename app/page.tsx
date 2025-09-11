import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import ExperienceSection from "@/components/sections/experience-section"
import ArticlesSection from "@/components/sections/articles-section"
import EducationSection from "@/components/sections/education-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import ScrollIndicator from "@/components/scroll-indicator"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <ScrollIndicator />
      <Navigation />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-50 rounded-full opacity-30 animate-geometric-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-100 rounded-full opacity-20 animate-float" />
        <div
          className="absolute bottom-40 left-20 w-40 h-40 bg-gray-50 rounded-full opacity-25 animate-geometric-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-gray-100 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <HeroSection />
      <div className="section-divider">
        <AboutSection />
      </div>
      <div className="section-divider">
        <ProjectsSection />
      </div>
      <div className="section-divider">
        <ExperienceSection />
      </div>
      <div className="section-divider">
        <ArticlesSection />
      </div>
      <div className="section-divider">
        <EducationSection />
      </div>
      <div className="section-divider">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
