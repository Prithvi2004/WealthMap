import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ReportsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p>
        Create, schedule, and export custom reports based on selected properties
        or owners.
      </p>
    </div>
  );
};

export default ReportsPage;
