import {

  // recentActivity,
  systemStatus,

} from "../data/overviewData";
// import DashboardCard from "./_components/DashbordCard.tsx/DashboardCard";
import DashboardSection from "./_components/DashboardSection/DashboardSection";
import { Progress } from "@/components/ui/progress";
import { SlCalender } from "react-icons/sl";

import {
  useGetDasboardOverviewQuery,
  useGetPlatformPerformanceQuery,
  useGetTopCategoryServiceQuery,
} from "@/redux/features/admin/dashboardApi";
// import { BsPersonCheckFill } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
// import { CiCircleCheck } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { LuUserRoundCheck } from "react-icons/lu";
import { useEffect } from "react";

const StatesChart = () => {
  const { data: platformData, isLoading: platformLoading, refetch: one } = useGetPlatformPerformanceQuery();
  const { data: topCategoryData, isLoading: topCatLoading , refetch: two} = useGetTopCategoryServiceQuery();
  const {data: overviews , refetch: three} = useGetDasboardOverviewQuery()
  const overview = overviews?.data ;
useEffect(()=>{
  one() 
  two()
  three()
},[])
  const performance = platformData?.data || {
    aplicationRate: "0%",
    shortListRate: "0%",
    satisfiedCustomer: "0%",
  };

  const topCategories = topCategoryData?.data || [];

  return (
    <div className="">
      {/* Filters */}
      {/* <div className="flex justify-between items-center mb-6 flex-wrap bg-white py-3 mt-5 px-5 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 text-sm">Filters:</span>
          <select className="bg-white border border-gray-300 rounded-lg p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div> */}

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center gap-2">
    <span className="text-xl text-gray-700"><SlCalender /></span>
    <h3 className="text-gray-500 text-sm font-medium">{}Total Revenue</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">${overview?.totalRevenue}</p>
  </div>
   <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center gap-2">
    <span className="text-xl text-gray-700"><LuUserRoundCheck className="text-blue-500" /> </span>
    <h3 className="text-gray-500 text-sm font-medium">{}Verified Providers</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{overview?.totlaVerifiedTradesman}</p>
  </div>
   <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center gap-2">
    <span className="text-xl text-gray-700"><IoIosStarOutline className="text-primary"/></span>
    <h3 className="text-gray-500 text-sm font-medium">{}Customer Rating</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{overview?.avg_ratting?.toFixed(2) || 0}/5</p>
  </div>
   <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-1 min-w-[200px] flex flex-col items-center gap-2">
    <span className="text-xl text-gray-700"><FiCheckCircle className="text-green-500" /></span>
    <h3 className="text-gray-500 text-sm font-medium">{}Job Completion</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{overview?.jobCompilationRatePercentage}</p>
  </div>
      </div>
    
      {/* Performance & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <DashboardSection title="Platform Performance">
          {platformLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Application Rate</span>
                  <span className="text-sm font-medium text-gray-500">{performance.aplicationRate}</span>
                </div>
                <Progress
                  value={parseFloat(performance.aplicationRate)}
                  className="h-2"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Shortlist Rate</span>
                  <span className="text-sm font-medium text-gray-500">{performance.shortListRate}</span>
                </div>
                <Progress
                  value={parseFloat(performance.shortListRate)}
                  className="h-2"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Satisfied Customers</span>
                  <span className="text-sm font-medium text-gray-500">{performance.satisfiedCustomer}</span>
                </div>
                <Progress
                  value={parseFloat(performance.satisfiedCustomer)}
                  className="h-2"
                />
              </div>
            </>
          )}
        </DashboardSection>

        <DashboardSection title="Top Service Categories">
          {topCatLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : (
            topCategories.map((item, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {item.catgoreName}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {item.jobPercentage}%
                  </span>
                </div>
                <Progress value={item.jobPercentage} className="h-2" />
              </div>
            ))
          )}
        </DashboardSection>

      
      </div>

      {/* Recent Activity & Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <DashboardSection title="Recent Activity">
          {recentActivity.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-3 py-2 border-b last:border-b-0"
            >
              <span className="flex-shrink-0 text-gray-600">
                {activity?.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {activity?.text}
                </p>
                <p className="text-xs text-gray-400">{activity?.time}</p>
              </div>
            </div>
          ))}
        </DashboardSection> */}

          <DashboardSection title="System Status">
          {systemStatus.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <span className="text-sm text-gray-500">{item.label}</span>
              <span className="text-sm font-medium text-gray-700">
                {item.value}
              </span>
            </div>
          ))}
        </DashboardSection>
      </div>
    </div>
  );
};

export default StatesChart;
