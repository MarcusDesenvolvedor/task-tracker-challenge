/**
 * Clears the in-memory singleton so the next `getStore()` call reseeds from
 * `lib/data/seed.ts`. Used only by unit tests.
 */
export function resetStore(): void {
  const globalStore = globalThis as typeof globalThis & {
    __taskTrackerStore?: unknown;
  };

  globalStore.__taskTrackerStore = undefined;
}
