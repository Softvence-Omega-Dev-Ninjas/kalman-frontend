import React from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
  onEdit?: (category: TCategory) => void;
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
            <th className="px-3 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              <Checkbox className="w-4 h-4" /> {/* header checkbox (optional for select all) */}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Icon</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Subcategories</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Loading...</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">{emptyMessage}</td>
            </tr>
          ) : (
            data.map((category ,idx) => (
              <tr className={`${idx%2===0 && "bg-gray-50"}`} key={category.id}>
                {/* Small checkbox with spacing */}
                <td className="px-3 py-4 whitespace-nowrap">
                  <Checkbox className="w-4 h-4" />
                </td>

                {/* Icon */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>

                {/* Subcategories */}
                <td className="px-6 py-4 whitespace-nowrap">{category.subCategories?.join(", ") || "-"}</td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-400 hover:text-primary cursor-pointer"
                      onClick={() => onEdit?.(category)}
                    >
                      <SquarePen size={18} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                      onClick={() => onDelete?.(category.id)}
                    >
                      <Trash2 size={18} />
                    </button>
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
