import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Settings } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div
        className={`
          p-6 rounded-xl
          ${
            theme === "dark"
              ? "bg-[#171b29]/70 border border-indigo-800"
              : "bg-white border border-gray-100 shadow-sm"
          }
        `}
      >
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-lg bg-indigo-500/10 mr-3">
            <Settings size={20} className="text-indigo-500" />
          </div>
          <h2 className="text-lg font-semibold">Account Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm">Dark Mode</label>
            <button className="relative inline-flex items-center h-6 rounded-full w-12 bg-gray-700">
              <span className="inline-block w-4 h-4 transform translate-x-1 bg-white rounded-full transition" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm">Email Notifications</label>
            <button className="relative inline-flex items-center h-6 rounded-full w-12 bg-green-700">
              <span className="inline-block w-4 h-4 transform translate-x-7 bg-white rounded-full transition" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm">Default Map View</label>
            <select className="bg-transparent border border-gray-500 rounded px-3 py-1 text-sm">
              <option>Standard</option>
              <option>Satellite</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
