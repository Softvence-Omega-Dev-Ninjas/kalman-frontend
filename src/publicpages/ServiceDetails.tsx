import { IoLocationOutline } from "react-icons/io5";
import image1 from "../assets/sample_images/image.png";
import image2 from "../assets/sample_images/image2.png";
import image3 from "../assets/sample_images/image3.png";

const ServiceDetails = () => {
  return (
    <div className="bg-[#f3f5f7] min-h-screen py-10 px-6">
      <div className="max-w-[1580px] mx-auto">
        {/* Gallery - left two-thirds */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Cleaning Service</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-lg overflow-hidden">
              <img
                src={image1}
                alt="main"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-6">
              <img
                src={image2}
                alt="thumb1"
                className="w-full h-44 object-cover rounded-lg"
              />
              <img
                src={image3}
                alt="thumb2"
                className="w-full h-44 object-cover rounded-lg ring-4 ring-[#0B8AE6]"
              />
            </div>
          </div>

          <div className="flex items-start gap-8 mt-10">
            <div className="w-2/3 pr-10">
              <div className="flex items-start gap-4 ">
                <img
                  src={image2}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-lg">Ronald Higgins</div>
                  <div className="text-sm text-secondary">Tradesperson</div>
                  <div className="text-sm text-secondary flex items-center gap-1">
                    <IoLocationOutline />
                    <span>Bratislava, Slovakia</span>
                  </div>
                  <div className="text-sm text-primary font-semibold mt-1">
                    ★ 4.8 (170 Reviews)
                  </div>
                </div>
              </div>

              <hr className="my-6 border-t border-gray-200" />

              <h3 className="text-lg font-semibold mb-2">Service Details</h3>
              <p className=" text-secondary">
                From daily maintenance to deep cleaning, our office cleaning
                services are tailored to meet your business needs. We use
                professional-grade equipment and eco-friendly products to ensure
                a clean, hygienic, and welcoming environment for your employees
                and clients.
              </p>
            </div>
            {/* Right column card */}
            <div className="w-1/3 space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-xl">
                    Carpentry & Woodwork
                  </div>

                  <div className="text-black">
                    Starting At{" "}
                    <span className="font-semibold text-primary">
                      $20.00/hr
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-lg text-secondary">
                  Skills and Services
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    Handyman
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    Gardening
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                    Renovation
                  </span>
                </div>

                <button className="w-full mt-6 bg-[#FF7346] text-white px-4 py-3 rounded-md">
                  Contact for Shortlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
