
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  location: string;
  rating: string;
  buttonText?: string;
}
const ServiceCard = ({ 
  image, 
  title, 
  description, 
  location, 
  rating, 
  buttonText = "Explore now" 
}: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border group border-gray-100">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-107 duration-300 transition-all "
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{rating}</span>
          </div>
        </div>
        
        <Link to={"/services"}>
          <button className="w-full bg-primary cursor-pointer hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;