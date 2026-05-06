import Image from 'next/image';
import { StarRating } from './star-rating';
import { normalize } from '@/lib/utility/normalize-url';
import { useLocale } from 'next-intl';

export const TestimonialCard = ({
  testimonial,
  onMouseEnter,
  onMouseLeave,
}: {
  testimonial: Testimonial;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  // Translation
  const locale = useLocale();

  //Constant
  const currentPhoto = testimonial.image?.startsWith('blob:')
    ? testimonial.image
    : normalize(testimonial.image);

  const formattedDate = new Date(testimonial.createdAt).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  );

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
            src={currentPhoto}
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
        <h3 className="mb-3 text-center text-xs font-semibold text-zinc-800 min-[400px]:mb-4 min-[400px]:text-sm sm:mb-6 sm:text-base md:mb-9">
          {testimonial.name}
        </h3>

        <div className="mb-2 flex justify-center md:mb-2.5">
          <StarRating rating={testimonial.rating} />
        </div>

        <p className="mb-2 flex-1 whitespace-normal break-words text-center text-[11px] font-medium leading-relaxed text-zinc-800 min-[400px]:mb-3 min-[400px]:text-xs sm:mb-4 sm:text-sm md:text-base lg:mb-7">
          {testimonial.content}
        </p>

        <p className="text-center text-[10px] text-gray-400 min-[400px]:text-xs sm:text-sm">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};
