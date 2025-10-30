import React, { useEffect } from "react";
import { useHomePageDataQuery } from "@/redux/features/admin/homeDataApi";

type Props = {
  bg?: string;
  accent?: string;
};

const TradeCount: React.FC<Props> = ({
  bg = "#FDE6E0",
  accent = "#FF7346",
}) => {
  const { data, refetch, isLoading } = useHomePageDataQuery();

  // Refetch on mount (optional)
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <section
        style={{ backgroundColor: bg }}
        className="py-6 text-center text-gray-500"
      >
        Loading stats...
      </section>
    );
  }

  // Prepare dynamic stats if data exists
  const stats = data?.data
    ? [
        { value: data.data.totalTradesMan?.toString() || "0", label: "Tradespeople" },
        { value: data.data.totalUser?.toString() || "0", label: "Users" },
        { value: data.data.totalJobs?.toString() || "0", label: "Jobs Posted" },
        { value: data.data.totalReview?.toString() || "0", label: "Reviews" },
      ]
    : [
        { value: "123456", label: "Tradespeople" },
        { value: "50+", label: "Users" },
        { value: "123456", label: "Jobs Posted" },
      ];

  return (
    <section style={{ backgroundColor: bg }} className="py-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center  gap-4 md:gap-6 min-w-[120px] "
            >
              {/* Left Accent Bar */}
              <div
                style={{ width: 4, height: 86, backgroundColor: accent }}
                className="hidden md:block rounded"
              />

              {/* Text */}
              <div className=" ">
                <div
                  className="text-2xl md:text-4xl font-bold"
                  style={{ color: accent }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradeCount;
