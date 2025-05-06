import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ChevronLeft, 
  DollarSign, 
  User, 
  Building, 
  Briefcase, 
  PieChart, 
  BarChart3,
  Download,
  Share2,
  Users
} from 'lucide-react';
import WealthSummary from './WealthSummary';
import PropertyCard from '../property/PropertyCard';

interface WealthAnalysisProps {
  ownerId: string;
  onPropertySelect: (propertyId: string) => void;
  onBack: () => void;
}

const WealthAnalysis: React.FC<WealthAnalysisProps> = ({ 
  ownerId, 
  onPropertySelect,
  onBack
}) => {
  const { owners, properties } = useAppContext();
  const { theme } = useTheme();
  const [compareMode, setCompareMode] = useState(false);
  const [compareOwner, setCompareOwner] = useState<string | null>(null);
  
  // Get owner data
  const owner = owners.find(o => o.id === ownerId);
  
  // Get properties owned by this owner
  const ownedProperties = properties.filter(p => owner?.properties.includes(p.id));
  
  // Get owner to compare with (if in compare mode)
  const comparisonOwner = compareOwner ? owners.find(o => o.id === compareOwner) : null;
  
  if (!owner) {
    return <div>Owner not found</div>;
  }
  
  return (
    <div className="h-[calc(100vh-8rem)] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className={`
            flex items-center space-x-2 py-1 px-3 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setCompareMode(!compareMode)}
            className={`
              py-1 px-3 rounded-lg flex items-center
              ${compareMode
                ? theme === 'dark'
                  ? 'bg-[#00E6FF]/20 text-[#00E6FF]'
                  : 'bg-indigo-100 text-indigo-700'
                : theme === 'dark'
                ? 'hover:bg-indigo-900/30 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
              }
            `}
          >
            <Users size={16} className="mr-2" />
            <span>Compare</span>
          </button>
          
          <button className={`
            p-2 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}>
            <Download size={18} />
          </button>
          
          <button className={`
            p-2 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}>
            <Share2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className={`
          p-6 rounded-xl
          ${theme === 'dark' 
            ? 'bg-[#171b29]/70 border border-indigo-900/30' 
            : 'bg-white border border-gray-100 shadow-sm'}
        `}>
          <div className="flex items-center mb-4">
            <div className={`
              p-3 rounded-full mr-4
              ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
            `}>
              <User size={24} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{owner.name}</h1>
              <p className="text-gray-400 capitalize">{owner.type}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Primary Address</p>
            </div>
            <p>
              {owner.primaryAddress.street}, {owner.primaryAddress.city}, {owner.primaryAddress.state} {owner.primaryAddress.zipCode}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Associations</p>
            </div>
            <div className="space-y-2">
              {owner.associations.map((association, index) => (
                <div 
                  key={index}
                  className={`
                    p-3 rounded-lg
                    ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                  `}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{association.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{association.type}</p>
                    </div>
                    {association.role && (
                      <p className="text-sm">{association.role}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {compareMode && !compareOwner && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Compare With</p>
              </div>
              <div className={`
                p-3 rounded-lg
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <select 
                  className={`
                    w-full bg-transparent border-none outline-none
                    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  `}
                  onChange={(e) => setCompareOwner(e.target.value)}
                  value=""
                >
                  <option value="" disabled>Select an owner to compare</option>
                  {owners.filter(o => o.id !== owner.id).map(o => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        <div className={`
          p-6 rounded-xl
          ${theme === 'dark' 
            ? 'bg-[#171b29]/70 border border-indigo-900/30' 
            : 'bg-white border border-gray-100 shadow-sm'}
        `}>
          <div className="flex items-center mb-4">
            <div className={`
              p-3 rounded-full mr-4
              ${theme === 'dark' ? 'bg-[#5643CC]/30' : 'bg-[#5643CC]/10'}
            `}>
              <DollarSign size={24} className={theme === 'dark' ? 'text-[#5643CC]' : 'text-[#5643CC]'} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Net Worth</h2>
              <p className="text-gray-400">Estimated total assets</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">
                  ${(owner.netWorth.estimate / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-gray-400">Total Estimated Value</p>
              </div>
              <div className={`
                py-1 px-3 rounded-lg text-sm
                ${theme === 'dark' ? 'bg-[#0A1128]/70' : 'bg-gray-100'}
              `}>
                Confidence: {owner.netWorth.confidenceScore}%
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Wealth Distribution</p>
            </div>
            <WealthSummary wealthSources={owner.wealthSources} />
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              {owner.wealthSources.map((source, index) => (
                <div 
                  key={index}
                  className={`
                    p-3 rounded-lg
                    ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                  `}
                >
                  <p className="text-xs text-gray-400 capitalize">{source.type.replace('_', ' ')}</p>
                  <p className="font-medium">${(source.value / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-400">{source.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {comparisonOwner ? (
          <div className={`
            p-6 rounded-xl
            ${theme === 'dark' 
              ? 'bg-[#171b29]/70 border border-indigo-900/30' 
              : 'bg-white border border-gray-100 shadow-sm'}
          `}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`
                  p-3 rounded-full mr-4
                  ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}
                `}>
                  <Users size={24} className={theme === 'dark' ? 'text-purple-300' : 'text-purple-600'} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{comparisonOwner.name}</h2>
                  <p className="text-gray-400 capitalize">{comparisonOwner.type}</p>
                </div>
              </div>
              <button 
                onClick={() => setCompareOwner(null)}
                className="text-sm font-medium text-[#00E6FF]"
              >
                Clear
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold">
                    ${(comparisonOwner.netWorth.estimate / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-400">Total Estimated Value</p>
                </div>
                <div className={`
                  py-1 px-3 rounded-lg text-sm
                  ${theme === 'dark' ? 'bg-[#0A1128]/70' : 'bg-gray-100'}
                `}>
                  Confidence: {comparisonOwner.netWorth.confidenceScore}%
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Wealth Distribution</p>
              </div>
              <WealthSummary wealthSources={comparisonOwner.wealthSources} />
              
              <div className="mt-4">
                <div className={`
                  p-3 rounded-lg
                  ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                `}>
                  <p className="text-sm font-medium mb-2">Wealth Comparison</p>
                  <div className="flex items-center">
                    <div className="w-1/2 text-center">
                      <p className="text-xs text-gray-400 mb-1">{owner.name}</p>
                      <p className="font-medium">${(owner.netWorth.estimate / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="w-1/2 text-center">
                      <p className="text-xs text-gray-400 mb-1">{comparisonOwner.name}</p>
                      <p className="font-medium">${(comparisonOwner.netWorth.estimate / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="mt-3 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5643CC] to-[#00E6FF]"
                      style={{ 
                        width: `${(owner.netWorth.estimate / (owner.netWorth.estimate + comparisonOwner.netWorth.estimate)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`
            p-6 rounded-xl
            ${theme === 'dark' 
              ? 'bg-[#171b29]/70 border border-indigo-900/30' 
              : 'bg-white border border-gray-100 shadow-sm'}
          `}>
            <div className="flex items-center mb-4">
              <div className={`
                p-3 rounded-full mr-4
                ${theme === 'dark' ? 'bg-[#00E6FF]/20' : 'bg-[#00E6FF]/10'}
              `}>
                <Building size={24} className={theme === 'dark' ? 'text-[#00E6FF]' : 'text-[#00E6FF]'} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Properties</h2>
                <p className="text-gray-400">Owned real estate</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className={`
                p-4 rounded-lg mb-3
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{owner.properties.length} Properties</p>
                    <p className="text-sm text-gray-400">Total owned</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(ownedProperties.reduce((sum, prop) => sum + prop.value, 0) / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-gray-400">Total value</p>
                  </div>
                </div>
              </div>
              
              <div className={`
                p-4 rounded-lg
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <p className="text-sm font-medium mb-3">Property Types</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Residential</p>
                    <p className="text-sm">75%</p>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00E6FF] rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Commercial</p>
                    <p className="text-sm">15%</p>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5643CC] rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Other</p>
                    <p className="text-sm">10%</p>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Property Portfolio */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Property Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownedProperties.slice(0, 3).map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => onPropertySelect(property.id)}
            />
          ))}
        </div>
        
        {ownedProperties.length > 3 && (
          <div className="mt-4 text-center">
            <button className={`
              py-2 px-4 rounded-lg
              ${theme === 'dark' 
                ? 'bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300' 
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}
            `}>
              View All {ownedProperties.length} Properties
            </button>
          </div>
        )}
      </div>
      
      {/* Historical Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`
          p-6 rounded-xl
          ${theme === 'dark' 
            ? 'bg-[#171b29]/70 border border-indigo-900/30' 
            : 'bg-white border border-gray-100 shadow-sm'}
        `}>
          <div className="flex items-center mb-4">
            <div className={`
              p-2 rounded-full mr-3
              ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
            `}>
              <BarChart3 size={20} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
            </div>
            <div>
              <h2 className="font-semibold">Wealth Growth</h2>
              <p className="text-sm text-gray-400">Historical net worth</p>
            </div>
          </div>
          
          <div className="h-60 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center">
                This section would contain interactive charts showing historical wealth growth.
                <br />
                <span className="text-sm text-gray-400">
                  In a real implementation, this would use a charting library like Chart.js or D3.js.
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className={`
          p-6 rounded-xl
          ${theme === 'dark' 
            ? 'bg-[#171b29]/70 border border-indigo-900/30' 
            : 'bg-white border border-gray-100 shadow-sm'}
        `}>
          <div className="flex items-center mb-4">
            <div className={`
              p-2 rounded-full mr-3
              ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
            `}>
              <Briefcase size={20} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
            </div>
            <div>
              <h2 className="font-semibold">Investment Activity</h2>
              <p className="text-sm text-gray-400">Transaction history</p>
            </div>
          </div>
          
          <div className="h-60 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center">
                This section would display investment activity and transaction timelines.
                <br />
                <span className="text-sm text-gray-400">
                  In a real implementation, this would show a timeline of purchases, sales, and refinances.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WealthAnalysis;