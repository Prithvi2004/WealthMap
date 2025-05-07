import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FileText,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

const ReportsPage = () => {
  const { theme } = useTheme();

  const reports = [
    {
      id: 1,
      name: "Q1 2024 Portfolio Analysis",
      type: "Quarterly Report",
      status: "completed",
      date: "2024-03-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Market Trends Analysis",
      type: "Custom Report",
      status: "processing",
      date: "2024-03-20",
      size: "Processing...",
    },
    {
      id: 3,
      name: "Property Valuation Summary",
      type: "Monthly Report",
      status: "completed",
      date: "2024-03-01",
      size: "1.8 MB",
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Portfolio Overview",
      description: "Comprehensive analysis of property portfolio performance",
      type: "Standard",
    },
    {
      id: 2,
      name: "Market Analysis",
      description: "Detailed market trends and competitive analysis",
      type: "Premium",
    },
    {
      id: 3,
      name: "Investment Summary",
      description: "ROI and investment performance metrics",
      type: "Standard",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
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
          <PlusCircle size={18} />
          <span>New Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div
            className={`
            rounded-xl overflow-hidden
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-900/30"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
          >
            <div className="p-4 border-b border-gray-800/20">
              <h2 className="text-lg font-semibold">Recent Reports</h2>
            </div>
            <div className="divide-y divide-gray-800/20">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`
                      p-2 rounded-lg
                      ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
                    `}
                    >
                      <FileText
                        size={20}
                        className={
                          theme === "dark"
                            ? "text-indigo-300"
                            : "text-indigo-600"
                        }
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-gray-400">{report.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {report.status === "completed" ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Clock size={16} className="text-yellow-500" />
                        )}
                        <span className="text-sm capitalize">
                          {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{report.size}</p>
                    </div>
                    {report.status === "completed" && (
                      <button
                        className={`
                        p-2 rounded-lg
                        ${
                          theme === "dark"
                            ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                            : "bg-gray-100 hover:bg-gray-200"
                        }
                      `}
                      >
                        <Download size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
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
            <h2 className="text-lg font-semibold mb-4">Report Templates</h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`
                    p-4 rounded-lg cursor-pointer transition-all duration-200
                    ${
                      theme === "dark"
                        ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                        : "bg-gray-50 hover:bg-gray-100"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                    <span
                      className={`
                      text-xs px-2 py-1 rounded-full
                      ${
                        template.type === "Premium"
                          ? theme === "dark"
                            ? "bg-[#00E6FF]/20 text-[#00E6FF]"
                            : "bg-indigo-100 text-indigo-600"
                          : theme === "dark"
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }
                    `}
                    >
                      {template.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`
                p-2 rounded-lg
                ${theme === "dark" ? "bg-yellow-900/30" : "bg-yellow-50"}
              `}
              >
                <AlertCircle
                  size={20}
                  className={
                    theme === "dark" ? "text-yellow-300" : "text-yellow-600"
                  }
                />
              </div>
              <h2 className="text-lg font-semibold">Storage Usage</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used Space</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5643CC] to-[#00E6FF]"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">15.6 GB of 20 GB used</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
