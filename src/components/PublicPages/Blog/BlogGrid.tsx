
import blog1 from '../../../assets/blog/blog-1.png'
import blog2 from '../../../assets/blog/blog-2.png'
import blog3 from '../../../assets/blog/blog-3.png'
const posts = [
  {
    id: 1,
    title: "Essential Tools Every Homeowner Should Have",
    desc: "Want a spotless home without the stress? Our team offers regular and deep cleaning services. Keep your space fresh and organized effortlessly. L...",
    author: "Courtney Henry",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog1,
    avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
  {
    id: 2,
    title: "How to Estimate Costs Before Starting a Project",
    desc: "Explore our latest blog posts to stay informed and make smarter decisions for your projects. From home repairs to business services, our experts share tips,...",
    author: "Jerome Bell",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog2,
        avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
  {
    id: 3,
    title: "Tips for Maintaining Your Property Year-Round",
    desc: "Leaky taps or faulty wiring? We’ve got you covered. Expert plumbers and electricians fix and install quickly. Reliable service for smooth-running homes...",
    author: "Leslie Alexander",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog3,
        avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
  {
    id: 4,
    title: "How to Estimate Costs Before Starting a Project",
    desc: "Explore our latest blog posts to stay informed and make smarter decisions for your projects. From home repairs to business services, our experts share tips,...",
    author: "Jerome Bell",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog2,
        avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
  {
    id: 5,
    title: "Tips for Maintaining Your Property Year-Round",
    desc: "Leaky taps or faulty wiring? We’ve got you covered. Expert plumbers and electricians fix and install quickly. Reliable service for smooth-running homes...",
    author: "Leslie Alexander",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog3,
        avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
  {
    id: 6,
    title: "Essential Tools Every Homeowner Should Have",
    desc: "Want a spotless home without the stress? Our team offers regular and deep cleaning services. Keep your space fresh and organized effortlessly. L...",
    author: "Courtney Henry",
    date: "11 Jan 2022",
    read: "5 min read",
    image:blog1,
        avatar:'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
  },
];

const BlogGrid = () => {
  return (
    <section className="bg-[#F2F4F8] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden p-3"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.desc}</p>
                <hr  className='text-gray-200 mb-3'/>

                {/* Author info */}
                <div className="flex items-center gap-3 text-sm">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-gray-500 text-xs">
                      {post.date} • {post.read}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-[#FF6B35] text-white px-18 py-3 rounded-md font-medium hover:bg-[#e65a29] transition">
            See all
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
