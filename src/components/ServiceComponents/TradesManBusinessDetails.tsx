interface BusinessDetail {
  businessDetail: any;
  businessName: string;
  hourlyRate: number;
  services: string[];
}

interface TradesManBusinessDetailsProps {
  data: BusinessDetail;
  setOpenContact: (open: boolean) => void;
}

const TradesManBusinessDetails: React.FC<TradesManBusinessDetailsProps> = ({
  data,
  setOpenContact,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start justify-between">
        <div className="font-medium text-sm lg:text-lg">
          {data?.businessDetail?.businessName}
        </div>

        <div className="text-black">
          <p className="text-xs lg:text-sm"> Starting At </p>
          <span className="font-semibold text-lg text-primary">
            ${data?.businessDetail?.hourlyRate}.00/hr
          </span>
        </div>
      </div>
      <div className="mt-4 text-sm lg:text-lg font-medium text-secondary">
        Skills and Services
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {data?.businessDetail?.services.map((service: any) => (
          <span
            key={service}
            className="px-3 py-2 bg-gray-100 rounded-sm text-sm lg:text-md"
          >
            {service}
          </span>
        ))}
      </div>

      <button
        onClick={() => setOpenContact(true)}
        className="w-full text-sm lg:text-lg  mt-6 bg-primary hover:bg-orange-600 text-white px-4 py-3 rounded-md"
      >
        Invite to Project
      </button>
    </div>
  );
};

export default TradesManBusinessDetails;
