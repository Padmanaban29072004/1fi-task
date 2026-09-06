"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ShopTabId } from "@/types/marketplace";
import { cn } from "@/lib/cn";
import { MarketplacePanel } from "@/components/shop/MarketplacePanel";
import { TopBrandsPanel } from "@/components/shop/TopBrandsPanel";
import { NearbyStoresPanel } from "@/components/shop/NearbyStoresPanel";

const TABS: { id: ShopTabId; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

function resolveTab(value: string | null): ShopTabId {
  if (value === "top-brands" || value === "nearby-stores" || value === "marketplace") {
    return value;
  }
  return "marketplace";
}

export function ShopTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tab"));

  function setTab(tab: ShopTabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div className="sticky top-[57px] z-20 border-b border-[#E5E7EB] bg-white px-4 pt-3">
        <div className="flex gap-1 overflow-x-auto pb-0">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTab(tab.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition",
                  active
                    ? "bg-[#712CDC] text-white"
                    : "bg-[#F7F5FB] text-[#6B7280] hover:bg-[#F3EBFF] hover:text-[#712CDC]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="h-3" />
      </div>

      {activeTab === "top-brands" ? <TopBrandsPanel /> : null}
      {activeTab === "nearby-stores" ? <NearbyStoresPanel /> : null}
      {activeTab === "marketplace" ? <MarketplacePanel /> : null}
    </div>
  );
}
