import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContentPanel } from "@/components/layout/ContentPanel";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  return (
    <ContentPanel>
      <EmptyState
        title="Select a task to get started"
        description="Choose a task from the sidebar to view its details, or create a new one."
        action={<ButtonLink href="/tasks/new">Create task</ButtonLink>}
      />
    </ContentPanel>
  );
}
