"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/marketplace";
import { calcDiscountPercent, formatINR } from "@/lib/formatCurrency";
import { VariantSelector } from "@/components/marketplace/VariantSelector";
import { EmiPlanSelector } from "@/components/marketplace/EmiPlanSelector";
import { ProceedCta } from "@/components/marketplace/ProceedCta";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(
    {}
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    product.emiPlans[0]?.id ?? null
  );
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const priceDelta = useMemo(() => {
    return product.variants
      .filter((variant) => Object.values(selectedVariants).includes(variant.id))
      .reduce((sum, variant) => sum + (variant.priceDelta ?? 0), 0);
  }, [product.variants, selectedVariants]);

  const effectivePrice = product.basePrice + priceDelta;
  const discount = calcDiscountPercent(product.mrp, product.basePrice);
  const selectedPlan =
    product.emiPlans.find((plan) => plan.id === selectedPlanId) ?? null;

  function handleProceed() {
    if (!selectedPlan) return;

    const variantSummary = product.variants
      .filter((variant) => Object.values(selectedVariants).includes(variant.id))
      .map((variant) => `${variant.label}: ${variant.value}`)
      .join(", ");

    setConfirmation(
      `You're proceeding with ${product.name}${
        variantSummary ? ` (${variantSummary})` : ""
      } on a ${selectedPlan.tenureMonths}-month plan of ${formatINR(
        selectedPlan.monthlyAmount
      )}/mo.`
    );
  }

  return (
    <div className="pb-36">
      <div className="relative aspect-square bg-[#F7F5FB]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-5 px-4 pt-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
            {product.brand} · {product.category}
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#111827]">{product.name}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-[#F3EBFF] px-2 py-0.5 text-xs font-semibold text-[#712CDC]">
              ★ {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-[#6B7280]">
              {product.reviewCount.toLocaleString("en-IN")} reviews
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-bold text-[#111827]">
            {formatINR(effectivePrice)}
          </span>
          {discount > 0 ? (
            <>
              <span className="text-sm text-[#9CA3AF] line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="text-sm font-semibold text-[#059669]">
                {discount}% off
              </span>
            </>
          ) : null}
        </div>

        <p className="text-sm leading-relaxed text-[#6B7280]">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]"
            >
              {badge}
            </span>
          ))}
        </div>

        <section className="rounded-2xl border border-[#E5E7EB] p-3.5">
          <VariantSelector
            variants={product.variants}
            onSelectionChange={setSelectedVariants}
          />
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-[#111827]">Highlights</h3>
          <ul className="space-y-2">
            {product.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-[#374151] before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-[#712CDC] before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4 rounded-2xl border border-[#E5E7EB] p-3.5">
          <EmiPlanSelector
            plans={product.emiPlans}
            selectedPlanId={selectedPlanId}
            onSelect={setSelectedPlanId}
          />
        </section>

        {confirmation ? (
          <div
            role="status"
            className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-3 text-sm text-[#065F46]"
          >
            {confirmation}
          </div>
        ) : null}
      </div>

      <ProceedCta
        monthlyAmount={selectedPlan?.monthlyAmount ?? null}
        disabled={!product.inStock}
        onProceed={handleProceed}
      />
    </div>
  );
}
