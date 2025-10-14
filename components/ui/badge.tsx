import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden font-adobe",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        adobe: "border-gray-200 bg-white text-gray-700 [a&]:hover:bg-gray-50 [a&]:hover:text-gray-900",
        adobeInfo: "border-blue-200 bg-blue-50 text-blue-700 [a&]:hover:bg-blue-100 [a&]:hover:text-blue-800",
        adobeSuccess: "border-green-200 bg-green-50 text-green-700 [a&]:hover:bg-green-100 [a&]:hover:text-green-800",
        adobeWarning: "border-yellow-200 bg-yellow-50 text-yellow-700 [a&]:hover:bg-yellow-100 [a&]:hover:text-yellow-800",
        adobeError: "border-red-200 bg-red-50 text-red-700 [a&]:hover:bg-red-100 [a&]:hover:text-red-800",
        adobeAccent: "border-[#0066CC]/20 bg-[#0066CC]/10 text-[#0066CC] [a&]:hover:bg-[#0066CC]/20 [a&]:hover:text-[#0066CC]",
        adobeOutline: "border-gray-300 bg-transparent text-gray-700 [a&]:hover:bg-gray-50 [a&]:hover:text-gray-900",
        adobeMinimal: "border-gray-100 bg-gray-50 text-gray-600 [a&]:hover:bg-gray-100 [a&]:hover:text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
