import { BsThreeDots } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import TradespersonCard from "../reuseable/TradePersonCard";
import trade1 from "../../assets/sample_images/trade1.png";
import trade2 from "../../assets/sample_images/trade2.png";
import trade3 from "../../assets/sample_images/trade3.png";
import trade4 from "../../assets/sample_images/trade4.png";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "../Jobs/common/PaginationControls";

interface AllTradesmanProps {
  tradesman: any[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const AllServices: React.FC<AllTradesmanProps> = ({
  tradesman,
  isLoading,
  page,
  setPage,
  totalPages,
}) => {
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
  console.log("tradesman", tradesman);
  const handleContact = (name: string) => {
    console.log(`Contacting ${name}`);
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradesman.map((person, index) => (
          <TradespersonCard
            key={index}
            image={person.image}
            name={`${person.firstName} ${person.lastName}`}
            profession={person.businessDetail.businessName}
            rating={person.businessDetail.yearsOfExperience}
            availability={person.businessDetail.businessType}
            location={person.address}
            hourlyRate={person.businessDetail.hourlyRate}
            onContact={() => handleContact(person.name)}
          />
        ))}
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AllServices;
