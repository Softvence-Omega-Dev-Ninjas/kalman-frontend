import { useState } from "react";
import { useGetJobsQuery } from "../jobsApi";

export const useJobs = () => {
  const [page, setPage] = useState(1);

  // Fetch paginated jobs
  const { data, isLoading, isError } = useGetJobsQuery({ page, limit: 10 });
  console.log("API Data ---->", data);

  const jobs = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const totalPages = data?.data?.meta?.totalPages ?? 1;
  const total = data?.data?.meta?.total ?? 0;
  const currentPage = data?.data?.meta?.currentPage ?? page;

  return {
    jobs,
    isLoading,
    isError,
    page: currentPage,
    setPage,
    totalPages,
    total,
  };
};

