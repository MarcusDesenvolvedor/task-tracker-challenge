import {
  CATEGORY_COLOR_NAMES,
  DEFAULT_CATEGORY_COLOR,
  getCategoryColorHex,
  getCategoryColorLabel,
} from "@/lib/constants/category";
import type { CategoryColorName } from "@/lib/types/category";

interface CategoryColorSelectProps {
  /** Applied to the first option so an external label can target the group. */
  id?: string;
  name?: string;
  defaultValue?: CategoryColorName;
}

/**
 * Categories are limited to the predefined palette, so this exposes the allowed
 * colors as a radio group instead of a free-form hex input.
 */
export function CategoryColorSelect({
  id = "color",
  name = "color",
  defaultValue = DEFAULT_CATEGORY_COLOR,
}: CategoryColorSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORY_COLOR_NAMES.map((color, index) => (
        <label key={color} className="cursor-pointer">
          <input
            id={index === 0 ? id : undefined}
            type="radio"
            name={name}
            value={color}
            defaultChecked={color === defaultValue}
            className="peer sr-only"
          />
          <span className="flex min-h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-surface-input px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 peer-checked:border-zinc-500 peer-checked:bg-zinc-800 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zinc-500">
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: getCategoryColorHex(color) }}
            />
            {getCategoryColorLabel(color)}
          </span>
        </label>
      ))}
    </div>
  );
}
