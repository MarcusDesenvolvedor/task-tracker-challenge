interface ContentPanelProps {
  children: React.ReactNode;
  wide?: boolean;
}

export function ContentPanel({ children, wide = false }: ContentPanelProps) {
  return (
    <article
      className={`mx-auto w-full px-6 py-8 sm:px-10 sm:py-10 ${wide ? "max-w-4xl" : "max-w-3xl"}`}
    >
      {children}
    </article>
  );
}
