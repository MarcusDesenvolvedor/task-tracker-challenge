interface StatCardProps {
  label: string;
  value: number;
  /** Status colour applied to the number; falls back to the default foreground. */
  accentColor?: string;
  delayMs?: number;
}

export function StatCard({
  label,
  value,
  accentColor,
  delayMs = 0,
}: StatCardProps) {
  return (
    <div
      className="view-enter rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:p-5"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-center gap-2">
        {accentColor ? (
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        ) : null}
        <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {label}
        </p>
      </div>
      <p
        className="mt-2 text-3xl font-semibold tabular-nums leading-none text-white sm:text-4xl"
        style={accentColor ? { color: accentColor } : undefined}
      >
        {value}
      </p>
    </div>
  );
}
