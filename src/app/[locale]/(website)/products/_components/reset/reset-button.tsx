"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface ResetButtonProps {
  onReset: () => void; // function to call when clicked
  label?: string; // optional label text, uses translation if not provided
}

export default function ResetButton({ onReset, label }: ResetButtonProps) {
  const t = useTranslations("products.filters");
  const resetLabel = label ?? t("reset");

  return (
    <button
      onClick={onReset}
      className="flex items-center justify-center gap-1 text-sm text-red-600 transition-colors hover:text-red-700"
    >
      <X size={14} />
      <span>{resetLabel}</span>
    </button>
  );
}
