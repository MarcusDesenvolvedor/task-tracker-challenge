interface DashboardPanelProps {
  title: string;
  children: React.ReactNode;
  delayMs?: number;
}

export function DashboardPanel({
  title,
  children,
  delayMs = 0,
}: DashboardPanelProps) {
  return (
    <section
      className="view-enter rounded-xl border border-zinc-800 bg-surface-elevated p-4 sm:p-5"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
