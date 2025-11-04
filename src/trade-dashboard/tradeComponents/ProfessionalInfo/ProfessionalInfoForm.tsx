import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/typeHook";
import { saveProfessional } from "@/redux/features/tradeForm/tradeFormSlice";

const ProfessionalInfoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  // const { data } = useGetCategoriesQuery({ page: 1, limit: 10 });
  const { data } = useGetCategoriesHQuery();
  const categories = data?.data.result || [];
  console.log("Categories:", categories);
  const subCategories =
    categories.filter((category: any) => category.id === categoryId)[0]
      ?.subCategories || [];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const saved = useAppSelector((s) => s.tradeForm.professional);

  type ProfessionalFormValues = {
    businessName?: string;
    yearsExperience?: number;
    businessType?: string;
    hourlyRate?: string;
    categoryId?: string | null;
    subCategoryIds?: string[];
    services?: string[];
    description?: string;
  };

  const { register, handleSubmit, setValue } = useForm<ProfessionalFormValues>({
    defaultValues: {
      businessName: "",
      yearsExperience: 0,
      businessType: undefined,
      hourlyRate: "",
      categoryId: null,
      subCategoryIds: [],
      services: tags,
      description: "",
    },
  });

  // initialize form and local states from saved redux slice
  useEffect(() => {
    if (saved) {
      if (saved.businessName) setValue("businessName", saved.businessName);
      if (saved.yearsExperience)
        setValue("yearsExperience", saved.yearsExperience);
      if (saved.businessType) setValue("businessType", saved.businessType);
      if (saved.hourlyRate) setValue("hourlyRate", saved.hourlyRate);
      if (saved.description) setValue("description", saved.description);
      if (saved.categoryId) {
        setCategoryId(saved.categoryId);
        setValue("categoryId", saved.categoryId);
      }
      if (saved.subCategoryIds) {
        setSelectedSubCats(saved.subCategoryIds);
        setValue("subCategoryIds", saved.subCategoryIds);
      }
      if (saved.services) {
        setTags(saved.services);
        setValue("services", saved.services);
      }
    }
  }, [saved, setValue]);

  useEffect(() => {
    setValue("services", tags);
  }, [tags, setValue]);

  useEffect(() => {
    setValue("categoryId", categoryId ?? null);
  }, [categoryId, setValue]);

  useEffect(() => {
    setValue("subCategoryIds", selectedSubCats);
  }, [selectedSubCats, setValue]);

  const onSubmit = (data: ProfessionalFormValues) => {
    // ensure we include latest tag and subcategory selections
    const payload = {
      ...data,
      services: tags,
      subCategoryIds: selectedSubCats,
      categoryId,
      // Convert yearsExperience to integer
      yearsExperience: data.yearsExperience
        ? parseInt(String(data.yearsExperience), 10)
        : undefined,
    };
    console.log("[ProfessionalInfoForm] Submitting payload:", payload);
    dispatch(saveProfessional(payload));
    navigate("/trade-person/business-info");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    // case-insensitive duplicate check
    const exists = tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    if (!exists) setTags((prev) => [...prev, tag]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Professional Information
      </h2>

      {/* Business Name */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Your business name"
            {...register("businessName")}
            className="w-full placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
          />
        </div>

        {/* Years of Experience & Business Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              placeholder="Your business experience in years"
              {...register("yearsExperience", { valueAsNumber: true })}
              className="w-full placeholder-gray-400 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Business Type
            </label>
            <select
              {...register("businessType")}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
            >
              <option value="">Select business type</option>
              <option value="sole">Sole proprietorship</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>

        {/* Hourly Rate */}
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Hourly rate
          </label>
          <input
            type="number"
            defaultValue="$20.00"
            {...register("hourlyRate")}
            className="w-full border placeholder:text-gray-400 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="tblock text-lg font-semibold text-gray-700 mb-2">
            Categories
          </h3>
          <div className="grid grid-cols-3 gap-5">
            {categories.slice(0, 6).map((category: any) => {
              const isSelected = categoryId === category.id;
              return (
                <div
                  key={category.id}
                  role="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setCategoryId(category.id);
                    setValue("categoryId", category.id);
                    setSelectedSubCats([]);
                    setValue("subCategoryIds", []);
                  }}
                  className={`border rounded-lg px-4 py-2 text-center cursor-pointer hover:bg-gray-100 flex flex-col items-center gap-2 ${
                    isSelected
                      ? "border-orange-400 bg-orange-50 ring-2 ring-orange-200"
                      : "border-gray-200"
                  }`}
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="mx-auto mb-2 h-16 object-contain"
                    />
                  )}
                  <span className="text-gray-700 font-medium">
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Sub Categories */}
        <div className="py-10">
          <h3 className="tblock text-lg font-semibold text-gray-700 mb-2">
            Sub Categories
          </h3>
          <div className="grid grid-cols-3 gap-5">
            {subCategories.length === 0 && (
              <div className="text-sm text-gray-500">
                Select a category to see its subcategories
              </div>
            )}
            {subCategories.map(
              (
                sub: string | { id?: string; name?: string; title?: string },
                idx: number
              ) => {
                const id =
                  typeof sub === "string" ? sub : sub?.id ?? String(idx);
                const label =
                  typeof sub === "string"
                    ? sub
                    : sub?.name ?? sub?.title ?? String(sub);
                const isSelected = selectedSubCats.includes(id);
                return (
                  <div
                    key={id}
                    role="button"
                    onClick={() => {
                      setSelectedSubCats((prev) => {
                        const exists = prev.includes(id);
                        const next = exists
                          ? prev.filter((p) => p !== id)
                          : [...prev, id];
                        setValue("subCategoryIds", next);
                        return next;
                      });
                    }}
                    className={`border rounded-lg px-4 py-2 text-center cursor-pointer hover:bg-gray-100 ${
                      isSelected
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-gray-700 font-medium">{label}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Services */}
        <h3 className="tblock text-lg font-semibold text-gray-700 mb-2">
          Services
        </h3>
        <div className="mb-5">
          <label className="block text-lg font-semibold text-gray-700 mb-2 mt-10">
            You are professional at
          </label>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter a skill tag and press Enter"
              className="w-full border border-gray-200 rounded-lg p-3 placeholder-gray-400 mb-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-lg font-semibold"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Professional Description */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Professional Description
          </label>
          <textarea
            placeholder="Describe your experience, approach to work, and what makes you stand out..."
            rows={4}
            {...register("description")}
            className="w-full border border-gray-200 placeholder-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
          />
        </div>

        {/* Buttons */}
        <div className="mt-16 flex justify-between">
          <Link to="/trade-person/personal-info">
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
              Previous
            </button>
          </Link>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfoForm;
