import type React from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  title,
  avatar,
  rating,
  comment,
}) => {
  return (
    <div className="bg-white p-6 mt-4 rounded-xl border border-gray-200 mb-4">
      {/* User Info */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={avatar || "/placeholder.svg"}
          alt={name}
          className="w-13 h-13 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="space-y-0.5">
            <h3 className="font-semibold text-lg ">{name}</h3>
            <p className="text-lg text-secondary">{title}</p>
          </div>
          {/* Star Rating */}
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < rating
                    ? "fill-primary text-primary"
                    : "text-gray-300 fill-gray-300"
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <p className="text-gray-700 text-sm leading-relaxed">{comment}</p>
    </div>
  );
};
export default ReviewCard;
