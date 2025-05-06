import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Slider, DollarSign, Home, MapPin } from "lucide-react";

interface FilterPanelProps {
  type: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ type }) => {
  const { theme } = useTheme();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    200000, 1000000,
  ]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([1000, 5000]);

  // Property types for the filter
  const propertyTypes = [
    { id: "single_family", label: "Single Family" },
    { id: "multi_family", label: "Multi Family" },
    { id: "condo", label: "Condo" },
    { id: "townhouse", label: "Townhouse" },
    { id: "vacant_land", label: "Vacant Land" },
    { id: "commercial", label: "Commercial" },
    { id: "industrial", label: "Industrial" },
    { id: "agricultural", label: "Agricultural" },
  ];

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else {
      return `$${(price / 1000).toFixed(0)}K`;
    }
  };

  // Render value filter panel
  const renderValuePanel = () => (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div
          className={`
          p-4 rounded-lg
          ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
        `}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm">{formatPrice(priceRange[0])}</span>
            <span className="text-sm">{formatPrice(priceRange[1])}</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-[#5643CC] to-[#00E6FF] rounded-full"
              style={{
                left: `${(priceRange[0] / 2000000) * 100}%`,
                width: `${((priceRange[1] - priceRange[0]) / 2000000) * 100}%`,
              }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{
                left: `${(priceRange[0] / 2000000) * 100}%`,
                top: "50%",
              }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{
                left: `${(priceRange[1] / 2000000) * 100}%`,
                top: "50%",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Transaction Date
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">From</label>
            <input
              type="date"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
          </div>
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">To</label>
            <input
              type="date"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render size filter panel
  const renderSizePanel = () => (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Size Range (sq ft)
        </label>
        <div
          className={`
          p-4 rounded-lg
          ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
        `}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm">{sizeRange[0]} sq ft</span>
            <span className="text-sm">{sizeRange[1]} sq ft</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-[#5643CC] to-[#00E6FF] rounded-full"
              style={{
                left: `${(sizeRange[0] / 6000) * 100}%`,
                width: `${((sizeRange[1] - sizeRange[0]) / 6000) * 100}%`,
              }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{ left: `${(sizeRange[0] / 6000) * 100}%`, top: "50%" }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{ left: `${(sizeRange[1] / 6000) * 100}%`, top: "50%" }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Lot Size</label>
        <div className="grid grid-cols-2 gap-2">
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">Min</label>
            <input
              type="text"
              placeholder="0.1"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
            <span className="absolute right-3 bottom-3 text-xs text-gray-400">
              acres
            </span>
          </div>
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">Max</label>
            <input
              type="text"
              placeholder="10+"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
            <span className="absolute right-3 bottom-3 text-xs text-gray-400">
              acres
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render property type filter panel
  const renderTypePanel = () => (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((propType) => (
            <div
              key={propType.id}
              className={`
                p-3 rounded-lg flex items-center
                ${
                  theme === "dark"
                    ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                    : "bg-gray-50 hover:bg-gray-100"
                }
                cursor-pointer transition-colors duration-200
              `}
            >
              <input type="checkbox" id={propType.id} className="mr-2" />
              <label htmlFor={propType.id} className="text-sm cursor-pointer">
                {propType.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Year Built</label>
        <div className="grid grid-cols-2 gap-2">
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">From</label>
            <input
              type="number"
              placeholder="1900"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
          </div>
          <div
            className={`
            relative p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <label className="block text-xs text-gray-400 mb-1">To</label>
            <input
              type="number"
              placeholder="2023"
              className={`
                w-full bg-transparent border-none p-0 outline-none
                ${theme === "dark" ? "text-white" : "text-gray-900"}
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render location filter panel
  const renderLocationPanel = () => (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Location</label>
        <div
          className={`
          relative p-3 rounded-lg mb-2
          ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
        `}
        >
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={16} />
          </div>
          <input
            type="text"
            placeholder="City, State, or ZIP"
            className={`
              w-full bg-transparent border-none pl-7 outline-none
              ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
          />
        </div>

        <div className="mb-2">
          <label className="block text-xs text-gray-400 mb-1">Radius</label>
          <div
            className={`
            p-3 rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
          `}
          >
            <div className="flex justify-between items-center">
              <input
                type="range"
                min="1"
                max="100"
                defaultValue="25"
                className="w-5/6"
              />
              <span className="text-sm ml-2">25 miles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">State</label>
        <div
          className={`
          relative p-3 rounded-lg
          ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
        `}
        >
          <select
            className={`
            w-full bg-transparent border-none outline-none appearance-none pr-8
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
          >
            <option value="">All States</option>
            <option value="NY">New York</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Render owner filter panel
  const renderOwnerPanel = () => (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Owner Type</label>
        <div className="grid grid-cols-1 gap-2">
          <div
            className={`
            p-3 rounded-lg flex items-center
            ${
              theme === "dark"
                ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                : "bg-gray-50 hover:bg-gray-100"
            }
            cursor-pointer transition-colors duration-200
          `}
          >
            <input type="checkbox" id="individual" className="mr-2" />
            <label htmlFor="individual" className="text-sm cursor-pointer">
              Individual
            </label>
          </div>
          <div
            className={`
            p-3 rounded-lg flex items-center
            ${
              theme === "dark"
                ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                : "bg-gray-50 hover:bg-gray-100"
            }
            cursor-pointer transition-colors duration-200
          `}
          >
            <input type="checkbox" id="company" className="mr-2" />
            <label htmlFor="company" className="text-sm cursor-pointer">
              Company
            </label>
          </div>
          <div
            className={`
            p-3 rounded-lg flex items-center
            ${
              theme === "dark"
                ? "bg-[#0A1128]/50 hover:bg-[#0A1128]/70"
                : "bg-gray-50 hover:bg-gray-100"
            }
            cursor-pointer transition-colors duration-200
          `}
          >
            <input type="checkbox" id="trust" className="mr-2" />
            <label htmlFor="trust" className="text-sm cursor-pointer">
              Trust
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Net Worth Range
        </label>
        <div
          className={`
          p-4 rounded-lg
          ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-50"}
        `}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm">$1M</span>
            <span className="text-sm">$50M+</span>
          </div>
          <div className="relative h-2 bg-gray-700 rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-[#5643CC] to-[#00E6FF] rounded-full"
              style={{ width: "50%" }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{ left: "20%", top: "50%" }}
            ></div>
            <div
              className="absolute w-4 h-4 rounded-full bg-white shadow-md transform -translate-y-1/2 cursor-pointer"
              style={{ left: "70%", top: "50%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilterContent = () => {
    switch (type) {
      case "value":
        return renderValuePanel();
      case "size":
        return renderSizePanel();
      case "type":
        return renderTypePanel();
      case "location":
        return renderLocationPanel();
      case "owner":
        return renderOwnerPanel();
      default:
        return renderValuePanel();
    }
  };

  return <div>{renderFilterContent()}</div>;
};

export default FilterPanel;
