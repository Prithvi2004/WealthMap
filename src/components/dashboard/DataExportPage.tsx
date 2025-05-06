import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Download } from "lucide-react";

const DataExportPage: React.FC = () => {
  const { properties, owners } = useAppContext();
  const { theme } = useTheme();

  const handleExport = (type: string) => {
    const data =
      type === "properties"
        ? JSON.stringify(properties, null, 2)
        : JSON.stringify(owners, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}_export_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Data Export</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Properties */}
        <div
          className={`
            p-6 rounded-xl flex flex-col justify-between
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-800"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
        >
          <div>
            <h2 className="text-lg font-semibold mb-2">Export Properties</h2>
            <p className="text-sm text-gray-400 mb-4">
              Download all property records in JSON format.
            </p>
          </div>
          <button
            onClick={() => handleExport("properties")}
            className={`
              flex items-center justify-center py-2 px-4 rounded-lg
              ${
                theme === "dark"
                  ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }
            `}
          >
            <Download size={18} className="mr-2" />
            Export Property Data
          </button>
        </div>

        {/* Export Owners */}
        <div
          className={`
            p-6 rounded-xl flex flex-col justify-between
            ${
              theme === "dark"
                ? "bg-[#171b29]/70 border border-indigo-800"
                : "bg-white border border-gray-100 shadow-sm"
            }
          `}
        >
          <div>
            <h2 className="text-lg font-semibold mb-2">Export Owners</h2>
            <p className="text-sm text-gray-400 mb-4">
              Download all owner records in JSON format.
            </p>
          </div>
          <button
            onClick={() => handleExport("owners")}
            className={`
              flex items-center justify-center py-2 px-4 rounded-lg
              ${
                theme === "dark"
                  ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }
            `}
          >
            <Download size={18} className="mr-2" />
            Export Owner Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExportPage;
