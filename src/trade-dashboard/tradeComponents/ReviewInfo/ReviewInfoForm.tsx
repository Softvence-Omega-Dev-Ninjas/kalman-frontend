import { ArrowLeft, ArrowRight, SquarePen } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReviewInfoForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-2xl shadow-sm">
      {/* Title */}
     <div className="flex justify-between">
        <div>
         <h2 className="text-2xl font-semibold text-gray-900">Review Your Information</h2>
      <p className="text-sm text-gray-500 mb-8">Review Your Information</p>
     </div>
     <div>
        <SquarePen />
     </div>
     </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Info */}
        <div className="border-gray-200 border-1 rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
          <p className="text-sm text-gray-600">Name : normal name</p>
          <p className="text-sm text-gray-600">Email : username@mail.com</p>
          <p className="text-sm text-gray-600">Phone : 123 456 789</p>
          <p className="text-sm text-gray-600">Address : location</p>
        </div>

        {/* Professional Info */}
        <div className="border-gray-200 border-1 rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Professional Information</h3>
          <p className="text-sm text-gray-600">Business : Professional name</p>
          <p className="text-sm text-gray-600">Experience : 2 years</p>
          <p className="text-sm text-gray-600">Hourly Rate: $20.00/hr</p>
          <p className="text-sm text-gray-600">Business Type : solo</p>
        </div>

        {/* Service Area */}
        <div className="border-gray-200 border-1 rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Service Area</h3>
          <p className="text-sm text-gray-600">
            Travel Distance: 50mile from my location
          </p>
        </div>

        {/* Insurance */}
        <div className="border-gray-200 border-1 rounded-xl p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Insurance & Credentials</h3>
          <p className="text-sm text-gray-600">Public Liability: yes</p>
          <p className="text-sm text-gray-600">Qualifications: 1 added</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border-gray-200 border-1 rounded-xl p-4 bg-gray-50 mb-8">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">Account : ********123</p>
      </div>

      {/* Buttons */}
     <div className="mt-16 flex justify-between">
          <Link to='/trade-person/business-details'>
          <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
            <ArrowLeft size={18} />
            Previous
          </button>
          </Link>

          <Link to='/'>
          <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Continue
            <ArrowRight size={18} />
          </button>
          </Link>
        </div>
    </div>
  );
}
