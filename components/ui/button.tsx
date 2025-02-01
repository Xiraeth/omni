import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-[1px] dark:border-slate-600 bg-buttonBgLight dark:bg-buttonBgDark text-dark dark:text-light shadow-md hover:border-buttonBorderLightHover dark:hover:border-slate-500 transition-all duration-200",
        outline:
          "border border-dark bg-transparent shadow-md hover:bg-dark hover:text-white dark:border-white/30 dark:hover:bg-light dark:hover:text-dark",
        success:
          "bg-green-500 text-white dark:bg-green-400 dark:text-dark border border-green-500 dark:border-green-400 shadow-md hover:bg-green-600 dark:hover:bg-green-500 transition-all duration-200",
        successOutlined:
          "border border-green-500 bg-transparent shadow-md hover:bg-green-500 hover:text-white dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-dark",
        warning:
          "bg-yellow-500 text-white dark:bg-yellow-400 dark:text-dark border border-yellow-500 dark:border-yellow-400 shadow-md hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-all duration-200",
        warningOutlined:
          "border border-yellow-500 bg-transparent shadow-md hover:bg-yellow-500 hover:text-white dark:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:text-dark",
        danger:
          "bg-red-600 text-white dark:bg-red-400 dark:text-dark border border-red-600 dark:border-red-400 shadow-md hover:bg-red-700 dark:hover:bg-red-500 transition-all duration-200",
        dangerOutlined:
          "border border-red-600 bg-transparent shadow-md hover:bg-red-600 text-red-600 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-dark",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
