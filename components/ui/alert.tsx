import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current font-adobe",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        adobe: "bg-white border border-gray-200 text-gray-900 [&>svg]:text-gray-600 shadow-sm",
        adobeInfo: "bg-blue-50 border border-blue-200 text-blue-900 [&>svg]:text-blue-600",
        adobeSuccess: "bg-green-50 border border-green-200 text-green-900 [&>svg]:text-green-600",
        adobeWarning: "bg-yellow-50 border border-yellow-200 text-yellow-900 [&>svg]:text-yellow-600",
        adobeError: "bg-red-50 border border-red-200 text-red-900 [&>svg]:text-red-600",
        adobeAccent: "bg-gradient-to-r from-[#0066CC]/5 to-[#0066CC]/10 border border-[#0066CC]/20 text-[#0066CC] [&>svg]:text-[#0066CC]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
