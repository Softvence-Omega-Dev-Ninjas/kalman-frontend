import { useMemo } from "react";

interface Review {
  rating: number;
}

// Define allowed keys
type RatingKey = 0 | 1 | 2 | 3 | 4 | 5;

// Map RatingKey to number
type RatingCounts = Record<RatingKey, number>;

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingCounts: RatingCounts;
}

export const useReviewCount = (reviews: Review[] = []): ReviewStats => {
  return useMemo(() => {
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    // Initialize counts
    const ratingCounts: RatingCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach(({ rating }) => {
      // Clamp rating to 0–5
      const normalizedRating = Math.min(
        5,
        Math.max(0, Math.round(rating))
      ) as RatingKey;
      ratingCounts[normalizedRating]++;
    });

    const totalStars = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = parseFloat((totalStars / totalReviews).toFixed(1));

    return { totalReviews, averageRating, ratingCounts };
  }, [reviews]);
};
