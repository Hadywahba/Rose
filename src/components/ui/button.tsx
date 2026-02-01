import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utility/cn.util"


const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium dark:font-semi transition-colors disabled:!cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 disabled:[&_svg]:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-maroon-600 text-zinc-50 hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-softpink-300 dark:text-zinc-800 dark:hover:bg-softpink-400 dark:disabled:text-zinc-600 [&_svg]:stroke-white dark:[&_svg]:stroke-zinc-600 ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input text-primary bg-background hover:bg-accent disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 [&_svg]:stroke-maroon-600 disabled:[&_svg]:stroke-zinc-400 dark:border-softpink-300 dark:text-softpink-300 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 [&_svg]:stroke-maroon-600 disabled:[&_svg]:stroke-zinc-400 dark:[&_svg]:stroke-softpink-300 dark:disabled:[&_svg]:stroke-zinc-600 ",
        outline2:
          "bg-zinc-50 border border-zinc-400 hover:bg-zinc-100 hover:border-zinc-400 text-zinc-800 disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400 [&_svg]:stroke-zinc-800 disabled:[&_svg]:stroke-zinc-400 dark:bg-background dark:border-zinc-500 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:border-zinc-600 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",
        transparent:
          "bg-transparent text-zinc-800 hover:bg-zinc-100 disabled:bg-zinc-100 disabled:text-zinc-400 [&_svg]:stroke-zinc-800 disabled:[&_svg]:stroke-zinc-400 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-700 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",
        red: "bg-red-600 text-white hover:bg-red-700 disabled:bg-zinc-300 disabled:text-zinc-500 [&_svg]:stroke-white disabled:[&_svg]:stroke-zinc-500 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:[&_svg]:stroke-zinc-50 dark:disabled:[&_svg]:stroke-zinc-600",

        secondary:
          "bg-maroon-50 text-maroon-600 hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-700 dark:text-softpink-300 dark:hover:bg-zinc-600 dark:disabled:text-zinc-600 [&_svg]:stroke-maroon-600 disabled:[&_svg]:stroke-zinc-500 dark:[&_svg]:stroke-softpink-300 dark:disabled:[&_svg]:stroke-zinc-600",
        secondaryBlue:
          "bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:bg-zinc-300 disabled:text-zinc-500 dark:bg-zinc-700 dark:text-blue-300 dark:hover:bg-zinc-600 dark:disabled:text-zinc-600 [&_svg]:stroke-blue-600 disabled:[&_svg]:stroke-zinc-500 dark:[&_svg]:stroke-blue-300 dark:disabled:[&_svg]:stroke-zinc-600",

        ghost: "bg-transparent text-primary hover:bg-maroon-50 hover:text-maroon-700 disabled:text-zinc-400 dark:text-zinc-50 dark:hover:bg-zinc-700 dark:hover:text-softpink-400 dark:disabled:text-zinc-600 [&_svg]:stroke-current",
        link: "bg-transparent text-primary underline-offset-4 hover:underline hover:text-maroon-700 disabled:text-zinc-400  dark:hover:text-softpink-400 dark:disabled:text-zinc-600 [&_svg]:stroke-current",
      },
      size: {
        default: "h-button w-button px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "w-full h-11 py-2.5 px-4 text-base",
        icon: "h-9 w-9",
        "rounded-icon": "h-10 w-10 rounded-full",
        link: "h-auto p-0 inline-flex items-center text-sm",

      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
