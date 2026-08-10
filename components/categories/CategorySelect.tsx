"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CategoryColorDot } from "@/components/categories/CategoryColorDot";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";
import { getCategoryColorLabel } from "@/lib/constants/category";
import type { Category } from "@/lib/types/category";

interface CategorySelectProps {
  categories: Category[];
  defaultValue?: string;
  hasError?: boolean;
  id?: string;
  name?: string;
}

/**
 * Shared category picker for the create and edit task forms. A native select
 * cannot render the color swatch and color name together, so this is a listbox
 * backed by a hidden input to keep working with plain form submissions.
 */
export function CategorySelect({
  categories,
  defaultValue = "",
  hasError = false,
  id = "categoryId",
  name = "categoryId",
}: CategorySelectProps) {
  const [selectedId, setSelectedId] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selectedCategory = categories.find(
    (category) => category.id === selectedId,
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [isOpen]);

  function selectRelativeCategory(offset: number) {
    if (categories.length === 0) {
      return;
    }

    const currentIndex = categories.findIndex(
      (category) => category.id === selectedId,
    );
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + offset + categories.length) % categories.length;

    setSelectedId(categories[nextIndex].id);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
        return;
      }

      selectRelativeCategory(event.key === "ArrowDown" ? 1 : -1);
      return;
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }
  }

  const borderClasses = hasError
    ? "border-red-500 focus-visible:border-red-500"
    : isOpen
      ? "border-border-strong"
      : "border-border hover:border-border-strong";

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selectedId} />

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-lg border bg-surface-input px-3 py-2.5 text-left transition-colors ${borderClasses}`}
      >
        {selectedCategory ? (
          <span className="flex min-w-0 items-center gap-3">
            <CategoryColorDot color={selectedCategory.color} />
            <span className="min-w-0">
              <span className="block truncate text-sm text-foreground">
                {selectedCategory.name}
              </span>
              <span className="block text-xs text-muted">
                {getCategoryColorLabel(selectedCategory.color)}
              </span>
            </span>
          </span>
        ) : (
          <span className="text-sm text-muted">Select a category</span>
        )}
        <ChevronDownIcon
          className={`text-muted transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Category"
          className="popover-enter absolute left-0 right-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface-elevated p-1 shadow-xl shadow-[var(--shadow)]"
        >
          {categories.map((category) => {
            const isSelected = category.id === selectedId;

            return (
              <li key={category.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(category.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-chip" : "hover:bg-chip/60"
                  }`}
                >
                  <CategoryColorDot color={category.color} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">
                      {category.name}
                    </span>
                    <span className="block text-xs text-muted">
                      {getCategoryColorLabel(category.color)}
                    </span>
                  </span>
                  {isSelected ? <CheckIcon /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-foreground"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 011.4-1.4l2.8 2.79 6.8-6.79a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
