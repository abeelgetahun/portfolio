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
    "I’m Abel Getahun, a software engineering student who loves solving problems and turning ideas into practical solutions through collaborative projects.",
  keywords: [
    "Abel Getahun",
    "Abel",
    "Ab_el",
    "ab_el",
    "Abeeel",
    "abeeel",
    "Abel Getahun Portfolio",
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
      "I’m Abel Getahun, a software engineering student who loves solving problems and turning ideas into practical solutions through collaborative projects.",
    url: "https://www.abelgetahun.dev",
    siteName: "Ab_el",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Abel Getahun | Software Developer",
    description:
      "I’m Abel Getahun, a software engineering student who loves solving problems and turning ideas into practical solutions through collaborative projects.",
    creator: "@abelgetahun_",
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
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/icon.png"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abel Getahun",
  alternateName: ["Ab_el", "ab_el", "Abeeel", "abeeel"],
  url: "https://www.abelgetahun.dev",
  jobTitle: "Software Engineer",
  description:
    "I’m Abel Getahun, a software engineering student who loves solving problems and turning ideas into practical solutions through collaborative projects.",
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
  name: "Ab_el",
  alternateName: ["Ab_el", "ab_el", "Abeeel", "abeeel"],
  url: "https://www.abelgetahun.dev",
  description:
    "Portfolio website of Abel Getahun, a software engineering student solving problems and building practical solutions through collaborative projects.",
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
