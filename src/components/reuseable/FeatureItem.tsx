interface FeatureItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
}


const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, subtitle, iconBg, iconColor }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <div className="font-semibold text-gray-900 text-sm leading-tight">
          {title}
        </div>
        <div className="text-gray-600 text-sm leading-tight">
          {subtitle}
        </div>
      </div>
    </div>
  );
};
export default FeatureItem;