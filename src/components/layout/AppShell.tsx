import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";

interface AppShellProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  showBottomNav?: boolean;
  children: React.ReactNode;
}

export function AppShell({
  title,
  subtitle,
  showBack = false,
  backHref,
  showBottomNav = true,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F7F5FB] text-[#111827]">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-white shadow-[0_0_40px_rgba(113,44,220,0.06)]">
        <AppHeader
          title={title}
          subtitle={subtitle}
          showBack={showBack}
          backHref={backHref}
        />
        <main className={showBottomNav ? "flex-1 pb-24" : "flex-1 pb-8"}>
          {children}
        </main>
        {showBottomNav ? <BottomNav /> : null}
      </div>
    </div>
  );
}
