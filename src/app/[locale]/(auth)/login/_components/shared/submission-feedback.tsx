import { cn } from "@/lib/utils/cn.util";
import { CircleX } from "lucide-react";

export default function SubmissionFeedback({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    // Handle no children case - no empty feedback box
    if (!children) return null;

    return (
        <div
            {...props}
            className={cn(
                "relative mx-auto mb-5 w-fit rounded-2xl border border-maroon-200/50 bg-maroon-50/60 px-5 pb-5 pt-3 text-center text-maroon-700 shadow-sm",

                className
            )}
        >
            {/* Icon */}
            <CircleX
                size={22}
                strokeWidth={1.4}
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-maroon-600 shadow-sm dark:bg-zinc-800 dark:text-softpink-300"
            />

            {/* Content */}
            <p className="mt-2 text-sm font-medium tracking-wide">{children}</p>
        </div>
    );
}
