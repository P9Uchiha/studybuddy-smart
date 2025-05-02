
import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: "default" | "outline" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    if (variant === "gradient") {
      return (
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
            "bg-gradient-to-r from-study-purple-300 to-study-blue-100 hover:from-study-purple-400 hover:to-study-blue-200 text-white shadow-md",
            {
              "h-10 py-2 px-4": size === "default",
              "h-9 px-3": size === "sm",
              "h-11 px-8": size === "lg",
              "h-10 w-10": size === "icon",
            },
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <Button
        ref={ref}
        variant={variant as Exclude<CustomButtonProps['variant'], 'gradient'>}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
CustomButton.displayName = "CustomButton";

export { CustomButton };
