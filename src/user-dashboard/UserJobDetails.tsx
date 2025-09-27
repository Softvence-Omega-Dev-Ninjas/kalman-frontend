import React from "react";
import { Briefcase, Clock, MapPin, Star, ArrowLeft } from "lucide-react";

// Type definitions
interface Proposal {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  distance: number;
  jobDescription: string;
  hourlyRate: number;
  jobsCompleted: number;
  availability: string;
  status: string;
}

interface ProposalCardProps {
  proposal: Proposal;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const handleAccept = () => {
    console.log(`Accepted proposal from ${proposal.name}`);
  };

  const handleDecline = () => {
    console.log(`Declined proposal from ${proposal.name}`);
  };
  return (
    <div className="border rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6">
      {/* Left side: Proposer details */}
      <div className="flex-1 space-y-4">
        <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <img
              src={proposal.avatar}
              alt={proposal.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {proposal.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>
                {proposal.rating.toFixed(1)} ({proposal.reviews} reviews)
              </span>
              <span className="h-1 w-1 bg-gray-400 rounded-full mx-1"></span>
              <MapPin size={16} className="text-gray-500" />
              <span>{proposal.distance} miles away</span>
            </div>
          </div>
        </div>

        {/* Job details */}
        <div className="mt-4">
          <p className="text-sm text-gray-800 font-semibold mb-1">
            For : <span>Complete Kitchen Renovation</span>
          </p>
          <p className="text-sm text-gray-500 line-clamp-3">
            {proposal.jobDescription}
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-primary font-bold">
              ${proposal.hourlyRate.toFixed(2)}/hr
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>Job complete ({proposal.jobsCompleted})</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{proposal.availability}</span>
          </div>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex flex-col gap-2 md:ml-auto mt-4 md:mt-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Accept
          </button>
          <button 
            onClick={handleDecline}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const UserJobDetails: React.FC = () => {
  const proposalsData: Proposal[] = [
    {
      id: 1,
      name: "Albert Flores",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 5.0,
      reviews: 20,
      distance: 1.8,
      jobDescription:
        "I will provide a complete kitchen renovation service including removal of existing units, installation of new cabinets, worktops, appliances, and all electrical work. My approach includes proper planning and high-quality materials.",
      hourlyRate: 20.0,
      jobsCompleted: 20,
      availability: "Available tomorrow",
      status: "Active",
    },
    {
      id: 2,
      name: "Dianne Russell",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3cb?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 5.0,
      reviews: 20,
      distance: 1.8,
      jobDescription:
        "I will provide a complete kitchen renovation service including removal of existing units, installation of new cabinets, worktops, appliances, and all electrical work. My approach includes proper planning and attention to detail.",
      hourlyRate: 15.0,
      jobsCompleted: 20,
      availability: "Available any time",
      status: "Active",
    },
    {
      id: 3,
      name: "Ronald Richards",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 5.0,
      reviews: 20,
      distance: 1.8,
      jobDescription:
        "I will provide a complete kitchen renovation service including removal of existing units, installation of new cabinets, worktops, appliances, and all electrical work. My approach includes proper project management and quality assurance.",
      hourlyRate: 10.0,
      jobsCompleted: 20,
      availability: "Available tomorrow",
      status: "Active",
    },
  ];

  const handleBack = () => {
    console.log("Navigate back");
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6 mb-28 max-w-5xl mx-auto">
        <button onClick={handleBack} className="mb-6">
         <span className="flex items-center">
           <ArrowLeft className="mr-2" size={16} />
          <span>Proposals</span>
         </span>
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Proposals Section */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 order-2 lg:order-1">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Proposals
            </h1>
            <div className="space-y-6">
              {proposalsData.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          </div>

          {/* My Job Section */}
          <div className="w-full lg:w-80 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Job</h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium text-lg">
                    Kitchen Cabinet Installation
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full w-fit mt-2">
                    Active
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">$20.0/hr</div>
                
                {/* Additional Job Details */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>Posted 2 days ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} />
                    <span>3 proposals received</span>
                  </div>
                </div>
                
                {/* Job Description Preview */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Looking for experienced contractor to install new kitchen cabinets. 
                    Project includes removal of old cabinets and installation of new ones 
                    with proper alignment and finishing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobDetails;