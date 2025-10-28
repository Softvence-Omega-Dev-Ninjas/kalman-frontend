import React, { useState, useEffect } from "react";
import { User, Camera, Wand2, X } from "lucide-react";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/customer/customerApi";
import toast from "react-hot-toast";
// import { useGetMyProfileQuery, useUpdateProfileMutation } from "@/redux/features/api/apiSlice";

// Components
const Progress: React.FC<{ value: number; className?: string }> = ({
  value,
  className,
}) => (
  <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      className="bg-cyan-500 h-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

interface ProfileFormData {
  name: string;
  phone: string;
  profession: string;
  bio: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
}

const UserSetting: React.FC = () => {
  // RTK Query hooks
  const {
    data: profileData,
    isLoading,
    error,
  } = useGetMyProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Local state
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    phone: "",
    profession: "",
    bio: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [email, setEmail] = useState<string>(""); // Separate state for email (read-only)

  // Calculate profile completion percentage
  const calculateProfileCompletion = (profile: any): number => {
    if (!profile) return 0;

    const fields = [
      "name",
      "phone",
      "profession",
      "bio",
      "street_address",
      "city",
      "state",
      "zip_code",
      "profile_image",
    ];

    const completedFields = fields.filter((field) => {
      const value = profile[field];
      return value && value !== "" && value !== "string";
    }).length;

    return Math.round((completedFields / fields.length) * 100);
  };

  // Initialize form data when profile data is loaded
  useEffect(() => {
    if (profileData?.data?.profile) {
      const profile = profileData.data.profile;
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        profession: profile.profession || "",
        bio: profile.bio || "",
        street_address: profile.street_address || "",
        city: profile.city || "",
        state: profile.state || "",
        zip_code: profile.zip_code || "",
      });

      setEmail(profile.email || ""); // Set email separately

      if (profile.profile_image) {
        setAvatarPreview(profile.profile_image);
      }
    }
  }, [profileData]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      setProfileImage(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setProfileImage(null);
    // Note: You might want to call an API to remove the profile image from server
  };

  const generateAIText = () => {
    const sampleBios = [
      "I'm a passionate professional with years of experience in creating beautiful, functional spaces that reflect my clients' unique style and needs.",
      "Dedicated to delivering exceptional results, I combine creativity with technical expertise to transform your vision into reality.",
      "With a keen eye for detail and commitment to excellence, I specialize in creating environments that enhance both beauty and functionality.",
    ];
    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    setFormData((prev) => ({
      ...prev,
      bio: randomBio,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields except email
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof ProfileFormData];
        if (value) {
          submitData.append(key, value);
        }
      });

      // Append profile image if changed
      if (profileImage) {
        submitData.append("profile_image", profileImage);
      }

      // Update profile
      const result = await updateProfile(submitData).unwrap();
      console.log("Profile updated successfully:", result);

      // Show success message (you can replace this with a toast notification)
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Failed to update profile:", error);

      // Show error message to user
      if (error.data?.message) {
        alert(
          `Error: ${
            Array.isArray(error.data.message)
              ? error.data.message.join(", ")
              : error.data.message
          }`
        );
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto min-h-screen mt-5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto min-h-screen mt-5 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to load profile. Please try again.</p>
        </div>
      </div>
    );
  }

  const profileCompletion = profileData?.data?.profile
    ? calculateProfileCompletion(profileData.data.profile)
    : 0;

  return (
    <div className="max-w-5xl mx-auto min-h-screen mt-5">
      <form id="main-form" onSubmit={handleSubmit}>
        <div className="pb-28">
          {/* Profile Completion */}
          <div className="bg-[#F8F9FA] border border-gray-200 rounded-lg p-6 mt-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Profile Completion
              </span>
              <span className="text-sm font-medium text-gray-500">
                {profileCompletion}% Complete
              </span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
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
                  name="name"
                  placeholder="Sarah Johnson"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="sarah.johnson@gmail.com"
                  value={email}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-600">
                    Bio
                  </label>
                  <button
                    type="button"
                    onClick={generateAIText}
                    className="text-xs text-cyan-500 cursor-pointer flex items-center hover:text-cyan-600"
                  >
                    <Wand2 className="w-4 h-4 mr-1" /> Auto Generate Text with
                    AI
                  </button>
                </div>
                <textarea
                  name="bio"
                  placeholder="I'm a homeowner..."
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
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
                  name="street_address"
                  placeholder="123 Main Street"
                  value={formData.street_address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                >
                  <option value="">State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zip_code"
                  placeholder="12345"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isUpdating}
              className="py-3 px-8 bg-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSetting;
