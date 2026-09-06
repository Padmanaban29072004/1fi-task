"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/marketplace";
import {
  MarketplaceApiError,
  marketplaceService,
} from "@/services/marketplaceService";

interface UseProductState {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(productId: string): UseProductState {
  const [product, setProduct] = useState<Product | null>(null);
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
        const data = await marketplaceService.getProductById(productId);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof MarketplaceApiError
              ? err.message
              : "Unable to load product details.";
          setError(message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [productId, reloadKey]);

  return { product, isLoading, error, refetch };
}
