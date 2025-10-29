import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import RecentPostItem from "./RecentPostItem";

const RecentPostsList = () => {
  const { data: post } = useGetAllBlogsQuery(undefined);
  return (
    <div className="p-4">
      <div className="flex items-center my-3">
        <div className="flex-grow border-t border-gray-950"></div>
        <h2 className="mx-4 text-center text-xl font-bold text-gray-950">
          Recent Posts
        </h2>
        <div className="flex-grow border-t border-gray-950"></div>
      </div>

      <div className="flex flex-col">
        {post?.data?.slice(0, 3)?.map((pt: any) => (
          <RecentPostItem
            key={pt.id}
            id={pt.id}
            title={pt.title}
            date={pt.createdAt}
            imageUrl={pt.imeges?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentPostsList;
