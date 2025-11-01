import React, { useState, useEffect } from "react";
import { User, Wand2, Plus } from "lucide-react";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetTradesmanProfileQuery,
  useUpdateSettingsMutation,
} from "@/redux/features/tradesman/tradesmanApi";

// Form types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  bio: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  images: (File | null)[];
}

const SettingPage = () => {
  useEffect(() => {
    document.title = `Setting | Trade Dashboard | Stavbar`;
  }, []);

  const [portfolioPreviews, setPortfolioPreviews] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const user = useSelector(selectCurrentUser);
  const { data: profileData } = useGetTradesmanProfileQuery(undefined);

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.name || profileData?.data?.firstName || "",
    lastName: user?.name || profileData?.data?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || profileData?.data?.phoneNumber || "",
    profession: user?.profession || profileData?.data?.profession || "",
    bio: user?.bio || profileData?.data?.bio || "",
    street: user?.street || profileData?.data?.address || "",
    city: user?.city || profileData?.data?.city || "",
    state: user?.state || profileData?.data?.state || "",
    zipCode: user?.zipCode || profileData?.data?.zipCode || "",
    images: profileData?.data?.images || Array(4).fill(null),
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Update form when user data changes
  useEffect(() => {
    if (user || profileData) {
      const apiImages = Array.isArray(profileData?.data?.images)
        ? profileData.data.images
        : [];

      const formattedImages = apiImages.map((img: string) =>
        img.startsWith("http")
          ? img
          : `${import.meta.env.VITE_API_URL || ""}/${img}`
      );

      // ✅ Always ensure exactly 4 slots
      const paddedImages = [
        ...formattedImages,
        ...Array(4 - formattedImages.length).fill(null),
      ].slice(0, 4);

      setFormData((prev) => ({
        ...prev,
        firstName: user?.name || profileData?.data?.firstName || "",
        lastName: user?.name || profileData?.data?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || profileData?.data?.phoneNumber || "",
        profession: user?.profession || profileData?.data?.profession || "",
        bio: user?.bio || profileData?.data?.bio || "",
        street: user?.street || profileData?.data?.address || "",
        city: user?.city || profileData?.data?.city || "",
        state: user?.state || profileData?.data?.state || "",
        zipCode: user?.zipCode || profileData?.data?.zipCode || "",
        images: paddedImages, // ✅ always array of 4
      }));

      setPortfolioPreviews(paddedImages);
    }
  }, [user, profileData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "ZIP Code is required";
    } else if (formData.zipCode.length < 5) {
      newErrors.zipCode = "ZIP Code must be at least 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);

      try {
        const submitData = new FormData();

        // Add text fields
        submitData.append("firstName", formData.firstName);
        submitData.append("lastName", formData.lastName);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("profession", formData.profession);
        submitData.append("bio", formData.bio);

        // Add address fields
        submitData.append("street", formData.street);
        submitData.append("city", formData.city);
        submitData.append("state", formData.state);
        submitData.append("zipCode", formData.zipCode);

        // ✅ Add portfolio images (same key "images" multiple times)
        if (formData.images && Array.isArray(formData.images)) {
          const uploadableImages = formData.images.filter(
            (img) => img && img instanceof File
          );

          if (uploadableImages.length > 4) {
            toast.error("You can upload up to 5 images only");
            return;
          }

          uploadableImages.forEach((file) => {
            if (file) {
              submitData.append("images", file);
            }
          });
        }

        await updateSettings(submitData).unwrap();
        toast.success("Settings updated successfully");
      } catch (error: any) {
        const errMessage =
          (error as any)?.data?.message ||
          (error as any)?.message ||
          "Failed to update settings";
        toast.error(errMessage);
      }
    }
  };

  const handlePortfolioChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPortfolioPreviews((prev) => {
        const updated = [...prev];
        updated[index] = preview;
        return updated;
      });
      setFormData((prev) => ({
        ...prev,
        images: prev.images.map((item, i) => (i === index ? file : item)),
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className="pb-28">
        {/* Main Form */}
        <form id="main-form" onSubmit={onSubmit} className="space-y-8">
          {/* Profile Info */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-gray-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder={`${user?.email || "Enter Email Address"}`}
                  value={user?.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full read-only p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  readOnly
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
                  placeholder="Enter Phone No"
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
                  placeholder="Enter Profession"
                  value={formData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-600">
                    Bio
                  </label>
                  <span className="text-xs text-cyan-500 cursor-pointer flex items-center hover:text-cyan-600">
                    <Wand2 className="w-4 h-4 mr-1" /> Auto Generate Text with
                    AI
                  </span>
                </div>
                <textarea
                  placeholder="Enter Bio...."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none outline-none"
                />
              </div>
            </div>
          </div>

          {/* Address Info */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 shadow-sm">
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
                  placeholder="Enter Address"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="Enter City"
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white outline-none"
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
                  placeholder="Enter Zip Code"
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

          {/* Portfolio */}
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Portfolio
            </h2>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Add photos
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolioPreviews.map((preview, i) => (
                <label
                  key={i}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer text-gray-400 hover:border-gray-500 transition-colors overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <Plus className="w-8 h-8" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePortfolioChange(i, e)}
                  />
                </label>
              ))}
            </div>
          </div>
        </form>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            form="main-form"
            disabled={isLoading}
            className="py-3 px-8 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
