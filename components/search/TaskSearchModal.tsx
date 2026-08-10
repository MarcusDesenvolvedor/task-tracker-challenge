"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { SearchIcon } from "@/components/ui/SearchIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { searchTasksByTitle } from "@/lib/search/tasks";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface TaskSearchModalProps {
  open: boolean;
  onClose: () => void;
  tasks: Task[];
  categories: Category[];
}

export function TaskSearchModal({
  open,
  onClose,
  tasks,
  categories,
}: TaskSearchModalProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );
  const results = searchTasksByTitle(tasks, query);
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!open) {
      return;
    }

    setQuery("");
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] sm:px-6">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-enter relative z-10 flex max-h-[min(28rem,70vh)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-2xl shadow-[var(--shadow)]"
      >
        <h2 id={titleId} className="sr-only">
          Search tasks
        </h2>

        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tasks by name…"
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
            Esc
          </kbd>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {!trimmedQuery ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              Type a task name to search.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No tasks match “{trimmedQuery}”.
            </p>
          ) : (
            <ul className="flex flex-col gap-0.5">
              {results.map((task) => {
                const category = categoryById.get(task.categoryId);

                return (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-accent-soft/80"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
                          {task.title}
                        </span>
                        <StatusBadge status={task.status} />
                      </div>
                      {category ? (
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                          <CategoryColorDot color={category.color} size="sm" />
                          <span>{category.name}</span>
                        </div>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {trimmedQuery && results.length > 0 ? (
          <div className="border-t border-border px-4 py-2.5 text-xs text-muted">
            {results.length} result{results.length === 1 ? "" : "s"}
          </div>
        ) : null}
      </div>
    </div>
  );
}
