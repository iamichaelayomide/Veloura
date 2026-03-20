import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,195,162,0.5)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b11] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "border-[rgba(214,195,162,0.42)] bg-[linear-gradient(135deg,#f0e5cf,#c8b28f)] text-[#111319] hover:brightness-105",
        secondary: "border-[rgba(125,211,199,0.18)] bg-[rgba(125,211,199,0.08)] text-[var(--veloura-text)] hover:bg-[rgba(125,211,199,0.14)]",
        outline: "border-[var(--veloura-line)] bg-transparent text-[var(--veloura-text)] hover:border-[rgba(214,195,162,0.45)] hover:bg-white/5",
        ghost: "border-transparent bg-transparent text-[var(--veloura-text)] hover:bg-white/6",
        light: "border-[rgba(255,255,255,0.18)] bg-[rgba(248,244,236,0.95)] text-[#14161f] hover:bg-white",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs uppercase tracking-[0.22em]",
        lg: "h-12 px-7",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };


