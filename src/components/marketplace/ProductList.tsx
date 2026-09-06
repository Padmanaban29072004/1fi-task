import type { Product } from "@/types/marketplace";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function ProductList({
  products,
  isLoading,
  error,
  onRetry,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products yet"
        description="Marketplace products will appear here once the catalog is available."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
