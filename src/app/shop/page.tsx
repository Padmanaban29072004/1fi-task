import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ShopTabs } from "@/components/shop/ShopTabs";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

function ShopFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <AppShell
      title="Shop"
      subtitle="Discover brands, stores & Marketplace"
    >
      <Suspense fallback={<ShopFallback />}>
        <ShopTabs />
      </Suspense>
    </AppShell>
  );
}
