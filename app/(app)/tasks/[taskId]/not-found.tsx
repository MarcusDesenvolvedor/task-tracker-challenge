import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Task not found
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        The task you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Back to tasks
      </Link>
    </div>
  );
}
