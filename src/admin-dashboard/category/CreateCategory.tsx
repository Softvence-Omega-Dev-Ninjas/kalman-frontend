
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

interface CreateCategoryProps {
  onCreate: (formData: FormData) => void;
  editingCategory?: TCategory | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  onCreate,
  editingCategory,
  isOpen,
  onOpenChange,
}) => {
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || "");
      setSubCategories(editingCategory.subCategories || []);
      setSubInput("");
      setImage(null);
    } else {
      setName("");
      setSubCategories([]);
      setSubInput("");
      setImage(null);
    }
  }, [editingCategory, isOpen]);

  const handleAddSubCategory = () => {
    const trimmed = subInput.trim();
    if (!trimmed) return;
    setSubCategories([...subCategories, trimmed]);
    setSubInput("");
  };

  const handleRemoveSubCategory = (index: number) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name) return toast.error("Category name is required");

    const formData = new FormData();
    formData.append("name", name);
    subCategories.forEach((sub) => formData.append("subCategories[]", sub));
    if (image) formData.append("image", image);

    onCreate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent  className="sm:max-w-lg ">
        <DialogHeader>
          <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col gap-1">
            <Label>Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="focus:!ring-0 ring-0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Subcategories</Label>
            <div className="flex gap-2">
              <Input
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSubCategory())}
                placeholder="Type and press Enter"
                className="focus:!ring-0 ring-0"
              />
              <Button className="cursor-pointer" onClick={handleAddSubCategory}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {subCategories.map((sub, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                  <span>{sub}</span>
                  <button onClick={() => handleRemoveSubCategory(i)} className="text-red-600 font-bold">
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Image {editingCategory ? "(optional to change)" : "*"}</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="focus:!ring-0 ring-0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button className="cursor-pointer" onClick={handleSubmit}>{editingCategory ? "Update" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
