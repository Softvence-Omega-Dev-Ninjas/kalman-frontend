
import reviewBgImg from "../../../assets/sample_images/reviewBgImg.png"
import ReviewCard from "../../reuseable/ReviewCard";
import TrustpilotBadge from "../../reuseable/TrustPlot";


const CustomerTestimonials = () => {
  const reviews = [
    {
      category: "Home Repairs",
      review: "Posted about a broken door hinge, and a carpenter reached out within 15 minutes. He showed up the next day and fixed it in under an hour. S...",
      author: "Rachel M."
    },
    {
      category: "Design & Creative", 
      review: "Needed a quick flyer design for my cafe. The designer nailed the vibe on the first draft and even gave me two extra versions. Totally worth it.",
      author: "Carlos D."
    },
    {
      category: "Moving & Delivery",
      review: "Booked two movers to shift my studio apartment. They came on time, wrapped up my stuff properly, and finished earlier than expected.",
      author: "Racmond M."
    }
  ];

  return (
    <div 
      className="relative min-h-[600px] bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${reviewBgImg}')`,
        backgroundPosition: 'left top'
      }}
    >
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Customers Are Saying
            </h2>
            <TrustpilotBadge />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Side Content */}
            <div className="lg:col-span-1 text-white bg-[#0D1B2A] p-5 rounded-lg">
              <h3 className="text-xl font-bold mb-4">
                Millions of genuine reviews
              </h3>
              <p className="text-gray-200 mb-8 leading-relaxed">
                Reviews on Staybar are written by customers like you
              </p>
              
              <button className="bg-primary w-full text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Post your Job
              </button>
            </div>

            {/* Review Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  category={review.category}
                  review={review.review}
                  author={review.author}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;