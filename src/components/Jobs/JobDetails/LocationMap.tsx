
import { CiLocationOn } from "react-icons/ci";

const LocationMap = ({ cusInfo }: { cusInfo: any }) => {
  return (
    <div>
      {" "}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Map Section */}
        <div className="relative h-56">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            className="rounded-t-2xl"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              cusInfo?.location || "Dhaka, Bangladesh"
            )}&output=embed`}
          ></iframe>

          {/* Overlay Gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-t-2xl"></div>
        </div>

        {/* Info Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CiLocationOn className="text-gray-500" size={18} />
            <span className="text-lg font-medium text-gray-700">
              Location: {cusInfo?.location || "Unknown"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You can view this customer’s real-time location on Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
