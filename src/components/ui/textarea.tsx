import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[140px] w-full rounded-2xl border border-white/10 bg-[#120c0b] px-4 py-3 text-sm text-[#f7eee8] placeholder:text-[#9f8a82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c58b74]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };


