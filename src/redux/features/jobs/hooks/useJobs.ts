// src/redux/features/jobs/hooks/useJobs.ts
import { useState } from "react";
import { useGetJobsQuery } from "../jobsApi";

export const useJobs = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetJobsQuery({ page, limit: 9 });

  const jobs = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const totalPages =
    data?.meta?.totalPages ||
    data?.pagination?.totalPages ||
    Math.ceil((data?.total || 0) / 9) ||
    1;

  return {
    jobs,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
  };
};
