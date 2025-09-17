import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ab_el",
  description: "Portfolio of Abel Getahun - Software Engineer, AI/ML Enthusiast, and Problem Solver",
  generator: "v0.app",
  keywords: ["Abel Getahun", "Software Engineer", "AI", "Machine Learning", "Portfolio", "Developer"],
  authors: [{ name: "Abel Getahun" }],
  openGraph: {
    title: "Ab_el",
    description: "Portfolio of Abel Getahun - Software Engineer, AI/ML Enthusiast, and Problem Solver",
    type: "website",
  },
  icons: {
    icon: "/profile/profile-1.png",
    shortcut: "/profile/profile-1.png",
    apple: "/profile/profile-1.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
  <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
