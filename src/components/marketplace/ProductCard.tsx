import Link from "next/link";
import type { Product } from "@/types/marketplace";
import { calcDiscountPercent, formatINR } from "@/lib/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingEmi = product.emiPlans.reduce(
    (min, plan) => Math.min(min, plan.monthlyAmount),
    product.emiPlans[0]?.monthlyAmount ?? 0
  );
  const discount = calcDiscountPercent(product.mrp, product.basePrice);

  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition hover:border-[#C4B5FD] hover:shadow-md animate-fade-up"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F5FB]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {product.badges[0] ? (
          <span className="absolute left-2 top-2 rounded-full bg-[#712CDC] px-2 py-0.5 text-[10px] font-semibold text-white">
            {product.badges[0]}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#9CA3AF]">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#111827]">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-1.5 pt-1">
          <span className="text-sm font-bold text-[#111827]">
            {formatINR(product.basePrice)}
          </span>
          {discount > 0 ? (
            <>
              <span className="text-xs text-[#9CA3AF] line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="text-xs font-medium text-[#059669]">
                {discount}% off
              </span>
            </>
          ) : null}
        </div>
        <p className="text-xs text-[#712CDC]">
          EMI from {formatINR(startingEmi)}/mo
        </p>
      </div>
    </Link>
  );
}
