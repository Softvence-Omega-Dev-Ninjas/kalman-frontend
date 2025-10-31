import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { useGetCommisionQuery, useSetCommisionMutation } from "@/redux/features/admin/commissionApi";
import { useGetSystemActivityQuery, useSetSystemActivityMutation } from "@/redux/features/admin/dashboardApi";

const SettingsPage: React.FC = () => {


       useEffect(()=>{
              document.title = `Setting | Admin Dashboard | Stavbar`
            }, [])

  // --- Commission ---
  const { data: commissionData, isLoading: commissionLoading, refetch } = useGetCommisionQuery();
  const [setCommission, { isLoading: savingCommission }] = useSetCommisionMutation();

  // --- System Activity ---
  const { data: systemActivityData, isLoading: systemLoading, refetch: refetchSystem } =
    useGetSystemActivityQuery();
  const [setSystemActivity, { isLoading: savingSystem }] = useSetSystemActivityMutation();

  // --- Commission States ---
  const [commissionRate, setCommissionRate] = useState<number>();
  const [minServiceRate, setMinServiceRate] = useState<number>();
  const [maxServiceRate, setMaxServiceRate] = useState<number>();

  // --- System Activity States ---
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [newRegistrations, setNewRegistrations] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState<number>(5);
  const [sessionTimeout, setSessionTimeout] = useState<number>(30);

  // --- Load Commission ---
  useEffect(() => {
    if (commissionData?.data) {
      const info = Array.isArray(commissionData.data)
        ? commissionData.data[0]
        : commissionData.data;
      if (info) {
        setCommissionRate(Number(info.commision_rate) || 0);
        setMinServiceRate(Number(info.minimum_hourly_rate) || 0);
        setMaxServiceRate(Number(info.maximum_hourly_rate) || 0);
      }
    }
  }, [commissionData]);

  // --- Load System Activity ---
  useEffect(() => {
    if (systemActivityData?.data) {
      const sys = systemActivityData.data;
      setMaintenanceMode(sys.maintenance_mode);
      setNewRegistrations(sys.new_registration);
      setMaxLoginAttempts(sys.maximum_attempt);
      setSessionTimeout(sys.session_timeout);
      setNotifications(sys.admin_notication);
    }
  }, [systemActivityData]);

  // --- Save Commission ---
  const handleSaveCommission = async () => {
    try {
      await setCommission({
        commisssion_rate: commissionRate,
        minimun_hourly_rate: minServiceRate,
        maximum_hourly_rate: maxServiceRate,
      }).unwrap();
      toast.success("Commission updated successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update commission!");
    }
  };

  // --- Save System Activity ---
  const handleSaveSystemActivity = async () => {
    try {
      await setSystemActivity({
        maximum_attempt: maxLoginAttempts,
        session_timeout: sessionTimeout,
        maintenance_mode: maintenanceMode,
        new_registration: newRegistrations,
      }).unwrap();
      toast.success("System settings updated!");
      refetchSystem();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update system settings!");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <div className="bg-white rounded-lg p-5">
          <h1 className="text-xl font-semibold mb-5">Platform Settings</h1>

          <div className="mb-6">
            <Label htmlFor="commissionRate" className="mb-2">
              Commission Rate (%)
            </Label>
            <Input
              id="commissionRate"
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Platform commission on Tradespeople
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="minServiceRate" className="mb-2">
                Minimum Service hour rate ($)
              </Label>
              <Input
                id="minServiceRate"
                type="number"
                value={minServiceRate}
                onChange={(e) => setMinServiceRate(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxServiceRate" className="mb-2">
                Maximum Service hour rate ($)
              </Label>
              <Input
                id="maxServiceRate"
                type="number"
                value={maxServiceRate}
                onChange={(e) => setMaxServiceRate(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            onClick={handleSaveCommission}
            disabled={savingCommission || commissionLoading}
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            {savingCommission ? "Saving..." : "Save Commission Settings"}
          </Button>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-8">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h1 className="text-xl font-semibold mb-5">Notification Settings</h1>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-2">Notifications</p>
                <p className="text-xs text-gray-500">
                  Send email alerts for admin events
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>

          {/* Security & System Activity */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h1 className="text-xl font-semibold mb-5">Security Settings</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="maxLoginAttempts" className="mb-2">
                  Max Login Attempts
                </Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={maxLoginAttempts}
                  onChange={(e) => setMaxLoginAttempts(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout" className="mb-2">
                  Session Timeout (Minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2">Maintenance Mode</p>
                  <p className="text-xs text-gray-500">
                    Disable platform for maintenance
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2">New Registrations</p>
                  <p className="text-xs text-gray-500">
                    Allow new user registrations
                  </p>
                </div>
                <Switch
                  checked={newRegistrations}
                  onCheckedChange={setNewRegistrations}
                />
              </div>

              <Button
                onClick={handleSaveSystemActivity}
                disabled={savingSystem || systemLoading}
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                {savingSystem ? "Saving..." : "Save System Settings"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
