import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FileText, Clock } from "lucide-react";

const ReportsPage: React.FC = () => {
  const { theme } = useTheme();

  const scheduledReports = [
    {
      id: 1,
      name: "Monthly Ownership Report",
      frequency: "monthly",
      lastRun: "2024-10-15",
    },
    {
      id: 2,
      name: "High Value Properties",
      frequency: "weekly",
      lastRun: "2024-10-14",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

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
            <FileText size={20} className="text-indigo-500" />
          </div>
          <h2 className="text-lg font-semibold">Scheduled Reports</h2>
        </div>

        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <div
              key={report.id}
              className={`
                p-4 rounded-lg flex justify-between items-center
                ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
              `}
            >
              <div>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-gray-400">
                  Frequency: {report.frequency} • Last run: {report.lastRun}
                </p>
              </div>
              <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">
                View
              </button>
            </div>
          ))}

          <button
            className={`
              w-full py-3 mt-4 rounded-lg border
              ${
                theme === "dark"
                  ? "border-dashed border-indigo-500 hover:border-indigo-400"
                  : "border-dashed border-gray-300 hover:border-gray-400"
              }
            `}
          >
            + Create New Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
