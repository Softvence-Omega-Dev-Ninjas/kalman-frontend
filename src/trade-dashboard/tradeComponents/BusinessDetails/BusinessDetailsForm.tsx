import { useState } from "react";
import { ArrowLeft, ArrowRight, CreditCard, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessDetailsForm() {
  const [method, setMethod] = useState("card");

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Payment method
      </h2>

      {/* Payment Options */}

      <h1 className="text-xl font-semibold mt-8">Payment Details</h1>
      <div className="space-y-4 mb-6 mt-5">
        <button
          type="button"
          onClick={() => setMethod("card")}
          className={`w-full flex items-center gap-3 p-4 border rounded-xl transition 
            ${method === "card" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        >
          <CreditCard className="w-6 h-6 text-blue-600" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Credit/Debit Card</p>
            <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMethod("banking")}
          className={`w-full flex items-center gap-3 p-4 border rounded-xl transition 
            ${method === "banking" ? "border-red-400 bg-red-50" : "border-gray-200"}`}
        >
          <Landmark className="w-6 h-6 text-green-600" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">Mobile Banking</p>
            <p className="text-xs text-gray-500">Quick and secure</p>
          </div>
        </button>
      </div>

      {/* Payment Details */}
      {method === "card" && (
        <>
          <form className="space-y-5">
            {/* Card Holder Name */}
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Card holder Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>
            </div>

            {/* Save Card */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="save" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="save" className="text-sm text-gray-600">
                Save this card for future payments
              </label>
            </div>

            {/* Billing Address */}
            <h3 className="text-lg font-semibold text-gray-900 mt-6">Billing Address</h3>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1 ">
                  City
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Post code
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none bg-[#F8F9FA]"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Agree to the{" "}
                <span className="text-red-500">Terms Privacy</span> of and{" "}
                <span className="text-red-500">Policy Service</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="mt-16 flex justify-between">
              <Link to='/trade-person/payment-terms'>
              <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                <ArrowLeft size={18} />
                Previous
              </button>
              </Link>

             <Link to='/trade-person/review-info'>
              <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                Continue
                <ArrowRight size={18} />
              </button>
             </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
