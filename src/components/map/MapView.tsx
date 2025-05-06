import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Layers,
  Filter,
  Bookmark,
  ChevronRight,
  X,
  Search,
} from "lucide-react";
import FilterPanel from "./FilterPanel";
import PropertyCard from "../property/PropertyCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface MapViewProps {
  onPropertySelect: (propertyId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ onPropertySelect }) => {
  const { properties } = useAppContext();
  const { theme } = useTheme();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState<string>("value");
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // For demonstration purposes, show 4 random properties in the panel
  const featuredProperties = properties.slice(0, 4);
  const selectedPropertyData = selectedProperty
    ? properties.find((p) => p.id === selectedProperty)
    : null;

  // Map defaults
  const center: LatLngExpression = [39.8283, -98.5795]; // Center of USA
  const zoom = 4;

  return (
    <div className="h-[calc(100vh-8rem)] relative overflow-hidden flex flex-col">
      {/* Map Header with Controls */}
      <div
        className={`
        flex justify-between items-center p-3 rounded-t-xl
        ${
          theme === "dark"
            ? "bg-[#171b29]/90 border-b border-indigo-900/30"
            : "bg-white border-b border-gray-200"
        }
      `}
      >
        <div className="flex space-x-2">
          <button
            className={`
            p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
            ${
              theme === "dark"
                ? "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }
          `}
          >
            <Layers size={18} />
            <span className="text-sm font-medium hidden sm:inline">
              Map Layers
            </span>
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
              ${
                showFilters
                  ? theme === "dark"
                    ? "bg-[#00E6FF]/20 text-[#00E6FF]"
                    : "bg-indigo-100 text-indigo-700"
                  : theme === "dark"
                  ? "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }
            `}
          >
            <Filter size={18} />
            <span className="text-sm font-medium hidden sm:inline">
              Filters
            </span>
          </button>
          <button
            className={`
            p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2
            ${
              theme === "dark"
                ? "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
            }
          `}
          >
            <Bookmark size={18} />
            <span className="text-sm font-medium hidden sm:inline">
              Saved Views
            </span>
          </button>
        </div>
        <div className="relative">
          <div
            className={`
            flex items-center relative rounded-lg
            ${theme === "dark" ? "bg-[#0A1128]/50" : "bg-gray-100"}
            py-1 px-3
          `}
          >
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search address, owner..."
              className={`
                bg-transparent border-none outline-none px-2 py-1 w-full
                ${
                  theme === "dark"
                    ? "placeholder:text-gray-500 text-white"
                    : "placeholder:text-gray-400 text-gray-900"
                }
              `}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area with Map and Panels */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Leaflet Map */}
        <MapContainer center={center} zoom={zoom} className="w-full h-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            className={theme === "dark" ? "brightness-75" : ""}
          />
          {/* Render property markers */}
          {properties.map((property) => {
            if (!property.latitude || !property.longitude) return null;
            return (
              <Marker
                key={property.id}
                position={[
                  parseFloat(property.latitude),
                  parseFloat(property.longitude),
                ]}
                eventHandlers={{
                  click: () => setSelectedProperty(property.id),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{property.address.street}</strong>
                    <br />
                    {property.address.city}, {property.address.state}{" "}
                    {property.address.zipCode}
                    <br />
                    Value: ${property.value.toLocaleString()}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Right Panel - Property Information */}
        <div
          className={`
          w-96 border-l transform transition-transform duration-300 ease-in-out overflow-auto absolute right-0 top-0 bottom-0 z-10
          ${selectedProperty ? "translate-x-0" : "translate-x-full"}
          ${
            theme === "dark"
              ? "bg-[#171b29]/90 border-indigo-900/30"
              : "bg-white border-gray-200"
          }
        `}
        >
          {selectedPropertyData && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Property Details</h2>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className={`
                    p-1 rounded-full
                    ${
                      theme === "dark"
                        ? "hover:bg-indigo-900/50"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedPropertyData.imageUrls[0]}
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-lg">
                  {selectedPropertyData.address.street}
                </h3>
                <p className="text-gray-400">
                  {selectedPropertyData.address.city},{" "}
                  {selectedPropertyData.address.state}{" "}
                  {selectedPropertyData.address.zipCode}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div
                  className={`
                  p-3 rounded-lg
                  ${theme === "dark" ? "bg-[#0A1128]/70" : "bg-gray-50"}
                `}
                >
                  <p className="text-sm text-gray-400">Value</p>
                  <p className="font-semibold">
                    ${selectedPropertyData.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`
                  p-3 rounded-lg
                  ${theme === "dark" ? "bg-[#0A1128]/70" : "bg-gray-50"}
                `}
                >
                  <p className="text-sm text-gray-400">Size</p>
                  <p className="font-semibold">
                    {selectedPropertyData.size.area}{" "}
                    {selectedPropertyData.size.unit}
                  </p>
                </div>
                <div
                  className={`
                  p-3 rounded-lg
                  ${theme === "dark" ? "bg-[#0A1128]/70" : "bg-gray-50"}
                `}
                >
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-semibold capitalize">
                    {selectedPropertyData.type.replace("_", " ")}
                  </p>
                </div>
                <div
                  className={`
                  p-3 rounded-lg
                  ${theme === "dark" ? "bg-[#0A1128]/70" : "bg-gray-50"}
                `}
                >
                  <p className="text-sm text-gray-400">Year Built</p>
                  <p className="font-semibold">
                    {selectedPropertyData.yearBuilt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onPropertySelect(selectedPropertyData.id)}
                className={`
                  w-full py-2 rounded-lg transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }
                `}
              >
                View Full Details
              </button>
            </div>
          )}
        </div>

        {/* Left Panel - Filters */}
        <div
          className={`
          absolute left-0 top-0 bottom-0 w-72 border-r transform transition-transform duration-300 ease-in-out overflow-auto z-10
          ${showFilters ? "translate-x-0" : "-translate-x-full"}
          ${
            theme === "dark"
              ? "bg-[#171b29]/90 border-indigo-900/30"
              : "bg-white border-gray-200"
          }
        `}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className={`
                  p-1 rounded-full
                  ${
                    theme === "dark"
                      ? "hover:bg-indigo-900/50"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                <X size={18} />
              </button>
            </div>
            <div className="mb-4">
              <div className="flex border-b mb-4">
                {["value", "size", "type", "location", "owner"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedFilterTab(tab)}
                    className={`
                      px-3 py-2 text-sm font-medium transition-colors duration-200
                      ${
                        selectedFilterTab === tab
                          ? theme === "dark"
                            ? "border-b-2 border-[#00E6FF] text-[#00E6FF]"
                            : "border-b-2 border-indigo-600 text-indigo-600"
                          : "text-gray-400 hover:text-gray-300"
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <FilterPanel type={selectedFilterTab} />
            </div>
            <div className="mt-4 space-y-2">
              <button
                className={`
                w-full py-2 rounded-lg transition-colors duration-200
                ${
                  theme === "dark"
                    ? "bg-[#00E6FF] hover:bg-[#1aebff] text-[#0A1128]"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }
              `}
              >
                Apply Filters
              </button>
              <button
                className={`
                w-full py-2 rounded-lg transition-colors duration-200
                ${
                  theme === "dark"
                    ? "bg-transparent hover:bg-[#0A1128]/50 text-gray-300 border border-gray-700"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                }
              `}
              >
                Save Current Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Featured Properties */}
      <div
        className={`
        p-4 border-t
        ${
          theme === "dark"
            ? "bg-[#171b29]/90 border-indigo-900/30"
            : "bg-white border-gray-200"
        }
      `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Properties</h2>
          <button className="flex items-center text-sm font-medium text-[#00E6FF] hover:text-[#1aebff]">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertySelect(property.id)}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
