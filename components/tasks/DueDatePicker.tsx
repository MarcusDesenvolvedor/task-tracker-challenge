"use client";

import { useRef, useState } from "react";
import { CalendarIcon } from "@/components/ui/CalendarIcon";
import { formInputClassName } from "@/components/ui/FormField";
import {
  formatAmericanDateKey,
  toDateInputValue,
} from "@/lib/format/date";

interface DueDatePickerProps {
  id?: string;
  name?: string;
  defaultValue?: string | null;
  hasError?: boolean;
}

export function DueDatePicker({
  id = "dueDate",
  name = "dueDate",
  defaultValue = null,
  hasError = false,
}: DueDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(toDateInputValue(defaultValue));

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
            ? `Due date ${formatAmericanDateKey(value)}. Change date`
            : "Select due date"
        }
        className={`${formInputClassName(hasError)} flex items-center gap-2.5 text-left ${
          value ? "text-white" : "text-zinc-600"
        }`}
      >
        <CalendarIcon className={value ? "text-zinc-300" : "text-zinc-500"} />
        <span className="flex-1 truncate">
          {value ? formatAmericanDateKey(value) : "Select due date"}
        </span>
      </button>

      <input
        ref={inputRef}
        name={name}
        type="date"
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
