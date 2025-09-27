import blog1 from "@/assets/dashboard/blog/blog1.png"
import blog2 from "@/assets/dashboard/blog/blog2.png"
import blog3 from "@/assets/dashboard/blog/blog3.png"
import blog4 from "@/assets/dashboard/blog/blog4.png"
import blog5 from "@/assets/dashboard/blog/blog5.png"
import blog6 from "@/assets/dashboard/blog/blog6.png"
import blog7 from "@/assets/dashboard/blog/blog7.png"
import blog8 from "@/assets/dashboard/blog/blog8.png"

export type TBlog={
    id: number;
    image: string;
    title: string;
    description: string;
    author: string;
    date: string;
}

export const blogData = [
  {
    id: 1,
    image: blog1,
    title: 'How to Choose the Right Service Provider for Your Business',
    description: 'Picking the perfect partner can transform your projects outcome. Learn the key factors that make c...',
    author: 'Floyd Miles',
    date: '4/4/18',
  },
  {
    id: 2,
    image: blog2,
    title: '5 Common Mistakes Businesses Make When Hiring Experts',
    description: 'Hiring the wrong fit can be costly. Discover the top mistakes companies make and how to avoid them fo...',
    author: 'Floyd Miles',
    date: '4/4/18',
  },
  {
    id: 3,
    image: blog3,
    title: 'How Our Clients Achieve Success: Real Stories',
    description: "If you've ever postponed a home project because you couldn't find the time or bear the thought of mak...",
    author: 'Jerome Bell',
    date: '4/4/18',
  },
  {
    id: 4,
    image: blog4,
    title: 'Quick Tips to Improve Daily Efficiency and Productivity',
    description: 'Small adjustments lead to big wins. Learn practical tips to streamline your processes and boost produc...',
    author: 'Brooklyn Simmons',
    date: '4/4/18',
  },
  {
    id: 5,
    image: blog5,
    title: 'How Businesses Transform Challenges Into Tangible Results',
    description: 'Explore proven strategies and insights that help our clients thrive in every situation...',
    author: 'Albert Flores',
    date: '4/4/18',
  },
  {
    id: 6,
    image: blog6,
    title: 'Understanding the True Value of Professional Guidance',
    description: "Expert advice isn't just a luxury—it's essential. Discover why partnering with the right professiona...",
    author: 'Jacob Jones',
    date: '4/4/18',
  },
  {
    id: 7,
    image: blog7,
    title: 'How to Build Strong, Lasting Relationships with Clients',
    description: 'Strong connections drive repeat business. Learn proven strategies to earn trust and maintain client lo...',
    author: 'Darlene Robertson',
    date: '4/4/18',
  },
  {
    id: 8,
    image: blog8,
    title: 'Top Tools Every Service Provider Should Be Using',
    description: 'The right tools can revolutionize your workflow. Explore essential platforms and software that make...',
    author: 'Eleanor Pena',
    date: '4/4/18',
  },
];