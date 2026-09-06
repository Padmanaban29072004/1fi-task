"use client";

import { useProducts } from "@/hooks/useProducts";
import { ProductList } from "@/components/marketplace/ProductList";

export function MarketplacePanel() {
  const { products, isLoading, error, refetch } = useProducts();

  return (
    <section>
      <div className="px-4 pb-3 pt-1">
        <h2 className="text-base font-semibold text-[#111827]">
          1Fi Marketplace
        </h2>
        <p className="mt-0.5 text-xs text-[#6B7280]">
          Browse products and choose mutual-fund backed no-cost EMI plans.
        </p>
      </div>
      <ProductList
        products={products}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      />
    </section>
  );
}
