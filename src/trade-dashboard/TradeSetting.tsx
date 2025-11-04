import React, { useState, useEffect } from "react";
import { User, Wand2, Plus, PencilIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetTradesmanProfileQuery,
  useUpdateSettingsMutation,
} from "@/redux/features/tradesman/tradesmanApi";
import { usePostImgMutation } from "@/redux/features/image/imageUploadApi";

type UploadedImage = { index: number; url: string };
type ImageSlot = UploadedImage | File | null;

interface FormDataLocal {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  bio: string;
  street: string;
  city: string;
  state: string;
  zipCode: string | number;
  images: ImageSlot[];
}

const SettingPage = () => {
  useEffect(() => {
    document.title = `Setting | Trade Dashboard | ${
      import.meta.env.VITE_APP_NAME
    }`;
  }, []);

  const [portfolioPreviews, setPortfolioPreviews] = useState<(string | null)[]>(
    Array(4).fill(null)
  );
  const [profileImage, setProfileImage] = useState<UploadedImage | File | null>(
    null
  );
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataLocal, string>>
  >({});
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();
  const [postImg] = usePostImgMutation();
  const user = useSelector(selectCurrentUser);
  const { data: profileData } = useGetTradesmanProfileQuery(undefined);

  const initialImages = () => {
    const apiImages = Array.isArray(profileData?.data?.images)
      ? profileData.data.images
      : [];
    const formatted: ImageSlot[] = [];
    for (let i = 0; i < 4; i++) {
      const img = apiImages[i];
      if (img) {
        const url = img.startsWith("http")
          ? img
          : `${import.meta.env.VITE_API_URL || ""}/${img}`;
        formatted.push({ index: i, url });
      } else formatted.push(null);
    }
    return formatted;
  };

  const [formData, setFormData] = useState<FormDataLocal>({
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
    images: initialImages(),
  });

  useEffect(() => {
    if (!profileData) return;

    // initialize profile image
    if (profileData.data.profileImage) {
      const url = profileData.data.profileImage.startsWith("http")
        ? profileData.data.profileImage
        : `${import.meta.env.VITE_API_URL}/${profileData.data.profileImage}`;
      setProfileImage({ index: 0, url });
      setProfilePreview(url);
    }
  }, [profileData]);

  useEffect(() => {
    if (!profileData && !user) return;
    const apiImages = Array.isArray(profileData?.data?.images)
      ? profileData.data.images
      : [];
    const formattedImages: ImageSlot[] = [];
    const newPreviews: (string | null)[] = [];

    for (let i = 0; i < 4; i++) {
      const img = apiImages[i];
      if (img) {
        const url = img.startsWith("http")
          ? img
          : `${import.meta.env.VITE_API_URL || ""}/${img}`;
        formattedImages.push({ index: i, url });
        newPreviews.push(url);
      } else {
        formattedImages.push(null);
        newPreviews.push(null);
      }
    }

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
      images: formattedImages,
    }));

    setPortfolioPreviews(newPreviews);
  }, [user, profileData]);

  // ✅ Validation logic
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormDataLocal, string>> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Input handler
  const handleInputChange = (field: keyof FormDataLocal, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ✅ Image handler
  const handlePortfolioChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPortfolioPreviews((prev) => {
      const updated = [...prev];
      updated[index] = preview;
      return updated;
    });

    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((it, i) => (i === index ? file : it)),
    }));

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const resp = await postImg(uploadData).unwrap();

      // assume resp contains the uploaded URL at resp.data.url or resp.url
      const url = (resp && resp?.data) || null;
      if (!url) throw new Error("No URL returned from upload");

      // replace slot with UploadedImage object
      setFormData((prev) => ({
        ...prev,
        images: prev.images.map((it, i) => (i === index ? { index, url } : it)),
      }));

      setPortfolioPreviews((prev) => {
        const updated = [...prev];
        updated[index] = url;
        return updated;
      });

      toast.success("Image uploaded");
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed — saved locally. Try again.");
    }
  };

  const handleProfileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setProfilePreview(preview);
    setProfileImage(file);

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const resp = await postImg(uploadData).unwrap();
      const url = resp?.data || null;
      if (!url) throw new Error("No URL returned from upload");

      setProfileImage({ index: 0, url });
      setProfilePreview(url);
    } catch (err) {
      console.error(err);
      toast.error("Profile image upload failed — saved locally");
    }
  };

  const handleProfileDelete = () => {
    setProfileImage(null);
    setProfilePreview(null);
    toast.success("Profile image removed");
  };

  // ✅ Form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const submitData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        profession: formData.profession,
        bio: formData.bio,
        street: String(formData.street),
        city: String(formData.city),
        state: String(formData.state),
        zipCode: String(formData.zipCode),
        images: [],
        profileImage:
          profileImage && "url" in profileImage ? profileImage.url : null,
      };

      // Prepare images array
      formData.images.forEach((slot, index) => {
        if (!slot) return;
        if ("url" in slot) {
          submitData.images.push({ index, url: slot.url });
        }
      });

      await updateSettings(submitData).unwrap();
      toast.success("Settings updated successfully");
    } catch (error: any) {
      const msg =
        error?.data?.message || error?.message || "Failed to update settings";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className="pb-28">
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
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full p-3 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 outline-none`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
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
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full p-3 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 outline-none`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Phone
                </label>
                <input
                  type="number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Profile Image
                </label>
                <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden">
                  {profilePreview ? (
                    <>
                      <img
                        src={profilePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProfileDelete();
                        }}
                        className="absolute top-1 right-1 bg-primary text-white rounded-sm p-1 opacity-0 hover:opacity-100 transition"
                      >
                        <PencilIcon size={15} />
                      </button>
                    </>
                  ) : (
                    <Plus className="w-8 h-8 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleProfileChange}
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-600">
                    Bio
                  </label>
                  <span className="text-xs text-cyan-500 flex items-center cursor-pointer hover:text-cyan-600">
                    <Wand2 className="w-4 h-4 mr-1" /> Auto Generate with AI
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
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
                  Street *
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className={`w-full p-3 border ${
                    errors.street ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 outline-none`}
                />
                {errors.street && (
                  <p className="text-xs text-red-500 mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full p-3 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 outline-none`}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className={`w-full p-3 border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 bg-white outline-none`}
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
                {errors.state && (
                  <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  ZIP Code *
                </label>
                <input
                  type="number"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={`w-full p-3 border ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:ring-2 focus:ring-cyan-500 outline-none`}
                />
                {errors.zipCode && (
                  <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
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
              Add Photos
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolioPreviews.map((preview, i) => (
                <label
                  key={i}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-500 transition overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Plus className="w-8 h-8 text-gray-400" />
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
            className="py-3 px-8 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
