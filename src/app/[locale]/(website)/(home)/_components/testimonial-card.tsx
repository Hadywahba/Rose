import Image from 'next/image';
import { StarRating } from './star-rating';

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  review: string;
  date: string;
}

export const TestimonialCard = ({
  testimonial,
  onMouseEnter,
  onMouseLeave,
}: {
  testimonial: Testimonial;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <div className="relative flex h-full flex-col pt-16">
      {/* Avatar */}
      <div
        className="absolute  left-1/2 top-0 z-10 flex -translate-x-1/2 justify-center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative size-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Card */}
      <div
        className="relative flex flex-1 flex-col rounded-[32px] bg-white px-5 pb-5 pt-20 "
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3 className="mb-9 text-center text-base font-semibold text-[#27272A]">
          {testimonial.name}
        </h3>

        <div className="mb-2 lg:mb-2.5">
          <StarRating rating={testimonial.rating} />
        </div>

        <p className="mb-4 flex-1 whitespace-normal break-words pb-2 text-start text-base font-medium leading-relaxed text-[#27272A] lg:mb-7">
          {testimonial.review}
        </p>

        <p className="text-center text-sm text-gray-400">{testimonial.date}</p>
      </div>
    </div>
  );
};
