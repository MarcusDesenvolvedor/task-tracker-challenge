interface ContentPanelProps {
  children: React.ReactNode;
}

export function ContentPanel({ children }: ContentPanelProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      {children}
    </article>
  );
}
