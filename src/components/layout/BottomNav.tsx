"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/shop", label: "Shop", icon: "▣" },
  { href: "/portfolio", label: "Portfolio", icon: "◐" },
  { href: "/profile", label: "Profile", icon: "☺" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-lg grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-[#712CDC]" : "text-[#9CA3AF] hover:text-[#6B7280]"
              )}
            >
              <span className="text-base leading-none" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
