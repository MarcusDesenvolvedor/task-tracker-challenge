import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="-ml-1 mb-5 inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent-soft hover:text-foreground"
    >
      <span aria-hidden className="text-base">
        ←
      </span>
      {label}
    </Link>
  );
}
