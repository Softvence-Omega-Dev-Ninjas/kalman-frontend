import BlogGrid from "../components/PublicPages/Blog/BlogGrid"
import PageHeader from "../components/reuseable/PageHeader"


function Blog() {
  return (
    <div>
      <PageHeader
        title="Blog"
        breadcrumbs={[
          { label: "Home", href: "/blog" },
          { label: "Blog" },
        ]}
      />
      <BlogGrid/>
    </div>
  )
}

export default Blog