/* eslint-disable @typescript-eslint/no-explicit-any */
interface FeatureItemProps {
  icon: any;
  title: string;
  subtitle: string;
}


const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex bg-white rounded-lg p-4 items-center space-x-3">
      <div className={` h-10  flex items-center justify-center flex-shrink-0`}>
        <img src={icon} alt={title} className={`h-10`} />
      </div>
      <div>
        <div className="font-semibold text-gray-900 text-sm leading-tight">
          {title}
        </div>
        <div className="font-semibold text-gray-900 text-sm leading-tight">
          {subtitle}
        </div>
      </div>
    </div>
  );
};
export default FeatureItem;