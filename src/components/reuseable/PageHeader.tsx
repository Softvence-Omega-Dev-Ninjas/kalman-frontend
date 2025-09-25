import { ChevronsRight } from "lucide-react";
import React from "react";

type PageHeaderProps = {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-[#0D1B2A] w-full text-center 
  py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h1>

      {/* Breadcrumb */}
      <div className="flex justify-center items-center space-x-2 text-sm sm:text-base">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {crumb.href ? (
              <a
                href={crumb.href}
                className="text-gray-200 hover:text-orange-500 transition-colors"
              >
                {crumb.label}
              </a>
            ) : (
              <span
                className={`${
                  index === breadcrumbs.length - 1
                    ? "text-orange-500 font-semibold"
                    : "text-gray-200"
                }`}
              >
                {crumb.label}
              </span>
            )}

            {index < breadcrumbs.length - 1 && (
              <span className="text-orange-500 font-bold"><ChevronsRight /></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
