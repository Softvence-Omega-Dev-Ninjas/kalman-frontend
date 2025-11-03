import ServiceCard from "../reuseable/ServiceCard";

const OurPopularServices = () => {
  const services = [
    {
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      title: "Gardening & Landscaping",
      description: "Want a spotless home without the stress? Our team offers regular and deep cleaning services. Keep your space fresh and organized effortlessly. Learn more",
      location: "in the UK",
      rating: "5.0"
    },
    {
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
      title: "Gardening & Landscaping", 
      description: "Want a spotless home without the stress? Our team offers regular and deep cleaning services. Keep your space fresh and organized effortlessly. Learn more",
      location: "in the UK",
      rating: "5.0"
    },
    {
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      title: "Plumbing & Electrical",
      description: "Leaky taps or faulty wiring? We've got you covered. Expert plumbers and electricians fix and install quickly. Reliable service for smooth-running homes...",
      location: "in the UK", 
      rating: "5.0"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6">
            Our Popular Services
          </h2>
          <p className="text-2xl text-[#595959] max-w-2xl mx-auto leading-relaxed">
            From home repairs to business solutions, our experts deliver reliable, quality 
            service for every project, big or small
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              title={service.title}
              description={service.description}
              location={service.location}
              rating={service.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPopularServices;