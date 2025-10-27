import BlogCard from "@/components/reuseable/BlogCard";
interface AllBlogsProps {
  blog: any[];
  isLoading: boolean;
}

const AllBlog: React.FC<AllBlogsProps> = ({ blog }) => {
  return (
    <section className="bg-[#F2F4F8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blog?.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              images={post?.imeges}
              title={post?.title}
              description={post?.description}
              author={post?.userId}
              createdAt={post?.createdAt}
            />
          ))}
        </div>

        {/* Button */}
        {blog.length > 0 && (
          <div className="flex justify-center mt-10">
            <button className="bg-[#FF6B35] text-white px-18 py-3 rounded-md font-medium hover:bg-[#e65a29] transition">
              See all
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlog;
