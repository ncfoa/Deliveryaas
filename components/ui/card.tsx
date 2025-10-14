import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "flex flex-col gap-6 py-6",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground rounded-xl border shadow-sm",
        adobe: "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 font-adobe",
        adobeElevated: "bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200 font-adobe",
        adobeMinimal: "bg-white border border-gray-100 hover:border-gray-300 transition-colors duration-200 font-adobe",
        adobeAccent: "bg-gradient-to-br from-[#0066CC]/5 to-[#0066CC]/10 border border-[#0066CC]/20 shadow-sm hover:shadow-md transition-shadow duration-200 font-adobe",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

// Adobe Removable Card Component
interface RemovableCardProps extends React.ComponentProps<"div"> {
  variant?: VariantProps<typeof cardVariants>["variant"]
  onRemove?: () => void
  showRemoveButton?: boolean
  removeButtonText?: string
  children: React.ReactNode
}

function RemovableCard({ 
  className, 
  variant = "adobe",
  onRemove,
  showRemoveButton = true,
  removeButtonText = "Remove",
  children,
  ...props 
}: RemovableCardProps) {
  const [isRemoving, setIsRemoving] = React.useState(false)

  const handleRemove = () => {
    if (onRemove) {
      setIsRemoving(true)
      // Add a small delay for the animation
      setTimeout(() => {
        onRemove()
      }, 200)
    }
  }

  return (
    <div
      data-slot="removable-card"
      className={cn(
        cardVariants({ variant }),
        "relative group transition-all duration-200",
        isRemoving && "opacity-0 scale-95 transform",
        className
      )}
      {...props}
    >
      {showRemoveButton && onRemove && (
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm border border-gray-200 hover:border-red-200"
          title={removeButtonText}
          aria-label={removeButtonText}
        >
          <X className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  RemovableCard,
}
