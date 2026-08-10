import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-white">Task not found</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
        The task you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
      >
        Back to overview
      </Link>
    </div>
  );
}
