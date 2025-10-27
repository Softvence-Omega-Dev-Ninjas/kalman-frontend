import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import CustomTable, { type Column } from "../shared/CustomTable/CustomTable";
import { Button } from "@/components/ui/button";
import { useGetCommisionQuery, useSetCommisionMutation } from "@/redux/features/admin/commissionApi";
import CreateCommission from "./CreateCommission";

interface TCommission {
  id?: string;
  commision_rate: number | string;
  minimum_hourly_rate: number | string;
  maximum_hourly_rate: number | string;
  createdAt?: string;
}

const ManageCommission = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCommission, setEditingCommission] = useState<TCommission | null>(null);

  const { data, isLoading, refetch } = useGetCommisionQuery();
  const [createCommission] = useSetCommisionMutation();

const commissions: TCommission[] = Array.isArray(data?.data)
  ? data.data
  : data?.data
  ? [data.data]
  : [];

console.log(commissions)
  const handleCreateOrUpdate = async (payload: TCommission) => {
    try {
      await createCommission(payload).unwrap();
      toast.success(editingCommission ? "Commission updated!" : "Commission added!");
      refetch();
      setModalOpen(false);
      setEditingCommission(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (commission: TCommission) => {
    setEditingCommission(commission);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCommission(null);
    setModalOpen(true);
  };

  const commissionColumns: Column<TCommission>[] = [
    { header: "Commission Rate", accessor: "commision_rate" },
    { header: "Min Hourly Rate", accessor: "minimum_hourly_rate" },
    { header: "Max Hourly Rate", accessor: "maximum_hourly_rate" },
    {
      header: "Created",
      cell: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer hover:text-blue-600 text-sm"
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => toast("Delete not required yet")}
            className="cursor-pointer hover:text-red-600 text-sm"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 flex-wrap gap-5">
        <h1 className="text-2xl font-bold text-gray-900">Commission Management</h1>

        <div className="flex items-center space-x-4 flex-wrap gap-5">
            {
                commissions.length === 0 &&  
                <Button onClick={handleAdd} className="cursor-pointer">
                    Add Commission
                </Button>
            }
         

          <CreateCommission
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
            onSave={handleCreateOrUpdate}
            editingCommission={editingCommission}
          />
        </div>
      </header>

      {/* Table */}
     {
        data &&       <CustomTable columns={commissionColumns} data={commissions} isLoading={isLoading}     emptyMessage={"No Commission Found!"}/>
     }
    </div>
  );
};

export default ManageCommission;
