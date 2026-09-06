"use client";

import type { EmiPlan } from "@/types/marketplace";
import { formatINR } from "@/lib/formatCurrency";
import { cn } from "@/lib/cn";

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
}

export function EmiPlanSelector({
  plans,
  selectedPlanId,
  onSelect,
}: EmiPlanSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">EMI plans</h3>
          <p className="text-xs text-[#6B7280]">
            Mutual-fund backed · no CIBIL check
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {plans.map((plan) => {
          const active = selectedPlanId === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border px-3.5 py-3 text-left transition",
                active
                  ? "border-[#712CDC] bg-[#F3EBFF] shadow-sm"
                  : "border-[#E5E7EB] bg-white hover:border-[#C4B5FD]"
              )}
            >
              <div>
                <p className="text-sm font-semibold text-[#111827]">
                  {formatINR(plan.monthlyAmount)}
                  <span className="font-medium text-[#6B7280]"> / month</span>
                </p>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                  {plan.tenureMonths} months
                  {plan.isNoCost ? " · 0% interest" : ` · ${plan.interestRate}%`}
                </p>
              </div>
              <div className="text-right">
                {plan.isNoCost ? (
                  <span className="rounded-full bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-semibold text-[#059669]">
                    No-cost
                  </span>
                ) : null}
                <p className="mt-1 text-[11px] text-[#9CA3AF]">
                  Total {formatINR(plan.totalAmount)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
