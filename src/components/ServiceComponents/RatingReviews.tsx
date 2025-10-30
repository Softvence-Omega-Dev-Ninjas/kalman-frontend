"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { usePostReviewMutation } from "@/redux/features/review/reviewApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";

interface RatingReviewsProps {
  initialRating?: number;
  onSubmit?: (data: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  text: string;
  customerId: string;
  tradesManId: string;
}

const RatingReviews: React.FC<RatingReviewsProps> = ({ initialRating = 1 }) => {
  const { id: tradesManId } = useParams<{ id: string }>();
  const [postReview, { isLoading }] = usePostReviewMutation();

  const currentUser = useSelector(selectCurrentUser);
  const customerId = currentUser?.id;

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerId || !tradesManId) {
      return;
    }

    const reviewData: ReviewData = {
      rating,
      text: comment,
      customerId,
      tradesManId,
    };
    try {
      await postReview(reviewData).unwrap();
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(initialRating);
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };

  const renderStars = () => {
    const displayRating = hoverRating || rating;

    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
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
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Rating & Reviews</h2>
        <p className="text-secondary">
          Customers rated this pro highly for work quality, professionalism, and
          responsiveness.
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex gap-2">{renderStars()}</div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment..."
          className="w-full p-4 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          rows={5}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-60"
        >
          {isLoading ? "Submitting..." : "Send Review"}
        </button>
      </form>
    </div>
  );
};

export default RatingReviews;
