export type ShopTabId = "top-brands" | "nearby-stores" | "marketplace";

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
  priceDelta?: number;
  inStock: boolean;
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  isNoCost: boolean;
  processingFee: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  images: string[];
  basePrice: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  variants: ProductVariant[];
  emiPlans: EmiPlan[];
  highlights: string[];
  inStock: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductDetailResponse {
  product: Product;
}

export interface ApiErrorBody {
  error: string;
  message: string;
}
