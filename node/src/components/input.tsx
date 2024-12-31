import React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ className, ...props }, ref) => (
  <input
    className={cn("rounded-lg border border-stone-200 p-2", className)}
    ref={ref}
    {...props}
  />
));

Input.displayName = "Input";
