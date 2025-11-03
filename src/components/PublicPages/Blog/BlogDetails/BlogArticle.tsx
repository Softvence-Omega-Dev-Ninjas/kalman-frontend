interface BlogArticleProps {
  blog: any;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-secondary leading-relaxed mb-6">
        {blog.description}
      </p>

      {blog.imeges?.slice(1).map((img: string, idx: number) => (
        <div key={idx} className="w-full mt-4 mb-6">
          <img
            src={img}
            alt={`Blog image ${idx + 1}`}
            className="w-full h-auto object-cover max-h-[404px] rounded-2xl"
          />
        </div>
      ))}

      <p className="text-sm text-gray-700 leading-relaxed mb-6">
        <span className="text-md font-semibold">Published at:</span> {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BlogArticle;
