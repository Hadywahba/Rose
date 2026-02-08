import * as React from "react"

import { cn } from "@/lib/utility/tailwind-merge"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-16 text-zinc-800  w-80 rounded-md border-2   bg-transparent px-3 py-2 text-base hover:border-zinc-400 focus:border-maroon-500 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-zinc-700 dark:border-zinc-600 dark:hover:border-zinc-500 dark:text-zinc-400 dark:focus:border-softpink-400 ",
          "data-[error=true]:border-red-600",
            "data-[error=true]:focus:border-red-600",
            "data-[error=true]:focus-visible:ring-red-600",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
