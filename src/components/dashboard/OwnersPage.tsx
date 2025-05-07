import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";
import {
  Search,
  Filter,
  SortAsc,
  Users,
  DollarSign,
  Building,
} from "lucide-react";

const OwnersPage = () => {
  const { theme } = useTheme();
  const { owners } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter owners based on search term
  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Owners</h1>
        <div className="flex space-x-2">
          <div
            className={`
            relative rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-100"}
          `}
          >
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search owners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-64 pl-10 pr-4 py-2 rounded-lg border-none
                ${
                  theme === "dark"
                    ? "bg-transparent text-white placeholder-gray-400"
                    : "bg-transparent text-gray-900 placeholder-gray-500"
                }
                focus:outline-none focus:ring-2 focus:ring-[#00E6FF]/50
              `}
            />
          </div>

          <button
            className={`
            p-2 rounded-lg
            ${
              theme === "dark"
                ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }
          `}
          >
            <Filter size={20} />
          </button>

          <button
            className={`
            p-2 rounded-lg
            ${
              theme === "dark"
                ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }
          `}
          >
            <SortAsc size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOwners.map((owner) => (
          <div
            key={owner.id}
            className={`
              p-6 rounded-xl cursor-pointer transition-all duration-200
              ${
                theme === "dark"
                  ? "bg-[#171b29]/70 border border-indigo-900/30 hover:bg-[#171b29]"
                  : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
              }
            `}
          >
            <div className="flex items-center mb-4">
              <div
                className={`
                p-3 rounded-full mr-4
                ${
                  theme === "dark"
                    ? owner.type === "individual"
                      ? "bg-indigo-900/30"
                      : owner.type === "company"
                      ? "bg-[#5643CC]/30"
                      : "bg-[#00E6FF]/20"
                    : owner.type === "individual"
                    ? "bg-indigo-50"
                    : owner.type === "company"
                    ? "bg-purple-50"
                    : "bg-cyan-50"
                }
              `}
              >
                {owner.type === "individual" ? (
                  <Users
                    size={24}
                    className={
                      theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                    }
                  />
                ) : owner.type === "company" ? (
                  <Building
                    size={24}
                    className={
                      theme === "dark" ? "text-[#5643CC]" : "text-purple-600"
                    }
                  />
                ) : (
                  <DollarSign
                    size={24}
                    className={
                      theme === "dark" ? "text-[#00E6FF]" : "text-cyan-600"
                    }
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{owner.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{owner.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Net Worth</p>
                <p className="font-semibold">
                  ${(owner.netWorth.estimate / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Properties</p>
                <p className="font-semibold">{owner.properties.length}</p>
              </div>
            </div>

            <div
              className={`
              p-3 rounded-lg
              ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
            `}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm">Confidence Score</p>
                <p
                  className={`
                  text-sm font-medium
                  ${
                    owner.netWorth.confidenceScore >= 80
                      ? "text-green-500"
                      : owner.netWorth.confidenceScore >= 60
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                `}
                >
                  {owner.netWorth.confidenceScore}%
                </p>
              </div>
              <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    owner.netWorth.confidenceScore >= 80
                      ? "bg-green-500"
                      : owner.netWorth.confidenceScore >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${owner.netWorth.confidenceScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnersPage;
