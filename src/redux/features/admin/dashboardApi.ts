// src/redux/features/admin/dashboardApi.ts
import type { DashboardApiResponse } from "@/admin-dashboard/overview/OverviewPage";
import { baseApi } from "@/redux/api/baseApi";

interface PlatformPerformanceResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    aplicationRate: string;
    shortListRate: string;
    satisfiedCustomer: string;
  };
}

interface TopCategoryServiceResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    catgoreName: string;
    jobPercentage: number;
  }[];
}

interface SystemActivityRequest {
  maximum_attempt: number;
  session_timeout: number;
  maintenance_mode: boolean;
  new_registration: boolean;
}

interface SystemActivityResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    id: string;
    maximum_attempt: number;
    session_timeout: number;
    maintenance_mode: boolean;
    new_registration: boolean;
    admin_notication: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDasboardOverview: builder.query<DashboardApiResponse, void>({
      query: () => "/admin/dasboard",
      providesTags: ["Dasboard"],
    }),

    getPlatformPerformance: builder.query<PlatformPerformanceResponse, void>({
      query: () => "/admin/platfrom-performence",
      providesTags: ["Dasboard"],
    }),

    getTopCategoryService: builder.query<TopCategoryServiceResponse, void>({
      query: () => "/admin/top-category-service",
      providesTags: ["Dasboard"],
    }),

    getSystemActivity: builder.query<SystemActivityResponse, void>({
      query: () => "/admin/system-activity",
      providesTags: ["Dasboard"],
    }),

    setSystemActivity: builder.mutation<SystemActivityResponse, SystemActivityRequest>({
      query: (body) => ({
        url: "/admin/system-activity",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Dasboard"],
    }),
  }),
});

export const {
  useGetDasboardOverviewQuery,
  useGetPlatformPerformanceQuery,
  useGetTopCategoryServiceQuery,
  useGetSystemActivityQuery,
  useSetSystemActivityMutation,
} = dashboardApi;
