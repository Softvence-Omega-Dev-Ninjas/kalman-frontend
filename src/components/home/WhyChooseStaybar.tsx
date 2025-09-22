import { Shield, Users, Clock, Award } from 'lucide-react';
import FeatureItem from '../reuseable/FeatureItem';

const WhyChooseStaybar = () => {
  const features = [
    {
      icon: Users,
      title: "Trusted by",
      subtitle: "Thousands",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      subtitle: "Specially",
      iconBg: "bg-blue-100", 
      iconColor: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Fast, Simple",
      subtitle: "and Secure",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Award,
      title: "Experts",
      subtitle: "Tradesperson",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
              alt="Professional handshake between tradesperson and customer"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Staybar
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
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
                  iconBg={feature.iconBg}
                  iconColor={feature.iconColor}
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