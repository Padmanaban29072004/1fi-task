import Link from "next/link";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
}

export function AppHeader({
  title,
  subtitle,
  showBack = false,
  backHref = "/shop?tab=marketplace",
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        {showBack ? (
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F5FB] text-[#111827] transition hover:bg-[#F3EBFF]"
            aria-label="Go back"
          >
            ←
          </Link>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#712CDC] via-[#8c27fc] to-[#5c22a5] text-xs font-bold text-white">
            1Fi
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-[#111827]">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-xs text-[#6B7280]">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
