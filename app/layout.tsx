import type React from "react"
import type { Metadata } from "next"
import { Patua_One, Roboto } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const patuaOne = Patua_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patua-one",
  display: "swap",
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abel Getahun - Software Creator & Seeker",
  description: "Portfolio of Abel Getahun - Software Engineer, AI/ML Enthusiast, and Problem Solver",
  generator: "v0.app",
  keywords: ["Abel Getahun", "Software Engineer", "AI", "Machine Learning", "Portfolio", "Developer"],
  authors: [{ name: "Abel Getahun" }],
  openGraph: {
    title: "Abel Getahun - Software Creator & Seeker",
    description: "Portfolio of Abel Getahun - Software Engineer, AI/ML Enthusiast, and Problem Solver",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${patuaOne.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
