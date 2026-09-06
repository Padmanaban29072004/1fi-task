"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductVariant } from "@/types/marketplace";
import { cn } from "@/lib/cn";

interface VariantSelectorProps {
  variants: ProductVariant[];
  onSelectionChange: (selected: Record<string, string>) => void;
}

function buildInitialSelection(
  groups: Array<[string, ProductVariant[]]>
): Record<string, string> {
  const initial: Record<string, string> = {};
  for (const [label, options] of groups) {
    const firstAvailable = options.find((option) => option.inStock) ?? options[0];
    if (firstAvailable) initial[label] = firstAvailable.id;
  }
  return initial;
}

export function VariantSelector({
  variants,
  onSelectionChange,
}: VariantSelectorProps) {
  const groups = useMemo(() => {
    const map = new Map<string, ProductVariant[]>();
    for (const variant of variants) {
      const list = map.get(variant.label) ?? [];
      list.push(variant);
      map.set(variant.label, list);
    }
    return Array.from(map.entries());
  }, [variants]);

  const [selected, setSelected] = useState<Record<string, string>>(() =>
    buildInitialSelection(groups)
  );

  useEffect(() => {
    onSelectionChange(selected);
    // Notify parent once with defaults so pricing stays in sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectOption(label: string, option: ProductVariant) {
    if (!option.inStock) return;
    const next = { ...selected, [label]: option.id };
    setSelected(next);
    onSelectionChange(next);
  }

  return (
    <div className="space-y-4">
      {groups.map(([label, options]) => (
        <div key={label}>
          <p className="mb-2 text-sm font-semibold text-[#111827]">{label}</p>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const isActive = selected[label] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={!option.inStock}
                  onClick={() => selectOption(label, option)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-xs font-medium transition",
                    isActive
                      ? "border-[#712CDC] bg-[#F3EBFF] text-[#712CDC]"
                      : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#C4B5FD]",
                    !option.inStock && "cursor-not-allowed opacity-40 line-through"
                  )}
                >
                  {option.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
