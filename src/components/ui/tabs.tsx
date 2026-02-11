"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utility/tailwind-merge"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 w-full items-center !bg-zinc-50 !border-zinc-300 justify-center rounded-lg bg-muted  text-zinc-800 dark:!bg-zinc-800 dark:!text-zinc-50",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-9 w-1/2 items-center justify-center whitespace-nowrap  px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:!bg-zinc-300 data-[state=active]:bg-maroon-600 data-[state=active]:text-foreground data-[state=active]:shadow data-[state=active]:hover:!bg-maroon-700 data-[state=active]:focus:!bg-maroon-600 data-[state=active]:focus:!shadow-[0_0_10px_#741C2140,0_0_0_5px_#741C2140] data-[state=active]:dark:focus:!shadow-[0_0_10px_#741C2140,0_0_0_5px_#FF85A240] data-[state=active]:dark:!bg-softpink-300 data-[state=active]:dark:hover:!bg-softpink-400 data-[state=active]:dark:text-zinc-800 ",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
