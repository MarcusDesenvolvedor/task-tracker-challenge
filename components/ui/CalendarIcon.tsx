interface CalendarIconProps {
  className?: string;
}

export function CalendarIcon({ className = "" }: CalendarIconProps) {
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
        d="M7.5 4.5v2.25M16.5 4.5v2.25M4.5 9h15M6 6.75h12A1.5 1.5 0 0 1 19.5 8.25v10.5A1.5 1.5 0 0 1 18 20.25H6a1.5 1.5 0 0 1-1.5-1.5V8.25A1.5 1.5 0 0 1 6 6.75Z"
      />
    </svg>
  );
}
