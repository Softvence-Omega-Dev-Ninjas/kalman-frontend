

import StatesSection from "./StatesSection/StatesSection";
import StatesChart from "./StatesChart.tsx/StatesChart";
import { useGetDasboardOverviewQuery } from "@/redux/features/admin/dashboardApi";
import { useEffect } from "react";

export interface DashboardOverviewResponse {
  totalUser: number;
  totalCompletedJobs: number;
  userGrowth: string;
  jobGrowth: string;
  montlyRevenue: number | null;
  revenueGrowth: string;
  totalRevenue: number | null;
  totlaVerifiedTradesman: number;
  jobCompilationRatePercentage: string;
  avg_ratting: number | null;
}

export interface DashboardApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: DashboardOverviewResponse;
}


const OverviewPage = () => {

      useEffect(()=>{
              document.title = `Overview | Admin Dashboard | Stavbar`
            }, [])
  //  Type hint added for full response
  const { data , isError , refetch, error} = useGetDasboardOverviewQuery();
  console.log("data" , data , "error" , error)
useEffect(()=>{
refetch()
}, [])
  // if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Failed to load dashboard data.</p>;

  //  data?.data is the nested object containing the actual overview
  const overview = data?.data ;
  console.log(data)

  return (
    <div>
      <StatesSection overview={overview} />
      {/* comming soon */}
      <StatesChart
      //  overview={overview} 
       />
    </div>
  );
};

export default OverviewPage;
