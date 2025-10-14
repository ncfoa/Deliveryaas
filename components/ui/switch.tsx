"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 h-[1.15rem] w-8 shadow-xs focus-visible:ring-[3px]",
        adobe: "data-[state=checked]:bg-[#0066CC] data-[state=unchecked]:bg-gray-300 focus:ring-1 focus:ring-[#0066CC]/20 h-5 w-9 transition-all duration-200",
        adobeLarge: "data-[state=checked]:bg-[#0066CC] data-[state=unchecked]:bg-gray-300 focus:ring-1 focus:ring-[#0066CC]/20 h-6 w-12 transition-all duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full ring-0 transition-transform",
  {
    variants: {
      variant: {
        default: "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        adobe: "bg-white size-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 shadow-sm",
        adobeLarge: "bg-white size-5 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Switch({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ variant }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
