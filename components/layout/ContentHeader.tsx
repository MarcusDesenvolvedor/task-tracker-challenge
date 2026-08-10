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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-start gap-3">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
