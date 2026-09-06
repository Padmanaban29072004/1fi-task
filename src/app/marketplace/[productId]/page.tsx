"use client";

import { use } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductDetailView } from "@/components/marketplace/ProductDetailView";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useProduct } from "@/hooks/useProduct";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { productId } = use(params);
  const { product, isLoading, error, refetch } = useProduct(productId);

  return (
    <AppShell
      title="Product details"
      subtitle="1Fi Marketplace"
      showBack
      backHref="/shop?tab=marketplace"
      showBottomNav={false}
    >
      {isLoading ? <ProductDetailSkeleton /> : null}

      {!isLoading && error ? (
        <ErrorState
          title="Couldn’t load product"
          message={error}
          onRetry={refetch}
        />
      ) : null}

      {!isLoading && !error && product ? (
        <ProductDetailView product={product} />
      ) : null}
    </AppShell>
  );
}
