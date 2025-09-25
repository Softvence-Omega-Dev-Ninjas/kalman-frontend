import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsPage: React.FC = () => {
  const [commissionRate, setCommissionRate] = useState<number>(5);
  const [minServiceRate, setMinServiceRate] = useState<number>(20);
  const [maxServiceRate, setMaxServiceRate] = useState<number>(200);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [newRegistrations, setNewRegistrations] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [passwordExpiry, setPasswordExpiry] = useState<number>(90);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState<number>(5);
  const [sessionTimeout, setSessionTimeout] = useState<number>(30);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(true);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <div className="bg-white rounded-lg p-5">
          <div>
            <h1 className="text-xl font-semibold mb-5">Platform Settings</h1>
          </div>
          <div>
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
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-8">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div>
              <h1 className="text-xl font-semibold mb-5">
                Notification Settings
              </h1>
            </div>
            <div>
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
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div>
              <h1 className="text-xl font-semibold mb-5">Security Settings</h1>
            </div>
            <div>
              <div className="mb-6">
                <Label htmlFor="passwordExpiry" className="mb-2">
                  Password Expiry (Days)
                </Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={passwordExpiry}
                  onChange={(e) => setPasswordExpiry(Number(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="maxLoginAttempts" className="mb-2">
                    Max Login Attempts
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={maxLoginAttempts}
                    onChange={(e) =>
                      setMaxLoginAttempts(Number(e.target.value))
                    }
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

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-2">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-gray-500">
                    Require 2FA for all accounts
                  </p>
                </div>
                <Switch
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
