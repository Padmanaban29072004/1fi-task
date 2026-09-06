"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/marketplace";
import {
  MarketplaceApiError,
  marketplaceService,
} from "@/services/marketplaceService";

interface UseProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(): UseProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await marketplaceService.getProducts();
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof MarketplaceApiError
              ? err.message
              : "Unable to load marketplace products.";
          setError(message);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  return { products, isLoading, error, refetch };
}
