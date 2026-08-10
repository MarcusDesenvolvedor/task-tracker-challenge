interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-background">
      {children}
    </main>
  );
}
