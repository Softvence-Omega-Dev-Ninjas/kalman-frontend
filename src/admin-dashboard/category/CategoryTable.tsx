"use client";

import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

interface CategoryTableProps {
  data: TCategory[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  emptyMessage?: string;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  data = [],
  isLoading = false,
  onDelete,
  onEdit,
  emptyMessage = "No categories found",
}) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Icon</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Subcategories</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Loading...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">{emptyMessage}</td>
            </tr>
          ) : (
            data.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={category.image} alt={category.name} className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.subCategories?.join(", ") || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-primary" onClick={() => onEdit?.(category.id)}><SquarePen size={18} /></button>
                    <button className="text-gray-400 hover:text-red-600" onClick={() => onDelete?.(category.id)}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
