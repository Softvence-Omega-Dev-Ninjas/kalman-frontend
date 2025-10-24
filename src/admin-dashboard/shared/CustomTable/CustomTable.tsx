
import React from "react";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface ITableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const CustomTable = <T extends object>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available",
}: ITableProps<T>) => {
  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                >
                  {column.cell
                    ? column.cell(row)
                    : column.accessor
                    ? String(row[column.accessor] ?? "")
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
