import { IoMdOptions } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import SideFilterForService from "../components/ServiceComponents/SideFilterForService";
import AllServices from "../components/ServiceComponents/AllServices";
import { useTradesman } from "@/redux/features/tradesman/hooks/useTradesman";
import { useMemo, useState } from "react";

function Services() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subCategory: "",
    location: "",
    rating: "",
  });
  const [sortOption, setSortOption] = useState("relevance");
  const { tradesmen, page, isLoading, setPage, totalPages, total } =
    useTradesman(filters);

  const sortedTradesmen = useMemo(() => {
    if (!Array.isArray(tradesmen)) return [];

    const sorted = [...tradesmen];

    switch (sortOption) {
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      case "rate-asc":
        sorted.sort(
          (a, b) =>
            Number(a.businessDetail.hourlyRate || 0) -
            Number(b.businessDetail.hourlyRate || 0)
        );
        break;

      case "rate-desc":
        sorted.sort(
          (a, b) =>
            Number(b.businessDetail.hourlyRate || 0) -
            Number(a.businessDetail.hourlyRate || 0)
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [tradesmen, sortOption]);

  console.log("tradesmen", tradesmen);

  return (
    <div>
      <div className="bg-[#0D1B2A] py-20 flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-semibold text-white">Our Services</h1>
        <div className="flex items-center gap-3 font-semibold">
          <p className="text-white"> Home</p>
          <MdDoubleArrow className="text-xl text-primary" />
          <p className="text-primary inline-block">Services</p>
        </div>
      </div>
      <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5">
        <div className="flex items-start gap-5 mt-6">
          <div className="w-1/4 hidden lg:block">
            <div className="flex items-center gap-3 mb-5 text-2xl">
              <IoMdOptions />
              <span className=" font-semibold">Filter By</span>
            </div>
            <SideFilterForService onFilterChange={setFilters} />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-lg text-primary-txt font-semibold">
                Available Tradespeople ({total})
              </h1>
              <select
                className="border border-secondary rounded-md px-3 py-2 focus:outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Sort by: Most Relevant</option>
                <option value="date">Sort by: Date</option>
                <option value="rate-asc">Sort by: Low Price</option>
                <option value="rate-desc">Sort by: High Price</option>
              </select>
            </div>
            <AllServices
              tradesman={sortedTradesmen}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
