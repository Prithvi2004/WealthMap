import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { ChevronRight } from "lucide-react";
import { Property } from "../../types";

interface SmallPropertyCardProps {
  property: Property;
  onClick: () => void;
}

const SmallPropertyCard: React.FC<SmallPropertyCardProps> = ({
  property,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`
        p-3 flex items-center justify-between cursor-pointer
        ${theme === "dark" ? "hover:bg-[#0A1128]/50" : "hover:bg-gray-50"}
        transition-colors duration-200
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img
            src={property.imageUrls[0]}
            alt={property.address.street}
            className="w-12 h-12 rounded-lg object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm truncate max-w-[180px]">
            {property.address.street}
          </h3>
          <p className="text-xs text-gray-400">
            {property.address.city}, {property.address.state}
          </p>
          <p className="text-xs mt-1">
            <span className="text-gray-400">Sold: </span>
            <span>${property.lastSold.price.toLocaleString()}</span>
            <span className="text-gray-400 ml-2">
              {new Date(property.lastSold.date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="font-medium">${property.value.toLocaleString()}</div>
        <ChevronRight size={16} className="text-gray-400 mt-2" />
      </div>
    </div>
  );
};

export default SmallPropertyCard;
