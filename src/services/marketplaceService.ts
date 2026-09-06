import type {
  Product,
  ProductDetailResponse,
  ProductsResponse,
} from "@/types/marketplace";

class MarketplaceApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "MarketplaceApiError";
    this.status = status;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Something went wrong while fetching marketplace data.";
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // ignore parse failures
    }
    throw new MarketplaceApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

/**
 * Client-side API access layer.
 * Keeps UI free of hardcoded catalog data and ready for real backends.
 */
export const marketplaceService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch("/api/products", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await parseJson<ProductsResponse>(response);
    return data.products;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await parseJson<ProductDetailResponse>(response);
    return data.product;
  },
};

export { MarketplaceApiError };
