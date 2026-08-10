const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const overviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

/** Formats an ISO timestamp for display. Returns a fallback for invalid values. */
export function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return dateTimeFormatter.format(date);
}

/** Formats just the time portion, e.g. "5:00 PM". */
export function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return timeFormatter.format(date);
}

/** Overview line like "Today, August 10". */
export function formatOverviewTodayLabel(date = new Date()): string {
  return `Today, ${overviewDateFormatter.format(date)}`;
}

export type DayGreeting = "morning" | "afternoon" | "evening";

export function getDayGreeting(date = new Date()): DayGreeting {
  const hour = date.getHours();

  if (hour < 12) {
    return "morning";
  }

  if (hour < 17) {
    return "afternoon";
  }

  return "evening";
}

export function formatDayGreeting(name: string, date = new Date()): string {
  const greeting = getDayGreeting(date);
  return `Good ${greeting}, ${name}!`;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** Local calendar key `YYYY-MM-DD` for comparing due dates by day. */
export function getLocalDateKey(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isSameLocalDay(a: Date | string, b: Date | string): boolean {
  const left = getLocalDateKey(a);
  const right = getLocalDateKey(b);
  return Boolean(left) && left === right;
}

/** Native `<input type="date">` value (`YYYY-MM-DD`) from an ISO timestamp. */
export function toDateInputValue(iso: string | null | undefined): string {
  if (!iso) {
    return "";
  }

  return getLocalDateKey(iso);
}

/** Display helper for American `MM/DD/YYYY` from an ISO timestamp. */
export function toAmericanDateInputValue(
  iso: string | null | undefined,
): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}`;
}

/** Formats a `YYYY-MM-DD` key as American `MM/DD/YYYY`. */
export function formatAmericanDateKey(dateKey: string): string {
  const match = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return "";
  }

  return `${match[2]}/${match[3]}/${match[1]}`;
}

function isValidDateKey(dateKey: string): boolean {
  const match = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return (
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function toTimeInputValue(iso: string | null | undefined): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Formats a native `HH:mm` time key as American `h:mm AM/PM`. */
export function formatAmericanTimeKey(timeKey: string): string {
  const match = timeKey.match(/^(\d{2}):(\d{2})$/);

  if (!match) {
    return "";
  }

  const hours24 = Number(match[1]);
  const minutes = Number(match[2]);

  if (
    hours24 < 0 ||
    hours24 > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    Number.isNaN(hours24) ||
    Number.isNaN(minutes)
  ) {
    return "";
  }

  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  return `${hours12}:${pad(minutes)} ${period}`;
}

/**
 * Combines a native date key (`YYYY-MM-DD`) and time (`HH:mm`) into ISO.
 * Returns null when both are empty or either part is invalid.
 */
export function combineDateAndTime(
  dateValue: string,
  timeValue: string,
): string | null {
  const date = dateValue.trim();
  const time = timeValue.trim();

  if (!date && !time) {
    return null;
  }

  if (!date || !time) {
    return null;
  }

  if (!isValidDateKey(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return null;
  }

  const combined = new Date(`${date}T${time}:00`);

  if (Number.isNaN(combined.getTime())) {
    return null;
  }

  return combined.toISOString();
}
