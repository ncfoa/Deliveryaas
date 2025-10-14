import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const skeletonVariants = cva(
  "animate-pulse rounded-md",
  {
    variants: {
      variant: {
        default: "bg-accent",
        adobe: "bg-gray-200",
        adobeMinimal: "bg-gray-100",
        adobeAccent: "bg-[#0066CC]/10",
        adobeSubtle: "bg-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Skeleton({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
