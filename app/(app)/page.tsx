import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  return (
    <ContentPanel>
      <EmptyState
        title="Welcome to Task Tracker"
        description="Select a task from the sidebar to view its details, or create a new task to get started."
      />
      <div className="mt-6">
        <ButtonLink href="/tasks/new">Create task</ButtonLink>
      </div>
    </ContentPanel>
  );
}
