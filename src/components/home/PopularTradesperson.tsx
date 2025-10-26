import TradespersonCard from "../reuseable/TradePersonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import trade1 from "../../assets/sample_images/trade1.png";
import trade2 from "../../assets/sample_images/trade2.png";
import trade3 from "../../assets/sample_images/trade3.png";
import trade4 from "../../assets/sample_images/trade4.png";
const PopularTradesperson = () => {
  const tradespeople = [
    {
      id: "1",
      image: trade1,
      name: "Ronald Higgins",
      profession: "Plumber",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "20.00",
    },
    {
      id: "2",
      image: trade2,
      name: "Wade Warren",
      profession: "Handyman",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "30.00",
    },
    {
      id: "3",
      image: trade3,
      name: "Ronald Higgins",
      profession: "Electrician",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "40.00",
    },
    {
      id: "4",
      image: trade4,
      name: "Jacob Jones",
      profession: "Interior Designer",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "50.00",
    },
  ];

  const handleContact = (name: string) => {
    console.log(`Contacting ${name}`);
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Our Popular Tradesperson
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600 text-lg">
              Our popular tradespeople are here to make life easier.
            </p>
            <p className="text-gray-600 text-lg">
              From trusted home fixes to essential services, we've got you
              covered.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-0 top-0 flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tradesperson Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tradespeople.map((person, index) => (
            <TradespersonCard
              id={person.id}
              key={index}
              image={person.image}
              name={person.name}
              profession={person.profession}
              rating={person.rating}
              availability={person.availability}
              location={person.location}
              hourlyRate={person.hourlyRate}
              onContact={() => handleContact(person.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTradesperson;
