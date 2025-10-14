"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const popoverContentVariants = cva(
  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
  {
    variants: {
      variant: {
        default: "w-72",
        adobe: "w-80 bg-white border-gray-200 shadow-lg font-adobe",
        adobeMinimal: "w-72 bg-gray-50 border-gray-100 shadow-sm font-adobe",
        adobeAccent: "w-80 bg-gradient-to-br from-white to-[#0066CC]/5 border-[#0066CC]/20 shadow-lg font-adobe",
        amazon: "w-96 bg-white border-gray-200 shadow-xl font-adobe",
        amazonMinimal: "w-80 bg-gray-50 border-gray-100 shadow-lg font-adobe",
        amazonAccent: "w-96 bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl font-adobe",
      },
      size: {
        sm: "w-64 p-3",
        default: "w-72 p-4",
        lg: "w-80 p-5",
        xl: "w-96 p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & VariantProps<typeof popoverContentVariants>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverContentVariants({ variant, size }), className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
