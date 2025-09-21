const PersonalInfoForm = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>

      {/* First + Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="Enter your last name"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Date of Birth + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">Date of Birth</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <hr className="border-gray-200 mb-6 mt-16" />

      {/* Address Section */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Address</h3>

      {/* Street Address */}
      <div className="mb-4 mt-8">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Street Address</label>
        <input
          type="text"
          placeholder="Enter your first name"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* City + Postcode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">City</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">Last Name</label>
          <input
            type="text"
            placeholder="Postcode"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-3 px-6 rounded-md flex items-center space-x-2 transition-all duration-200">
          <span>Continue</span>
          <span className="text-xl leading-none">→</span>
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
