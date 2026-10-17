import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover",
  secondary:
    "border-2 border-primary bg-surface text-primary hover:bg-background",
};

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

/**
 * Large, touch-friendly button (min. 56px high) used across the whole app.
 * Keeping it in one place guarantees the "big buttons" UX rule everywhere.
 */
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-14 items-center justify-center rounded-xl px-6 text-lg font-semibold transition-colors focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
