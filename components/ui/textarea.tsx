import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 rounded-md border bg-transparent shadow-xs focus-visible:ring-[3px]",
        adobe: "bg-white border border-gray-300 focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC]/20 font-adobe placeholder:text-gray-500 hover:border-gray-400 transition-all duration-200",
        adobeFocused: "bg-white border border-[#0066CC] focus:ring-1 focus:ring-[#0066CC]/20 font-adobe placeholder:text-gray-500 transition-all duration-200",
        adobeError: "bg-white border border-red-500 focus:ring-1 focus:ring-red-500/20 font-adobe placeholder:text-gray-500 transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Textarea({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea }
