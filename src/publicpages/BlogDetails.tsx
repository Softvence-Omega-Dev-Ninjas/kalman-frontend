import BlogInfo from "@/components/PublicPages/Blog/BlogDetails/BlogInfo";
import PageHeader from "../components/reuseable/PageHeader";
import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";

function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleBlogQuery(id);
  return (
    <div>
      <PageHeader
        title="BlogDetails"
        breadcrumbs={[
          { label: "Home", href: "/blog/:id" },
          { label: "Blog" },
          { label: "Details" },
        ]}
      />
      <BlogInfo
        images={data?.data?.imeges}
        isLoading={isLoading}
        blog={data?.data}
      />
    </div>
  );
}

export default BlogDetails;
