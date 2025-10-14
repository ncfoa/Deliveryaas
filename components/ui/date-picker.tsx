"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const datePickerVariants = cva(
  "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        adobe: "border-gray-300 bg-white text-gray-700 hover:border-gray-400 focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC]/20 font-adobe",
        adobeMinimal: "border-gray-200 bg-transparent text-gray-700 hover:border-gray-300 focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC]/20 font-adobe",
        adobeAccent: "border-[#0066CC]/20 bg-gradient-to-br from-white to-[#0066CC]/5 text-gray-700 hover:border-[#0066CC]/30 focus:border-[#0066CC] focus:ring-1 focus:ring-[#0066CC]/20 font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface DatePickerProps extends React.ComponentProps<"div">, VariantProps<typeof datePickerVariants> {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  disabled = false,
  variant,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            datePickerVariants({ variant }),
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          variant={variant}
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onDateChange?.(selectedDate)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Date Range Picker Component
interface DateRangePickerProps extends React.ComponentProps<"div">, VariantProps<typeof datePickerVariants> {
  dateRange?: { from: Date | undefined; to: Date | undefined }
  onDateRangeChange?: (dateRange: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date range",
  disabled = false,
  variant,
  className,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            datePickerVariants({ variant }),
            !dateRange?.from && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          variant={variant}
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(selectedRange) => {
            onDateRangeChange?.(selectedRange || { from: undefined, to: undefined })
            if (selectedRange?.from && selectedRange?.to) {
              setOpen(false)
            }
          }}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Multi Date Picker Component
interface MultiDatePickerProps extends React.ComponentProps<"div">, VariantProps<typeof datePickerVariants> {
  dates?: Date[]
  onDatesChange?: (dates: Date[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxDates?: number
}

function MultiDatePicker({
  dates = [],
  onDatesChange,
  placeholder = "Pick multiple dates",
  disabled = false,
  variant,
  className,
  maxDates,
  ...props
}: MultiDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const isSelected = dates.some(date => 
      date.toDateString() === selectedDate.toDateString()
    )

    let newDates: Date[]
    if (isSelected) {
      newDates = dates.filter(date => 
        date.toDateString() !== selectedDate.toDateString()
      )
    } else {
      if (maxDates && dates.length >= maxDates) {
        return // Don't add more dates if max is reached
      }
      newDates = [...dates, selectedDate]
    }

    onDatesChange?.(newDates)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            datePickerVariants({ variant }),
            dates.length === 0 && "text-muted-foreground",
            className
          )}
          disabled={disabled}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dates.length > 0 ? (
            <span>{dates.length} date{dates.length > 1 ? 's' : ''} selected</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          variant={variant}
          mode="multiple"
          selected={dates}
          onSelect={handleDateSelect}
          initialFocus
        />
        {maxDates && (
          <div className="p-3 border-t text-xs text-gray-500">
            Maximum {maxDates} date{maxDates > 1 ? 's' : ''} allowed
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker, MultiDatePicker, datePickerVariants }






