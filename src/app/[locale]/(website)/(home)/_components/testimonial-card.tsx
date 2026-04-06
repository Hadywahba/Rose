import Image from 'next/image';
import { StarRating } from './star-rating';
import { Testimonial } from '@/lib/types/home/testimonials';

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
    <div className="relative flex h-full flex-col pt-10 min-[400px]:pt-12 sm:pt-14 md:pt-16">
      {/* Avatar */}
      <div
        className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 justify-center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative size-20 overflow-hidden rounded-full border-2 border-white shadow-lg min-[400px]:size-24 min-[400px]:border-4 sm:size-28 md:size-32">
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
        className="relative flex flex-1 flex-col rounded-xl bg-white px-3 pb-3 pt-12 min-[400px]:rounded-2xl min-[400px]:px-4 min-[400px]:pb-4 min-[400px]:pt-14 sm:rounded-3xl sm:px-5 sm:pb-5 sm:pt-16 md:pt-20 lg:rounded-[32px]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3 className="mb-3 text-center text-xs font-semibold text-[#27272A] min-[400px]:mb-4 min-[400px]:text-sm sm:mb-6 sm:text-base md:mb-9">
          {testimonial.name}
        </h3>

        <div className="mb-2 flex justify-center md:mb-2.5">
          <StarRating rating={testimonial.rating} />
        </div>

        <p className="mb-2 flex-1 whitespace-normal break-words text-center text-[11px] font-medium leading-relaxed text-[#27272A] min-[400px]:mb-3 min-[400px]:text-xs sm:mb-4 sm:text-sm md:text-start md:text-base lg:mb-7">
          {testimonial.review}
        </p>

        <p className="text-center text-[10px] text-gray-400 min-[400px]:text-xs sm:text-sm">{testimonial.date}</p>
      </div>
    </div>
  );
};
