import React from "react";

interface BlogData {
  imeges: (string | File)[];
  title: string;
  description: string;
}

interface ViewBlogProps {
  data: BlogData | null;
}

const ViewBlog: React.FC<ViewBlogProps> = ({ data }) => {
  return (
    <div className="w-full mx-auto mt-10">
      <div className="flex flex-wrap -m-2">
        {data?.imeges.map((img, index) => (
          <div key={index} className="p-2 w-1/4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-48">
              <img
                src={img instanceof File ? URL.createObjectURL(img) : img}
                alt={`${data?.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl mt-5 font-bold mb-4 text-gray-900">
        {data?.title}
      </h1>
      <p className="text-gray-700 mb-6">{data?.description}</p>
    </div>
  );
};

export default ViewBlog;
