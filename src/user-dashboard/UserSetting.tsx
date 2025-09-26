import React, { useState } from "react";
import {
  User,
  Camera,
  Wand2,
  X,
} from "lucide-react";

// Type definitions
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  bio: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  subCategories: string[];
  portfolio: (File | null)[];
  avatar: File | null;
}



interface ValidationErrors {
  fullName?: string;
  email?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

// Components
const Progress: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div 
      className="bg-cyan-500 h-full transition-all duration-300" 
      style={{ width: `${value}%` }}
    />
  </div>
);





const UserSetting: React.FC = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);


  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    bio: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    subCategories: [""],
    portfolio: Array(4).fill(null),
    avatar: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});



  // Event handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setFormData(prev => ({ ...prev, avatar: file }));
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setFormData(prev => ({ ...prev, avatar: null }));
  };

  const generateAIText = () => {
    const sampleBios = [
      "I'm a passionate professional with years of experience in creating beautiful, functional spaces that reflect my clients' unique style and needs.",
      "Dedicated to delivering exceptional results, I combine creativity with technical expertise to transform your vision into reality.",
      "With a keen eye for detail and commitment to excellence, I specialize in creating environments that enhance both beauty and functionality."
    ];
    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    handleInputChange('bio', randomBio);
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen mt-5">
      <div className="pb-28">
        {/* Profile Completion */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">
              Profile Completion
            </span>
            <span className="text-sm font-medium text-gray-500">
              70% Complete
            </span>
          </div>
          <Progress value={70} className="h-2" />
        </div>

        {/* Profile Info */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Profile Information
            </h2>
          </div>

          <div className="flex flex-row gap-5 items-center flex-wrap mb-6">
            {/* Avatar Upload */}
            <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <Camera className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <div>
              <div className="flex items-center gap-3 mt-1">
                <label
                  htmlFor="avatar-upload"
                  className="text-cyan-500 font-medium cursor-pointer text-sm hover:text-cyan-600"
                >
                  Change Photo
                </label>

                {avatarPreview && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="text-red-500 w-6 h-6 p-1 bg-red-50 rounded-full border border-red-500 font-medium cursor-pointer text-sm flex items-center justify-center hover:bg-red-100"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Sarah Johnson"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="sarah.johnson@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Profession
              </label>
              <input
                type="text"
                placeholder="Profession"
                value={formData.profession}
                onChange={(e) => handleInputChange("profession", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-600">Bio</label>
                <button
                  type="button"
                  onClick={generateAIText}
                  className="text-xs text-cyan-500 cursor-pointer flex items-center hover:text-cyan-600"
                >
                  <Wand2 className="w-4 h-4 mr-1" /> Auto Generate Text with AI
                </button>
              </div>
              <textarea
                placeholder="I'm a homeowner..."
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none outline-none"
              />
            </div>
          </div>
        </div>

        {/* Address Info */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Address Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                placeholder="123 Main Street"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                City *
              </label>
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              >
                <option value="">State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="IL">Illinois</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600 block mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                placeholder="12345"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button type="submit" form="main-form" className="py-3 px-8 bg-primary text-white rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;