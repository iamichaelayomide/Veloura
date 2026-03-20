import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-text)] placeholder:text-[var(--veloura-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,195,162,0.4)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };


