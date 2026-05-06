import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function TestimonialFeatureItem({
  icon,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-center gap-4 px-4 pt-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#80c6f9] ">
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
