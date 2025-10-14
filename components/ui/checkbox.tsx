"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer shrink-0 border transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 rounded-[4px] shadow-xs",
        adobe: "border-gray-300 bg-white data-[state=checked]:bg-[#0066CC] data-[state=checked]:border-[#0066CC] data-[state=checked]:text-white focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 size-4 rounded-sm shadow-sm font-adobe",
        adobeMinimal: "border-gray-200 bg-transparent data-[state=checked]:bg-[#0066CC] data-[state=checked]:border-[#0066CC] data-[state=checked]:text-white focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 size-4 rounded-sm font-adobe",
        adobeAccent: "border-[#0066CC]/30 bg-gradient-to-br from-white to-[#0066CC]/5 data-[state=checked]:bg-[#0066CC] data-[state=checked]:border-[#0066CC] data-[state=checked]:text-white focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 size-4 rounded-sm shadow-sm font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Checkbox({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
