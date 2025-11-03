import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import PageHeader from "../components/reuseable/PageHeader";
import AllBlog from "@/components/PublicPages/Blog/AllBlog";
import { useEffect } from "react";

function Blog() {
      useEffect(()=>{
        document.title = `Blogs | ${import.meta.env.VITE_APP_NAME}`
      }, [])
    

  const { data, isLoading , refetch} = useGetAllBlogsQuery(undefined);

  useEffect(()=>{
    refetch()
  }, [])

  return (
    <div>
      <PageHeader
        title="Blog"
        breadcrumbs={[{ label: "Home", href: "/blog" }, { label: "Blog" }]}
      />
      <AllBlog isLoading={isLoading} blog={data?.data} />
    </div>
  );
}

export default Blog;
