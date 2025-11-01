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
    <div className="bg-[#0D1B2A] text-white py-10 md:py-16 lg:py-20 xl:py-[8%]">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-2/3 space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] font-semibold leading-snug md:leading-relaxed">
              Hire trusted <span className="text-[#FF7346]">Tradespeople</span>
              <br className="hidden md:block" />
              Get Quality Service every time.
            </h1>

            <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
              Dozaar connects you with verified professionals near you. Post your project, compare quotes, 
              and pay securely through escrow — your money is protected until the job is complete.
            </p>

            {/* SEARCH FORM */}
            <form onSubmit={handleSearch} className="space-y-3 w-full">
              <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0">
                <div className="flex-1 flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden max-w-2xl">
                  
                  {/* SERVICE INPUT */}
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="flex-1 px-5 sm:px-6 py-3 sm:py-4 text-gray-700 placeholder-gray-400 focus:outline-none bg-white w-full"
                  />

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-8 bg-gray-300" />

                  {/* LOCATION INPUT */}
                  <div className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-white w-full sm:w-auto">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                    />
                  </div>

                  {/* SEARCH BUTTON */}
                  <button
                    type="submit"
                    className="bg-orange-500  cursor-pointer hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto flex items-center justify-center transition-colors"
                  >
                    <Search className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </form>

            {/* ICONS */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2">
                <MdLock className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm md:text-base">Safe Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm md:text-base">Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <BiDollar className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm md:text-base">Affordable Rates</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
              <Link
                to="/post-a-job"
                className="bg-primary hover:bg-orange-500 text-white py-2.5 px-6 rounded-md text-center w-full sm:w-auto"
              >
                Post a Job
              </Link>
              <Link to="/trade-signup" className="w-full sm:w-auto">
                <button className="bg-transparent text-white py-2.5 px-6 rounded-md border w-full sm:w-auto cursor-pointer">
                  Join as Tradeperson
                </button>
              </Link>
            </div>

            {/* TRUSTED USERS */}
            <div className="flex items-center gap-5 pt-4 flex-wrap">
              <div className="flex -space-x-4 sm:-space-x-5">
                {[userimg, userimg2, userimg3].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-primary text-sm sm:text-base">
                  Trusted Users
                </p>
                <p className="text-xs sm:text-sm">
                  Over{" "}
                  <span className="font-semibold text-primary">24.5k</span> happy users all over the world
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
