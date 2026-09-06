"use client";

import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/formatCurrency";

interface ProceedCtaProps {
  monthlyAmount: number | null;
  disabled?: boolean;
  onProceed: () => void;
}

export function ProceedCta({
  monthlyAmount,
  disabled = false,
  onProceed,
}: ProceedCtaProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-[#6B7280]">Selected EMI</p>
          <p className="truncate text-sm font-bold text-[#111827]">
            {monthlyAmount != null
              ? `${formatINR(monthlyAmount)} / month`
              : "Choose a plan"}
          </p>
        </div>
        <Button
          onClick={onProceed}
          disabled={disabled || monthlyAmount == null}
          className="min-w-[148px]"
        >
          Proceed with plan
        </Button>
      </div>
    </div>
  );
}
