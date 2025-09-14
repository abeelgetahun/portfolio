import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

export default function SectionTitle({ children, className }: Props) {
  return (
    <h2 className={cn("font-heading text-3xl md:text-4xl font-bold text-black", className)}>{children}</h2>
  )
}
