"use client";

import type React from "react";
import { useState } from "react";
import { Star } from "lucide-react";

interface RatingReviewsProps {
  initialRating?: number;
  onSubmit?: (data: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  comment: string;
}

const RatingReviews: React.FC<RatingReviewsProps> = ({
  initialRating = 1,
  onSubmit,
}) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const reviewData: ReviewData = { rating, comment };

    if (onSubmit) {
      onSubmit(reviewData);
    }

    console.log(reviewData);
    setComment("");
    setRating(initialRating);
  };

  const renderStars = (): React.ReactNode => {
    const displayRating = hoverRating || rating;

    return [...Array(5)].map((_, i: number) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(rating === i + 1 ? rating - 1 : i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className="cursor-pointer transition-transform hover:scale-110"
        aria-label={`Rate ${i + 1} stars`}
      >
        <Star
          size={30}
          className={
            i < displayRating
              ? "fill-primary text-primary"
              : "text-gray-300 fill-gray-300"
          }
        />
      </button>
    ));
  };

  return (
    <div className="w-full bg-gray-100 py-8 rounded-lg">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold  mb-2">Rating & Reviews</h2>
        <p className="text-secondary">
          Customers rated this pro highly for work quality, professionalism, and
          responsiveness.
        </p>
      </div>

      {/* Star Rating Display with Count */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex gap-2">{renderStars()}</div>
        <span className="text-lg font-semibold text-gray-700">
          {rating > 0
            ? `${rating} star${rating !== 1 ? "s" : ""}`
            : "Click to rate"}
        </span>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Comment Input */}
        <textarea
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
          placeholder="Type your comment ....."
          className="w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          rows={5}
          aria-label="Review comment"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-primary hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
        >
          Send Review
        </button>
      </form>
    </div>
  );
};
export default RatingReviews;
