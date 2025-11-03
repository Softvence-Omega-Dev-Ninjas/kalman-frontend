import { Link } from "react-router-dom";

interface BlogCardProps {
  images: any[];
  title: string;
  description: string;
  author: any;
  createdAt: string;
  id: string;
}

const BlogCard = ({
  id,
  images,
  title,
  description,
  author,
  createdAt,
}: BlogCardProps) => {

  function calculateReadingTime(text: string): string {
  if (!text) return "0 min read";

  const wordsPerMinute = 200; 
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) {
    return "Less than 1 min read";
  }

  return `${minutes} min read`;
}

  const toPath = `/blog/${id}`;
  return (
    <Link to={toPath} className="block no-underline">
      <div
        key={id}
        className="flex flex-col h-[530px] bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden p-3"
      >
        <img
          src={`${images?.[0]}`}
          alt={title}
          className="w-full h-60 object-cover rounded-md"
        />

        <div className="flex flex-col justify-between flex-1 p-3">
          <div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-600 text-md mb-4 line-clamp-4">
              {description}
            </p>
          </div>
          <div>
            <hr className="text-gray-200 mb-3" />

            {/* Author info */}
            <div className="flex items-center gap-3 text-sm">
              <img
                src={
                 author?.profile_image || "N/A"
                }
                alt={author?.name || "N/A"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{author.name}</p>
                <p className="text-gray-500 text-xs">
                  {createdAt?.split("T")[0]} • {calculateReadingTime(description)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
