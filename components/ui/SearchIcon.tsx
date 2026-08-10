interface SearchIconProps {
  className?: string;
}

export function SearchIcon({ className = "" }: SearchIconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={`h-4 w-4 shrink-0 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15ZM21 21l-4.35-4.35"
      />
    </svg>
  );
}
