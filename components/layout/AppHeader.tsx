"use client";

import { useCallback, useEffect, useState } from "react";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { TaskSearchModal } from "@/components/search/TaskSearchModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchIcon } from "@/components/ui/SearchIcon";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface AppHeaderProps {
  tasks: Task[];
  categories: Category[];
}

export function AppHeader({ tasks, categories }: AppHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSession, setSearchSession] = useState(0);

  const openSearch = useCallback(() => {
    setSearchSession((current) => current + 1);
    setIsSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchSession((current) => current + 1);
        setIsSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-header backdrop-blur-sm">
        <div className="relative flex h-14 items-center px-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-md">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-border bg-surface-elevated px-3 text-left text-sm text-muted transition-colors hover:border-border-strong hover:text-muted-foreground"
            >
              <SearchIcon />
              <span className="flex-1 truncate">Search tasks…</span>
              <kbd className="hidden shrink-0 rounded-md border border-border bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-6 lg:right-10">
            <ThemeToggle />
            <NotificationBell tasks={tasks} />
          </div>
        </div>
      </header>

      <TaskSearchModal
        key={searchSession}
        open={isSearchOpen}
        onClose={closeSearch}
        tasks={tasks}
        categories={categories}
      />
    </>
  );
}
