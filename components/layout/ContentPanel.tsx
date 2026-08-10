interface ContentPanelProps {
  children: React.ReactNode;
}

export function ContentPanel({ children }: ContentPanelProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8">{children}</article>
  );
}
