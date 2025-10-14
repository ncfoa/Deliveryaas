"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabsListVariants = cva(
  "inline-flex h-9 w-fit items-center justify-center p-[3px]",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground rounded-lg",
        adobe: "bg-gray-100 border border-gray-200 rounded-md font-adobe",
        adobeMinimal: "bg-transparent border-b border-gray-200 rounded-none font-adobe",
        adobeAccent: "bg-gradient-to-r from-[#0066CC]/5 to-[#0066CC]/10 border border-[#0066CC]/20 rounded-lg font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground rounded-md border border-transparent data-[state=active]:shadow-sm",
        adobe: "data-[state=active]:bg-white data-[state=active]:text-[#0066CC] data-[state=active]:border-[#0066CC] data-[state=active]:shadow-sm text-gray-600 hover:text-gray-800 border border-transparent rounded-md focus-visible:ring-[#0066CC]/20 focus-visible:border-[#0066CC]",
        adobeMinimal: "data-[state=active]:bg-transparent data-[state=active]:text-[#0066CC] data-[state=active]:border-b-2 data-[state=active]:border-[#0066CC] text-gray-600 hover:text-gray-800 border-b-2 border-transparent rounded-none focus-visible:ring-[#0066CC]/20",
        adobeAccent: "data-[state=active]:bg-white data-[state=active]:text-[#0066CC] data-[state=active]:border-[#0066CC] data-[state=active]:shadow-sm text-gray-600 hover:text-gray-800 border border-transparent rounded-md focus-visible:ring-[#0066CC]/20 focus-visible:border-[#0066CC]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
