import { FaStar, FaRegStar } from 'react-icons/fa';

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? (
            <FaStar className="h-5 w-5 text-yellow-500" />
          ) : (
            <FaRegStar className="h-5 w-5 text-yellow-500" />
          )}
        </span>
      ))}
    </div>
  );
};
