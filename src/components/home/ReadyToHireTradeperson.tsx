import React from "react";
import { Link } from "react-router-dom";

const ReadyToHireTradeperson: React.FC = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "#0D1B2A" }}>
      <div className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Ready to hire a tradesperson?
        </h2>

        <div className="mt-6 text-lg md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
          <p>Find skilled tradespeople near you, ready to handle any job.</p>
          <p className="mt-3">
            From small repairs to major projects, our experts deliver quality
            you can rely on.
          </p>
          <p className="mt-3">
            Hire safely, efficiently, and get the work done right.
          </p>
        </div>

        <div className="mt-8">
         <Link to={"/post-a-job"} >
          <button className="bg-primary cursor-pointer hover:bg-orange-600 text-white px-5 py-2.5 rounded-md shadow-sm cursor-pointer">
            Post your job
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyToHireTradeperson;
