import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Share2 } from "lucide-react";

const SharingPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sharing</h1>

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
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 mr-3">
            <Share2 size={20} className="text-indigo-500" />
          </div>
          <h2 className="text-lg font-semibold">Share Properties & Reports</h2>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Select Recipients</label>
          <input
            type="email"
            placeholder="Enter email addresses"
            className={`
              w-full rounded-lg py-2 px-3 mb-4
              ${
                theme === "dark"
                  ? "bg-[#0A1128]/50 border border-gray-700 text-white"
                  : "bg-gray-50 border border-gray-200 text-gray-900"
              }
            `}
          />

          <label className="block text-sm mb-1">Message (Optional)</label>
          <textarea
            rows={3}
            className={`
              w-full rounded-lg py-2 px-3 mb-4
              ${
                theme === "dark"
                  ? "bg-[#0A1128]/50 border border-gray-700 text-white"
                  : "bg-gray-50 border border-gray-200 text-gray-900"
              }
            `}
            placeholder="Add a message..."
          />

          <button
            className={`
              px-4 py-2 rounded-lg font-medium
              ${
                theme === "dark"
                  ? "bg-[#00E6FF] text-[#0A1128]"
                  : "bg-indigo-600 text-white"
              }
            `}
          >
            Send Shared Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharingPage;
