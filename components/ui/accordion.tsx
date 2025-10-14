"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const accordionItemVariants = cva(
  "border-b last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        adobe: "border-gray-200 font-adobe",
        adobeMinimal: "border-gray-100 font-adobe",
        adobeAccent: "border-[#0066CC]/20 font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionTriggerVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "",
        adobe: "text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-50 font-adobe",
        adobeMinimal: "text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-50 font-adobe",
        adobeAccent: "text-[#0066CC] hover:text-[#0066CC] hover:bg-[#0066CC]/5 focus:text-[#0066CC] focus:bg-[#0066CC]/5 font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionContentVariants = cva(
  "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
  {
    variants: {
      variant: {
        default: "",
        adobe: "text-gray-600 font-adobe",
        adobeMinimal: "text-gray-500 font-adobe",
        adobeAccent: "text-gray-700 font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & VariantProps<typeof accordionItemVariants>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant, className }))}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & VariantProps<typeof accordionTriggerVariants>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant, className }))}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & VariantProps<typeof accordionContentVariants>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ variant }))}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
