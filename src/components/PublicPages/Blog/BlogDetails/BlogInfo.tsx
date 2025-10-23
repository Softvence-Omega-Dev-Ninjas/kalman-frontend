import type React from "react";
import BlogArticle from "./BlogArticle";
import RecentPostsList from "./RecentPostList";

interface BlogProps {
  blog: any[];
  images: any[];
  isLoading: boolean;
}

const BlogInfo: React.FC<BlogProps> = ({ images }) => {
  return (
    <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-6">
      <img
        src={images?.[0]}
        alt="Person cleaning kitchen"
        className="w-full h-auto object-cover max-h-[577px] rounded-2xl"
      />
      <main className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-3/4">
          <BlogArticle />
        </div>

        <div className="lg:w-1/4">
          <RecentPostsList />
        </div>
      </main>
    </div>
  );
};

export default BlogInfo;
