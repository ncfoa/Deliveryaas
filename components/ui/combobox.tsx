"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const comboboxVariants = cva(
  "w-full justify-between",
  {
    variants: {
      variant: {
        default: "bg-background border border-input hover:bg-accent hover:text-accent-foreground",
        adobe: "bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-adobe",
        adobeMinimal: "bg-transparent border border-gray-200 hover:bg-gray-50 hover:text-gray-900 font-adobe",
        adobeAccent: "bg-gradient-to-r from-white to-[#0066CC]/5 border border-[#0066CC]/20 hover:bg-[#0066CC]/10 hover:text-[#0066CC] font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const comboboxContentVariants = cva(
  "w-full p-0",
  {
    variants: {
      variant: {
        default: "",
        adobe: "border border-gray-200 shadow-lg",
        adobeMinimal: "border border-gray-100 shadow-sm",
        adobeAccent: "border border-[#0066CC]/20 shadow-lg bg-gradient-to-br from-white to-[#0066CC]/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ComboboxProps extends VariantProps<typeof comboboxVariants> {
  options: Array<{
    value: string
    label: string
    icon?: React.ReactNode
  }>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  variant,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(comboboxVariants({ variant, className }))}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(comboboxContentVariants({ variant }), "w-[--radix-popover-trigger-width] p-0")}>
        <Command variant={variant}>
          <CommandInput 
            variant={variant}
            placeholder={searchPlaceholder} 
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  variant={variant}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.icon && (
                    <span className="mr-2">{option.icon}</span>
                  )}
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox, comboboxVariants }






