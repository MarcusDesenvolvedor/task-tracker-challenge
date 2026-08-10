import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-foreground">Category not found</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        The category you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/categories"
        className="mt-6 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
      >
        Back to categories
      </Link>
    </div>
  );
}
