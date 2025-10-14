"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const hoverCardContentVariants = cva(
  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
  {
    variants: {
      variant: {
        default: "w-64",
        adobe: "w-72 bg-white border-gray-200 shadow-lg font-adobe",
        adobeMinimal: "w-64 bg-gray-50 border-gray-100 shadow-sm font-adobe",
        adobeAccent: "w-72 bg-gradient-to-br from-white to-[#0066CC]/5 border-[#0066CC]/20 shadow-lg font-adobe",
        amazon: "w-80 bg-white border-gray-200 shadow-xl font-adobe",
        amazonMinimal: "w-72 bg-gray-50 border-gray-100 shadow-lg font-adobe",
        amazonAccent: "w-80 bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl font-adobe",
      },
      size: {
        sm: "w-56 p-3",
        default: "w-64 p-4",
        lg: "w-72 p-5",
        xl: "w-80 p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content> & VariantProps<typeof hoverCardContentVariants>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(hoverCardContentVariants({ variant, size }), className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
