import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import {
  ChevronRight,
  DollarSign,
  Building,
  Map as MapIcon,
  Users,
  BarChart3,
  Clock,
  TrendingUp,
} from "lucide-react";
import PropertyCard from "../property/PropertyCard";
import SmallPropertyCard from "../property/SmallPropertyCard";
import WealthSummary from "../analysis/WealthSummary";

interface DashboardProps {
  onPropertySelect: (propertyId: string) => void;
  onOwnerSelect: (ownerId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onPropertySelect,
  onOwnerSelect,
}) => {
  const { properties, owners } = useAppContext();
  const { theme } = useTheme();

  // Top Properties by Value
  const topProperties = [...properties]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  // Recent Transactions
  const recentProperties = [...properties]
    .filter((p) => p.lastSold?.date)
    .sort(
      (a, b) =>
        new Date(b.lastSold.date).getTime() -
        new Date(a.lastSold.date).getTime()
    )
    .slice(0, 6);

  // Top Owners by Net Worth
  const topOwners = [...owners]
    .filter((o) => o.netWorth?.estimate)
    .sort((a, b) => b.netWorth.estimate - a.netWorth.estimate)
    .slice(0, 3);

  // Portfolio Stats
  const totalPortfolioValue = properties.reduce(
    (sum, prop) => sum + prop.value,
    0
  );
  const averagePropertyValue = totalPortfolioValue / properties.length || 0;

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6 max-w-[98vw] mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Properties */}
        <div
          className={`
            backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-[1.02]
            ${
              theme === "dark"
                ? "bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-800 shadow-lg shadow-indigo-900/20"
                : "bg-white border border-gray-100 shadow-md"
            }
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Total Properties
              </p>
              <p className="text-3xl font-bold mt-1">{properties.length}</p>
            </div>
            <div
              className={`
              p-3 rounded-full
              ${theme === "dark" ? "bg-indigo-800/50" : "bg-indigo-100"}
            `}
            >
              <Building
                size={24}
                className={`${
                  theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Explore ownership patterns across US
          </p>
        </div>

        {/* Portfolio Value */}
        <div
          className={`
            backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-[1.02]
            ${
              theme === "dark"
                ? "bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-800 shadow-lg shadow-emerald-900/20"
                : "bg-white border border-gray-100 shadow-md"
            }
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Portfolio Value
              </p>
              <p className="text-3xl font-bold mt-1">
                ${(totalPortfolioValue / 1e6).toFixed(1)}M
              </p>
            </div>
            <div
              className={`
              p-3 rounded-full
              ${theme === "dark" ? "bg-emerald-800/50" : "bg-emerald-100"}
            `}
            >
              <DollarSign
                size={24}
                className={`${
                  theme === "dark" ? "text-emerald-300" : "text-emerald-600"
                }`}
              />
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Estimated value of all holdings
          </p>
        </div>

        {/* Average Value */}
        <div
          className={`
            backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-[1.02]
            ${
              theme === "dark"
                ? "bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-800 shadow-lg shadow-purple-900/20"
                : "bg-white border border-gray-100 shadow-md"
            }
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Average Value
              </p>
              <p className="text-3xl font-bold mt-1">
                ${(averagePropertyValue / 1e3).toFixed(0)}K
              </p>
            </div>
            <div
              className={`
              p-3 rounded-full
              ${theme === "dark" ? "bg-purple-800/50" : "bg-purple-100"}
            `}
            >
              <BarChart3
                size={24}
                className={`${
                  theme === "dark" ? "text-purple-300" : "text-purple-600"
                }`}
              />
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Per property valuation trend
          </p>
        </div>

        {/* Total Owners */}
        <div
          className={`
            backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-[1.02]
            ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/20 border border-blue-800 shadow-lg shadow-blue-900/20"
                : "bg-white border border-gray-100 shadow-md"
            }
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Total Owners
              </p>
              <p className="text-3xl font-bold mt-1">{owners.length}</p>
            </div>
            <div
              className={`
              p-3 rounded-full
              ${theme === "dark" ? "bg-blue-800/50" : "bg-blue-100"}
            `}
            >
              <Users
                size={24}
                className={`${
                  theme === "dark" ? "text-blue-300" : "text-blue-600"
                }`}
              />
            </div>
          </div>
          <p
            className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Unique property holders in database
          </p>
        </div>
      </div>

      {/* High-Value Properties Section */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">High-Value Properties</h2>
          <button
            onClick={() => onPropertySelect(topProperties[0]?.id)}
            className={`
              flex items-center text-sm font-medium transition-colors duration-200
              ${
                theme === "dark"
                  ? "text-[#00E6FF] hover:text-[#1aebff]"
                  : "text-indigo-600 hover:text-indigo-700"
              }
            `}
          >
            View All <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertySelect(property.id)}
            />
          ))}
        </div>
      </section>

      {/* Owners + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wealthy Owners */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Top Owners</h2>
            <button
              className={`
                flex items-center text-sm font-medium transition-colors duration-200
                ${
                  theme === "dark"
                    ? "text-[#00E6FF] hover:text-[#1aebff]"
                    : "text-indigo-600 hover:text-indigo-700"
                }
              `}
            >
              View All <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {topOwners.map((owner) => (
              <div
                key={owner.id}
                onClick={() => onOwnerSelect(owner.id)}
                className={`
                  backdrop-blur-sm p-4 rounded-xl cursor-pointer transition-all duration-200 transform hover:translate-x-1 hover:shadow-lg
                  ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-indigo-900/40 to-purple-900/20 border border-indigo-800/40"
                      : "bg-white border border-gray-100 shadow-sm"
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{owner.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">
                      {owner.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(owner.netWorth.estimate / 1e6).toFixed(1)}M
                    </p>
                    <p className="text-xs text-gray-400">Net Worth</p>
                  </div>
                </div>
                <div className="mt-3">
                  <WealthSummary wealthSources={owner.wealthSources} />
                </div>
                <div className="mt-3 text-sm">
                  <p className={`text-gray-400`}>
                    Properties:{" "}
                    <span className="font-medium">
                      {owner.properties.length}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Recent Transactions</h2>
            <button
              className={`
                flex items-center text-sm font-medium transition-colors duration-200
                ${
                  theme === "dark"
                    ? "text-[#00E6FF] hover:text-[#1aebff]"
                    : "text-indigo-600 hover:text-indigo-700"
                }
              `}
            >
              View All <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div
            className={`
              rounded-xl overflow-hidden
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-800/40"
                  : "bg-white border border-gray-100 shadow-sm"
              }
            `}
          >
            <div className="divide-y divide-gray-800/10">
              {recentProperties.map((property) => (
                <SmallPropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => onPropertySelect(property.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map CTA */}
      <div
        className={`
          relative group overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.01]
          ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-900/40 to-purple-900/30 border border-indigo-700 shadow-lg shadow-indigo-900/20"
              : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-md"
          }
        `}
        onClick={() =>
          document.querySelector('button[data-view="map"]')?.click()
        }
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Explore Property Map</h2>
            <p className={`text-sm opacity-80 mt-1 max-w-md`}>
              Visualize ownership and wealth distribution across the United
              States.
            </p>
          </div>
          <button
            className={`
              mt-4 sm:mt-0 px-5 py-2.5 rounded-lg flex items-center space-x-2 font-medium
              ${
                theme === "dark"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-500 hover:to-blue-400"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400"
              }
              transition-all duration-200 shadow-md hover:shadow-lg
            `}
          >
            <span>Open Map</span>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="absolute right-5 bottom-5 opacity-10 group-hover:opacity-20 transition-opacity">
          <MapIcon size={80} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
