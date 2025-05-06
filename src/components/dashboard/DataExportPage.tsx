import React from "react";
import { useTheme } from "../../context/ThemeContext";

const DataExportPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-4">Data Export</h1>
      <p>Export property and owner data in CSV, PDF, or Excel format.</p>
    </div>
  );
};

export default DataExportPage;
