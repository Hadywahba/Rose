import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Review } from '@/lib/types/products/reviews/reviews-response';

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="space-y-2">
      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage
            src={review.user.photo}
            alt={`${review.user.firstName} ${review.user.lastName}`}
          />
          <AvatarFallback className="text-xs">
            {review.user.firstName[0]}
            {review.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-sm">
          <span className="font-semibold text-zinc-600">
            {review.user.firstName} {review.user.lastName}
          </span>
          <span className="text-zinc-400">
            {new Date(review.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
      {/* Rating */}
      <div className="mt-1 flex items-center gap-1">
        <Rating rate={review.rating} className="[&_svg]:size-4" />
        <span className="text-sm font-semibold text-zinc-800">
          ({review.rating.toFixed(1)})
        </span>
      </div>

      {/* Title & Content */}
      <div className="space-y-1">
        <h3 className="font-medium">{review.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {review.comment}
        </p>
      </div>
    </div>
  );
}
