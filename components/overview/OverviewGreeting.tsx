import {
  formatDayGreeting,
  formatOverviewTodayLabel,
} from "@/lib/format/date";

const DEVELOPER_NAME = "Dev";

export function OverviewGreeting() {
  const now = new Date();

  return (
    <section className="view-enter mb-8 border-b border-border pb-8">
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {formatDayGreeting(DEVELOPER_NAME, now)}{" "}
        <span aria-hidden>👋</span>
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Here&apos;s your task overview for today.
      </p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted">
        {formatOverviewTodayLabel(now)}
      </p>
    </section>
  );
}
