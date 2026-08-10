import { getCategoryColorHex } from "@/lib/constants/category";
import type { CategoryColorName } from "@/lib/types/category";

type DotSize = "sm" | "md" | "lg";

const sizeClasses: Record<DotSize, string> = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-4 w-4",
};

interface CategoryColorDotProps {
  color: CategoryColorName;
  size?: DotSize;
  className?: string;
}

export function CategoryColorDot({
  color,
  size = "md",
  className = "",
}: CategoryColorDotProps) {
  return (
    <span
      aria-hidden
      className={`shrink-0 rounded-full ${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: getCategoryColorHex(color) }}
    />
  );
}
