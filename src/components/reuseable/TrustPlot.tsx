import { Star } from "lucide-react";

const TrustpilotBadge = () => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <span className="text-white font-semibold text-lg">Excellent</span>
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className="w-5 h-5 fill-green-500 text-green-500"
          />
        ))}
      </div>
      <span className="text-white font-semibold text-lg">Trustpilot</span>
    </div>
  );
};
export default TrustpilotBadge;