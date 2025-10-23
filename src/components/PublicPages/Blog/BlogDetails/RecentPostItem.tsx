import React from "react";

interface PostProps {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
}

const RecentPostItem: React.FC<PostProps> = ({ id, title, date, imageUrl }) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-300 last:border-b-0">
      <img
        src={imageUrl}
        alt={title}
        className="w-20 h-20 object-cover shrink-0 rounded-md"
      />
      <div className="flex flex-col gap-y-1">
        <p className="text-xs text-blue-500 mt-0.5">Category</p>
        <a
          href={`/blog/${id}`}
          className="flex flex-col text-sm font-sans text-gray-700 hover:text-primary leading-snug transition-colors"
        >
          <span className="font-medium">
            {title.length > 50 ? title.slice(0, 50) + "…" : title}
          </span>
        </a>

        <div className="flex items-center text-gray-500 text-xs space-x-2">
          <span>{date?.split("T")[0]}</span>
          <span className="mx-1">|</span>
          <span>{date?.split("T")[1]?.split(".")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentPostItem;
