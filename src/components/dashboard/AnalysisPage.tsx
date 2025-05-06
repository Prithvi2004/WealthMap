import React from "react";
import { useTheme } from "../../context/ThemeContext";

const AnalysisPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-4">Wealth & Property Analysis</h1>
      <p>
        Visualize ownership trends, wealth distribution, and property valuation
        patterns.
      </p>
    </div>
  );
};

export default AnalysisPage;
