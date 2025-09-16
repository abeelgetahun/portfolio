import { cn } from "@/lib/utils"
import React from "react"

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  lined?: boolean
  elevation?: boolean
  padded?: boolean
}

export function Paper({ className, lined = false, elevation = true, padded = true, ...props }: PaperProps) {
  return (
    <div
      className={cn(
        "paper-sheet",
        elevation && "paper-shadow",
        lined && "paper-lined",
        "paper-texture",
        // Responsive side gutters: hidden on small screens
        padded && "px-0 sm:px-4 md:px-8 lg:px-12 xl:px-16",
        // Top/bottom spacing stays consistent
        padded && "py-4 sm:py-6 md:py-8",
        className
      )}
      {...props}
    />
  )
}

export default Paper
