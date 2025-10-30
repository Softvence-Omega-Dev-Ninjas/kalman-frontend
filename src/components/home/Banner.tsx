import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { MdLock, MdVerified } from "react-icons/md";
import userimg from "../../assets/Ellipse 2.png";
import userimg2 from "../../assets/Ellipse 3.png";
import userimg3 from "../../assets/Ellipse 4.png";
import bannerImg from "../../assets/Rectangle 7230.png";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search } from "lucide-react";

const Banner = () => {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service.trim() && !location.trim()) return;

    const queryParams = new URLSearchParams();
    if (service.trim()) queryParams.append("search", service.trim());
    if (location.trim()) queryParams.append("location", location.trim());

    navigate(`/services?${queryParams.toString()}`);
  };

  return (
    <div className="bg-[#0D1B2A] text-white py-12 md:py-[5%] min-h-[60vh] md:min-h-[95vh]">
      <div className="max-w-[1580px] mx-auto px-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10">
          <div className="w-full md:w-2/3 px-4 md:px-[5%] space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-relaxed">
              Hire trusted <span className="text-[#FF7346]">Tradespeople</span>
              <br />
              Get Quality Service every time.
            </h1>
            <p>
              Dozaar connects you with verified professionals near you. Post your project, compare quotes, 
              and pay securely through escrow — your money is protected until the job is complete.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-0">
                <div className="flex-1 flex items-center gap-0 bg-white rounded-lg shadow-md overflow-hidden max-w-2xl">
                  
                  {/* Service Input */}
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                  />

                  {/* Divider */}
                  <div className="w-px h-8 bg-gray-300" />

                  {/* Location Input */}
                  <div className="flex items-center gap-2 px-6 py-4 bg-white">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-28 text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 flex items-center justify-center transition-colors"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center justify-between gap-4 md:gap-10 max-w-max pt-3">
              <div className="flex items-center gap-2">
                <MdLock className="text-primary" />
                <span className="text-xs md:text-base">Safe Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-primary" />
                <span className="text-xs md:text-base">Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <BiDollar className="text-primary" />
                <span className="text-xs md:text-base">Affordable Rates</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/post-a-job"
                className="bg-primary text-white py-2 px-5 rounded-md inline-block w-full sm:w-auto text-center"
              >
                Post a Job
              </Link>
              <Link to="/trade-signup">
                <button className="bg-transparent cursor-pointer text-white py-2 px-5 rounded-md border w-full sm:w-auto">
                  Join as Tradeperson
                </button>
              </Link>
            </div>

            {/* Trusted Users */}
            <div className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-5">
                {[userimg, userimg2, userimg3].map((img, i) => (
                  <img key={i} src={img} alt="" className="w-12 h-12 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-primary">Trusted Users</p>
                <p className="text-sm">
                  Over <span className="font-semibold text-primary">24.5k</span> happy users all over the world
                </p>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
