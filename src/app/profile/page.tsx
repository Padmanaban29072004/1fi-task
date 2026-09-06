import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle="Account & settings">
      <EmptyState
        title="Profile"
        description="Placeholder screen to mirror the existing 1Fi app navigation shell."
      />
    </AppShell>
  );
}
