import React from "react";
import { Briefcase, Clock, MapPin, MessageCircle, Star } from "lucide-react";

// Interface
export interface Proposal {
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
    // Handle accept logic here
  };

  const handleDecline = () => {
    // Handle decline logic here
  };

  const handleContact = () => {
    // Handle contact logic here
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col md:flex-row gap-6">
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
            <h2 className="text-lg font-semibold text-gray-800">
              {proposal.name}
            </h2>
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
            For : <span className="">Complete Kitchen Renovation</span>
          </p>
          <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-none">
            {proposal.jobDescription}
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex flex-row items-center justify-between flex-wrap gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-cyan-500 font-bold">
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
        <div className="flex items-center gap-5">
          <button 
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={handleDecline}
            className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
          >
            Decline
          </button>
        </div>
        <button 
          onClick={handleContact}
          className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <span className="font-semibold">Contact</span>
          <MessageCircle />
        </button>
      </div>
    </div>
  );
};

// Example usage with sample data
const ProposalShowcase: React.FC = () => {
  const sampleProposals: Proposal[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3cb?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 4.8,
      reviews: 124,
      distance: 2.5,
      jobDescription: "I specialize in modern kitchen renovations with 8+ years of experience. I can help transform your outdated kitchen into a beautiful, functional space that meets your needs and budget.",
      hourlyRate: 85.50,
      jobsCompleted: 45,
      availability: "Available this week",
      status: "pending"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 4.9,
      reviews: 89,
      distance: 1.8,
      jobDescription: "Professional kitchen designer and contractor with expertise in custom cabinets, countertops, and full kitchen makeovers. Quality work guaranteed.",
      hourlyRate: 95.00,
      jobsCompleted: 67,
      availability: "Available next week",
      status: "pending"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face&auto=format",
      rating: 4.7,
      reviews: 156,
      distance: 3.2,
      jobDescription: "Experienced in both traditional and contemporary kitchen designs. I focus on maximizing space efficiency while creating beautiful, practical kitchens.",
      hourlyRate: 78.00,
      jobsCompleted: 82,
      availability: "Available immediately",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Kitchen Renovation Proposals
        </h1>
        {sampleProposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
};

export default ProposalShowcase;