import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BookmarkPlus, ExternalLink } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
  compact?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick, compact = false }) => {
  const { theme } = useTheme();
  
  // Format address for display
  const formattedAddress = `${property.address.city}, ${property.address.state}`;
  
  return (
    <div 
      onClick={onClick}
      className={`
        ${theme === 'dark' 
          ? 'bg-[#171b29]/70 hover:bg-[#171b29] border border-indigo-900/30' 
          : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md'}
        rounded-xl overflow-hidden cursor-pointer transition-all duration-300
      `}
    >
      <div className="relative">
        <img 
          src={property.imageUrls[0]} 
          alt={property.address.street}
          className={`w-full object-cover ${compact ? 'h-32' : 'h-40'}`}
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Add bookmark functionality
            }}
            className="p-1 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
          >
            <BookmarkPlus size={compact ? 16 : 18} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="font-semibold text-white">
            ${property.value.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className={`p-3 ${compact ? 'space-y-1' : 'space-y-2'}`}>
        <h3 className={`font-medium truncate ${compact ? 'text-sm' : 'text-base'}`}>
          {property.address.street}
        </h3>
        <p className={`text-gray-400 ${compact ? 'text-xs' : 'text-sm'}`}>
          {formattedAddress}
        </p>
        
        {!compact && (
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-400">Size:</span>{' '}
              <span>{property.size.area} {property.size.unit}</span>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>{' '}
              <span className="capitalize">{property.type.replace('_', ' ')}</span>
            </div>
          </div>
        )}
        
        {!compact && (
          <div className="flex justify-between items-center border-t pt-2 mt-2">
            <div className="text-xs text-gray-400">
              Last sold: {new Date(property.lastSold.date).toLocaleDateString()}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.open('#', '_blank');
              }}
              className={`
                p-1 rounded-full 
                ${theme === 'dark' ? 'hover:bg-[#0A1128]/50' : 'hover:bg-gray-100'}
              `}
            >
              <ExternalLink size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;