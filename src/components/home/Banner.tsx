import { BiDollar } from "react-icons/bi";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { MdLock, MdVerified } from "react-icons/md";
import userimg from "../../assets/Ellipse 2.png"
import userimg2 from "../../assets/Ellipse 3.png"
import userimg3 from "../../assets/Ellipse 4.png"
import bannerImg from "../../assets/Rectangle 7230.png"
import { Link } from "react-router-dom";
const Banner = () => {
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
              Dozaar connects you with verified professionals near you. Post
              your project, compare quotes, and pay securely through escrow your
              money is protected until the job is complete.
            </p>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-0">
                <div className="flex-1 bg-white text-black rounded-md flex flex-col sm:flex-row items-stretch sm:items-center">
                  <input
                    placeholder="What service do you need?"
                    className="text-sm w-full sm:max-w-md p-3 border-b sm:border-b-0 sm:border-r border-gray-200 focus:outline-none"
                    type="text"
                  />
                  <div className="flex items-center gap-2 px-3 py-2">
                    <IoLocationOutline />
                    <input
                      placeholder="Zip Code"
                      className="text-sm w-28 p-2 focus:outline-none"
                      type="text"
                    />
                  </div>
                </div>
                <button className="py-4 px-5 rounded-md bg-primary flex items-center justify-center sm:rounded-r-md">
                  <IoSearch className="text-xl text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 md:gap-10 max-w-max">
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
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/post-a-job" className="bg-primary text-white py-2 px-5 rounded-md inline-block w-full sm:w-auto text-center">
                Post a Job
              </Link>
              <button className="bg-transparent text-white py-2 px-5 rounded-md border w-full sm:w-auto">Join as Tradeperson</button>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-5">
                <img className="w-12 h-12 rounded-full border-2 border-white" src={userimg} alt="" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={userimg2} alt="" />
                <img className="w-12 h-12 rounded-full border-2 border-white" src={userimg3} alt="" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-primary">Trusted User</p>
                <p className="text-sm">Over <span className="font-semibold text-primary">24.5k</span> happy all over the world</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <img src={bannerImg} alt="Banner" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
