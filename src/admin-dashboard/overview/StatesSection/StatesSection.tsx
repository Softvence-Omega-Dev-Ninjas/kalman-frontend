import {
  BriefcaseBusiness,
  DollarSign,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import type { DashboardOverviewResponse } from "../OverviewPage";
import type React from "react";

interface StatesSectionProps {
  overview?: DashboardOverviewResponse; 
}

const StatesSection : React.FC<StatesSectionProps> = ({overview}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {/* Total Properties */}
      <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-[#EAEAEA]">
        <div>
          <p className="text-sm text-gray-500">Platform Users</p>
          <p className="text-2xl font-bold text-gray-800">{overview?.totalUser}</p>
          <div className="text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp />
            <span>+{overview?.userGrowth} this month</span>
          </div>
        </div>
        <div className="bg-[#0181FA] rounded-full w-14 h-14 flex items-center justify-center p-2">
          <UsersRound className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Active Listings */}
      <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-[#EAEAEA]">
        <div>
          <p className="text-sm text-gray-500">Monthly Revenue</p>
        <p className="text-2xl font-bold text-gray-800">{overview?.montlyRevenue || "N/O"}</p>
          <div className="text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp />
            <span>+{overview?.revenueGrowth} growth</span>
          </div>
        </div>
        <div className="bg-[#FF7346] rounded-full w-14 h-14 flex items-center justify-center p-2">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Today Inquiries */}
      <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-[#EAEAEA]">
        <div>
          <p className="text-sm text-gray-500">Active Jobs</p>
          <p className="text-2xl font-bold text-gray-800">{overview?.totalCompletedJobs}</p>
          <div className="text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp />
            <span>+18.2% this month</span>
          </div>
        </div>
        <div className="bg-[#2E54DA] rounded-full w-14 h-14 flex items-center justify-center p-2">
          <BriefcaseBusiness className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatesSection;
