import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface CreateCommissionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (formData: any) => void;
  editingCommission?: any | null;
}

const CreateCommission = ({
  isOpen,
  onOpenChange,
  onSave,
  editingCommission,
}: CreateCommissionProps) => {
  const [commissionRate, setCommissionRate] = useState<number>(0);
  const [minHourlyRate, setMinHourlyRate] = useState<number>(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(0);

  useEffect(() => {
    if (editingCommission) {
      setCommissionRate(editingCommission.commision_rate || 0);
      setMinHourlyRate(editingCommission.minimum_hourly_rate || 0);
      setMaxHourlyRate(editingCommission.maximum_hourly_rate || 0);
    } else {
      setCommissionRate(0);
      setMinHourlyRate(0);
      setMaxHourlyRate(0);
    }
  }, [editingCommission]);

  const handleSubmit = () => {
    onSave({
      commisssion_rate: commissionRate,
      minimun_hourly_rate: minHourlyRate,
      maximum_hourly_rate: maxHourlyRate,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCommission ? "Edit Commission" : "Add Commission"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commission Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Hourly Rate
            </label>
            <input
              type="number"
              value={minHourlyRate}
              onChange={(e) => setMinHourlyRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Hourly Rate
            </label>
            <input
              type="number"
              value={maxHourlyRate}
              onChange={(e) => setMaxHourlyRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {editingCommission ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommission;
