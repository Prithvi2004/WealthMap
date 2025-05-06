import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { User, DollarSign } from "lucide-react";

const OwnersPage: React.FC = () => {
  const { owners } = useAppContext();
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Property Owners</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {owners.length > 0 ? (
          owners.map((owner) => (
            <div
              key={owner.id}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-200
                ${
                  theme === "dark"
                    ? "bg-[#171b29]/70 border border-indigo-800 hover:bg-[#171b29]"
                    : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
                }
              `}
            >
              <div className="flex items-center mb-3">
                <div
                  className={`
                    p-3 rounded-full mr-3
                    ${theme === "dark" ? "bg-indigo-900/30" : "bg-indigo-50"}
                  `}
                >
                  <User
                    size={20}
                    className={
                      theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                    }
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{owner.name}</h3>
                  <p className="text-sm text-gray-400 capitalize">
                    {owner.type}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-400">Net Worth</p>
                  <p className="text-lg font-bold">
                    ${(owner.netWorth.estimate / 1e6).toFixed(1)}M
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Confidence</p>
                  <p className="text-lg font-bold">
                    {owner.netWorth.confidenceScore}%
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No owners found.</p>
        )}
      </div>
    </div>
  );
};

export default OwnersPage;
