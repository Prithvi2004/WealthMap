import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Building, Filter } from "lucide-react";

const PropertiesPage: React.FC = () => {
  const { properties } = useAppContext();
  const { theme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Properties</h1>

      <div className="flex justify-between items-center mb-4">
        <div
          className={`
            p-3 rounded-lg flex items-center space-x-2 w-full max-w-md
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-100"}
          `}
        >
          <Filter size={18} className="text-gray-400" />
          <input
            placeholder="Search properties..."
            className={`bg-transparent outline-none w-full ${
              theme === "dark"
                ? "placeholder:text-gray-500 text-white"
                : "placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`
              p-4 rounded-xl
              ${
                theme === "dark"
                  ? "bg-[#171b29]/70 border border-indigo-800"
                  : "bg-white border border-gray-100 shadow-sm"
              }
            `}
          >
            <img
              src={property.imageUrls[0]}
              alt={property.address.street}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold">{property.address.street}</h3>
            <p className="text-sm text-gray-400">
              {property.address.city}, {property.address.state}
            </p>
            <p className="mt-2 font-bold">${property.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
