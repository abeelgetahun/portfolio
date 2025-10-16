import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abelgetahun.dev"),
  title: {
    default: "Ab_el",
    template: "%s | Abel Getahun",
  },
  description:
    "Explore the portfolio of Abel Getahun, a software engineer, Mobile developer and AI enthusiast building intuitive web, mobile, and machine learning solutions.",
  keywords: [
    "Abel Getahun",
    "Abel",
    "Abel Getahun portfolio",
    "software engineer",
    "mobile developer",
    "flutter developer",
    "mobile application development", 
    "machine learning developer",
    "frontend developer", 
    "Ethiopian software engineer",
    "Next.js portfolio",
  ],
  category: "technology",
  generator: "Next.js",
  authors: [{ name: "Abel Getahun", url: "https://www.abelgetahun.dev" }],
  creator: "Abel Getahun",
  publisher: "Abel Getahun",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ab_el",
    description:
      "Explore the portfolio of Abel Getahun, a software engineer and AI enthusiast building intuitive web, mobile, and machine learning solutions.",
    url: "https://www.abelgetahun.dev",
    siteName: "Abel Getahun Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.abelgetahun.dev/profile/profile-3.png",
        width: 1200,
        height: 630,
        alt: "Abeeel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abel Getahun | Software Engineer | Mobile app developer",
    description:
      "Discover projects, experience, and articles from software engineer Abel Getahun focusing on AI, web, and mobile solutions.",
    creator: "@abelgetahun_",
    images: ["https://www.abelgetahun.dev/profile/profile-3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/profile/profile-3.png", type: "image/png" }],
    shortcut: "/profile/profile-3.png",
    apple: "/profile/profile-3.png",
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abel Getahun",
  url: "https://www.abelgetahun.dev",
  image: "https://www.abelgetahun.dev/profile/profile-1.png",
  jobTitle: "Software Engineer",
  description:
    "Software engineer, building human-centered web, mobile, and data solutions from Ethiopia.",
  email: "mailto:abelgetahun66@gmail.com",
  sameAs: [
    "https://github.com/abeelgetahun",
    "https://www.linkedin.com/in/abeeel-getahun/",
    "https://x.com/abelgetahun_",
    "https://t.me/Yene_enat1",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ET",
  },
  knowsAbout: [
    "Software Engineering",
    "Machine Learning",
    "Artificial Intelligence",
    "Product Design",
    "Web Development",
    "Mobile Development",
    "Data Analysis",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Adama Science and Technology University",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Abel Getahun Portfolio",
  url: "https://www.abelgetahun.dev",
  description:
    "Portfolio website showcasing the projects, experience, and achievements of software engineer Abel Getahun.",
  publisher: {
    "@type": "Person",
    name: "Abel Getahun",
  },
  inLanguage: "en-US",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd, personJsonLd]),
          }}
        />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
