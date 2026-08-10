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
    <header className="mb-8 border-b border-border pb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-2 break-words text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
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
