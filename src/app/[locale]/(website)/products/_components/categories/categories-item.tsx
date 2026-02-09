"use client";

import Image from "next/image";

export type CategoryItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  image: string;
};

export default function CategoryItem({ label, active, onClick, image }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-7 w-full items-center gap-2 rounded-md text-zinc-800 transition-colors ${active ? "bg-maroon-50 hover:bg-maroon-100" : "bg-zinc-200 hover:bg-zinc-300"
        }`}
    >
      <div
        className={`flex h-full w-9 items-center justify-center  text-white transition-colors ${active ? "bg-maroon-600" : "bg-zinc-500"
          }`}
      >
        <Image
          src={image}
          alt={label}
          width={21}
          height={20}
          className="object-cover filter-white"
        />
      </div>

      <h3 className="flex-1 text-left">{label}</h3>
    </button>
  );
}
