"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

interface CreateCategoryProps {
  onCreate: (formData: FormData) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [subInput, setSubInput] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleAddSubCategory = () => {
    const trimmed = subInput.trim();
    if (!trimmed) return;
    setSubCategories([...subCategories, trimmed]);
    setSubInput("");
  };

  const handleRemoveSubCategory = (index: number) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  const handleSubInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubCategory();
    }
  };

  const handleSubmit = () => {
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    subCategories.forEach((sub) => formData.append("subCategories[]", sub));
    formData.append("image", image);

    onCreate(formData);

    // Reset form
    setOpen(false);
    setName("");
    setSubCategories([]);
    setImage(null);
    setSubInput("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label>Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="focus:!ring-0 ring-0"
            />
          </div>

          {/* Subcategories */}
          <div className="flex flex-col gap-1">
            <Label>Subcategories</Label>
            <div className="flex gap-2">
              <Input
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                onKeyDown={handleSubInputKeyDown}
                placeholder="Type and press Enter"
                className="focus:!ring-0 ring-0"
              />
              <Button onClick={handleAddSubCategory}>Add</Button>
            </div>

            {/* Display subcategories */}
            <div className="flex flex-wrap gap-2 mt-2">
              {subCategories.map((sub, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded"
                >
                  <span>{sub}</span>
                  <button
                    onClick={() => handleRemoveSubCategory(i)}
                    className="text-red-600 font-bold"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1">
            <Label>Image *</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setImage(e.target.files[0]);
              }}
              className="focus:!ring-0 ring-0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
