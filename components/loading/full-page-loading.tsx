import { cn } from "@/lib/utils"

const LETTERS = ["L", "O", "A", "D", "I", "N", "G"] as const

export default function FullPageLoading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] w-full items-center justify-center bg-[#FAFAFA] px-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="sr-only">Loading portfolio</span>
        <div className="flex items-center gap-2 text-xs font-medium uppercase text-gray-500 sm:gap-3 sm:text-sm md:text-base">
          {LETTERS.map((letter, index) => (
            <span
              aria-hidden="true"
              key={`${letter}-${index}`}
              className="loading-letter"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
