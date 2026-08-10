interface ContentHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function ContentHeader({
  eyebrow,
  title,
  description,
  actions,
}: ContentHeaderProps) {
  return (
    <header className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 break-words text-2xl font-semibold leading-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
