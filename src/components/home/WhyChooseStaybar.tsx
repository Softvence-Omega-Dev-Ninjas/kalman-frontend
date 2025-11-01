import trustedImg from "../../assets/sample_images/Frame.png";
import clockImg from "../../assets/sample_images/Frame (1).png";
import shieldImg from "../../assets/sample_images/Group.png";
import awardImg from "../../assets/sample_images/Group (1).png";
import FeatureItem from "../reuseable/FeatureItem";
import stayBarImg from "../../assets/sample_images/whychoosestavbar.png";

const WhyChooseStaybar = () => {
  const features = [
    { icon: trustedImg, title: "Trusted by", subtitle: "Thousands" },
    { icon: clockImg, title: "24/7 Support", subtitle: "Specially" },
    { icon: shieldImg, title: "Fast, Simple", subtitle: "and Secure" },
    { icon: awardImg, title: "Experts", subtitle: "Tradesperson" },
  ];

  return (
    <div className="bg-[#FCF3F3] py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image Section */}
          <div className="relative order-1 lg:order-none">
            <img
              src={stayBarImg}
              alt="Professional handshake between tradesperson and customer"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-primary">{import.meta.env.VITE_APP_NAME} </span> 
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Connecting you with trusted tradespeople for every project.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseStaybar;
