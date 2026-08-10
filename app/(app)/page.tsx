import { EmptyState } from "@/components/ui/EmptyState";

export default function HomePage() {
  return (
    <EmptyState
      title="Select a task"
      description="Choose a task from the sidebar to view its details. Task creation and editing will be added next."
    />
  );
}
