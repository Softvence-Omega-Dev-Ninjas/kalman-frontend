
import type { DashboardApiResponse } from "@/admin-dashboard/overview/OverviewPage";
import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getDasboardOverview: builder.query<DashboardApiResponse, void>({
            query: () =>  "/admin/dasboard", 
            providesTags: ["Dasboard"],   
        })
  })
});

export const {useGetDasboardOverviewQuery} = dashboardApi 