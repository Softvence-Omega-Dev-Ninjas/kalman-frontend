import React, { useState, useEffect } from "react";
import {
  User,
  Wand2,
  Plus,
} from "lucide-react";
import { useUpdateSettingsMutation } from "@/redux/features/settingsapi/settingsApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

// Form types
interface FormData {
  fullName: string;
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
  const [portfolioPreviews, setPortfolioPreviews] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const user = useSelector(selectCurrentUser);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    profession: user?.profession || "",
    bio: user?.bio || "",
    street: user?.street || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    images: Array(4).fill(null),
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        profession: user?.profession || "",
        bio: user?.bio || "",
        street: user?.street || "",
        city: user?.city || "",
        state: user?.state || "",
        zipCode: user?.zipCode || "",
        images: Array(4).fill(null),
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
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

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP Code is required";
    } else if (formData.zipCode.length < 5) {
      newErrors.zipCode = "ZIP Code must be at least 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      
      try{
        // Create FormData for multipart/form-data submission
        const submitData = new FormData();
        
        // Add text fields
        submitData.append("fullName", formData.fullName);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("profession", formData.profession);
        submitData.append("bio", formData.bio);
        
        // Add address fields
        submitData.append("street", formData.street);
        submitData.append("city", formData.city);
        submitData.append("state", formData.state);
        submitData.append("zipCode", formData.zipCode);
        
        // Add portfolio images (only if they exist)
        if (formData.images && Array.isArray(formData.images)) {
          formData.images.forEach((file) => {
            if (file) {
              submitData.append(`images`, file);
            }
          });
        }
        
        await updateSettings(submitData).unwrap();
        toast.success("Settings updated successfully");
      } catch (error) {
        console.error("Error updating settings:", error);
        toast.error("Failed to update settings");
      }
    }
  };


  const handlePortfolioChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPortfolioPreviews(prev => {
        const updated = [...prev];
        updated[index] = preview;
        return updated;
      });
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((item, i) => (i === index ? file : item))
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
                  placeholder={`${user?.email || "sarah.johnson@gmail.com"}`}
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
                  <span className="text-xs text-cyan-500 cursor-pointer flex items-center hover:text-cyan-600">
                    <Wand2 className="w-4 h-4 mr-1" /> Auto Generate Text with AI
                  </span>
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
                  placeholder="123 Main Street"
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