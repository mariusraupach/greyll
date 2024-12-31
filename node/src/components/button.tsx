import React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("rounded-lg p-2 transition-all", {
  variants: {
    bg: {
      "950":
        "bg-stone-950 text-stone-50 hover:bg-stone-800 disabled:bg-stone-800",
    },
  },
  defaultVariants: {
    bg: "950",
  },
});

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    VariantProps<typeof buttonVariants>
>(({ bg, className, ...props }, ref) => (
  <button
    className={cn(buttonVariants({ bg }), className)}
    ref={ref}
    {...props}
  />
));

Button.displayName = "Button";
