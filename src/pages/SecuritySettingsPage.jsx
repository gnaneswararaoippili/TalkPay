import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SecuritySettingsPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState(["Google", "Facebook"]);

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    toast.success("Password changed successfully!");
    setNewPassword("");
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast.info(`Two-Factor Authentication ${!is2FAEnabled ? "Enabled" : "Disabled"}`);
  };

  const handleUnlinkAccount = (account) => {
    setLinkedAccounts(linkedAccounts.filter((acc) => acc !== account));
    toast.warn(`${account} unlinked successfully`);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
        />
        <button onClick={handleChangePassword} className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Change Password
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
        <button onClick={handleToggle2FA} className={`w-full mt-3 py-2 rounded-md text-white ${is2FAEnabled ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>
          {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
