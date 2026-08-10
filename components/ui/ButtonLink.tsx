import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "danger";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-white text-black hover:bg-zinc-200",
  secondary:
    "border border-zinc-700 bg-transparent text-white hover:bg-zinc-900",
  danger:
    "border border-red-900/60 bg-transparent text-red-400 hover:bg-red-950/40",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
