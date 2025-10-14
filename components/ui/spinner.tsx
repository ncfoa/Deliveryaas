import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "text-primary",
        adobe: "text-[#0066CC]",
        adobeMinimal: "text-gray-400",
        adobeAccent: "text-[#0066CC]",
        adobeSubtle: "text-gray-300",
        adobeSuccess: "text-green-500",
        adobeWarning: "text-yellow-500",
        adobeError: "text-red-500",
      },
      size: {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SpinnerProps extends React.ComponentProps<"div">, VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({ 
  className, 
  variant,
  size,
  label = "Loading...",
  ...props 
}: SpinnerProps) {
  return (
    <div
      data-slot="spinner"
      className={cn("flex items-center justify-center", className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <svg
        className={cn(spinnerVariants({ variant, size }))}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Adobe-style loading dots component
const loadingDotsVariants = cva(
  "inline-block rounded-full animate-pulse",
  {
    variants: {
      variant: {
        default: "bg-primary",
        adobe: "bg-[#0066CC]",
        adobeMinimal: "bg-gray-400",
        adobeAccent: "bg-[#0066CC]",
        adobeSubtle: "bg-gray-300",
        adobeSuccess: "bg-green-500",
        adobeWarning: "bg-yellow-500",
        adobeError: "bg-red-500",
      },
      size: {
        sm: "w-1 h-1",
        default: "w-2 h-2",
        lg: "w-3 h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LoadingDotsProps extends React.ComponentProps<"div">, VariantProps<typeof loadingDotsVariants> {
  label?: string
}

function LoadingDots({ 
  className, 
  variant,
  size,
  label = "Loading...",
  ...props 
}: LoadingDotsProps) {
  return (
    <div
      data-slot="loading-dots"
      className={cn("flex items-center space-x-1", className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <div className={cn(loadingDotsVariants({ variant, size }), "animate-bounce")} style={{ animationDelay: "0ms" }} />
      <div className={cn(loadingDotsVariants({ variant, size }), "animate-bounce")} style={{ animationDelay: "150ms" }} />
      <div className={cn(loadingDotsVariants({ variant, size }), "animate-bounce")} style={{ animationDelay: "300ms" }} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Adobe-style loading bar component
const loadingBarVariants = cva(
  "relative overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        adobe: "bg-[#0066CC]/20",
        adobeMinimal: "bg-gray-200",
        adobeAccent: "bg-[#0066CC]/20",
        adobeSubtle: "bg-gray-100",
        adobeSuccess: "bg-green-200",
        adobeWarning: "bg-yellow-200",
        adobeError: "bg-red-200",
      },
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LoadingBarProps extends React.ComponentProps<"div">, VariantProps<typeof loadingBarVariants> {
  progress?: number
  label?: string
}

function LoadingBar({ 
  className, 
  variant,
  size,
  progress = 0,
  label = "Loading...",
  ...props 
}: LoadingBarProps) {
  const barColor = variant === "adobe" ? "bg-[#0066CC]" : 
                   variant === "adobeAccent" ? "bg-[#0066CC]" :
                   variant === "adobeSuccess" ? "bg-green-500" :
                   variant === "adobeWarning" ? "bg-yellow-500" :
                   variant === "adobeError" ? "bg-red-500" :
                   "bg-primary"

  return (
    <div
      data-slot="loading-bar"
      className={cn(loadingBarVariants({ variant, size }), className)}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      {...props}
    >
      <div
        className={cn("h-full transition-all duration-300 ease-out", barColor)}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export { Spinner, LoadingDots, LoadingBar, spinnerVariants, loadingDotsVariants, loadingBarVariants }






