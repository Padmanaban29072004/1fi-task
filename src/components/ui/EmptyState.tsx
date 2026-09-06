interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-20 text-center">
      <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3EBFF] text-2xl text-[#712CDC]">
        ○
      </div>
      <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-[#6B7280]">
        {description}
      </p>
    </div>
  );
}
