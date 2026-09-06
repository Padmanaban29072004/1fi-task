import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PortfolioPage() {
  return (
    <AppShell title="Portfolio" subtitle="Mutual fund holdings">
      <EmptyState
        title="Portfolio"
        description="Placeholder screen to mirror the existing 1Fi app navigation shell."
      />
    </AppShell>
  );
}
