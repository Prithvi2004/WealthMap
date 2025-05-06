import React from "react";
import { useTheme } from "../../context/ThemeContext";

const PropertiesPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <p>
        This page will display property listings, filters, and search
        capabilities.
      </p>
    </div>
  );
};

export default PropertiesPage;
