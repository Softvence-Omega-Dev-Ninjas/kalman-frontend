/* eslint-disable @typescript-eslint/no-explicit-any */

import { Star, MapPin, Clock } from "lucide-react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface TradespersonCardProps {
  image: any;
  name: string;
  profession: string;
  rating: string;
  availability: string;
  location: string;
  hourlyRate: string;
  id: string;
  onContact: () => void;
}
const TradespersonCard = ({
  image,
  name,
  profession,
  rating,
  availability,
  location,
  hourlyRate,
  id,
}: TradespersonCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="h-[200px] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 space-y-3">
        {/* Name and Availability */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center text-black font-semibold text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{availability}</span>
          </div>
        </div>

        {/* Profession and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-orange-500 text-sm font-medium px-2 py-1 bg-orange-100 rounded-md">
            {profession}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>

        {/* Price and Contact */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-semibold text-[#595959]">
            ${hourlyRate}/hr
          </div>
          <button
            onClick={() => navigate(`/services/${id}`)}
            className="text-orange-500 hover:text-orange-600 underline font-medium text-sm flex items-center transition-colors duration-200"
          >
            <span>Contact now</span>
            <MdArrowOutward className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TradespersonCard;
