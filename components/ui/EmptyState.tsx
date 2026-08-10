interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  compact?: boolean;
}

export function EmptyState({
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        compact ? "px-4 py-8" : "px-4 py-12 sm:py-16"
      }`}
    >
      <div
        aria-hidden
        className={`mb-4 flex items-center justify-center rounded-full bg-accent-soft text-muted-foreground ${
          compact ? "h-10 w-10" : "h-12 w-12"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className={compact ? "h-5 w-5" : "h-6 w-6"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
          />
        </svg>
      </div>
      <h2
        className={`font-semibold text-foreground ${
          compact ? "text-sm" : "text-lg sm:text-xl"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-2 max-w-md leading-6 text-muted-foreground ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
