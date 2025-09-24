import { BsThreeDots } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TradespersonCard from "../reuseable/TradePersonCard";
import trade1 from '../../assets/sample_images/trade1.png'
import trade2 from '../../assets/sample_images/trade2.png'
import trade3 from '../../assets/sample_images/trade3.png'
import trade4 from '../../assets/sample_images/trade4.png' 

const AllServices = () => {
  const tradespeople = [
    {
      image: trade1,
      name: "Ronald Higgins",
      profession: "Plumber",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "20.00",
    },
    {
      image: trade2,
      name: "Wade Warren",
      profession: "Handyman",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "30.00",
    },
    {
      image: trade3,
      name: "Ronald Higgins",
      profession: "Electrician",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "40.00",
    },
    {
      image: trade2,
      name: "Wade Warren",
      profession: "Handyman",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "30.00",
    },
    {
      image: trade3,
      name: "Ronald Higgins",
      profession: "Electrician",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "40.00",
    },
    {
      image: trade4,
      name: "Jacob Jones",
      profession: "Interior Designer",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "50.00",
    },
    {
      image: trade3,
      name: "Ronald Higgins",
      profession: "Electrician",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "40.00",
    },
    {
      image: trade4,
      name: "Jacob Jones",
      profession: "Interior Designer",
      rating: "5.0",
      availability: "Part Time",
      location: "At near your location",
      hourlyRate: "50.00",
    },
    {
      image: trade3,
      name: "Ronald Higgins",
      profession: "Electrician",
      rating: "5.0",
      availability: "Full Time",
      location: "At near your location",
      hourlyRate: "40.00",
    },
    {
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
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradespeople.map((person, index) => (
          <TradespersonCard
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

      <div className="flex items-center justify-center gap-5 mt-10">
        <button className="p-2 rounded-md bg-primary text-white">
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          1
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          2
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          3
        </button>
        <BsThreeDots className="text-2xl" />
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          11
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          12
        </button>
        <button className="p-2 rounded-md bg-primary text-white">
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default AllServices;
