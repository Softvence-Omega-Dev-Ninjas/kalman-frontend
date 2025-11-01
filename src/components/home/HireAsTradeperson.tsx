import React from "react";
import circleImg1 from "../../assets/sample_images/undraw_confirmed_c5lo 1.png";
import circleImg2 from "../../assets/sample_images/Group 1422567285.png";
import circleImg3 from "../../assets/sample_images/Frame 2147225506.png";
import { Link } from "react-router-dom";

const HireAsTradeperson: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white px-4 sm:px-6">
      <div className="max-w-[1580px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
          How to hire the right tradesperson
        </h2>
        <p className="text-center text-lg sm:text-xl md:text-2xl text-[#595959] mt-3 mb-10">
          Connect with skilled tradespeople in three easy steps.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-24">
          {[
            {
              img: circleImg1,
              step: "STEP 1",
              title: "Post your job for free",
            },
            {
              img: circleImg3,
              step: "STEP 2",
              title: "Choose a Tradespeople",
            },
            {
              img: circleImg2,
              step: "STEP 3",
              title: "Get It Done",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center max-w-[180px] sm:max-w-xs">
              <img
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full"
                src={item.img}
                alt={item.title}
              />
              <div className="text-[10px] sm:text-[11px] tracking-wider text-[#FF7346] font-semibold my-3">
                {item.step}
              </div>
              <div className="text-base sm:text-lg font-semibold">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/post-a-job"
            className="bg-primary cursor-pointer hover:bg-orange-600 text-white px-6 py-3 rounded-md shadow-md text-sm sm:text-base"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HireAsTradeperson;
