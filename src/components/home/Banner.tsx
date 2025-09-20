import { BiDollar } from "react-icons/bi";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { MdLock, MdVerified } from "react-icons/md";
import userimg from "../../assets/Ellipse 2.png"
import userimg2 from "../../assets/Ellipse 3.png"
import userimg3 from "../../assets/Ellipse 4.png"
import bannerImg from "../../assets/Rectangle 7230.png"
const Banner = () => {
  return (
    <div className="bg-[#0D1B2A] text-white py-[5%] min-h-[95vh]">
      <div className="max-w-[1580px] mx-auto px-5">
        <div className="flex items-center justify-between gap-10">
          <div className="w-2/3 px-[5%] space-y-6">
            <h1 className="text-5xl font-semibold leading-relaxed">
              Hire trusted <span className="text-[#FF7346]">Tradespeople</span>{" "}
              <br />
              Get Quality Service every time.
            </h1>
            <p>
              Dozaar connects you with verified professionals near you. Post
              your project, compare quotes, and pay securely through escrow your
              money is protected until the job is complete.
            </p>
            <div className="space-y-3">
              <div className=" flex items-center max-w-min">
                <div className="bg-white text-black rounded-md flex items-center">
                  <input
                    placeholder="What service do you need?"
                    className="text-sm min-w-sm max-w-md p-3 border-r border-gray-200 focus:outline-none"
                    type="text"
                  />
                  <div className="flex items-center gap-2 pl-2">
                    <IoLocationOutline />
                    <input
                      placeholder="Zip Code"
                      className="text-sm max-w-xs p-2 focus:outline-none"
                      type="text"
                    />
                  </div>
                </div>
                <button className="py-3 px-5 rounded-r-md -ml-1 w-full h-full bg-primary">
                  <IoSearch className="text-xl text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-10 max-w-max">
                <div className="flex items-center gap-2">
                  <MdLock className="text-primary" />
                  <span>Safe Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdVerified className="text-primary" />
                  <span>Verified Providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <BiDollar className="text-primary" />
                  <span>Affordable Rates</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="bg-primary text-white py-2 px-5 rounded-md">
                Post a Job
              </button>
              <button className="bg-transparent text-white py-2 px-5 rounded-md border">
                Join as Tradeperson
              </button>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex -space-x-5">
                    <img className="w-16 h-16 rounded-full" src={userimg} alt="" />
                    <img className="w-16 h-16 rounded-full" src={userimg2} alt="" />
                    <img className="w-16 h-16 rounded-full" src={userimg3} alt="" />
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-primary">Trusted User</p>
                    <p>Over <span className="font-semibold text-primary">24.5k</span> happy all over the world</p>
                </div>
            </div>
          </div>
          <div className="w-1/3">
            <img src={bannerImg} alt="Banner" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
