import { useEffect, useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { useGetTradesmanOverviewQuery } from "@/redux/features/tradesman/tradesmanApi";
import RecentInvitation from "./tradeComponents/TradeManOverview/RecentInvitation";
import RecentShortlist from "./tradeComponents/TradeManOverview/RecentShortlist";
import MyShortlist from "./tradeComponents/TradeManOverview/MyShortlist";

// type JobItem = {
//   id?: string;
//   time?: string;
//   messgae?: string;
//   user?: {
//     name?: string;
//     profile_image?: string;
//   };
//   jobs?: {
//     title?: string;
//     preferred_date?: string;
//     location?: string;
//     preferred_time?: string;
//   };
// };

const TradeOverview: React.FC = () => {

           useEffect(()=>{
              document.title = `Overview | Trade Dashboard | ${import.meta.env.VITE_APP_NAME}`
            }, [])

  const [selectedMonth, setSelectedMonth] = useState("Month");
  const { data: recentJobs } = useGetTradesmanOverviewQuery(undefined);
  // const recentJobs: JobItem[] = data?.data?.myShortlist ?? [];

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent shortlist - Left Column */}
        <div className="lg:col-span-2 space-y-6 ">
          <RecentShortlist recentJobs={recentJobs?.data?.myShortlist} />
          <RecentInvitation recentJobs={recentJobs?.data?.invitations} />
        </div>

        {/* Activity - Right Column */}
        <div className="space-y-6">
          {/* Activity Stats */}
          <div className="border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Activity
                </h2>
              </div>
            </div>

            <div className="mb-4 bg-white p-3 rounded-lg border-gray-200 border-1">
              <div className="flex items-center justify-between mb-2 ">
                <span className="text-md font-semibold text-gray-600">
                  This Months
                </span>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none border border-gray-200 rounded-md px-3 py-1 text-sm text-gray-700 pr-8 focus:outline-none focus:border-orange-500 bg-gray-100 font-semibold"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Shortlisted</div>
                </div>
              </div>
            </div>
          </div>

          {/* MY Shortlist */}
          <MyShortlist recentJobs={recentJobs?.data?.myShortlist} />
        </div>
      </div>
    </div>
  );
};

export default TradeOverview;
