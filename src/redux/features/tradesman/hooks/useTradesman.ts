import { useState } from "react";
import { useGetAllTradesmansQuery } from "../tradesmanApi";

export const useTradesman = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetAllTradesmansQuery({
    page,
    limit: 10,
  });

  console.log(data);
  // Normalize data
  const tradesmen = Array.isArray(data?.data?.data) ? data.data.data : [];
  const totalPages = data?.data?.metadata?.totalPages ?? 1;
  const total = data?.data?.metadata?.totalItem ?? 0;
  const currentPage = data?.data?.metadata?.currentPage ?? page;

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
