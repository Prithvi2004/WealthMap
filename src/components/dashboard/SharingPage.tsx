import React from "react";
import { useTheme } from "../../context/ThemeContext";

const SharingPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      <h1 className="text-2xl font-bold mb-4">Sharing</h1>
      <p>
        Share properties and reports with team members or external contacts.
      </p>
    </div>
  );
};

export default SharingPage;
