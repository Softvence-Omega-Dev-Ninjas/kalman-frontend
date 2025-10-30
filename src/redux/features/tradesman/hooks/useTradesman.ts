import { useMemo, useState } from "react";
import { useGetAllTradesmansQuery } from "../tradesmanApi";

export const useTradesman = (filters = {}) => {
  const [page, setPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 10,
      ...filters, // include search, category, location, etc.
    }),
    [page, filters]
  );

  const { data, isLoading, isError } = useGetAllTradesmansQuery(queryParams);

  console.log("service", data);
  // Normalize data
  const tradesmen = Array.isArray(data?.data?.data) ? data.data.data : [];
  const totalPages = data?.data?.metadata?.totalPages ?? 1;
  const total = data?.data?.data?.length ?? 0;
  const currentPage = data?.data?.metadata?.page ?? page;

  return {
    tradesmen,
    isLoading,
    isError,
    page: currentPage,
    setPage,
    totalPages,
    total,
  };
};
