import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui Button, themed for the app's dark slate/indigo palette. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]",
        gradient:
          "bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:from-indigo-400 hover:to-purple-500 hover:scale-[1.02] active:scale-[0.98]",
        outline: "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white",
        ghost: "text-slate-400 hover:text-white hover:bg-slate-800",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-3 py-1.5 text-xs",
        lg: "px-6 py-3",
        icon: "p-1.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} type={type} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
