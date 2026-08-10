"use client";

import { useRef, useState } from "react";
import { ClockIcon } from "@/components/ui/ClockIcon";
import { formInputClassName } from "@/components/ui/FormField";
import {
  formatAmericanTimeKey,
  toTimeInputValue,
} from "@/lib/format/date";

interface DueTimePickerProps {
  id?: string;
  name?: string;
  defaultValue?: string | null;
  hasError?: boolean;
}

export function DueTimePicker({
  id = "dueTime",
  name = "dueTime",
  defaultValue = null,
  hasError = false,
}: DueTimePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(toTimeInputValue(defaultValue));

  function openPicker() {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        // Fall through to focus/click for browsers that block showPicker.
      }
    }

    input.focus();
    input.click();
  }

  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        onClick={openPicker}
        aria-label={
          value
            ? `Due time ${formatAmericanTimeKey(value)}. Change time`
            : "Select due time"
        }
        className={`${formInputClassName(hasError)} flex items-center gap-2.5 text-left ${
          value ? "text-foreground" : "text-muted"
        }`}
      >
        <ClockIcon className={value ? "text-muted-foreground" : "text-muted"} />
        <span className="flex-1 truncate">
          {value ? formatAmericanTimeKey(value) : "Select due time"}
        </span>
      </button>

      <input
        ref={inputRef}
        name={name}
        type="time"
        lang="en-US"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
