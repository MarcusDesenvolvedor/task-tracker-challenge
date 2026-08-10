"use client";

import { useCallback, useEffect, useState } from "react";
import { TaskSearchModal } from "@/components/search/TaskSearchModal";
import { SearchIcon } from "@/components/ui/SearchIcon";
import type { Category } from "@/lib/types/category";
import type { Task } from "@/lib/types/task";

interface AppHeaderProps {
  tasks: Task[];
  categories: Category[];
}

export function AppHeader({ tasks, categories }: AppHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 shrink-0 border-b border-zinc-800 bg-black/90 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-center px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={openSearch}
            className="flex h-10 w-full max-w-md items-center gap-2.5 rounded-lg border border-zinc-800 bg-surface-elevated px-3 text-left text-sm text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300"
          >
            <SearchIcon />
            <span className="flex-1 truncate">Search tasks…</span>
            <kbd className="hidden shrink-0 rounded-md border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 sm:inline">
              ⌘K
            </kbd>
          </button>
        </div>
      </header>

      <TaskSearchModal
        open={isSearchOpen}
        onClose={closeSearch}
        tasks={tasks}
        categories={categories}
      />
    </>
  );
}
