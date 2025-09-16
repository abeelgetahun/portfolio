import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import Navigation from "@/components/navigation"
import ScrollIndicator from "@/components/scroll-indicator"
import Footer from "@/components/footer"
// Paper removed per request; using side-only elevation utility

export default function Home() {
  return (
    <main className="relative">
      <ScrollIndicator />
      <Navigation />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Small black dots with floating animation */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-black rounded-full opacity-10 animate-float" />
        <div className="absolute top-32 right-20 w-1 h-1 bg-black rounded-full opacity-15 animate-geometric-float" />
        <div
          className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-black rounded-full opacity-8 animate-float"
          style={{ animationDelay: "1s" }}
        />

        {/* Small black squares with rotation */}
        <div
          className="absolute top-40 right-1/3 w-3 h-3 bg-black opacity-5 animate-spin-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-black opacity-8 animate-pulse-slow" />

        {/* Small black triangles */}
        <div className="absolute top-80 right-10 w-0 h-0 border-l-2 border-r-2 border-b-3 border-transparent border-b-black opacity-10 animate-bounce-slow" />
        <div
          className="absolute bottom-60 left-1/3 w-0 h-0 border-l-1.5 border-r-1.5 border-b-2 border-transparent border-b-black opacity-12 animate-float"
          style={{ animationDelay: "3s" }}
        />

        {/* More scattered small elements */}
        <div
          className="absolute top-96 left-2/3 w-1 h-1 bg-black rounded-full opacity-10 animate-geometric-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-32 right-1/4 w-2 h-2 bg-black rounded-full opacity-6 animate-float"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="absolute top-1/2 left-16 w-1.5 h-1.5 bg-black opacity-8 animate-spin-slow"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="absolute bottom-20 right-16 w-1 h-1 bg-black rounded-full opacity-12 animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10">
  <div className="mx-auto max-w-7xl px-0 sm:px-3 md:px-5 lg:px-8 mt-0 mb-10">
          <div className="page-lines mx-2 sm:mx-4 md:mx-6 lg:mx-8 pt-14 sm:pt-16 md:pt-20 px-3 sm:px-5 md:px-8">
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
              <EducationSection />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </main>
  )
}
