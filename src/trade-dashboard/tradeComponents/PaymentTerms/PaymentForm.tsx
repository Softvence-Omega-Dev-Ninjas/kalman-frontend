import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Payment Terms</h1>

      <div className="space-y-4 mb-6">
        <div className="bg-[#FFFCFB] p-4 rounded-lg shadow-sm border-[#FDC6B5] border-1">
          <h2 className="font-semibold text-xl text-orange-700">Payment Policy</h2>
          <h3 className="mt-2 font-semibold text-[#595959] text-lg">When customers shortlist you</h3>
          <ul className="list-disc pl-5 mt-2 text-gray-500">
            <li>$20.00 lead access fee will be automatically charged to your account</li>
            <li>Payments are processed immediately upon customer action</li>
            <li>No additional authorization required — streamlined process</li>
          </ul>
        </div>

        <div className=" p-4 rounded-lg shadow-sm border-[#FDC6B5] border-1 bg-[#FFFCFB] ">
          <h2 className="font-semibold text-xl text-orange-700">How It Works</h2>
          <ol className="list-decimal pl-5 mt-2 text-gray-500 space-y-2">
            <li>Customer posts a job on our platform</li>
            <li>You browse and view basic job details at no cost</li>
            <li>$20.00 is automatically charged when customer shortlists you</li>
            <li>You get customer contact details and can submit proposals</li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col items-start space-y-4">
        <label className="text-sm text-gray-700 bg-[#FFFCFB] border-[#FDC6B5] border-1 w-full rounded-lg p-4">
          <div className="flex">
            <div>
              <input type="checkbox" className="mr-2 size-4 mt-2" />
            </div>
            <span>
              <span className="font-semibold text-xl text-orange-700 ms-1"> I understand and accept the payment terms</span>
              <ul className="list-disc pl-6 mt-2 text-gray-500">
                <li>$20.00 will be automatically charged when customers shortlist me</li>
                <li>All payments are non-refundable</li>
              </ul>
            </span>
          </div>
        </label>

        <label className="flex items-center text-sm text-gray-700 bg-[#FFFCFB] border-[#FDC6B5] border-1 w-full rounded-lg p-4">
          <input type="checkbox" className="mr-2 size-4" />
          <span className="text-xl">
            I have read and agree to the
            <a href="#" className="text-orange-500 hover:underline ml-1">Terms and Conditions</a>
            and
            <a href="#" className="text-orange-500 hover:underline ml-1">Privacy Policy</a>
          </span>
        </label>
      </div>

      <div className="mt-16 flex justify-between">
       <Link to='/trade-person/credentials'>
        <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
          <ArrowLeft size={18} />
          Previous
        </button>
       </Link>

        <Link to='/trade-person/business-details'>
        <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Continue
          <ArrowRight size={18} />
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentForm;
