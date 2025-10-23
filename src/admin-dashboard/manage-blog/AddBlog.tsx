import { Button } from "@/components/ui/button";
import {
  usePostBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type AddBlogProps = {
  onCancel: () => void;
  initialData: BlogData | null;
};

type BlogData = {
  id: string;
  title: string;
  description: string;
  imeges: (string | File)[];
};

type FormDataState = {
  title: string;
  description: string;
  images: File[];
};

const AddBlog = ({ onCancel, initialData }: AddBlogProps) => {
  const isEditMode = Boolean(initialData?.id);
  const [postBlog, { isLoading }] = usePostBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        images: (initialData.imeges || []).filter(
          (img): img is File => img instanceof File
        ),
      });

      setPreviewImages(
        (initialData.imeges || []).map((img) =>
          typeof img === "string" ? img : URL.createObjectURL(img)
        )
      );
    } else {
      setFormData({ title: "", description: "", images: [] });
      setPreviewImages([]);
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedFiles = formData.images.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setFormData((prev) => ({ ...prev, images: updatedFiles }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return alert("Please fill out both title and description.");
    }

    try {
      const payload = new FormData();
      payload.append(
        "data",
        JSON.stringify({
          title: formData.title,
          description: formData.description,
        })
      );

      formData.images.forEach((file) => payload.append("images", file));

      if (isEditMode && initialData) {
        await updateBlog({ id: initialData.id, data: payload }).unwrap();
      } else {
        await postBlog(payload).unwrap();
      }

      // Reset form and close modal
      setFormData({ title: "", description: "", images: [] });
      setPreviewImages([]);
      onCancel();
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      {/* Image Upload Input */}
      <div>
        <label
          htmlFor="images"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Images
        </label>
        <label
          htmlFor="images"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          Choose Files
        </label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Image Preview Section */}
        {previewImages.length > 0 && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {previewImages.map((src, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="w-full h-25 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-orange-600 bg-opacity-60 text-white rounded-sm p-1 opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => {
            setFormData({ title: "", description: "", images: [] });
            setPreviewImages([]);
            onCancel();
          }}
          className="flex items-center px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex items-center px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddBlog;
