interface BellIconProps {
  className?: string;
}

export function BellIcon({ className = "" }: BellIconProps) {
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
        d="M12 4.5a4.5 4.5 0 0 0-4.5 4.5v2.1c0 .7-.22 1.38-.62 1.95L5.4 15.3c-.5.7 0 1.7.87 1.7h11.46c.87 0 1.37-1 .87-1.7l-1.48-2.25a3.4 3.4 0 0 1-.62-1.95V9A4.5 4.5 0 0 0 12 4.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 17a2.25 2.25 0 0 0 4.5 0"
      />
    </svg>
  );
}
