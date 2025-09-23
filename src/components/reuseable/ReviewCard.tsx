import { Star } from "lucide-react";

interface ReviewCardProps {
  category: string;
  review: string;
  author: string;
  rating?: number;
}

const ReviewCard = ({ category, review, author, rating = 5 }: ReviewCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {category}
      </h3>
      
      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i} 
            className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"
          />
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {review}
      </p>
      
      {/* Author */}
      <p className="text-gray-800 font-medium text-sm">
        {author}
      </p>
    </div>
  );
};
export default ReviewCard;