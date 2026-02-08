"use client";

import { X } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void; // function to call when clicked
  label?: string; // optional label text, defaults to "Reset"
}

export default function ResetButton({ onReset, label = "Reset" }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className="flex items-center justify-center gap-1 text-sm text-red-600 transition-colors hover:text-red-700"
    >
      <X size={14} />
      <span>{label}</span>
    </button>
  );
}
