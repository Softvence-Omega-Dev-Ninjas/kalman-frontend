import { IoLocationOutline } from "react-icons/io5";
import image1 from "../assets/sample_images/image.png";
import image2 from "../assets/sample_images/image2.png";
import image3 from "../assets/sample_images/image3.png";
import { MdOutlineReport } from "react-icons/md";
import { useState } from "react";
import BookingModal from "../components/ServiceComponents/BookingModal";
import RatingReviews from "@/components/ServiceComponents/RatingReviews";
import ReviewCard from "@/components/ServiceComponents/ReviewCard";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTradesmanQuery } from "@/redux/features/tradesman/tradesmanApi";
import TradesManBusinessDetails from "@/components/ServiceComponents/TradesManBusinessDetails";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetSingleTradesmanQuery(id);
  const [openContact, setOpenContact] = useState(false);

  return (
    <div className="bg-[#f3f5f7] min-h-screen py-16 px-16">
      <div className="max-w-[1490px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold mb-6">Service</h2>
          <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md">
            <span>Report</span>
            <MdOutlineReport />
          </button>
        </div>
        {/* Gallery - left two-thirds */}
        <div className="lg:col-span-2">
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

          <div className="flex flex-col  md:flex-row items-start gap-8 mt-10">
            <div className="w-full md:w-2/3 pr-10">
              <div>
                <div className="flex items-start gap-4 ">
                  <img
                    src={image2}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-lg">{`${data?.data?.firstName} ${data?.data?.lastName}`}</div>
                    <div className="text-sm text-secondary">Tradesperson</div>
                    <div className="text-sm text-secondary flex items-center gap-1">
                      <IoLocationOutline />
                      <span>{data?.data?.address}</span>
                    </div>
                    <div className="text-sm text-primary font-semibold mt-1">
                      ★ 4.8 (170 Reviews)
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-t border-gray-200" />

                <h3 className="text-lg font-semibold mb-2">Service Details</h3>
                <p className=" text-secondary">
                  {data?.data?.businessDetail?.professionalDescription}
                </p>
              </div>

              <div className="block md:hidden mt-6">
                <TradesManBusinessDetails
                  data={data?.data}
                  setOpenContact={setOpenContact}
                />
              </div>
              <RatingReviews />
              {data?.data?.review.length > 0 && (
                <div className="mt-8">
                  {data?.data?.review.slice(0, 3).map((rev: any) => (
                    <ReviewCard
                      key={rev.id}
                      name={rev.customer?.name}
                      title={rev.title}
                      avatar={rev.customer?.profile_image}
                      rating={rev.rating}
                      comment={rev.text}
                    />
                  ))}
                </div>
              )}
              {data?.data?.review.length > 3 && (
                <Link
                  to="#"
                  className="text-primary text-lg inline-block underline font-medium"
                >
                  See all reviews
                </Link>
              )}
            </div>
            {/* Right column card */}

            <div className="w-full  md:block hidden md:w-1/3 space-y-6">
              <TradesManBusinessDetails
                data={data?.data}
                setOpenContact={setOpenContact}
              />
            </div>
            {
              // openContact && ( Show modal)
            }
            <BookingModal
              open={openContact}
              onClose={() => setOpenContact(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
