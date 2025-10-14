"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioGroupVariants = cva(
  "grid gap-3",
  {
    variants: {
      variant: {
        default: "",
        adobe: "gap-4",
        adobeMinimal: "gap-3",
        adobeAccent: "gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const radioGroupItemVariants = cva(
  "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        adobe: "border-gray-300 bg-white text-[#0066CC] focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 hover:border-[#0066CC]/50 data-[state=checked]:border-[#0066CC] data-[state=checked]:bg-[#0066CC] font-adobe",
        adobeMinimal: "border-gray-200 bg-transparent text-gray-600 focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 hover:border-gray-300 data-[state=checked]:border-[#0066CC] data-[state=checked]:bg-[#0066CC] font-adobe",
        adobeAccent: "border-[#0066CC]/20 bg-gradient-to-br from-white to-[#0066CC]/5 text-[#0066CC] focus-visible:border-[#0066CC] focus-visible:ring-[#0066CC]/20 hover:border-[#0066CC]/30 data-[state=checked]:border-[#0066CC] data-[state=checked]:bg-[#0066CC] font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function RadioGroup({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & VariantProps<typeof radioGroupVariants>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ variant }), className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & VariantProps<typeof radioGroupItemVariants>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioGroupItemVariants({ variant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-current absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
