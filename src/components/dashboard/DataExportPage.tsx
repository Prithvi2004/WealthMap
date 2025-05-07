import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Database,
  Clock,
  Settings,
} from "lucide-react";

const DataExportPage = () => {
  const { theme } = useTheme();

  const exportFormats = [
    {
      icon: <FileSpreadsheet size={24} />,
      name: "CSV Export",
      description: "Export data in CSV format for spreadsheet applications",
      format: "csv",
    },
    {
      icon: <FileText size={24} />,
      name: "PDF Report",
      description: "Generate detailed PDF reports with charts and analysis",
      format: "pdf",
    },
    {
      icon: <Database size={24} />,
      name: "Full Database",
      description: "Export complete database in JSON format",
      format: "json",
    },
  ];

  const schedules = [
    {
      name: "Weekly Property Report",
      format: "PDF",
      frequency: "Every Monday at 9:00 AM",
      nextRun: "2024-03-25 09:00:00",
    },
    {
      name: "Monthly Analytics",
      format: "CSV",
      frequency: "First day of each month",
      nextRun: "2024-04-01 00:00:00",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Data Export</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportFormats.map((format, index) => (
          <div
            key={index}
            className={`
              p-6 rounded-xl cursor-pointer transition-all duration-200
              ${
                theme === "dark"
                  ? "bg-[#171b29]/70 border border-indigo-900/30 hover:bg-[#171b29]"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
              }
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`
                p-3 rounded-lg
                ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
              `}
              >
                {format.icon}
              </div>
              <button
                className={`
                p-2 rounded-lg
                ${
                  theme === "dark"
                    ? "bg-[#00E6FF]/20 text-[#00E6FF] hover:bg-[#00E6FF]/30"
                    : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                }
              `}
              >
                <Download size={18} />
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-2">{format.name}</h3>
            <p className="text-gray-400 text-sm">{format.description}</p>
          </div>
        ))}
      </div>

      <div
        className={`
        p-6 rounded-xl
        ${
          theme === "dark"
            ? "bg-[#171b29]/70 border border-indigo-900/30"
            : "bg-white border border-gray-100 shadow-sm"
        }
      `}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`
              p-2 rounded-lg
              ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
            `}
            >
              <Clock
                size={20}
                className={
                  theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                }
              />
            </div>
            <h2 className="text-xl font-semibold">Scheduled Exports</h2>
          </div>
          <button
            className={`
            px-4 py-2 rounded-lg flex items-center space-x-2
            ${
              theme === "dark"
                ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }
          `}
          >
            <Settings size={18} />
            <span>Configure</span>
          </button>
        </div>

        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className={`
                p-4 rounded-lg
                ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{schedule.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {schedule.frequency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{schedule.format}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Next run: {new Date(schedule.nextRun).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataExportPage;
