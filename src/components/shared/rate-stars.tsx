
import { RateStarsProps } from "@/lib/types/components/products";
import { cn } from "@/lib/utility/cn.util";
import { Star, StarHalf } from "lucide-react";

export default function RateStars({ rateCount }: RateStarsProps) {
    const STARS_LENGTH = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
        <div className="my-1 flex gap-1">
            {STARS_LENGTH.map((starNumber) =>
                starNumber > 4 && !Number.isInteger(rateCount) ? (
                    <StarHalf key={"star" + starNumber} size={17} color="#FFA508" className="fill-[#FFA508]" />
                ) : (
                    <Star key={"star" + starNumber} size={17} color="#FFA508" className={cn(starNumber < rateCount && "fill-[#FFA508]")} />
                )
            )}
        </div>
    );
}
